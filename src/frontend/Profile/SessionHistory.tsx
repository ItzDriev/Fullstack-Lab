import { SlidersHorizontal, Star } from "lucide-react";
import type { HistoryEntry } from "./types.ts";

interface SessionHistoryProps {
  sessions?: HistoryEntry[];
}

function SessionHistory({ sessions = [] }: SessionHistoryProps) {
  return (
    <div className="w-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-white text-lg">Session History</h2>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-[#1a2d42] hover:border-[#243b53] rounded text-[#94A3B8] hover:text-white text-xs transition-colors cursor-pointer">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          FILTER
        </button>
      </div>

      <div className="bg-[#0d1b2a] border border-[#1a2d42] rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 px-5 py-3 border-[#1a2d42] border-b">
          <span className="font-semibold text-[#4a6274] text-xs uppercase tracking-wider">
            Session
          </span>
          <span className="font-semibold text-[#4a6274] text-xs uppercase tracking-wider">
            Coach
          </span>
          <span className="font-semibold text-[#4a6274] text-xs uppercase tracking-wider">
            Rating
          </span>
          <span className="font-semibold text-[#4a6274] text-xs text-right uppercase tracking-wider">
            Action
          </span>
        </div>

        <div className="max-h-[360px] overflow-y-auto scrollbar-thin">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <HistoryRow key={session.id} session={session} />
            ))
          ) : (
            <div className="py-10 text-center">
              <p className="text-[#4a6274] text-sm">
                No completed sessions yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HistoryRow({ session }: { session: HistoryEntry }) {
  return (
    <div className="items-center grid grid-cols-4 hover:bg-[#0f2035] px-5 py-4 border-[#1a2d42] border-b last:border-b-0 transition-colors">
      <div>
        <p className="font-medium text-white text-sm">{session.topic}</p>
        <p className="mt-0.5 text-red-400/70 text-xs">{session.date}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center bg-[#1a2d42] rounded-full w-8 h-8 font-bold text-white text-xs">
          {session.coach.charAt(0)}
        </div>
        <span className="text-[#94A3B8] text-sm">{session.coach}</span>
      </div>

      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < session.rating
                ? "text-red-500 fill-red-500"
                : "text-[#1a2d42]"
            }`}
          />
        ))}
      </div>

      <div className="text-right">
        <button className="px-4 py-1.5 border border-[#1a2d42] hover:border-[#243b53] rounded font-semibold text-[#94A3B8] hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer">
          Watch VOD
        </button>
      </div>
    </div>
  );
}

export default SessionHistory;
