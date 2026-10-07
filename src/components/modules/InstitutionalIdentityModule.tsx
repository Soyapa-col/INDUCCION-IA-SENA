import React, { useState, useEffect } from 'react';
import {
  SENA_HISTORY,
  SENA_MISSION_VISION,
  SENA_SYMBOLS,
  SENA_VALUES
} from '../../data/senaData';
import { anthemEngine } from '../../utils/senaAudio';
import {
  Shield,
  Music,
  Play,
  Square,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building,
  Target,
  Eye,
  ArrowRight
} from 'lucide-react';
import { SenaLogo } from '../SenaLogo';
import { HudFrame } from '../HudFrame';
import senaCrestImg from '../../assets/images/sena_symbol_crest_1791319425343.jpg';

interface Props {
  onMarkComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const InstitutionalIdentityModule: React.FC<Props> = ({
  onMarkComplete,
  isCompleted,
  onNextModule
}) => {
  const [activeSymbolTab, setActiveSymbolTab] = useState<'escudo' | 'bandera' | 'logosimbolo' | 'himno'>('escudo');
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);

  useEffect(() => {
    return () => {
      anthemEngine.stop();
    };
  }, []);

  const toggleAnthem = () => {
    if (isPlayingAnthem) {
      anthemEngine.stop();
      setIsPlayingAnthem(false);
    } else {
      setIsPlayingAnthem(true);
      anthemEngine.start(
        (stepIndex) => {
          setActiveVerseIndex(stepIndex);
        },
        () => {
          setIsPlayingAnthem(false);
        }
      );
    }
  };

  const currentSymbol = SENA_SYMBOLS.find((s) => s.id === activeSymbolTab) || SENA_SYMBOLS[0];

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 transition-colors">
        <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          Módulo 01 · Inducción Institucional
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Identidad, Símbolos y Valores Institucionales
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          El Servicio Nacional de Aprendizaje (SENA) es la institución más querida por los colombianos. Conoce su historia de más de seis décadas, el significado profundo de sus insignias patrias y el Código de Integridad que rige a nuestra comunidad.
        </p>
      </div>

      {/* Section 1: Interactive Symbols Explorer */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#39A900]" />
              01. Los Cuatro Símbolos Oficiales del SENA
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Explora cada insignia para comprender el tributo al trabajo, la técnica y la paz de Colombia.
            </p>
          </div>

          {/* Segmented Switcher for Symbols */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setActiveSymbolTab('escudo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeSymbolTab === 'escudo'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              El Escudo
            </button>
            <button
              onClick={() => setActiveSymbolTab('bandera')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeSymbolTab === 'bandera'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              La Bandera
            </button>
            <button
              onClick={() => setActiveSymbolTab('logosimbolo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeSymbolTab === 'logosimbolo'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Logo-Símbolo
            </button>
            <button
              onClick={() => setActiveSymbolTab('himno')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeSymbolTab === 'himno'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              El Himno
            </button>
          </div>
        </div>

        {/* Dynamic Display of Selected Symbol inside Futuristic HUD Frame */}
        <HudFrame
          headerTitle={`VISOR HUD · ${currentSymbol.name.toUpperCase()}`}
          systemCode={`SENA.SIMBOLO_0${activeSymbolTab === 'escudo' ? '1' : activeSymbolTab === 'bandera' ? '2' : activeSymbolTab === 'logosimbolo' ? '3' : '4'}`}
          statusBadge="PATRIMONIO NACIONAL"
          variant="dual"
          showHatches={true}
        >
          <div className="p-6 lg:p-8">
          {activeSymbolTab === 'escudo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 rounded-xl">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-emerald-500/20 shadow-md">
                  <img
                    src={senaCrestImg}
                    alt="Escudo Institucional SENA"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-4 text-xs font-bold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                  Escudo del SENA
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-400">
                  Los Tres Sectores de la Economía
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  {currentSymbol.name}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentSymbol.description}
                </p>

                <div className="space-y-3 pt-2">
                  {currentSymbol.details?.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 dark:bg-slate-800/70 hover:bg-emerald-50/50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between">
                        <span>{detail.part}</span>
                        <span className="text-[11px] text-[#39A900] dark:text-[#4ADE80] font-mono">
                          {idx === 0 ? 'Agro' : idx === 1 ? 'Industria' : 'Servicios'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {detail.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSymbolTab === 'bandera' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 rounded-xl">
                {/* Visual Flag Representation with authentic SENA logo */}
                <div className="w-56 h-36 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 shadow-md rounded-md flex items-center justify-center relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-[#39A900] flex items-center justify-center text-white p-3 shadow-sm">
                    <SenaLogo className="w-10 h-10 text-white" />
                  </div>
                </div>
                <span className="mt-4 text-xs font-bold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                  Pabellón Institucional
                </span>
                <span className="text-[11px] text-slate-400">
                  Blanco de Paz · Verde de Esperanza
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  La Bandera Oficial del SENA
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  La bandera institucional se iza solemnemente en todos los centros de formación y eventos académicos a lo largo del territorio nacional junto al pabellón de Colombia.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/70 rounded-xl">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                      El Paño Blanco
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Simboliza la tranquilidad, la paz duradera, la transparencia institucional y la libertad que la educación y el trabajo otorgan a la juventud.
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 rounded-xl">
                    <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 block mb-1">
                      El Escudo Verde Central
                    </span>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                      El verde SENA (#39A900) encarna la esperanza, la perseverancia de los aprendices y la riqueza de los recursos naturales y humanos de nuestra patria.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSymbolTab === 'logosimbolo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 rounded-xl">
                {/* Authentic official SENA logo vector provided */}
                <div className="w-48 h-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center p-6 shadow-md">
                  <SenaLogo className="w-36 h-36 text-[#39A900] dark:text-[#4ADE80]" />
                </div>
                <span className="mt-4 text-xs font-bold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
                  Logo-Símbolo Oficial Actual
                </span>
                <span className="text-[11px] text-slate-400">
                  El Aprendiz en Marcha hacia el Futuro
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  El Logo-Símbolo: El Ser Humano en Evolución
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Diseñado con trazos geométricos contemporáneos, representa al aprendiz como protagonista indiscutible del proceso formativo, caminando decididamente por el sendero del conocimiento y la superación técnica.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 rounded-xl">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Paso Firme y Ascendente
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Significa el avance continuo de los colombianos mediante el esfuerzo, la disciplina y la capacitación constante.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 rounded-xl">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Brazos Abiertos al Saber
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Expresa la actitud generosa de recibir el conocimiento científico y técnico para devolverlo en soluciones que engrandecen a la sociedad.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSymbolTab === 'himno' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Music className="w-5 h-5 text-[#39A900]" />
                    El Himno del SENA
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {SENA_SYMBOLS[3].author}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleAnthem}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer ${
                      isPlayingAnthem
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-[#39A900] hover:bg-[#329600] text-white'
                    }`}
                  >
                    {isPlayingAnthem ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Detener Melodía</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Escuchar Melodía Institucional</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Lyrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SENA_SYMBOLS[3].lyrics?.map((lyric, idx) => {
                  const isHighlighted = isPlayingAnthem && activeVerseIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-xl border transition-all ${
                        isHighlighted
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-300 dark:ring-emerald-600 shadow-sm'
                          : idx === 0
                          ? 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                          : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80'
                      }`}
                    >
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block mb-2">
                        {lyric.stanza}
                      </span>
                      <div className="space-y-1 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
                        {lyric.lines.map((line, lIdx) => (
                          <p key={lIdx}>{line}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs text-slate-500 dark:text-slate-400 text-center">
                El himno es entonado de pie y con la mano en el corazón en las ceremonias de inducción y clausura de aprendices.
              </div>
            </div>
          )}
          </div>
        </HudFrame>
      </section>

      {/* Section 2: History & Founder Timeline */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#39A900]" />
            02. Reseña Histórica y Fundación
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Fundado el {SENA_HISTORY.foundationDate} por {SENA_HISTORY.founder} mediante el {SENA_HISTORY.legalBasis}.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xs">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            {SENA_HISTORY.purpose}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SENA_HISTORY.milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 rounded-xl relative hover:border-emerald-300 dark:hover:border-emerald-500 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                  {m.year}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {m.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#39A900] dark:text-[#4ADE80] flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Misión Institucional
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {SENA_MISSION_VISION.mision}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            Eje central del desarrollo humano y productivo de Colombia
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Visión Institucional
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {SENA_MISSION_VISION.vision}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            Entidad referente de clase mundial en educación técnica
          </div>
        </div>
      </section>

      {/* Section 4: Institutional Values (Código de Integridad) */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#39A900]" />
            03. Valores del Código de Integridad SENA
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Pilares éticos innegociables que orientan la conducta de aprendices, instructores y funcionarios.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SENA_VALUES.map((val, idx) => (
            <div
              key={idx}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  0{idx + 1}.
                </span>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {val.name}
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Completion & Next Action */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>¿Apropiaste la Identidad Institucional?</span>
          </h4>
          <p className="text-xs text-slate-300 mt-1">
            Marca este módulo como completado para desbloquear la insignia de Identidad y continuar al Modelo Pedagógico.
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
            <span>{isCompleted ? 'Continuar a Modelo FPI' : 'Completar y Continuar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
