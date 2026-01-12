export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserPost {
  username: string;
  email: string;
  password: string;
}

export interface ILoginPost {
  email: string;
  password: string;
}

