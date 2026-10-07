import React, { useState } from 'react';
import { REGULATIONS_SUMMARY, DILEMMA_CASES } from '../../data/senaData';
import { ACUERDO_009_2024_JSON } from '../../data/acuerdo009Data';
import {
  BookOpenCheck,
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Gavel,
  FileText,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Scale,
  FileCode2,
  Download
} from 'lucide-react';
import { HudFrame } from '../HudFrame';

interface Props {
  onMarkComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
  onOpenGeminiWorkspace?: () => void;
}

export const ApprenticeRegulationsModule: React.FC<Props> = ({
  onMarkComplete,
  isCompleted,
  onNextModule,
  onOpenGeminiWorkspace
}) => {
  const [activeTab, setActiveTab] = useState<'novedades' | 'derechos' | 'deberes' | 'tramites' | 'faltas' | 'medidas'>('novedades');
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedCaseAnswers, setSelectedCaseAnswers] = useState<{ [caseId: string]: number }>({});
  const [showCaseFeedback, setShowCaseFeedback] = useState<{ [caseId: string]: boolean }>({});

  const handleDownloadJsonDirect = () => {
    const jsonString = JSON.stringify(ACUERDO_009_2024_JSON, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'acuerdo_009_2024_reglamento_aprendiz.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentCase = DILEMMA_CASES[caseIndex];
  const currentAnswer = selectedCaseAnswers[currentCase.id];
  const isFeedbackVisible = showCaseFeedback[currentCase.id];

  const handleSelectCaseAnswer = (idx: number) => {
    setSelectedCaseAnswers((prev) => ({ ...prev, [currentCase.id]: idx }));
    setShowCaseFeedback((prev) => ({ ...prev, [currentCase.id]: true }));
  };

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 transition-colors">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <span>Módulo 03 · Marco Normativo Actualizado</span>
          <span aria-hidden="true">·</span>
          <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-mono">Acuerdo 009</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Reglamento del Aprendiz SENA (Acuerdo 009)
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          El <strong>Acuerdo 009</strong> es el estatuto reglamentario oficial actualizado por el Consejo Directivo Nacional del SENA. Fortalece la ciberconvivencia en ambientes virtuales, garantiza el enfoque de derechos humanos e inclusión, clarifica los trámites formativos y robustece el debido proceso.
        </p>

        {/* Gemini AI JSON Analysis Callout Card */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border border-emerald-500/30 dark:border-emerald-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-[#39A900] to-emerald-400 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Análisis Gemini: Reglamento Acuerdo 009 a JSON
                </span>
                <span className="text-[10px] bg-emerald-600 text-white font-mono font-bold px-2 py-0.2 rounded-full">
                  JSON Ready
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Se ha digitalizado y estructurado el 100% del documento oficial en un único archivo JSON estandarizado con considerandos, articulado, deberes, derechos, causales de deserción y medidas sancionatorias.
              </p>
              <div className="flex flex-wrap gap-2 mt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/80 dark:border-slate-700">8 Derechos Clave</span>
                <span className="bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/80 dark:border-slate-700">Leyes 2394 & 2365 de 2024</span>
                <span className="bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/80 dark:border-slate-700">Régimen Sancionatorio</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
            <button
              onClick={handleDownloadJsonDirect}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#39A900]" />
              <span>Descargar .JSON</span>
            </button>

            {onOpenGeminiWorkspace && (
              <button
                onClick={onOpenGeminiWorkspace}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white shadow-xs transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Abrir en Gemini Workspace</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Section 1: Rights, Duties & Normative System */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5 text-[#39A900]" />
              01. Estatuto Actualizado del Aprendiz
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {REGULATIONS_SUMMARY.versionNotice}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('novedades')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'novedades'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Novedades Acuerdo 009
            </button>
            <button
              onClick={() => setActiveTab('derechos')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'derechos'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Derechos ({REGULATIONS_SUMMARY.rights.length})
            </button>
            <button
              onClick={() => setActiveTab('deberes')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'deberes'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Deberes & Redes
            </button>
            <button
              onClick={() => setActiveTab('tramites')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'tramites'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Trámites Académicos
            </button>
            <button
              onClick={() => setActiveTab('faltas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'faltas'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tipos de Faltas
            </button>
            <button
              onClick={() => setActiveTab('medidas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'medidas'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Medidas Formativas
            </button>
          </div>
        </div>

        {/* Tab content area */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xs transition-colors">
          {activeTab === 'novedades' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Principales Transformaciones y Avances del Acuerdo 009
                </span>
                <span className="text-xs text-[#39A900] dark:text-[#4ADE80] font-mono">
                  SENA Digital e Incluyente
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REGULATIONS_SUMMARY.novelties?.map((nov, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-emerald-50/40 dark:bg-slate-800/80 border border-emerald-200/70 dark:border-emerald-800/50 rounded-xl space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-xs sm:text-sm">
                      <Sparkles className="w-4 h-4 text-[#39A900] dark:text-[#4ADE80]" />
                      <span>{nov.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {nov.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg text-xs text-slate-600 dark:text-slate-300">
                <strong>Nota histórica:</strong> El Acuerdo 009 reemplaza integralmente al anterior Acuerdo 007 de 2012, armonizando el reglamento con los nuevos marcos constitucionales de no discriminación, formación virtual y tecnología 4.0.
              </div>
            </div>
          )}

          {activeTab === 'derechos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Tus Derechos Garantizados bajo el Acuerdo 009
                </span>
                <span className="text-xs text-[#39A900] dark:text-[#4ADE80] font-mono">
                  Capítulo de Derechos del Aprendiz
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {REGULATIONS_SUMMARY.rights.map((right, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-emerald-50/40 dark:bg-slate-800/80 border border-emerald-100 dark:border-emerald-900/40 rounded-xl flex items-start gap-3"
                  >
                    <span className="text-xs font-mono font-bold text-[#007832] dark:text-[#4ADE80] mt-0.5 shrink-0">
                      #{idx + 1}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {right}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'deberes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Tus Deberes, Convivencia y Ética Digital
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                  Capítulo de Deberes y Prohibiciones
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {REGULATIONS_SUMMARY.duties.map((duty, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 rounded-xl flex items-start gap-3"
                  >
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 mt-0.5 shrink-0">
                      #{idx + 1}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {duty}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tramites' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Trámites Académicos y Administrativos del Aprendiz
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                  Novedades del Acuerdo 009
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {REGULATIONS_SUMMARY.academicProcedures?.map((proc, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 rounded-xl space-y-1.5"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {proc.name}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {proc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faltas' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REGULATIONS_SUMMARY.faultTypes.map((ft, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 rounded-xl space-y-2"
                  >
                    <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                      Clasificación 0{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {ft.type}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {ft.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2">
                  Criterios de Calificación de Gravedad (Acuerdo 009):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {REGULATIONS_SUMMARY.gravityLevels.map((gl, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 rounded-lg text-xs"
                    >
                      <span className="font-bold text-slate-900 dark:text-white block mb-1">
                        Falta {gl.level}
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                        {gl.criteria}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medidas' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Formativas */}
                <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Medidas Formativas (Pedagógicas)
                    </span>
                  </div>
                  <div className="space-y-2">
                    {REGULATIONS_SUMMARY.measures.formativas.map((m, idx) => (
                      <div key={idx} className="p-2.5 bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 rounded-lg text-xs">
                        <strong className="text-slate-900 dark:text-white block">{m.name}</strong>
                        <span className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5 block">{m.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sancionatorias */}
                <div className="p-4 bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300">
                    <Gavel className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Medidas Sancionatorias (Comité de Evaluación)
                    </span>
                  </div>
                  <div className="space-y-2">
                    {REGULATIONS_SUMMARY.measures.sancionatorias.map((m, idx) => (
                      <div key={idx} className="p-2.5 bg-white dark:bg-slate-800 border border-rose-100 dark:border-slate-700 rounded-lg text-xs">
                        <strong className="text-slate-900 dark:text-white block">{m.name}</strong>
                        <span className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5 block">{m.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  El Acuerdo 009 garantiza el debido proceso, la presunción de inocencia, el término perentorio de descargos y el recurso de reposición ante el Subdirector de Centro frente a actos sancionatorios.
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Interactive Case Simulator ("Dilemas del Aprendiz") */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#39A900]" />
            02. Simulador de Casos: Dilemas Reales del Aprendiz
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Aplica el Acuerdo 009 en situaciones cotidianas de formación presencial y virtual para afianzar el debido proceso.
          </p>
        </div>

        {/* Case selector stepper */}
        <div className="flex items-center gap-2">
          {DILEMMA_CASES.map((dCase, idx) => (
            <button
              key={dCase.id}
              onClick={() => setCaseIndex(idx)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                caseIndex === idx
                  ? 'bg-slate-900 dark:bg-[#39A900] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Caso 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Case Card inside Sci-Fi HUD Frame */}
        <HudFrame
          headerTitle={`SIMULADOR DE DILEMAS · CASO 0${caseIndex + 1}`}
          systemCode="SENA.ACUERDO_009"
          statusBadge="DEBIDO PROCESO"
          variant="dual"
          showHatches={true}
        >
          <div className="p-6 lg:p-8 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <span>{currentCase.character}</span>
              <span aria-hidden="true">·</span>
              <span>{currentCase.role}</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              {currentCase.title}
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-700/60 leading-relaxed">
              {currentCase.situation}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              ¿Cuál es la conducta institucional y legal correcta según el Acuerdo 009?
            </span>

            {currentCase.options.map((opt, optIdx) => {
              const isSelected = currentAnswer === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectCaseAnswer(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-200 dark:ring-emerald-700'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-600 ring-2 ring-rose-200 dark:ring-rose-700'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5 text-slate-700 dark:text-slate-300">
                    {optIdx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback Display */}
          {isFeedbackVisible && currentAnswer !== undefined && (
            <div
              className={`p-4 rounded-xl border ${
                currentCase.options[currentAnswer].isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700'
              }`}
            >
              <div className="flex items-center gap-2">
                {currentCase.options[currentAnswer].isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase">
                      Decisión Acertada
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    <span className="text-xs font-bold text-rose-900 dark:text-rose-200 uppercase">
                      Decisión Incorrecta
                    </span>
                  </>
                )}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {currentCase.options[currentAnswer].feedback}
              </p>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 font-medium border-t border-slate-200/60 dark:border-slate-700/60 pt-2">
                <strong>Base Normativa (Acuerdo 009):</strong> {currentCase.options[currentAnswer].sanctionOrRule}
              </div>
            </div>
          )}
          </div>
        </HudFrame>
      </section>

      {/* Completion & Next Action */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>¿Conoces tus deberes y el Acuerdo 009 actualizado?</span>
          </h4>
          <p className="text-xs text-slate-300 mt-1">
            Marca este módulo como completado para avanzar al Módulo 04: Bienestar al Aprendiz y Ecosistema SENA.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onMarkComplete();
              onNextModule();
            }}
            className="px-5 py-2.5 bg-[#39A900] hover:bg-[#329600] text-white text-xs font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
          >
            <span>{isCompleted ? 'Continuar a Bienestar' : 'Completar y Continuar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
