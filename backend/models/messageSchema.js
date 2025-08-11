import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
   firstName:{
    type: String,
    required: true,
    minlength: [3, "First name must be at least 3 characters"],
   },
   lastName:{
    type: String,
    required: true,
    minlength: [3, "Last name must be at least 3 characters"],
   },
   email:{
    type: String,
    required: true,
    validate: [validator.isEmail, "please provide a valid email"],
   },
   phone:{
    type: String,
    required: true,
    minlength: [10, " phone number must contains Exact 10 digits"],
   },
    message:{
     type: String,
     required: true,
     minlength: [10, "Message must be at least 10 characters"],
    }
});

export const Message = mongoose.model("Message", messageSchema);


