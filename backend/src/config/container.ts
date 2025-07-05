import 'reflect-metadata';
import { container } from 'tsyringe';
import { User } from '../models/userModel';
import AdminModel from '../models/adminModels';
import AdminAuthRepository from '../repositories/AdminAuthRepository';
import AdminAuthService from '../services/AdminAuthService';
import AdminAuthController from '../controllers/adminAuthController';
import CounsellorModel from '../models/counsellorModel'

container.register("UserModel", { useValue: User });
container.register("CounsellorModel",{useValue:CounsellorModel})
container.register("AdminModel", { useValue: AdminModel });
container.register("AdminAuthRepository", AdminAuthRepository);
container.register("AdminAuthService", AdminAuthService);
container.register("AdminAuthController", AdminAuthController);

export default container;