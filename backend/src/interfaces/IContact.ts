import { Document } from "mongoose";

export interface ContactDocument extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}