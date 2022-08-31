import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { UserEntity } from 'src/entities/user.entity';
import {
  LoginDTO,
  RegisterDTO,
  UpdateUserDTO,
  AuthResponse,
  UserResponse,
  TokenType,
  Role,
} from 'src/models/user.model';
import { MailService } from 'src/mail/mail.service';
import { ErrorMessages, Message } from 'src/shared/message';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async findAllUsers(
    limit = '5',
    page = '0',
    searchTerm = null,
  ): Promise<{ users: UserResponse[]; total: number }> {
    const options: FindManyOptions<UserResponse> = {
      order: {
        id: 'DESC',
      },
      skip: parseInt(limit) * parseInt(page),
      take: parseInt(limit),
      where: !!searchTerm
        ? [
            {
              email: Like(`%${searchTerm}%`),
            },
          ]
        : [],
    };

    const [users, total] = await this.userRepo.findAndCount(options);

    return {
      users: users.map(user => user.toJSON()),
      total,
    };
  }

  async findUserByEmail(email: UserResponse['email']): Promise<UserResponse> {
    const user = await this.userRepo.findOne({ where: { email } });
    return { ...user };
  }

  async findUserByUsername(
    username: UserEntity['username'],
  ): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { username } });
    return user;
  }

  async markEmailAsActive(email: UserResponse['email']): Promise<UpdateResult> {
    return await this.userRepo.update({ email }, { isActive: true });
  }

  async confirmEmail(email: UserResponse['email']): Promise<Message> {
    const user = await this.findUserByEmail(email);
    const message = new Message();
    if (user.isActive) {
      throw new BadRequestException(ErrorMessages.AlreadyConfirmed);
    }

    await this.markEmailAsActive(email);
    return message;
  }

  async decodeToken(token: AuthResponse['token']): Promise<string> {
    try {
      const payload: {
        email: UserResponse['email'];
        tokenType: TokenType;
      } = await this.jwtService.verify(token);
      if (
        payload.email &&
        (payload.tokenType === TokenType.Confirm ||
          payload.tokenType === TokenType.Reminder)
      ) {
        return payload.email;
      }

      throw new BadRequestException();
    } catch (error) {
      if (error?.name === ErrorMessages.TokenExpiredError) {
        throw new BadRequestException(ErrorMessages.TokenExpiredErrorMessage);
      }
      throw new BadRequestException(ErrorMessages.BadConfirmationToken);
    }
  }

  async resendConfirmationLink(email: UserResponse['email']): Promise<Message> {
    const user = await this.findUserByEmail(email);
    const message = new Message();
    if (Object.keys(user).length === 0) {
      throw new BadRequestException(ErrorMessages.NoAccountAsigned);
    }

    if (user.isActive) {
      throw new BadRequestException(ErrorMessages.AlreadyConfirmed);
    }

    const payload = { email: user.email, tokenType: TokenType.Confirm };
    const token = this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}`,
    });
    await this.mailService.sendUserConfirmation(user, token);
    return message;
  }

  async register(credentials: RegisterDTO): Promise<UserResponse> {
    try {
      const user = this.userRepo.create(credentials);
      const payload = { email: user.email, tokenType: TokenType.Confirm };
      const token = this.jwtService.sign(payload, {
        expiresIn: `${this.configService.get(
          'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
        )}`,
      });
      await user.save();
      await this.mailService.sendUserConfirmation(user, token);
      return { ...user.toJSON() };
    } catch (err) {
      const errorConflictCode = '23505';
      if (err.code === errorConflictCode) {
        throw new ConflictException(ErrorMessages.UsernameEmailTaken);
      }

      throw new InternalServerErrorException();
    }
  }

  async sendReminderPasswordLink(
    email: AuthResponse['email'],
  ): Promise<Message> {
    const user = await this.findUserByEmail(email);
    const message = new Message();
    if (Object.keys(user).length === 0) {
      throw new BadRequestException(ErrorMessages.NoAccountAsigned);
    }
    if (!user.isActive) {
      throw new UnauthorizedException(ErrorMessages.ConfirmEmail);
    }
    const payload = { email: user.email, tokenType: TokenType.Reminder };
    const token = this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}`,
    });
    await this.mailService.sendUserPasswordReminder(user, token);
    return message;
  }

  async changePassword(
    email: AuthResponse['email'],
    data: UpdateUserDTO,
  ): Promise<Message> {
    const message = new Message();
    const user = await this.userRepo.findOne({ where: { email } });
    const isValid = await user.comparePassword(data.password);
    if (isValid) {
      throw new BadRequestException(ErrorMessages.SamePasswords);
    }

    data.password = await bcrypt.hash(data.password, 10);
    await this.userRepo.update({ email }, data);
    return message;
  }

  async login({ email, password }: LoginDTO): Promise<AuthResponse> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user || Object.keys(user).length === 0) {
      throw new UnauthorizedException(ErrorMessages.CantFindAccount);
    }

    const isValid = await user.comparePassword(password);
    if (!user.isActive) {
      throw new UnauthorizedException(ErrorMessages.ConfirmEmail);
    }

    if (!isValid) {
      throw new UnauthorizedException(ErrorMessages.InvalidCredentials);
    }

    const token = this.jwtService.sign({ username: user.username });
    return { ...user.toJSON(), token };
  }

  async loginAsAdmin({ email, password }: LoginDTO): Promise<AuthResponse> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user || Object.keys(user).length === 0) {
      throw new UnauthorizedException(ErrorMessages.CantFindAccount);
    }

    if (user.role !== Role.Admin) {
      throw new UnauthorizedException(ErrorMessages.AdminError);
    }

    const isValid = await user.comparePassword(password);
    if (!user.isActive) {
      throw new UnauthorizedException(ErrorMessages.ConfirmEmail);
    }

    if (!isValid) {
      throw new BadRequestException(ErrorMessages.InvalidCredentials);
    }

    const token = this.jwtService.sign({ username: user.username });
    return { ...user.toJSON(), token };
  }

  async findCurrentUser(username: string): Promise<AuthResponse> {
    const user = await this.userRepo.findOne({ where: { username } });
    const payload = { username };
    const token = this.jwtService.sign(payload);
    return { ...user.toJSON(), token };
  }

  async updateUser(
    username: string,
    data: UpdateUserDTO,
  ): Promise<AuthResponse> {
    await this.userRepo.update({ username }, data);
    const user = await this.userRepo.findOne({ where: { username } });
    const payload = { username };
    const token = this.jwtService.sign(payload);
    return { ...user.toJSON(), token };
  }
}
