import { inject, injectable } from "tsyringe";
import { IAdminAuthRepository } from "./interface/IAdminAuthRepository";
import { IAdmin } from "../interfaces/IAdmin";
import { ICounsellor } from "../interfaces/ICounsellor";
import { Model } from "mongoose";

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
class AdminAuthRepository implements IAdminAuthRepository {
    private readonly adminModel: Model<IAdmin>;
    private readonly counsellorModel: Model<ICounsellor>;

    constructor(
        @inject("AdminModel") adminModel: Model<IAdmin>,
        @inject("CounsellorModel") counsellorModel: Model<ICounsellor>
    ) {
        this.adminModel = adminModel;
        this.counsellorModel = counsellorModel;
    }

    async findByEmail(email: string): Promise<IAdmin | null> {
        try {
            return await this.adminModel.findOne({ email });
        } catch (error) {
            console.error("Error finding admin by email:", error);
            return null;
        }
    }

    async findAdminById(id: string): Promise<IAdmin | null> {
        try {
            return await this.adminModel.findById(id).select("-password").lean();
        } catch (error) {
            console.error("Error finding admin by ID:", error);
            return null;
        }
    }

    async addCounsellor(currentId: string, counsellorData: ICounsellorData): Promise<ICounsellor> {
        try {
          console.log("❤️❤️❤️❤️❤️❤️");
          
            // Verify admin exists
            const admin = await this.counsellorModel.findById(currentId);
            if (admin) {
                throw new Error("Admin not found");
            }

            // Create new counsellor document
            const counsellor = new this.counsellorModel({
                ...counsellorData,
                createdBy: currentId,
                createdAt: new Date(),
            });

            // Save counsellor to database
            const savedCounsellor = await counsellor.save();
            return savedCounsellor.toObject();
        } catch (error) {
            console.error("Error adding counsellor:", error);
            throw new Error(error instanceof Error ? error.message : "Failed to add counsellor");
        }
    }
    async getCounsellors(): Promise<ICounsellor[]> {
    try {
     return await this.counsellorModel.find({ isBlocked: false }).exec();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }
 async frontGetCounsellors(): Promise<ICounsellor[]> {
    try {
      return await this.counsellorModel
        .find({})
        .sort({ experience: -1 }) 
        .exec();
    } catch (error) {
      console.error("Error fetching counsellors:", error);
      throw new Error("Failed to fetch counsellors");
    }
}

   async findUserById(id: string): Promise<ICounsellor | null> {
    try {
      return await this.counsellorModel.findById(id).select("-password").lean();
    } catch (error) {
      throw new Error("Error finding user by ID: " + error);
    }
  }
 async blockCounsellors(userId: string): Promise<ICounsellor> {
  try {
    
    const user = await this.counsellorModel
      .findByIdAndUpdate(userId, { isBlocked: true }, { new: true })
      .exec();
    if (!user) {
      throw new Error("User not found");
    }
    return user.toObject();
  } catch (error) {
    console.error("Repository Error - blockUser:", error);
    throw new Error(`Failed to block user`);
  }
}

async unBlockCounsellors(userId: string): Promise<ICounsellor> {
  try {
    console.log("looooooooo");
    const user = await this.counsellorModel
      .findByIdAndUpdate(userId, { isBlocked: false }, { new: true })
      .exec();
    console.log(user, "repository user ");
    if (!user) {
      throw new Error("User not found");
    }
    return user.toObject();
  } catch (error) {
    console.error("Repository Error - unBlockUser:", error);
    throw new Error(`Failed to unblock user`);
  }
}
// In AdminAuthRepository.ts
async updateCounsellor(id: string, counsellorData: ICounsellorData & { rating?: number; sessions?: number; isBlocked?: boolean }): Promise<ICounsellor> {
  try {
    const updatedCounsellor = await this.counsellorModel
      .findByIdAndUpdate(
        id,
        { $set: counsellorData },
        { new: true, runValidators: true }
      )
      .exec();
    
    if (!updatedCounsellor) {
      throw new Error("Counsellor not found");
    }
    
    return updatedCounsellor.toObject();
  } catch (error) {
    console.error("Repository Error - updateCounsellor:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to update counsellor");
  }
}
}

export default AdminAuthRepository;