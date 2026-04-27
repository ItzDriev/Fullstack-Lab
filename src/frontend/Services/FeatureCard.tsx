interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function FeatureCard({ icon, title, text }: FeatureCardProps) {
  return (
    <div className="bg-[#0d1b2a]/60 p-5 border border-[#1a2d42] hover:border-[#243b53] rounded-lg transition-colors">
      <div className="mb-3 text-red-400">{icon}</div>
      <h4 className="mb-1 font-semibold text-white text-sm">{title}</h4>
      <p className="text-[#4a6274] text-xs">{text}</p>
    </div>
  );
}

export default FeatureCard;
