import { DilemmaCase, GlossaryTerm, QuizQuestion } from '../types/induction';

export const SENA_HISTORY = {
  foundationDate: '21 de junio de 1957',
  founder: 'Rodolfo Martínez Tono',
  legalBasis: 'Decreto Ley 118 de 1957',
  purpose: 'Nació gracias a una iniciativa conjunta de trabajadores, empresarios y el Estado, con la misión de brindar formación profesional a los trabajadores colombianos y tecnificar la industria nacional.',
  milestones: [
    { year: '1957', event: 'Fundación del SENA por Rodolfo Martínez Tono bajo la Junta Militar de Gobierno.' },
    { year: '1960', event: 'Apertura de los primeros centros fijos y móviles de formación en las principales ciudades de Colombia.' },
    { year: '1994', event: 'Ley 119 de 1994: Reestructuración y modernización de la entidad para el siglo XXI.' },
    { year: '2002', event: 'Creación del Fondo Emprender y reglamentación del Contrato de Aprendizaje (Ley 789 de 2002).' },
    { year: '2012', event: 'Expedición del Acuerdo 007 de 2012 como referente histórico de convivencia.' },
    { year: 'Actualizado', event: 'Adopción del nuevo Reglamento del Aprendiz SENA (Acuerdo 009), modernizando derechos, ciberconvivencia, inclusión y debido proceso.' },
    { year: 'Presente', event: 'Liderazgo en formación 4.0, biotecnología, inteligencia artificial y cobertura nacional en 33 regionales.' },
  ]
};

export const SENA_MISSION_VISION = {
  mision: 'El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
  vision: 'En el año 2026, el SENA se consolidará como una entidad referente de clase mundial en formación técnica y tecnológica, reconocida por la innovación pedagógica, la pertinencia de sus programas y su contribución efectiva a la competitividad, la justicia social y la paz de Colombia.'
};

export const SENA_SYMBOLS = [
  {
    id: 'escudo',
    name: 'El Escudo del SENA',
    description: 'Refleja los tres sectores fundamentales de la economía colombiana en los que la institución capacita y transforma el talento nacional.',
    details: [
      {
        part: 'Sector Primario (Agropecuario)',
        icon: 'Sprout',
        meaning: 'Representado por el arado, el grano de café y las espigas en la base, simbolizando el trabajo del campo, la soberanía alimentaria y la tierra fértil colombiana.'
      },
      {
        part: 'Sector Secundario (Industria)',
        icon: 'Cog',
        meaning: 'Representado por la rueda dentada o piñón, símbolo de la fuerza productiva, la transformación manufacturera, la metalmecánica y la tecnología industrial.'
      },
      {
        part: 'Sector Terciario (Comercio y Servicios)',
        icon: 'Briefcase',
        meaning: 'Representado por el caduceo con las alas y los rayos de energía, evocando la actividad mercantil, las comunicaciones, las TIC y los servicios especializados.'
      }
    ]
  },
  {
    id: 'bandera',
    name: 'La Bandera del SENA',
    description: 'Símbolo de paz y pureza con el escudo en el centro en tono verde institucional.',
    details: [
      {
        part: 'Fondo Blanco',
        icon: 'Flag',
        meaning: 'Representa la tranquilidad, la paz, la transparencia institucional y la libertad que brinda el conocimiento.'
      },
      {
        part: 'Escudo Verde Institucional',
        icon: 'Shield',
        meaning: 'El color verde (#39A900) encarna la esperanza viva de la juventud colombiana, el trabajo digno y la riqueza natural del país.'
      }
    ]
  },
  {
    id: 'logosimbolo',
    name: 'El Logo-Símbolo',
    description: 'La silueta del ser humano en marcha activa hacia el futuro.',
    details: [
      {
        part: 'El Aprendiz Caminante',
        icon: 'UserCheck',
        meaning: 'Un ser humano que avanza con paso firme por un sendero de superación constante, con la mirada al frente.'
      },
      {
        part: 'Brazos Abiertos',
        icon: 'Sparkles',
        meaning: 'Simboliza la recepción generosa del conocimiento técnico y científico y la disposición a transformar la sociedad con vocación de servicio.'
      }
    ]
  },
  {
    id: 'himno',
    name: 'El Himno Institucional',
    author: 'Letra: Jesús Hermán Berrío Ortiz | Música: Daniel Marles E.',
    description: 'Canto patriótico de superación y amor por Colombia entonado en todos los actos institucionales del SENA.',
    lyrics: [
      {
        stanza: 'Coro',
        lines: [
          'Estudiantes del SENA, ¡adelante!',
          'por Colombia luchad con amor,',
          'con el ánimo noble y constante,',
          'al trabajo responded con valor.'
        ]
      },
      {
        stanza: 'Estrofa I',
        lines: [
          'En la forja del SENA se forman',
          'hombres libres que saben triunfar;',
          'con la ciencia y la técnica aprenden',
          'a Colombia servir y honrar.'
        ]
      },
      {
        stanza: 'Estrofa II',
        lines: [
          'Hoy la patria nos llama al trabajo,',
          'al trabajo fecundo y creador;',
          'con esfuerzo, constancia y denuedo,',
          'construyamos un mundo mejor.'
        ]
      }
    ]
  }
];

export const SENA_VALUES = [
  { name: 'Honestidad', description: 'Actuar siempre con fundamento en la verdad, la transparencia y la rectitud moral.' },
  { name: 'Respeto', description: 'Reconocer, valorar y tratar de manera digna a todas las personas y la diversidad del país.' },
  { name: 'Compromiso', description: 'Asumir con devoción y disciplina el proceso formativo y el bienestar de la comunidad.' },
  { name: 'Diligencia', description: 'Cumplir los deberes y actividades con prontitud, esmero y búsqueda de la excelencia.' },
  { name: 'Justicia y Equidad', description: 'Garantizar igualdad de oportunidades, mérito y trato imparcial para todos los aprendices.' },
  { name: 'Librepensamiento', description: 'Fomentar el espíritu crítico constructivo, la creatividad y el debate respetuoso de ideas.' },
  { name: 'Solidaridad', description: 'Apoyar activamente a los compañeros, la comunidad y las causas que dignifican la sociedad.' }
];

export const PEDAGOGICAL_MODEL = {
  concept: 'Formación Profesional Integral (FPI)',
  description: 'Proceso teórico-práctico de carácter integral orientado al desarrollo de conocimientos técnicos, habilidades tecnológicas y actitudes/valores para la convivencia social y productiva.',
  dimensions: [
    { title: 'Saber', desc: 'Apropiación de conceptos, teorías, principios científicos y fundamentos técnicos.' },
    { title: 'Saber Hacer', desc: 'Desarrollo de destrezas operativas, prácticas y metodológicas para resolver problemas reales.' },
    { title: 'Saber Ser', desc: 'Valores éticos, responsabilidad cívica, trabajo en equipo y liderazgo asertivo.' }
  ],
  projectPhases: [
    { number: '01', name: 'Fase de Análisis', desc: 'Diagnóstico de la problemática o necesidad en el entorno real o productivo.' },
    { number: '02', name: 'Fase de Planeación', desc: 'Diseño de la propuesta, cronograma, recursos técnicos y formulación del proyecto.' },
    { number: '03', name: 'Fase de Ejecución', desc: 'Desarrollo del prototipo, producto o servicio aplicando las competencias adquiridas.' },
    { number: '04', name: 'Fase de Evaluación', desc: 'Verificación del cumplimiento de los resultados de aprendizaje y valoración del impacto.' }
  ],
  stages: [
    {
      name: 'Etapa Lectiva',
      subtitle: 'Adquisición de Competencias',
      desc: 'Periodo formativo en ambientes presenciales, talleres especializados o aulas virtuales LMS Zajuna. Se desarrollan las guías de aprendizaje y se entregan evidencias de conocimiento, desempeño y producto.',
      evaluation: 'Juicios Evaluativos: A (Aprobado) o D (Deficiente / No Aprobado).'
    },
    {
      name: 'Etapa Productiva',
      subtitle: 'Aplicación en el Mundo Real',
      desc: 'Periodo en el que el aprendiz aplica, complementa y consolida sus competencias en un entorno laboral real empresarial o institucional.',
      evaluation: 'Seguimiento por instructor tutor y concertación del plan de trabajo productivo.'
    }
  ],
  productiveAlternatives: [
    {
      id: 'contrato_aprendizaje',
      name: 'Contrato de Aprendizaje (Ley 789 de 2002)',
      tagline: 'Vínculo directo con una empresa patrocinadora',
      benefits: 'Apoyo de sostenimiento mensual (50% SMLMV en lectiva, 75%-100% en productiva) + Afiliación a EPS y ARL.',
      idealFor: 'Aprendices que buscan inserción inmediata en empresas del sector privado formal.'
    },
    {
      id: 'proyecto_productivo',
      name: 'Proyecto Productivo / Fondo Emprender',
      tagline: 'Creación de tu propio emprendimiento',
      benefits: 'Desarrollo de un modelo de negocio con acompañamiento de gestores SENA y opción de capital semilla condonable.',
      idealFor: 'Aprendices con espíritu emprendedor que tienen una idea innovadora y validada.'
    },
    {
      id: 'vinculo_laboral',
      name: 'Vínculo Laboral o Contractual Previo',
      tagline: 'Validación en tu empleo actual afín',
      benefits: 'Homologación de la etapa productiva si las funciones del cargo actual corresponden exactamente al programa.',
      idealFor: 'Aprendices que ya trabajan en empresas desarrollando funciones del área técnica que estudian.'
    },
    {
      id: 'pasantia',
      name: 'Pasantía en Pyme o Entidad Pública',
      tagline: 'Práctica concertada mediante convenio',
      benefits: 'Experiencia laboral en organizaciones no gubernamentales, alcaldías o pymes sin intermediación contractual compleja.',
      idealFor: 'Aprendices en áreas de impacto social, ambiental, comunitario o institucional.'
    },
    {
      id: 'monitoria',
      name: 'Monitoría Institucional en el SENA',
      tagline: 'Apoyo formativo a centros de formación',
      benefits: 'Apoyo de sostenimiento de monitoría y certificación de experiencia directa dentro de los centros del SENA.',
      idealFor: 'Aprendices con rendimiento sobresaliente que desean apoyar a instructores y compañeros.'
    }
  ]
};

export const REGULATIONS_SUMMARY = {
  normative: 'Acuerdo 009 (Reglamento del Aprendiz Actualizado)',
  versionNotice: 'Versión oficial actualizada expedida por el Consejo Directivo Nacional del SENA, derogando y modernizando las disposiciones del Acuerdo 007 de 2012.',
  novelties: [
    { title: 'Enfoque de Derechos e Inclusión', desc: 'Garantía explícita de no discriminación, equidad de género, enfoque diferencial y respeto irrestricto a la diversidad cultural y libre desarrollo de la personalidad.' },
    { title: 'Ciberconvivencia y Entornos Virtuales', desc: 'Reglas de netiqueta, uso ético y responsable de plataformas digitales (LMS Zajuna, foros, correo), inteligencia artificial y protección de datos personales.' },
    { title: 'Debido Proceso y Garantías', desc: 'Fortalecimiento de la presunción de inocencia, contradicción probatoria, tiempos procesales claros y recurso de reposición ante el Subdirector de Centro.' },
    { title: 'Trámites de Formación Clarificados', desc: 'Procedimientos expeditos y digitalizados para traslados, aplazamientos justificados (hasta 6 meses prorrogables), reingreso y retiro voluntario.' }
  ],
  rights: [
    'Recibir formación profesional integral de calidad acorde al programa y modalidad (presencial, virtual o a distancia).',
    'Garantía de un ambiente formativo libre de discriminación, acoso, violencia de género o cualquier tipo de estigmatización.',
    'Disfrutar de los programas y beneficios del Plan Nacional de Bienestar al Aprendiz (salud, deporte, cultura, apoyos económicos).',
    'Conocer oportunamente las evaluaciones, retroalimentación pedagógica y solicitar revisión técnica o segundo evaluador dentro de los dos (2) días hábiles.',
    'Elegir y ser elegido democráticamente como Vocero de Ficha o Representante de Aprendices ante el Comité y el Consejo.',
    'Libertad de pensamiento, expresión respetuosa y participación en actividades académicas, científicas e innovadoras (SENNOVA).',
    'Acceder a los recursos formativos, conectividad, bibliotecas físicas/virtuales, laboratorios y plataformas del SENA (SOFIA Plus / Zajuna).',
    'Recibir el carné institucional y acceder al acompañamiento psicosocial y pedagógico para el éxito formativo.',
    'Tramitar solicitudes de traslado, aplazamiento justificado, reingreso y retiro voluntario conforme al procedimiento reglamentario.'
  ],
  duties: [
    'Cumplir con las actividades curriculares, guías de aprendizaje, cronogramas y entregas en ambientes físicos y virtuales.',
    'Portar visiblemente el carné institucional dentro de las sedes y ambientes de formación del SENA y empresas patrocinadoras.',
    'Usar los elementos de protección personal (EPP) y la indumentaria reglamentaria exigida en talleres, laboratorios y áreas técnicas.',
    'Justificar formalmente las inasistencias por escrito o vía plataforma dentro de los tres (3) días hábiles siguientes al suceso.',
    'Observar normas de ciberconvivencia, netiqueta y respeto en foros virtuales, clases sincrónicas y canales digitales institucionales.',
    'Garantizar probidad académica: no incurrir en plagio, copia no autorizada, fraude o suplantación en evidencias formativas.',
    'Hacer uso ético de tecnologías e inteligencia artificial, declarando transparentemente fuentes y autorías.',
    'Cuidar los bienes muebles, inmuebles, herramientas, software y recursos naturales de la entidad.',
    'Tratar con dignidad, respeto y empatía a instructores, compañeros, directivos y a toda la comunidad educativa.'
  ],
  academicProcedures: [
    { name: 'Aplazamiento', desc: 'Solicitud justificada de suspensión temporal de la formación por hasta seis (6) meses prorrogables debidamente soportada.' },
    { name: 'Traslado', desc: 'Cambio de centro de formación, de jornada o de programa de formación afín, supeditado a disponibilidad de cupo y pertinencia.' },
    { name: 'Reingreso', desc: 'Solicitud formal para retomar la formación tras vencerse un aplazamiento o retiro autorizado dentro de los plazos.' },
    { name: 'Retiro Voluntario', desc: 'Renuncia expresa y formal al cupo por parte del aprendiz radicada en SOFIA Plus, evitando causal de deserción.' },
    { name: 'Deserción', desc: 'Inasistencia injustificada durante tres (3) días hábiles continuos en presencial, o tres (3) reportes en virtual, o no reingreso tras aplazamiento.' }
  ],
  faultTypes: [
    {
      type: 'Falta Académica',
      desc: 'Infracción que afecta directamente el desarrollo de competencias formativas (incumplimiento no justificado de evidencias, plagio, no participación en proyectos formativos).'
    },
    {
      type: 'Falta Disciplinaria',
      desc: 'Conducta que vulnera la convivencia pacífica, la ciberconvivencia, el respeto, la integridad moral, la seguridad física o los bienes del SENA y sus aliados.'
    }
  ],
  gravityLevels: [
    { level: 'Leve', criteria: 'Conducta que no genera daño grave a la comunidad ni paraliza el proceso formativo, tratable con diálogo y orientación pedagógica inmediata.' },
    { level: 'Grave', criteria: 'Hechos que comprometen el rendimiento grupal, la seguridad institucional, actos de discriminación, ciberacoso o plagio reiterado.' },
    { level: 'Gravísima', criteria: 'Violencia física o psicológica, porte de armas, comercialización de sustancias ilícitas, delitos informáticos o fraude deliberado.' }
  ],
  measures: {
    formativas: [
      { name: 'Llamado de atención verbal', desc: 'Acción dialógica y pedagógica inmediata entre instructor y aprendiz para concertar compromisos.' },
      { name: 'Plan de Mejoramiento Académico o Disciplinario', desc: 'Acuerdo formativo con tareas pedagógicas específicas y término perentorio para subsanar deficiencias.' }
    ],
    sancionatorias: [
      { name: 'Llamado de atención escrito con copia a hoja de vida', desc: 'Sanción adoptada mediante acto administrativo tras audiencia en Comité de Evaluación.' },
      { name: 'Condicionamiento de matrícula', desc: 'Pérdida temporal de beneficios y sujeción estricta al cumplimiento del plan de seguimiento.' },
      { name: 'Cancelación de matrícula', desc: 'Pérdida definitiva de la calidad de aprendiz SENA con inhabilidad temporal para reingreso a la entidad.' }
    ]
  }
};

export const DILEMMA_CASES: DilemmaCase[] = [
  {
    id: 'caso_1_inasistencia',
    title: 'Caso 1: Inasistencia Imprevista por Fuerza Mayor',
    character: 'Camila Ospina',
    role: 'Aprendiz de Gestión Administrativa',
    situation: 'Camila tuvo una emergencia de salud debidamente certificada por su EPS y no pudo asistir a clases presenciales ni presentar una evidencia clave durante 2 días.',
    options: [
      {
        text: 'Esperar a que termine el trimestre para hablar con el instructor y mostrarle las incapacidades.',
        isCorrect: false,
        feedback: 'Incorrecto. Si dejas pasar el tiempo legal estipulado en el Reglamento, se considerará deserción no justificada.',
        sanctionOrRule: 'Art. 22 del Reglamento: Las inasistencias deben justificarse formalmente a más tardar dentro de los 3 días hábiles siguientes.'
      },
      {
        text: 'Radicar la justificación médica por escrito y a través de SOFIA Plus / correo al instructor dentro de los 3 días hábiles siguientes.',
        isCorrect: true,
        feedback: '¡Excelente! El Reglamento del Aprendiz establece un plazo de hasta tres (3) días hábiles posteriores a la inasistencia para radicar la justificación médica o de fuerza mayor.',
        sanctionOrRule: 'Reglamento del Aprendiz, Capítulo VIII: El instructor concertará con Camila la entrega de las evidencias pendientes sin penalización injusta.'
      },
      {
        text: 'Pedirle a un compañero que firme la asistencia por ella para no tener problemas en la lista.',
        isCorrect: false,
        feedback: 'Grave error. Suplantar firmas o falsificar asistencia constituye una Falta Disciplinaria Grave que acarrea Comité de Evaluación.',
        sanctionOrRule: 'Art. 9 y 10: Falsedad o fraude en registros es causal de llamado de atención escrito o condicionamiento.'
      }
    ]
  },
  {
    id: 'caso_2_plagio',
    title: 'Caso 2: Evidencia Grupal y Originalidad Académica',
    character: 'Mateo y Julián',
    role: 'Aprendices de Desarrollo de Software',
    situation: 'Para una entrega de proyecto, Mateo copió textualmente el código fuente y el informe técnico de un grupo del año pasado sin citar ni adaptar, y lo subió al LMS Zajuna a nombre de su equipo.',
    options: [
      {
        text: 'Es una práctica permitida porque todo el conocimiento en internet y en el SENA es de dominio público.',
        isCorrect: false,
        feedback: 'Falso. Aunque el software libre promueve compartir, apropiarse de trabajos ajenos sin autoría ni desarrollo propio es plagio.',
        sanctionOrRule: 'Código Penal Colombiano y Reglamento SENA: El plagio vulnera la propiedad intelectual y la honestidad.'
      },
      {
        text: 'El instructor identificará la copia, anulará la evidencia con juicio D (Deficiente) y remitirá el caso a Comité de Evaluación y Seguimiento por Falta Académica Grave.',
        isCorrect: true,
        feedback: '¡Correcto! El plagio o fraude en evidencias atenta contra el principio de honestidad institucional y conlleva sanción disciplinaria y académica según el Reglamento.',
        sanctionOrRule: 'Art. 10 num. 19: Plagiar o presentar como propios trabajos ajenos es falta grave sancionable.'
      },
      {
        text: 'Basta con pedirle perdón al compañero del año pasado por chat privado para solucionar la falta.',
        isCorrect: false,
        feedback: 'Incorrecto. La falta cometida es frente a la institución y al proceso evaluativo, requiriendo el debido proceso formativo.',
        sanctionOrRule: 'Debe realizarse el debido proceso ante el Comité de Evaluación y Seguimiento.'
      }
    ]
  },
  {
    id: 'caso_3_calificacion',
    title: 'Caso 3: Desacuerdo con una Calificación Deficiente (D)',
    character: 'Sofia Morales',
    role: 'Aprendiz de Producción Multimedia',
    situation: 'Sofia recibió un juicio evaluativo D en una evidencia que considera que cumplió todos los criterios de la Guía de Aprendizaje. El instructor se niega a revisar su explicación.',
    options: [
      {
        text: 'Generar desorden en el ambiente de formación y no volver a asistir a esa clase.',
        isCorrect: false,
        feedback: 'Inadecuado. El desacuerdo académico nunca justifica el desacato de los deberes de convivencia ni la deserción.',
        sanctionOrRule: 'Reglamento: Todo conflicto debe gestionarse por las vías institucionales de diálogo y debido proceso.'
      },
      {
        text: 'Hacer uso de su Derecho como Aprendiz solicitando respetuosamente por escrito la designación de un Segundo Evaluador dentro de los 2 días hábiles siguientes.',
        isCorrect: true,
        feedback: '¡Totalmente acertado! El Reglamento otorga al aprendiz el derecho de solicitar por escrito la revisión y la designación de un segundo evaluador idóneo ante el Coordinador Académico.',
        sanctionOrRule: 'Art. 7 num. 4 del Reglamento: Derecho a solicitar revisión de evaluaciones dentro de los dos (2) días hábiles siguientes a la publicación.'
      },
      {
        text: 'Renunciar al programa porque en el SENA no existen instancias de apelación.',
        isCorrect: false,
        feedback: 'Falso. El SENA cuenta con Coordinación Académica, Comité de Evaluación y debido proceso que ampara los derechos de los aprendices.',
        sanctionOrRule: 'El SENA garantiza el derecho constitucional al debido proceso y contradicción.'
      }
    ]
  }
];

export const WELLNESS_DIMENSIONS = [
  {
    title: 'Salud Integral',
    icon: 'HeartPulse',
    desc: 'Jornadas de salud oral, medicina preventiva, vacunación, salud sexual y reproductiva y primeros auxilios en el centro.'
  },
  {
    title: 'Deporte y Recreación',
    icon: 'Trophy',
    desc: 'Torneos deportivos intercentros (fútbol, voleibol, baloncesto, atletismo), pausas activas y fomento de hábitos saludables.'
  },
  {
    title: 'Arte y Cultura',
    icon: 'Palette',
    desc: 'Talleres de danzas tradicionales, música, teatro, literatura y festivales culturales nacionales de aprendices.'
  },
  {
    title: 'Liderazgo y Participación',
    icon: 'Users',
    desc: 'Escuela de líderes SENA, elección de voceros de ficha, representantes de aprendices y comités de convivencia.'
  },
  {
    title: 'Apoyos Socioeconómicos',
    icon: 'BadgePercent',
    desc: 'Apoyos de sostenimiento FIC para aprendices de bajos recursos, bonos alimentarios y monitorías académicas.'
  },
  {
    title: 'Acompañamiento Psicosocial',
    icon: 'Smile',
    desc: 'Asesoría y orientación psicológica confidencial para manejo del estrés, resolución de conflictos y proyecto de vida.'
  }
];

export const ECOSYSTEM_SERVICES = [
  {
    name: 'Fondo Emprender',
    badge: 'Capital Semilla',
    desc: 'Fondo público creado por la Ley 789 de 2002 para financiar iniciativas empresariales de aprendices y egresados SENA con recursos condonables.',
    actionUrl: 'https://www.fondoemprender.com'
  },
  {
    name: 'Agencia Pública de Empleo (APE)',
    badge: 'Intermediación Laboral Gratuita',
    desc: 'Plataforma oficial donde empresas colombianas publican miles de vacantes exclusivas para técnicos, tecnólogos y profesionales.',
    actionUrl: 'https://ape.sena.edu.co'
  },
  {
    name: 'SENNOVA',
    badge: 'Investigación & Innovación',
    desc: 'Sistema de Investigación, Desarrollo Tecnológico e Innovación del SENA que impulsa semilleros de investigación y patentes con aprendices.',
    actionUrl: 'https://www.sena.edu.co'
  },
  {
    name: 'Tecnoparques & Tecnoacademias',
    badge: 'Aceleración Tecnológica 4.0',
    desc: 'Laboratorios de prototipado rápido en nanotecnología, robótica, biotecnología e internet de las cosas (IoT) sin costo alguno.',
    actionUrl: 'https://tecnoparque.sena.edu.co'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'FPI (Formación Profesional Integral)',
    category: 'Pedagogía',
    definition: 'Modelo pedagógico propio del SENA que fusiona el desarrollo de competencias técnicas con valores humanísticos, éticos y cívicos.'
  },
  {
    term: 'Resultado de Aprendizaje (RAP)',
    category: 'Pedagogía',
    definition: 'Logros y desempeños específicos que el aprendiz debe alcanzar y evidenciar en cada competencia de su programa de formación.'
  },
  {
    term: 'Criterio de Evaluación',
    category: 'Pedagogía',
    definition: 'Estándar o parámetro de calidad mediante el cual el instructor valora si la evidencia presentada cumple con el nivel requerido.'
  },
  {
    term: 'Guía de Aprendizaje',
    category: 'Pedagogía',
    definition: 'Documento orientador diseñado por los instructores que contiene las actividades, recursos y evidencias que el aprendiz debe desarrollar.'
  },
  {
    term: 'Evidencia (Conocimiento, Desempeño y Producto)',
    category: 'Pedagogía',
    definition: 'Pruebas tangibles que demuestra el aprendiz: evaluaciones escritas (Conocimiento), observación en taller (Desempeño) y entregables finales (Producto).'
  },
  {
    term: 'Juicio Evaluativo (A / D)',
    category: 'Pedagogía',
    definition: 'En el SENA no se usan notas de 1 a 5. Se emite "A" para Aprobado (superó el 100% de los criterios) o "D" para Deficiente (no superó los criterios y requiere mejora).'
  },
  {
    term: 'Ficha de Caracterización',
    category: 'Institucional',
    definition: 'Número único e irrepetible (código de 7 u 8 dígitos) que identifica a un grupo específico matriculado en un programa de formación del SENA.'
  },
  {
    term: 'LMS Zajuna',
    category: 'Plataformas',
    definition: 'Plataforma oficial de gestión del aprendizaje en línea del SENA, donde los aprendices acceden a contenidos, foros, tareas y evaluaciones.'
  },
  {
    term: 'SENA SOFIA Plus',
    category: 'Plataformas',
    definition: 'Sistema Optimizado para la Formación Integral del Aprendizaje activo. Portal institucional para inscripciones, certificados y registro académico.'
  },
  {
    term: 'Vocero de Ficha',
    category: 'Reglamento',
    definition: 'Aprendiz elegido democráticamente por sus compañeros de grupo para actuar como puente de comunicación asertiva con los instructores y la coordinación.'
  },
  {
    term: 'Comité de Evaluación y Seguimiento',
    category: 'Reglamento',
    definition: 'Instancia colegiada del centro conformada por instructores, coordinadores y representantes que analiza casos académicos y disciplinarios garantizando el debido proceso.'
  },
  {
    term: 'Deserción',
    category: 'Reglamento',
    definition: 'Inasistencia injustificada de tres (3) días consecutivos en presencial o virtual, o no reintegro tras un plazo establecido, lo que inicia el trámite de cancelación de matrícula.'
  },
  {
    term: 'Reglamento del Aprendiz (Acuerdo 009)',
    category: 'Reglamento',
    definition: 'Estatuto normativo vigente expedido por el Consejo Directivo Nacional que compila los derechos, deberes, ciberconvivencia, trámites y debido proceso del aprendiz SENA.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    moduleId: 'identidad',
    question: '¿En qué año y por quién fue fundado el Servicio Nacional de Aprendizaje SENA?',
    options: [
      'En 1957 por Rodolfo Martínez Tono mediante el Decreto Ley 118.',
      'En 1970 por Carlos Lleras Restrepo mediante la Ley 119.',
      'En 1991 por la Asamblea Nacional Constituyente.',
      'En 1948 durante el gobierno de Mariano Ospina Pérez.'
    ],
    correctAnswer: 0,
    explanation: 'El SENA fue fundado el 21 de junio de 1957 gracias a la visión de Rodolfo Martínez Tono y el consenso entre empresarios, trabajadores y el Estado colombiano.'
  },
  {
    id: 2,
    moduleId: 'identidad',
    question: 'En el escudo oficial del SENA, ¿qué representa la rueda dentada o piñón?',
    options: [
      'El sector agropecuario y campesino.',
      'El sector secundario de la economía: la industria, metalmecánica y manufactura.',
      'El comercio y los servicios financieros.',
      'La tecnología espacial y las telecomunicaciones.'
    ],
    correctAnswer: 1,
    explanation: 'El piñón representa la industria y la fuerza transformadora manufacturera (Sector Secundario).'
  },
  {
    id: 3,
    moduleId: 'identidad',
    question: '¿Cuál es el significado del Logo-Símbolo del SENA?',
    options: [
      'Una montaña que simboliza los Andes colombianos.',
      'Un árbol de café floreciendo.',
      'Un ser humano que marcha con paso firme hacia el futuro con brazos abiertos recibiendo y dando conocimiento.',
      'Un compás y una escuadra de arquitectura.'
    ],
    correctAnswer: 2,
    explanation: 'El logo-símbolo muestra a un aprendiz en movimiento ascendente con actitud abierta y transformadora.'
  },
  {
    id: 4,
    moduleId: 'modelo',
    question: '¿Cuáles son las tres dimensiones de la competencia en el Modelo Pedagógico SENA?',
    options: [
      'Memorizar, Repetir y Calificar.',
      'Saber (Conocimiento), Saber Hacer (Habilidad técnica) y Saber Ser (Valores y actitudes).',
      'Teoría básica, Examen escrito y Pasantía.',
      'Investigación pura, Publicación y Grado.'
    ],
    correctAnswer: 1,
    explanation: 'La Formación Profesional Integral (FPI) del SENA desarrolla de manera armónica el Saber, el Saber Hacer y el Saber Ser.'
  },
  {
    id: 5,
    moduleId: 'modelo',
    question: '¿Cuáles son las 4 fases de la formación por proyectos en el SENA?',
    options: [
      'Inicio, Nudo, Desenlace y Conclusión.',
      'Análisis, Planeación, Ejecución y Evaluación.',
      'Cotización, Facturación, Entrega y Cobro.',
      'Matrícula, Lectiva, Productiva y Grado.'
    ],
    correctAnswer: 1,
    explanation: 'La metodología de proyectos formativos se estructura en cuatro fases cíclicas: Análisis, Planeación, Ejecución y Evaluación.'
  },
  {
    id: 6,
    moduleId: 'modelo',
    question: 'En el sistema de evaluación del SENA, ¿cuáles son las calificaciones posibles?',
    options: [
      'Notas cuantitativas de 1.0 a 5.0.',
      'Sobresaliente, Bueno, Regular e Insuficiente.',
      'A (Aprobado) o D (Deficiente / No Aprobado).',
      'Aprobado con honores o Reprobado con multa.'
    ],
    correctAnswer: 2,
    explanation: 'En el SENA la evaluación es por criterios de competencia: se emite juicio "A" si el aprendiz alcanza el logro, o "D" si aún debe desarrollar la competencia.'
  },
  {
    id: 7,
    moduleId: 'reglamento',
    question: 'De acuerdo con el Reglamento del Aprendiz SENA (Acuerdo 009 actualizado), ¿cuánto tiempo tiene un aprendiz para radicar la justificación formal de una inasistencia?',
    options: [
      'Hasta el último día del mes en curso.',
      'Máximo tres (3) días hábiles siguientes a la inasistencia.',
      'Quince (15) días calendario.',
      'No es necesario justificar si avisa por WhatsApp al monitor.'
    ],
    correctAnswer: 1,
    explanation: 'El aprendiz debe presentar los soportes legítimos por escrito o vía plataforma a más tardar dentro de los 3 días hábiles posteriores a la inasistencia según el Acuerdo 009.'
  },
  {
    id: 8,
    moduleId: 'reglamento',
    question: 'Si un aprendiz está en desacuerdo con un juicio evaluativo y no llega a un acuerdo con el instructor, ¿cuál es su derecho?',
    options: [
      'Solicitar por escrito la asignación de un Segundo Evaluador dentro de los 2 días hábiles siguientes.',
      'Demandar inmediatamente a la institución ante los tribunales.',
      'Repetir todo el programa de formación desde el primer trimestre.',
      'Bloquear el acceso a la sede de formación.'
    ],
    correctAnswer: 0,
    explanation: 'El reglamento consagra el derecho a solicitar una segunda evaluación técnica ante la Coordinación Académica en un término de 2 días hábiles.'
  },
  {
    id: 9,
    moduleId: 'bienestar',
    question: '¿Qué es el Fondo Emprender del SENA?',
    options: [
      'Un banco comercial que cobra intereses altos a los estudiantes.',
      'Un fondo de capital semilla condonable para financiar ideas de negocio viables de aprendices y egresados.',
      'Una cooperativa de crédito para comprar computadores.',
      'Un subsidio de transporte exclusivo para la ciudad de Bogotá.'
    ],
    correctAnswer: 1,
    explanation: 'El Fondo Emprender apoya la creación de empresas creadas por aprendices y egresados SENA con capital semilla que puede ser 100% condonable si se cumplen las metas.'
  },
  {
    id: 10,
    moduleId: 'bienestar',
    question: '¿Qué servicio gratuito del SENA conecta a los aprendices y egresados con vacantes del mercado laboral formal en Colombia?',
    options: [
      'La Agencia Pública de Empleo (APE).',
      'El Fondo Nacional del Ahorro.',
      'El Ministerio de Hacienda.',
      'La Bolsa de Valores de Colombia.'
    ],
    correctAnswer: 0,
    explanation: 'La Agencia Pública de Empleo (APE) es el servicio público y gratuito del SENA de intermediación laboral para todo el país.'
  }
];
