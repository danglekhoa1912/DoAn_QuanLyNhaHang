export interface IUser {
  id?: number;
  email: string;
  password: string;
  name: string;
  birthday: Date | string;
  role?: string;
  mobile: string;
  avatar: string;
}

export interface ILoginRes {
  username: string;
  password: string;
  tokenDevice?: string;
}

export interface IUserRes {
  id?: number;
  name: string;
  birthday: Date | string;
  email: string;
  mobile: string;
  role: string;
  avatar: File;
}
