import { Document, ObjectId } from "mongoose";

export interface IAdmin extends Document {
  _id: ObjectId;
  email: string;
  password: string;
  role: "admin";
  isActive: boolean;  // 👈 Add this
}
