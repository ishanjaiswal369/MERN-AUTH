import mongoose from "mongoose";
export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB:  ${conn.connection.host}`);
    }
    catch(err){
        console.log("Error connecting to MongoDB:" , err.message);
        process.exit(1);
        
    }
}