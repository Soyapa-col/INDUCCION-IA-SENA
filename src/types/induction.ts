export interface ApprenticeProfile {
  fullName: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  trainingProgram: string;
  recordNumber: string; // Ficha
  trainingCenter: string;
  regional: string;
  startDate: string;
}

export type ModuleId = 'identidad' | 'modelo' | 'reglamento' | 'bienestar' | 'evaluacion' | 'gemini-workspace';

export interface ModuleProgress {
  identidad: boolean;
  modelo: boolean;
  reglamento: boolean;
  bienestar: boolean;
  evaluacion: boolean;
  'gemini-workspace'?: boolean;
}

export interface QuizQuestion {
  id: number;
  moduleId: ModuleId;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  regulatoryReference?: string;
}

export interface DilemmaCase {
  id: string;
  title: string;
  situation: string;
  character: string;
  role: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
    sanctionOrRule: string;
  }[];
}

export interface GlossaryTerm {
  term: string;
  category: 'Pedagogía' | 'Institucional' | 'Reglamento' | 'Plataformas';
  definition: string;
  exampleOrTip?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
}
