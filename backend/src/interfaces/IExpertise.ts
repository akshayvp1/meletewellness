import  { Document } from 'mongoose';

export interface IExpertise extends Document {
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}