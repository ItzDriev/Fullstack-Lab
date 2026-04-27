export interface ServiceTier {
  name: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
}

export const vodTiers: ServiceTier[] = [
  {
    name: "Single Review",
    price: "$25",
    duration: "1 VOD",
    features: [
      "Full Raid Breakdown",
      "Timestamped notes",
      "Written feedback report",
      "48h turnaround",
    ],
  },
  {
    name: "Deep Dive",
    price: "$60",
    duration: "3 VODs",
    features: [
      "Multi-Raid pattern analysis",
      "Timestamped notes",
      "Video commentary",
      "Progress tracking",
      "Priority turnaround",
    ],
    popular: true,
  },
  {
    name: "Full Ham Audit",
    price: "$100",
    duration: "6 VODs",
    features: [
      "Complete playstyle audit",
      "Detailed video commentary",
      "Custom improvement plan",
      "Progress tracking",
      "Direct coach Q&A session",
      "24h turnaround",
    ],
  },
];

export const handsonTiers: ServiceTier[] = [
  {
    name: "Trial Sesson",
    price: "$30",
    duration: "1 hour",
    features: [
      "Live 1-on-1 coaching",
      "Real-time advice",
      "Post-session summary",
      "Screen share review",
    ],
  },
  {
    name: "Locked in",
    price: "$75",
    duration: "3 hours",
    features: [
      "3x 1-hour sessions",
      "Custom drill routines",
      "Live gameplay review",
      "Discord support between sessions",
      "Progress benchmarks",
    ],
    popular: true,
  },
  {
    name: "Tippidy Top",
    price: "$180",
    duration: "8 hours",
    features: [
      "8x 1-hour sessions",
      "Full Improvement Plan",
      "Live gameplay Analysis",
      "Unlimited Discord support",
      "Weekly progress reports",
      "Guaranteed Improvement",
    ],
  },
];
