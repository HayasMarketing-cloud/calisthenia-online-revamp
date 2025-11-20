# 🎯 Rich Snippets Implementation Guide

## Implementación Completa - Fase 1

### ✅ Sistema Implementado

#### 1. **Librería de Schemas** (`src/lib/schemas.ts`)
Generadores para todos los tipos de Rich Snippets:
- ✅ **Organization Schema** - Datos de la marca (todas las páginas)
- ✅ **VideoObject Schema** - Videos de YouTube
- ✅ **HowTo Schema** - Rutinas paso a paso
- ✅ **FAQPage Schema** - Preguntas frecuentes
- ✅ **ItemList Schema** - Listas de videos/rutinas

#### 2. **Componentes SEO**
- ✅ `<StructuredData />` - Inyecta JSON-LD en el `<head>`
- ✅ Hook `useRoutineSchemas()` - Gestión centralizada para rutinas

#### 3. **Sitemap Analyzer Avanzado**
- ✅ Análisis automático de URLs
- ✅ Categorización inteligente (home, rutinas, blog, guías)
- ✅ Validaciones de prioridad y changefreq
- ✅ Detección de issues críticos
- ✅ Recomendaciones de crawl budget
- ✅ Health Score del sitemap

---

## 📖 Cómo Usar los Schemas

### **Página Home** (✅ Ya implementado)

```tsx
import StructuredData from "@/components/seo/StructuredData";
import { generateOrganizationSchema, generateFAQSchema, ORGANIZATION_DATA } from "@/lib/schemas";

const Index = () => {
  const faqs = [
    { question: "¿Necesito equipos?", answer: "No, solo tu peso corporal..." },
    // ... más FAQs
  ];

  const organizationSchema = generateOrganizationSchema(ORGANIZATION_DATA);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <div>
      <StructuredData data={[organizationSchema, faqSchema]} />
      {/* Resto del contenido */}
    </div>
  );
};
```

---

### **Páginas de Rutinas** (✅ Ejemplo en RutinaAbdominales.tsx)

```tsx
import StructuredData from "@/components/seo/StructuredData";
import { useRoutineSchemas } from "@/hooks/useRoutineSchemas";

const RutinaBrazos = () => {
  const { allSchemas } = useRoutineSchemas({
    routineName: "Rutina de Brazos Calistenia",
    routineDescription: "Rutina completa para desarrollar bíceps y tríceps...",
    videoId: "tu-video-id-youtube",
    videoTitle: "Rutina Brazos 15 Minutos",
    videoDuration: "PT15M", // ISO 8601 format
    totalTime: "PT30M",
    uploadDate: "2024-01-15",
    steps: [
      {
        name: "Calentamiento",
        text: "Rotaciones de muñeca y codo durante 2-3 minutos..."
      },
      {
        name: "Flexiones Diamante",
        text: "3 series de 10-15 repeticiones. Manos juntas bajo el pecho..."
      },
      // ... más pasos
    ]
  });

  return (
    <>
      <Helmet>{/* Meta tags */}</Helmet>
      <StructuredData data={allSchemas} />
      {/* Contenido */}
    </>
  );
};
```

---

### **Páginas con Videos Individuales**

```tsx
import StructuredData from "@/components/seo/StructuredData";
import { generateVideoSchema, generateOrganizationSchema, ORGANIZATION_DATA } from "@/lib/schemas";

const VideoPage = () => {
  const videoSchema = generateVideoSchema({
    name: "Cómo hacer Dominadas Perfectas",
    description: "Tutorial completo de técnica de dominadas...",
    thumbnailUrl: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
    uploadDate: "2024-02-10",
    duration: "PT8M30S",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID",
    contentUrl: "https://www.youtube.com/watch?v=VIDEO_ID"
  });

  const organizationSchema = generateOrganizationSchema(ORGANIZATION_DATA);

  return (
    <div>
      <StructuredData data={[organizationSchema, videoSchema]} />
      {/* Contenido */}
    </div>
  );
};
```

---

### **Páginas con FAQs**

```tsx
import StructuredData from "@/components/seo/StructuredData";
import { generateFAQSchema, generateOrganizationSchema, ORGANIZATION_DATA } from "@/lib/schemas";

const BlogPost = () => {
  const faqs = [
    {
      question: "¿Cuántos días a la semana debo entrenar?",
      answer: "Para principiantes, 3-4 días a la semana es ideal..."
    },
    {
      question: "¿Necesito suplementos?",
      answer: "No es necesario. Una dieta balanceada es suficiente..."
    }
  ];

  const faqSchema = generateFAQSchema(faqs);
  const organizationSchema = generateOrganizationSchema(ORGANIZATION_DATA);

  return (
    <div>
      <StructuredData data={[organizationSchema, faqSchema]} />
      {/* Contenido */}
    </div>
  );
};
```

---

### **Páginas con Listas de Videos/Rutinas**

```tsx
import { generateItemListSchema } from "@/lib/schemas";

const RutinasPage = () => {
  const routines = [
    { 
      name: "Rutina de Abdominales", 
      url: "https://calisthenia.online/rutina-abdominales/",
      image: "https://calisthenia.online/assets/calisthenia-abdomen.webp"
    },
    { 
      name: "Rutina de Brazos", 
      url: "https://calisthenia.online/rutina-brazos/",
      image: "https://calisthenia.online/assets/calisthenia-brazos.webp"
    }
  ];

  const itemListSchema = generateItemListSchema(routines);

  return (
    <div>
      <StructuredData data={[itemListSchema]} />
      {/* Contenido */}
    </div>
  );
};
```

---

## 🔧 Formatos de Datos

### **Duración de Videos (ISO 8601)**
```
PT10M      = 10 minutos
PT15M30S   = 15 minutos 30 segundos
PT1H       = 1 hora
PT1H30M    = 1 hora 30 minutos
```

### **Fechas (ISO 8601)**
```
"2024-01-15"           = Fecha simple
"2024-01-15T10:30:00Z" = Fecha y hora UTC
```

---

## 📋 Checklist de Implementación

### **Páginas Prioritarias para Rich Snippets**

#### ✅ **Completado**
- [x] Home (`/`) - Organization + FAQPage
- [x] Rutina Abdominales - Organization + VideoObject + HowTo

#### 🔲 **Pendientes - Alta Prioridad**
- [ ] Rutina Brazos (`/rutina-brazos/`)
- [ ] Rutina Piernas (`/rutina-piernas/`)
- [ ] Rutina Pecho (`/rutina-pecho/`)
- [ ] Rutina Espalda (`/rutina-espalda/`)
- [ ] Rutina Full Body (`/rutina-full-body/`)
- [ ] Rutina Core (`/rutina-core/`)
- [ ] Rutina Hombro (`/rutina-hombro/`)
- [ ] Rutina Casa (`/rutina-casa/`)

#### 🔲 **Pendientes - Media Prioridad**
- [ ] Blog: ¿Qué es la Calistenia? - Organization + FAQPage
- [ ] Calistenia Principiantes - Organization + HowTo
- [ ] Calistenia Nivel Avanzado - Organization + HowTo
- [ ] Calistenia en Parque - Organization + FAQPage
- [ ] Quien Soy (`/quien-soy/`) - Organization

#### 🔲 **Pendientes - Baja Prioridad**
- [ ] Contacto - Organization
- [ ] Programas - Organization + ItemList

---

## 🎯 Próximos Pasos

### **Esta Semana**
1. ✅ Implementar schemas básicos en Home
2. ✅ Implementar schemas en 1 rutina de ejemplo (Abdominales)
3. 🔲 Replicar en las 7 rutinas restantes usando el hook `useRoutineSchemas`
4. 🔲 Validar con Google Rich Results Test

### **Próxima Semana**
1. Implementar FAQPage en páginas de blog
2. Agregar ItemList en página de Programas
3. Optimizar thumbnails de videos

### **Validación**
Usa estas herramientas para validar:
- 🔗 [Google Rich Results Test](https://search.google.com/test/rich-results)
- 🔗 [Schema.org Validator](https://validator.schema.org/)

---

## 💡 Tips

1. **Organization Schema**: Siempre incluirlo en todas las páginas
2. **Múltiples Schemas**: Puedes combinar varios schemas en una página
3. **Thumbnails**: Usa imágenes de alta resolución (min 1200x675px)
4. **Actualizaciones**: Actualiza `uploadDate` cuando modifiques videos
5. **Testing**: Valida SIEMPRE con Google Rich Results Test antes de deploy

---

## 🚀 Impacto Esperado

### **SEO Metrics**
- **CTR en Google**: +20-35% con Rich Snippets visibles
- **Impresiones**: +15-25% por mejor visibilidad
- **Rankings**: Mejora por señales de calidad a Google

### **Resultados Visuales en Google**
- ⭐ **Ratings y reviews** (cuando agregues ReviewSchema)
- 🎥 **Previews de video** con duración
- 📋 **Pasos numerados** en HowTo
- ❓ **FAQs expandibles** directamente en SERP

---

## 📊 Sitemap Analyzer

### **Acceso**
Dashboard SEO → Tab "Analyzer"

### **Funcionalidades**
1. **Health Score Global**: Métrica 0-100% de calidad del sitemap
2. **Categorización Automática**: 
   - Home (prioridad 1.0)
   - Rutinas (0.9)
   - Blog (0.8)
   - Guías (0.85)
   - Institucional (0.6)
3. **Detección de Issues**:
   - Títulos muy cortos (<30 chars)
   - Meta descriptions cortas (<120 chars)
   - Canonical URLs faltantes
   - H1 no definidos
4. **Recomendaciones de Crawl Budget**:
   - Ajustes de prioridad por categoría
   - Optimización de changefreq
   - OG:images faltantes
   - Keywords ausentes

### **Uso Típico**
1. Revisa el Health Score
2. Identifica páginas con issues
3. Usa tab "Meta Tags" para corregir
4. Valida mejoras en "Analyzer"

---

¿Necesitas ayuda implementando schemas en alguna página específica? ¡Avísame!
