import mongoose from "mongoose";

const MONGODB_URL = "mongodb+srv://narmadaviveka:PhOFUQlZdlzyMRqX@cluster0.no2ip.mongodb.net/blogwave";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;