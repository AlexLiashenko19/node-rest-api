export interface IUser {
  _id: string;
  token?: string | undefined;
  email: string;
  password: string;
}
