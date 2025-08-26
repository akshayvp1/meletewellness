"use client";

import React, { useMemo, useState, useRef } from "react";
import {
  UserRound,
  Plus,
  Search,
  Pencil,
  X,
  Mail,
  Phone,
  Building2,
  Droplets,
  MapPin,
  ToggleLeft,
  ToggleRight,
  Image,
} from "lucide-react";

type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  bloodGroup: string;
  address: string;
  status: "Active" | "Inactive";
  imageUrl?: string;
  createdAt: string;
};

const seed: Employee[] = [
  {
    id: "EMP001",
    name: "Akshay VP",
    email: "akshay@example.com",
    phone: "6282031099",
    company: "Instill",
    bloodGroup: "B+",
    address: "Kochi, Kerala",
    status: "Active",
    imageUrl: "",
    createdAt: new Date().toISOString(),
  },
];

const primary = "#015F4A";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(seed);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // Modal form state
  const [form, setForm] = useState<Omit<Employee, "id" | "createdAt">>({
    name: "",
    email: "",
    phone: "",
    company: "",
    bloodGroup: "",
    address: "",
    status: "Active",
    imageUrl: "",
  });
  const fileRef = useRef<HTMLInputElement | null>(null);

  const total = employees.length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter((e) =>
      [e.name, e.email, e.phone, e.company].some((v) =>
        v.toLowerCase().includes(q)
      )
    );
  }, [employees, query]);

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      bloodGroup: "",
      address: "",
      status: "Active",
      imageUrl: "",
    });
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleImage = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, imageUrl: url }));
  };

  const addEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp: Employee = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...form,
    };
    setEmployees((prev) => [newEmp, ...prev]);
    setOpen(false);
    resetForm();
  };

  const handleModalClose = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-[#F5F7F6]">
      {/* Header */}
      <div
        className="w-full"
        style={{ backgroundColor: primary, color: "white" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center gap-3">
            <UserRound className="w-7 h-7" />
            <h1 className="text-2xl font-semibold">Employee Management</h1>
          </div>
          <p className="mt-1 text-sm opacity-80">Total Employees: {total}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, company, or phone…"
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Showing {filtered.length} {filtered.length === 1 ? "employee" : "employees"}
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium shadow-sm transition text-white hover:opacity-90"
            style={{ backgroundColor: primary }}
          >
            <Plus className="w-5 h-5" /> Add New Employee
          </button>
        </div>

        {/* Table */}
        <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-[#F1F6F4] text-gray-700 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 font-medium">User</th>
                  <th className="px-6 py-3 font-medium">Contact</th>
                  <th className="px-6 py-3 font-medium">Company</th>
                  <th className="px-6 py-3 font-medium">Blood Group</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Created</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {e.imageUrl ? (
                          <img
                            src={e.imageUrl}
                            alt={e.name}
                            className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                            <span className="text-xs font-medium">
                              {e.name.split(" ").slice(0, 2).map(s => s[0]).join("")}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{e.name}</div>
                          <div className="text-xs text-gray-500">{e.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{e.email}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-gray-500">
                        <Phone className="w-4 h-4" />
                        <span>{e.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span>{e.company}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate max-w-[220px]">{e.address}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-gray-400" />
                        <span>{e.bloodGroup}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          e.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(e.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button
                          title="Edit"
                          className="rounded-md p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                          onClick={() => alert("Edit handler here")}
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td className="px-6 py-12 text-center text-sm text-gray-500" colSpan={7}>
                      No employees match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3 text-sm text-gray-600 bg-[#F9FBFA] border-t border-gray-100">
            <span>Showing {filtered.length} of {employees.length} {employees.length === 1 ? "user" : "users"}</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>

      {/* Add Employee Modal - Centered on full screen */}
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={handleModalClose}
          ></div>
          
          {/* Modal Container - Centered on full viewport */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* Modal */}
            <div className="relative w-full max-w-3xl transform overflow-hidden rounded-xl bg-white shadow-xl transition-all max-h-[90vh] overflow-y-auto">
              <div
                className="flex items-center justify-between px-6 py-4 text-white"
                style={{ backgroundColor: primary }}
              >
                <h2 className="text-lg font-semibold">Add New Employee</h2>
                <button
                  onClick={handleModalClose}
                  className="rounded-md p-1 hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div onSubmit={addEmployee} className="px-6 py-6">
                {/* Profile Image */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    {form.imageUrl ? (
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="h-16 w-16 rounded-full object-cover ring-1 ring-gray-200"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 ring-1 ring-gray-200">
                        <Image className="w-7 h-7" />
                      </div>
                    )}
                    <div>
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="rounded-lg px-4 py-2 text-white shadow-sm transition-opacity hover:opacity-90"
                        style={{ backgroundColor: primary }}
                      >
                        Upload Image
                      </button>
                      <p className="mt-1 text-xs text-gray-500">
                        Recommended: square image, at least 200×200px
                      </p>
                    </div>
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleImage(e.target.files?.[0])}
                  />
                </div>

                {/* Grid fields */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field
                    label="Full Name *"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    leftIcon={<UserRound className="w-4 h-4 text-gray-400" />}
                    required
                  />
                  <Field
                    label="Email Address *"
                    type="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
                    required
                  />
                  <Field
                    label="Phone Number *"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                    leftIcon={<Phone className="w-4 h-4 text-gray-400" />}
                    required
                  />
                  <Field
                    label="Company Name *"
                    placeholder="Enter company name"
                    value={form.company}
                    onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                    leftIcon={<Building2 className="w-4 h-4 text-gray-400" />}
                    required
                  />
                  {/* Blood Group select */}
                  <SelectField
                    label="Blood Group *"
                    value={form.bloodGroup}
                    onChange={(v) => setForm((f) => ({ ...f, bloodGroup: v }))}
                    options={[
                      "", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
                    ]}
                  />
                  {/* Status toggle */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-700">
                      Account Status
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          status: f.status === "Active" ? "Inactive" : "Active",
                        }))
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {form.status === "Active" ? (
                        <ToggleRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 text-red-600" />
                      )}
                      <span className={form.status === "Active" ? "text-green-700" : "text-red-700"}>
                        {form.status}
                      </span>
                    </button>
                  </div>

                  {/* Address - full width */}
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Address *
                    </label>
                    <textarea
                      required
                      value={form.address}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, address: e.target.value }))
                      }
                      rows={3}
                      placeholder="Enter complete address"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: primary }}
                  >
                    Add Employee
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Reusable Input Components ---------- */

function Field({
  label,
  placeholder,
  value,
  onChange,
  leftIcon,
  type = "text",
  required,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  leftIcon?: React.ReactNode;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            {leftIcon}
          </span>
        )}
        <input
          required={required}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            leftIcon ? "pl-9" : ""
          }`}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o || "Select blood group"}
          </option>
        ))}
      </select>
    </div>
  );
}