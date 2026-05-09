interface HistoryEntry {
  id: string;
  topic: string;
  date: string;
  coach: string;
  coachAvatar?: string;
}

interface Props {
  session: HistoryEntry;
}
function HistoryRow({ session }: Props) {
  return (
    <div className="items-center grid grid-cols-3 hover:bg-[#0f2035] px-5 py-4 border-[#1a2d42] border-b last:border-b-0 transition-colors">
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
        <button className="px-4 py-1.5 border border-[#1a2d42] hover:border-[#243b53] rounded font-semibold text-[#94A3B8] hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer">
          Watch VOD
        </button>
      </div>
    </div>
  );
}

export default HistoryRow;
