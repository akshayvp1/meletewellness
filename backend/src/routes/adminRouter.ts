// import express from 'express';
// import { container } from 'tsyringe';
// import AdminAuthController from '../controllers/adminAuthController';
// import { adminAuthenticate, checkUserStatus } from '../middlewares/adminAuth'; // Adjust path as needed

// const admin = express.Router();

// const adminAuthController = container.resolve(AdminAuthController);

// admin.get('/check-status', adminAuthenticate, checkUserStatus, adminAuthController.checkStatus); // Added controller method
// admin.post('/verify-login', adminAuthController.signIn);
// admin.post('/add-counsellor', adminAuthenticate, adminAuthController.addCounsellor);
// admin.get('/get-counsellors', adminAuthenticate, adminAuthController.getCounsellors);
// admin.patch('/block-counsellor/:userId', adminAuthenticate, adminAuthController.blockCounsellors);
// admin.patch('/unblock-counsellor/:userId', adminAuthenticate, adminAuthController.unBlockCounsellors);
// admin.put('/update-counsellor/:id', adminAuthenticate, adminAuthController.updateCounsellor);
// admin.post('/refresh-token', adminAuthController.refreshToken);

// export default admin;





import express from "express";
import { container } from "tsyringe";
import AdminAuthController from "../controllers/adminAuthController";
import { adminAuthenticate, checkUserStatus } from "../middlewares/adminAuth";

const admin = express.Router();

const adminAuthController = container.resolve(AdminAuthController);

admin.get("/check-status", adminAuthenticate, checkUserStatus, adminAuthController.checkStatus);
admin.post("/verify-login", adminAuthController.signIn);
admin.post("/add-counsellor",adminAuthenticate,adminAuthController.addCounsellor);
admin.get("/get-counsellors",adminAuthenticate,adminAuthController.getCounsellors);
admin.patch("/block-counsellor/:userId", adminAuthenticate, adminAuthController.blockCounsellors);
admin.patch("/unblock-counsellor/:userId", adminAuthenticate, adminAuthController.unBlockCounsellors);
admin.put("/update-counsellor/:id", adminAuthenticate, adminAuthController.updateCounsellor);
admin.post("/refresh-token", adminAuthController.refreshToken);
admin.post('/admin-logout',adminAuthenticate,adminAuthController.adminLogout)
export default admin;