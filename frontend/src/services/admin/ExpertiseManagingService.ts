"use client";

import { api } from "@/utils/axiosInterceptor";

interface ExpertiseData {
  name: string;
  description: string;
  isActive: boolean;
}

class ExpertiseManagingService {
  async addExpertise(
    expertiseData: ExpertiseData
  ): Promise<{ success: boolean; id: string }> {
    try {
      const response = await api["admin"].post("/add-expertise", expertiseData);
      return { success: true, id: response.data.id || Date.now().toString() };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to add expertise"
      );
    }
  }

  async updateExpertise(
    id: string,
    expertiseData: ExpertiseData
  ): Promise<{ success: boolean }> {
    try {
      await api["admin"].put(`/update-expertise/${id}`, expertiseData);
      return { success: true };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update expertise"
      );
    }
  }

  async deleteExpertise(id: string): Promise<{ success: boolean }> {
    try {
      await api["admin"].delete(`/delete-expertise/${id}`);
      return { success: true };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete expertise"
      );
    }
  }
}

export default new ExpertiseManagingService();
