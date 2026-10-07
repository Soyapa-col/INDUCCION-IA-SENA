import React from 'react';
import { ModuleId, ApprenticeProfile } from '../types/induction';
import { User, BookOpen, HelpCircle, Sun, Moon, Sparkles, Lock } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface HeaderProps {
  activeModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  onOpenProfile: () => void;
  onOpenGlossary: () => void;
  onOpenAssistant: () => void;
  onOpenAdminPortal?: () => void;
  profile: ApprenticeProfile;
  progressPercent: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeModule,
  onSelectModule,
  onOpenProfile,
  onOpenGlossary,
  onOpenAssistant,
  onOpenAdminPortal,
  profile,
  progressPercent,
  isDarkMode,
  onToggleDarkMode
}) => {
  const navItems: { id: ModuleId; label: string }[] = [
    { id: 'identidad', label: 'Identidad' },
    { id: 'modelo', label: 'Modelo FPI' },
    { id: 'reglamento', label: 'Reglamento' },
    { id: 'bienestar', label: 'Bienestar' },
    { id: 'evaluacion', label: 'Evaluación & Ranking' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#07101b]/95 backdrop-blur border-b border-slate-200 dark:border-cyan-500/30 transition-colors shadow-xs">
      {/* Top cyan tech rail line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-[#39A900] to-cyan-500 opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title with HUD badge and LED status */}
        <button
          onClick={() => onSelectModule('identidad')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39A900] rounded-lg p-1 cursor-pointer"
        >
          <SenaLogo variant="badge" size="md" className="w-11 h-11 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(57,169,0,0.4)]" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                Inducción SENA
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee] hidden sm:inline-block" title="Sistema Activo" />
            </div>
            <span className="text-[10px] font-mono tracking-wider text-slate-400 dark:text-cyan-400/80 -mt-0.5 hidden sm:block">
              PORTAL INSTITUCIONAL 4.0
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 nav links, styled with HUD sci-fi accents */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Gemini AI Workspace Button */}
          <button
            onClick={() => onSelectModule('gemini-workspace')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
              activeModule === 'gemini-workspace'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_12px_rgba(57,169,0,0.5)] border border-emerald-400'
                : 'bg-emerald-50 dark:bg-emerald-950/50 text-[#39A900] dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini Acuerdo 009</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions + Dark Mode Toggle on the right */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenAdminPortal && (
            <button
              onClick={onOpenAdminPortal}
              title="Acceso Exclusivo para Instructores y Administradores (Protegido por PIN)"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap cursor-pointer border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden xl:inline">Portal Instructor</span>
            </button>
          )}

          <button
            onClick={onOpenGlossary}
            title="Glosario Institucional"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Glosario</span>
          </button>

          <button
            onClick={onOpenAssistant}
            title="Tutor y Preguntas Frecuentes"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Ayuda</span>
          </button>

          <button
            onClick={onOpenProfile}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 rounded-md transition-colors shadow-sm whitespace-nowrap cursor-pointer border border-transparent dark:border-slate-700"
          >
            <User className="w-3.5 h-3.5 text-[#39A900]" />
            <span className="max-w-[110px] truncate">{profile.fullName.split(' ')[0] || 'Aprendiz'}</span>
            <span className="text-[10px] text-slate-300 dark:text-slate-400 font-mono">({progressPercent}%)</span>
          </button>

          {/* Theme Toggle Button (Upper Right Side) */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-all cursor-pointer border border-slate-200 dark:border-slate-700 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39A900]"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden lg:inline text-slate-300">Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span className="hidden lg:inline text-slate-700">Modo Oscuro</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
