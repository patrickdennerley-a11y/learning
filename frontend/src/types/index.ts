export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface FinalExam {
  id: string;
  questions: Question[];
  passingScore: number; // percentage needed to pass (50 for >50%)
}

export interface CheatSheet {
  id: string;
  title: string;
  formulas: { formula: string; description: string }[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface PracticeExam {
  id: string;
  title: string;
  questions: Question[];
  downloadUrl?: string;
}

export interface AudioSummary {
  id: string;
  title: string;
  audioUrl: string;
  duration: string;
}

export interface TopicNode {
  id: string;
  title: string;
  description: string;
  prerequisites: string[]; // IDs of prerequisite nodes
  resources: {
    cheatSheet: CheatSheet;
    flashcards: Flashcard[];
    practiceExams: PracticeExam[];
    audioSummary: AudioSummary;
  };
  finalExam: FinalExam;
  position: { x: number; y: number }; // for React Flow layout
}

export interface UserProgress {
  completedNodes: Set<string>;
  examScores: Record<string, number>; // nodeId -> score percentage
  currentNode: string | null;
}
