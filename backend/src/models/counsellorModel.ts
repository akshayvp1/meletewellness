import {Schema, model } from 'mongoose';
import { ICounsellor } from '../interfaces/ICounsellor';


// Define the schema
const counsellorSchema = new Schema<ICounsellor>({
  name: { type: String, required: true, trim: true },
  qualification: { type: String, required: true, trim: true },
  expertise: { type: [String], default: [] },
  languages: { type: [String], default: [] },
  counsellingTypes: { type: [String], default: [] },
  experience: { type: Number, required: true},
  location: { type: String, required: true, trim: true },
  imageUrl: { type: String },
  bio: { type: String, trim: true },
  email: { type: String, required: false, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  specialization: { type: String, required: false, trim: true },
  isVerified: { type: Boolean, default: true },
  isBlocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Export the model
const Counsellor = model<ICounsellor>('Counsellor', counsellorSchema);
export default Counsellor;
