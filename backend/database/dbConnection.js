import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: "Hospital_Management",
    }).then(() => {
        console.log("Connected to database successfully");
    }).catch((error) => {
        console.error("Error connecting to database:", error);
    });
};