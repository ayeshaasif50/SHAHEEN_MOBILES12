import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  phone: { type: String, default: "" },
  street: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  postalCode: { type: String, default: "" },
  country: { type: String, default: "" },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, unique: true, trim: true, lowercase: true },
    phone: { type: String, default: "" },
    password: { type: String, required: true },
    role: { type: String, default: "user" },

    avatar: { type: String, default: "" },
    addresses: [addressSchema],
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);



//🔥 PRE-SAVE HOOK (IMPORTANT FIX)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});



//🔥 PASSWORD MATCH FUNCTION (FIXED)
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!enteredPassword || !this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);