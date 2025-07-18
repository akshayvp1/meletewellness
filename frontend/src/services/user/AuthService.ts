"use client";

import { api } from "../../utils/axiosInterceptor";
import { store } from "../../store/app/store";
import { signIn } from "../../store/features/authSlice";
import { UserRole } from "../../types/auth/auth.types";
import { setTempUser } from "@/store/features/tempSlice";

interface UserLoginData {
  email: string;
  password: string;
  name?: string;
  mobile?: string;
  confirmPassword?: string;
}

interface GoogleLoginResponse {
  email: string;
  role: UserRole;
  token: string;
  user?: any;
}

// export interface UpdateCollegeData {
//   collegeName: string;
//   mobile?: string;
//   email?: string;
//   isActive?: boolean;
//   expiresAt?: Date;
// }

class AuthService {
  async userLogin(loginData: UserLoginData): Promise<void> {
    try {
      const isSignUp = !!loginData.name;

      if (isSignUp) {
        const response = await api["user"].post("/register", {
          name: loginData.name,
          email: loginData.email,
          password: loginData.password,
          mobile: loginData.mobile,
          confirmPassword: loginData.confirmPassword,
        });

        const { user, accessToken } = response.data;

        if (!user?.email || !accessToken) {
          throw new Error("Invalid registration response");
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
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      throw new Error(errorMessage);
    }
  }

  async googleLogin(credential: string): Promise<GoogleLoginResponse> {
    try {
      console.log(credential, "Google credential received");

      const response = await api["user"].post("/google-login", { credential });

      const { user, accessToken } = response.data;

      if (!user?.email || !accessToken) {
        throw new Error("Invalid Google login response from server");
      }
      store.dispatch(
        signIn({
          name: user.name,
          email: user.email,
          role: user.role || "user",
          token: accessToken,
          isAuthenticated: true,
        })
      );

      store.dispatch(setTempUser({ tempUser: user }));

      return {
        email: user.email,
        role: user.role || "user",
        token: accessToken,
        user: user,
      };
    } catch (error: unknown) {
      console.error("Google login error:", error);

      if (error instanceof Error) {
        throw new Error(`Google login failed: ${error.message}`);
      } else {
        throw new Error("Google login failed: Unknown error");
      }
    }
  }

  async checkStatus(): Promise<boolean> {
    try {
      const response = await api["user"].get("/check");

      return response.data.exists;
    } catch (error) {
      console.error("Error in checkStatus:", error);
      throw new Error("Failed to check status");
    }
  }
}

export default new AuthService();
