import { MoreVertical, User } from "lucide-react";
import type { Session } from "./types.ts";

function SessionCard({ session }: { session: Session }) {
  return (
    <div className="bg-[#0d1b2a] p-5 border border-[#1a2d42] hover:border-[#243b53] rounded-lg transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <span
            className={`inline-block px-3 py-1 rounded text-xs font-semibold tracking-wider uppercase mb-3 ${
              session.isUpcoming
                ? "border border-red-500 text-red-400"
                : "bg-[#1a2d42] text-[#94A3B8]"
            }`}
          >
            {session.date} · {session.time}
          </span>

          <h3 className="mb-2 font-semibold text-white text-base">
            {session.title}
          </h3>

          <div className="flex items-center gap-2 text-[#94A3B8] text-sm">
            <User className="w-3.5 h-3.5" />
            <span>Coach: {session.coach}</span>
          </div>
        </div>

        <button className="text-[#94A3B8] hover:text-white transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default SessionCard;
