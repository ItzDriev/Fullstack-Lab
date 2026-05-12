import { Schema, model, Types } from "mongoose";

interface IReview {
  sessionId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
}

const reviewSchema = new Schema<IReview>(
  {
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      unique: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true },
);

export const Review = model<IReview>("Review", reviewSchema);
export type { IReview };
