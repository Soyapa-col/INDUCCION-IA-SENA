/**
 * Data structures for Acuerdo 009 de 2024 - Reglamento del Aprendiz SENA.
 * Converted to standard JSON and structured according to official SENA publication.
 */

export interface Acuerdo009Articulo {
  articulo: number;
  nombre: string;
  descripcion: string;
}

export interface EstructuraReglamento {
  derechos_del_aprendiz: string[];
  ingreso_y_registro: {
    ingreso: string;
    registro: string;
    restricciones_inscripcion: string;
  };
  incumplimientos_y_desercion: {
    incumplimiento_justificado: string;
    incumplimiento_injustificado: string;
    desercion: string;
  };
  evaluacion: {
    juicios_evaluacion: string[];
    acompanamiento: string;
  };
  faltas_y_medidas: {
    tipos_de_faltas: string[];
    calificacion_faltas: string[];
    medidas_formativas: string[];
    medidas_sancionatorias: string[];
  };
}

export interface Acuerdo009Data {
  documento: string;
  titulo: string;
  entidad: string;
  fecha_expedicion: string;
  lugar_expedicion: string;
  firmantes: {
    presidente_consejo_directivo: string;
    secretaria_consejo_directivo: string;
  };
  considerandos_clave: string[];
  articulado_acuerdo: Acuerdo009Articulo[];
  estructura_reglamento: EstructuraReglamento;
}

export const ACUERDO_009_2024_JSON: Acuerdo009Data = {
  documento: "Acuerdo 009 de 2024",
  titulo: "Por medio del cual se adopta el Reglamento del Aprendiz SENA y se derogan los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024",
  entidad: "Servicio Nacional de Aprendizaje (SENA)",
  fecha_expedicion: "2024-11-05",
  lugar_expedicion: "Bogotá, D.C.",
  firmantes: {
    presidente_consejo_directivo: "Iván Daniel Jaramillo Jassir (Viceministro de Empleo y Pensiones)",
    secretaria_consejo_directivo: "Katerine Grimaldos Robayo (Secretaria General E)"
  },
  considerandos_clave: [
    "Ley 119 de 1994, artículo 4º numeral 1 - Función de promover la formación profesional integral.",
    "Ley 361 de 1997, artículo 23º - Integración social y acceso en igualdad de condiciones para personas en situación de discapacidad.",
    "Ley 2394 de 2024 - Protección de derechos de estudiantes gestantes, en periodo de lactancia y licencias de paternidad.",
    "Decreto 249 de 2004, artículo 3º numeral 8 - Regulación de selección, orientación, promoción y reglamento por parte del Consejo Directivo Nacional.",
    "Ley 2365 de 2024 - Medidas de prevención, protección y atención de acoso sexual en el ámbito laboral y educativo.",
    "Necesidad de armonizar y compilar normativas previas (Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024)."
  ],
  articulado_acuerdo: [
    {
      articulo: 1,
      nombre: "Adopción del Reglamento",
      descripcion: "Adoptar el Reglamento del Aprendiz SENA mediante el documento anexo que forma parte integral de este Acuerdo, aplicable a todas las personas matriculadas en programas de formación profesional del SENA."
    },
    {
      articulo: 2,
      nombre: "Ámbito de aplicación y transición",
      descripcion: "Aplicable a aprendices matriculados a partir de su publicación. Procesos en curso se rigen por el reglamento vigente al momento de su matrícula. En materia disciplinaria aplica la norma más favorable."
    },
    {
      articulo: 3,
      nombre: "Vigencia y derogatorias",
      descripcion: "Rige a partir de la publicación en el Diario Oficial y deroga los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024."
    },
    {
      articulo: 4,
      nombre: "Divulgación",
      descripcion: "Ordena la publicación del Acuerdo y Reglamento en la página web del SENA."
    }
  ],
  estructura_reglamento: {
    derechos_del_aprendiz: [
      "Acceso a infraestructura, recursos físicos, técnicos y tecnológicos del Centro de Formación.",
      "Recepción oportuna de elementos de protección personal (EPP).",
      "Disfrute de beneficios del Plan Nacional Integral de Bienestar al Aprendiz.",
      "Reconocimiento e inclusión para personas con discapacidad y grupos de especial protección.",
      "Debido proceso en etapas de formación, procesos administrativos y disciplinarios.",
      "Notificación de novedades académicas y derecho a ser escuchado en peticiones respetuosas.",
      "Asesoría para activar rutas de atención frente a vulneraciones de derechos o acoso.",
      "Evaluación objetiva e integral basada en criterios y resultados de aprendizaje."
    ],
    ingreso_y_registro: {
      ingreso: "Regulado por normatividad nacional e interna. Cumplimiento de etapas (registro, inscripción, selección y matrícula).",
      registro: "Procedimiento único, personal e intransferible en el sistema de gestión académica.",
      restricciones_inscripcion: "No se puede inscribir si ya tiene inscripción vigente, si fue citado a pruebas, o si ya fue seleccionado para matrícula."
    },
    incumplimientos_y_desercion: {
      incumplimiento_justificado: "Inasistencias informadas previamente (1 día de anterioridad) o dentro de los 5 días hábiles siguientes con soportes válidos.",
      incumplimiento_injustificado: "Sin reporte/justificación dentro de los 5 días hábiles o con soportes no válidos.",
      desercion: "Abandono de la formación por 3 días continuos o 5 no continuos de inasistencia injustificada (presencial), o no ingresar a plataforma LMS por 20 días / fallar a 3 citaciones (virtual)."
    },
    evaluacion: {
      juicios_evaluacion: ["APROBADO", "NO APROBADO"],
      acompanamiento: "Seguimiento permanente por parte del instructor para ajustar estrategias pedagógicas."
    },
    faltas_y_medidas: {
      tipos_de_faltas: ["Académicas", "Disciplinarias"],
      calificacion_faltas: ["Leves", "Graves", "Gravísimas"],
      medidas_formativas: [
        "Llamado de atención escrito (máx. 2 por fase)",
        "Plan de mejoramiento (máx. 2 por fase, duración hasta 20 días)"
      ],
      medidas_sancionatorias: [
        "Condicionamiento de matrícula",
        "Cancelación de matrícula"
      ]
    }
  }
};

export interface NotebookItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'reglamento' | 'derechos' | 'deberes' | 'tramites' | 'faltas' | 'inclusion' | 'productiva';
  active?: boolean;
  date?: string;
  systemTag?: string;
  summary?: string;
  sampleQuestions?: string[];
  keyArticles?: { article: string; title: string; excerpt: string }[];
}

export const GEMINI_NOTEBOOKS_LIST: NotebookItem[] = [
  {
    id: 'sena-reglamento-json',
    title: 'Conversión de Reglamento SENA a JSON',
    subtitle: 'Acuerdo 009 de 2024 · Estructura completa y código JSON',
    category: 'reglamento',
    active: true,
    date: 'Hoy, 14:20',
    systemTag: 'Estatuto Completo · Acuerdo 009',
    summary: 'Digitalización exhaustiva del Acuerdo 009 del 5 de noviembre de 2024 expedido por el Consejo Directivo Nacional del SENA. Contiene considerandos, articulado, 8 derechos rectores, causales de deserción y régimen sancionatorio.',
    sampleQuestions: [
      '¿Qué leyes de 2024 incorpora el Acuerdo 009?',
      '¿Cuáles son los 8 derechos clave del aprendiz?',
      '¿Cómo se clasifican las faltas disciplinarias?',
      '¿Cuál es el término legal para justificar una inasistencia?'
    ],
    keyArticles: [
      { article: 'Artículo 1', title: 'Adopción del Reglamento', excerpt: 'Adopta el estatuto obligatorio para todos los aprendices matriculados en formación profesional integral.' },
      { article: 'Artículo 2', title: 'Transición y Favorabilidad', excerpt: 'En materia disciplinaria rige de manera preferente el principio de favorabilidad constitucional.' },
      { article: 'Artículo 3', title: 'Derogatorias', excerpt: 'Deroga expresamente los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.' }
    ]
  },
  {
    id: 'derechos-aprendiz',
    title: 'Garantías y Derechos del Aprendiz SENA',
    subtitle: 'Capítulo II · EPP, Infraestructura, Debido Proceso e Inclusión',
    category: 'derechos',
    date: 'Hoy, 11:15',
    systemTag: 'Capítulo II · Derechos Fundamentales',
    summary: 'Consagración de los 8 derechos inalienables del aprendiz: acceso a talleres, recepción de EPP, beneficios del Plan Nacional de Bienestar, ajustes razonables (Ley 361 de 1997), Segundo Evaluador y presunción de inocencia.',
    sampleQuestions: [
      '¿Cuándo y cómo puedo solicitar un Segundo Evaluador?',
      '¿Cuáles son las garantías de dotación de EPP en talleres?',
      '¿Qué apoyos socioeconómicos contempla Bienestar al Aprendiz?',
      '¿Cómo se garantiza el Debido Proceso ante una queja disciplinaria?'
    ],
    keyArticles: [
      { article: 'Numeral 1', title: 'Infraestructura y Tecnología', excerpt: 'Acceso a recursos físicos, técnicos y tecnológicos del centro.' },
      { article: 'Numeral 2', title: 'Protección Personal (EPP)', excerpt: 'Recepción oportuna de EPP según los riesgos del ambiente de formación.' },
      { article: 'Numeral 5', title: 'Garantía del Debido Proceso', excerpt: 'Derecho a versión libre, contradicción de pruebas y recursos legales.' }
    ]
  },
  {
    id: 'deberes-ciberconvivencia',
    title: 'Deberes, Netiqueta y Ciberconvivencia LMS',
    subtitle: 'Capítulo III · Zajuna, Identificación y Uso Ético de IA',
    category: 'deberes',
    date: 'Ayer, 16:40',
    systemTag: 'Capítulo III · Ciberconvivencia & Ética',
    summary: 'Pautas de conducta ética digital en Zajuna, foros y correo MiSENA; porte visible y personal del carné; uso responsable y atribución de fuentes en software y herramientas de Inteligencia Artificial; y cero armas, alcohol o drogas.',
    sampleQuestions: [
      '¿Cuáles son las normas de ciberconvivencia en Zajuna?',
      '¿Cómo debo utilizar herramientas de Inteligencia Artificial en mis evidencias?',
      '¿Por qué el carné institucional es personal e intransferible?',
      '¿Qué consecuencias tiene el porte de sustancias en las sedes?'
    ],
    keyArticles: [
      { article: 'Deber 04', title: 'Ciberconvivencia', excerpt: 'Comunicación respetuosa y constructiva en entornos virtuales.' },
      { article: 'Deber 08', title: 'Propiedad Intelectual', excerpt: 'Citar fuentes de autoría y abstenerse de plagio o suplantación con IA.' },
      { article: 'Deber 12', title: 'Porte de Carné', excerpt: 'Obligatoriedad de portar visible el carné institucional para ingreso y seguridad.' }
    ]
  },
  {
    id: 'tramites-desercion',
    title: 'Trámites Académicos, Inasistencias y Deserción',
    subtitle: 'Capítulo IV · Plazos, Aplazamiento y Traslados',
    category: 'tramites',
    date: '5 oct',
    systemTag: 'Capítulo IV · Novedades Académicas',
    summary: 'Procedimientos y términos perentorios: justificación de inasistencias dentro de los 5 días hábiles siguientes; causales de deserción presencial (3 días continuos o 5 no continuos) y virtual (20 días sin LMS o 3 citaciones); y formalización de aplazamiento.',
    sampleQuestions: [
      '¿Cuántos días tengo para radicar una incapacidad médica?',
      '¿Cuándo se declara deserción en formación presencial?',
      '¿Cómo opera la deserción en modalidad 100% virtual?',
      '¿Qué requisitos exige un aplazamiento por fuerza mayor?'
    ],
    keyArticles: [
      { article: 'Causal Presencial', title: 'Deserción por Inasistencia', excerpt: 'Tres (3) días continuos o cinco (5) no continuos injustificados.' },
      { article: 'Causal Virtual', title: 'Deserción en Plataforma', excerpt: 'No ingresar al LMS por 20 días continuos o faltar a 3 citaciones.' },
      { article: 'Trámite Especial', title: 'Plazo de Justificación', excerpt: 'Hasta cinco (5) días hábiles para radicar soportes legítimos.' }
    ]
  },
  {
    id: 'faltas-sanciones',
    title: 'Faltas Disciplinarias, Medidas y Comité de Seguimiento',
    subtitle: 'Capítulo V · Leves, Graves, Gravísimas y Debido Proceso',
    category: 'faltas',
    date: '4 oct',
    systemTag: 'Capítulo V · Régimen Disciplinario',
    summary: 'Criterios de graduación de faltas (Leves, Graves y Gravísimas); medidas formativas preventivas (Llamado de atención escrito y Plan de Mejoramiento hasta 20 días); sanciones formales (Condicionamiento y Cancelación de matrícula); y descargos ante el Comité de Evaluación.',
    sampleQuestions: [
      '¿Cuál es la diferencia entre medida formativa y sanción disciplinaria?',
      '¿Cuántos llamados de atención escritos se permiten por fase?',
      '¿Cuáles son las conductas tipificadas como faltas gravísimas?',
      '¿Cómo actúa el Comité de Evaluación y Seguimiento?'
    ],
    keyArticles: [
      { article: 'Medidas Formativas', title: 'Carácter Pedagógico', excerpt: 'Llamado de atención escrito (máx. 2) y Plan de Mejoramiento (hasta 20 días).' },
      { article: 'Sanciones', title: 'Medidas Sancionatorias', excerpt: 'Condicionamiento de matrícula o Cancelación definitiva con inhabilidad.' },
      { article: 'Instancia', title: 'Comité de Evaluación', excerpt: 'Cuerpo colegiado que evalúa pruebas y emite concepto motivado.' }
    ]
  },
  {
    id: 'violencias-ley2365',
    title: 'Prevención de Violencias de Género y Ley 2365 de 2024',
    subtitle: 'Ruta de Atención Integral, Confidencialidad y No Discriminación',
    category: 'inclusion',
    date: '2 oct',
    systemTag: 'Leyes 2365 & 2394 de 2024 · Enfoque de Género',
    summary: 'Medidas obligatorias de prevención, atención inmediata, confidencialidad y acompañamiento psicopedagógico frente al acoso sexual y violencias de género en el ámbito educativo del SENA, junto con protección integral a gestantes y lactantes.',
    sampleQuestions: [
      '¿Qué medidas adopta el SENA bajo la Ley 2365 de 2024?',
      '¿Qué protección otorga la Ley 2394 a aprendices gestantes y lactantes?',
      '¿Cuál es la ruta confidencial ante una situación de acoso?',
      '¿Qué garantías de no revictimización contempla el reglamento?'
    ],
    keyArticles: [
      { article: 'Ley 2365 de 2024', title: 'Acoso Sexual en Educación', excerpt: 'Activación de rutas inmediatas con confidencialidad y debido proceso.' },
      { article: 'Ley 2394 de 2024', title: 'Protección de Maternidad/Paternidad', excerpt: 'Garantía de tiempos de lactancia y licencias parentales sin pérdida de cupo.' },
      { article: 'Ley 361 de 1997', title: 'Ajustes Razonables', excerpt: 'Inclusión efectiva de personas en situación de discapacidad.' }
    ]
  },
  {
    id: 'etapa-productiva',
    title: 'Ruta de Etapa Productiva y Contrato de Aprendizaje',
    subtitle: 'Alternativas FPI · Contrato Ley 789, Proyecto y Vínculo Laboral',
    category: 'productiva',
    date: '30 sep',
    systemTag: 'FPI · Etapa Práctica en el Sector Real',
    summary: 'Reglamentación de las modalidades para certificar la etapa productiva: Contrato de Aprendizaje (Ley 789 de 2002), Vínculo Laboral, Proyecto Productivo SENA, Pasantía Institucional y Monitoría, con seguimiento de bitácoras trimestrales.',
    sampleQuestions: [
      '¿Cuáles son las alternativas autorizadas para la etapa productiva?',
      '¿Cuánto es el apoyo de sostenimiento en etapa productiva según la ley?',
      '¿Cómo se legaliza un proyecto productivo o emprendimiento?',
      '¿Qué requisitos de bitácora y visitas del instructor se exigen?'
    ],
    keyArticles: [
      { article: 'Alternativa 01', title: 'Contrato de Aprendizaje', excerpt: 'Apoyo económico del 75% al 100% SMLMV + EPS + ARL completa.' },
      { article: 'Alternativa 02', title: 'Proyecto Productivo', excerpt: 'Desarrollo de unidad productiva apoyada por Fondo Emprender o SENA.' },
      { article: 'Seguimiento', title: 'Bitácoras de Aprendizaje', excerpt: 'Diligenciamiento periódico del formato de seguimiento concertado con la empresa.' }
    ]
  }
];

export interface ChatInteraction {
  id: string;
  role: 'user' | 'assistant';
  timestamp: string;
  content: string;
  attachedFile?: {
    name: string;
    type: 'pdf' | 'json';
    size: string;
  };
  jsonResult?: Acuerdo009Data;
}
