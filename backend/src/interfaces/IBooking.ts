import {Document, Types } from 'mongoose';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';
export type PaymentMethod = 'card' | 'upi' | 'cash' | 'wallet';

export interface IBooking extends Document {
  userId: Types.ObjectId;
  bookingId: string;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  amount: number;
  bookingDate: Date;
  createdAt: Date;
}