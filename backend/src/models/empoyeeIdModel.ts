import { Schema, model } from 'mongoose';
import { EmployeeId } from '../interfaces/IEmployeeId';

const employeeSchema = new Schema<EmployeeId>(
  {
   name: { type: String, required: true, trim: true },
  employeeId: { type: String, required: true, unique: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  bloodGroup: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  imageUrl: { type: String },
//   barcodeId: { type: String, required: true, unique: true },
  qrCodeImage: { type: String }, 
  barcodeImage: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  }
  
  
);

export const Employee = model<EmployeeId>('Employee', employeeSchema);
