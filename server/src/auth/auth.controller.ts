import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  RegisterDTO,
  LoginDTO,
  AuthResponse,
  RegisterBody,
  LoginBody,
  UserResponse,
  UpdateUserDTO,
} from '../models/user.model';
import { ResponseObject } from 'src/models/response.model';
import { OptionalAuthGuard } from './optional-auth.gaurd';
@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @ApiCreatedResponse({ description: 'List all users' })
  @UseGuards(new OptionalAuthGuard())
  async findAllUsers(
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Query('searchTerm') searchTerm: string,
  ): Promise<ResponseObject<'users', UserResponse[]>> {
    const users = await this.authService.findAllUsers(limit, page, searchTerm);
    return users;
  }

  @Post('confirm')
  @ApiCreatedResponse({ description: 'Confirm User Email' })
  async confirm(@Body() { confirmToken }: AuthResponse) {
    const email = await this.authService.decodeToken(confirmToken);
    return await this.authService.confirmEmail(email);
  }

  @Post('resend')
  @ApiCreatedResponse({ description: 'Resend Confirmation User Email' })
  async resend(@Body() user: AuthResponse) {
    return await this.authService.resendConfirmationLink(user.email);
  }

  @Post('send')
  @ApiCreatedResponse({ description: 'Send Reminder Password Email' })
  async send(@Body() user: AuthResponse) {
    return await this.authService.sendReminderPasswordLink(user.email);
  }

  @Post('changePassword')
  @ApiCreatedResponse({ description: 'Change Password' })
  async changePassword(
    @Body() { reminderToken }: AuthResponse,
    @Body('user', ValidationPipe) data: UpdateUserDTO,
  ) {
    const email = await this.authService.decodeToken(reminderToken);
    return await this.authService.changePassword(email, data);
  }

  @Post()
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBody({ type: RegisterBody })
  async register(
    @Body(ValidationPipe) credentials: RegisterDTO,
  ): Promise<ResponseObject<'user', UserResponse>> {
    const user = await this.authService.register(credentials);
    return { user };
  }

  @Post('/login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginBody })
  async login(
    @Body('user', ValidationPipe) credentials: LoginDTO,
  ): Promise<ResponseObject<'user', AuthResponse>> {
    const user = await this.authService.login(credentials);
    return { user };
  }

  @Post('/loginAsAdmin')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginBody })
  async loginAsAdmin(
    @Body('user', ValidationPipe) credentials: LoginDTO,
  ): Promise<ResponseObject<'user', AuthResponse>> {
    const user = await this.authService.loginAsAdmin(credentials);
    return { user };
  }
}
