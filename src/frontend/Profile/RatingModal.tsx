import { useState } from "react";
import { X, Star } from "lucide-react";
import type { Session } from "./types.ts";
import BigButton from "../Components/BigButton";

interface RatingModalProps {
  session: Session;
  onSubmit: (sessionId: string, rating: number) => void;
  onClose: () => void;
}

function RatingModal({ session, onSubmit, onClose }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    onSubmit(session.id, rating);
  }

  return (
    <div
      className="z-[200] fixed inset-0 flex justify-center items-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="z-10 relative bg-[#0a1628] shadow-2xl border border-[#1a2d42] rounded-lg w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 py-4 border-[#1a2d42] border-b">
          <h2 className="font-semibold text-white text-lg">Rate Session</h2>
          <button
            onClick={onClose}
            className="text-[#4a6274] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="bg-[#0d1b2a] p-4 border border-[#1a2d42] rounded-lg">
            <p className="font-semibold text-white">{session.title}</p>
            <p className="mt-1 text-[#4a6274] text-sm">
              Coach: {session.coach}
            </p>
          </div>

          <div>
            <label className="block mb-3 font-light text-[#94A3B8] text-xs uppercase tracking-wider">
              How was your session?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || rating)
                        ? "text-red-500 fill-red-500"
                        : "text-[#1a2d42]"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <BigButton text="Complete Session" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default RatingModal;
