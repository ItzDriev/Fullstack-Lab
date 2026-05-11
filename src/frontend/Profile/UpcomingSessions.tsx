import { useState } from "react";
import { MoreVertical, User, X } from "lucide-react";
import type { Session } from "./types.ts";

interface UpcomingSessionsProps {
  sessions?: Session[];
  onCancel?: (id: string) => void;
}

function UpcomingSessions({ sessions = [], onCancel }: UpcomingSessionsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-white text-lg">Upcoming</h2>
          <span
            className="text-red-400 hover:text-red-300 text-sm transition-colors cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            View All
          </span>
        </div>

        <div className="space-y-4 pr-2 max-h-[420px] overflow-y-auto scrollbar-thin">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onCancel={onCancel}
              />
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

      {modalOpen && (
        <SessionModal
          sessions={sessions}
          onCancel={onCancel}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

function SessionModal({
  sessions,
  onCancel,
  onClose,
}: {
  sessions: Session[];
  onCancel?: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="z-[200] fixed inset-0 flex justify-center items-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="z-10 relative flex flex-col bg-[#0a1628] shadow-2xl border border-[#1a2d42] rounded-lg w-full max-w-lg max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 py-4 border-[#1a2d42] border-b shrink-0">
          <div>
            <h2 className="font-semibold text-white text-lg">
              All Upcoming Sessions
            </h2>
            <p className="mt-0.5 text-[#4a6274] text-xs">
              {sessions.length} session{sessions.length !== 1 && "s"} scheduled
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#4a6274] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 p-6 overflow-y-auto scrollbar-thin">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onCancel={onCancel}
              />
            ))
          ) : (
            <div className="py-10 text-center">
              <p className="text-[#4a6274]">No upcoming sessions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SessionCard({
  session,
  onCancel,
}: {
  session: Session;
  onCancel?: (id: string) => void;
}) {
  return (
    <div className="relative bg-[#0d1b2a] p-5 border border-[#1a2d42] hover:border-[#243b53] rounded-lg transition-colors">
      {/* Cancel button */}
      {onCancel && (
        <button
          onClick={() => onCancel(session.id)}
          className="top-3 right-3 absolute text-[#4a6274] hover:text-red-400 transition-colors cursor-pointer"
          title="Cancel session"
        >
          <X className="w-4 h-4" />
        </button>
      )}

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
    </div>
  );
}

export default UpcomingSessions;
