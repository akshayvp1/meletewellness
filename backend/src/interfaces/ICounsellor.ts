
import { Document} from 'mongoose';

// Define the interface for a Counsellor document
export interface ICounsellor extends Document {
  name: string;
  qualification: string;
  expertise: string[];
  languages: string[];
  counsellingTypes: string[];
  experience: number;
  location: string;
  imageUrl?: string;
  bio?: string;
  email: string;
  phone: string;
  specialization: string;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
}