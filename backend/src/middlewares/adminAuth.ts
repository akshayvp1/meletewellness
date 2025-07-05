// import { Request, Response, NextFunction } from "express";
// import { verifyAccessToken, ITokenPayload } from "../utils/jwt";

// declare module "express-serve-static-core" {
//   interface Request {
//     user?: ITokenPayload;
//   }
// }

// export const adminAuthenticate = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     console.log("authentication");
    
//     const authHeader = req.headers["authorization"];
//     console.log("Auth Header:", authHeader); 
//     const token = authHeader?.split(" ")[1];
//     console.log("Token:", token);
  
//     if (!token) {
//       res.status(401).json({ message: "No token provided" });
//       return;
//     }
  
//     try {
//       const decoded = (await verifyAccessToken(token)) as ITokenPayload;
//       console.log(decoded.role,"aaaanu")
//       if (decoded.role !== "admin") {
//         res.status(403).json({ message: "Access denied: Admins only" });
//         return;
//       }
  
//       req.user = decoded;
//       next();
//     } catch (error) {
//       console.error("Token verification failed:", error);
//       res.status(401).json({ message: "Invalid or expired token" });
//     }
    
//   };
  



import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, ITokenPayload } from "../utils/jwt";

declare module "express-serve-static-core" {
  interface Request {
    user?: ITokenPayload;
  }
}

// Middleware to authenticate admin users
export const adminAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("authentication");

  const authHeader = req.headers["authorization"];
  console.log("Auth Header:", authHeader);
  const token = authHeader?.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = (await verifyAccessToken(token)) as ITokenPayload;
    console.log("Decoded role:", decoded.role);
    if (decoded.role !== "admin") {
      res.status(403).json({ message: "Access denied: Admins only" });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check user active status
export const checkUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as ITokenPayload;

    if (!user || !user.id) {
      res.status(401).json({ success: false, message: "Unauthorized: No user information provided" });
      return;
    }

    if (user.role !== "admin") {
      res.status(403).json({ success: false, message: "Access forbidden: Admins only" });
      return;
    }

    // Placeholder: Implement adminAuthService.checkActiveStatus
    // const isActive = await adminAuthService.checkActiveStatus(user.id);
    const isActive = true; // Replace with actual service call

    if (!isActive) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.status(403).json({ success: false, message: "User is blocked" });
      return;
    }

    next();
  } catch (error: any) {
    console.error("Error in checkUserStatus:", error);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};