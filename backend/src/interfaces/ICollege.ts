import { Document } from "mongoose";

export interface ICollege extends Document {
  collegeName: string;  
  mobile: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  expiresAt?: Date; // <- optional expiration field
}
