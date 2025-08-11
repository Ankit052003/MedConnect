import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import { Message } from '../models/messageSchema.js'; 
import { ErrorHandler } from '../middlewares/errorMiddleware.js';


export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    
    if (!firstName) {
        return next(new ErrorHandler("First name is required", 400));
    }
    if (!lastName) {
        return next(new ErrorHandler("Last name is required", 400));
    }
    if (!email) {
        return next(new ErrorHandler("Email is required", 400));
    }
    if (!phone) {
        return next(new ErrorHandler("Phone number is required", 400));
    }
    if (!message) {
        return next(new ErrorHandler("Message is required", 400));
    }
    
    await Message.create({ 
        firstName, 
        lastName, 
        email, 
        phone, 
        message 
    });
    
    res.status(200).json({
        success: true,
        message: "Message sent successfully!!"
    });
});

export const getAllMessages = catchAsyncErrors(async(req, res, next)=>{
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
});