export interface PageSEO {
  path: string;
  title: string;
  description: string;
  h1: string;
  h2s: string[];
  canonical: string;
  ogImage?: string;
}

export interface Redirect {
  from: string;
  to: string;
  code: number;
}

export const seoConfig: { pages: PageSEO[]; redirects: Redirect[] } = {
  pages: [
    {
      path: '/',
      title: 'Calistenia Online - Entrenamiento con Peso Corporal | Nicolás Reyero',
      description: 'Aprende calistenia desde cero con rutinas progresivas, entrenamientos gratuitos y la guía de un coach certificado FESWC. Transforma tu cuerpo sin equipos.',
      h1: 'Transforma tu Cuerpo con Calistenia',
      h2s: ['Entrena donde quieras, sin equipos', 'Progresa desde cero hasta skills avanzados', 'Únete a más de 500 personas'],
      canonical: 'https://calisthenia.online/',
      ogImage: '/assets/hero-calisthenics.jpg'
    },
    {
      path: '/blog/',
      title: 'Blog de Calistenia - Guías, Consejos y Entrenamientos',
      description: 'Artículos, guías y consejos sobre calistenia, entrenamiento con peso corporal y fitness. Aprende técnicas, progresiones y metodologías efectivas.',
      h1: 'Blog de Calistenia',
      h2s: ['Guías de entrenamiento', 'Técnicas y progresiones', 'Consejos de expertos'],
      canonical: 'https://calisthenia.online/blog/',
      ogImage: '/assets/hero-calisthenics.jpg'
    },
    {
      path: '/blog/que-es-la-calistenia/',
      title: '¿Qué es la Calistenia? Guía Completa para Principiantes 2024',
      description: 'Descubre qué es la calistenia, sus beneficios, ejercicios básicos y cómo empezar. Guía completa con todo lo que necesitas saber sobre este método de entrenamiento.',
      h1: '¿Qué es la Calistenia?',
      h2s: ['Definición y origen', 'Beneficios del entrenamiento', 'Ejercicios fundamentales'],
      canonical: 'https://calisthenia.online/blog/que-es-la-calistenia/',
      ogImage: '/assets/hero-wellness-calisthenics.jpg'
    },
    {
      path: '/calistenia-en-parque/',
      title: 'Calistenia en el Parque - Entrenamientos al Aire Libre',
      description: 'Descubre cómo entrenar calistenia en el parque con rutinas completas y progresivas. Aprovecha barras, paralelas y bancos para tu entrenamiento outdoor.',
      h1: 'Entrena Calistenia en el Parque',
      h2s: ['Ventajas del entrenamiento outdoor', 'Equipamiento de parque', 'Rutinas específicas'],
      canonical: 'https://calisthenia.online/calistenia-en-parque/',
      ogImage: '/assets/entrena-parque.jpg'
    },
    {
      path: '/calistenia-principiantes/',
      title: 'Calistenia para Principiantes - Guía Completa desde Cero',
      description: 'Empieza en calistenia desde cero con esta guía para principiantes. Ejercicios básicos, progresiones y rutinas diseñadas para tu primer mes de entrenamiento.',
      h1: 'Calistenia para Principiantes',
      h2s: ['Por dónde empezar', 'Ejercicios básicos esenciales', 'Tu primera rutina'],
      canonical: 'https://calisthenia.online/calistenia-principiantes/',
      ogImage: '/assets/hero-calisthenics.jpg'
    },
    {
      path: '/calistenia-nivel-avanzado/',
      title: 'Calistenia Nivel Avanzado - Skills y Progresiones Avanzadas',
      description: 'Lleva tu calistenia al siguiente nivel con entrenamientos avanzados, skills como muscle-ups, planche y front lever. Progresiones detalladas y técnicas profesionales.',
      h1: 'Calistenia Nivel Avanzado',
      h2s: ['Skills avanzados', 'Progresiones especializadas', 'Entrenamiento de fuerza'],
      canonical: 'https://calisthenia.online/calistenia-nivel-avanzado/',
      ogImage: '/assets/hero-calisthenics.jpg'
    },
    {
      path: '/contacto/',
      title: 'Contacto - Calistenia Online | Nicolás Reyero',
      description: 'Ponte en contacto conmigo para consultas sobre entrenamiento personalizado, programas de calistenia o colaboraciones. Respondo todas las consultas.',
      h1: 'Contacto',
      h2s: ['Consultas de entrenamiento', 'Programas personalizados', 'Colaboraciones'],
      canonical: 'https://calisthenia.online/contacto/',
      ogImage: '/assets/nicolas-reyero.jpg'
    },
    {
      path: '/programas/',
      title: 'Programas de Calistenia - Entrenamiento Personalizado',
      description: 'Programas de entrenamiento de calistenia personalizados para todos los niveles. Alcanza tus objetivos con metodología probada y seguimiento profesional.',
      h1: 'Programas de Entrenamiento',
      h2s: ['Programas por nivel', 'Entrenamiento personalizado', 'Resultados garantizados'],
      canonical: 'https://calisthenia.online/programas/',
      ogImage: '/assets/hero-calisthenics.jpg'
    },
    {
      path: '/quien-soy/',
      title: 'Quién Soy - Nicolás Reyero | Coach de Calistenia FESWC',
      description: 'Conoce a Nicolás Reyero, coach certificado FESWC con más de 10 años de experiencia en calistenia y entrenamiento con peso corporal. Mi historia y filosofía.',
      h1: 'Nicolás Reyero',
      h2s: ['Mi historia en calistenia', 'Certificaciones y experiencia', 'Mi filosofía de entrenamiento'],
      canonical: 'https://calisthenia.online/quien-soy/',
      ogImage: '/assets/nicolas-reyero.jpg'
    },
    {
      path: '/rutina-abdominales-calistenia/',
      title: 'Rutina de Abdominales Calistenia - Core Fuerte sin Equipos',
      description: 'Rutina completa de abdominales con calistenia. Ejercicios efectivos para desarrollar un core fuerte y definido usando solo tu peso corporal.',
      h1: 'Rutina de Abdominales',
      h2s: ['Ejercicios de abdominales', 'Técnica correcta', 'Progresiones por nivel'],
      canonical: 'https://calisthenia.online/rutina-abdominales-calistenia/',
      ogImage: '/assets/calisthenia-abdomen.webp'
    },
    {
      path: '/rutina-brazos-calistenia/',
      title: 'Rutina de Brazos Calistenia - Bíceps y Tríceps Definidos',
      description: 'Rutina específica de brazos con calistenia. Desarrolla bíceps y tríceps fuertes y definidos con ejercicios de peso corporal progresivos.',
      h1: 'Rutina de Brazos',
      h2s: ['Ejercicios para bíceps', 'Ejercicios para tríceps', 'Volumen y definición'],
      canonical: 'https://calisthenia.online/rutina-brazos-calistenia/',
      ogImage: '/assets/calisthenia-brazos.webp'
    },
    {
      path: '/rutina-calistenia-en-casa/',
      title: 'Rutina de Calistenia en Casa - Entrena sin Salir de Casa',
      description: 'Rutina completa de calistenia para hacer en casa sin equipos. Entrena todo el cuerpo con ejercicios efectivos en tu propio espacio.',
      h1: 'Rutina en Casa',
      h2s: ['Sin equipos necesarios', 'Entrena en cualquier espacio', 'Resultados desde casa'],
      canonical: 'https://calisthenia.online/rutina-calistenia-en-casa/',
      ogImage: '/assets/entrena-casa.jpg'
    },
    {
      path: '/rutina-core-calistenia/',
      title: 'Rutina de Core Calistenia - Fortalece tu Centro',
      description: 'Rutina de core con calistenia para fortalecer abdominales, oblicuos y zona lumbar. Estabilidad, fuerza y prevención de lesiones.',
      h1: 'Rutina de Core',
      h2s: ['Estabilidad central', 'Fuerza funcional', 'Prevención de lesiones'],
      canonical: 'https://calisthenia.online/rutina-core-calistenia/',
      ogImage: '/assets/calisthenia-core.webp'
    },
    {
      path: '/rutina-espalda-calistenia/',
      title: 'Rutina de Espalda Calistenia - Dominadas y Más',
      description: 'Rutina completa de espalda con calistenia. Aprende dominadas, progresiones y ejercicios para desarrollar una espalda fuerte y ancha.',
      h1: 'Rutina de Espalda',
      h2s: ['Dominadas y progresiones', 'Ejercicios de tracción', 'Espalda fuerte y ancha'],
      canonical: 'https://calisthenia.online/rutina-espalda-calistenia/',
      ogImage: '/assets/calisthenia-espalda.webp'
    },
    {
      path: '/rutina-full-body/',
      title: 'Rutina Full Body Calistenia - Entrena Todo el Cuerpo',
      description: 'Rutina full body con calistenia para entrenar todo el cuerpo en una sesión. Perfecta para principiantes y personas con poco tiempo.',
      h1: 'Rutina Full Body',
      h2s: ['Entrena todo el cuerpo', 'Ahorra tiempo', 'Resultados completos'],
      canonical: 'https://calisthenia.online/rutina-full-body/',
      ogImage: '/assets/calisthenia-full-body.webp'
    },
    {
      path: '/rutinas-de-hombro-calistenia/',
      title: 'Rutinas de Hombro Calistenia - Hombros Fuertes y Definidos',
      description: 'Rutina completa de hombros con calistenia. Ejercicios progresivos para desarrollar deltoides fuertes, prevenir lesiones y dominar el pino.',
      h1: 'Rutinas de Hombro',
      h2s: ['Fortalece deltoides', 'Progresión al pino', 'Prevención de lesiones'],
      canonical: 'https://calisthenia.online/rutinas-de-hombro-calistenia/',
      ogImage: '/assets/calisthenia-hombro.webp'
    },
    {
      path: '/rutina-pecho-calistenia/',
      title: 'Rutina de Pecho Calistenia - Pectorales sin Gimnasio',
      description: 'Rutina de pecho con calistenia para desarrollar pectorales fuertes y definidos. Flexiones, fondos y progresiones avanzadas sin equipos.',
      h1: 'Rutina de Pecho',
      h2s: ['Flexiones y progresiones', 'Fondos en paralelas', 'Pectorales definidos'],
      canonical: 'https://calisthenia.online/rutina-pecho-calistenia/',
      ogImage: '/assets/calisthenia-pecho.webp'
    },
    {
      path: '/rutina-piernas-calistenia/',
      title: 'Rutina de Piernas Calistenia - Piernas Fuertes sin Pesas',
      description: 'Rutina de piernas con calistenia para desarrollar fuerza y masa muscular en las piernas usando solo peso corporal. Sentadillas, pistol squats y más.',
      h1: 'Rutina de Piernas',
      h2s: ['Sentadillas y progresiones', 'Pistol squats', 'Fuerza sin pesas'],
      canonical: 'https://calisthenia.online/rutina-piernas-calistenia/',
      ogImage: '/assets/calisthenia-piernas.webp'
    }
  ],
  redirects: [
    { from: '/core-y-abdomen-de-acero-sin-material-en-10/', to: '/blog', code: 301 },
    { from: '/la-rutina-perfecta-de-empuje-en-casa/', to: '/rutina-pecho-calistenia/', code: 301 },
    { from: '/rutina-de-fuerza-en-parque-para-empezar-a-entrenar/', to: '/blog', code: 301 },
    { from: '/tuck-planche-tutorial-cero-to-full-planche/', to: '/calistenia-nivel-avanzado/', code: 301 },
    { from: '/la-mejor-rutina-para-empezar-en-calistenia-rutina-fullbody-para-principiantes/', to: '/calistenia-principiantes/', code: 301 },
    { from: '/rutinas-con-kettlebells/', to: '/programas/', code: 301 },
    { from: '/guia-consigue-5-dominadas-estrictas-desde-cero/', to: '/', code: 301 },
    { from: '/rutinas-con-bandas-elasticas-para-calistenia/', to: '/programas/', code: 301 },
    { from: '/rutina-de-resistencia-calistenia/', to: '/programas/', code: 301 },
    { from: '/como-empezar-a-entrenar-calistenia-en-casa/', to: '/calistenia-principiantes/', code: 301 },
    { from: '/3-pasos-para-iniciarte-en-calistenia/', to: '/calistenia-principiantes/', code: 301 },
    { from: '/category/hombros/', to: '/rutinas-de-hombro-calistenia/', code: 301 },
    { from: '/category/espalda/', to: '/rutina-espalda-calistenia/', code: 301 },
    { from: '/category/estiramientos/', to: '/', code: 301 },
    { from: '/category/calistenia-nivel-intermedio/', to: '/calistenia-nivel-avanzado/', code: 301 },
    { from: '/category/calistenia/', to: '/', code: 301 },
    { from: '/calistenia/', to: '/blog/que-es-la-calistenia/', code: 301 },
    { from: '/rutina-calistenia-en-casa-de-30-minutos/', to: '/rutina-calistenia-en-casa/', code: 301 },
    { from: '/entrenar-calistenia-en-el-parque/', to: '/calistenia-en-parque/', code: 301 },
    { from: '/presentacion/', to: '/quien-soy/', code: 301 },
    { from: '/rutina-fullbody-en-casa-de-calistenia/', to: '/rutina-full-body/', code: 301 },
    { from: '/como-empiezo-en-calistenia-sin-material/', to: '/', code: 301 },
    { from: '/como-organizar-rutinas-calistenia-semanales/', to: '/', code: 301 },
    { from: '/corrige-el-valgo-de-rodilla/', to: '/programas/', code: 301 },
    { from: '/el-metodo-mas-rapido-de-definicion-el-hiit-y-su-evidencia-cientifica/', to: '/programas/', code: 301 },
    { from: '/la-guia-del-entrenamiento-de-fuerza-en-casa-ejercicios-de-calistenia-para-3-meses/', to: '/programas/', code: 301 },
    { from: '/las-4-mejores-rutinas-de-calistenia-para-mejorar-en-1-semana/', to: '/programas/', code: 301 },
    { from: '/se-pueden-hacer-dominadas-en-casa/', to: '/rutina-calistenia-en-casa/', code: 301 },
    { from: '/pros-contras-gym-vs-calistenia/', to: '/programas/', code: 301 },
    { from: '/mejora-tu-postura-con-estos-3-pasos-ep2/', to: '/programas/', code: 301 },
    { from: '/rutina-para-principiantes-y-no-tanto-calisteniapp-mi-nueva-colaboracion-nico-reyero/', to: '/calistenia-principiantes/', code: 301 },
    { from: '/ejercicios-para-empezar-en-calistenia-💪⚡️/', to: '/calistenia-principiantes/', code: 301 },
    { from: '/hiperlordosis-y-3-ejercicios-que-puedes-hacer-para-corregirla/', to: '/programas/', code: 301 },
    { from: '/rutina-de-fuerza-enfocada-en-hombros-handstand/', to: '/rutinas-de-hombro-calistenia/', code: 301 },
    { from: '/3-ejercicios-para-fortalecer-el-cuello/', to: '/programas/', code: 301 },
    { from: '/tipos-dominadas-objetivo/', to: '/', code: 301 },
    { from: '/mejores-rutinas-calistenia-para-mejorar/', to: '/programas/', code: 301 },
    { from: '/empiezo-rutina-de-flexibilidad-diaria/', to: '/programas/', code: 301 },
    { from: '/rutina-de-pino-facil-para-dominarlo/', to: '/rutinas-de-hombro-calistenia/', code: 301 }
  ]
};
