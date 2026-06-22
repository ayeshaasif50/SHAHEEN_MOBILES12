import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(" MongoDB IS CONNECTING...");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    console.log("RETRY IN 10 SECONDS...");
    setTimeout(connectDB, 10000); // ← crash nahi hoga!
  }
};

export default connectDB;