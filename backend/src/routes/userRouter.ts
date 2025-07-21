import express from 'express'
import { container } from "tsyringe";

import AdminAuthController from "../controllers/adminAuthController";
import { userAuthenticate } from '../middlewares/adminAuth';
const user = express.Router();

const adminAuthController = container.resolve(AdminAuthController);

user.get("/front-counsellors", adminAuthController.frontGetCounsellors);
user.post("/google-login",adminAuthController.GoogleLogin)
user.get('/check',userAuthenticate,adminAuthController.Check);
user.post("/logout", userAuthenticate, adminAuthController.logout);

export default user