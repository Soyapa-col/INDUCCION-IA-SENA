import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  InductionSubmission,
  getSubmissions,
  markSubmissionsSynced
} from '../services/submissionService';
import { REGULATION_QUIZ_QUESTIONS, REGULATION_SECTIONS } from '../data/regulationQuizData';
import {
  googleSignIn,
  googleLogout,
  getAccessToken,
  initAuth
} from '../services/googleAuth';
import {
  createInductionSpreadsheet,
  listExistingDriveSheets,
  appendApprenticeRecord,
  SpreadsheetInfo
} from '../services/googleSheetsService';
import {
  Lock,
  Unlock,
  ShieldAlert,
  ShieldCheck,
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  X,
  LogOut,
  UploadCloud,
  Download,
  Users,
  Award,
  BookOpenCheck,
  Check,
  KeyRound
} from 'lucide-react';

interface Props {
  onClose: () => void;
}

const DEFAULT_PIN = 'sena2026';
const PIN_STORAGE_KEY = 'sena_admin_access_pin';

export const AdminPortalModal: React.FC<Props> = ({ onClose }) => {
  // Auth state for admin access gate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [currentPin, setCurrentPin] = useState<string>(() => {
    return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
  });
  const [isChangingPin, setIsChangingPin] = useState<boolean>(false);
  const [newPin, setNewPin] = useState<string>('');

  // Submissions state
  const [submissions, setSubmissions] = useState<InductionSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<InductionSubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFichaFilter, setSelectedFichaFilter] = useState<string>('all');

  // Google Drive Admin Connection state
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isConnectingGoogle, setIsConnectingGoogle] = useState<boolean>(false);
  const [spreadsheet, setSpreadsheet] = useState<SpreadsheetInfo | null>(() => {
    try {
      const saved = localStorage.getItem('sena_connected_spreadsheet');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    // Listen for Google Auth state
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setAccessToken(token);
      },
      () => {
        setGoogleUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    setSubmissions(getSubmissions());
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === currentPin) {
      setIsAuthenticated(true);
      setPinError(null);
    } else {
      setPinError('PIN incorrecto. Por favor verifica las credenciales de instructor.');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      setPinError('El PIN debe tener al menos 4 caracteres.');
      return;
    }
    localStorage.setItem(PIN_STORAGE_KEY, newPin);
    setCurrentPin(newPin);
    setIsChangingPin(false);
    setNewPin('');
    setStatusMessage('PIN de acceso actualizado correctamente.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleGoogleLogin = async () => {
    setIsConnectingGoogle(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setAccessToken(res.accessToken);

        if (!spreadsheet) {
          const existing = await listExistingDriveSheets(res.accessToken);
          const found = existing.find((s) => s.title.includes('Registro de Inducción SENA'));
          if (found) {
            setSpreadsheet(found);
            localStorage.setItem('sena_connected_spreadsheet', JSON.stringify(found));
          } else {
            const created = await createInductionSpreadsheet(res.accessToken);
            setSpreadsheet(created);
            localStorage.setItem('sena_connected_spreadsheet', JSON.stringify(created));
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage(`Error al conectar con Google Drive: ${err.message}`);
    } finally {
      setIsConnectingGoogle(false);
    }
  };

  const handleGoogleLogout = async () => {
    await googleLogout();
    setGoogleUser(null);
    setAccessToken(null);
  };

  const handleSyncSubmissions = async () => {
    if (!accessToken || !spreadsheet?.id) {
      setStatusMessage('Debes iniciar sesión con Google para sincronizar con la hoja de cálculo.');
      return;
    }

    const pending = submissions.filter((s) => !s.syncedToGoogleSheets);
    if (pending.length === 0) {
      setStatusMessage('Todos los registros ya están sincronizados en Google Drive.');
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }

    setIsSyncing(true);
    setStatusMessage(null);
    try {
      for (const item of pending) {
        await appendApprenticeRecord(accessToken, spreadsheet.id, {
          timestamp: item.timestamp,
          fullName: item.profile.fullName,
          documentType: item.profile.documentType,
          documentNumber: item.profile.documentNumber,
          recordNumber: item.profile.recordNumber,
          trainingProgram: item.profile.trainingProgram,
          trainingCenter: item.profile.trainingCenter,
          regional: item.profile.regional,
          inductionStatus: item.passed ? 'Aprobada (Juicio A)' : 'Pendiente Mejoramiento (Juicio D)',
          score: `${item.score}/${item.total} (${item.percent}%) - ${item.gamifiedPoints || item.score * 100} pts [${item.timeFormatted || '00:00'}]`,
          registeredBy: googleUser?.email || 'Instructor Administrador'
        });
      }

      markSubmissionsSynced(pending.map((p) => p.id));
      loadData();
      setStatusMessage(`¡${pending.length} registro(s) sincronizados con éxito en tu Google Drive!`);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      console.error(err);
      setStatusMessage(`Error durante la sincronización: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) return;
    const headers = [
      'Fecha',
      'Nombre Completo',
      'Tipo Doc',
      'Documento',
      'Ficha',
      'Programa',
      'Centro',
      'Puntaje',
      'Porcentaje',
      'Puntos Gamificados',
      'Tiempo Empleado',
      'Racha Maxima',
      'Rango Honorifico',
      'Estado'
    ];
    const rows = submissions.map((s) => [
      `"${s.timestamp}"`,
      `"${s.profile.fullName}"`,
      `"${s.profile.documentType}"`,
      `"${s.profile.documentNumber}"`,
      `"${s.profile.recordNumber}"`,
      `"${s.profile.trainingProgram}"`,
      `"${s.profile.trainingCenter}"`,
      `"${s.score}/${s.total}"`,
      `"${s.percent}%"`,
      `"${s.gamifiedPoints || s.score * 100}"`,
      `"${s.timeFormatted || '00:00'}"`,
      `"${s.streakMax || 0}"`,
      `"${s.rankTitle || 'Aprendiz SENA'}"`,
      `"${s.passed ? 'APROBADO' : 'DEFICIENTE'}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte_induccion_sena_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Metrics & Pedagogical Analytics
  const totalSubmissions = submissions.length;
  const passedCount = submissions.filter((s) => s.passed).length;
  const failedCount = totalSubmissions - passedCount;
  const pendingSyncCount = submissions.filter((s) => !s.syncedToGoogleSheets).length;

  const availableFichas = Array.from(
    new Set(submissions.map((s) => s.profile.recordNumber).filter(Boolean))
  );

  // Section Mastery Statistics Calculation (5 regulation sections x 5 questions)
  const sectionStats = REGULATION_SECTIONS.map((sec, secIdx) => {
    const qStart = secIdx * 5 + 1;
    const qEnd = qStart + 4;
    let totalQuestionsAnswered = 0;
    let totalCorrectAnswers = 0;

    submissions.forEach((sub) => {
      for (let qId = qStart; qId <= qEnd; qId++) {
        if (sub.answers[qId] !== undefined) {
          totalQuestionsAnswered++;
          const question = REGULATION_QUIZ_QUESTIONS.find((q) => q.id === qId);
          if (question && sub.answers[qId] === question.correctAnswer) {
            totalCorrectAnswers++;
          }
        }
      }
    });

    const accuracy =
      totalQuestionsAnswered > 0
        ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100)
        : 0;

    return {
      ...sec,
      accuracy,
      totalQuestionsAnswered,
      totalCorrectAnswers
    };
  });

  const weakestSection = [...sectionStats].sort((a, b) => a.accuracy - b.accuracy)[0];

  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch =
      s.profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.profile.documentNumber.includes(searchTerm) ||
      s.profile.recordNumber.includes(searchTerm) ||
      s.profile.trainingProgram.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFicha =
      selectedFichaFilter === 'all' || s.profile.recordNumber === selectedFichaFilter;

    return matchesSearch && matchesFicha;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-emerald-950 text-white dark:text-emerald-400 flex items-center justify-center shadow-xs">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Panel de Administración & Hoja de Cálculo
                </h3>
                <span className="text-[10px] bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 font-bold px-2 py-0.5 rounded font-mono">
                  Privado Instructor
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gestión segura de resultados y sincronización con Google Drive (no visible para aprendices).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar panel de administración"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {!isAuthenticated ? (
          /* ================= LOGIN SECURITY GATE ================= */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6 flex-1">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-[#39A900] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shadow-sm">
              <KeyRound className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Acceso Restringido a Instructores
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ingresa tu clave PIN de administrador para revisar las respuestas de los aprendices y gestionar la hoja de cálculo en Google Drive.
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="w-full space-y-3">
              <div>
                <input
                  type="password"
                  placeholder="Ingresa PIN de acceso (ej. sena2026)..."
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-2.5 text-center text-sm font-mono tracking-widest bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-600 dark:text-rose-400 mt-1.5 font-medium">
                    {pinError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#39A900] hover:bg-[#329600] text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Ingresar al Panel
              </button>
            </form>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              💡 <em>PIN predeterminado de demostración:</em> <code className="font-mono font-bold text-slate-800 dark:text-slate-200">sena2026</code>. Puedes cambiarlo una vez ingreses.
            </div>
          </div>
        ) : (
          /* ================= AUTHENTICATED ADMIN DASHBOARD ================= */
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Status Messages */}
            {statusMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-500" />
                  Total Evaluaciones
                </span>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {totalSubmissions}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                <span className="text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Aprobados (A)
                </span>
                <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {passedCount}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 space-y-1">
                <span className="text-[10px] font-mono uppercase text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Deficientes (D)
                </span>
                <p className="text-2xl font-extrabold text-amber-700 dark:text-amber-400">
                  {failedCount}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/50 space-y-1">
                <span className="text-[10px] font-mono uppercase text-cyan-700 dark:text-cyan-400 font-bold flex items-center gap-1">
                  <UploadCloud className="w-3.5 h-3.5 text-cyan-600" />
                  Por Sincronizar
                </span>
                <p className="text-2xl font-extrabold text-cyan-700 dark:text-cyan-400">
                  {pendingSyncCount}
                </p>
              </div>
            </div>

            {/* Google Drive / Sheets Admin Sync Control */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4 shadow-lg border border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold">
                        Google Sheets en Drive del Instructor
                      </h4>
                      <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                        {googleUser ? 'Conectado' : 'No Conectado'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {spreadsheet?.title || 'Registro de Inducción SENA - Aprendices'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {!googleUser ? (
                    <button
                      onClick={handleGoogleLogin}
                      disabled={isConnectingGoogle}
                      className="px-4 py-2 bg-[#39A900] hover:bg-[#329600] disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>{isConnectingGoogle ? 'Conectando...' : 'Conectar Google Drive'}</span>
                    </button>
                  ) : (
                    <>
                      {spreadsheet?.url && (
                        <a
                          href={spreadsheet.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Abrir en Google Drive ↗</span>
                        </a>
                      )}

                      <button
                        onClick={handleSyncSubmissions}
                        disabled={isSyncing || pendingSyncCount === 0}
                        className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>Sincronizar Pendientes ({pendingSyncCount})</span>
                      </button>

                      <button
                        onClick={handleGoogleLogout}
                        className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                        title="Desconectar cuenta de Google"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {googleUser && (
                <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-300 font-mono">
                  <span>Cuenta: {googleUser.email}</span>
                  <span className="text-emerald-400 font-bold">✓ Acceso 100% privado y protegido</span>
                </div>
              )}
            </div>

            {/* Pedagogical Analytics Card: Regulation Section Mastery Diagnostic */}
            {submissions.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BookOpenCheck className="w-5 h-5 text-[#39A900]" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        Diagnóstico Pedagógico de Comprensión por Secciones del Acuerdo 009
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Porcentaje de respuestas correctas en las 5 secciones evaluadas en el prototipo.
                      </p>
                    </div>
                  </div>

                  {weakestSection && weakestSection.totalQuestionsAnswered > 0 && (
                    <span className="self-start sm:self-center px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/80 text-amber-800 dark:text-amber-300 font-mono text-[11px] font-bold">
                      ⚠️ Refuerzo prioritario: {weakestSection.title} ({weakestSection.accuracy}% acierto)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-1">
                  {sectionStats.map((sec) => {
                    const isWeakest = weakestSection && weakestSection.id === sec.id && sec.accuracy < 85;
                    return (
                      <div
                        key={sec.id}
                        className={`p-3 rounded-xl border text-xs flex flex-col justify-between space-y-2 ${
                          isWeakest
                            ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/70 text-slate-900 dark:text-white'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-750 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            Sección {sec.number}
                          </span>
                          <span className={`font-mono text-[11px] font-bold ${
                            sec.accuracy >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                          }`}>
                            {sec.accuracy}%
                          </span>
                        </div>
                        <span className="font-semibold text-[11px] line-clamp-1" title={sec.title}>
                          {sec.title}
                        </span>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              sec.accuracy >= 80 ? 'bg-[#39A900]' : 'bg-amber-500'
                            }`}
                            style={{ width: `${sec.accuracy}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Submissions List & Actions */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Historial de Aprendices y Pruebas Presentadas ({filteredSubmissions.length})
                  </h4>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Ficha de caracterización selector filter */}
                  {availableFichas.length > 0 && (
                    <select
                      value={selectedFichaFilter}
                      onChange={(e) => setSelectedFichaFilter(e.target.value)}
                      className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                    >
                      <option value="all">Todas las Fichas ({availableFichas.length})</option>
                      {availableFichas.map((ficha) => (
                        <option key={ficha} value={ficha}>
                          Ficha #{ficha}
                        </option>
                      ))}
                    </select>
                  )}

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Buscar por aprendiz, cédula o programa..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                    />
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    title="Exportar archivo CSV con puntuaciones y tiempos"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar CSV</span>
                  </button>
                </div>
              </div>

              {submissions.length === 0 ? (
                <div className="p-8 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  Aún no hay evaluaciones registradas. Cuando un aprendiz complete la prueba de inducción, aparecerá automáticamente aquí.
                </div>
              ) : (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px] uppercase border-b border-slate-200 dark:border-slate-700 sticky top-0">
                        <tr>
                          <th className="p-2.5">Fecha</th>
                          <th className="p-2.5">Aprendiz</th>
                          <th className="p-2.5">Documento</th>
                          <th className="p-2.5">Ficha</th>
                          <th className="p-2.5">Aciertos</th>
                          <th className="p-2.5">Puntos</th>
                          <th className="p-2.5">Tiempo</th>
                          <th className="p-2.5">Drive</th>
                          <th className="p-2.5 text-right">Respuestas</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredSubmissions.map((sub) => (
                          <tr
                            key={sub.id}
                            className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200 transition-colors"
                          >
                            <td className="p-2.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                              {sub.timestamp}
                            </td>
                            <td className="p-2.5 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                              {sub.profile.fullName}
                            </td>
                            <td className="p-2.5 font-mono whitespace-nowrap">
                              {sub.profile.documentType} {sub.profile.documentNumber}
                            </td>
                            <td className="p-2.5 font-mono text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                              {sub.profile.recordNumber}
                            </td>
                            <td className="p-2.5 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  sub.passed
                                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                    : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                                }`}
                              >
                                {sub.score}/{sub.total} ({sub.percent}%)
                              </span>
                            </td>
                            <td className="p-2.5 font-mono font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">
                              {sub.gamifiedPoints || sub.score * 100} pts
                            </td>
                            <td className="p-2.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                              {sub.timeFormatted || '--:--'}
                            </td>
                            <td className="p-2.5 whitespace-nowrap font-mono text-[11px]">
                              {sub.syncedToGoogleSheets ? (
                                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" /> Sincronizado
                                </span>
                              ) : (
                                <span className="text-amber-600 dark:text-amber-400">
                                  ⚠️ Pendiente
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 text-right whitespace-nowrap">
                              <button
                                onClick={() => setSelectedSubmission(sub)}
                                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-[#39A900] dark:text-emerald-400 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 transition-colors cursor-pointer inline-flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Ver Examen</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Change Admin PIN Accordion */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <div>
                {!isChangingPin ? (
                  <button
                    onClick={() => setIsChangingPin(true)}
                    className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline cursor-pointer"
                  >
                    Cambiar PIN de Acceso Administrador
                  </button>
                ) : (
                  <form onSubmit={handleChangePin} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Nuevo PIN..."
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="px-2 py-1 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 text-xs font-bold bg-[#39A900] text-white rounded cursor-pointer"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsChangingPin(false)}
                      className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </form>
                )}
              </div>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
              >
                Cerrar Sesión Administrador
              </button>
            </div>
          </div>
        )}

        {/* Modal footer */}
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span className="text-[11px] font-mono">
            Portal Seguro SENA · Protocolo de Aislamiento de Información
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Detail Modal for an Apprentice's Test Answers */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Examen de Inducción: {selectedSubmission.profile.fullName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {selectedSubmission.profile.documentType} {selectedSubmission.profile.documentNumber} · Ficha {selectedSubmission.profile.recordNumber} · Puntaje: {selectedSubmission.score}/{selectedSubmission.total} ({selectedSubmission.percent}%)
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {REGULATION_QUIZ_QUESTIONS.map((q, idx) => {
                const studentAnswer = selectedSubmission.answers[q.id];
                const isCorrect = studentAnswer === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                      isCorrect
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                        : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                          Sección {q.sectionNumber}: {q.sectionTitle} · Pregunta {idx + 1}
                        </span>
                        <h5 className="font-bold text-slate-900 dark:text-white">
                          {q.question}
                        </h5>
                      </div>
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                        }`}
                      >
                        {isCorrect ? 'Correcta' : 'Incorrecta'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-slate-700 dark:text-slate-300">
                        <span className="font-semibold text-slate-500">Respuesta del aprendiz:</span>{' '}
                        {studentAnswer !== undefined ? q.options[studentAnswer] : 'No respondió'}
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-700 dark:text-emerald-400">
                          <span className="font-semibold">Respuesta correcta:</span>{' '}
                          {q.options[q.correctAnswer]}
                        </div>
                      )}
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        {isCorrect ? q.positiveFeedback : q.correctiveFeedback}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Ref: {q.ruleReference}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white rounded-lg cursor-pointer"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
