export enum UserRole {
    INVESTOR = "admin",
    ADMIN = "counsellor",
    ENTREPRENEUR = "user",
}

export interface IUser {
    name:string|null
    email: string | null;
    password?: string;
    role: UserRole | null;
    token?: string;
}

export interface AuthState {
  name: string;
  email: string;
  role: UserRole | null;
  token: string | null;
  isAuthenticated: boolean;
}

