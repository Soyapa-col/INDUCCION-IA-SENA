import React, { useState, useEffect, useRef } from 'react';
import { ApprenticeProfile } from '../../types/induction';
import {
  REGULATION_QUIZ_QUESTIONS,
  REGULATION_SECTIONS,
  RegulationQuizQuestion
} from '../../data/regulationQuizData';
import {
  saveSubmission,
  getLeaderboard,
  calculateRankTitle,
  InductionSubmission
} from '../../services/submissionService';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Printer,
  Sparkles,
  AlertCircle,
  Timer,
  Flame,
  Trophy,
  UserCheck,
  ArrowRight,
  Check,
  Eye,
  Clock,
  Hourglass,
  Zap,
  HelpCircle,
  FileSpreadsheet,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CertificatePrintView } from '../CertificatePrintView';
import { HudFrame } from '../HudFrame';

interface Props {
  profile: ApprenticeProfile;
  onMarkComplete: () => void;
  isCompleted: boolean;
  onOpenAdminPortal?: () => void;
}

const QUESTION_COUNT_PER_SECTION = 5;
const COUNTDOWN_SECONDS_PER_QUESTION = 45; // 45s countdown challenge

export const FinalEvaluationModule: React.FC<Props> = ({
  profile,
  onMarkComplete,
  isCompleted,
  onOpenAdminPortal
}) => {
  // Screen steps: 'registration' | 'quiz' | 'results'
  const [step, setStep] = useState<'registration' | 'quiz' | 'results'>('registration');

  // Apprentice Data Form State (Unified entry)
  const [formData, setFormData] = useState<ApprenticeProfile>({
    fullName: profile.fullName || '',
    documentType: profile.documentType || 'CC',
    documentNumber: profile.documentNumber || '',
    trainingProgram: profile.trainingProgram || '',
    recordNumber: profile.recordNumber || '',
    trainingCenter: profile.trainingCenter || '',
    regional: profile.regional || '',
    startDate: profile.startDate || '2026-02-01'
  });

  // Clock preference: 'progresivo' (count-up) | 'cuenta-regresiva' (countdown)
  const [timerMode, setTimerMode] = useState<'progresivo' | 'cuenta-regresiva'>('progresivo');

  // Quiz Navigation & Answer State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [questionFeedback, setQuestionFeedback] = useState<{
    selectedOption: number;
    isCorrect: boolean;
    pointsEarned: number;
    speedBonus: number;
    multiplier: number;
    timeSpent: number;
  } | null>(null);

  // Gamification & Timer State
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [questionCountdown, setQuestionCountdown] = useState<number>(COUNTDOWN_SECONDS_PER_QUESTION);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [gamifiedPoints, setGamifiedPoints] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [questionTimes, setQuestionTimes] = useState<{ [qId: number]: number }>({});

  const questionStartTimeRef = useRef<number>(0);

  // Review & Certificate Modals
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [showDetailedReview, setShowDetailedReview] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<InductionSubmission[]>([]);

  const questions = REGULATION_QUIZ_QUESTIONS; // Exactly 25 questions, 5 per section
  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestionIndex];

  // Progressive timer tick (measures overall elapsed time)
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && step === 'quiz') {
      interval = setInterval(() => {
        setTotalSeconds((prev) => prev + 1);

        // Countdown tick per question if in countdown mode
        if (timerMode === 'cuenta-regresiva' && questionFeedback === null) {
          setQuestionCountdown((prev) => {
            if (prev <= 1) {
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, step, timerMode, questionFeedback]);

  const formatTimer = (secs: number): string => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // Start Quiz Handler
  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.documentNumber.trim() || !formData.recordNumber.trim()) {
      return;
    }
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuestionFeedback(null);
    setTotalSeconds(0);
    setQuestionCountdown(COUNTDOWN_SECONDS_PER_QUESTION);
    setGamifiedPoints(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setQuestionTimes({});
    questionStartTimeRef.current = 0;
    setIsTimerRunning(true);
    setStep('quiz');
  };

  // Handle Option Click
  const handleSelectOption = (optionIndex: number) => {
    if (questionFeedback !== null) return; // already answered

    const isCorrect = optionIndex === currentQ.correctAnswer;
    const timeSpentOnQuestion = Math.max(1, totalSeconds - questionStartTimeRef.current);

    // Speed bonus calculation:
    // Under 10s: +50 bonus pts
    // Under 20s: +25 bonus pts
    // Under 35s: +10 bonus pts
    // If in countdown mode: remaining seconds converted to bonus
    let speedBonus = 0;
    if (isCorrect) {
      if (timerMode === 'cuenta-regresiva') {
        speedBonus = Math.min(50, Math.round(questionCountdown * 1.1));
      } else {
        if (timeSpentOnQuestion <= 10) speedBonus = 50;
        else if (timeSpentOnQuestion <= 20) speedBonus = 25;
        else if (timeSpentOnQuestion <= 35) speedBonus = 10;
      }
    }

    // Streak and multiplier:
    // 1-2: 1.0x
    // 3-4: 1.25x
    // 5-9: 1.5x 🔥
    // 10-14: 2.0x ⚡
    // 15+: 2.5x 👑
    let newStreak = isCorrect ? currentStreak + 1 : 0;
    if (newStreak > maxStreak) setMaxStreak(newStreak);
    setCurrentStreak(newStreak);

    let multiplier = 1.0;
    if (newStreak >= 15) multiplier = 2.5;
    else if (newStreak >= 10) multiplier = 2.0;
    else if (newStreak >= 5) multiplier = 1.5;
    else if (newStreak >= 3) multiplier = 1.25;

    const basePoints = isCorrect ? 100 : 0;
    const pointsEarned = isCorrect ? Math.round((basePoints + speedBonus) * multiplier) : 0;

    setGamifiedPoints((prev) => prev + pointsEarned);
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));
    setQuestionTimes((prev) => ({ ...prev, [currentQ.id]: timeSpentOnQuestion }));

    setQuestionFeedback({
      selectedOption: optionIndex,
      isCorrect,
      pointsEarned,
      speedBonus,
      multiplier,
      timeSpent: timeSpentOnQuestion
    });
  };

  // Next Question or Finish
  const handleNextQuestion = () => {
    setQuestionFeedback(null);
    questionStartTimeRef.current = totalSeconds;
    setQuestionCountdown(COUNTDOWN_SECONDS_PER_QUESTION);

    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  // Finish Quiz and calculate results
  const handleFinishQuiz = () => {
    setIsTimerRunning(false);

    let correct = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const percent = Math.round((correct / totalQuestions) * 100);
    const passed = percent >= 80; // Minimum 80% SENA standard
    const timeFormatted = formatTimer(totalSeconds);

    // Save submission to database conforming to Google Sheets schema
    saveSubmission(
      formData,
      correct,
      totalQuestions,
      percent,
      passed,
      userAnswers,
      {
        totalTimeSeconds: totalSeconds,
        timeFormatted,
        gamifiedPoints,
        streakMax: maxStreak,
        timerMode,
        questionTimes
      }
    );

    if (passed) {
      onMarkComplete();
    }

    setLeaderboard(getLeaderboard());
    setStep('results');
  };

  const handleRetryQuiz = () => {
    setStep('registration');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuestionFeedback(null);
  };

  // Stats calculation
  const correctCount = Object.keys(userAnswers).filter((qId) => {
    const q = questions.find((item) => item.id === Number(qId));
    return q && userAnswers[Number(qId)] === q.correctAnswer;
  }).length;

  const currentPercent = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = currentPercent >= 80;

  // Active section data
  const currentSection = REGULATION_SECTIONS.find((s) => s.id === currentQ.sectionId);

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 transition-colors">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <span>Módulo 05 · Módulo Unificado de Evaluación</span>
          <span aria-hidden="true">·</span>
          <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
            Acuerdo 009 de 2024
          </span>
          <span aria-hidden="true">·</span>
          <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
            5 Preguntas por Sección (25 Total)
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Evaluación Integral de Reglamento SENA & Ranking Gamificado
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Ingresa tus datos institucionales para presentar la evaluación oficial. Se evaluarán <strong>5 preguntas de cada una de las 5 secciones del reglamento</strong>, con retroalimentación animada, medición de tiempo de respuesta y clasificación en el ranking institucional.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: APPRENTICE REGISTRATION & TIMER PREFERENCE FORM                  */}
      {/* ========================================================================= */}
      {step === 'registration' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Ingreso de Datos del Aprendiz
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Estos datos quedarán registrados y sincronizados con la hoja de cálculo en Drive del instructor.
                </p>
              </div>
            </div>

            <form onSubmit={handleStartQuiz} className="space-y-6">
              {/* Personal Data Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre Completo del Aprendiz *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white transition-colors"
                    placeholder="Ej. Alejandro Gómez Restrepo"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tipo de Documento *
                  </label>
                  <select
                    value={formData.documentType}
                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white transition-colors"
                  >
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="TI">Tarjeta de Identidad (TI)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                    <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Número de Documento *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white transition-colors"
                    placeholder="Ej. 1098234567"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ficha de Caracterización (Grupo) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.recordNumber}
                    onChange={(e) => setFormData({ ...formData, recordNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white transition-colors"
                    placeholder="Ej. 2715984"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Programa de Formación *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.trainingProgram}
                    onChange={(e) => setFormData({ ...formData, trainingProgram: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white transition-colors"
                    placeholder="Ej. Análisis y Desarrollo de Software (ADSO)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Centro de Formación *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.trainingCenter}
                    onChange={(e) => setFormData({ ...formData, trainingCenter: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white transition-colors"
                    placeholder="Ej. Centro de Electricidad y Automatización Industrial (CEAI)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Regional SENA *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.regional}
                    onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white transition-colors"
                    placeholder="Ej. Valle del Cauca"
                  />
                </div>
              </div>

              {/* Clock & Timer Mode Selection */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase font-mono tracking-wider">
                  Configuración del Reloj y Modo de Tiempo
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTimerMode('progresivo')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      timerMode === 'progresivo'
                        ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <Clock className={`w-5 h-5 shrink-0 mt-0.5 ${timerMode === 'progresivo' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>⏱️ Reloj de Tiempo Transcurrido</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 px-1.5 py-0.2 rounded font-mono">Recomendado</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Lleva la cuenta exacta de cuánto tardas en responder en total y en cada pregunta. Entre más rápido y acertado respondas, mayor puntuación de velocidad obtendrás.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimerMode('cuenta-regresiva')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      timerMode === 'cuenta-regresiva'
                        ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <Hourglass className={`w-5 h-5 shrink-0 mt-0.5 ${timerMode === 'cuenta-regresiva' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white">
                        ⏳ Reloj de Cuenta Regresiva (Contrarreloj)
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Cuenta regresiva dinámica de 45 segundos por pregunta con barra de urgencia animada. Los segundos restantes se transforman en puntos extra.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Challenge Rules & Structure (5 sections x 5 questions) */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800/50 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 uppercase font-mono text-[11px]">
                  <Trophy className="w-4 h-4 text-[#39A900]" />
                  Estructura Oficial del Desafío Normativo
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] leading-relaxed">
                  <div><strong>1. Novedades y Marco:</strong> 5 preguntas</div>
                  <div><strong>2. Derechos del Aprendiz:</strong> 5 preguntas</div>
                  <div><strong>3. Deberes y Ciberconvivencia:</strong> 5 preguntas</div>
                  <div><strong>4. Trámites y Deserción:</strong> 5 preguntas</div>
                  <div className="sm:col-span-2"><strong>5. Faltas y Régimen Sancionatorio:</strong> 5 preguntas</div>
                </div>
                <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800/50 flex flex-wrap items-center gap-3 text-[11px] font-mono text-emerald-900 dark:text-emerald-200">
                  <span>🎯 Aprobación: Mínimo 80% (20 aciertos)</span>
                  <span>🔥 Multiplicadores por combo sin fallas</span>
                  <span>⚡ Bonos por rapidez</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#39A900] hover:bg-[#329600] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Comenzar Evaluación Oficial (25 Preguntas)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: INTERACTIVE 25-QUESTION GAMIFIED QUIZ                              */}
      {/* ========================================================================= */}
      {step === 'quiz' && (
        <div className="space-y-6">
          {/* Section Indicator Tabs (5 Sections x 5 questions) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {REGULATION_SECTIONS.map((sec) => {
              const isCurrentSection = sec.id === currentQ.sectionId;
              const sectionQuestions = questions.filter((q) => q.sectionId === sec.id);
              const sectionAnswered = sectionQuestions.filter((q) => userAnswers[q.id] !== undefined).length;
              const isDone = sectionAnswered === QUESTION_COUNT_PER_SECTION;

              return (
                <div
                  key={sec.id}
                  className={`p-2.5 rounded-xl border text-xs transition-all flex flex-col justify-between ${
                    isCurrentSection
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-slate-900 dark:text-white shadow-xs ring-1 ring-emerald-500/30'
                      : isDone
                      ? 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-400">
                      Sección {sec.number}
                    </span>
                    {isDone ? (
                      <span className="inline-flex items-center text-[10px] font-mono text-emerald-600 font-bold gap-0.5">
                        <Check className="w-3 h-3 text-emerald-600" /> 5/5
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400">
                        {sectionAnswered}/5
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-[11px] truncate mt-1">
                    {sec.title}
                  </span>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-[#39A900] h-full transition-all duration-300"
                      style={{ width: `${(sectionAnswered / QUESTION_COUNT_PER_SECTION) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gamified HUD: Active Clock, Score, Streak Multiplier */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Pregunta {currentQuestionIndex + 1} de {totalQuestions}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ({Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% avance)
              </span>
            </div>

            {/* Live Clock / Timer Displays */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {/* Progressive Chronometer */}
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors"
                title="Tiempo total acumulado transcurrido"
                onClick={() => setTimerMode(timerMode === 'progresivo' ? 'cuenta-regresiva' : 'progresivo')}
              >
                <Clock className="w-4 h-4 text-cyan-500 animate-pulse" />
                <span>Total: {formatTimer(totalSeconds)}</span>
              </div>

              {/* Countdown Timer (if countdown mode is active) */}
              {timerMode === 'cuenta-regresiva' && (
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-colors ${
                    questionCountdown <= 10
                      ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-700 dark:text-rose-300 animate-pulse-urgent'
                      : questionCountdown <= 20
                      ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-700 dark:text-amber-300'
                      : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-700 dark:text-emerald-300'
                  }`}
                  title="Cuenta regresiva para la pregunta actual"
                >
                  <Hourglass className="w-4 h-4" />
                  <span>{questionCountdown}s restantes</span>
                </div>
              )}

              {/* Cumulative Gamified Points */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/50 font-mono text-xs font-bold text-amber-800 dark:text-amber-300 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{gamifiedPoints} pts</span>
              </div>

              {/* Streak Flame Counter */}
              {currentStreak >= 2 ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-mono text-xs font-bold animate-bounce">
                  <Flame className="w-4 h-4 text-rose-500" />
                  <span>Racha {currentStreak} 🔥</span>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <span>Sin racha</span>
                </div>
              )}
            </div>
          </div>

          {/* Active Question Box */}
          <HudFrame headerTitle={`Sección ${currentQ.sectionNumber}: ${currentQ.sectionTitle}`}>
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold uppercase">
                    {currentQ.ruleReference}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Pregunta {currentQuestionIndex + 1}/25
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Countdown dynamic progress bar if in countdown mode */}
              {timerMode === 'cuenta-regresiva' && questionFeedback === null && (
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      questionCountdown <= 10
                        ? 'bg-rose-500'
                        : questionCountdown <= 20
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${(questionCountdown / COUNTDOWN_SECONDS_PER_QUESTION) * 100}%` }}
                  />
                </div>
              )}

              {/* 4 Answer Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = questionFeedback?.selectedOption === idx;
                  const isCorrect = idx === currentQ.correctAnswer;
                  const hasAnswered = questionFeedback !== null;

                  let optionStyle =
                    'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-[#39A900] dark:hover:border-emerald-600 text-slate-800 dark:text-slate-200';

                  if (hasAnswered) {
                    if (isCorrect) {
                      optionStyle =
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/40 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle =
                        'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-100 ring-2 ring-rose-500/40 font-semibold';
                    } else {
                      optionStyle =
                        'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 opacity-50 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                        hasAnswered && isCorrect
                          ? 'bg-emerald-600 text-white'
                          : hasAnswered && isSelected && !isCorrect
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{option}</span>
                      {hasAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback Card with Animations (Positive or Corrective) */}
              {questionFeedback && (
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    questionFeedback.isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 animate-pop-celebrate shadow-md'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100 animate-shake shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      {questionFeedback.isCorrect ? (
                        <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base">
                          {questionFeedback.isCorrect
                            ? '🎉 ¡RESPUESTA CORRECTA! EXCELENTE DOMINIO NORMATIVO'
                            : '⚠️ IDENTIFICACIÓN DEL ERROR · REFUERZO PEDAGÓGICO'}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          Tiempo empleado en la pregunta: {questionFeedback.timeSpent} segundos
                        </span>
                      </div>
                    </div>

                    {questionFeedback.isCorrect && (
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        <span className="bg-emerald-200 dark:bg-emerald-900/80 px-2 py-1 rounded">
                          +{questionFeedback.pointsEarned} pts ganados
                        </span>
                        {questionFeedback.speedBonus > 0 && (
                          <span className="text-[10px] bg-cyan-200 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-200 px-1.5 py-1 rounded">
                            ⚡ +{questionFeedback.speedBonus} vel
                          </span>
                        )}
                        {questionFeedback.multiplier > 1.0 && (
                          <span className="text-[10px] bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-1.5 py-1 rounded">
                            🔥 x{questionFeedback.multiplier} combo
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Diagnostic feedback text */}
                  <div className="mt-3 text-xs sm:text-sm leading-relaxed space-y-2">
                    {questionFeedback.isCorrect ? (
                      <p className="font-medium text-emerald-950 dark:text-emerald-100">
                        {currentQ.positiveFeedback}
                      </p>
                    ) : (
                      <div className="space-y-1.5">
                        <p className="font-medium text-rose-950 dark:text-rose-100">
                          {currentQ.correctiveFeedback}
                        </p>
                        <div className="p-3 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-rose-200 dark:border-rose-900/50 text-xs">
                          <strong className="text-emerald-700 dark:text-emerald-400">Respuesta Correcta:</strong>{' '}
                          <span className="text-slate-800 dark:text-slate-200 font-medium">
                            {currentQ.options[currentQ.correctAnswer]}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Normative legal basis */}
                  <div className="mt-3 pt-2.5 border-t border-emerald-200/60 dark:border-emerald-800/60 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                    <strong>Sustento Normativo Oficial:</strong> {currentQ.ruleReference}
                  </div>

                  {/* Next Question Action Button */}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#39A900] hover:bg-[#329600] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <span>
                        {currentQuestionIndex + 1 === totalQuestions
                          ? 'Finalizar y Ver Resultados 🏆'
                          : 'Siguiente Pregunta ➔'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </HudFrame>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: RESULTS SCREEN & GAMIFIED LEADERBOARD                             */}
      {/* ========================================================================= */}
      {step === 'results' && (
        <div className="space-y-8">
          {/* Main Results Banner */}
          <div
            className={`p-8 rounded-2xl border text-center space-y-5 shadow-sm ${
              isPassed
                ? 'bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-teal-950/30 border-emerald-300 dark:border-emerald-800'
                : 'bg-gradient-to-br from-amber-50 via-white to-rose-50 dark:from-amber-950/30 dark:via-slate-900 dark:to-rose-950/30 border-amber-300 dark:border-amber-800'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white shadow-md bg-[#39A900]">
              {isPassed ? <Award className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Resultado Oficial de Inducción SENA · Acuerdo 009
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Juicio Evaluativo:{' '}
                <span className={isPassed ? 'text-[#007832] dark:text-[#4ADE80]' : 'text-amber-800 dark:text-amber-300'}>
                  {isPassed ? 'APROBADO (A)' : 'DEFICIENTE (D)'}
                </span>
              </h3>
              <p className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300">
                {correctCount} de {totalQuestions} respuestas correctas ({currentPercent}%)
              </p>
            </div>

            {/* Gamified Summary Metrics */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-xs">
                ⭐ {gamifiedPoints} Puntos Gamificados
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-xs">
                ⏱️ Tiempo Total: {formatTimer(totalSeconds)} min
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-xs">
                🔥 Racha Máxima: {maxStreak} seguidas
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-mono shadow-xs">
                {calculateRankTitle(gamifiedPoints, currentPercent)}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
              {isPassed
                ? `¡Felicitaciones, ${formData.fullName}! Has superado el umbral aprobatorio institucional del 80%. Has dominado los derechos, deberes y normativas del Acuerdo 009 de 2024.`
                : 'No alcanzaste el mínimo aprobatorio institucional del 80% (mínimo 20 aciertos de 25). Revisa las preguntas fallidas para concertar el plan de mejoramiento pedagógico y vuelve a intentarlo.'}
            </p>

            {/* Confirmation of data saved in Google Sheets schema */}
            <div className="p-3 bg-white/95 dark:bg-slate-850/95 rounded-xl border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-2 max-w-lg mx-auto shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                Registro guardado y formateado según la estructura de la Hoja de Cálculo en Google Drive del Instructor.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {isPassed && (
                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#39A900] hover:bg-[#329600] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Ver e Imprimir Certificado Digital</span>
                </button>
              )}

              <button
                onClick={() => setShowDetailedReview(!showDetailedReview)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                <Eye className="w-4 h-4" />
                <span>{showDetailedReview ? 'Ocultar Revisión' : 'Revisar las 25 Preguntas'}</span>
              </button>

              <button
                onClick={handleRetryQuiz}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Presentar Nuevamente</span>
              </button>
            </div>
          </div>

          {/* Gamified Leaderboard / Ranking Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Ranking Institucional de Aprendices
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Clasificación gamificada por puntuación de rapidez, precisión y combo sin fallas.
                  </p>
                </div>
              </div>

              {onOpenAdminPortal && (
                <button
                  onClick={onOpenAdminPortal}
                  className="self-start sm:self-center text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Portal Administrador</span>
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 font-mono text-[11px] text-slate-500 uppercase border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Posición</th>
                    <th className="p-3">Aprendiz</th>
                    <th className="p-3">Ficha</th>
                    <th className="p-3">Puntos Gamificados</th>
                    <th className="p-3">Aciertos</th>
                    <th className="p-3">Tiempo Total</th>
                    <th className="p-3">Rango Honorífico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {leaderboard.map((sub, idx) => {
                    const isCurrent = sub.profile.documentNumber === formData.documentNumber;
                    return (
                      <tr
                        key={sub.id}
                        className={`transition-colors ${
                          isCurrent
                            ? 'bg-emerald-50/90 dark:bg-emerald-950/50 font-semibold ring-1 ring-emerald-500/30'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <td className="p-3 font-mono font-bold">
                          {idx === 0 ? '🥇 1°' : idx === 1 ? '🥈 2°' : idx === 2 ? '🥉 3°' : `${idx + 1}°`}
                        </td>
                        <td className="p-3 font-medium text-slate-900 dark:text-white">
                          <div className="flex items-center gap-1.5">
                            <span>{sub.profile.fullName}</span>
                            {isCurrent && (
                              <span className="text-[10px] bg-[#39A900] text-white px-1.5 py-0.2 rounded font-mono font-bold">
                                TÚ
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 font-mono text-emerald-700 dark:text-emerald-400">
                          {sub.profile.recordNumber}
                        </td>
                        <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">
                          {sub.gamifiedPoints || sub.score * 100} pts
                        </td>
                        <td className="p-3 font-mono">
                          {sub.score}/{sub.total} ({sub.percent}%)
                        </td>
                        <td className="p-3 font-mono text-slate-600 dark:text-slate-300">
                          {sub.timeFormatted || '04:00'} min
                        </td>
                        <td className="p-3 text-[11px]">
                          {sub.rankTitle || 'Aprendiz SENA'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Question-by-Question Review Accordion */}
          {showDetailedReview && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Revisión Detallada de las 25 Preguntas (5 por cada Sección)
              </h4>

              <div className="space-y-3">
                {questions.map((q, idx) => {
                  const studentAnswer = userAnswers[q.id];
                  const isCorrect = studentAnswer === q.correctAnswer;
                  const timeSpent = questionTimes[q.id];

                  return (
                    <div
                      key={q.id}
                      className={`p-5 bg-white dark:bg-slate-900 border rounded-2xl space-y-2.5 shadow-xs transition-colors ${
                        isCorrect
                          ? 'border-emerald-200 dark:border-emerald-800/60'
                          : 'border-rose-200 dark:border-rose-800/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                            Sección {q.sectionNumber}: {q.sectionTitle} · Pregunta {idx + 1} de 25
                          </span>
                          <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                            {q.question}
                          </h5>
                        </div>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 shrink-0 ${
                            isCorrect
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                              : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                          }`}
                        >
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          <span>{isCorrect ? 'Correcta' : 'Incorrecta'}</span>
                        </span>
                      </div>

                      <div className="text-xs space-y-1.5 pt-1">
                        <div className="text-slate-700 dark:text-slate-300">
                          <strong>Tu respuesta:</strong>{' '}
                          <span className={isCorrect ? 'text-emerald-700 dark:text-emerald-300 font-medium' : 'text-rose-700 dark:text-rose-300 font-medium'}>
                            {studentAnswer !== undefined ? q.options[studentAnswer] : 'No respondida'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="text-emerald-700 dark:text-emerald-400">
                            <strong>Respuesta reglamentaria correcta:</strong> {q.options[q.correctAnswer]}
                          </div>
                        )}
                        <p className="text-slate-500 dark:text-slate-400 italic pt-1 text-[11px] leading-relaxed">
                          {isCorrect ? q.positiveFeedback : q.correctiveFeedback}
                        </p>
                        <div className="text-[10px] font-mono text-slate-400 pt-1">
                          Norma: {q.ruleReference} {timeSpent ? `· Tiempo: ${timeSpent}s` : ''}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Official Certificate Modal */}
      {showCertificateModal && (
        <CertificatePrintView
          profile={formData}
          score={currentPercent}
          onClose={() => setShowCertificateModal(false)}
        />
      )}
    </div>
  );
};
