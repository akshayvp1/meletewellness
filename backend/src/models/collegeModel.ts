import { Schema, model } from 'mongoose';
import { ICollege } from '../interfaces/ICollege';

const ONE_YEAR_IN_MS = 365 * 24 * 60 * 60 * 1000;

const collegeSchema = new Schema<ICollege>({
  collegeName: {
    type: String,
    trim: true,
    required: [true, 'College name is required'],
  },
  mobile: {
    type: String,
    trim: true,
    required: [true, 'Mobile number is required'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'Email is required'],
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
  },
});

// Add index for expiration (TTL)
collegeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const College = model<ICollege>('College', collegeSchema);