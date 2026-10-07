/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ApprenticeProfile, ModuleId, ModuleProgress } from './types/induction';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ModuleNav } from './components/ModuleNav';
import { InstitutionalIdentityModule } from './components/modules/InstitutionalIdentityModule';
import { PedagogicalModelModule } from './components/modules/PedagogicalModelModule';
import { ApprenticeRegulationsModule } from './components/modules/ApprenticeRegulationsModule';
import { WellnessAndEcosystemModule } from './components/modules/WellnessAndEcosystemModule';
import { FinalEvaluationModule } from './components/modules/FinalEvaluationModule';
import { ApprenticeProfileModal } from './components/ApprenticeProfileModal';
import { GlossaryModal } from './components/GlossaryModal';
import { SenaAssistantModal } from './components/SenaAssistantModal';
import { SenaLogo } from './components/SenaLogo';
import { GeminiWorkspaceView } from './components/GeminiWorkspaceView';
import { AdminPortalModal } from './components/AdminPortalModal';
import { Lock } from 'lucide-react';

const DEFAULT_PROFILE: ApprenticeProfile = {
  fullName: 'Alejandro Gómez Restrepo',
  documentType: 'CC',
  documentNumber: '1098234567',
  trainingProgram: 'Análisis y Desarrollo de Software (ADSO)',
  recordNumber: '2715984',
  trainingCenter: 'Centro de Electricidad y Automatización Industrial (CEAI)',
  regional: 'Valle del Cauca',
  startDate: '2026-02-01'
};

const DEFAULT_PROGRESS: ModuleProgress = {
  identidad: false,
  modelo: false,
  reglamento: false,
  bienestar: false,
  evaluacion: false
};

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('identidad');

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('sena_theme_mode');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [isBlurring, setIsBlurring] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sena_theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sena_theme_mode', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsBlurring(true);
    setIsDarkMode((prev) => !prev);
    window.setTimeout(() => {
      setIsBlurring(false);
    }, 450);
  };

  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem('sena_apprentice_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [progress, setProgress] = useState<ModuleProgress>(() => {
    try {
      const saved = localStorage.getItem('sena_induction_progress');
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
    } catch {
      // ignore storage errors
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('sena_induction_progress', JSON.stringify(progress));
    } catch {
      // ignore storage errors
    }
  }, [progress]);

  const markModuleCompleted = (mod: ModuleId) => {
    setProgress((prev) => ({ ...prev, [mod]: true }));
  };

  const handleNextFrom = (current: ModuleId) => {
    const sequence: ModuleId[] = ['identidad', 'modelo', 'reglamento', 'bienestar', 'evaluacion'];
    const idx = sequence.indexOf(current);
    if (idx >= 0 && idx < sequence.length - 1) {
      setActiveModule(sequence[idx + 1]);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 5) * 100);

  return (
    <>
      {/* Dynamic Screen Blur Overlay on Theme Toggle */}
      {isBlurring && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-md bg-emerald-950/15 transition-opacity duration-300"
        />
      )}

      <div
        className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-[#39A900] selection:text-white transition-all duration-300 ${
          isBlurring ? 'theme-transition-blur' : 'theme-transition-normal'
        }`}
      >
        {/* 3-Zone Header Contract with Dark Mode Button on the Right */}
        <Header
          activeModule={activeModule}
          onSelectModule={setActiveModule}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenGlossary={() => setIsGlossaryOpen(true)}
          onOpenAssistant={() => setIsAssistantOpen(true)}
          onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
          profile={profile}
          progressPercent={progressPercent}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />

        {/* Zone switcher: Either Gemini AI Workspace or Traditional Induction Modules */}
        {activeModule === 'gemini-workspace' ? (
          <div className="flex-1 flex flex-col">
            <GeminiWorkspaceView
              profile={profile}
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
              onOpenProfile={() => setIsProfileOpen(true)}
              onNavigateToModule={(mod) => {
                setActiveModule(mod);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        ) : (
          <>
            {/* Hero Banner with progress & campus backdrop */}
            <HeroBanner
              profile={profile}
              progress={progress}
              onSelectModule={setActiveModule}
              onOpenProfile={() => setIsProfileOpen(true)}
            />

            {/* Step navigation bar */}
            <ModuleNav
              activeModule={activeModule}
              onSelectModule={setActiveModule}
              progress={progress}
            />

            {/* Main Induction Work Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              {activeModule === 'identidad' && (
                <InstitutionalIdentityModule
                  isCompleted={progress.identidad}
                  onMarkComplete={() => markModuleCompleted('identidad')}
                  onNextModule={() => handleNextFrom('identidad')}
                />
              )}

              {activeModule === 'modelo' && (
                <PedagogicalModelModule
                  isCompleted={progress.modelo}
                  onMarkComplete={() => markModuleCompleted('modelo')}
                  onNextModule={() => handleNextFrom('modelo')}
                />
              )}

              {activeModule === 'reglamento' && (
                <ApprenticeRegulationsModule
                  isCompleted={progress.reglamento}
                  onMarkComplete={() => markModuleCompleted('reglamento')}
                  onNextModule={() => handleNextFrom('reglamento')}
                  onOpenGeminiWorkspace={() => setActiveModule('gemini-workspace')}
                />
              )}

              {activeModule === 'bienestar' && (
                <WellnessAndEcosystemModule
                  isCompleted={progress.bienestar}
                  onMarkComplete={() => markModuleCompleted('bienestar')}
                  onNextModule={() => handleNextFrom('bienestar')}
                />
              )}

              {activeModule === 'evaluacion' && (
                <FinalEvaluationModule
                  profile={profile}
                  isCompleted={progress.evaluacion}
                  onMarkComplete={() => markModuleCompleted('evaluacion')}
                  onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
                />
              )}
            </main>
          </>
        )}

        {/* Clean Institutional Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SenaLogo variant="badge" size="sm" className="w-6 h-6" />
              <span className="text-slate-700 dark:text-slate-300">
                Servicio Nacional de Aprendizaje SENA · República de Colombia
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-300">
              <button
                onClick={() => setIsAdminPortalOpen(true)}
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-slate-500"
                title="Acceso exclusivo para instructores y coordinadores"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Portal Instructor</span>
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => setIsGlossaryOpen(true)}
                className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Glosario Institucional
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => setIsAssistantOpen(true)}
                className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Preguntas Frecuentes
              </button>
              <span aria-hidden="true">·</span>
              <a
                href="https://www.sena.edu.co"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Portal Oficial SENA
              </a>
            </div>
          </div>
        </footer>

        {/* Interactive Modals */}
        {isProfileOpen && (
          <ApprenticeProfileModal
            profile={profile}
            onSave={setProfile}
            onClose={() => setIsProfileOpen(false)}
          />
        )}

        {isGlossaryOpen && (
          <GlossaryModal onClose={() => setIsGlossaryOpen(false)} />
        )}

        {isAssistantOpen && (
          <SenaAssistantModal onClose={() => setIsAssistantOpen(false)} />
        )}

        {isAdminPortalOpen && (
          <AdminPortalModal onClose={() => setIsAdminPortalOpen(false)} />
        )}
      </div>
    </>
  );
}
