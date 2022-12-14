import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthResponse, UserResponse } from 'src/models/user.model';

@Injectable()
export class MailService {
  constructor(
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  async sendUserConfirmation(
    user: UserResponse,
    token: AuthResponse['token'],
  ): Promise<void> {
    const url = `${process.env.EMAIL_CONFIRMATION_URL}${token}`;
    await this.mailerService
      .sendMail({
        to: user?.email,
        subject: 'Welcome to Blog App! Confirm your Email',
        template: 'confirmation',
        context: {
          name: user?.username,
          url,
        },
      })
      .then(() => {
        return true;
      })
      .catch(error => {
        throw new BadRequestException(error);
      });
  }

  async sendUserPasswordReminder(
    user: UserResponse,
    token: AuthResponse['token'],
  ): Promise<void> {
    const url = `${process.env.PASSWORD_RESET_URL}${token}`;
    await this.mailerService
      .sendMail({
        to: user?.email,
        subject: 'Welcome to Blog App! Change your password!',
        template: 'reminder',
        context: {
          name: user?.username,
          url,
        },
      })
      .then(() => {
        return true;
      })
      .catch(error => {
        throw new BadRequestException(error);
      });
  }
}
