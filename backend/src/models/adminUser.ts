import { Schema,model} from 'mongoose';
import { IAdminUser } from '../interfaces/IAdminUser';

const ONE_YEAR_IN_MS = 365 * 24 * 60 * 60 * 1000;

const adminUserSchema = new Schema<IAdminUser>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
  },
  college:{
    type:String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + ONE_YEAR_IN_MS),
    index: { expires: 0 }, // expire exactly at this date
  },
});
export const AdminUser = model<IAdminUser>('AdminUser', adminUserSchema);
