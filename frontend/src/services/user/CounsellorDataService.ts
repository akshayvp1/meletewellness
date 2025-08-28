"use client";

import { api } from "@/utils/axiosInterceptor";

import { Consultant } from "@/types/types";

export interface EmployeeData{
  id?: string; // Optional because MongoDB auto-generates it
  name: string;
  email: string;
  employeeId: string;
  phone: string;
  company: string;
  bloodGroup: string;
  address: string;
  status: 'Active' | 'Inactive';
  imageUrl?: string;
  createdAt: Date; // Will store as Date in DB
}

class CounsellorDataService {
  async frontGetCounsellors(): Promise<Consultant[]> {
    try {
      const response = await api["user"].get("/front-counsellors");
      if (!Array.isArray(response.data)) {
        throw new Error(
          "Invalid response format: Expected an array of counsellors"
        );
      }
      return response.data.map((item: any) => ({
        id: item._id || item.id || "",
        name: item.name || "",
        qualification: item.qualification || "",
        expertise: item.expertise || [],
        languages: item.languages || [],
        counsellingTypes: item.counsellingTypes || item.counseling || [],
        experience: item.experience,
        location: item.location || "",
        image: item.imageUrl || item.image || "https://via.placeholder.com/150",
        bio: item.bio || "",
        email: item.email || "",
        phone: item.phone || "",
        specialization: item.specialization || "",
        rating: item.rating || 0,
        sessions: item.sessions || 0,
        isBlocked: item.isBlocked || false,
        isVerified: item.isVerified || false,
        createdAt: item.createdAt || "",
      }));
    } catch (error: any) {
      console.error("Get counsellors error:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch counsellors"
      );
    }
  }


    async CollectingEmployeeData(EmployeData:EmployeeData):Promise<EmployeeData>{
      try {
        const response = await api["admin"].post("/addEmployeeId",EmployeData);
        return response.data;
      } catch (error) {
        throw new Error("Error collecting employee data");
      }
}
  async getEmployeeById(id: string): Promise<EmployeeData> {
  try {
    const response = await api["user"].get(`/getEmployeeById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching employee data");
  }
}
}
export default new CounsellorDataService();
