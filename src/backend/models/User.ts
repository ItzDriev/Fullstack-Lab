import { Schema, model } from "mongoose";

interface UserI {
  fullName: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
}

const userSchema = new Schema<UserI>(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /^(?:[a-zA-Z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-zA-Z0-9!#$%&'+/=?^_`{|}~-]+)|"(?:(?:\[\x00-\x7F]|[^\"]))")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?.)+[a-zA-Z]{2,}|(?:[(?:\d{1,3}.){3}\d{1,3}]))$/,
    },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true },
);

export const User = model<UserI>("User", userSchema);
export type { UserI };
