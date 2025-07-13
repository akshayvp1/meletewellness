// models/Expertise.ts
import mongoose, { Schema,Model } from 'mongoose';
import { IExpertise } from '../interfaces/IExpertise';


const ExpertiseSchema: Schema<IExpertise> = new Schema<IExpertise>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
    isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware for updating updatedAt timestamp
ExpertiseSchema.pre<IExpertise>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Expertise: Model<IExpertise> = mongoose.models.Expertise || mongoose.model<IExpertise>('Expertise', ExpertiseSchema);

export default Expertise;