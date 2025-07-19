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
admin.post("/add-college",adminAuthController.addCollegeData)
// admin.patch("/update-college/:editingId", adminAuthController.UpdateCollegeData);
admin.patch("/update-college/:editingId", adminAuthController.UpdateCollegeData); // ✅ correct

admin.get('/get-college',adminAuthController.getAllColleges)

admin.get('/college-list',adminAuthController.getCollegesList)
admin.post('/create-user',adminAuthController.createUser)
admin.patch("/update-user/:userId", adminAuthController.updateAdminUser);
admin.get('/users-list',adminAuthController.getUsersList)
admin.get('/get-expertise',adminAuthController.getExpertise)
admin.post('/add-expertise',adminAuthController.addExpertise)
admin.put('/update-expertise/:id',adminAuthController.updateExpertise)
admin.patch('/block-expertise/:id',adminAuthController.blockExpertise)  
admin.patch('/unblock-expertise/:id',adminAuthController.unBlockExpertise)


export default admin;