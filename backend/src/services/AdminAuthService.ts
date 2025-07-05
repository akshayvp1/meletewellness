




import { inject, injectable } from "tsyringe";
import { ITokenPayload, generateTokens, verifyRefreshToken } from "../utils/jwt"; // Use verifyRefreshToken from JWT utils
import bcrypt from "bcryptjs";
import { IAdmin } from "../interfaces/IAdmin";
import AdminAuthRepository from "../repositories/AdminAuthRepository";
import { IAdminAuthService } from "./interface/IAdminAuthService";
import { ICounsellor } from "../interfaces/ICounsellor";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Ensure secrets are defined
if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("JWT secrets are not defined in .env file");
}

interface SignInResult {
  isMatch: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
  user?: Omit<IAdmin, "password">;
}

interface RefreshTokenResult {
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
  user?: Omit<IAdmin, "password">;
}

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

@injectable()
class AdminAuthService implements IAdminAuthService {
  constructor(
    @inject("AdminAuthRepository") private adminAuthRepository: AdminAuthRepository
  ) {}

  async signIn(email: string, password: string): Promise<SignInResult> {
    try {
      const user = await this.adminAuthRepository.findByEmail(email);

      if (!user) {
        return { isMatch: false, message: "User not found." };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { isMatch: false, message: "Incorrect password." };
      }

      const payload: ITokenPayload = {
        id: user._id.toString(),
        email: user.email,
        role: user.role as "user" | "counsellor" | "admin",
      };

      const { accessToken, refreshToken } = generateTokens(payload);

      // Exclude password from user object
      const { password: _, ...safeUser } = user;

      return {
        isMatch: true,
        message: "Login successful.",
        accessToken,
        refreshToken,
        user: safeUser as Omit<IAdmin, "password">,
      };
    } catch (error) {
      console.error("Error during signIn:", error);
      return { isMatch: false, message: "Internal server error." };
    }
  }

  // New method for refreshing access token
  async refreshAccessToken(refreshToken: string): Promise<RefreshTokenResult> {
    try {
      // Verify refresh token using the utility function
      const decoded = await verifyRefreshToken(refreshToken);

      // Verify user exists in the database
      const user = await this.adminAuthRepository.findByEmail(decoded.email);
      console.log("decoded user",user);
      
      if (!user) {
        return { success: false, message: "User not found." };
      }

      // Verify user ID and role match
      if (user._id.toString() !== decoded.id || user.role !== decoded.role) {
        return { success: false, message: "Invalid token payload." };
      }

      // Generate new tokens
      const payload: ITokenPayload = {
        id: user._id.toString(),
        email: user.email,
        role: user.role as "user" | "counsellor" | "admin",
      };

      const { accessToken, refreshToken: newRefreshToken } = generateTokens(payload);

      // Exclude password from user object
      const { password: _, ...safeUser } = user;

      return {
        success: true,
        message: "Token refreshed successfully.",
        accessToken,
        refreshToken: newRefreshToken,
        user: safeUser as Omit<IAdmin, "password">,
      };
    } catch (error: any) {
      console.error("Error in refreshAccessToken:", error);
      return {
        success: false,
        message: error.message || "Failed to refresh access token.",
      };
    }
  }

  async addCounsellor(currentId: string, counsellorData: ICounsellorData): Promise<ICounsellor> {
    try {
      return await this.adminAuthRepository.addCounsellor(currentId, counsellorData);
    } catch (error: any) {
      console.error("Error in addCounsellor service:", error);
      throw new Error(error.message || "Failed to add counsellor");
    }
  }

  async getCounsellors(): Promise<ICounsellor[]> {
    try {
      const counsellors = await this.adminAuthRepository.getCounsellors();
      return counsellors || [];
    } catch (error: any) {
      console.error("Error in getCounsellors service:", error);
      throw new Error(error.message || "Failed to retrieve counsellors.");
    }
  }
   async frontGetCounsellors(): Promise<ICounsellor[]> {
    try {
      const counsellors = await this.adminAuthRepository.frontGetCounsellors();
      return counsellors || [];
    } catch (error: any) {
      console.error("Error in getCounsellors service:", error);
      throw new Error(error.message || "Failed to retrieve counsellors.");
    }
  }

  async blockCounsellors(userId: string): Promise<ICounsellor> {
    try {
      const user = await this.adminAuthRepository.findUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const updatedCounsellor = await this.adminAuthRepository.blockCounsellors(userId);
      return updatedCounsellor;
    } catch (error) {
      console.error("Error in blockCounsellors:", error);
      throw new Error("Failed to block counsellor");
    }
  }

  async unBlockCounsellors(userId: string): Promise<ICounsellor> {
    try {
      const user = await this.adminAuthRepository.findUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const updatedCounsellor = await this.adminAuthRepository.unBlockCounsellors(userId);
      return updatedCounsellor;
    } catch (error) {
      console.error("Error in unBlockCounsellors:", error);
      throw new Error("Failed to unblock counsellor");
    }
  }

  async updateCounsellor(id: string, counsellorData: ICounsellorData & { rating?: number; sessions?: number; isBlocked?: boolean }): Promise<ICounsellor> {
    try {
      const counsellor = await this.adminAuthRepository.findUserById(id);
      if (!counsellor) {
        throw new Error("Counsellor not found");
      }
      return await this.adminAuthRepository.updateCounsellor(id, counsellorData);
    } catch (error: any) {
      console.error("Error in updateCounsellor service:", error);
      throw new Error(error.message || "Failed to update counsellor");
    }
  }
}

export default AdminAuthService;