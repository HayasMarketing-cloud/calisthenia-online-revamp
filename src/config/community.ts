// Configuración centralizada de la CTA de Comunidad
export const COMMUNITY_CONFIG = {
  // URL del chatbot de Go High Level (actualizar cuando esté listo)
  chatbotUrl: "#unete-comunidad", // Placeholder - ancla temporal
  
  // Texto del CTA
  title: "¡Únete a la comunidad!",
  description: "En Calisthenia.online no estás solo. Formamos una comunidad de personas como tú, que están en el camino del progreso y la superación personal. Aquí encontrarás guías, retos, entrenamientos semanales y el apoyo que necesitas.",
  buttonText: "Unirme a la Comunidad",
  
  // Configuración del sticky banner
  stickyBanner: {
    dismissDays: 7, // Días antes de volver a mostrar
    storageKey: "community_banner_dismissed"
  },
  
  // Beneficios para las cards
  benefits: [
    {
      icon: "BookOpen",
      title: "Guías Exclusivas",
      description: "Acceso a contenido premium y tutoriales paso a paso"
    },
    {
      icon: "Target",
      title: "Retos Mensuales",
      description: "Desafíos motivadores para mantener tu progreso constante"
    },
    {
      icon: "Dumbbell",
      title: "Entrenamientos Semanales",
      description: "Rutinas nuevas cada semana adaptadas a tu nivel"
    },
    {
      icon: "Users",
      title: "Apoyo Constante",
      description: "Una comunidad activa que te motiva y responde tus dudas"
    }
  ]
};
