
export interface QuizQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  questions: QuizQuestion[];
  iconPath?: string; // SVG path data
}

export interface UserProfile {
  xp: number;
  completedQuizIds: string[];
  name: string; // For personalization
}

export interface UserProfileContextType {
  userProfile: UserProfile;
  addXp: (points: number) => void;
  markQuizCompleted: (quizId: string) => void;
  updateName: (name: string) => void;
}

export enum AppView {
  Home = 'home',
  QuizList = 'quizList',
  QuizTaking = 'quizTaking',
  // ExpertChat = 'expertChat', // Removed
  Profile = 'profile',
}