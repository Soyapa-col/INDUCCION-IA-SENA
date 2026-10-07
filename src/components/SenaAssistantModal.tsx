import React, { useState } from 'react';
import { X, HelpCircle, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  onClose: () => void;
}

interface FAQItem {
  question: string;
  category: string;
  answer: string;
}

export const SenaAssistantModal: React.FC<Props> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Reglamento',
      question: '¿Qué es el Acuerdo 009 y qué novedades trae en el SENA?',
      answer: 'El Acuerdo 009 es la versión actualizada del Reglamento del Aprendiz expedida por el Consejo Directivo Nacional. Reemplaza al Acuerdo 007 de 2012 e introduce normas sobre ciberconvivencia en plataformas virtuales (LMS Zajuna), enfoque diferencial y de género, uso ético de tecnologías e IA, y formalización de trámites como aplazamiento y reingreso.'
    },
    {
      category: 'Reglamento',
      question: '¿Qué plazo tengo para justificar una inasistencia a clase o taller?',
      answer: 'Tienes un plazo improrrogable de hasta tres (3) días hábiles siguientes al hecho para radicar la justificación médica o de fuerza mayor por escrito o vía plataforma ante el instructor y la coordinación (Acuerdo 009).'
    },
    {
      category: 'Evaluación',
      question: '¿Qué significa obtener un juicio evaluativo "D" (Deficiente)?',
      answer: 'Significa que no alcanzaste el 100% de los criterios del Resultado de Aprendizaje (RAP). En el SENA no pierdes la materia de inmediato: tienes derecho a concertar un Plan de Mejoramiento con el instructor para subsanar y alcanzar el juicio "A".'
    },
    {
      category: 'Reglamento',
      question: '¿Cómo solicito un segundo evaluador si estoy en desacuerdo con una calificación?',
      answer: 'Debes presentar una solicitud respetuosa y sustentada por escrito ante el Coordinador Académico dentro de los dos (2) días hábiles siguientes a la publicación del juicio evaluativo.'
    },
    {
      category: 'Etapa Productiva',
      question: '¿Cuánto es el apoyo de sostenimiento en un Contrato de Aprendizaje (Ley 789)?',
      answer: 'Durante la etapa lectiva equivale mínimo al 50% de 1 SMLMV + EPS. Durante la etapa productiva asciende al 75% o 100% de 1 SMLMV (según la tasa de desempleo nacional fijada por el DANE) + EPS y ARL completa a cargo de la empresa.'
    },
    {
      category: 'Plataformas',
      question: '¿Cómo se ingresa al LMS Zajuna y al correo MiSENA?',
      answer: 'Ingresas con tu tipo y número de documento registrado en SOFIA Plus. Tu correo institucional es usuario@misena.edu.co, el cual te brinda almacenamiento gratuito y herramientas de Google Workspace.'
    },
    {
      category: 'Bienestar',
      question: '¿Cómo accedo a los apoyos de sostenimiento FIC o bonos de alimentación?',
      answer: 'Debes estar atento a las convocatorias trimestrales de la oficina de Bienestar al Aprendiz en tu centro. Se prioriza a aprendices en estratos 1 y 2 que no cuenten con contrato de aprendizaje ni patrocinio económico.'
    },
    {
      category: 'Reglamento',
      question: '¿Por qué es obligatorio portar el carné visible en las sedes del SENA?',
      answer: 'Por seguridad, identificación y control de acceso tanto en ambientes pedagógicos como en laboratorios y bibliotecas. El carné es intransferible y no puede ser prestado a terceros.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh] transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 shrink-0">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#39A900]" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Guía de Preguntas Frecuentes del Aprendiz
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar respuesta (ej. inasistencia, segundo evaluador, contrato)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            />
          </div>
        </div>

        {/* FAQ list */}
        <div className="p-6 overflow-y-auto space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold uppercase">
                      {faq.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {faq.question}
                    </h4>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/90 leading-relaxed border-t border-slate-100 dark:border-slate-750">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
