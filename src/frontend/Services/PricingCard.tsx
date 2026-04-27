import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import type { ServiceTier } from "./serviceTiers.ts";

function PricingCard({
  tier,
  onSelect,
}: {
  tier: ServiceTier;
  onSelect: () => void;
}) {
  return (
    <div
      className={`relative bg-[#0d1b2a] border rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] h-full flex flex-col ${
        tier.popular
          ? "border-red-500/40 shadow-[0_0_25px_rgba(255,45,45,0.06)]"
          : "border-[#1a2d42]"
      }`}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="bg-red-500 py-1.5 font-bold text-[10px] text-white text-center uppercase tracking-[0.2em]">
          Most Popular
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Header */}
        <div>
          <h3 className="font-semibold text-white text-lg">{tier.name}</h3>
          <div className="flex items-baseline gap-1 mt-2 mb-1">
            <span className="font-bold text-white text-3xl">{tier.price}</span>
          </div>
          <div className="flex items-center gap-2 mb-6 text-[#4a6274] text-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>{tier.duration}</span>
          </div>
          <div className="mb-6 border-[#1a2d42] border-t" />
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 w-4 h-4 text-red-400 shrink-0" />
              <span className="text-[#94A3B8] text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA - always at bottom */}
        <button
          onClick={onSelect}
          className={`mt-auto w-full py-3 rounded-lg font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
            tier.popular
              ? "bg-red-500 text-white hover:bg-red-600 shadow-[0_0_20px_rgba(255,45,45,0.15)]"
              : "border border-[#1a2d42] text-[#94A3B8] hover:border-red-500/40 hover:text-white"
          }`}
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default PricingCard;
