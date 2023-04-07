import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    patronimyc: {
      type: String,
      required: true,
    },
    pasportData: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
