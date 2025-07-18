'use client';

// src/services/AuthService.ts
import { api } from '@/utils/axiosInterceptor';
import { UserRole } from '@/types/auth/auth.types';
import { store } from '@/store/app/store';
import { signIn } from '@/store/features/authSlice';
import { signOut } from '@/store/features/authSlice';

interface LoginResponse {
  email: string;
  role: UserRole;
  token: string;
}

class AdminAuthService {

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

        async logout():Promise<void>{
    try{
    await api['admin'].post('/admin-logout')
    store.dispatch(signOut()); 
    }catch(error){
      console.log("error");
      
    }
  }
    

}
export default new AdminAuthService();
