'use client';

import { api } from '@/utils/axiosInterceptor';
import { ICollege}  from '@/types/types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
interface ApiCollegeResponse {
  _id?: string;
  id?: string;
  collegeName?: string;
  name?: string; // Alternative property name
  mobile?: string;
  email?: string;
  isActive?: boolean;
  createdAt?: Date | string;
  expiresAt?: Date | string;
}

interface AddCollegeResponse {
  success: boolean;
  data?: unknown;
  message?: string;
}


interface AddCollegeData {
  collegeName: string;
  mobile: string;
  email: string;
  isActive: boolean;
  expiresAt?: Date;
}

export interface UpdateCollegeData {
  collegeName: string;
  mobile?: string;
  email?: string;
  isActive?: boolean;
  expiresAt?: Date;
}

class CollegeManagingService {

    async addCollegeData(collegeData: AddCollegeData): Promise<ICollege> {
    try {
      const response = await api['admin'].post<ApiResponse<ApiCollegeResponse>>('/add-college', collegeData);
      
      if (response.data.success && response.data.data) {
        return response.data.data as ICollege
      }
      
      throw new Error('Invalid response format');
    } catch (error: unknown) {
      console.error('Error in addCollegeData:', error);
      throw new Error('Failed to add college');
    }
  }

  async updateCollegeData(editingId: string, updateData: UpdateCollegeData): Promise<ICollege> {
    try {
      const response = await api['admin'].patch<ApiResponse<ApiCollegeResponse>>(`/update-college/${editingId}`, updateData);
      
      if (response.data.success && response.data.data) {
        return response.data.data as ICollege
      }
      
      throw new Error('Invalid response format');
    } catch (error: unknown) {
      console.error('Error in updateCollegeData:', error);
      throw new Error('Failed to update college');
    }
  }

  async getAllColleges(): Promise<ICollege[]> {
    try {
      const response = await api['admin'].get<ApiResponse<ApiCollegeResponse[]> | ApiCollegeResponse[]>('/get-college');
      
      let colleges: ApiCollegeResponse[] = [];
      
      if (Array.isArray(response.data)) {
        colleges = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        colleges = response.data.data;
      } else {
        throw new Error('Invalid response format');
      }
      
      return colleges as ICollege[]
    } catch (error: unknown) {
      console.error('Error in getAllColleges:', error);
      throw new Error('Failed to fetch colleges');
    }
  }

 async getCollegesList(): Promise<ICollege[]> {
  try {
    const response = await api['admin'].get('/college-list');
    console.log(response.data, "controller get all colleges");

    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error in getCollegesList:', error);
    throw new Error('Failed to fetch colleges');
  }
}
}

export default new CollegeManagingService();