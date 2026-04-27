import { SlidersHorizontal, Star } from "lucide-react";

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
    topic: "Roatation Practice",
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
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-white text-lg">Session History</h2>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-[#1a2d42] hover:border-[#243b53] rounded text-[#94A3B8] hover:text-white text-xs transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          FILTER
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#0d1b2a] border border-[#1a2d42] rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="flex flex-row justify-between px-5 py-3 border-[#1a2d42] border-b">
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

        {/* Table Rows */}
        {sessions.map((session) => (
          <HistoryRow key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}

function HistoryRow({ session }: { session: HistoryEntry }) {
  return (
    <div className="items-center grid grid-cols-4 hover:bg-[#0f2035] px-5 py-4 border-[#1a2d42] border-b last:border-b-0 transition-colors">
      {/* Topic & Date */}
      <div>
        <p className="font-medium text-white text-sm">{session.topic}</p>
        <p className="mt-0.5 text-red-400/70 text-xs">{session.date}</p>
      </div>

      {/* Coach */}
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center bg-[#1a2d42] rounded-full w-8 h-8 font-bold text-white text-xs">
          {session.coach.charAt(0)}
        </div>
        <span className="text-[#94A3B8] text-sm">{session.coach}</span>
      </div>

      {/* Action */}
      <div className="text-right">
        <button className="px-4 py-1.5 border border-[#1a2d42] hover:border-[#243b53] rounded font-semibold text-[#94A3B8] hover:text-white text-xs uppercase tracking-wider transition-colors">
          Watch VOD
        </button>
      </div>
    </div>
  );
}

export default SessionHistory;
