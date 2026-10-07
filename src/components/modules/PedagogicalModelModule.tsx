import React, { useState } from 'react';
import { PEDAGOGICAL_MODEL } from '../../data/senaData';
import {
  Compass,
  Layers,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileCheck2,
  Clock,
  Award
} from 'lucide-react';
import apprenticesLabImg from '../../assets/images/sena_apprentices_lab_1791319435456.jpg';

interface Props {
  onMarkComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const PedagogicalModelModule: React.FC<Props> = ({
  onMarkComplete,
  isCompleted,
  onNextModule
}) => {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [matcherAnswer1, setMatcherAnswer1] = useState<string>('empresa');
  const [matcherAnswer2, setMatcherAnswer2] = useState<string>('no_empleo');
  const [matcherResult, setMatcherResult] = useState<string | null>(null);

  const calculateMatcher = () => {
    if (matcherAnswer1 === 'emprender') {
      setMatcherResult('proyecto_productivo');
    } else if (matcherAnswer2 === 'empleo_afin') {
      setMatcherResult('vinculo_laboral');
    } else if (matcherAnswer1 === 'comunidad') {
      setMatcherResult('pasantia');
    } else if (matcherAnswer1 === 'monitor') {
      setMatcherResult('monitoria');
    } else {
      setMatcherResult('contrato_aprendizaje');
    }
  };

  const recommendedAlternative = PEDAGOGICAL_MODEL.productiveAlternatives.find(
    (a) => a.id === matcherResult
  );

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 transition-colors">
        <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          Módulo 02 · Pedagogía Institucional
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Modelo Pedagógico y Formación Profesional Integral (FPI)
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          En el SENA no memorizas para un examen tradicional; aprendes haciendo mediante proyectos reales que impactan la productividad de Colombia. Conoce la articulación entre la Etapa Lectiva y la Etapa Productiva.
        </p>
      </div>

      {/* Hero Spotlight: FPI Concept */}
      <div className="relative overflow-hidden bg-slate-900 text-white rounded-2xl border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
            <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
              El Núcleo Educativo
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {PEDAGOGICAL_MODEL.concept}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {PEDAGOGICAL_MODEL.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {PEDAGOGICAL_MODEL.dimensions.map((dim, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-800/80 border border-slate-700/60 rounded-xl"
                >
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Dimensión 0{idx + 1}
                  </span>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {dim.title}
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-normal">
                    {dim.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 h-64 lg:h-full relative min-h-[220px]">
            <img
              src={apprenticesLabImg}
              alt="Aprendices en laboratorio SENA"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Section 1: The 4 Phases of Project-Based Learning */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#39A900]" />
            01. Estrategia de Formación por Proyectos
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A lo largo de tu programa desarrollarás un proyecto formativo estructurado en cuatro fases secuenciales.
          </p>
        </div>

        {/* Phase selector tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PEDAGOGICAL_MODEL.projectPhases.map((phase, idx) => {
            const isSelected = selectedPhase === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedPhase(idx)}
                className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 ring-2 ring-emerald-200 dark:ring-emerald-700 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className={`text-xs font-mono font-bold block ${isSelected ? 'text-[#39A900] dark:text-[#4ADE80]' : 'text-slate-400'}`}>
                  Fase {phase.number}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block mt-1">
                  {phase.name.replace('Fase de ', '')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Detail Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row items-start justify-between gap-4 transition-colors">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#39A900]/10 dark:bg-[#39A900]/20 text-[#007832] dark:text-[#4ADE80] font-mono text-xs font-bold rounded">
                Fase {PEDAGOGICAL_MODEL.projectPhases[selectedPhase].number}
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {PEDAGOGICAL_MODEL.projectPhases[selectedPhase].name}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {PEDAGOGICAL_MODEL.projectPhases[selectedPhase].desc}
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#39A900] dark:text-[#4ADE80]" />
              <span>
                Se evidencia mediante instrumentos de evaluación y entregables concertados en la Guía de Aprendizaje.
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-center sm:text-right shrink-0">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Juicio Evaluativo
            </span>
            <span className="text-base font-bold text-[#39A900] dark:text-[#4ADE80] font-mono block mt-0.5">
              A (Aprobado)
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-400">
              o D (Deficiente / Plan de mejora)
            </span>
          </div>
        </div>
      </section>

      {/* Section 2: Stages Comparison (Etapa Lectiva vs. Etapa Productiva) */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#39A900]" />
            02. Las Dos Grandes Etapas de tu Formación
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Comprende los tiempos y responsabilidades en cada momento de tu formación técnica o tecnológica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PEDAGOGICAL_MODEL.stages.map((stg, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {idx === 0 ? 'Fase Inicial en Centro' : 'Fase Final en Entorno Real'}
                  </span>
                  <span className="text-xs text-slate-400">
                    {idx === 0 ? 'Ambientes & LMS Zajuna' : 'Empresas & Proyectos'}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-4">
                  {stg.name}
                </h4>
                <div className="text-xs font-semibold text-[#39A900] dark:text-[#4ADE80] mt-0.5">
                  {stg.subtitle}
                </div>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {stg.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 -mx-6 -mb-6 p-4 rounded-b-2xl">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Mecanismo de Evaluación:
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {stg.evaluation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Interactive Productive Stage Matcher */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#39A900]" />
              03. Orientador Interactivo de Etapa Productiva
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Existen 5 modalidades para certificar tu etapa productiva. Responde estas preguntas para descubrir cuál se adapta a tu perfil.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xs space-y-6 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Question 1 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                1. ¿Cuál es tu meta u objetivo principal al graduarte?
              </label>
              <div className="space-y-2">
                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-xs text-slate-800 dark:text-slate-200">
                  <input
                    type="radio"
                    name="matcher1"
                    value="empresa"
                    checked={matcherAnswer1 === 'empresa'}
                    onChange={(e) => setMatcherAnswer1(e.target.value)}
                    className="mt-0.5 text-[#39A900] focus:ring-[#39A900]"
                  />
                  <span>Vincularme a una empresa privada formal con apoyo de sostenimiento económico.</span>
                </label>
                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-xs text-slate-800 dark:text-slate-200">
                  <input
                    type="radio"
                    name="matcher1"
                    value="emprender"
                    checked={matcherAnswer1 === 'emprender'}
                    onChange={(e) => setMatcherAnswer1(e.target.value)}
                    className="mt-0.5 text-[#39A900] focus:ring-[#39A900]"
                  />
                  <span>Tengo una idea de negocio y quiero fundar mi propia empresa con capital semilla.</span>
                </label>
                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-xs text-slate-800 dark:text-slate-200">
                  <input
                    type="radio"
                    name="matcher1"
                    value="comunidad"
                    checked={matcherAnswer1 === 'comunidad'}
                    onChange={(e) => setMatcherAnswer1(e.target.value)}
                    className="mt-0.5 text-[#39A900] focus:ring-[#39A900]"
                  />
                  <span>Prefiero apoyar a una ONG, fundación, colegio o entidad pública comunitaria.</span>
                </label>
                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-xs text-slate-800 dark:text-slate-200">
                  <input
                    type="radio"
                    name="matcher1"
                    value="monitor"
                    checked={matcherAnswer1 === 'monitor'}
                    onChange={(e) => setMatcherAnswer1(e.target.value)}
                    className="mt-0.5 text-[#39A900] focus:ring-[#39A900]"
                  />
                  <span>Deseo ser monitor académico dentro de las instalaciones y talleres del SENA.</span>
                </label>
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white block">
                2. ¿Tienes un contrato laboral vigente actualmente?
              </label>
              <div className="space-y-2">
                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-xs text-slate-800 dark:text-slate-200">
                  <input
                    type="radio"
                    name="matcher2"
                    value="no_empleo"
                    checked={matcherAnswer2 === 'no_empleo'}
                    onChange={(e) => setMatcherAnswer2(e.target.value)}
                    className="mt-0.5 text-[#39A900] focus:ring-[#39A900]"
                  />
                  <span>No tengo empleo o mi trabajo actual no se relaciona con lo que estudio en el SENA.</span>
                </label>
                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-xs text-slate-800 dark:text-slate-200">
                  <input
                    type="radio"
                    name="matcher2"
                    value="empleo_afin"
                    checked={matcherAnswer2 === 'empleo_afin'}
                    onChange={(e) => setMatcherAnswer2(e.target.value)}
                    className="mt-0.5 text-[#39A900] focus:ring-[#39A900]"
                  />
                  <span>Sí, ya trabajo en una empresa y desempeño funciones afines a mi programa técnico.</span>
                </label>
              </div>

              <div className="pt-4">
                <button
                  onClick={calculateMatcher}
                  className="w-full py-2.5 bg-[#39A900] hover:bg-[#329600] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Consultar Modalidad Recomendada
                </button>
              </div>
            </div>
          </div>

          {/* Matcher Result Card */}
          {recommendedAlternative && (
            <div className="mt-6 p-5 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#007832] dark:text-[#4ADE80] uppercase tracking-wider">
                  Modalidad Sugerida para tu Perfil
                </span>
                <span className="text-xs bg-white dark:bg-slate-800 text-[#007832] dark:text-[#4ADE80] px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200 dark:border-slate-700">
                  {recommendedAlternative.tagline}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {recommendedAlternative.name}
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">Beneficios y condiciones: </strong>
                {recommendedAlternative.benefits}
              </p>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                <strong>¿Por qué te conviene? </strong> {recommendedAlternative.idealFor}
              </p>
            </div>
          )}

          {/* Catalog of all 5 alternatives */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-3">
              Las 5 Alternativas Reconocidas por el SENA:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PEDAGOGICAL_MODEL.productiveAlternatives.map((alt) => (
                <div
                  key={alt.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 rounded-lg text-xs"
                >
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {alt.name}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block mt-0.5">
                    {alt.tagline}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Completion & Next Action */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>¿Comprendiste el Modelo Pedagógico?</span>
          </h4>
          <p className="text-xs text-slate-300 mt-1">
            Marca como completado para avanzar al Módulo 03: Reglamento del Aprendiz y Simulador de Casos.
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
            <span>{isCompleted ? 'Continuar a Reglamento' : 'Completar y Continuar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
