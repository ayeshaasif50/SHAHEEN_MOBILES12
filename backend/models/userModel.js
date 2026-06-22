import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema({
  name:       { type: String, default: "" },
  phone:      { type: String, default: "" },
  street:     { type: String, default: "" },
  city:       { type: String, default: "" },
  state:      { type: String, default: "" },
  postalCode: { type: String, default: "" },
  country:    { type: String, default: "" },
  isDefault:  { type: Boolean, default: false },
});

const userSchema = mongoose.Schema(
  {
    name:     { type: String, default: "" },
    email:    { type: String, unique: true, trim: true, lowercase: true },
    phone:    { type: String, default: "" },
    password: String,
    role:     { type: String, default: "user" },

    // Persistent avatar stored on server
    avatar: { type: String, default: "" },

    // Saved addresses
    addresses: [addressSchema],

    // Earning / loyalty points
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Password match
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (
    this.password &&
    (this.password.startsWith("$2a$") ||
      this.password.startsWith("$2b$") ||
      this.password.startsWith("$2y$"))
  ) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
  return enteredPassword === this.password;
};

export default mongoose.model("User", userSchema);