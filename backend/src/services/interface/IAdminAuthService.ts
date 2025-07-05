import { ICounsellor } from "../../interfaces/ICounsellor";
import { IAdmin } from "../../interfaces/IAdmin";
interface SignInResult {
  isMatch: boolean;
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

interface IAdminAuthService {
  signIn(email: string, password: string): Promise<SignInResult>;
  addCounsellor(currentId: string, counsellorData: ICounsellorData): Promise<ICounsellor>;
}

export { IAdminAuthService, SignInResult, ICounsellorData };