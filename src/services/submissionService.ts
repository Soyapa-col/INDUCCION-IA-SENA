import { ApprenticeProfile } from '../types/induction';

export interface InductionSubmission {
  id: string;
  timestamp: string;
  profile: ApprenticeProfile;
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  answers: { [questionId: number]: number };
  syncedToGoogleSheets: boolean;
  syncedAt?: string;
  totalTimeSeconds?: number;
  timeFormatted?: string;
  gamifiedPoints?: number;
  streakMax?: number;
  rankTitle?: string;
  timerMode?: 'progresivo' | 'cuenta-regresiva';
  questionTimes?: { [questionId: number]: number };
}

const STORAGE_KEY = 'sena_induction_submissions_db';

export const calculateRankTitle = (points: number, percent: number): string => {
  if (percent >= 92 && points >= 2800) return '👑 Gran Maestro Normativo SENA';
  if (percent >= 80 && points >= 2400) return '🥇 Diamante SENA · Experto';
  if (percent >= 80 && points >= 2000) return '🥈 Oro SENA · Competente Destacado';
  if (percent >= 80) return '🥉 Plata SENA · Aprendiz Aprobado';
  return '📘 Plan de Mejoramiento Requerido';
};

const INITIAL_SUBMISSIONS: InductionSubmission[] = [
  {
    id: 'sub-174001',
    timestamp: '07/10/2026, 09:15',
    profile: {
      fullName: 'Valentina Restrepo Castro',
      documentType: 'CC',
      documentNumber: '1006123456',
      trainingProgram: 'Análisis y Desarrollo de Software (ADSO)',
      recordNumber: '2715984',
      trainingCenter: 'Centro de Electricidad y Automatización Industrial (CEAI)',
      regional: 'Valle del Cauca',
      startDate: '2026-02-01'
    },
    score: 24,
    total: 25,
    percent: 96,
    passed: true,
    answers: { 1: 1, 2: 0, 3: 2, 4: 2, 5: 0, 6: 1, 7: 0, 8: 1, 9: 0, 10: 1, 11: 1, 12: 0, 13: 1, 14: 0, 15: 1, 16: 1, 17: 1, 18: 0, 19: 1, 20: 0, 21: 0, 22: 1, 23: 1, 24: 1, 25: 0 },
    syncedToGoogleSheets: false,
    totalTimeSeconds: 215,
    timeFormatted: '03:35',
    gamifiedPoints: 3120,
    streakMax: 18,
    rankTitle: '👑 Gran Maestro Normativo SENA'
  },
  {
    id: 'sub-174002',
    timestamp: '07/10/2026, 10:40',
    profile: {
      fullName: 'Carlos Andrés Meza Lozano',
      documentType: 'CC',
      documentNumber: '1114987654',
      trainingProgram: 'Gestión de Redes de Datos',
      recordNumber: '2715984',
      trainingCenter: 'Centro de Electricidad y Automatización Industrial (CEAI)',
      regional: 'Valle del Cauca',
      startDate: '2026-02-01'
    },
    score: 25,
    total: 25,
    percent: 100,
    passed: true,
    answers: { 1: 1, 2: 0, 3: 2, 4: 2, 5: 0, 6: 1, 7: 0, 8: 1, 9: 0, 10: 1, 11: 1, 12: 0, 13: 1, 14: 0, 15: 1, 16: 1, 17: 1, 18: 0, 19: 1, 20: 0, 21: 0, 22: 1, 23: 1, 24: 1, 25: 0 },
    syncedToGoogleSheets: false,
    totalTimeSeconds: 260,
    timeFormatted: '04:20',
    gamifiedPoints: 3350,
    streakMax: 25,
    rankTitle: '👑 Gran Maestro Normativo SENA'
  },
  {
    id: 'sub-174003',
    timestamp: '07/10/2026, 11:20',
    profile: {
      fullName: 'Daniela Salazar Ortiz',
      documentType: 'TI',
      documentNumber: '1085234901',
      trainingProgram: 'Animación Digital 3D',
      recordNumber: '2715984',
      trainingCenter: 'Centro de Diseño Tecnológico Industrial (CDTI)',
      regional: 'Valle del Cauca',
      startDate: '2026-02-01'
    },
    score: 22,
    total: 25,
    percent: 88,
    passed: true,
    answers: { 1: 1, 2: 0, 3: 2, 4: 2, 5: 0, 6: 1, 7: 0, 8: 1, 9: 0, 10: 1, 11: 1, 12: 0, 13: 1, 14: 0, 15: 1, 16: 1, 17: 1, 18: 0, 19: 1, 20: 0, 21: 0, 22: 1, 23: 1, 24: 1, 25: 0 },
    syncedToGoogleSheets: false,
    totalTimeSeconds: 310,
    timeFormatted: '05:10',
    gamifiedPoints: 2680,
    streakMax: 11,
    rankTitle: '🥇 Diamante SENA · Experto'
  }
];

export const getSubmissions = (): InductionSubmission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBMISSIONS));
      return INITIAL_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SUBMISSIONS;
  }
};

export const getLeaderboard = (): InductionSubmission[] => {
  const all = getSubmissions();
  return [...all].sort((a, b) => {
    // 1st criteria: Gamified points descending
    const ptsA = a.gamifiedPoints || (a.score * 100);
    const ptsB = b.gamifiedPoints || (b.score * 100);
    if (ptsB !== ptsA) return ptsB - ptsA;

    // 2nd criteria: Percent correct descending
    if (b.percent !== a.percent) return b.percent - a.percent;

    // 3rd criteria: Time taken ascending (faster is better)
    const timeA = a.totalTimeSeconds || 9999;
    const timeB = b.totalTimeSeconds || 9999;
    return timeA - timeB;
  });
};

export const saveSubmission = (
  profile: ApprenticeProfile,
  score: number,
  total: number,
  percent: number,
  passed: boolean,
  answers: { [questionId: number]: number },
  extra?: {
    totalTimeSeconds?: number;
    timeFormatted?: string;
    gamifiedPoints?: number;
    streakMax?: number;
    timerMode?: 'progresivo' | 'cuenta-regresiva';
    questionTimes?: { [questionId: number]: number };
  }
): InductionSubmission => {
  const current = getSubmissions();
  const gamifiedPoints = extra?.gamifiedPoints ?? (score * 100);
  const rankTitle = calculateRankTitle(gamifiedPoints, percent);

  const newSubmission: InductionSubmission = {
    id: `sub-${Date.now()}`,
    timestamp: new Date().toLocaleString('es-CO', {
      dateStyle: 'short',
      timeStyle: 'short'
    }),
    profile: { ...profile },
    score,
    total,
    percent,
    passed,
    answers: { ...answers },
    syncedToGoogleSheets: false,
    totalTimeSeconds: extra?.totalTimeSeconds,
    timeFormatted: extra?.timeFormatted,
    gamifiedPoints,
    streakMax: extra?.streakMax ?? 0,
    rankTitle,
    timerMode: extra?.timerMode ?? 'progresivo',
    questionTimes: extra?.questionTimes
  };

  const updated = [newSubmission, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving submission:', err);
  }

  // Attempt automatic sync if Google Sheets is connected with a valid token
  try {
    const rawSheet = localStorage.getItem('sena_connected_spreadsheet');
    const token = localStorage.getItem('google_access_token');
    if (rawSheet && token) {
      const sheet = JSON.parse(rawSheet);
      if (sheet && sheet.id) {
        import('./googleSheetsService').then(({ appendApprenticeRecord }) => {
          appendApprenticeRecord(token, sheet.id, {
            timestamp: newSubmission.timestamp,
            fullName: profile.fullName,
            documentType: profile.documentType,
            documentNumber: profile.documentNumber,
            recordNumber: profile.recordNumber,
            trainingProgram: profile.trainingProgram,
            trainingCenter: profile.trainingCenter,
            regional: profile.regional,
            inductionStatus: passed ? 'APROBADO (A)' : 'DEFICIENTE (D)',
            score: `${score}/${total} (${percent}%) - ${gamifiedPoints} pts [${extra?.timeFormatted || '00:00'}]`,
            registeredBy: 'Evaluación Oficial Reglamento SENA (Acuerdo 009)'
          }).then(() => {
            markSubmissionsSynced([newSubmission.id]);
          }).catch((err) => {
            console.warn('Background auto-sync skipped (can be synced via Admin Portal):', err);
          });
        });
      }
    }
  } catch {
    // Graceful fallback
  }

  return newSubmission;
};

export const markSubmissionsSynced = (submissionIds: string[]): void => {
  const current = getSubmissions();
  const now = new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' });
  const updated = current.map((sub) => {
    if (submissionIds.includes(sub.id)) {
      return { ...sub, syncedToGoogleSheets: true, syncedAt: now };
    }
    return sub;
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error updating sync state:', err);
  }
};

export const clearSubmissions = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};
