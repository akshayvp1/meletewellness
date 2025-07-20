"use client";

import { api } from "@/utils/axiosInterceptor";

interface ExpertiseData {
  name: string;
  description: string;
  isActive: boolean;
}

interface ExpertiseArea {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}



class ExpertiseManagingService {

  async getExpertise(): Promise<{ success: boolean; data: ExpertiseArea[] }> {
    try {
      const response = await api["admin"].get("/get-expertise");
      console.log(response.data,"ooooooooooooi");
      
      if (response.status !== 200) {
        throw new Error("Failed to fetch expertise");
      }
      return response.data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch expertise"
      );
    }
  }
  
  async addExpertise(
    expertiseData: ExpertiseData
  ): Promise<{ success: boolean;}> {
    try {
      const response = await api["admin"].post("/add-expertise", expertiseData);
      if (response.status !== 200) {
        throw new Error("Failed to add expertise");
      }
      return { success: true };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to add expertise"
      );
    }
  }

 async updateExpertise(
  id: string,
  expertiseData: ExpertiseData
): Promise<{ success: boolean; data?: ExpertiseArea; message?: string }> {
  try {
    
    if (!id || id === 'undefined' || id === 'null') {
      console.error("Invalid ID provided:", id);
      return {
        success: false,
        message: "Invalid expertise ID provided"
      };
    }
    
    const cleanId = String(id).trim();
    
    const response = await api["admin"].patch(`/update-expertise/${cleanId}`, expertiseData);

    return { 
      success: true, 
      data: response.data,
      message: "Expertise updated successfully"
    };
  } catch (error: any) {
    console.error('UpdateExpertise API Error:', error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update expertise"
    };
  }
}

  async blockExpertise(id: string): Promise<{ success: boolean }> {
    try {
      await api["admin"].patch(`/block-expertise/${id}`);
      return { success: true };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to block expertise"
      );
    }
  }

  async unBlockExpertise(id: string): Promise<{ success: boolean }> {
    try {
      await api["admin"].patch(`/unblock-expertise/${id}`);
      return { success: true };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to unblock expertise"
      );
    }
  }

  // Fix the return type to match what the backend actually returns
  
}

export default new ExpertiseManagingService();