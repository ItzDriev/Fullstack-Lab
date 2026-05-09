import { useState } from "react";
import SessionModal from "./SessionModal";
import SessionCard from "./SessionCard";
import type { Session } from "./types.ts";

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
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="w-80">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-white text-lg">Upcoming</h2>
          <span
            className="text-red-400 hover:text-red-300 text-sm transition-colors cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            View All
          </span>
        </div>

        {/* Scrollable container — shows max 3 cards */}
        <div className="space-y-4 pr-2 max-h-105 overflow-y-auto scrollbar-thin">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <div className="bg-[#0d1b2a] p-8 border border-[#1a2d42] rounded-lg text-center">
              <p className="text-[#4a6274] text-sm">No upcoming sessions</p>
              <p className="mt-1 text-[#4a6274] text-xs">
                Purchase a package to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {/* View All Modal */}
      {modalOpen && (
        <SessionModal sessions={sessions} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}

export default UpcomingSessions;
