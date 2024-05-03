import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: "Username already exists",
    },
    password: { type: String, required: true },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    resetToken: { type: String, required: false },
    expireToken: { type: Date, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
