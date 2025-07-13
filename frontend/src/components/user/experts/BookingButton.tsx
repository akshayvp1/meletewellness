import React from 'react';
import { Consultant } from '@/types/types';

interface BookingButtonProps {
  consultant: Consultant;
}

const BookingButton: React.FC<BookingButtonProps> = ({ consultant }) => {
  const handleBookSession = (): void => {
    const phoneNumber = '+918943175522';
    const expertise = Array.isArray(consultant.expertise) ? consultant.expertise.join(', ') : consultant.expertise || 'General Counseling';
    const languages = Array.isArray(consultant.languages) ? consultant.languages.join(', ') : consultant.languages || 'English';
    const counsellingTypes = Array.isArray(consultant.counsellingTypes) ? consultant.counsellingTypes.join(', ') : consultant.counsellingTypes || 'Individual Counseling';
    
    const experienceText = consultant.experience !== undefined && consultant.experience > 0 
      ? `\n- Experience: ${consultant.experience}+ years` 
      : '';
    
    const message = `Hello, I'm interested in booking a session with ${consultant.name}.\n\nDetails:\n- Qualification: ${consultant.qualification || 'Professional Counselor'}\n- Expertise: ${expertise}\n- Languages: ${languages}\n- Counseling: ${counsellingTypes}${experienceText}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleBookSession}
      className="w-full bg-[#015F4A] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#013F3A] transition-colors duration-300 mt-4"
    >
      Book Session
    </button>
  );
};

export default BookingButton;









// // src/services/AuthService.ts
// import { api } from '../utils/axiosInterceptor';
// import { store } from '../store/app/store';
// import { signIn, signOut } from '../store/features/authSlice';
// import { UserRole } from '../types/auth/auth.types';
// import { Consultant } from '../types/types';

// interface ICounsellorData {
//   name: string;
//   qualification: string;
//   expertise: string[];
//   languages: string[];
//   counsellingTypes: string[];
//   experience: number;
//   location: string;
//   imageUrl?: string;
//   bio: string;
//   email: string;
//   phone: string;
//   specialization: string;
// }

// interface LoginResponse {
//   email: string;
//   role: UserRole;
//   token: string;
// }

// interface StatusResponse {
//   success: boolean;
//   message?: string;
//   user?: any;
// }

// interface CounsellorApiResponse {
//   _id?: string;
//   id?: string;
//   name?: string;
//   qualification?: string;
//   expertise?: string[];
//   languages?: string[];
//   counsellingTypes?: string[];
//   counseling?: string[];
//   experience?: number;
//   location?: string;
//   imageUrl?: string;
//   image?: string;
//   bio?: string;
//   email?: string;
//   phone?: string;
//   specialization?: string;
//   rating?: number;
//   sessions?: number;
//   isBlocked?: boolean;
//   isVerified?: boolean;
//   createdAt?: string;
// }

// interface CounsellorUpdatePayload {
//   name: string;
//   qualification: string;
//   expertise: string[];
//   languages: string[];
//   counsellingTypes: string[];
//   experience: number;
//   location: string;
//   imageUrl: string;
//   bio: string;
//   email: string;
//   phone: string;
//   specialization: string;
//   rating: number;
//   sessions: number;
//   isBlocked: boolean;
//   isVerified: boolean;
//   createdAt: string;
// }

// interface ExpertiseData {
//   name: string;
//   description: string;
//   isActive: boolean;
// }


// interface UserLoginData {
//   email: string;
//   password: string;
//   name?: string;
//   mobile?: string;
//   confirmPassword?: string;
// }

// interface UserLoginResponse {
//   email: string;
//   role: UserRole;
//   token: string;
//   user?: any;
// }

// interface GoogleLoginResponse {
//   email: string;
//   role: UserRole;
//   token: string;
//   user?: any;
// }

// class AuthService {
//   async login(email: string, password: string): Promise<LoginResponse> {
//     try {
//       const response = await api['admin'].post('/verify-login', { email, password });
//       const { user, accessToken } = response.data;

//       if (!user?._doc?.email || !['admin', 'user', 'counsellor'].includes(user._doc.role) || !accessToken) {
//         throw new Error('Invalid response data');
//       }

//       const loginData = {
//         email: user._doc.email,
//         role: user._doc.role as UserRole,
//         token: accessToken,
//         isAuthenticated: true,
//       };

//       store.dispatch(signIn(loginData));
//       return { email: loginData.email, role: loginData.role, token: accessToken };
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to verify login';
//       throw new Error(errorMessage);
//     }
//   }

//   async checkStatus(): Promise<StatusResponse> {
//     try {
//       const response = await api['admin'].get('/check-status');
//       return {
//         success: true,
//         user: response.data.user,
//         message: response.data.message || 'Status check successful'
//       };
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to check status';
//       return {
//         success: false,
//         message: errorMessage
//       };
//     }
//   }

//   async addCounsellor(counsellorData: ICounsellorData): Promise<void> {
//     try {
//       await api['admin'].post('/add-counsellor', counsellorData);
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to add counsellor';
//       throw new Error(errorMessage);
//     }
//   }

//   private mapCounsellorData(item: CounsellorApiResponse): Consultant {
//     return {
//       id: item._id || item.id || '',
//       name: item.name || '',
//       qualification: item.qualification || '',
//       expertise: item.expertise || [],
//       languages: item.languages || [],
//       counsellingTypes: item.counsellingTypes || item.counseling || [],
//       experience: item.experience || 0,
//       location: item.location || '',
//       image: item.imageUrl || item.image || 'https://via.placeholder.com/150',
//       bio: item.bio || '',
//       email: item.email || '',
//       phone: item.phone || '',
//       specialization: item.specialization || '',
//       rating: item.rating || 0,
//       sessions: item.sessions || 0,
//       isBlocked: item.isBlocked || false,
//       isVerified: item.isVerified || false,
//       createdAt: item.createdAt || '',
//     };
//   }

//   async getCounsellors(): Promise<Consultant[]> {
//     try {
//       const response = await api['admin'].get('/get-counsellors');
//       if (!Array.isArray(response.data)) {
//         throw new Error('Invalid response format: Expected an array of counsellors');
//       }
//       return response.data.map((item: CounsellorApiResponse) => this.mapCounsellorData(item));
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to fetch counsellors';
//       throw new Error(errorMessage);
//     }
//   }

//   async frontGetCounsellors(): Promise<Consultant[]> {
//     try {
//       const response = await api['user'].get('/front-counsellors');
//       if (!Array.isArray(response.data)) {
//         throw new Error('Invalid response format: Expected an array of counsellors');
//       }
//       return response.data.map((item: CounsellorApiResponse) => this.mapCounsellorData(item));
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to fetch counsellors';
//       throw new Error(errorMessage);
//     }
//   }

//   async blockCounsellor(userId: string): Promise<Consultant> {
//     try {
//       const response = await api['admin'].patch(`/block-counsellor/${userId}`);
//       return this.mapCounsellorData(response.data.data);
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to block counsellor';
//       throw new Error(errorMessage);
//     }
//   }

//   async unblockCounsellor(userId: string): Promise<Consultant> {
//     try {
//       const response = await api['admin'].patch(`/unblock-counsellor/${userId}`);
//       return this.mapCounsellorData(response.data.data);
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to unblock counsellor';
//       throw new Error(errorMessage);
//     }
//   }

//   // Helper function to convert Consultant to API payload format
//   private consultantToPayload(counsellorData: Consultant): CounsellorUpdatePayload {
//   return {
//     name: counsellorData.name,
//     qualification: counsellorData.qualification,
//     expertise: counsellorData.expertise,
//     languages: counsellorData.languages,
//     counsellingTypes: counsellorData.counsellingTypes,
//     experience: counsellorData.experience,
//     location: counsellorData.location,
//     imageUrl: counsellorData.image,
//     bio: counsellorData.bio,
//     email: counsellorData.email,
//     phone: counsellorData.phone,
//     specialization: counsellorData.specialization,
//     rating: counsellorData.rating,
//     sessions: counsellorData.sessions,
//     isBlocked: counsellorData.isBlocked,
//     isVerified: counsellorData.isVerified ?? false, // Provide default value
//     createdAt: counsellorData.createdAt ?? '',      // Provide default value
//   };
// }

//   async updateCounsellor(id: string, counsellorData: Consultant): Promise<void> {
//     try {
//       const payload = this.consultantToPayload(counsellorData);
//       await api['admin'].put(`/update-counsellor/${id}`, payload);
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to update counsellor';
//       throw new Error(errorMessage);
//     }
//   }

//   async addExpertise(expertiseData: ExpertiseData): Promise<{ success: boolean; id: string }> {
//     try {
//       const response = await api['admin'].post('/add-expertise', expertiseData);
//       return { success: true, id: response.data.id || Date.now().toString() };
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || 'Failed to add expertise');
//     }
//   }

//   async updateExpertise(id: string, expertiseData: ExpertiseData): Promise<{ success: boolean }> {
//     try {
//       await api['admin'].put(`/update-expertise/${id}`, expertiseData);
//       return { success: true };
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || 'Failed to update expertise');
//     }
//   }

//   async deleteExpertise(id: string): Promise<{ success: boolean }> {
//     try {
//       await api['admin'].delete(`/delete-expertise/${id}`);
//       return { success: true };
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || 'Failed to delete expertise');
//     }
//   }



//   async userLogin(loginData: UserLoginData): Promise<UserLoginResponse> {
//   try {
//     // Determine if this is a signup or login based on the presence of name
//     const isSignUp = !!loginData.name;
    
//     if (isSignUp) {
//       // User registration
//       const response = await api['user'].post('/register', {
//         name: loginData.name,
//         email: loginData.email,
//         password: loginData.password,
//         mobile: loginData.mobile,
//         confirmPassword: loginData.confirmPassword
//       });
      
//       const { user, accessToken } = response.data;
      
//       if (!user?.email || !accessToken) {
//         throw new Error('Invalid registration response');
//       }
      
//       const authData = {
//         email: user.email,
//         role: (user.role as UserRole) || 'user',
//         token: accessToken,
//         isAuthenticated: true,
//       };
      
//       store.dispatch(signIn(authData));
//       return { 
//         email: authData.email, 
//         role: authData.role, 
//         token: accessToken,
//         user: user 
//       };
//     } else {
//       // User login
//       const response = await api['user'].post('/login', {
//         email: loginData.email,
//         password: loginData.password
//       });
      
//       const { user, accessToken } = response.data;
      
//       if (!user?.email || !accessToken) {
//         throw new Error('Invalid login response');
//       }
      
//       const authData = {
//         email: user.email,
//         role: (user.role as UserRole) || 'user',
//         token: accessToken,
//         isAuthenticated: true,
//       };
      
//       store.dispatch(signIn(authData));
//       return { 
//         email: authData.email, 
//         role: authData.role, 
//         token: accessToken,
//         user: user 
//       };
//     }
//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
//     throw new Error(errorMessage);
//   }
// }

// async googleLogin(): Promise<GoogleLoginResponse> {
//   try {
//     // Option 1: If you have a backend endpoint that handles Google OAuth
//     const response = await api['user'].post('/google-login');
    
//     const { user, accessToken } = response.data;
    
//     if (!user?.email || !accessToken) {
//       throw new Error('Invalid Google login response');
//     }
    
//     const authData = {
//       email: user.email,
//       role: (user.role as UserRole) || 'user',
//       token: accessToken,
//       isAuthenticated: true,
//     };
    
//     store.dispatch(signIn(authData));
//     return { 
//       email: authData.email, 
//       role: authData.role, 
//       token: accessToken,
//       user: user 
//     };
    
//     // Option 2: If you need to handle Google OAuth on the frontend
//     // You would typically use Google's JavaScript SDK here
//     // Example with Google OAuth SDK:
//     /*
//     const googleResponse = await new Promise((resolve, reject) => {
//       window.gapi.load('auth2', () => {
//         const auth2 = window.gapi.auth2.init({
//           client_id: 'YOUR_GOOGLE_CLIENT_ID'
//         });
        
//         auth2.signIn().then(resolve).catch(reject);
//       });
//     });
    
//     const profile = googleResponse.getBasicProfile();
//     const idToken = googleResponse.getAuthResponse().id_token;
    
//     // Send the token to your backend for verification
//     const response = await api['user'].post('/google-verify', {
//       idToken: idToken,
//       email: profile.getEmail(),
//       name: profile.getName()
//     });
    
//     // Handle the response similar to above
//     */
    
//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error ? error.message : 'Google login failed';
//     throw new Error(errorMessage);
//   }
// }

//   async logout(): Promise<void> {
//     try {
//       await api['admin'].post('/admin-logout');
//       store.dispatch(signOut());
//     } catch (error) {
//       console.log("Logout error:", error);
//     }
//   }
// }

// export default new AuthService();