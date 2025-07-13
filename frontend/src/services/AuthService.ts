


'use client';

// src/services/AuthService.ts
import { api } from '../utils/axiosInterceptor';
import { store } from '../store/app/store';
import { signIn } from '../store/features/authSlice';
import { UserRole } from '../types/auth/auth.types';
import { Consultant } from '../types/types';
import { signOut } from '../store/features/authSlice';
import {GoogleAuthUtil} from '@/utils/googleAuth'
import { setTempUser } from '@/store/features/tempSlice';
import { IAdminUser } from '../types/types';
import { ICollege} from '@/types/types';

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

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Your existing MeleteICollege interface should be imported

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

interface LoginResponse {
  email: string;
  role: UserRole;
  token: string;
}

interface StatusResponse {
  success: boolean;
  message?: string;
  user?: any;
}



interface ExpertiseData {
  name: string;
  description: string;
  isActive: boolean;
}


interface UserLoginData {
  email: string;
  password: string;
  name?: string;
  mobile?: string;
  confirmPassword?: string;
}

interface UserLoginResponse {
  email: string;
  role: UserRole;
  token: string;
  user?: any;
}

interface GoogleLoginResponse {
  email: string;
  role: UserRole;
  token: string;
  user?: any;
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



// interface ICollege {
//   _id: string;
//   name: string;
// }
// const convertToDate = (dateValue: Date | string | undefined): Date | undefined => {
//   if (!dateValue) return undefined;
//   return typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
// };

// // Helper function to transform API response to MeleteICollege
// const transformToMeleteICollege = (apiCollege: ApiCollegeResponse): MeleteICollege => ({
//   ...apiCollege,
//   collegeName: apiCollege.collegeName || apiCollege.name || '',
//   mobile: apiCollege.mobile || '',
//   email: apiCollege.email || '',
//   isActive: apiCollege.isActive ?? true,
//   _id: apiCollege._id || apiCollege.id || '',
//   createdAt: convertToDate(apiCollege.createdAt),
//   expiresAt: convertToDate(apiCollege.expiresAt),
// });
class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api['admin'].post('/verify-login', { email, password });
      const data = response.data;

      if (!data.user?._doc?.email || typeof data.user._doc.email !== 'string') {
        throw new Error('Invalid email in response');
      }
      if (!data.user?._doc?.role || !['admin', 'user', 'counsellor'].includes(data.user._doc.role)) {
        throw new Error('Invalid role in response');
      }
      if (!data.accessToken || typeof data.accessToken !== 'string') {
        throw new Error('Invalid token in response');
      }

 store.dispatch(
  signIn({
    name: data.user._doc.name,
    email: data.user._doc.email,
    role: data.user._doc.role as UserRole,
    token: data.accessToken,
    isAuthenticated: true,
  })
);



      return {
        email: data.user._doc.email,
        role: data.user._doc.role as UserRole,
        token: data.accessToken,
      };
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Failed to verify login');
    }
  }

  // // Add the missing checkStatus method
  // async checkStatus(): Promise<StatusResponse> {
  //   try {
  //     console.log("edaaaaa");
      
  //     const response = await api['admin'].get('/check-status');
  //     console.log(response,"pppppppp");
      
  //     return {
  //       success: true,
  //       user: response.data.user,
  //       message: response.data.message || 'Status check successful'
  //     };
  //   } catch (error: any) {
  //     console.error('Status check error:', error);
  //     return {
  //       success: false,
  //       message: error.response?.data?.message || 'Failed to check status'
  //     };
  //   }
  // }

  async addCounsellor(counsellorData: ICounsellorData): Promise<void> {
    try {
      await api['admin'].post('/add-counsellor', counsellorData);
    } catch (error: any) {
      console.error('Add counsellor error:', error);
      throw new Error(error.response?.data?.message || 'Failed to add counsellor');
    }
  }

  async getCounsellors(): Promise<Consultant[]> {
    try {
      const response = await api['admin'].get('/get-counsellors');
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: Expected an array of counsellors');
      }
      return response.data.map((item: any) => ({
        id: item._id || item.id || '',
        name: item.name || '',
        qualification: item.qualification || '',
        expertise: item.expertise || [],
        languages: item.languages || [],
        counsellingTypes: item.counsellingTypes || item.counseling || [],
        experience: item.experience ,
        location: item.location || '',
        image: item.imageUrl || item.image || 'https://via.placeholder.com/150',
        bio: item.bio || '',
        email: item.email || '',
        phone: item.phone || '',
        specialization: item.specialization || '',
        rating: item.rating || 0,
        sessions: item.sessions || 0,
        isBlocked: item.isBlocked || false,
        isVerified: item.isVerified || false,
        createdAt: item.createdAt || '',
      }));
    } catch (error: any) {
      console.error('Get counsellors error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch counsellors');
    }
  }

  async frontGetCounsellors(): Promise<Consultant[]> {
    try {
      const response = await api['user'].get('/front-counsellors');
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format: Expected an array of counsellors');
      }
      return response.data.map((item: any) => ({
        id: item._id || item.id || '',
        name: item.name || '',
        qualification: item.qualification || '',
        expertise: item.expertise || [],
        languages: item.languages || [],
        counsellingTypes: item.counsellingTypes || item.counseling || [],
        experience: item.experience ,
        location: item.location || '',
        image: item.imageUrl || item.image || 'https://via.placeholder.com/150',
        bio: item.bio || '',
        email: item.email || '',
        phone: item.phone || '',
        specialization: item.specialization || '',
        rating: item.rating || 0,
        sessions: item.sessions || 0,
        isBlocked: item.isBlocked || false,
        isVerified: item.isVerified || false,
        createdAt: item.createdAt || '',
      }));
    } catch (error: any) {
      console.error('Get counsellors error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch counsellors');
    }
  }

  async blockCounsellor(userId: string): Promise<Consultant> {
    try {
      // Fixed template literal syntax
      const response = await api['admin'].patch(`/block-counsellor/${userId}`);
      const data = response.data.data;
      console.log('Block counsellor response:', { userId, isBlocked: data.isBlocked });
      return {
        id: data._id || data.id || '',
        name: data.name || '',
        qualification: data.qualification || '',
        expertise: data.expertise || [],
        languages: data.languages || [],
        counsellingTypes: data.counsellingTypes || data.counseling || [],
        experience: data.experience || '',
        location: data.location || '',
        image: data.imageUrl || data.image || 'https://via.placeholder.com/150',
        bio: data.bio || '',
        email: data.email || '',
        phone: data.phone || '',
        specialization: data.specialization || '',
        rating: data.rating || 0,
        sessions: data.sessions || 0,
        isBlocked: data.isBlocked || false,
        isVerified: data.isVerified || false,
        createdAt: data.createdAt || '',
      };
    } catch (error: any) {
      console.error('Block counsellor error:', error);
      throw new Error(error.response?.data?.message || 'Failed to block counsellor');
    }
  }

  async unblockCounsellor(userId: string): Promise<Consultant> {
    try {
      // Fixed template literal syntax
      const response = await api['admin'].patch(`/unblock-counsellor/${userId}`);
      const data = response.data.data;
      console.log('Unblock counsellor response:', { userId, isBlocked: data.isBlocked });
      return {
        id: data._id || data.id || '',
        name: data.name || '',
        qualification: data.qualification || '',
        expertise: data.expertise || [],
        languages: data.languages || [],
        counsellingTypes: data.counsellingTypes || data.counseling || [],
        experience: data.experience ,
        location: data.location || '',
        image: data.imageUrl || data.image || 'https://via.placeholder.com/150',
        bio: data.bio || '',
        email: data.email || '',
        phone: data.phone || '',
        specialization: data.specialization || '',
        rating: data.rating || 0,
        sessions: data.sessions || 0,
        isBlocked: data.isBlocked || false,
        isVerified: data.isVerified || false,
        createdAt: data.createdAt || '',
      };
    } catch (error: any) {
      console.error('Unblock counsellor error:', error);
      throw new Error(error.response?.data?.message || 'Failed to unblock counsellor');
    }
  }

  async updateCounsellor(id: string, counsellorData: Consultant): Promise<void> {
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
      await api['admin'].put(`/update-counsellor/${id}`, payload);
    } catch (error: any) {
      console.error('Update counsellor error:', error);
      throw new Error(error.response?.data?.message || 'Failed to update counsellor');
    }
  }



   

  async addExpertise(expertiseData: ExpertiseData): Promise<{ success: boolean; id: string }> {
    try {
      const response = await api['admin'].post('/add-expertise', expertiseData);
      return { success: true, id: response.data.id || Date.now().toString() };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add expertise');
    }
  }

  async updateExpertise(id: string, expertiseData: ExpertiseData): Promise<{ success: boolean }> {
    try {
      await api['admin'].put(`/update-expertise/${id}`, expertiseData);
      return { success: true };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update expertise');
    }
  }

  async deleteExpertise(id: string): Promise<{ success: boolean }> {
    try {
      await api['admin'].delete(`/delete-expertise/${id}`);
      return { success: true };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete expertise');
    }
  }



  async userLogin(loginData: UserLoginData): Promise<void> {
  try {
    // Determine if this is a signup or login based on the presence of name
    const isSignUp = !!loginData.name;
    
    if (isSignUp) {
      // User registration
      const response = await api['user'].post('/register', {
        name: loginData.name,
        email: loginData.email,
        password: loginData.password,
        mobile: loginData.mobile,
        confirmPassword: loginData.confirmPassword
      });
      
      const { user, accessToken } = response.data;
      
      if (!user?.email || !accessToken) {
        throw new Error('Invalid registration response');
      }
      
      // const authData = {
      //   email: user.email,
      //   role: (user.role as UserRole) || 'user',
      //   token: accessToken,
      //   isAuthenticated: true,
      // };
      
      // store.dispatch(signIn(authData));
      // return { 
      //   email: authData.email, 
      //   role: authData.role, 
      //   token: accessToken,
      //   user: user 
      // };
    } else {
      // User login
      // const response = await api['user'].post('/login', {
      //   email: loginData.email,
      //   password: loginData.password
      // });
      
      // const { user, accessToken } = response.data;
      
      // if (!user?.email || !accessToken) {
      //   throw new Error('Invalid login response');
      // }
      
      // const authData = {
      //   email: user.email,
      //   role: (user.role as UserRole) || 'user',
      //   token: accessToken,
      //   isAuthenticated: true,
      // };
      
      // store.dispatch(signIn(authData));
      // return { 
      //   email: authData.email, 
      //   role: authData.role, 
      //   token: accessToken,
      //   user: user 
      // };
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
    throw new Error(errorMessage);
  }
}

// async googleLogin(credential: string): Promise<GoogleLoginResponse> {
//   try {
//     console.log(credential,"kkkkkkkddd")

//     // Send the user info to your backend for verification and user creation/login
//     const response = await api['user'].post('/google-login', {credential});


//     const { user, accessToken } = response.data;

//      store.dispatch(
//       signIn({
//         email:user.email,
//         role:user.role,
//         token:accessToken
//       })
//     )
//     store.dispatch(setTempUser({ tempUser: user }));

//     return user
//   } catch (error: unknown) {
//     console.error('Google login error:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Google login failed';
//     throw new Error(errorMessage);
//   }
// }


async googleLogin(credential: string): Promise<GoogleLoginResponse> {
  try {
    console.log(credential, "Google credential received");

    // Send the credential to your backend for verification and user creation/login
    const response = await api['user'].post('/google-login', { credential });

    const { user, accessToken } = response.data;

    if (!user?.email || !accessToken) {
      throw new Error('Invalid Google login response from server');
    }

    // Dispatch to Redux store
    store.dispatch(
      signIn({
        name:user.name,
        email: user.email,
        role: user.role || 'user', // Default role if not provided
        token: accessToken,
        isAuthenticated: true,
      })
    );
    
    store.dispatch(setTempUser({ tempUser: user }));

    // Return the expected GoogleLoginResponse format
    return {
      email: user.email,
      role: user.role || 'user',
      token: accessToken,
      user: user,
    };
    
  } catch (error: unknown) {
    console.error('Google login error:', error);
    
    // Handle different types of errors
    if (error instanceof Error) {
      throw new Error(`Google login failed: ${error.message}`);
    } else {
      throw new Error('Google login failed: Unknown error');
    }
  }
}

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
      
      // Handle different response formats
      if (Array.isArray(response.data)) {
        colleges = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        colleges = response.data.data;
      } else {
        throw new Error('Invalid response format');
      }
      
      // Transform all colleges to MeleteICollege format
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

    // Handle different response formats
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

  async createUser(userData: IAdminUser): Promise<void> {
    try {
      // Fixed: Pass userData in the POST request
      const response = await api['admin'].post('/create-user', userData);
      // No need to handle array responses for createUser, as it typically returns the created user or nothing
      if (!response.data.success) {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      console.error('Error in createUser:', error);
      throw new Error('Failed to create user');
    }
  }

  async updateAdminUser(userId: string, updateData: IAdminUser): Promise<IAdminUser> {
    try {
      // Fixed: Correct URL template literal syntax
      const response = await api['admin'].patch(`/update-user/${userId}`, updateData);

      if (response.data.success && response.data.data) {
        return response.data.data as IAdminUser;
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error in updateAdminUser:', error);
      throw new Error('Failed to update user');
    }
  }

  async getUsersList(): Promise<IAdminUser[]> {
    try {
      const response = await api['admin'].get('/users-list');
      console.log(response.data, "controller get all users");

      // Handle different response formats
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error in getUsersList:', error);
      throw new Error('Failed to fetch users');
    }
  }
async checkStatus(): Promise<boolean> {
  try {
    const response = await api['user'].get('/check');

    return response.data.exists; 
  } catch (error) {
    console.error("Error in checkStatus:", error);
    throw new Error("Failed to check status");
  }
}


  async logout():Promise<void>{
    try{
    await api['admin'].post('/admin-logout')
    store.dispatch(signOut()); 
    }catch(error){
      console.log("error");
      
    }
  }
}

export default new AuthService();









