import { SlidersHorizontal } from "lucide-react";
import HistoryRow from "./HistoryRow";

interface HistoryEntry {
  id: string;
  topic: string;
  date: string;
  coach: string;
  coachAvatar?: string;
}

interface SessionHistoryProps {
  sessions?: HistoryEntry[];
}

const defaultHistory: HistoryEntry[] = [
  {
    id: "1",
    topic: "Naxxramas VOD Review",
    date: "APR 22, 2026",
    coach: "Driev",
  },
  {
    id: "2",
    topic: "Rotation Practice",
    date: "APR 18, 2026",
    coach: "Driev",
  },
  {
    id: "3",
    topic: "Hands on Session",
    date: "APR 14, 2026",
    coach: "Driev",
  },
];

function SessionHistory({ sessions = defaultHistory }: SessionHistoryProps) {
  return (
    <div className="w-[500px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-white text-lg">Session History</h2>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-[#1a2d42] hover:border-[#243b53] rounded text-[#94A3B8] hover:text-white text-xs transition-colors cursor-pointer">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          FILTER
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#0d1b2a] border border-[#1a2d42] rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-3 px-5 py-3 border-[#1a2d42] border-b">
          <span className="font-semibold text-[#4a6274] text-xs uppercase tracking-wider">
            Session Topic
          </span>
          <span className="font-semibold text-[#4a6274] text-xs uppercase tracking-wider">
            Coach
          </span>
          <span className="font-semibold text-[#4a6274] text-xs text-right uppercase tracking-wider">
            Action
          </span>
        </div>

        {/* Scrollable rows */}
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

export default SessionHistory;
