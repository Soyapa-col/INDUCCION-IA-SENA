export interface RegulationQuizQuestion {
  id: number;
  sectionId: 'derechos' | 'deberes' | 'tramites' | 'desercion' | 'faltas';
  sectionTitle: string;
  sectionIcon: string;
  question: string;
  options: string[];
  correctAnswer: number;
  positiveFeedback: string;
  whyWrongFeedback: string;
  regulatoryArticle: string;
}

export interface RegulationSectionInfo {
  id: 'derechos' | 'deberes' | 'tramites' | 'desercion' | 'faltas';
  title: string;
  subtitle: string;
  iconName: string;
  questionCount: number;
}

export const REGULATION_SECTIONS: RegulationSectionInfo[] = [
  {
    id: 'derechos',
    title: 'Derechos del Aprendiz',
    subtitle: 'Garantías, debido proceso, dotación EPP e inclusión',
    iconName: 'Scale',
    questionCount: 5
  },
  {
    id: 'deberes',
    title: 'Deberes & Ciberconvivencia',
    subtitle: 'Ética digital, redes sociales, carné y normas de convivencia',
    iconName: 'ShieldCheck',
    questionCount: 5
  },
  {
    id: 'tramites',
    title: 'Trámites Académicos & Registro',
    subtitle: 'Aplazamiento, traslado, reingreso y retiro voluntario',
    iconName: 'FileText',
    questionCount: 5
  },
  {
    id: 'desercion',
    title: 'Incumplimientos & Deserción',
    subtitle: 'Inasistencias presenciales, plataforma LMS y justificaciones',
    iconName: 'AlertTriangle',
    questionCount: 5
  },
  {
    id: 'faltas',
    title: 'Faltas & Medidas Formativas',
    subtitle: 'Llamados de atención, planes de mejoramiento y sanciones',
    iconName: 'Gavel',
    questionCount: 5
  }
];

export const REGULATION_QUIZ_QUESTIONS: RegulationQuizQuestion[] = [
  // ==================== SECCIÓN 1: DERECHOS DEL APRENDIZ (5 preguntas) ====================
  {
    id: 1,
    sectionId: 'derechos',
    sectionTitle: 'Sección 1 · Derechos del Aprendiz',
    sectionIcon: 'Scale',
    question: 'Según el Acuerdo 009 de 2024, ¿cuál de las siguientes opciones constituye un derecho fundamental inalienable de todo aprendiz matriculado en el SENA?',
    options: [
      'Exigir que las evaluaciones sean aprobadas sin presentar evidencias prácticas.',
      'Recibir oportunamente los Elementos de Protección Personal (EPP) y tener acceso a la infraestructura y tecnología del Centro de Formación.',
      'Ingresar al Centro de Formación sin portar el carné institucional visible.',
      'Delegar en un compañero la presentación de sus pruebas y proyectos.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Excelente! Has identificado el derecho consagrado a recibir formación de calidad con acceso a recursos, tecnología e insumos de seguridad (EPP) en ambientes de aprendizaje.',
    whyWrongFeedback: 'Error de concepto: El Acuerdo 009 exige el porte obligatorio del carné y la sustentación individual de evidencias. El derecho real es el acceso a la infraestructura tecnológica y a la dotación de protección personal.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Derechos del Aprendiz (Numeral 1 y 2)'
  },
  {
    id: 2,
    sectionId: 'derechos',
    sectionTitle: 'Sección 1 · Derechos del Aprendiz',
    sectionIcon: 'Scale',
    question: 'Si un aprendiz está en desacuerdo técnico justificado con la calificación o juicio evaluativo emitido por su instructor, ¿qué derecho procedimental le asiste?',
    options: [
      'Solicitar formalmente por escrito la asignación de un Segundo Evaluador ante la Coordinación Académica dentro de los 2 días hábiles siguientes.',
      'Publicar una queja en redes sociales institucionales contra el instructor.',
      'Abandonar la formación y reiniciar en el siguiente año sin avisar.',
      'Exigir que la calificación sea cambiada automáticamente a "Aprobado".'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Respuesta impecable! El debido proceso garantiza el derecho al Segundo Evaluador radicado en un término de 2 días hábiles tras la publicación del juicio.',
    whyWrongFeedback: 'Fallaste en el procedimiento: El conducto regular reglamentario no permite vías de hecho ni redes sociales; garantiza el derecho formal a solicitar un Segundo Evaluador ante la Coordinación dentro de 2 días hábiles.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Garantías del Debido Proceso y Juicio Evaluativo'
  },
  {
    id: 3,
    sectionId: 'derechos',
    sectionTitle: 'Sección 1 · Derechos del Aprendiz',
    sectionIcon: 'Scale',
    question: '¿Qué protección especial reconoce explícitamente el nuevo marco del Acuerdo 009 en concordancia con la Ley 2394 de 2024?',
    options: [
      'Exoneración permanente de la etapa productiva a cualquier aprendiz.',
      'Protección reforzada de derechos a estudiantes gestantes, en periodo de lactancia y licencias de paternidad con ajustes pedagógicos.',
      'Entrega de subsidios económicos sin importar el estrato o la asistencia.',
      'Permiso para no presentar planes de mejoramiento.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Muy bien! El nuevo reglamento incorpora la Ley 2394 de 2024 garantizando flexibilidad pedagógica y protección integral a la maternidad y paternidad.',
    whyWrongFeedback: 'Atención a la normativa: La etapa productiva y los planes de mejoramiento siguen siendo obligatorios; la novedad legal es la protección a madres gestantes, lactancia y paternidad.',
    regulatoryArticle: 'Acuerdo 009 de 2024 & Ley 2394 de 2024 · Enfoque de Protección y Género'
  },
  {
    id: 4,
    sectionId: 'derechos',
    sectionTitle: 'Sección 1 · Derechos del Aprendiz',
    sectionIcon: 'Scale',
    question: 'En caso de que un aprendiz sea citado a Comité de Evaluación y Seguimiento, ¿cuál es su derecho durante todo el trámite?',
    options: [
      'Ser juzgado en audiencia privada sin conocer los informes de los instructores.',
      'Ejercer el derecho a la defensa, ser escuchado, presentar descargos, aportar pruebas y estar acompañado por un representante.',
      'Negarse a asistir al comité sin que esto genere ningún efecto administrativo.',
      'Modificar las actas del comité unilateralmente.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Correcto! El debido proceso es un principio rector constitucional en el SENA: defensa, contradicción, presentación de pruebas y derecho a ser escuchado.',
    whyWrongFeedback: 'Recuerda: El comité no es secreto ni sanciona sin escuchar al aprendiz. El derecho fundamental es presentar descargos, pruebas y controvertir los hechos con plenas garantías.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Debido Proceso en Procedimientos Disciplinarios'
  },
  {
    id: 5,
    sectionId: 'derechos',
    sectionTitle: 'Sección 1 · Derechos del Aprendiz',
    sectionIcon: 'Scale',
    question: 'Respecto a los beneficios del Plan Nacional Integral de Bienestar al Aprendiz, ¿a qué tiene derecho el estudiante?',
    options: [
      'Acceso exclusivo únicamente si tiene el mejor promedio del centro.',
      'Participar en programas de salud integral, deporte, arte, cultura, liderazgo y convocatorias de apoyos de sostenimiento según requisitos.',
      'Recibir remuneración salarial completa sin firmar contrato de aprendizaje.',
      'Exigir que el SENA le pague la vivienda privada en cualquier ciudad.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Perfecto! Bienestar al Aprendiz es un derecho multidimensional enfocado en el desarrollo humano, cultural, recreativo y de apoyos socioeconómicos.',
    whyWrongFeedback: 'Equivocación común: Bienestar no es un beneficio para unos pocos ni otorga salarios; es un programa integral accesible mediante convocatorias públicas para deporte, salud y apoyos institucionales.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Derechos de Bienestar al Aprendiz'
  },

  // ==================== SECCIÓN 2: DEBERES, CIBERCONVIVENCIA & REDES (5 preguntas) ====================
  {
    id: 6,
    sectionId: 'deberes',
    sectionTitle: 'Sección 2 · Deberes y Ciberconvivencia',
    sectionIcon: 'ShieldCheck',
    question: 'En cuanto al porte del carné institucional en las sedes físicas y ambientes de aprendizaje del SENA, ¿cuál es el deber reglamentario?',
    options: [
      'Portarlo únicamente cuando haya visita de la Dirección General.',
      'Portarlo en lugar visible durante toda la permanencia en las instalaciones y presentarlo cada vez que sea requerido por personal autorizado.',
      'Prestar el carné a familiares o compañeros para que ingresen al Centro.',
      'Guardarlo en la billetera y no mostrarlo bajo ninguna circunstancia.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Excelente acierto! El carné es personal, intransferible y su porte visible es obligatorio por motivos de seguridad, convivencia e identificación institucional.',
    whyWrongFeedback: 'Error: El carné nunca es transferible y no es opcional guardarlo. El deber explícito es portarlo de manera visible en todo momento dentro del Centro.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Deberes del Aprendiz (Identificación y Seguridad)'
  },
  {
    id: 7,
    sectionId: 'deberes',
    sectionTitle: 'Sección 2 · Deberes y Ciberconvivencia',
    sectionIcon: 'ShieldCheck',
    question: 'En los ambientes virtuales (LMS Zajuna, foros, correo MiSENA y grupos académicos), ¿qué conducta constituye un deber ético de ciberconvivencia?',
    options: [
      'Compartir contraseñas de acceso con amigos para que adelanten tareas.',
      'Hacer uso respetuoso del lenguaje, proteger la identidad digital, evitar el ciberacoso y respetar la autoría intelectual.',
      'Descargar y distribuir software pirata usando la red WiFi del centro.',
      'Usar el correo institucional para cadenas de mensajes comerciales.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Gran respuesta! El Acuerdo 009 fortalece la ciberconvivencia responsable: netiqueta, respeto a la propiedad intelectual y prohibición de conductas de ciberacoso.',
    whyWrongFeedback: 'Te equivocaste: Compartir claves o usar redes institucionales para fines no académicos son faltas disciplinarias. El deber es mantener un trato ético, respetuoso y seguro en la red.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Deberes en Ambientes Virtuales de Aprendizaje'
  },
  {
    id: 8,
    sectionId: 'deberes',
    sectionTitle: 'Sección 2 · Deberes y Ciberconvivencia',
    sectionIcon: 'ShieldCheck',
    question: 'Respecto a la utilización de los uniformes o indumentaria técnica asignada para talleres y laboratorios, ¿cuál es la norma institucional?',
    options: [
      'Modificar el uniforme con logotipos de equipos de fútbol o marcas comerciales.',
      'Portarlo completo, limpio, en los días y horarios correspondientes, absteniéndose de usarlo en lugares que atenten contra la imagen institucional.',
      'Usar ropa de calle en laboratorios de química o maquinaria pesada.',
      'Vender el uniforme oficial a terceros ajenos a la entidad.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Muy bien! El uniforme proyecta la identidad y asegura las normas de bioseguridad en ambientes de aprendizaje especializados.',
    whyWrongFeedback: 'Cuidado: Alterar el uniforme o prescindir de él en talleres industriales vulnera las normas de bioseguridad y el código de imagen institucional.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Deberes sobre Imagen Institucional y Bioseguridad'
  },
  {
    id: 9,
    sectionId: 'deberes',
    sectionTitle: 'Sección 2 · Deberes y Ciberconvivencia',
    sectionIcon: 'ShieldCheck',
    question: '¿Qué deber tiene el aprendiz frente a los bienes, maquinaria, equipos y herramientas suministrados por el Centro de Formación?',
    options: [
      'Hacer uso exclusivo para las actividades formativas, velar por su conservación y reportar inmediatamente cualquier anomalía o daño.',
      'Retirar herramientas sin autorización para realizar trabajos particulares en casa.',
      'Desarmar los equipos para verificar cómo funcionan sin supervisión del instructor.',
      'Dejar la maquinaria encendida al terminar la jornada de formación.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Excelente! Los recursos del SENA son patrimonio público para el aprendizaje colectivo y exigen máximo cuidado y responsabilidad.',
    whyWrongFeedback: 'Ojo con este punto: Retirar herramientas o manipular equipos sin autorización constituye falta disciplinaria grave por afectación de bienes públicos.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Cuidado y Custodia de Bienes Públicos'
  },
  {
    id: 10,
    sectionId: 'deberes',
    sectionTitle: 'Sección 2 · Deberes y Ciberconvivencia',
    sectionIcon: 'ShieldCheck',
    question: 'De acuerdo con la Ley 2365 de 2024 incorporada al reglamento, ¿cuál es el deber fundamental frente a la convivencia y género?',
    options: [
      'Tolerar comentarios ofensivos o insinuaciones sexuales si son en tono de broma.',
      'Mantener relaciones interpersonales basadas en el respeto mutuo, erradicando cualquier manifestación de acoso sexual, discriminación o violencia de género.',
      'Resolver los desacuerdos personales mediante confrontación física fuera de la sede.',
      'Ignorar las rutas de atención y no denunciar conductas de hostigamiento.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Brillante! Tolerancia cero ante el acoso y violencia de género: el SENA protege la dignidad y el libre desarrollo de la personalidad con protocolos claros.',
    whyWrongFeedback: 'Fallaste: El acoso nunca es una broma. La Ley 2365 y el reglamento exigen una convivencia libre de discriminación y activación obligatoria de rutas de protección.',
    regulatoryArticle: 'Acuerdo 009 de 2024 & Ley 2365 de 2024 · Prevención de Acoso Sexual'
  },

  // ==================== SECCIÓN 3: TRÁMITES ACADÉMICOS & REGISTRO (5 preguntas) ====================
  {
    id: 11,
    sectionId: 'tramites',
    sectionTitle: 'Sección 3 · Trámites Académicos',
    sectionIcon: 'FileText',
    question: '¿Qué es el "Aplazamiento" de la formación y por cuánto tiempo máximo puede solicitarse según el reglamento?',
    options: [
      'La renuncia definitiva a los estudios sin opción de reingreso.',
      'La solicitud justificada de desvinculación temporal del programa hasta por un máximo de seis (6) meses prorrogables excepcionalmente.',
      'Un permiso para ausentarse durante dos semanas de vacaciones.',
      'El cambio de sede de un departamento a otro en el mismo día.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Correcto! El aplazamiento suspende temporalmente la matrícula por motivos de salud, fuerza mayor o servicio militar, hasta por 6 meses.',
    whyWrongFeedback: 'Confusión de término: El retiro definitivo es voluntario; el aplazamiento es temporal (hasta por 6 meses) y permite reingreso posterior sujeto a disponibilidad de cupo.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Trámites Académicos: Aplazamiento'
  },
  {
    id: 12,
    sectionId: 'tramites',
    sectionTitle: 'Sección 3 · Trámites Académicos',
    sectionIcon: 'FileText',
    question: 'Para hacer efectiva la solicitud de "Traslado" de un programa o centro de formación a otro, ¿qué requisito indispensable debe cumplirse?',
    options: [
      'Que el aprendiz haya culminado al menos el primer trimestre y exista cupo disponible en el programa y centro de destino.',
      'Tener calificaciones deficientes en el centro de origen.',
      'Pagar una tarifa de transferencia en la cuenta del Centro de Formación.',
      'Hacer el traslado verbalmente con el instructor sin radicar en SOFIA Plus.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Muy bien! Los traslados son gratuitos y formales: exigen haber superado el primer periodo lectivo y verificar la disponibilidad de cupo afín.',
    whyWrongFeedback: 'Recuerda: Los trámites en el SENA son 100% gratuitos y jamás verbales. Se requiere haber cursado al menos el primer trimestre y contar con cupo en la sede receptora.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Trámites Académicos: Traslado'
  },
  {
    id: 13,
    sectionId: 'tramites',
    sectionTitle: 'Sección 3 · Trámites Académicos',
    sectionIcon: 'FileText',
    question: '¿Qué consecuencia administrativa genera la figura del "Retiro Voluntario" debidamente radicado antes de un proceso disciplinario?',
    options: [
      'Sanción de inhabilidad de 2 años sin poder inscribirse en ningún programa.',
      'Desvinculación sin sanción de inhabilidad si se tramita dentro de los términos establecidos antes de que se configure deserción.',
      'Cancelación de la cédula de ciudadanía.',
      'Obligación de pagar los salarios de los instructores del trimestre.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Exacto! El retiro voluntario formal y oportuno no acarrea la sanción de inhabilidad de 6 meses que sí produce la deserción injustificada.',
    whyWrongFeedback: 'Error clave: La sanción de inhabilidad ocurre por deserción. Si el aprendiz radica oportunamente el retiro voluntario justificado, no queda inhabilitado.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Trámites: Retiro Voluntario vs. Deserción'
  },
  {
    id: 14,
    sectionId: 'tramites',
    sectionTitle: 'Sección 3 · Trámites Académicos',
    sectionIcon: 'FileText',
    question: 'Respecto a las restricciones de inscripción, ¿cuándo NO puede un aspirante registrarse en un nuevo programa de formación titulada?',
    options: [
      'Si es mayor de edad.',
      'Si tiene una matrícula vigente activa, se encuentra citado a pruebas de selección previas o tiene una sanción de cancelación vigente.',
      'Si vive en una ciudad diferente a Bogotá.',
      'Si proviene de un colegio público.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Perfecto! El sistema SOFIA Plus valida que el usuario no tenga matrículas simultáneas incompatibles ni inhabilidades disciplinarias vigentes.',
    whyWrongFeedback: 'El SENA no discrimina por edad ni origen. Las restricciones legales son técnicas: no tener dos inscripciones vigentes ni sanciones activas.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Restricciones de Inscripción y Matrícula'
  },
  {
    id: 15,
    sectionId: 'tramites',
    sectionTitle: 'Sección 3 · Trámites Académicos',
    sectionIcon: 'FileText',
    question: '¿Cuánto tiempo antes del vencimiento del aplazamiento debe el aprendiz radicar la solicitud formal de "Reingreso"?',
    options: [
      'Al menos con un (1) mes de anticipación a la fecha de inicio del periodo académico respectivo.',
      'El mismo día en que inician las clases sin aviso previo.',
      'Un año después de haber vencido el plazo.',
      'El reingreso es automático sin necesidad de radicar solicitud.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Muy bien analizado! La solicitud oportuna con un mes de antelación permite a la coordinación proyectar la disponibilidad de cupo en la ficha correspondiente.',
    whyWrongFeedback: 'No es automático ni el mismo día. La administración necesita mínimo 1 mes de antelación para verificar cupo y registrar el reingreso en el sistema académico.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Procedimiento de Reingreso'
  },

  // ==================== SECCIÓN 4: INCUMPLIMIENTOS & DESERCIÓN (5 preguntas) ====================
  {
    id: 16,
    sectionId: 'desercion',
    sectionTitle: 'Sección 4 · Incumplimientos y Deserción',
    sectionIcon: 'AlertTriangle',
    question: '¿En qué plazo formal debe el aprendiz radicar los soportes válidos de una inasistencia para que sea catalogada como "Incumplimiento Justificado"?',
    options: [
      'Previo al hecho (1 día antes) o dentro de los cinco (5) días hábiles siguientes al hecho con soportes idóneos.',
      'Hasta 30 días calendario después de regresar a clases.',
      'Al final del año escolar en la entrega de notas.',
      'No hay plazo límite si el monitor del grupo le cree.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Correcto! El Acuerdo 009 fija la regla: informar con anterioridad o aportar soportes legítimos (médicos o fuerza mayor) dentro de los 5 días hábiles siguientes.',
    whyWrongFeedback: 'Ojo con los plazos: El término reglamentario perentorio es dentro de los 5 días hábiles siguientes al hecho con soporte válido, no al final de mes.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Incumplimientos Justificados'
  },
  {
    id: 17,
    sectionId: 'desercion',
    sectionTitle: 'Sección 4 · Incumplimientos y Deserción',
    sectionIcon: 'AlertTriangle',
    question: 'En formación presencial, ¿cuándo se configura oficialmente la causal de "Deserción del Proceso Formativo"?',
    options: [
      'Por llegar 10 minutos tarde a una sesión de clase.',
      'Por acumular tres (3) días continuos o cinco (5) no continuos de inasistencia injustificada sin reporte ni soporte en el trimestre.',
      'Por no vestir la camiseta del SENA los fines de semana.',
      'Por solicitar un aplazamiento autorizado.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Gran precisión! La regla presencial de deserción: 3 días continuos o 5 no continuos injustificados activan el proceso de cancelación de matrícula.',
    whyWrongFeedback: 'Fallaste en el umbral: 3 días continuos o 5 días no continuos injustificados en el periodo formativo presencial constituyen la causal objetiva de deserción.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Causales de Deserción en Formación Presencial'
  },
  {
    id: 18,
    sectionId: 'desercion',
    sectionTitle: 'Sección 4 · Incumplimientos y Deserción',
    sectionIcon: 'AlertTriangle',
    question: 'En programas de formación en modalidad 100% VIRTUAL, ¿cuándo se declara la causal de Deserción?',
    options: [
      'Por no ingresar a la plataforma LMS durante veinte (20) días calendario continuos o faltar a tres (3) citaciones de seguimiento.',
      'Por no enviar un correo un domingo en la noche.',
      'Por demorarse más de 2 horas en ver un video de YouTube.',
      'En la modalidad virtual nunca existe la deserción.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Exacto! En la virtualidad, no ingresar al LMS por 20 días continuos o desatender 3 citaciones formales configura abandono del proceso formativo.',
    whyWrongFeedback: 'Error: La virtualidad sí tiene causales de deserción estrictas. La norma estipula 20 días continuos sin ingreso al LMS o inasistencia a 3 citaciones.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Deserción en Modalidad Virtual'
  },
  {
    id: 19,
    sectionId: 'desercion',
    sectionTitle: 'Sección 4 · Incumplimientos y Deserción',
    sectionIcon: 'AlertTriangle',
    question: '¿Qué consecuencia administrativa y sancionatoria acarrea la declaración formal de Deserción del aprendiz?',
    options: [
      'Felicitación por descanso académico.',
      'Cancelación definitiva de la matrícula e inhabilidad para inscribirse en programas del SENA por el término de seis (6) meses.',
      'Pérdida de la ciudadanía colombiana.',
      'Exigencia de devolver los libros leídos en la biblioteca.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Excelente! La deserción formalizada mediante acto administrativo produce la cancelación de matrícula y genera una inhabilidad de 6 meses en SOFIA Plus.',
    whyWrongFeedback: 'Ten presente: La deserción no es inocua; bloquea al usuario en el sistema con 6 meses de inhabilidad para inscribirse en cualquier oferta del SENA.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Efectos de la Deserción e Inhabilidad'
  },
  {
    id: 20,
    sectionId: 'desercion',
    sectionTitle: 'Sección 4 · Incumplimientos y Deserción',
    sectionIcon: 'AlertTriangle',
    question: 'Antes de declarar en firme la cancelación de matrícula por deserción, ¿a qué procedimiento previo está obligado el Centro de Formación?',
    options: [
      'Enviar una citación o comunicación al aprendiz para que justifique su inasistencia dentro de los 5 días hábiles siguientes.',
      'Expulsar inmediatamente al aprendiz sin permitirle hablar.',
      'Llamar a los padres de familia únicamente si el aprendiz tiene más de 30 años.',
      'Publicar la foto del aprendiz en el periódico local.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Garantía del debido proceso! El Centro envía notificación previa otorgando 5 días hábiles para que el aprendiz aporte sus descargos o justificaciones.',
    whyWrongFeedback: 'No se puede cancelar la matrícula de plano. El debido proceso obliga a notificar al aprendiz dándole 5 días hábiles para explicar sus inasistencias.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Procedimiento de Notificación Previa a la Deserción'
  },

  // ==================== SECCIÓN 5: FALTAS & RÉGIMEN SANCIONATORIO (5 preguntas) ====================
  {
    id: 21,
    sectionId: 'faltas',
    sectionTitle: 'Sección 5 · Faltas y Régimen Sancionatorio',
    sectionIcon: 'Gavel',
    question: '¿Cómo se clasifican las faltas en el régimen disciplinario del SENA según su naturaleza?',
    options: [
      'Faltas Deportivas y Faltas de Recreo.',
      'Faltas Académicas (relacionadas con el aprendizaje) y Faltas Disciplinarias (relacionadas con el comportamiento y la convivencia).',
      'Faltas de Mañana y Faltas de Noche.',
      'Faltas de Internet y Faltas de Papel.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Muy bien clasificado! Las faltas son Académicas (evidencias, plagio, aprendizaje) o Disciplinarias (convivencia, respeto, bienes e integridad).',
    whyWrongFeedback: 'Clasificación incorrecta: El estatuto divide formalmente las faltas en dos naturalezas: Académicas y Disciplinarias, según vulneren el proceso pedagógico o la convivencia.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Clasificación de las Faltas'
  },
  {
    id: 22,
    sectionId: 'faltas',
    sectionTitle: 'Sección 5 · Faltas y Régimen Sancionatorio',
    sectionIcon: 'Gavel',
    question: '¿Cómo se gradúa o califica la gravedad de una falta cometida por un aprendiz?',
    options: [
      'Leves, Graves y Gravísimas.',
      'Buenas, Regulares y Malas.',
      'Sin importancia, Normales y Peligrosas.',
      'Todas las faltas tienen exactamente la misma sanción.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Perfecto! La tipificación de la gravedad sigue la escala legal colombiana: Faltas Leves, Graves y Gravísimas con criterios de atenuación o agravación.',
    whyWrongFeedback: 'Cuidado con la jerga: La escala legal oficial del SENA es Leves, Graves y Gravísimas, evaluando dolo, culpa, reiteración y daño causado.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Criterios de Calificación de Faltas'
  },
  {
    id: 23,
    sectionId: 'faltas',
    sectionTitle: 'Sección 5 · Faltas y Régimen Sancionatorio',
    sectionIcon: 'Gavel',
    question: '¿Cuáles son las dos "Medidas Formativas" principales contempladas antes de una sanción disciplinaria?',
    options: [
      'La multa en dinero y el trabajo forzoso en el taller.',
      'El Llamado de atención por escrito (máx. 2 por fase) y el Plan de mejoramiento (máx. 2 por fase, duración de hasta 20 días).',
      'El encierro en el aula y la suspensión de alimentos.',
      'La pérdida automática del trimestre sin explicación.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Brillante! El enfoque del SENA es esencialmente pedagógico y formativo: llamados de atención pedagógicos y planes de mejoramiento concertados.',
    whyWrongFeedback: 'El SENA no aplica multas monetarias ni castigos físicos. Las medidas formativas legales son el llamado de atención escrito y el plan de mejoramiento con compromisos pedagógicos.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Medidas Formativas: Límites y Plazos'
  },
  {
    id: 24,
    sectionId: 'faltas',
    sectionTitle: 'Sección 5 · Faltas y Régimen Sancionatorio',
    sectionIcon: 'Gavel',
    question: '¿Cuáles son las dos "Medidas Sancionatorias" que puede imponer el Subdirector de Centro tras recomendación del Comité de Evaluación y Seguimiento?',
    options: [
      'Pérdida del carné por un día y memorando verbal.',
      'Condicionamiento de matrícula y Cancelación definitiva de matrícula.',
      'Trabajo comunitario de limpieza en la ciudad.',
      'Prohibición de salir del país por 5 años.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Correcto! Las únicas dos sanciones formales contempladas en el acuerdo son el Condicionamiento de matrícula y la Cancelación de la misma.',
    whyWrongFeedback: 'Error en la tipificación: Las sanciones definitivas son dos: Condicionamiento de matrícula (compromiso estricto de permanencia) o Cancelación de matrícula.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Medidas Sancionatorias Institucionales'
  },
  {
    id: 25,
    sectionId: 'faltas',
    sectionTitle: 'Sección 5 · Faltas y Régimen Sancionatorio',
    sectionIcon: 'Gavel',
    question: '¿Cuál de las siguientes conductas se tipifica como Falta Gravísima en el reglamento?',
    options: [
      'Olvidar el cuaderno de apuntes en el ambiente de formación.',
      'Hacer comentarios respetuosos sobre una lectura pedagógica.',
      'Cometer fraude o suplantación en evaluaciones, ingresar con armas, sustancias psicoactivas o cometer acoso o violencia sexual.',
      'Preguntar dudas al instructor al finalizar la sesión.'
    ],
    correctAnswer: 2,
    positiveFeedback: '¡Excelente criterio ético! El fraude grave, suplantación, violencia, armas y acoso atentan contra la vida y la integridad institucional, tipificándose como faltas gravísimas.',
    whyWrongFeedback: 'Evidente: Olvidar un cuaderno no es falta gravísima. El fraude sistemático, porte de armas, sustancias y violencia física o sexual son faltas gravísimas con cancelación inmediata.',
    regulatoryArticle: 'Acuerdo 009 de 2024 · Faltas Gravísimas y Sanciones'
  }
];
