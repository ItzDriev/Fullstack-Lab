import type { Session } from "./types.ts";
import SessionCard from "./SessionCard";
import { X } from "lucide-react";

function SessionModal({
  sessions,
  onClose,
}: {
  sessions: Session[];
  onClose: () => void;
}) {
  return (
    <div
      className="z-[200] fixed inset-0 flex justify-center items-center"
      onClick={onClose}
    >
      {/* Blurred backdrop */}
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

        {/* Scrollable session list */}
        <div className="space-y-4 p-6 overflow-y-auto scrollbar-thin">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
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

export default SessionModal;
