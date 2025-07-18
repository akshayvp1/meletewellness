"use client";
import { api } from "@/utils/axiosInterceptor";
import { Consultant } from "@/types/types";

interface ICounsellorData {
  name: string;
  qualification: string;
  expertise: string[];
  languages: string[];
  counsellingTypes: string[];
  experience: number;
  location: string;
  imageUrl?: string;
  bio: string;
  email: string;
  phone: string;
  specialization: string;
}

class CounsellorManagingService {
  async addCounsellor(counsellorData: ICounsellorData): Promise<void> {
    try {
      await api["admin"].post("/add-counsellor", counsellorData);
    } catch (error: any) {
      console.error("Add counsellor error:", error);
      throw new Error(
        error.response?.data?.message || "Failed to add counsellor"
      );
    }
  }

  async getCounsellors(): Promise<Consultant[]> {
    try {
      const response = await api["admin"].get("/get-counsellors");
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

  async blockCounsellor(userId: string): Promise<Consultant> {
    try {
      // Fixed template literal syntax
      const response = await api["admin"].patch(`/block-counsellor/${userId}`);
      const data = response.data.data;
      console.log("Block counsellor response:", {
        userId,
        isBlocked: data.isBlocked,
      });
      return {
        id: data._id || data.id || "",
        name: data.name || "",
        qualification: data.qualification || "",
        expertise: data.expertise || [],
        languages: data.languages || [],
        counsellingTypes: data.counsellingTypes || data.counseling || [],
        experience: data.experience || "",
        location: data.location || "",
        image: data.imageUrl || data.image || "https://via.placeholder.com/150",
        bio: data.bio || "",
        email: data.email || "",
        phone: data.phone || "",
        specialization: data.specialization || "",
        rating: data.rating || 0,
        sessions: data.sessions || 0,
        isBlocked: data.isBlocked || false,
        isVerified: data.isVerified || false,
        createdAt: data.createdAt || "",
      };
    } catch (error: any) {
      console.error("Block counsellor error:", error);
      throw new Error(
        error.response?.data?.message || "Failed to block counsellor"
      );
    }
  }

  async unblockCounsellor(userId: string): Promise<Consultant> {
    try {
      // Fixed template literal syntax
      const response = await api["admin"].patch(
        `/unblock-counsellor/${userId}`
      );
      const data = response.data.data;
      console.log("Unblock counsellor response:", {
        userId,
        isBlocked: data.isBlocked,
      });
      return {
        id: data._id || data.id || "",
        name: data.name || "",
        qualification: data.qualification || "",
        expertise: data.expertise || [],
        languages: data.languages || [],
        counsellingTypes: data.counsellingTypes || data.counseling || [],
        experience: data.experience,
        location: data.location || "",
        image: data.imageUrl || data.image || "https://via.placeholder.com/150",
        bio: data.bio || "",
        email: data.email || "",
        phone: data.phone || "",
        specialization: data.specialization || "",
        rating: data.rating || 0,
        sessions: data.sessions || 0,
        isBlocked: data.isBlocked || false,
        isVerified: data.isVerified || false,
        createdAt: data.createdAt || "",
      };
    } catch (error: any) {
      console.error("Unblock counsellor error:", error);
      throw new Error(
        error.response?.data?.message || "Failed to unblock counsellor"
      );
    }
  }

  async updateCounsellor(
    id: string,
    counsellorData: Consultant
  ): Promise<void> {
    try {
      const payload = {
        name: counsellorData.name,
        qualification: counsellorData.qualification,
        expertise: counsellorData.expertise,
        languages: counsellorData.languages,
        counsellingTypes: counsellorData.counsellingTypes,
        experience: counsellorData.experience,
        location: counsellorData.location,
        imageUrl: counsellorData.image,
        bio: counsellorData.bio,
        email: counsellorData.email,
        phone: counsellorData.phone,
        specialization: counsellorData.specialization,
        rating: counsellorData.rating,
        sessions: counsellorData.sessions,
        isBlocked: counsellorData.isBlocked,
        isVerified: counsellorData.isVerified,
        createdAt: counsellorData.createdAt,
      };
      // Fixed template literal syntax
      await api["admin"].put(`/update-counsellor/${id}`, payload);
    } catch (error: any) {
      console.error("Update counsellor error:", error);
      throw new Error(
        error.response?.data?.message || "Failed to update counsellor"
      );
    }
  }
}
export default new CounsellorManagingService();
