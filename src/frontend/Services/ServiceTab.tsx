interface ServiceTabProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

function ServiceTab({
  icon,
  label,
  description,
  active,
  onClick,
}: ServiceTabProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center gap-4 p-5 rounded-lg border transition-all duration-300 cursor-pointer text-left ${
        active
          ? "bg-[#0d1b2a] border-red-500/50 shadow-[0_0_20px_rgba(255,45,45,0.08)]"
          : "bg-[#0d1b2a]/50 border-[#1a2d42] hover:border-[#243b53]"
      }`}
    >
      <div
        className={`p-3 rounded-lg ${
          active ? "bg-red-500/10 text-red-400" : "bg-[#1a2d42] text-[#94A3B8]"
        }`}
      >
        {icon}
      </div>
      <div>
        <h3
          className={`font-semibold text-sm ${
            active ? "text-white" : "text-[#94A3B8]"
          }`}
        >
          {label}
        </h3>
        <p className="mt-0.5 text-[#4a6274] text-xs">{description}</p>
      </div>
    </button>
  );
}

export default ServiceTab;
