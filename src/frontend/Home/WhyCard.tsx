function ReasonCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#0d1b2a] p-8 border border-[#1a2d42] hover:border-[#243b53] rounded-lg transition-colors">
      <div className="mb-4 text-red-400">{icon}</div>
      <h3 className="mb-3 font-semibold text-white text-lg">{title}</h3>
      <p className="text-[#94A3B8] text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default ReasonCard;
