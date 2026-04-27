import { MoreVertical, User } from "lucide-react";

interface Session {
  id: string;
  title: string;
  coach: string;
  date: string;
  time: string;
  isUpcoming?: boolean;
}

interface UpcomingSessionsProps {
  sessions?: Session[];
}

const defaultSessions: Session[] = [
  {
    id: "1",
    title: "Smoke Lineups on Mirage",
    coach: "Viktor Reznov",
    date: "TOMORROW",
    time: "18:00",
    isUpcoming: true,
  },
  {
    id: "2",
    title: "Raid Mechanics Strategy",
    coach: "Sarah Jenkins",
    date: "OCT 24",
    time: "14:00",
    isUpcoming: false,
  },
];

function UpcomingSessions({
  sessions = defaultSessions,
}: UpcomingSessionsProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-white text-lg">Upcoming Sessions</h2>
        <span className="text-red-400 hover:text-red-300 text-sm transition-colors cursor-pointer">
          View All
        </span>
      </div>

      {/* Session Cards */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}

function SessionCard({ session }: { session: Session }) {
  return (
    <div className="bg-[#0d1b2a] p-5 border border-[#1a2d42] hover:border-[#243b53] rounded-lg transition-colors">
      <div className="flex justify-between items-start">
        <div>
          {/* Date/Time Badge */}
          <span
            className={`inline-block px-3 py-1 rounded text-xs font-semibold tracking-wider uppercase mb-3 ${
              session.isUpcoming
                ? "border border-red-500 text-red-400"
                : "bg-[#1a2d42] text-[#94A3B8]"
            }`}
          >
            {session.date} · {session.time}
          </span>

          {/* Title */}
          <h3 className="mb-2 font-semibold text-white text-base">
            {session.title}
          </h3>

          {/* Coach */}
          <div className="flex items-center gap-2 text-[#94A3B8] text-sm">
            <User className="w-3.5 h-3.5" />
            <span>Coach: {session.coach}</span>
          </div>
        </div>

        {/* More Options */}
        <button className="text-[#94A3B8] hover:text-white transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default UpcomingSessions;
