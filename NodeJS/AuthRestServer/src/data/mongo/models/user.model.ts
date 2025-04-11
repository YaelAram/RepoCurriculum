import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
  },
  avatar: {
    type: String,
  },
  roles: {
    type: [String],
    default: ["user"],
    enum: ["admin", "user"],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export const UserModel = model("User", userSchema);
