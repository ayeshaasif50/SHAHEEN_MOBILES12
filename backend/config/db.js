import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("⏳ MongoDB se connect ho raha hai...");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    console.log("⏳ 10 seconds baad retry karega...");
    setTimeout(connectDB, 10000); // ← crash nahi hoga!
  }
};

export default connectDB;