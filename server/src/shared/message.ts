export interface IMessage {
  message: string;
}

export class Message implements IMessage {
  public message: string;
  constructor(message = 'success') {
    this.message = message;
  }
}

export enum ErrorMessages {
  AdminError = "There can only admins log in here",
  AlreadyConfirmed = 'Email already confirmed',
  BadConfirmationToken = 'Bad confirmation token',
  CantFindAccount = `The account doesn't exist`,
  ConfirmEmail = 'Confirm email',
  InvalidCredentials = 'Invalid credentials',
  NoAccountAsigned = 'No account is assigned to this email',
  UsernameEmailTaken = 'Username or email has already been taken',
  SamePasswords = 'Password is the same as before',
  TokenExpiredError = 'TokenExpiredError',
  TokenExpiredErrorMessage = 'Token expired',
}
