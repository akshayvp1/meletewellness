import { Schema, model } from "mongoose";
import { IAdmin } from "../interfaces/IAdmin";

const AdminSchema: Schema<IAdmin> = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String,  
    default: "admin" 
  },
  isActive: { type: Boolean, default: true }, 
});

const AdminModel = model<IAdmin>("Admin", AdminSchema);

export default AdminModel;
