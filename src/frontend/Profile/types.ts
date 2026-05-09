export interface Session {
  id: string;
  title: string;
  coach: string;
  date: string;
  time: string;
  isUpcoming?: boolean;
}

export interface HistoryEntry {
  id: string;
  topic: string;
  date: string;
  coach: string;
  coachAvatar?: string;
}
