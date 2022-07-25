export interface Error {
  error: {
    error: string | string[];
    statusCode: string;
  };
}

export interface IMessage {
  message: string;
}

export class Message implements IMessage {
  public message: string;
  constructor(message = 'success') {
    this.message = message;
  }
}
