import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "please provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"]
    },
    nic: {
        type: String,
        required: true,
        minLength: [13, "NIC Must Contain Exact 13 Digits!"],
        maxLength: [13, "NIC Must Contain Exact 13 Digits!"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is required!"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    password: {
        type: String,
        minLength: [8, "Password Must Contain At Least 8 Characters!"],
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"]
    },
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    }
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    // Ensure password is a string before hashing
    this.password = await bcrypt.hash(String(this.password), 10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    try {
        // Ensure both password and hash are strings
        const passwordString = String(enteredPassword);
        const hashString = String(this.password);
        
        console.log("Comparing password:", { 
            enteredType: typeof enteredPassword, 
            hashType: typeof this.password,
            enteredLength: passwordString.length,
            hashLength: hashString.length 
        });
        
        return await bcrypt.compare(passwordString, hashString);
    } catch (error) {
        console.error("bcrypt.compare error:", error);
        throw error;
    }
};

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

export const User = mongoose.model("User", userSchema);      