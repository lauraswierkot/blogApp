export interface Error {
  error: {
    error: string | string[];
    statusCode: string;
  };
}

export interface Message {
  message: string;
}
