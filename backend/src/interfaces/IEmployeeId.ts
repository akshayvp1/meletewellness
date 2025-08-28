export interface EmployeeId extends Document {
  name: string;
  email: string;
  employeeId: string;
  phone: string;
  company: string;
  bloodGroup: string;
  address: string;
  status: 'Active' | 'Inactive';
  imageUrl?: string;
  qrCodeImage?: string; // ✅ Base64 QR Code Image
//   barcodeId: string; // ✅ Unique Barcode Value
  barcodeImage?: string; // ✅ Base64 Barcode Image
  createdAt: Date;
}
