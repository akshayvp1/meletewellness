




import {NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IAdminAuthController } from "./interface/IAdminAuthController";
import AdminAuthService from "../services/AdminAuthService";
import { ITokenPayload } from "../utils/jwt";
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
class AdminAuthController implements IAdminAuthController {
  constructor(
    @inject("AdminAuthService") private adminAuthService: AdminAuthService
  ) {}

  signIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const signInResult = await this.adminAuthService.signIn(email, password);

      if (!signInResult.isMatch) {
        res.status(400).json({
          success: false,
          message: signInResult.message || "Incorrect email or password.",
        });
        return;
      }

      const { accessToken, refreshToken, user } = signInResult;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        accessToken,
        user,
        message: "Login successful.",
      });
    } catch (error) {
      console.error("Error in signIn controller:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  };

  addCounsellor = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("daaaa");

      const currentId = req.user?.id;
      if (!currentId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const counsellorData: ICounsellorData = req.body;

      // Validate required fields
      if (
        !counsellorData.name ||
        // !counsellorData.email ||
        !counsellorData.location ||
        !counsellorData.qualification ||
        !counsellorData.experience
      ) {
        res.status(400).json({ success: false, message: "Missing required fields" });
        return;
      }

      const counsellor = await this.adminAuthService.addCounsellor(currentId, counsellorData);

      res.status(201).json({
        success: true,
        data: counsellor,
        message: "Counsellor added successfully",
      });
    } catch (error: any) {
      console.error("Error in addCounsellor controller:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to add counsellor",
      });
    }
  };

  getCounsellors = async (_req: Request, res: Response): Promise<void> => {
    try {
      const counsellors = await this.adminAuthService.getCounsellors();
      res.status(200).json(counsellors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  frontGetCounsellors = async (_req: Request, res: Response): Promise<void> => {
    console.log("oooooo");
    try {
      
      
      const counsellors = await this.adminAuthService.frontGetCounsellors();
      res.status(200).json(counsellors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  blockCounsellors = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      console.log(userId, "userid");
      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }
      const updatedCounsellor = await this.adminAuthService.blockCounsellors(userId);
      res.status(200).json({
        success: true,
        data: updatedCounsellor,
        message: "Counsellor blocked successfully",
      });
    } catch (error: any) {
      console.error("Controller Error - blockUser:", error);
      res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
  };

  unBlockCounsellors = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      console.log(userId, "oooo");
      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }
      const updatedCounsellor = await this.adminAuthService.unBlockCounsellors(userId);
      res.status(200).json({
        success: true,
        data: updatedCounsellor,
        message: "Counsellor unblocked successfully",
      });
    } catch (error: any) {
      console.error("Controller Error - unblockUser:", error);
      res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
  };

  updateCounsellor = async (req: Request, res: Response): Promise<void> => {
    try {
      const currentId = req.user?.id;
      if (!currentId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const { id } = req.params;
      const counsellorData: ICounsellorData & { rating?: number; sessions?: number; isBlocked?: boolean } = req.body;

      // Validate required fields
      if (
        !counsellorData.name ||
        // !counsellorData.email ||
        !counsellorData.location ||
        !counsellorData.qualification ||
        !counsellorData.experience
      ) {
        res.status(400).json({ success: false, message: "Missing required fields" });
        return;
      }

      const updatedCounsellor = await this.adminAuthService.updateCounsellor(id as string, counsellorData);

      res.status(200).json({
        success: true,
        data: updatedCounsellor,
        message: "Counsellor updated successfully",
      });
    } catch (error: any) {
      console.error("Error in updateCounsellor controller:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to update counsellor",
      });
    }
  };

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies?.refreshToken;
      console.log("Refresh token from cookie:", refreshToken);

      if (!refreshToken) {
        res.status(401).json({ success: false, message: "Refresh token is required" });
        return;
      }

      // Use AdminAuthService's refreshAccessToken method
      const result = await this.adminAuthService.refreshAccessToken(refreshToken);

      if (!result.success) {
        res.status(401).json({ success: false, message: result.message });
        return;
      }

      // Set new refresh token in cookie
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        accessToken: result.accessToken,
        user: result.user,
        message: result.message,
      });
    } catch (error: any) {
      console.error("Error refreshing token:", error);
      res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
  };
    async checkStatus(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as ITokenPayload;
      res.status(200).json({ success: true, message: "User status verified", user });
    } catch (error: any) {
      console.error("Error in checkStatus:", error);
      res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
  }
  adminLogout = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      res.status(200).json({
        message: "User signed out successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default AdminAuthController;