"use client";
import { api } from "@/utils/axiosInterceptor";
import { IAdminUser } from "@/types/types";

class UserManagingService {
  async createUser(userData: IAdminUser): Promise<void> {
    try {
      const response = await api["admin"].post("/create-user", userData);
      if (!response.data.success) {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      console.error("Error in createUser:", error);
      throw new Error("Failed to create user");
    }
  }

  async updateAdminUser(
    userId: string,
    updateData: IAdminUser
  ): Promise<IAdminUser> {
    try {
      const response = await api["admin"].patch(
        `/update-user/${userId}`,
        updateData
      );

      if (response.data.success && response.data.data) {
        return response.data.data as IAdminUser;
      }

      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Error in updateAdminUser:", error);
      throw new Error("Failed to update user");
    }
  }

  async getUsersList(): Promise<IAdminUser[]> {
    try {
      const response = await api["admin"].get("/users-list");
      console.log(response.data, "controller get all users");

      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }

      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Error in getUsersList:", error);
      throw new Error("Failed to fetch users");
    }
  }
}
export default new UserManagingService();
