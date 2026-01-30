export interface Commentary {
  id: string;
  ballNumber: number;
  overNumber: number;
  description: string;
  emoji: string;
  timestamp: Date;
  runs: number;
  isWicket: boolean;
}

export interface Player {
  id: string;
  name: string;
  country: string;
  role: 'batsman' | 'bowler' | 'all-rounder';
  battingAverage: number;
  strikeRate: number;
  centuries: number;
  fifties: number;
  wickets?: number;
  economy?: number;
  avatar: string;
}

export interface Match {
  id: string;
  team1: string;
  team2: string;
  date: Date;
  tournament: string;
  venue: string;
  format: 'T20' | 'ODI' | 'Test';
  status: 'upcoming' | 'live' | 'completed';
  team1Score?: number;
  team2Score?: number;
  winner?: string;
}

export interface Tournament {
  id: string;
  name: string;
  teams: Team[];
  matches: Match[];
  standings: StandingEntry[];
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  flag: string;
  country: string;
}

export interface StandingEntry {
  teamId: string;
  teamName: string;
  played: number;
  wins: number;
  losses: number;
  points: number;
  nrr: number;
  position: number;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnail: string;
  videoUrl: string;
  category: 'six' | 'catch' | 'wicket' | 'funny' | 'presentation';
  player?: string;
  match: string;
  uploadDate: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  points: number;
}

export interface QuizScore {
  userId: string;
  score: number;
  totalQuestions: number;
  timestamp: Date;
  rank?: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'wicket' | 'six' | 'boundary' | 'milestone' | 'match_start' | 'match_end';
  message: string;
  timestamp: Date;
  read: boolean;
  relatedData?: any;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  avatar: string;
  favoriteTeam: string;
  favoritePlayers: string[];
  isProUser: boolean;
  subscriptionExpiry?: Date;
  preferences: UserPreferences;
  achievements: Achievement[];
}

export interface UserPreferences {
  language: 'en' | 'bn' | 'hi';
  theme: 'light' | 'dark' | 'amoled';
  notificationSettings: NotificationSettings;
  dataSaverMode: boolean;
}

export interface NotificationSettings {
  enableWickets: boolean;
  enableSixes: boolean;
  enableMilestones: boolean;
  quietHours: { start: string; end: string };
  notifyOnlyFavoritePlayers: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  badge: string;
  unlockedDate: Date;
}

export interface Prediction {
  id: string;
  matchId: string;
  team1WinProbability: number;
  team2WinProbability: number;
  expectedScore1: { min: number; max: number };
  expectedScore2: { min: number; max: number };
  keyPlayers: string[];
  analysis: string;
  timestamp: Date;
}

export interface LoginMethod {
  type: 'phone_otp' | 'google' | 'facebook' | 'apple' | 'email';
  credentials: any;
}

export interface Subscription {
  userId: string;
  tier: 'free' | 'pro';
  startDate: Date;
  expiryDate?: Date;
  autoRenew: boolean;
  paymentMethod: 'bkash' | 'nagad' | 'card';
}