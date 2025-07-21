"use client";

import { api } from "../../utils/axiosInterceptor";
import { store } from "../../store/app/store";
import { signIn, signOut } from "../../store/features/authSlice";
import { UserRole } from "../../types/auth/auth.types";
import { setTempUser } from "@/store/features/tempSlice";
import { IUser } from "../../types/auth/auth.types";

interface UserLoginData {
  email: string;
  password: string;
  name?: string;
  mobile?: string;
  confirmPassword?: string;
}

interface AuthResponse {
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

class AuthService {
  async userLogin(loginData: UserLoginData): Promise<AuthResponse> {
    try {
      const isSignUp = !!loginData.name;

      if (isSignUp) {
        // Handle user registration
        const response = await api["user"].post("/register", {
          name: loginData.name,
          email: loginData.email,
          password: loginData.password,
          mobile: loginData.mobile,
        });

        const { user, accessToken } = response.data;

        if (!user?.email || !accessToken) {
          throw new Error("Invalid registration response");
        }

        // Dispatch actions to store
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

        // Return the response data
        return {
          email: user.email,
          role: user.role || "user",
          token: accessToken,
          user: user,
        };
      } else {
        // Handle user login
        const response = await api["user"].post("/login", {
          email: loginData.email,
          password: loginData.password,
        });

        const { user, accessToken } = response.data;

        if (!user?.email || !accessToken) {
          throw new Error("Invalid login response");
        }

        // Dispatch actions to store
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

        // Return the response data
        return {
          email: user.email,
          role: user.role || "user",
          token: accessToken,
          user: user,
        };
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
          image: user.profile || null,
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

  async logout(): Promise<void> {
  try {
   
    await api["user"].post("/logout");
    store.dispatch(signOut());

  } catch (error: unknown) {
    console.error("Logout error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Logout failed";
    throw new Error(errorMessage);
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
