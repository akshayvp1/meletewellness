




import { inject, injectable } from "tsyringe";
import { ITokenPayload, generateTokens, verifyRefreshToken } from "../utils/jwt"; // Use verifyRefreshToken from JWT utils
import bcrypt from "bcryptjs";
import { IAdmin } from "../interfaces/IAdmin";
import AdminAuthRepository from "../repositories/AdminAuthRepository";
import { IAdminAuthService } from "./interface/IAdminAuthService";
import { ICounsellor } from "../interfaces/ICounsellor";
import { IUser } from "../interfaces/IUser";
import { ICollege } from "../interfaces/ICollege";
import { IAdminUser } from "../interfaces/IAdminUser";
import { IExpertise } from "../interfaces/IExpertise";
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
export interface googleSignInResult {
  user?: IUser;
  accessToken?: string;
  refreshToken?: string;
  // partialUser: boolean;
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

export interface AddCollegeData {
  collegeName: string;
  mobile: string;
  email: string;
  isActive: boolean;
  expiresAt?: Date;
}

export interface UpdateCollegeData {
  collegeName?: string;
  mobile?: string;
  email?: string;
  isActive?: boolean;
  expiresAt?: Date;
}

@injectable()
class AdminAuthService implements IAdminAuthService {
  constructor(
    @inject("AdminAuthRepository") private adminAuthRepository: AdminAuthRepository,
    
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

  

  async GoogleLogin(credential: string): Promise<googleSignInResult> {
  try {
    // First verify the Google credential and get/create user
    const result = await this.adminAuthRepository.GoogleLogin(credential);
    const { user } = result;

    if (!user) {
      throw new Error("Failed to authenticate user with Google");
    }

    // Generate tokens for the authenticated user
    const tokenPayload: ITokenPayload = {
      id: user._id!.toString(),
      email: user.email,
      role: user.role || 'user', // Default role if not set
    };

    const { accessToken, refreshToken } = generateTokens(tokenPayload);

    return { user, accessToken, refreshToken };

  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw new Error("Failed to authenticate using Google.");
  }
}

async addCollegeData(collegeData: AddCollegeData): Promise<ICollege> {
    try {
      const existingCollege = await this.adminAuthRepository.findCollegeByName(collegeData.collegeName);
      if (existingCollege) {
        throw new Error("College with this name already exists");
      }

      const existingEmail = await this.adminAuthRepository.findCollegeByEmail(collegeData.email);
      if (existingEmail) {
        throw new Error("College with this email already exists");
      }

      const newCollege = await this.adminAuthRepository.addCollegeData(collegeData);
      return newCollege;
    } catch (error: any) {
      console.error("Service Error (addCollegeData):", error);
      throw error;
    }
  }

  async UpdateCollegeData(editingId: string, updateData: UpdateCollegeData): Promise<ICollege> {
    try {
      const college = await this.adminAuthRepository.findcollegeById(editingId);
      if (!college) {
        throw new Error("College not found");
      }

      // Check for duplicate name/email only if they're being updated
      if (updateData.collegeName && updateData.collegeName !== college.collegeName) {
        const existingCollege = await this.adminAuthRepository.findCollegeByName(updateData.collegeName);
        if (existingCollege && existingCollege._id?.toString() !== editingId) {
          throw new Error("College with this name already exists");
        }
      }

      if (updateData.email && updateData.email !== college.email) {
        const existingEmail = await this.adminAuthRepository.findCollegeByEmail(updateData.email);
        if (existingEmail && existingEmail._id?.toString() !== editingId) {
          throw new Error("College with this email already exists");
        }
      }

      return await this.adminAuthRepository.updateCollege(editingId, updateData);
    } catch (error: any) {
      console.error("Error in UpdateCollegeData service:", error);
      throw error;
    }
  }

  async getAllColleges(): Promise<ICollege[]> {
    try {
      const colleges = await this.adminAuthRepository.getAllColleges();
      return colleges || [];
    } catch (error: any) {
      console.error("Error in getAllColleges service:", error);
      throw new Error("Failed to retrieve colleges");
    }
  }




  async getCollegesList(): Promise<ICollege[]> {
    try {
      const colleges = await this.adminAuthRepository.getCollegesList();
      return colleges || [];
    } catch (error: any) {
      console.error("Error in getAllColleges service:", error);
      throw new Error("Failed to retrieve colleges");
    }
  }
  
  async createUser(userData:IAdminUser): Promise<IAdminUser> {
    try {
      

      const existingEmail = await this.adminAuthRepository.findUserByEmail(userData.email);
      if (existingEmail) {
        throw new Error("College with this email already exists");
      }

      const newUser = await this.adminAuthRepository.createUser(userData);
      return newUser;
    } catch (error: any) {
      console.error("Service Error (addCollegeData):", error);
      throw error;
    }
  }
  
  async updateAdminUser(userId: string, updateData: IAdminUser): Promise<IAdminUser> {
    try {
      const user = await this.adminAuthRepository.findAdminUserById(userId);
      if (!user) {
        throw new Error("user not found");
      }

      return await this.adminAuthRepository.updateAdminUser(userId, updateData);
    } catch (error: any) {
      console.error("Error in UpdateCollegeData service:", error);
      throw error;
    }
  }

   async getUsersList(): Promise<IAdminUser[]> {
    try {
      const users = await this.adminAuthRepository.getUsersList();
      return users || [];
    } catch (error: any) {
      console.error("Error in getAllColleges service:", error);
      throw new Error("Failed to retrieve colleges");
    }
  }
  
  async getExpertise(): Promise<IExpertise[]> {
    try {
       
      const expertises = await this.adminAuthRepository.getExpertise();
      return expertises || [];
    } catch (error: any) {
      console.error("Error in expertise service:", error);
      throw new Error("Failed to retrieve expertise");
    }
  }
  async addExpertise(expertiseData: IExpertise): Promise<IExpertise> {
  try {
    const name = expertiseData.name
    const existingexpertise = await this.adminAuthRepository.findExpertiseByName(name);
      if (existingexpertise) {
        throw new Error("expertise already exists");
      }
      const expertise = await this.adminAuthRepository.addExpertise(expertiseData);
      return expertise
    } catch (error: any) {
      console.error("Error in expertise service:", error);
      throw new Error("Failed to retrieve expertise");
    }
 }
async updateExpertise(id: string, expertiseData: IExpertise): Promise<IExpertise> {
  try {
    const expertise = await this.adminAuthRepository.findExpertiseById(id);
    if (!expertise) {
      throw new Error("Expertise not found");
    }
     return await this.adminAuthRepository.updateExpertise(id, expertiseData);

  }
  catch(error: any) {
    console.error("Error in expertise service:", error);
    throw new Error("Failed to update expertise");
  }
}
async blockExpertise(id: string): Promise<IExpertise | null> {
try{
   const expertise = await this.adminAuthRepository.findExpertiseById(id);
      if (!expertise) {
        throw new Error("expertise not found");
      }
  return this.adminAuthRepository.blockExpertise(id);
}catch(error: any) {
  console.error("Error in expertise service:", error);
  throw new Error("Failed to block expertise");
}
}

async unBlockExpertise(id: string): Promise<IExpertise | null> {
  try {
    const expertise = await this.adminAuthRepository.findExpertiseById(id);
    if (!expertise) {
      throw new Error("expertise not found");
    }
    return this.adminAuthRepository.unBlockExpertise(id);
  }catch (error: any) {
    console.error("Error in expertise service:", error);
    throw new Error("Failed to unblock expertise");
  }
  }

  async Check(email: string): Promise<boolean> {
  try {
    const response = await this.adminAuthRepository.Check(email);
    return response;
  } catch (error: any) {
    console.error("Error in Check service:", error);
    throw new Error("Failed to check email");
  }
}
  async contactUs(formData: { name: string; email: string; phone: string; message: string }): Promise<void> {
    try {
      await this.adminAuthRepository.contactUs(formData);
    } catch (error: any) {
      console.error("Error in contactUs service:", error);
      throw new Error(error.message || "Failed to send contact message");
    } 
  }


  }


export default AdminAuthService;