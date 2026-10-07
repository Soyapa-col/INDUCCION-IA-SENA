import React from 'react';
import { ApprenticeProfile, ModuleId, ModuleProgress } from '../types/induction';
import { Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { HudFrame } from './HudFrame';
import campusHeroImg from '../assets/images/sena_campus_hero_1791319410435.jpg';

interface HeroBannerProps {
  profile: ApprenticeProfile;
  progress: ModuleProgress;
  onSelectModule: (id: ModuleId) => void;
  onOpenProfile: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  profile,
  progress,
  onSelectModule,
  onOpenProfile
}) => {
  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 5) * 100);

  return (
    <div className="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={campusHeroImg}
          alt="Campus de Formación SENA"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main textual intro */}
          <div className="lg:col-span-8 space-y-4">
            {/* Clean metadata badge with official SENA logo (+40% size) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="inline-flex items-center gap-2 font-semibold text-white bg-[#39A900] px-3 py-1.5 rounded-lg shadow-sm">
                <SenaLogo className="w-[23px] h-[23px] text-white shrink-0" />
                <span className="text-xs sm:text-sm font-bold">Servicio Nacional de Aprendizaje SENA</span>
              </span>
              <span aria-hidden="true" className="text-emerald-500">·</span>
              <span>Regional {profile.regional}</span>
              <span aria-hidden="true" className="text-emerald-500">·</span>
              <span className="font-mono">Ficha #{profile.recordNumber}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              Bienvenido a tu Inducción Institucional SENA
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Hola, <span className="font-semibold text-white">{profile.fullName}</span>. Has iniciado tu camino en el programa <span className="font-medium text-emerald-300">{profile.trainingProgram}</span>. Descubre los valores, símbolos, el modelo pedagógico y las normas de convivencia que forjan a los trabajadores y líderes de Colombia.
            </p>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectModule('identidad')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#39A900] hover:bg-[#329600] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition-all whitespace-nowrap cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Comenzar Recorrido</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenProfile}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white text-xs sm:text-sm font-medium rounded-lg border border-slate-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Editar Ficha & Datos</span>
              </button>

              {progress.evaluacion ? (
                <button
                  onClick={() => onSelectModule('evaluacion')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Ver Certificado Obtenido</span>
                </button>
              ) : null}
            </div>
          </div>

          {/* Progress & Quick Milestone Card inside futuristic Sci-Fi HUD Frame */}
          <div className="lg:col-span-4">
            <HudFrame
              headerTitle="RUTA DE FORMACIÓN"
              systemCode="SENA.SYS_4.0"
              statusBadge={`${progressPercent}% AVANCE`}
              variant="dual"
              showHatches={true}
            >
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-cyan-300 tracking-wider uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#39A900] rounded-full inline-block" />
                    Estado del Aprendiz
                  </span>
                  <span className="text-sm font-mono font-bold text-[#39A900] dark:text-[#4ADE80] tabular-nums">
                    {progressPercent}% Completado
                  </span>
                </div>

                {/* Cyber Progress bar with cyan-green glow */}
                <div className="w-full bg-slate-200 dark:bg-slate-950/80 h-3 rounded-md overflow-hidden p-0.5 border border-cyan-500/30">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-[#39A900] h-full rounded-xs transition-all duration-500 ease-out shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${progress.identidad ? 'text-cyan-500 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-600'}`} />
                      <span>Identidad & Símbolos</span>
                    </span>
                    <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400">{progress.identidad ? '[OK]' : '[PENDIENTE]'}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${progress.modelo ? 'text-cyan-500 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-600'}`} />
                      <span>Modelo Pedagógico FPI</span>
                    </span>
                    <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400">{progress.modelo ? '[OK]' : '[PENDIENTE]'}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${progress.reglamento ? 'text-cyan-500 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-600'}`} />
                      <span>Reglamento (Acuerdo 009)</span>
                    </span>
                    <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400">{progress.reglamento ? '[OK]' : '[PENDIENTE]'}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${progress.bienestar ? 'text-cyan-500 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-600'}`} />
                      <span>Bienestar & Ecosistema</span>
                    </span>
                    <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400">{progress.bienestar ? '[OK]' : '[PENDIENTE]'}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${progress.evaluacion ? 'text-[#39A900] dark:text-[#4ADE80]' : 'text-slate-400 dark:text-slate-600'}`} />
                      <span>Evaluación & Certificado</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#39A900] dark:text-[#4ADE80] font-bold">{progress.evaluacion ? '[CERTIFICADO]' : '[REQUISITO]'}</span>
                  </div>
                </div>
              </div>
            </HudFrame>
          </div>
        </div>
      </div>
    </div>
  );
};
