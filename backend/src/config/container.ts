import 'reflect-metadata';
import { container } from 'tsyringe';
import { User } from '../models/userModel';
import AdminModel from '../models/adminModels';
import AdminAuthRepository from '../repositories/AdminAuthRepository';
import AdminAuthService from '../services/AdminAuthService';
import AdminAuthController from '../controllers/adminAuthController';
import CounsellorModel from '../models/counsellorModel'
import { AdminUser } from '../models/adminUser';
import { College } from '../models/collegeModel';

container.register("UserModel", { useValue: User });
container.register("CounsellorModel",{useValue:CounsellorModel})
container.register("AdminModel", { useValue: AdminModel });
container.register("CollegeModel",{useValue:College})
container.register("AdminUserModel",{useValue:AdminUser})
container.register("AdminAuthController", AdminAuthController);
container.register("AdminAuthService", AdminAuthService);
container.register("AdminAuthRepository", AdminAuthRepository);


export default container;