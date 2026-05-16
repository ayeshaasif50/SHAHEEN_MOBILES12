import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, trim: true, lowercase: true },
    password: String,
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// Password match
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Agar DB me password bcrypt hashed hai
  if (
    this.password &&
    (this.password.startsWith("$2a$") ||
      this.password.startsWith("$2b$") ||
      this.password.startsWith("$2y$"))
  ) {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  // Agar DB me password plain text hai, jaise "123456"
  return enteredPassword === this.password;
};

export default mongoose.model("User", userSchema);