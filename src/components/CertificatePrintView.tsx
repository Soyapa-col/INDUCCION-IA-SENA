import React from 'react';
import { ApprenticeProfile } from '../types/induction';
import { Printer, X, ShieldCheck } from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import senaCrestImg from '../assets/images/sena_symbol_crest_1791319425343.jpg';

interface Props {
  profile: ApprenticeProfile;
  score: number;
  onClose: () => void;
}

export const CertificatePrintView: React.FC<Props> = ({
  profile,
  score,
  onClose
}) => {
  const currentDate = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const certCode = `SENA-IND-${profile.recordNumber}-${Math.abs(
    profile.fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1000)
  )}-${new Date().getFullYear()}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              Certificado Digital de Inducción Institucional SENA
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-[#39A900] hover:bg-[#329600] text-white rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer"
              title="Cerrar vista"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-white flex flex-col justify-between border-8 border-double border-emerald-800/30 m-4 rounded-xl relative">
          {/* Subtle Watermark or Corner Emblems */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-emerald-700" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-emerald-700" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-emerald-700" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-emerald-700" />

          {/* Institutional Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-4">
              <img
                src={senaCrestImg}
                alt="Escudo SENA"
                referrerPolicy="no-referrer"
                className="w-16 h-16 object-cover rounded-full border border-slate-200"
              />
              <SenaLogo variant="badge" size="lg" className="w-16 h-16 rounded-full" />
            </div>
            <h4 className="text-xs font-extrabold tracking-widest text-slate-500 uppercase">
              República de Colombia · Ministerio del Trabajo
            </h4>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-950 uppercase tracking-tight">
              Servicio Nacional de Aprendizaje — SENA
            </h2>
            <div className="text-xs font-semibold text-emerald-700 tracking-wider uppercase">
              Dirección General · Regional {profile.regional}
            </div>
          </div>

          {/* Certificate Body Text */}
          <div className="text-center my-8 space-y-4">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
              Hace constar que el (la) aprendiz:
            </p>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 underline decoration-[#39A900] decoration-2 underline-offset-8">
              {profile.fullName.toUpperCase()}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600">
              Identificado(a) con {profile.documentType} No. <span className="font-mono font-semibold text-slate-800">{profile.documentNumber}</span>
            </p>

            <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed pt-2">
              Ha cursado y aprobado satisfactoriamente el proceso de{' '}
              <strong className="text-emerald-950">INDUCCIÓN INSTITUCIONAL SENA</strong>, habiendo demostrado apropiación integral de la{' '}
              <em>Identidad y Símbolos de la Entidad</em>, el <em>Modelo Pedagógico de Formación Profesional Integral (FPI)</em>, el{' '}
              <em>Reglamento del Aprendiz (Acuerdo 009 actualizado)</em> y el <em>Plan Nacional de Bienestar</em>.
            </p>

            {/* Program details banner */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 max-w-xl mx-auto text-left text-xs space-y-1">
              <div>
                <span className="text-slate-500 font-medium">Programa de Formación: </span>
                <strong className="text-slate-900">{profile.trainingProgram}</strong>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-slate-500 font-medium">Ficha de Caracterización: </span>
                  <strong className="text-slate-900 font-mono">{profile.recordNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Juicio Evaluativo: </span>
                  <span className="font-mono font-bold text-[#007832]">APROBADO (A) · {score}%</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Centro de Formación: </span>
                <span className="text-slate-800">{profile.trainingCenter}</span>
              </div>
            </div>
          </div>

          {/* Signatures & Footer metadata */}
          <div className="pt-6 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-8 text-center max-w-lg mx-auto">
              <div className="space-y-1">
                <div className="h-10 flex items-end justify-center">
                  <span className="font-serif italic text-emerald-800 text-sm">
                    {profile.regional} - SENA
                  </span>
                </div>
                <div className="border-t border-slate-400 pt-1 text-[11px] font-bold text-slate-800">
                  Subdirector de Centro
                </div>
                <div className="text-[10px] text-slate-500">
                  Centro de Formación Profesional
                </div>
              </div>

              <div className="space-y-1">
                <div className="h-10 flex items-end justify-center">
                  <span className="font-serif italic text-emerald-800 text-sm">
                    FPI Certificada
                  </span>
                </div>
                <div className="border-t border-slate-400 pt-1 text-[11px] font-bold text-slate-800">
                  Coordinación Académica
                </div>
                <div className="text-[10px] text-slate-500">
                  Gestión Pedagógica y de Aprendizaje
                </div>
              </div>
            </div>

            <div className="mt-8 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400">
              <span>Expedido el {currentDate} en Colombia</span>
              <span className="font-mono">{certCode}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
