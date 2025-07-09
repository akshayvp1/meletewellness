export enum UserRole {
    INVESTOR = "admin",
    ADMIN = "counsellor",
    ENTREPRENEUR = "user",
}

export interface IUser {
    email: string | null;
    password?: string;
    role: UserRole | null;
    token?: string;
}

export interface AuthState {
    email: string | null;
    role: UserRole | null;
    token: string | null;
    isAuthenticated: boolean;
}
