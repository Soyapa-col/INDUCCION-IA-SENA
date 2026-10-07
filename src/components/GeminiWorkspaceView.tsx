import React, { useState, useEffect, useRef } from 'react';
import {
  ACUERDO_009_2024_JSON,
  GEMINI_NOTEBOOKS_LIST,
  NotebookItem
} from '../data/acuerdo009Data';
import { SENA_SYMBOLS } from '../data/senaData';
import { ApprenticeProfile, ModuleId } from '../types/induction';
import { SenaLogo } from './SenaLogo';
import {
  Sparkles,
  FileText,
  FileCode2,
  Download,
  Copy,
  Check,
  Search,
  Plus,
  BookOpen,
  Image as ImageIcon,
  Library,
  Layers,
  ChevronRight,
  Send,
  Paperclip,
  Mic,
  MicOff,
  Scale,
  ShieldAlert,
  GraduationCap,
  AlertTriangle,
  FileCheck2,
  Menu,
  X,
  ExternalLink,
  Sun,
  Moon,
  Info,
  BookMarked,
  Shield,
  HelpCircle,
  FolderOpen
} from 'lucide-react';

interface GeminiWorkspaceViewProps {
  profile: ApprenticeProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenProfile: () => void;
  onNavigateToModule: (moduleId: ModuleId) => void;
}

interface CustomChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  time: string;
  highlightCategory?: string;
}

export const GeminiWorkspaceView: React.FC<GeminiWorkspaceViewProps> = ({
  profile,
  isDarkMode,
  onToggleDarkMode,
  onOpenProfile,
  onNavigateToModule
}) => {
  const [activeNotebookId, setActiveNotebookId] = useState<string>('sena-reglamento-json');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [searchNotebook, setSearchNotebook] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'json-code' | 'interactive-schema' | 'quick-queries'>('json-code');

  // Interactive Prompt query state
  const [promptInput, setPromptInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<CustomChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Speech Recognition state
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Drawers/Modals state
  const [showImageGallery, setShowImageGallery] = useState<boolean>(false);
  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState<boolean>(false);

  // Active notebook
  const activeNotebook =
    GEMINI_NOTEBOOKS_LIST.find((n) => n.id === activeNotebookId) || GEMINI_NOTEBOOKS_LIST[0];

  const jsonString = JSON.stringify(ACUERDO_009_2024_JSON, null, 2);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'es-CO';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setPromptInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert(
        'El reconocimiento de voz por micrófono no está disponible en este navegador. Puedes escribir tu consulta directamente en el campo de texto.'
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Speech recognition start error:', err);
      }
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
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

  const handleAskQuestion = (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: CustomChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: questionText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setPromptInput('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = '';
      let category = activeNotebook.category.toUpperCase();

      const q = questionText.toLowerCase();

      if (q.includes('inasistencia') || q.includes('justific') || q.includes('plazo') || q.includes('incumplimiento')) {
        responseText = `De acuerdo con la sección de Incumplimientos del Acuerdo 009: El incumplimiento justificado exige que las inasistencias sean informadas previamente (con 1 día de anterioridad) o radicadas dentro de los cinco (5) días hábiles siguientes al hecho con los debidos soportes válidos ante la coordinación académica del centro de formación.`;
        category = 'Incumplimientos & Plazos';
      } else if (q.includes('desercion') || q.includes('deserción') || q.includes('dias') || q.includes('días')) {
        responseText = `En el Acuerdo 009, la deserción se configura por: 1) Inasistencia injustificada por tres (3) días continuos o cinco (5) discontinuos en formación presencial; o 2) No ingresar a la plataforma LMS por veinte (20) días continuos o fallar injustificadamente a tres (3) citaciones en formación virtual.`;
        category = 'Causales de Deserción';
      } else if (q.includes('falta') || q.includes('sancion') || q.includes('medida') || q.includes('comite')) {
        responseText = `El Acuerdo 009 califica las faltas en Leves, Graves y Gravísimas (Académicas y Disciplinarias). Las medidas formativas previas comprenden: Llamado de atención escrito (máximo 2 por fase) y Plan de mejoramiento (máximo 2 por fase, duración de hasta 20 días). Las medidas sancionatorias formales tras debido proceso son el Condicionamiento de matrícula y la Cancelación definitiva de matrícula.`;
        category = 'Faltas y Régimen Sancionatorio';
      } else if (q.includes('derecho') || q.includes('bienestar') || q.includes('epp') || q.includes('evaluador')) {
        responseText = `El Acuerdo 009 consagra 8 derechos rectores: 1) Acceso a infraestructura y tecnología, 2) Entrega oportuna de EPP, 3) Beneficios del Plan Nacional de Bienestar, 4) Inclusión y ajustes razonables (Ley 361 de 1997), 5) Debido proceso inquebrantable, 6) Peticiones respetuosas, 7) Rutas frente a vulneraciones o acoso (Ley 2365), y 8) Evaluación objetiva con derecho a Segundo Evaluador dentro de los 2 días hábiles siguientes.`;
        category = 'Derechos del Aprendiz';
      } else if (q.includes('ley 2365') || q.includes('acoso') || q.includes('genero') || q.includes('violencia') || q.includes('maternidad') || q.includes('ley 2394')) {
        responseText = `El Acuerdo 009 incorporó dos leyes fundamentales de 2024: 1) La Ley 2365 de 2024, que establece rutas inmediatas de prevención, confidencialidad y atención integral contra el acoso sexual y violencias de género en el SENA; y 2) La Ley 2394 de 2024, que protege los derechos de aprendices gestantes, en lactancia y con licencias de paternidad, garantizando la continuidad académica sin riesgo de pérdida de cupo.`;
        category = 'Leyes 2365 & 2394 de 2024';
      } else if (q.includes('productiva') || q.includes('contrato') || q.includes('etapa') || q.includes('patrocinio') || q.includes('alternativa')) {
        responseText = `Para certificar la Etapa Productiva existen 5 alternativas reguladas: 1) Contrato de Aprendizaje (Ley 789 de 2002 con apoyo del 75% al 100% SMLMV + EPS + ARL), 2) Vínculo Laboral o contractual, 3) Proyecto Productivo / Fondo Emprender, 4) Pasantía en entidades públicas u ONGs, y 5) Monitoría institucional en centros de formación SENA.`;
        category = 'Etapa Productiva FPI';
      } else if (q.includes('deber') || q.includes('carne') || q.includes('carnet') || q.includes('zajuna') || q.includes('inteligencia artificial') || q.includes('ia')) {
        responseText = `Entre los deberes esenciales: 1) Portar siempre el carné institucional visible por seguridad; 2) Ciberconvivencia respetuosa en LMS Zajuna y foros; 3) Uso ético de la tecnología e IA (citar fuentes de autoría y evitar plagio o suplantación); 4) Cuidado estricto de equipos e infraestructura; y 5) Prohibición total de armas, estupefacientes y bebidas alcohólicas en sedes del SENA.`;
        category = 'Deberes & Ciberconvivencia';
      } else {
        responseText = `Análisis para "${activeNotebook.title}": ${activeNotebook.summary} De acuerdo con el Acuerdo 009 de 2024 expedido por el Consejo Directivo Nacional, toda actuación administrativa y formativa en el SENA se rige por el debido proceso, la presunción de inocencia y la búsqueda de la formación profesional integral.`;
      }

      const geminiMsg: CustomChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'gemini',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        highlightCategory: category
      };

      setChatHistory((prev) => [...prev, geminiMsg]);
      setIsTyping(false);
    }, 500);
  };

  const filteredNotebooks = GEMINI_NOTEBOOKS_LIST.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchNotebook.toLowerCase()) ||
      (n.subtitle && n.subtitle.toLowerCase().includes(searchNotebook.toLowerCase())) ||
      (n.systemTag && n.systemTag.toLowerCase().includes(searchNotebook.toLowerCase()));

    const matchesCategory =
      selectedCategoryFilter === 'all' || n.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-[#F8FAFC] dark:bg-[#070D17] text-slate-900 dark:text-slate-100 transition-colors">
      {/* ===================== SIDEBAR (Gemini Style) ===================== */}
      <aside
        className={`${
          sidebarOpen ? 'w-full md:w-80 lg:w-88' : 'w-0 hidden md:hidden'
        } shrink-0 bg-white dark:bg-[#0B1324] border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-200 z-20`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#39A900] flex items-center justify-center text-white shadow-xs">
              <SenaLogo variant="white" size="sm" className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                  Gemini SENA
                </span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 font-semibold px-1.5 py-0.2 rounded font-mono">
                  4.0 Normativo
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                Cuadernos Temáticos Oficiales
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            aria-label="Cerrar panel lateral"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons: Nuevo Chat / Nuevo Cuaderno */}
        <div className="p-3.5 space-y-2 border-b border-slate-100 dark:border-slate-800/80">
          <button
            onClick={() => {
              setActiveNotebookId('sena-reglamento-json');
              setChatHistory([]);
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-medium text-xs rounded-xl transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-700/60 shadow-xs"
          >
            <Plus className="w-4 h-4 text-[#39A900]" />
            <span>Nuevo chat con Gemini</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategoryFilter('all');
              setSearchNotebook('');
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-[#39A900] dark:text-emerald-400 font-semibold text-xs rounded-xl transition-colors cursor-pointer border border-emerald-200/60 dark:border-emerald-800/50"
          >
            <Sparkles className="w-4 h-4 text-[#39A900]" />
            <span>Ver los 7 Cuadernos Normativos</span>
          </button>
        </div>

        {/* Quick Tools Navigation (Functional: Imágenes, Biblioteca, Todos los cuadernos) */}
        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 text-xs space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Buscar tema o cuaderno normativo..."
              value={searchNotebook}
              onChange={(e) => setSearchNotebook(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
            />
          </div>

          <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setShowImageGallery(true)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
              title="Galería de Símbolos e Insignias del SENA"
            >
              <ImageIcon className="w-3.5 h-3.5 text-cyan-500" />
              <span>Símbolos SENA</span>
            </button>
            <button
              onClick={() => setShowLibraryModal(true)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
              title="Biblioteca Digital y Bases de Datos"
            >
              <Library className="w-3.5 h-3.5 text-amber-500" />
              <span>Biblioteca SENA</span>
            </button>
          </div>

          <button
            onClick={() => {
              setSelectedCategoryFilter('all');
              setSearchNotebook('');
            }}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400 transition-colors text-left cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <span>Todos los cuadernos oficiales</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded font-bold">
              {GEMINI_NOTEBOOKS_LIST.length}
            </span>
          </button>
        </div>

        {/* Notebooks List (100% Institutional SENA Notebooks) */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase font-mono">
            Cuadernos Normativos del Acuerdo 009
          </div>

          {filteredNotebooks.map((nb) => {
            const isActive = nb.id === activeNotebookId;
            return (
              <button
                key={nb.id}
                onClick={() => {
                  setActiveNotebookId(nb.id);
                  // Update tab view if appropriate
                  if (nb.id === 'sena-reglamento-json') {
                    setActiveTab('json-code');
                  } else {
                    setActiveTab('interactive-schema');
                  }
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex flex-col gap-0.5 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white shadow-xs ring-1 ring-emerald-500/20'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className={`font-semibold line-clamp-1 ${isActive ? 'text-[#39A900] dark:text-emerald-400' : ''}`}>
                    {nb.title}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] shrink-0" />
                  )}
                </div>
                {nb.subtitle && (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 font-sans">
                    {nb.subtitle}
                  </span>
                )}
                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  <span>{nb.systemTag}</span>
                  <span>{nb.date}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Link back to Induction Modules */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-mono">
            Ruta de Inducción
          </div>
          <div className="space-y-1">
            <button
              onClick={() => onNavigateToModule('reglamento')}
              className="w-full flex items-center justify-between p-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-[#39A900] hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">03</span>
                <span>Reglamento Acuerdo 009</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              onClick={() => onNavigateToModule('evaluacion')}
              className="w-full flex items-center justify-between p-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-[#39A900] hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">05</span>
                <span>Evaluación & Ranking (25 Preguntas)</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Sidebar Footer User profile */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs ring-2 ring-emerald-500/30">
              AG
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-[#39A900] transition-colors">
                {profile.fullName}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                ADSO · {profile.recordNumber}
              </span>
            </div>
          </button>
        </div>
      </aside>

      {/* ===================== MAIN CANVAS (Gemini Interactive Topic Canvas) ===================== */}
      <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#070D17] overflow-hidden">
        {/* Top Control Bar */}
        <header className="h-14 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 bg-white/80 dark:bg-[#070D17]/80 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                title="Mostrar barra lateral"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div className="flex items-center gap-2 min-w-0">
              <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                {activeNotebook.title}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md font-mono shrink-0">
                <FileText className="w-3 h-3 text-[#39A900]" />
                {activeNotebook.systemTag}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark mode button upper right side with blur effect */}
            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-xs"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600" />
                  <span className="hidden sm:inline">Modo Oscuro</span>
                </>
              )}
            </button>

            {/* Link to traditional induction */}
            <button
              onClick={() => onNavigateToModule('reglamento')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#39A900] hover:bg-[#2e8800] text-white shadow-xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Módulos Inducción</span>
            </button>
          </div>
        </header>

        {/* Conversation / Notebook Canvas Stream */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 max-w-5xl mx-auto w-full">
          {/* User Prompt (Reflects current active notebook) */}
          <div className="flex items-start gap-3 sm:gap-4 max-w-3xl">
            <div className="w-9 h-9 rounded-full bg-slate-800 dark:bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-slate-200 dark:ring-slate-700">
              AG
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  {profile.fullName}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">14:18</span>
              </div>

              {/* User Prompt Bubble */}
              <div className="bg-slate-100 dark:bg-slate-850 text-slate-900 dark:text-slate-100 p-4 rounded-2xl rounded-tl-sm text-sm sm:text-base border border-slate-200/60 dark:border-slate-800 leading-relaxed shadow-xs">
                {activeNotebook.id === 'sena-reglamento-json'
                  ? 'Analiza el archivo adjunto y conviértelo completamente a formato Json y genera un solo archivo con código.'
                  : `Explícame en detalle la temática: "${activeNotebook.title}" del Acuerdo 009 de 2024.`}
              </div>

              {/* Attached Document Badge */}
              <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-[10px]">
                  PDF
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono">
                    acuerdo_009_2024_reglamento_aprendiz.pdf
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    3.8 MB · Reglamento Oficial SENA (Consejo Directivo Nacional)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Gemini Response */}
          <div className="flex items-start gap-3 sm:gap-4 max-w-4xl">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 via-[#39A900] to-emerald-400 flex items-center justify-center text-white shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <div className="space-y-4 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Gemini
                </span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-full font-mono">
                  {activeNotebook.systemTag}
                </span>
              </div>

              {/* Status Header */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{activeNotebook.id === 'sena-reglamento-json' ? 'Your JSON file is ready' : activeNotebook.title}</span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeNotebook.summary}
                </p>
              </div>

              {/* Action Card with Tabs */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-[#0B1528] dark:to-[#08101E] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                      <FileCode2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono">
                          acuerdo_009_2024_reglamento_aprendiz.json
                        </span>
                        <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded uppercase font-mono">
                          JSON
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Base normativa oficial adoptada por el Consejo Directivo Nacional
                      </p>
                    </div>
                  </div>

                  {/* Actions: Download + Copy */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleCopyJson}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors shadow-xs cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copiar código</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleDownloadJson}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white transition-all shadow-sm cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar JSON</span>
                    </button>
                  </div>
                </div>

                {/* Sub-tabs inside JSON response */}
                <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-3">
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setActiveTab('json-code')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === 'json-code'
                          ? 'bg-slate-900 text-white dark:bg-emerald-500/20 dark:text-emerald-300 border border-transparent dark:border-emerald-500/30'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      Código JSON Completo
                    </button>
                    <button
                      onClick={() => setActiveTab('interactive-schema')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === 'interactive-schema'
                          ? 'bg-slate-900 text-white dark:bg-emerald-500/20 dark:text-emerald-300 border border-transparent dark:border-emerald-500/30'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      Estructura Visual & Articulado
                    </button>
                    <button
                      onClick={() => setActiveTab('quick-queries')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === 'quick-queries'
                          ? 'bg-slate-900 text-white dark:bg-emerald-500/20 dark:text-emerald-300 border border-transparent dark:border-emerald-500/30'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      Consultas Rápidas ({activeNotebook.sampleQuestions?.length || 4})
                    </button>
                  </div>
                </div>
              </div>

              {/* TAB 1: Code viewer with line numbers */}
              {activeTab === 'json-code' && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#0F172A] text-slate-200 shadow-md">
                  <div className="px-4 py-2.5 bg-[#090E17] border-b border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                      <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
                      acuerdo_009_2024_reglamento_aprendiz.json
                    </span>
                    <button
                      onClick={handleCopyJson}
                      className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed max-h-[460px] overflow-y-auto text-emerald-300/90 selection:bg-emerald-700 selection:text-white">
                    <code>{jsonString}</code>
                  </pre>
                </div>
              )}

              {/* TAB 2: Interactive Visual Schema & Key Articles */}
              {activeTab === 'interactive-schema' && (
                <div className="space-y-4">
                  {/* Topic Key Articles if present */}
                  {activeNotebook.keyArticles && activeNotebook.keyArticles.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                        Artículos Destacados de este Cuaderno
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {activeNotebook.keyArticles.map((art, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs"
                          >
                            <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                              {art.article}
                            </span>
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                              {art.title}
                            </h5>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                              {art.excerpt}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500 block">
                        Entidad & Vigencia
                      </span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                        {ACUERDO_009_2024_JSON.entidad}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Expedido el {ACUERDO_009_2024_JSON.fecha_expedicion} en {ACUERDO_009_2024_JSON.lugar_expedicion}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500 block">
                        Firmantes Oficiales
                      </span>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">
                        {ACUERDO_009_2024_JSON.firmantes.presidente_consejo_directivo}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {ACUERDO_009_2024_JSON.firmantes.secretaria_consejo_directivo}
                      </p>
                    </div>
                  </div>

                  {/* Derechos del Aprendiz (8) */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-[#39A900]" />
                      Derechos del Aprendiz ({ACUERDO_009_2024_JSON.estructura_reglamento.derechos_del_aprendiz.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {ACUERDO_009_2024_JSON.estructura_reglamento.derechos_del_aprendiz.map((der, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-750 flex items-start gap-2 text-slate-700 dark:text-slate-200"
                        >
                          <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                            0{idx + 1}
                          </span>
                          <span className="leading-snug">{der}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Quick Queries */}
              {activeTab === 'quick-queries' && (
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    Consultas Rápidas Sugeridas sobre este Tema
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(activeNotebook.sampleQuestions || [
                      '¿Qué leyes de 2024 incorpora el Acuerdo 009?',
                      '¿Cuáles son los 8 derechos clave del aprendiz?',
                      '¿Cómo se clasifican las faltas disciplinarias?',
                      '¿Cuál es el término legal para justificar una inasistencia?'
                    ]).map((pregunta, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAskQuestion(pregunta)}
                        className="text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-300 dark:hover:border-emerald-700 text-xs text-slate-800 dark:text-slate-200 font-medium transition-all cursor-pointer flex items-center justify-between group shadow-xs"
                      >
                        <span>{pregunta}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#39A900] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Chat History Items */}
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 sm:gap-4 max-w-4xl ${
                msg.sender === 'user' ? 'max-w-3xl' : ''
              }`}
            >
              {msg.sender === 'user' ? (
                <div className="w-9 h-9 rounded-full bg-slate-800 dark:bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-slate-200 dark:ring-slate-700">
                  AG
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 via-[#39A900] to-emerald-400 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              )}

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">
                    {msg.sender === 'user' ? profile.fullName : 'Gemini Asistente SENA'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{msg.time}</span>
                  {msg.highlightCategory && (
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-400 font-semibold px-2 py-0.2 rounded font-mono">
                      {msg.highlightCategory}
                    </span>
                  )}
                </div>

                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-slate-100 dark:bg-slate-850 text-slate-900 dark:text-slate-100 rounded-tl-sm border border-slate-200/60 dark:border-slate-800'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-200 dark:border-slate-800 shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <Sparkles className="w-4 h-4 text-[#39A900] animate-spin" />
              <span>Gemini está analizando el Acuerdo 009 de 2024...</span>
            </div>
          )}
        </div>

        {/* Bottom Floating Prompt Bar (Gemini Style) */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 bg-white/90 dark:bg-[#070D17]/90 backdrop-blur sticky bottom-0">
          <div className="max-w-4xl mx-auto space-y-2 relative">
            {/* Attachment Actions Menu Popover */}
            {showAttachmentMenu && (
              <div className="absolute bottom-16 left-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-xl z-30 w-72 space-y-1 text-xs">
                <button
                  onClick={() => {
                    handleDownloadJson();
                    setShowAttachmentMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer text-slate-800 dark:text-slate-200"
                >
                  <Download className="w-4 h-4 text-[#39A900]" />
                  <span>Descargar acuerdo_009.json</span>
                </button>
                <button
                  onClick={() => {
                    handleCopyJson();
                    setShowAttachmentMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer text-slate-800 dark:text-slate-200"
                >
                  <Copy className="w-4 h-4 text-cyan-500" />
                  <span>Copiar JSON al portapapeles</span>
                </button>
                <button
                  onClick={() => {
                    setShowImageGallery(true);
                    setShowAttachmentMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer text-slate-800 dark:text-slate-200"
                >
                  <ImageIcon className="w-4 h-4 text-amber-500" />
                  <span>Ver símbolos e insignias SENA</span>
                </button>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskQuestion(promptInput);
              }}
              className="relative flex items-center bg-slate-100 dark:bg-slate-850 rounded-2xl border border-slate-300 dark:border-slate-750 focus-within:border-[#39A900] focus-within:ring-2 focus-within:ring-[#39A900]/20 shadow-xs transition-all"
            >
              <button
                type="button"
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className="p-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
                title="Opciones de archivo y recursos"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder={
                  isListening
                    ? 'Escuchando tu voz... habla ahora'
                    : `Pregunta sobre ${activeNotebook.title} o el Acuerdo 009...`
                }
                className="flex-1 bg-transparent py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />

              <div className="flex items-center gap-1 pr-2">
                {/* Voice Input Button (Functional with Web Speech API) */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title={isListening ? 'Detener dictado por voz' : 'Dictar por voz'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  type="submit"
                  disabled={!promptInput.trim()}
                  className="p-2 rounded-xl bg-[#39A900] hover:bg-[#2e8800] disabled:opacity-40 disabled:hover:bg-[#39A900] text-white transition-all cursor-pointer shadow-xs"
                  title="Enviar pregunta"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Disclaimer matching Gemini */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 px-2 font-sans">
              <span>
                Gemini SENA 4.0 responde fundamentado en el Acuerdo 009 de 2024.
              </span>
              <span className="hidden sm:inline font-mono">
                {activeNotebook.systemTag}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ===================== IMAGE GALLERY DRAWER ===================== */}
      {showImageGallery && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-cyan-500" />
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Símbolos e Insignias Institucionales del SENA
                </h4>
              </div>
              <button
                onClick={() => setShowImageGallery(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SENA_SYMBOLS.map((sym) => (
                  <div
                    key={sym.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#39A900]" />
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {sym.name}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {sym.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== BIBLIOTECA DIGITAL DRAWER ===================== */}
      {showLibraryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Library className="w-5 h-5 text-amber-500" />
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Sistema Nacional de Bibliotecas y Recursos Digitales SENA
                </h4>
              </div>
              <button
                onClick={() => setShowLibraryModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Como aprendiz matriculado en el SENA tienes acceso gratuito e ilimitado a más de 50 bases de datos científicas internacionales:
              </p>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block">Portal Bibliotecas SENA:</strong>
                  <span className="text-slate-600 dark:text-slate-400">biblioteca.sena.edu.co — Libros digitales, normas técnicas ICONTEC, IEEE y ScienceDirect.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block">Repositorio Institucional SENA:</strong>
                  <span className="text-slate-600 dark:text-slate-400">repositorio.sena.edu.co — Investigaciones, proyectos formativos y memorias técnicas SENNOVA.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block">Campus LMS Zajuna:</strong>
                  <span className="text-slate-600 dark:text-slate-400">zajuna.sena.edu.co — Plataforma oficial de cursos, foros y evidencias de aprendizaje.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
