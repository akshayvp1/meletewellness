import { inject, injectable } from "tsyringe";
import { IAdminAuthRepository } from "./interface/IAdminAuthRepository";
import { IAdmin } from "../interfaces/IAdmin";
import { ICounsellor } from "../interfaces/ICounsellor";
import { Model } from "mongoose";
// import { User } from "../models/userModel";
import { IUser } from "../interfaces/IUser";
// import { ITokenPayload } from "../utils/jwt";
import { OAuth2Client } from "google-auth-library";
import { ICollege } from "../interfaces/ICollege";
import { IAdminUser } from "../interfaces/IAdminUser";
import { IExpertise } from "../interfaces/IExpertise";
import { ContactDocument } from "../interfaces/IContact";
import { EmployeeId } from "../interfaces/IEmployeeId";
import QRCode from 'qrcode';
import bwipjs from 'bwip-js';


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
class AdminAuthRepository implements IAdminAuthRepository {
    private readonly adminModel: Model<IAdmin>;
    private readonly counsellorModel: Model<ICounsellor>;
    private readonly userModel:Model<IUser>;
    private readonly collegeModel:Model<ICollege>
    private readonly adminUserModel:Model<IAdminUser>
    private readonly expertiseModel:Model<IExpertise> 
    private readonly contactModel: Model<ContactDocument>
    private readonly employeeModel:Model<EmployeeId>
    // Injecting models through constructor
    constructor(
        @inject("AdminModel") adminModel: Model<IAdmin>,
        @inject("CounsellorModel") counsellorModel: Model<ICounsellor>,
        @inject("UserModel")userModel:Model<IUser>,
        @inject("CollegeModel")collegeModel:Model<ICollege>,
        @inject("AdminUserModel")adminUserModel:Model<IAdminUser>,
        @inject("ExpertiseModel") expertiseModel: Model<IExpertise>,
        @inject("ContactModel") contactModel: Model<ContactDocument>,
        @inject("EmployeeModel") employeeModel:Model<EmployeeId>
    ) {
        this.adminModel = adminModel;
        this.counsellorModel = counsellorModel;
        this.userModel = userModel
        this.collegeModel = collegeModel
        this.adminUserModel=adminUserModel
        this.expertiseModel = expertiseModel;
        this.contactModel = contactModel;
        this.employeeModel = employeeModel;
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

// Repository Layer
async GoogleLogin(credential: string): Promise<any> {
  try {
    const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    if (!payload || !payload.email || !payload.name) {
      throw new Error("Invalid Google credentials.");
    }

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email: payload.email });
    
    if (existingUser) {
      // User exists, return existing user
      return { user: existingUser };
    }

    // If user doesn't exist, create one
    const newUser = new this.userModel({
      name: payload.name,
      email: payload.email,
      profile: payload.picture,
      isActive: true, // Assuming Google login means user is verified
    });

    await newUser.save();
    console.log('New user created via Google login');
    return { user: newUser };
    
  } catch (error) {
    console.error('Google login failed:', error);
    throw error; // Re-throw the error so service layer can handle it
  }
}


async findByUserEmail(email: string): Promise<IUser | null> {
    try {
      return await this.userModel.findOne({ email }).lean();
    } catch (error) {
      throw new Error("Error finding user by email: " + error);
    }
  }

  async addCollegeData(collegeData: AddCollegeData): Promise<ICollege> {
    try {
      const newCollege = new this.collegeModel(collegeData);
      const savedCollege = await newCollege.save();
      return savedCollege.toObject(); // Convert to plain object
    } catch (error: any) {
      console.error("Repository Error (addCollegeData):", error);
      if (error.code === 11000) {
        throw new Error("College with this email already exists");
      }
      throw error;
    }
  }

  async findcollegeById(editingId: string): Promise<ICollege | null> {
    try {
      return await this.collegeModel.findById(editingId).lean();
    } catch (error) {
      console.error("Error finding college by ID:", error);
      throw new Error("Error finding college by ID");
    }
  }

  async findCollegeByName(collegeName: string): Promise<ICollege | null> {
    try {
      return await this.collegeModel.findOne({ 
        collegeName: { $regex: new RegExp(`^${collegeName}$`, 'i') } 
      }).lean();
    } catch (error) {
      console.error("Error finding college by name:", error);
      throw new Error("Error finding college by name");
    }
  }

  async findCollegeByEmail(email: string): Promise<ICollege | null> {
    try {
      return await this.collegeModel.findOne({ email: email.toLowerCase() }).lean();
    } catch (error) {
      console.error("Error finding college by email:", error);
      throw new Error("Error finding college by email");
    }
  }

  async updateCollege(editingId: string, updateData: UpdateCollegeData): Promise<ICollege> {
    try {
      const updatedCollege = await this.collegeModel
        .findByIdAndUpdate(
          editingId,
          { $set: updateData },
          { new: true, runValidators: true }
        )
        .lean();
      
      if (!updatedCollege) {
        throw new Error("College not found");
      }
      
      return updatedCollege;
    } catch (error: any) {
      console.error("Repository Error - updateCollege:", error);
      if (error.code === 11000) {
        throw new Error("College with this email already exists");
      }
      throw error;
    }
  }

  async getAllColleges(): Promise<ICollege[]> {
    try {
      return await this.collegeModel.find({}).sort({ createdAt: -1 }).lean();
    } catch (error) {
      console.error("Error fetching colleges:", error);
      throw new Error("Failed to fetch colleges");
    }
  }
async getCollegesList(): Promise<ICollege[]> {
    try {
      return await this.collegeModel.find({}).sort({ createdAt: -1 }).lean();
    } catch (error) {
      console.error("Error fetching colleges:", error);
      throw new Error("Failed to fetch colleges");
    }
  }

  async findUserByEmail(email: string): Promise<IAdminUser | null> {
    try {
      return await this.adminUserModel.findOne({ email: email.toLowerCase() }).lean();
    } catch (error) {
      console.error("Error finding college by email:", error);
      throw new Error("Error finding college by email");
    }
  }
  async createUser(userData:IAdminUser): Promise<IAdminUser> {
    try {
      const newUser = new this.adminUserModel(userData);
      const savedUser = await newUser.save();
      return savedUser.toObject(); // Convert to plain object
    } catch (error: any) {
      console.error("Repository Error (addCollegeData):", error);
      if (error.code === 11000) {
        throw new Error("College with this email already exists");
      }
      throw error;
    }
  }

   async findAdminUserById(userId: string): Promise<IAdminUser | null> {
    try {
      return await this.adminUserModel.findById(userId).lean();
    } catch (error) {
      console.error("Error finding college by ID:", error);
      throw new Error("Error finding college by ID");
    }
  }

  async updateAdminUser(userId: string, updateData: IAdminUser): Promise<IAdminUser> {
    try {
      const updatedUser = await this.adminUserModel
        .findByIdAndUpdate(
          userId,
          { $set: updateData },
          { new: true, runValidators: true }
        )
        .lean();
      
      if (!updatedUser) {
        throw new Error("user not found");
      }
      
      return updatedUser;
    } catch (error: any) {
      console.error("Repository Error - updateCollege:", error);
      if (error.code === 11000) {
        throw new Error("College with this email already exists");
      }
      throw error;
    }
  }

  async getUsersList(): Promise<IAdminUser[]> {
    try {
      return await this.adminUserModel.find({}).sort({ createdAt: -1 }).lean();
    } catch (error) {
      console.error("Error fetching userlist:", error);
      throw new Error("Failed to fetch userlist");
    }
  }

   async getExpertise(): Promise<IExpertise[]> {
    try {
       
      return await this.expertiseModel.find({}).sort({ createdAt: -1 }).lean();
    } catch (error) {
      console.error("Error fetching expertiselist:", error);
      throw new Error("Failed to fetch expertiselist");
    }
  }

  findExpertiseByName(name: string): Promise<IExpertise | null> {
    try{
      return this.expertiseModel.findOne({ name: name.toLowerCase() }).lean();
    }
    catch (error) {
      console.error("Error finding expertise by name:", error);
      throw new Error("Error finding expertise by name");
    }
  }

  addExpertise(expertiseData: IExpertise): Promise<IExpertise> {
    try {
      const newExpertise = new this.expertiseModel(expertiseData);
      return newExpertise.save();
      }catch (error: any) {
      console.error("Repository Error (addExpertise):", error);
      throw new Error("Error finding expertise by name");
    }
  }
  findExpertiseById(id: string): Promise<IExpertise | null> {
    try {
      return this.expertiseModel.findById(id).lean();
    }catch (error) {
      console.error("Error finding expertise by ID:", error); 
      throw new Error("Error finding expertise by ID");
    }
  }
  async updateExpertise(id: string, expertiseData: IExpertise): Promise<IExpertise> {
    try {
      const updatedExpertise = await this.expertiseModel
        .findByIdAndUpdate(
          id,
          { $set: expertiseData },
          { new: true, runValidators: true }
        )
        .lean();
      
      if (!updatedExpertise) {
        throw new Error("Expertise not found");
      }
      
      return updatedExpertise;
    } catch (error: any) {
      console.error("Repository Error - updateExpertise:", error);
      throw new Error(error instanceof Error ? error.message : "Failed to update expertise");
    }
  } 
  blockExpertise(id: string): Promise<IExpertise | null> {
    try {
      return this.expertiseModel
        .findByIdAndUpdate(id, { isActive: false }, { new: true })
        .lean();
    }catch (error) {
      console.error("Error blocking expertise:", error);
      throw new Error("Failed to block expertise");
    }
  }
  unBlockExpertise(id: string): Promise<IExpertise | null> {
    try {
      return this.expertiseModel
        .findByIdAndUpdate(id, { isActive: true }, { new: true })
        .lean();
    }catch (error) {
      console.error("Error unblocking expertise:", error);
      throw new Error("Failed to unblock expertise");
    }
  }

  async Check(email: string): Promise<boolean> {
  try {
    const user = await this.adminUserModel.findOne({ email }).lean();
    return !!user; // returns true if user exists, false otherwise
  } catch (error) {
    console.error("Error in Check repository:", error);
    throw new Error("Failed to check email");
  }
}
  async contactUs(formData: { name: string; email: string; phone: string; message: string }): Promise<void> {
    try {
      const contactMessage = new this.contactModel(formData);
      await contactMessage.save();
      console.log("Contact message saved successfully");
    } catch (error: any) {
      console.error("Error in contactUs repository:", error);
      throw new Error(error.message || "Failed to send contact message");
    }

  }
  async findEmployeeByEmail(email: string): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ email }).lean();
      return !!user; // returns true if user exists, false otherwise

}

    catch (error) {
      console.error("Error in Check repository:", error);
      throw new Error("Failed to check email");
    }
  } 

async addEmployeeId(EmployeData: EmployeeId): Promise<EmployeeId> {
  try {
    const newEmployee = new this.employeeModel({
      ...EmployeData,
    });
    const id = EmployeData.employeeId;

   const profileUrl = `https://www.meletewellness.com/user/employeeid?id=${id}`;
   const qrCodeData = await QRCode.toDataURL(profileUrl);





    // ✅ Generate Barcode
  // Generate Barcode with URL text instead of just ID
const barcodeData = await bwipjs.toBuffer({
  bcid: 'code128',
  text: profileUrl, // Use full URL here
  scale: 3,
  height: 20,
  includetext: true,
  textxalign: 'center',
});
const barcodeBase64 = `data:image/png;base64,${barcodeData.toString('base64')}`;


    // ✅ Save images in DB
    newEmployee.qrCodeImage = qrCodeData;
    newEmployee.barcodeImage = barcodeBase64;

    const savedEmployee = await newEmployee.save();
    return savedEmployee.toObject();
  } catch (error: any) {
    console.error("Repository Error (addEmployeeId):", error);
    if (error.code === 11000) {
      throw new Error("Employee with this email or barcode already exists");
    }
    throw error;
  }
}

async getEmployeeById(employeeId: string): Promise<EmployeeId | null> {
  try {
    console.log("Searching for Employee ID:", employeeId);

    const employee = await this.employeeModel
      .findOne({ employeeId: { $regex: `^${employeeId}$`, $options: "i" } })
      .lean<EmployeeId>();

    if (!employee) {
      console.warn(`Employee with ID ${employeeId} not found`);
      return null;
    }

    return employee;
  } catch (error) {
    console.error("Error fetching employee by EmployeeId:", error);
    throw new Error(`Failed to fetch employee data`);
  }
}



  
}
export default AdminAuthRepository;