import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";  
import { User } from "../models/userSchema.js";
import validator from "validator";
import {generateToken} from "../utils/jwtToken.js"
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async(req, res, next)=>{
    const {firstName,
         lastName,
         email,
         phone,
         password,
         gender,
         dob,
         nic} = req.body;

    console.log("Registration request received:", {firstName, lastName, email, phone, gender, dob, nic});

    // Validate all required fields
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic) {
        return next(new ErrorHandler("Please provide all required fields.", 400));
    }

    // Check if user already exists
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler(`${user.role} with this email already exists.`, 400));
    }

    // Create user - Mongoose will handle validation
    user = await User.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        password, 
        gender, 
        dob, 
        nic, 
        role: "Patient"
    });
    
    console.log("User created successfully:", user.email);
    generateToken(user,"User Registered Successfully",200,res );
});

export const login = catchAsyncErrors(async(req,res,next)=>{
    const {email, password, confirmPassword, role} = req.body;
    
    console.log("Login attempt:", { email, password: typeof password, confirmPassword: typeof confirmPassword, role });
    
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please provide all details.", 400));
    }
    
    // Check if passwords match
    if(password !== confirmPassword){
        return next(new ErrorHandler("Passwords do not match.", 400));
    }
    
    // Ensure password is a string
    const passwordString = String(password);
    console.log("Password converted to string:", typeof passwordString);
    
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid password or email.", 400));
    }
    
    console.log("User found:", user.email);
    console.log("Stored password type:", typeof user.password);
    
    try {
        const isPasswordMatched = await user.comparePassword(passwordString);
        console.log("Password match result:", isPasswordMatched);
        
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid Password or Email", 400));
        }
    } catch (error) {
        console.error("Password comparison error:", error);
        return next(new ErrorHandler("Password comparison failed", 500));
    }
    
    if(role !== user.role){
        return next(new ErrorHandler("User with this role not found", 400));
    }
    
    generateToken(user,"User login Successfully",200,res);
});

export const addNewAdmin = catchAsyncErrors(async(req, res, next)=>{
    const{ firstName, 
        lastName, 
        email, 
        phone, 
        password, 
        gender, 
        dob, 
        nic, 
        role,
    } = req.body;
    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic ||
        !role
    ){
        return next(new ErrorHandler("Please fill the full form", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists.`, 400));
    }
    const admin = await User.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        password, 
        gender, 
        dob, 
        nic, 
        role: "Admin"
    });
    
    res.status(200).json({
        success: true,
        message: "New Admin Registered Successfully!"
    });
});

export const getAllDoctors = catchAsyncErrors(async(req, res, next)=>{
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors
    });
});

export const getUserDetails = catchAsyncErrors(async(req, res, next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async(req, res, next)=>{
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Admin Logged Out Successfully!"
    });
});

export const logoutPatient = catchAsyncErrors(async(req, res, next)=>{
    console.log("Patient logout called"); // Debug log
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: false // Set to true in production with HTTPS
    }).json({
        success: true,
        message: "Patient Logged Out Successfully!"
    });
});

export const addNewDoctor = catchAsyncErrors(async(req, res, next)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format Not Supported!", 400));
    }
    const {
         firstName, 
        lastName, 
        email, 
        phone, 
        password, 
        gender, 
        dob, 
        nic, 
        doctorDepartment
    } = req.body;
    if( !firstName ||
        !lastName || 
        !email || 
        !phone ||
        !password || 
        !gender || 
        !dob || 
        !nic || 
        !doctorDepartment)
        {
            return next(new ErrorHandler("Please provide full Details!", 400));
        }
        const isRegistered = await User.findOne({email});
        if(isRegistered){
             return next(new ErrorHandler(`${isRegistered.role} already registered with this email!`, 400));
        }
        
        const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
            return next(new ErrorHandler("Failed to upload avatar to cloudinary", 500));
        }
        
        const doctor = await User.create({
            firstName, 
            lastName, 
            email, 
            phone, 
            password, 
            gender, 
            dob, 
            nic, 
            doctorDepartment,
            role: "Doctor",
            docAvatar:{
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            }
        });
        
        res.status(200).json({
            success: true,
            message: "New Doctor Registered!",
            doctor
        });
});
