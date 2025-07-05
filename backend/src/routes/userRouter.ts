import express from 'express'
import { container } from "tsyringe";

import AdminAuthController from "../controllers/adminAuthController";

const user = express.Router();

const adminAuthController = container.resolve(AdminAuthController);

user.get("/front-counsellors", adminAuthController.frontGetCounsellors);

export default user