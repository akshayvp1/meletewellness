"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CounsellorService from "@/services/user/CounsellorDataService";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Droplets,
  Hash,
  Calendar,
  Shield,
  QrCode,
  Download,
  Loader2,
  AlertCircle,
  User,
} from "lucide-react";

export interface EmployeeData {
  id?: string;
  name: string;
  email: string;
  employeeId: string;
  phone: string;
  company: string;
  bloodGroup: string;
  address: string;
  status: "Active" | "Inactive";
  imageUrl?: string;
  createdAt: Date;
  qrCodeImage?: string;
}

const primary = "#015F4A";

export default function EmployeeIdCardPage() {
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (employeeId) {
      fetchEmployeeData(employeeId);
    } else {
      setError("No employee ID provided");
      setLoading(false);
    }
  }, [employeeId]);

  const fetchEmployeeData = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await CounsellorService.getEmployeeById(id);
      setEmployee(data);
    } catch (err) {
      console.error("Error fetching employee data:", err);
      setError("Employee not found or failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "N/A";
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600 font-medium">Loading employee data...</p>
        </div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Employee Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The requested employee ID card could not be found."}
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-4 md:p-6">
      {/* Header with Download Button */}
      <div className="max-w-4xl mx-auto mb-6 print:hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Employee ID Card</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Digital employee identification</p>
          </div>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors shadow-sm text-sm sm:text-base"
          >
            <Download className="w-4 h-4" />
            Download/Print
          </button>
        </div>
      </div>

      {/* ID Card Container */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none w-full max-w-[90rem] mx-auto">
          {/* Card Header */}
          <div
            className="relative px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-white"
            style={{ backgroundColor: primary }}
          >
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full -translate-y-6 sm:-translate-y-8 translate-x-6 sm:translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-white/10 rounded-full translate-y-6 sm:translate-y-8 -translate-x-6 sm:-translate-x-8"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <Building2 className="w-5 sm:w-6 h-5 sm:h-6" />
                <h2 className="text-lg sm:text-xl font-bold">Employee ID Card</h2>
              </div>
              <p className="text-xs sm:text-sm opacity-90">Official Employee Identification</p>
            </div>
          </div>

          {/* Card Body */}
          <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Left Column - Photo and Basic Info */}
              <div className="lg:col-span-1 flex flex-col items-center">
                <div className="text-center mb-4 sm:mb-6">
                  {employee.imageUrl ? (
                    <img
                      src={employee.imageUrl}
                      alt={employee.name || "Employee"}
                      className="w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 rounded-2xl object-cover mx-auto shadow-lg ring-4 ring-gray-100"
                    />
                  ) : (
                    <div
                      className="w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 rounded-2xl mx-auto shadow-lg ring-4 ring-gray-100 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold"
                      style={{ backgroundColor: primary }}
                    >
                      {getInitials(employee.name)}
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="text-center mb-4 sm:mb-6">
                  <span
                    className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                      employee.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    {employee.status}
                  </span>
                </div>

                {/* QR Code with Logo */}
                <div className="text-center">
                  {employee.qrCodeImage ? (
                    <img
                      src={employee.qrCodeImage}
                      alt="QR Code"
                      className="w-20 sm:w-24 h-20 sm:h-24 mx-auto mb-2 sm:mb-3"
                    />
                  ) : (
                    <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gray-100 rounded-lg mx-auto flex items-center justify-center mb-2 sm:mb-3">
                      <QrCode className="w-10 sm:w-12 h-10 sm:h-12 text-gray-400" />
                    </div>
                  )}
                  <p className="text-xs text-gray-500">Scan for verification</p>
                  <img
                    src="/path/to/your/logo.png" // Replace with your actual logo URL
                    alt="Company Logo"
                    className="w-16 sm:w-20 h-auto mx-auto mt-2 sm:mt-3"
                  />
                </div>
              </div>

              {/* Right Column - Detailed Information */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Employee Name */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {employee.name || "N/A"}
                  </h1>
                  <div className="flex items-center gap-2 text-base sm:text-lg text-gray-600">
                    <Hash className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span>ID: {employee.employeeId || employee.id || "N/A"}</span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700">Email</p>
                        <p className="text-gray-900 text-sm sm:text-base">{employee.email || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700">Phone</p>
                        <p className="text-gray-900 text-sm sm:text-base">{employee.phone || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <Building2 className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700">Company</p>
                        <p className="text-gray-900 text-sm sm:text-base">{employee.company || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <Droplets className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700">Blood Group</p>
                        <p className="text-gray-900 text-sm sm:text-base">{employee.bloodGroup || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-700">Address</p>
                    <p className="text-gray-900 text-sm sm:text-base">{employee.address || "N/A"}</p>
                  </div>
                </div>

                {/* Issue Date */}
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-blue-700">Issued On</p>
                    <p className="text-blue-900 text-sm sm:text-base">
                      {employee.createdAt
                        ? new Date(employee.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 gap-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-xs sm:text-sm">This is an official employee identification card</span>
              </div>
              <img
                src="/path/to/your/logo.png" // Replace with your actual logo URL
                alt="Company Logo"
                className="w-12 sm:w-16 h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
        }
        @media (max-width: 640px) {
          .max-w-4xl {
            max-width: 100%;
          }
          .grid-cols-3 {
            grid-template-columns: 1fr;
          }
          .lg\\:col-span-1,
          .lg\\:col-span-2 {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </div>
  );
}