import {Document } from 'mongoose';
export type UserRole = 'user' |'counsellor'| 'admin';
export interface IUser extends Document {
  name: string;
  phoneNumber: string;
  email: string;
  profile:string
  age: number;
  password: string;
  isActive: boolean;
  createdAt: Date;
  role: UserRole;
}