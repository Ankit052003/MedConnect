import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { ErrorHandler } from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { adminToken, patientToken } = req.cookies;
    
    if (!adminToken && !patientToken) {
        return next(new ErrorHandler("User not authenticated", 400));
    }
    
    let token = adminToken || patientToken;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    req.user = await User.findById(decoded.id);
    
    // ✅ Add null check
    if (!req.user) {
        return next(new ErrorHandler("User not found", 400));
    }
    
    if (req.user.role === "Admin" && adminToken) {
        return next();
    }
    if (req.user.role === "Patient" && patientToken) {
        return next();
    }
    
    return next(new ErrorHandler("Not authorized for this resource", 403));
});

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { adminToken } = req.cookies;
    
    if (!adminToken) {
        return next(new ErrorHandler("Admin not authenticated", 400));
    }
    
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);
    
    req.user = await User.findById(decoded.id);
    
    if (req.user.role !== "Admin") {
        return next(new ErrorHandler("Not authorized for this resource", 403));
    }
    
    next();
});

export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { patientToken } = req.cookies;
    
    if (!patientToken) {
        return next(new ErrorHandler("Patient not authenticated", 400));
    }
    
    const decoded = jwt.verify(patientToken, process.env.JWT_SECRET_KEY);
    
    req.user = await User.findById(decoded.id);
    
    if (req.user.role !== "Patient") {
        return next(new ErrorHandler("Not authorized for this resource", 403));
    }
    
    next();
});