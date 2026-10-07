import React from 'react';
import { ModuleId, ModuleProgress } from '../types/induction';
import { Shield, Compass, BookOpenCheck, HeartHandshake, Award, Sparkles } from 'lucide-react';

interface ModuleNavProps {
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  progress: ModuleProgress;
}

export const ModuleNav: React.FC<ModuleNavProps> = ({
  activeModule,
  onSelectModule,
  progress
}) => {
  const tabs = [
    {
      id: 'identidad' as ModuleId,
      number: '01',
      title: 'Identidad & Símbolos',
      icon: Shield,
      isDone: progress.identidad
    },
    {
      id: 'modelo' as ModuleId,
      number: '02',
      title: 'Modelo Pedagógico',
      icon: Compass,
      isDone: progress.modelo
    },
    {
      id: 'reglamento' as ModuleId,
      number: '03',
      title: 'Reglamento & Casos',
      icon: BookOpenCheck,
      isDone: progress.reglamento
    },
    {
      id: 'bienestar' as ModuleId,
      number: '04',
      title: 'Bienestar & Oportunidades',
      icon: HeartHandshake,
      isDone: progress.bienestar
    },
    {
      id: 'evaluacion' as ModuleId,
      number: '05',
      title: 'Evaluación & Ranking',
      icon: Award,
      isDone: progress.evaluacion
    },
    {
      id: 'gemini-workspace' as ModuleId,
      number: 'IA',
      title: 'Gemini · Reglamento JSON',
      icon: Sparkles,
      isDone: true
    }
  ];

  return (
    <div className="bg-white/95 dark:bg-[#07101b]/95 border-b border-slate-200 dark:border-cyan-500/20 sticky top-16 z-30 shadow-xs transition-colors backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {tabs.map((tab) => {
            const isActive = activeModule === tab.id;
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectModule(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-[#39A900] text-white shadow-[0_0_14px_rgba(6,182,212,0.45)] border border-cyan-300/50'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-cyan-950/30 hover:border-cyan-500/30 border border-transparent'
                }`}
              >
                <span className={`font-mono text-[10px] ${isActive ? 'text-cyan-100 font-bold' : 'text-cyan-600 dark:text-cyan-400/70'}`}>
                  [{tab.number}]
                </span>
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{tab.title}</span>
                {tab.isDone && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-white shadow-[0_0_6px_#ffffff]' : 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]'
                    }`}
                    title="Módulo completado"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
