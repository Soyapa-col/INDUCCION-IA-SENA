/**
 * Comprehensive Question Bank for SENA Apprentice Regulations (Acuerdo 009 de 2024).
 * Exactly 5 questions per platform section = 25 questions total.
 */

export interface RegulationQuizQuestion {
  id: number;
  sectionId: 'novedades' | 'derechos' | 'deberes' | 'tramites' | 'faltas';
  sectionTitle: string;
  sectionNumber: string;
  question: string;
  options: string[];
  correctAnswer: number;
  positiveFeedback: string;
  correctiveFeedback: string;
  ruleReference: string;
}

export const REGULATION_SECTIONS = [
  { id: 'novedades', title: 'Novedades y Marco Normativo', number: '01' },
  { id: 'derechos', title: 'Derechos del Aprendiz', number: '02' },
  { id: 'deberes', title: 'Deberes y Ciberconvivencia', number: '03' },
  { id: 'tramites', title: 'Trámites Académicos y Deserción', number: '04' },
  { id: 'faltas', title: 'Faltas y Régimen Sancionatorio', number: '05' }
] as const;

export const REGULATION_QUIZ_QUESTIONS: RegulationQuizQuestion[] = [
  // ==========================================
  // SECCIÓN 1: NOVEDADES Y MARCO NORMATIVO (5 PREGUNTAS)
  // ==========================================
  {
    id: 1,
    sectionId: 'novedades',
    sectionTitle: 'Novedades y Marco Normativo',
    sectionNumber: '01',
    question: '¿Qué norma oficial adopta el actual Reglamento del Aprendiz SENA y deroga los acuerdos anteriores (07 de 2012, 02 de 2014, entre otros)?',
    options: [
      'Decreto 1072 de 2015 del Ministerio del Trabajo.',
      'Acuerdo 009 del 5 de noviembre de 2024 del Consejo Directivo Nacional.',
      'Ley 119 de 1994 en su artículo 20.',
      'Circular 015 de 2023 de la Dirección General.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Excelente! Has identificado con precisión que el Acuerdo 009 de 2024 es el estatuto vigente que unifica y actualiza la convivencia y formación en el SENA.',
    correctiveFeedback: 'Atención: Recuerda que el estatuto vigente es el Acuerdo 009 expedido el 5 de noviembre de 2024 por el Consejo Directivo Nacional, el cual derogó de manera expresa los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.',
    ruleReference: 'Acuerdo 009 de 2024 · Artículos 1 y 3 (Vigencia y Derogatorias)'
  },
  {
    id: 2,
    sectionId: 'novedades',
    sectionTitle: 'Novedades y Marco Normativo',
    sectionNumber: '01',
    question: '¿Qué ley reciente de 2024 fue incorporada al Acuerdo 009 para garantizar la protección de aprendices gestantes, en periodo de lactancia y licencias de paternidad?',
    options: [
      'Ley 2394 de 2024.',
      'Ley 100 de 1993.',
      'Ley 789 de 2002.',
      'Ley 115 de 1994.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Correcto! La Ley 2394 de 2024 es un gran hito de protección de derechos humanos y maternidad/paternidad incorporado al reglamento.',
    correctiveFeedback: 'Ojo con este punto normativo: Es la Ley 2394 de 2024 la que protege a las estudiantes y aprendices gestantes, garantizando el respeto de los tiempos de lactancia y las licencias parentales sin que afecte su continuidad académica.',
    ruleReference: 'Acuerdo 009 de 2024 · Considerandos clave y Ley 2394 de 2024'
  },
  {
    id: 3,
    sectionId: 'novedades',
    sectionTitle: 'Novedades y Marco Normativo',
    sectionNumber: '01',
    question: 'En materia de prevención y atención integral de violencias de género y acoso sexual en el SENA, ¿cuál es la ley de 2024 incorporada al marco del reglamento?',
    options: [
      'Ley 599 de 2000.',
      'Ley 1010 de 2006.',
      'Ley 2365 de 2024.',
      'Ley 1257 de 2008 únicamente.'
    ],
    correctAnswer: 2,
    positiveFeedback: '¡Muy bien! La Ley 2365 de 2024 establece medidas de prevención, protección y atención integral contra el acoso sexual en ámbitos laborales y educativos.',
    correctiveFeedback: 'Fallo identificado: El Acuerdo 009 adoptó expresamente la Ley 2365 de 2024 para activar rutas inmediatas de acompañamiento, confidencialidad y debido proceso frente a cualquier situación de acoso sexual.',
    ruleReference: 'Acuerdo 009 de 2024 · Considerandos y Ley 2365 de 2024'
  },
  {
    id: 4,
    sectionId: 'novedades',
    sectionTitle: 'Novedades y Marco Normativo',
    sectionNumber: '01',
    question: '¿A quiénes se aplica de manera obligatoria el Reglamento del Aprendiz adoptado por el Acuerdo 009?',
    options: [
      'Exclusivamente a los aprendices de formación presencial.',
      'Únicamente a los aprendices titulados que ya estén en etapa productiva.',
      'A todas las personas matriculadas en programas de formación profesional integral del SENA en todas sus modalidades (presencial, virtual y a distancia).',
      'Solamente a los aprendices becados por el Fondo Emprender.'
    ],
    correctAnswer: 2,
    positiveFeedback: '¡Preciso! El reglamento tiene alcance universal sobre todos los aprendices matriculados en programas de formación del SENA a nivel nacional.',
    correctiveFeedback: 'Debes tener presente: El artículo 1 del Acuerdo 009 estipula que es aplicable a todas las personas formalmente matriculadas en programas de formación profesional del SENA, sin distinción de modalidad.',
    ruleReference: 'Acuerdo 009 de 2024 · Artículo 1 (Adopción y Ámbito de Aplicación)'
  },
  {
    id: 5,
    sectionId: 'novedades',
    sectionTitle: 'Novedades y Marco Normativo',
    sectionNumber: '01',
    question: 'En los procesos disciplinarios en curso iniciados antes de la publicación del Acuerdo 009, ¿qué principio constitucional y normativo se aplica?',
    options: [
      'El principio de la norma más favorable para el aprendiz investigado.',
      'La sanción más severa estipulada en los reglamentos anteriores.',
      'La cancelación automática del proceso sin revisión.',
      'La aplicación retroactiva de multas pecuniarias.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Excelente criterio legal! En materia disciplinaria y de transición siempre prevalece el principio de favorabilidad constitucional para el aprendiz.',
    correctiveFeedback: 'En materia sancionatoria: El Artículo 2 del Acuerdo 009 señala que en procesos en curso o disciplinarios rige de manera preferente el principio de favorabilidad de la norma.',
    ruleReference: 'Acuerdo 009 de 2024 · Artículo 2 (Ámbito de aplicación y transición)'
  },

  // ==========================================
  // SECCIÓN 2: DERECHOS DEL APRENDIZ (5 PREGUNTAS)
  // ==========================================
  {
    id: 6,
    sectionId: 'derechos',
    sectionTitle: 'Derechos del Aprendiz',
    sectionNumber: '02',
    question: '¿Cuál de los siguientes es un derecho fundamental del aprendiz en talleres, laboratorios y ambientes de aprendizaje del SENA?',
    options: [
      'Tener acceso libre e ilimitado a cualquier examen antes de presentarlo.',
      'Recibir oportunamente los elementos de protección personal (EPP) y tener acceso a la infraestructura técnica y tecnológica requerida.',
      'Elegir y destituir instructores de acuerdo a preferencias personales.',
      'Ausentarse sin previo aviso cuando lo considere oportuno.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Muy bien! La dotación y entrega oportuna de EPP y el acceso a recursos tecnológicos es un derecho prioritario que vela por tu seguridad e integridad física.',
    correctiveFeedback: 'Identificación del error: El Acuerdo 009 consagra como derecho recibir oportunamente los Elementos de Protección Personal (EPP) adecuados y acceder a los recursos físicos, técnicos y tecnológicos requeridos para la formación.',
    ruleReference: 'Acuerdo 009 de 2024 · Estructura de Derechos del Aprendiz'
  },
  {
    id: 7,
    sectionId: 'derechos',
    sectionTitle: 'Derechos del Aprendiz',
    sectionNumber: '02',
    question: 'Si un aprendiz presenta una inconformidad con un juicio evaluativo (D) y no llega a un acuerdo con su instructor, ¿qué garantía tiene?',
    options: [
      'Derecho a solicitar un Segundo Evaluador ante la Coordinación Académica dentro de los 2 días hábiles siguientes.',
      'Repetir todo el año de formación obligatoriamente sin derecho a reclamo.',
      'Publicar reclamos agresivos en redes sociales contra el instructor.',
      'Pagar una tarifa adicional para cambiar la calificación a aprobado.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Perfecto! El debido proceso evaluativo te ampara para solicitar la revisión formal con un segundo evaluador designado por la coordinación.',
    correctiveFeedback: 'Recuerda: El debido proceso garantiza que puedes radicar solicitud motivada de Segundo Evaluador dentro de los dos (2) días hábiles siguientes a la publicación del juicio evaluativo.',
    ruleReference: 'Acuerdo 009 de 2024 · Garantías del Debido Proceso y Evaluación'
  },
  {
    id: 8,
    sectionId: 'derechos',
    sectionTitle: 'Derechos del Aprendiz',
    sectionNumber: '02',
    question: '¿Qué derecho tienen los aprendices en situación de discapacidad o pertenecientes a grupos de especial protección constitucional en el SENA?',
    options: [
      'Deben presentar pruebas de admisión adicionales no reglamentadas.',
      'Reconocimiento, ajustes razonables, accesibilidad e inclusión integral en igualdad de condiciones.',
      'Exclusión de los talleres prácticos por motivos de seguridad.',
      'Aprobación automática de resultados sin presentar evidencias.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Acertaste! El SENA lidera políticas de inclusión real, garantizando ajustes razonables y condiciones dignas para personas en situación de discapacidad.',
    correctiveFeedback: 'La respuesta correcta es ajustes razonables e inclusión: La Ley 361 de 1997 y el Acuerdo 009 aseguran acceso equitativo, apoyos pedagógicos e inclusión efectiva sin discriminación.',
    ruleReference: 'Acuerdo 009 de 2024 · Inclusión y Grupos de Especial Protección'
  },
  {
    id: 9,
    sectionId: 'derechos',
    sectionTitle: 'Derechos del Aprendiz',
    sectionNumber: '02',
    question: '¿Qué componente del SENA garantiza el derecho al disfrute de actividades deportivas, culturales, salud, liderazgo y apoyos socioeconómicos?',
    options: [
      'El Plan Nacional Integral de Bienestar al Aprendiz.',
      'La tesorería distrital de la alcaldía.',
      'El departamento de compras y contratación.',
      'El Fondo Nacional del Ahorro.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Exacto! Bienestar al Aprendiz es el área encargada de enriquecer tu formación humana con arte, deporte, salud y auxilios económicos.',
    correctiveFeedback: 'Debes recordar: Es el Plan Nacional Integral de Bienestar al Aprendiz el que gestiona convocatorias de apoyos de sostenimiento, monitorías, bonos y espacios recreodeportivos.',
    ruleReference: 'Acuerdo 009 de 2024 · Derechos de Bienestar al Aprendiz'
  },
  {
    id: 10,
    sectionId: 'derechos',
    sectionTitle: 'Derechos del Aprendiz',
    sectionNumber: '02',
    question: 'Ante cualquier proceso sancionatorio o novedad académica, ¿cuál es el principio rector que protege al aprendiz en todo momento?',
    options: [
      'La culpabilidad inmediata por sospecha.',
      'El derecho al Debido Proceso, a ser escuchado en versión libre, a presentar pruebas y recursos legales.',
      'La suspensión preventiva indefinida sin notificación escrita.',
      'El cobro de cauciones económicas para ser escuchado.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Excelente! El Debido Proceso es una garantía constitucional inquebrantable en todas las instancias del SENA.',
    correctiveFeedback: 'Fallo identificado: El Debido Proceso exige comunicación oportuna de cargos, término para descargos, presunción de inocencia y derecho a la contradicción de pruebas.',
    ruleReference: 'Acuerdo 009 de 2024 · Debido Proceso en Procesos Disciplinarios'
  },

  // ==========================================
  // SECCIÓN 3: DEBERES Y CIBERCONVIVENCIA (5 PREGUNTAS)
  // ==========================================
  {
    id: 11,
    sectionId: 'deberes',
    sectionTitle: 'Deberes y Ciberconvivencia',
    sectionNumber: '03',
    question: 'En los ambientes virtuales de formación (LMS Zajuna, foros, correo MiSENA y plataformas digitales), ¿cuál es el deber fundamental de ciberconvivencia del aprendiz?',
    options: [
      'Compartir sus credenciales y contraseñas con compañeros de grupo.',
      'Mantener comunicación respetuosa, ética digital, lenguaje constructivo y no promover ciberacoso ni divulgación de contenidos lesivos.',
      'Usar las plataformas institucionales para venta de productos y publicidad comercial.',
      'Realizar publicaciones anónimas para criticar a instructores sin identificarse.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Brillante! La ciberconvivencia ética en plataformas institucionales garantiza un entorno académico seguro, colaborativo y respetuoso.',
    correctiveFeedback: 'Ojo con este deber: En entornos digitales del SENA es obligatorio comunicarse con respeto, observar las reglas de netiqueta y abstenerse de compartir contraseñas o contenido inapropiado.',
    ruleReference: 'Acuerdo 009 de 2024 · Ciberconvivencia y Uso Ético de Plataformas'
  },
  {
    id: 12,
    sectionId: 'deberes',
    sectionTitle: 'Deberes y Ciberconvivencia',
    sectionNumber: '03',
    question: 'Respecto al carné institucional del SENA en las instalaciones del Centro de Formación, ¿cuál es la obligación del aprendiz?',
    options: [
      'Portarlo visible en todo momento para identificación y control de seguridad, siendo personal e intransferible.',
      'Prestarlo libremente a familiares para que ingresen a la sede.',
      'Dejarlo guardado en casa y solo presentarlo al momento de la graduación.',
      'Venderlo o transferirlo al finalizar el trimestre.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Correcto! El carné es un documento oficial, personal e intransferible que te identifica como miembro de la comunidad SENA.',
    correctiveFeedback: 'Atención: El carné institucional debe portarse en un lugar visible en todo momento dentro del centro de formación. Prestarlo o alterarlo constituye una falta grave.',
    ruleReference: 'Acuerdo 009 de 2024 · Deberes de Identificación Institucional'
  },
  {
    id: 13,
    sectionId: 'deberes',
    sectionTitle: 'Deberes y Ciberconvivencia',
    sectionNumber: '03',
    question: 'Frente al uso de herramientas tecnológicas, software con licencia y recursos de inteligencia artificial en las evidencias de aprendizaje, el aprendiz debe:',
    options: [
      'Presentar código o textos generados por IA como propios sin citar las fuentes ni comprender el resultado.',
      'Hacer un uso ético, citar fuentes de autoría, respetar la propiedad intelectual y desarrollar pensamiento crítico propio.',
      'Descargar software pirata en los computadores del centro de formación.',
      'Pagar a terceros en línea para que realicen las actividades formativas.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Muy bien! La honestidad académica y el uso ético de la IA y el software potencian tus verdaderas habilidades profesionales.',
    correctiveFeedback: 'Fallo identificado: El plagio, la suplantación y la falta de atribución al usar IA o software constituyen faltas contra la honestidad académica y la propiedad intelectual en el SENA.',
    ruleReference: 'Acuerdo 009 de 2024 · Propiedad Intelectual y Ética Digital'
  },
  {
    id: 14,
    sectionId: 'deberes',
    sectionTitle: 'Deberes y Ciberconvivencia',
    sectionNumber: '03',
    question: '¿Qué deber tiene el aprendiz respecto al cuidado de la maquinaria, simuladores, herramientas e infraestructura del Centro de Formación?',
    options: [
      'Utilizarlos exclusivamente bajo las normas de bioseguridad, reportar averías y devolverlos en óptimas condiciones de orden y aseo.',
      'Retirar las herramientas del centro sin autorización para trabajos particulares.',
      'Modificar la configuración de seguridad de las máquinas para acelerar la práctica.',
      'Dejar los residuos y herramientas en el suelo tras finalizar la jornada.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Excelente! Cuidar los equipos y aplicar las normas de seguridad industrial protege tu vida y la de tus compañeros.',
    correctiveFeedback: 'Recuerda: Los recursos e infraestructura pública del SENA deben usarse con máxima responsabilidad, siguiendo protocolos de seguridad y reportando cualquier novedad inmediatamente.',
    ruleReference: 'Acuerdo 009 de 2024 · Cuidado de Bienes e Infraestructura'
  },
  {
    id: 15,
    sectionId: 'deberes',
    sectionTitle: 'Deberes y Ciberconvivencia',
    sectionNumber: '03',
    question: 'En relación con sustancias psicoactivas, bebidas alcohólicas y armas en las sedes o eventos institucionales del SENA, ¿cuál es el deber imperativo?',
    options: [
      'Consumir bebidas alcohólicas en zonas verdes siempre que no haya clases activas.',
      'Abstenerse totalmente de portar, ingresar, consumir o comercializar armas, estupefacientes o bebidas alcohólicas en sedes del SENA o ambientes de formación.',
      'Se permite el ingreso si se cuenta con autorización del vocero de grupo.',
      'Solo se prohíbe en horarios nocturnos.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Exacto! El SENA es un territorio 100% libre de armas, alcohol y estupefacientes para salvaguardar la vida y la convivencia de la comunidad.',
    correctiveFeedback: 'Cuidado: Portar, consumir o comercializar armas, estupefacientes o licor en sedes del SENA constituye una falta gravísima que acarrea la cancelación de la matrícula.',
    ruleReference: 'Acuerdo 009 de 2024 · Deberes de Convivencia y Seguridad'
  },

  // ==========================================
  // SECCIÓN 4: TRÁMITES ACADÉMICOS Y DESERCIÓN (5 PREGUNTAS)
  // ==========================================
  {
    id: 16,
    sectionId: 'tramites',
    sectionTitle: 'Trámites Académicos y Deserción',
    sectionNumber: '04',
    question: '¿Cuál es el plazo máximo reglamentario para radicar los soportes válidos de un incumplimiento justificado de inasistencia según el Acuerdo 009?',
    options: [
      'Al finalizar el trimestre en las semanas de cierre.',
      'Previamente (con 1 día de anterioridad) o dentro de los cinco (5) días hábiles siguientes al hecho con soportes legítimos.',
      'Treinta (30) días calendario posteriores al hecho.',
      'No hay plazo límite si se cuenta con excusa verbal de un familiar.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Impecable! Los 5 días hábiles garantizan que puedas legalizar tu incapacidad médica o calamidad doméstica dentro de los tiempos formales.',
    correctiveFeedback: 'Ten presente este término: El Acuerdo 009 fija un plazo improrrogable de hasta cinco (5) días hábiles posteriores a la inasistencia (o aviso con 1 día de anterioridad) para radicar soportes válidos ante la coordinación.',
    ruleReference: 'Acuerdo 009 de 2024 · Incumplimiento Justificado e Injustificado'
  },
  {
    id: 17,
    sectionId: 'tramites',
    sectionTitle: 'Trámites Académicos y Deserción',
    sectionNumber: '04',
    question: 'En la formación presencial, ¿en qué momento se configura formalmente la causal de deserción por inasistencias injustificadas?',
    options: [
      'Cuando el aprendiz falta un solo día a taller.',
      'Cuando el aprendiz acumula tres (3) días continuos o cinco (5) no continuos de inasistencia injustificada sin reporte ni soporte válido.',
      'Cuando llega 10 minutos tarde en dos ocasiones.',
      'Únicamente si acumula 45 días de inasistencia consecutiva.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Correcto! Tres (3) días continuos o cinco (5) discontinuos injustificados constituyen causal de deserción presencial en el SENA.',
    correctiveFeedback: 'Fallo identificado: La deserción en modalidad presencial se declara cuando el aprendiz falta injustificadamente por 3 días continuos o 5 no continuos dentro del periodo formativo.',
    ruleReference: 'Acuerdo 009 de 2024 · Causales de Deserción en Formación Presencial'
  },
  {
    id: 18,
    sectionId: 'tramites',
    sectionTitle: 'Trámites Académicos y Deserción',
    sectionNumber: '04',
    question: 'En programas de formación en modalidad virtual, ¿cuándo se configura la causal de deserción de acuerdo al Acuerdo 009?',
    options: [
      'Por no ingresar a la plataforma LMS por veinte (20) días continuos o faltar injustificadamente a tres (3) citaciones formales.',
      'Por no contestar un correo en 24 horas.',
      'Por no conectarse en fines de semana.',
      'Por participar en foros desde el celular.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Acertaste! En modalidad virtual, 20 días continuos sin interacción en LMS Zajuna o inasistencia a 3 citaciones configuran deserción.',
    correctiveFeedback: 'Para modalidad virtual: La deserción se configura por no ingresar a la plataforma LMS por veinte (20) días continuos, o por no atender a 3 citaciones consecutivas.',
    ruleReference: 'Acuerdo 009 de 2024 · Deserción en Formación Virtual'
  },
  {
    id: 19,
    sectionId: 'tramites',
    sectionTitle: 'Trámites Académicos y Deserción',
    sectionNumber: '04',
    question: '¿Qué trámite debe realizar un aprendiz que requiere suspender temporalmente su formación por fuerza mayor, servicio militar o incapacidad médica prolongada?',
    options: [
      'Abandonar la sede y esperar que la matrícula se cancele sola.',
      'Radicar formalmente una solicitud de Aplazamiento debidamente sustentada antes de cumplir los límites de inasistencia.',
      'Ceder su cupo a un compañero mediante carta informal.',
      'Matricularse simultáneamente en dos centros diferentes.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Exacto! El aplazamiento formal protege tu cupo y tu historial académico hasta por el tiempo autorizado por el centro.',
    correctiveFeedback: 'No dejes vencer el tiempo: Debes solicitar oportunamente el Aplazamiento por escrito ante la Coordinación Académica con los soportes de fuerza mayor.',
    ruleReference: 'Acuerdo 009 de 2024 · Trámites de Aplazamiento, Traslado y Reingreso'
  },
  {
    id: 20,
    sectionId: 'tramites',
    sectionTitle: 'Trámites Académicos y Deserción',
    sectionNumber: '04',
    question: 'Respecto al proceso de matrícula e inscripción en el sistema de gestión académica (SOFIA Plus / Zajuna), ¿cuál de las siguientes es una restricción legal?',
    options: [
      'Inscribirse en un programa técnico si ya tiene inscripción activa o fue citado a matrícula en otro programa vigente.',
      'Consultar la oferta académica los fines de semana.',
      'Actualizar los datos de residencia y teléfono personal.',
      'Descargar los certificados de cursos aprobados.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Muy bien! Un aspirante o aprendiz no puede tener doble inscripción simultánea activa en estado de selección o matrícula.',
    correctiveFeedback: 'Restricción de ingreso: El reglamento prohíbe tener inscripciones activas simultáneas o estar en proceso de matrícula mientras se cursa otro programa que genere incompatibilidad de cupos.',
    ruleReference: 'Acuerdo 009 de 2024 · Ingreso, Registro y Restricciones de Inscripción'
  },

  // ==========================================
  // SECCIÓN 5: FALTAS Y RÉGIMEN SANCIONATORIO (5 PREGUNTAS)
  // ==========================================
  {
    id: 21,
    sectionId: 'faltas',
    sectionTitle: 'Faltas y Régimen Sancionatorio',
    sectionNumber: '05',
    question: '¿Cómo se clasifican las faltas disciplinarias y académicas en el Reglamento del Aprendiz SENA?',
    options: [
      'En Leves, Graves y Gravísimas.',
      'En Monetarias, Penales y Judiciales.',
      'En Pasajeras, Trimestrales y Anuales.',
      'En Personales y Colectivas únicamente.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Correcto! El Acuerdo 009 gradúa la gravedad de las conductas en Leves, Graves y Gravísimas según los criterios de proporcionalidad y afectación.',
    correctiveFeedback: 'Clasificación de faltas: El régimen tipifica las conductas en Leves, Graves y Gravísimas, evaluando si fueron académicas o de convivencia disciplinaria.',
    ruleReference: 'Acuerdo 009 de 2024 · Calificación y Tipos de Faltas'
  },
  {
    id: 22,
    sectionId: 'faltas',
    sectionTitle: 'Faltas y Régimen Sancionatorio',
    sectionNumber: '05',
    question: '¿Cuáles son las medidas formativas (preventivas y pedagógicas) previas a la aplicación de sanciones disciplinarias en el SENA?',
    options: [
      'Multa económica de 1 SMLMV y trabajo comunitario.',
      'Llamado de atención escrito (máximo 2 por fase) y Plan de Mejoramiento formativo (hasta 20 días).',
      'Expulsión inmediata y veto en todas las universidades del país.',
      'Aislamiento del aprendiz en la biblioteca durante los descansos.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Excelente! El enfoque del SENA es formativo: el llamado de atención y el plan de mejoramiento buscan que el aprendiz corrija y supere sus dificultades.',
    correctiveFeedback: 'Medidas pedagógicas formativas: Antes de sancionar, el instructor y el comité aplican Llamado de atención por escrito (máx. 2 por fase) o Plan de Mejoramiento pedagógico (máx. 2 por fase, hasta 20 días).',
    ruleReference: 'Acuerdo 009 de 2024 · Medidas Formativas Pedagógicas'
  },
  {
    id: 23,
    sectionId: 'faltas',
    sectionTitle: 'Faltas y Régimen Sancionatorio',
    sectionNumber: '05',
    question: '¿Cuáles son las medidas sancionatorias formales contempladas en el Acuerdo 009 tras agotarse el debido proceso?',
    options: [
      'Pérdida de puntos en el carné de conducir.',
      'Condicionamiento de matrícula y Cancelación de matrícula.',
      'Retención de bienes personales del aprendiz.',
      'Asignación obligatoria de horas de aseo en los baños.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Acertaste! Las sanciones son estrictamente de índole formativa-académica: Condicionamiento de matrícula o Cancelación definitiva de matrícula.',
    correctiveFeedback: 'Medidas sancionatorias: Las únicas sanciones oficiales son el Condicionamiento de matrícula (compromiso estricto supervisado) y la Cancelación de matrícula (con inhabilidad de ingreso por el tiempo fijado).',
    ruleReference: 'Acuerdo 009 de 2024 · Medidas Sancionatorias'
  },
  {
    id: 24,
    sectionId: 'faltas',
    sectionTitle: 'Faltas y Régimen Sancionatorio',
    sectionNumber: '05',
    question: 'Cometer plagio comprobado en un proyecto formativo, falsificar un documento de identidad o suplantar a un compañero en una evaluación se califica como:',
    options: [
      'Falta leve sin trascendencia.',
      'Una falta grave o gravísima que da inicio a proceso disciplinario sancionatorio.',
      'Una sugerencia de mejora opcional.',
      'Un error excusable de digitación.'
    ],
    correctAnswer: 1,
    positiveFeedback: '¡Totalmente de acuerdo! La suplantación, falsedad y el fraude académico son conductas gravísimas que atentan contra la ética profesional.',
    correctiveFeedback: 'Gravedad del fraude: La alteración de documentos, la falsedad material y la suplantación son calificadas como faltas graves o gravísimas por violar la integridad institucional.',
    ruleReference: 'Acuerdo 009 de 2024 · Calificación de Faltas Disciplinarias y Académicas'
  },
  {
    id: 25,
    sectionId: 'faltas',
    sectionTitle: 'Faltas y Régimen Sancionatorio',
    sectionNumber: '05',
    question: '¿Qué órgano institucional del Centro de Formación analiza los casos de faltas graves o gravísimas y recomienda las medidas al Subdirector de Centro?',
    options: [
      'El Comité de Evaluación y Seguimiento del Centro de Formación.',
      'La empresa patrocinadora de la etapa productiva.',
      'El departamento de vigilancia privada.',
      'La asamblea general de aprendices del municipio.'
    ],
    correctAnswer: 0,
    positiveFeedback: '¡Perfecto! El Comité de Evaluación y Seguimiento es el cuerpo colegiado multidisciplinario que garantiza el debido proceso y la equidad formativa.',
    correctiveFeedback: 'Instancia colegiada: Es el Comité de Evaluación y Seguimiento (integrado por coordinadores, instructores, representante de aprendices y bienestar) el encargado de escuchar los descargos y emitir concepto técnico motivado.',
    ruleReference: 'Acuerdo 009 de 2024 · Comité de Evaluación y Seguimiento'
  }
];
