import { Schema, model } from "mongoose";

interface ISession {
  userId: Schema.Types.ObjectId;
  type: "vod" | "handson";
  tierName: string;
  price: string;
  duration: string;
  status: "upcoming" | "completed" | "cancelled";
  coach: string;
  topic: string;
}

const sessionSchema = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["vod", "handson"], required: true },
    tierName: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
    },
    coach: { type: String, default: "" },
    topic: { type: String, default: "" },
  },
  { timestamps: true },
);

export const Session = model<ISession>("Session", sessionSchema);
export type { ISession };
