"use client";

import { api } from "@/utils/axiosInterceptor";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}


class ContactService {
  async contactUs(formData: FormData): Promise<void> {
    try {
        const response = await api["user"].post("/contact-us", formData);
        return response.data;
    }catch (error: any) {
      console.error("Contact us error:", error);
      throw new Error(
        error.response?.data?.message || "Failed to send contact message"
      );
    }
}
}

export const contactService = new ContactService();