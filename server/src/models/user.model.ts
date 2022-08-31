import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  password: string;
}

export class LoginBody {
  @ApiProperty()
  user: LoginDTO;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  username: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  role: Role;

  @IsDateString()
  @ApiProperty()
  age: Date;
}

export class RegisterBody {
  @ApiProperty()
  user: RegisterDTO;
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  image: string;

  @IsOptional()
  bio: string;
  
  @IsString()
  @MinLength(4)
  @ApiProperty()
  password: string;
}

export class UpdateUserBody {
  @ApiProperty()
  user: UpdateUserDTO;
}

export interface AuthPayload {
  username: string;
}

export interface UserResponse {
  id?: number;
  isActive?: boolean
  email: string;
  username?: string;
  age: Date;
  bio: string;
  image: string | null;
}

export interface AuthResponse extends UserResponse {
  confirmToken?: string;
  token: string;
  reminderToken?: string;
}

export interface ProfileResponse extends UserResponse {
  following: boolean | null;
}

export enum TokenType {
  Confirm = 'confirmToken',
  Reminder = 'reminderToken',
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}
