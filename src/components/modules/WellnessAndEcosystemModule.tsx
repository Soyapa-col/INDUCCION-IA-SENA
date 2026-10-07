import React, { useState } from 'react';
import { WELLNESS_DIMENSIONS, ECOSYSTEM_SERVICES } from '../../data/senaData';
import {
  HeartHandshake,
  Rocket,
  Globe2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Laptop,
  GraduationCap,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface Props {
  onMarkComplete: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const WellnessAndEcosystemModule: React.FC<Props> = ({
  onMarkComplete,
  isCompleted,
  onNextModule
}) => {
  const [selectedDimension, setSelectedDimension] = useState(0);

  const digitalPlatforms = [
    {
      name: 'SENA SOFIA Plus',
      role: 'Portal Académico y Certificaciones',
      desc: 'Consulta de estado de matrícula, calificaciones trimestrales, inscripción a nuevos cursos y descarga de certificados académicos con firma digital.',
      url: 'https://oferta.senasofiaplus.edu.co'
    },
    {
      name: 'LMS Zajuna',
      role: 'Campus Virtual de Aprendizaje',
      desc: 'El entorno de formación digital donde interactúas con instructores, descargas guías de aprendizaje, participas en foros y cargas evidencias.',
      url: 'https://zajuna.sena.edu.co'
    },
    {
      name: 'Biblioteca Digital SENA',
      role: 'Sistema Nacional de Bibliotecas',
      desc: 'Acceso gratuito ilimitado a más de 50 bases de datos científicas mundiales (IEEE, ScienceDirect, ProQuest, libros electrónicos y normas técnicas ICONTEC).',
      url: 'https://biblioteca.sena.edu.co'
    },
    {
      name: 'Correo MiSENA (@misena.edu.co)',
      role: 'Canal Oficial de Comunicación',
      desc: 'Buzón institucional de correo electrónico con almacenamiento en la nube, herramientas colaborativas y canal para notificaciones formales de la institución.',
      url: 'https://correo.misena.edu.co'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 transition-colors">
        <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          Módulo 04 · Ecosistema Institucional
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bienestar al Aprendiz y Ecosistema de Oportunidades
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          El SENA no solo te capacita técnicamente: acompaña tu proyecto de vida mediante programas de salud, cultura, deportes, apoyos socioeconómicos y plataformas para emprender y emplearte.
        </p>
      </div>

      {/* Section 1: Bienestar al Aprendiz Dimensions */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#39A900]" />
            01. Plan Nacional de Bienestar al Aprendiz
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dimensiones integrales para enriquecer tu bienestar físico, emocional, social y cultural durante toda tu etapa formativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WELLNESS_DIMENSIONS.map((dim, idx) => (
            <div
              key={idx}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-300 dark:hover:border-emerald-500 transition-colors shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  Dimensión 0{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {dim.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {dim.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Innovation & Employment Ecosystem */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-[#39A900]" />
            02. Ecosistema de Empleo, Innovación y Emprendimiento
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Servicios gratuitos a tu alcance desde el primer día de tu matrícula como aprendiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ECOSYSTEM_SERVICES.map((serv, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {serv.name}
                  </h4>
                  <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
                    {serv.badge}
                  </span>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {serv.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Servicio 100% Gratuito y Público
                </span>
                <span className="text-xs font-semibold text-[#007832] dark:text-[#4ADE80] flex items-center gap-1">
                  <span>Acceso Institucional</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Essential Digital Platforms */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Laptop className="w-5 h-5 text-[#39A900]" />
            03. Tus Cuatro Plataformas Digitales Obligatorias
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Herramientas que usarás permanentemente para gestionar tu avance formativo y académico.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {digitalPlatforms.map((plat, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 hover:bg-white dark:hover:bg-slate-800/80 hover:border-emerald-300 dark:hover:border-emerald-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {plat.name}
                </h4>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">
                  {plat.role}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {plat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Completion & Next Action */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>¿Listo para la Certificación Final?</span>
          </h4>
          <p className="text-xs text-slate-300 mt-1">
            Has completado los cuatro módulos temáticos. Ahora presenta el Desafío de Inducción para generar tu Certificado Digital.
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
            <span>{isCompleted ? 'Ir al Desafío Final' : 'Completar y Desbloquear Evaluación'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
