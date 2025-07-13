import { Document } from 'mongoose';

export type UserRole = 'user';

export interface IAdminUser extends Document {
  name: string;
  phoneNumber: string;
  email: string;
  age:number;
  college:string;
  isActive: boolean;
  createdAt: Date;
  role: UserRole;
  expiresAt?: Date; // <- optional expiration field
}
