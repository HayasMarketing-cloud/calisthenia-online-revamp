/**
 * Schema.org generators for Rich Snippets
 * Implementa Organization, VideoObject, HowTo, y FAQPage
 */

export interface OrganizationData {
  name: string;
  description: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint?: {
    contactType: string;
    email?: string;
  };
}

export interface VideoData {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string; // ISO 8601 format (e.g., "PT10M30S")
  contentUrl?: string;
  embedUrl: string;
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export interface HowToData {
  name: string;
  description: string;
  image?: string;
  totalTime?: string; // ISO 8601 format (e.g., "PT30M")
  estimatedCost?: string;
  supply?: string[];
  tool?: string[];
  steps: HowToStep[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AggregateRatingData {
  itemName: string;
  ratingValue: number; // 1-5
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Genera Organization Schema (para todas las páginas)
 */
export const generateOrganizationSchema = (data: OrganizationData) => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    description: data.description,
    url: data.url,
    logo: {
      "@type": "ImageObject",
      url: data.logo
    },
    sameAs: data.sameAs,
    ...(data.contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        contactType: data.contactPoint.contactType,
        ...(data.contactPoint.email && { email: data.contactPoint.email })
      }
    })
  };
};

/**
 * Genera VideoObject Schema (para videos de YouTube)
 */
export const generateVideoSchema = (data: VideoData) => {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: data.name,
    description: data.description,
    thumbnailUrl: data.thumbnailUrl,
    uploadDate: data.uploadDate,
    duration: data.duration,
    ...(data.contentUrl && { contentUrl: data.contentUrl }),
    embedUrl: data.embedUrl
  };
};

/**
 * Genera HowTo Schema (para rutinas paso a paso)
 */
export const generateHowToSchema = (data: HowToData) => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.name,
    description: data.description,
    ...(data.image && { image: data.image }),
    ...(data.totalTime && { totalTime: data.totalTime }),
    ...(data.estimatedCost && { estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: data.estimatedCost } }),
    ...(data.supply && { supply: data.supply.map(s => ({ "@type": "HowToSupply", name: s })) }),
    ...(data.tool && { tool: data.tool.map(t => ({ "@type": "HowToTool", name: t })) }),
    step: data.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image })
    }))
  };
};

/**
 * Genera FAQPage Schema (para preguntas frecuentes)
 */
export const generateFAQSchema = (faqs: FAQItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
};

/**
 * Genera ItemList Schema (para listas de videos/rutinas)
 */
export const generateItemListSchema = (items: { name: string; url: string; image?: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: item.url,
      name: item.name,
      ...(item.image && { image: item.image })
    }))
  };
};

/**
 * Genera AggregateRating Schema (para mostrar estrellas en Google)
 * Úsalo con Product, Service, o dentro de otros schemas
 */
export const generateAggregateRatingSchema = (data: AggregateRatingData) => {
  return {
    "@type": "AggregateRating",
    ratingValue: data.ratingValue.toString(),
    reviewCount: data.reviewCount.toString(),
    bestRating: (data.bestRating || 5).toString(),
    worstRating: (data.worstRating || 1).toString()
  };
};

/**
 * Genera Product Schema con Rating (para rutinas con valoraciones)
 */
export const generateProductWithRatingSchema = (
  productName: string,
  description: string,
  image: string,
  rating: AggregateRatingData
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: description,
    image: image,
    aggregateRating: generateAggregateRatingSchema(rating)
  };
};

/**
 * Genera BreadcrumbList Schema (para migas de pan en SERP)
 */
export const generateBreadcrumbSchema = (breadcrumbs: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
};

/**
 * Course Schema data interface
 */
export interface CourseData {
  name: string;
  description: string;
  provider: string;
  providerUrl: string;
  url: string;
  courseMode: "online" | "onsite" | "blended";
  educationalLevel: string;
  inLanguage?: string;
  image?: string;
  hasCourseInstance?: {
    courseMode: string;
    instructor: string;
    courseWorkload?: string;
  };
  syllabusSections?: Array<{
    name: string;
    description: string;
    position: number;
  }>;
  offers?: {
    price: string;
    priceCurrency: string;
    availability?: string;
  };
  rating?: AggregateRatingData;
}

/**
 * Genera Course Schema (para programas de entrenamiento y guías)
 * https://schema.org/Course
 */
export const generateCourseSchema = (data: CourseData) => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: data.name,
    description: data.description,
    provider: {
      "@type": "Organization",
      name: data.provider,
      sameAs: data.providerUrl
    },
    url: data.url,
    coursePrerequisites: data.educationalLevel === "Principiante" 
      ? "Ninguno" 
      : "Conocimientos básicos de calistenia",
    educationalLevel: data.educationalLevel,
    inLanguage: data.inLanguage || "es",
    ...(data.image && { image: data.image }),
    ...(data.hasCourseInstance && {
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: data.hasCourseInstance.courseMode,
        instructor: {
          "@type": "Person",
          name: data.hasCourseInstance.instructor
        },
        ...(data.hasCourseInstance.courseWorkload && {
          courseWorkload: data.hasCourseInstance.courseWorkload
        })
      }
    }),
    ...(data.syllabusSections && {
      hasPart: data.syllabusSections.map(section => ({
        "@type": "Course",
        name: section.name,
        description: section.description,
        position: section.position
      }))
    }),
    ...(data.offers && {
      offers: {
        "@type": "Offer",
        price: data.offers.price,
        priceCurrency: data.offers.priceCurrency,
        ...(data.offers.availability && { availability: data.offers.availability })
      }
    }),
    ...(data.rating && {
      aggregateRating: generateAggregateRatingSchema(data.rating)
    })
  };
};

/**
 * ExercisePlan Schema - plan/tabla de entrenamiento semanal
 * https://schema.org/ExercisePlan
 */
export interface ExercisePlanSession {
  day: string; // "Lunes", "Martes"...
  focus: string; // "Empuje", "Piernas"...
  exercises: Array<{
    name: string;
    sets?: string | number;
    reps?: string;
    rest?: string;
  }>;
}

export interface ExercisePlanData {
  name: string;
  description: string;
  url: string;
  image?: string;
  activityFrequency?: string; // p.ej. "5 días por semana"
  workload?: string; // ISO 8601 duration por sesión, p.ej. "PT40M"
  intensity?: string; // "Moderada", "Alta"
  restPeriods?: string;
  audience?: string; // "Principiantes", "Intermedios"
  sessions: ExercisePlanSession[];
}

export const generateExercisePlanSchema = (data: ExercisePlanData) => {
  return {
    "@context": "https://schema.org",
    "@type": "ExercisePlan",
    name: data.name,
    description: data.description,
    url: data.url,
    ...(data.image && { image: data.image }),
    ...(data.activityFrequency && { activityFrequency: data.activityFrequency }),
    ...(data.workload && { workload: data.workload }),
    ...(data.intensity && { intensity: data.intensity }),
    ...(data.restPeriods && { restPeriods: data.restPeriods }),
    ...(data.audience && {
      audience: { "@type": "PeopleAudience", suggestedMinAge: 14, audienceType: data.audience }
    }),
    hasPart: data.sessions.map((session, idx) => ({
      "@type": "ExercisePlan",
      position: idx + 1,
      name: `${session.day} – ${session.focus}`,
      exerciseType: session.focus,
      description: session.exercises
        .map(e => `${e.name}${e.sets ? ` ${e.sets}x${e.reps ?? ""}` : ""}${e.rest ? ` (descanso ${e.rest})` : ""}`)
        .join("; ")
    }))
  };
};

/**
 * Datos de la organización (constante para reutilizar)
 */
export const ORGANIZATION_DATA: OrganizationData = {
  name: "Calistenia Online",
  description: "Entrenamiento de calistenia profesional con Nicolás Reyero, coach certificado FESWC. Rutinas progresivas, entrenamientos gratuitos y guía experta.",
  url: "https://calisthenia.online",
  logo: "https://calisthenia.online/logo-footer.webp",
  sameAs: [
    "https://www.youtube.com/@CalisteniaOnline",
    "https://www.instagram.com/calistenia.online/"
  ],
  contactPoint: {
    contactType: "Customer Support"
  }
};
