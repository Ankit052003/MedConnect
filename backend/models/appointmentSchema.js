import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
    appointment_date:{
        type: string,
        required: true
    },
    department:{
        type: string,
        required: true
    },
    doctor:{
        firstName:{
            type: string,
            required: true
        },
        lastName:{
            type: string,
            required: true
        }
    },
    hasVisited:{
        type: Boolean,
        required: true
    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        required: true
    }
});