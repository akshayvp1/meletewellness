import { Schema, model} from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: true
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  age: {
    type: Number,
    min: 0,
    required: true
  },
  password: {
    type: String,
    required: true
  },
    role: {
    type: String,
    enum: ['user','counsellor', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export const User = model<IUser>('User', userSchema);
