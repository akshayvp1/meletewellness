// models/Contact.ts
import { Schema, model } from "mongoose";

import { ContactDocument } from "../interfaces/IContact";

const contactSchema = new Schema<ContactDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ContactModel = model<ContactDocument>("Contact", contactSchema);
