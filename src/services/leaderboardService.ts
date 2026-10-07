export interface LeaderboardEntry {
  id: string;
  fullName: string;
  documentNumber: string;
  recordNumber: string;
  program: string;
  score: number;
  totalQuestions: number;
  points: number;
  timeSpentSeconds: number;
  formattedTime: string;
  maxStreak: number;
  accuracy: number;
  date: string;
  isCurrent?: boolean;
}

const LEADERBOARD_KEY = 'sena_gamified_leaderboard';

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb-1',
    fullName: 'Camila Andrea Ospina Vargas',
    documentNumber: '1005987123',
    recordNumber: '2715984',
    program: 'ADSO - Software',
    score: 25,
    totalQuestions: 25,
    points: 4250,
    timeSpentSeconds: 168,
    formattedTime: '02:48',
    maxStreak: 25,
    accuracy: 100,
    date: '07/10/2026, 10:15'
  },
  {
    id: 'lb-2',
    fullName: 'Santiago Marín Morales',
    documentNumber: '1114567890',
    recordNumber: '2715984',
    program: 'ADSO - Software',
    score: 24,
    totalQuestions: 25,
    points: 3890,
    timeSpentSeconds: 195,
    formattedTime: '03:15',
    maxStreak: 18,
    accuracy: 96,
    date: '07/10/2026, 10:45'
  },
  {
    id: 'lb-3',
    fullName: 'Laura Sofía Benítez Perea',
    documentNumber: '1098345210',
    recordNumber: '2715984',
    program: 'Gestión de Redes',
    score: 24,
    totalQuestions: 25,
    points: 3620,
    timeSpentSeconds: 214,
    formattedTime: '03:34',
    maxStreak: 14,
    accuracy: 96,
    date: '07/10/2026, 11:20'
  },
  {
    id: 'lb-4',
    fullName: 'David Felipe Quintero Rios',
    documentNumber: '1007234891',
    recordNumber: '2715984',
    program: 'ADSO - Software',
    score: 23,
    totalQuestions: 25,
    points: 3350,
    timeSpentSeconds: 240,
    formattedTime: '04:00',
    maxStreak: 12,
    accuracy: 92,
    date: '07/10/2026, 11:50'
  },
  {
    id: 'lb-5',
    fullName: 'Mariana Caicedo Zapata',
    documentNumber: '1113890123',
    recordNumber: '2715984',
    program: 'Biotecnología',
    score: 22,
    totalQuestions: 25,
    points: 3100,
    timeSpentSeconds: 275,
    formattedTime: '04:35',
    maxStreak: 9,
    accuracy: 88,
    date: '07/10/2026, 12:10'
  }
];

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(INITIAL_LEADERBOARD));
      return INITIAL_LEADERBOARD;
    }
    const data: LeaderboardEntry[] = JSON.parse(raw);
    return data.sort((a, b) => b.points - a.points);
  } catch {
    return INITIAL_LEADERBOARD;
  }
};

export const addLeaderboardEntry = (
  entry: Omit<LeaderboardEntry, 'id' | 'date'>
): LeaderboardEntry => {
  const current = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: `lb-${Date.now()}`,
    date: new Date().toLocaleString('es-CO', {
      dateStyle: 'short',
      timeStyle: 'short'
    }),
    isCurrent: true
  };

  // Replace or add
  const filtered = current.filter((item) => item.documentNumber !== entry.documentNumber);
  const updated = [...filtered, newEntry].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return a.timeSpentSeconds - b.timeSpentSeconds;
  });

  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving leaderboard:', err);
  }

  return newEntry;
};
