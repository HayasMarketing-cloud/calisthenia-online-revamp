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
