# Guía de Gestión de Videos

Esta guía te explica cómo gestionar manualmente los videos que aparecen en las galerías de tu sitio web.

## 📋 Tabla de Contenidos

1. [Destacar un Video](#destacar-un-video)
2. [Ocultar un Video](#ocultar-un-video)
3. [Cambiar el Orden Manualmente](#cambiar-el-orden-manualmente)
4. [Agregar Nuevos Videos](#agregar-nuevos-videos)
5. [Encontrar el Video ID](#encontrar-el-video-id)

---

## ⭐ Destacar un Video

Los videos destacados aparecerán **primero** en la galería de su zona correspondiente.

### Pasos:

1. Abre el archivo `src/data/videoCuration.ts`
2. Localiza la zona muscular en el objeto `featuredVideos`:
   ```typescript
   export const featuredVideos = {
     espalda: ['VIDEO_ID_1', 'VIDEO_ID_2'],
     pecho: [],
     // ...
   }
   ```
3. Agrega el Video ID al **inicio** del array correspondiente:
   ```typescript
   espalda: [
     'NUEVO_VIDEO_ID', // ← Nuevo video destacado
     'bSYhg5i28kg',
     'j1VaM6CNazM'
   ],
   ```
4. Guarda el archivo

### Resultado:
El video aparecerá primero en la galería de esa zona muscular.

---

## 🚫 Ocultar un Video

Videos ocultos **no se mostrarán** en ninguna galería del sitio.

### Pasos:

1. Abre el archivo `src/data/videoCuration.ts`
2. Localiza el array `hiddenVideos`:
   ```typescript
   export const hiddenVideos: string[] = [
     // Agregar IDs aquí
   ];
   ```
3. Agrega el Video ID del video que quieres ocultar:
   ```typescript
   export const hiddenVideos: string[] = [
     'VIDEO_ID_A_OCULTAR',
     'OTRO_VIDEO_ID'
   ];
   ```
4. Guarda el archivo

### Resultado:
El video desaparecerá de todas las galerías.

---

## 🔢 Cambiar el Orden Manualmente

Puedes forzar que un video específico aparezca más arriba usando el sistema de prioridad.

### Pasos:

1. Abre el archivo `src/data/videoCuration.ts`
2. Localiza el objeto `videoOverrides`:
   ```typescript
   export const videoOverrides: Record<string, {
     priority?: number;
     featured?: boolean;
   }> = {
     // Configuración aquí
   };
   ```
3. Agrega el Video ID con su prioridad (1-5, mayor = más arriba):
   ```typescript
   export const videoOverrides = {
     'bSYhg5i28kg': {
       priority: 5, // ← Máxima prioridad
       featured: true
     },
     'OTRO_VIDEO_ID': {
       priority: 3 // ← Prioridad media
     }
   };
   ```
4. Guarda el archivo

### Escala de Prioridad:
- **5**: Aparece primero (máxima prioridad)
- **4**: Alta prioridad
- **3**: Prioridad media
- **2**: Baja prioridad
- **1**: Mínima prioridad

### Resultado:
Los videos con mayor prioridad aparecerán antes que otros en su zona.

---

## ➕ Agregar Nuevos Videos

Para agregar videos que **no están en el CSV original**, debes añadirlos manualmente a la base de datos.

### Pasos:

1. Abre el archivo `src/data/videoLibrary.ts`
2. Localiza el array `allVideos`:
   ```typescript
   export const allVideos: VideoMetadata[] = [
     // Videos existentes...
   ];
   ```
3. Agrega un nuevo objeto con los datos del video:
   ```typescript
   {
     id: 'NUEVO_VIDEO_ID',
     titulo: 'Título del Video',
     descripcion: 'Descripción completa del video...',
     duracion: 'PT10M30S', // Formato ISO 8601: PT = Period Time, 10M = 10 minutos, 30S = 30 segundos
     durationSeconds: 630, // 10min * 60 + 30seg = 630 segundos
     vistas: 1500,
     likes: 75,
     comentarios: 12,
     zonaMuscular: 'Espalda', // Opciones: Espalda, Pecho, Brazos, Piernas, Core, Hombros, Full Body
     nivel: 'Intermedio', // Opciones: Principiante, Intermedio, Avanzado
     material: 'Bandas elásticas', // Opciones: Peso corporal, Bandas elásticas, Anillas, Paralelas, etc.
     engagementScore: 0 // Se calcula automáticamente
   },
   ```
4. Guarda el archivo

### Notas sobre Duración:
- **Formato ISO 8601**: `PT[horas]H[minutos]M[segundos]S`
- Ejemplos:
  - `PT5M30S` = 5 minutos 30 segundos
  - `PT1H15M` = 1 hora 15 minutos
  - `PT45S` = 45 segundos
- **durationSeconds**: Debe ser la conversión exacta a segundos

---

## 🔍 Encontrar el Video ID

El **Video ID** es el identificador único de cada video de YouTube.

### Método 1: Desde la URL de YouTube

**URL de ejemplo:**
```
https://www.youtube.com/watch?v=bSYhg5i28kg
                                  ↑ Este es el Video ID
```

**Pasos:**
1. Abre el video en YouTube
2. Mira la URL en el navegador
3. El Video ID es lo que viene después de `v=`

### Método 2: Desde el CSV Original

1. Abre el archivo CSV de videos
2. La primera columna contiene todos los Video IDs
3. Busca el video por título y copia su ID

### Método 3: Desde el Código

1. Abre `src/data/videoLibrary.ts`
2. Busca el video por título usando Ctrl+F
3. El campo `id` contiene el Video ID

---

## 🎯 Ejemplos Prácticos

### Ejemplo 1: Destacar los 3 mejores videos de pecho

```typescript
// En src/data/videoCuration.ts
export const featuredVideos = {
  pecho: [
    'VIDEO_ID_FLEXIONES_EXPLOSIVAS',
    'VIDEO_ID_FONDOS_AVANZADOS',
    'VIDEO_ID_PLANCHE_PROGRESION'
  ],
  // ...
};
```

### Ejemplo 2: Ocultar videos antiguos o de baja calidad

```typescript
// En src/data/videoCuration.ts
export const hiddenVideos = [
  'VIDEO_ANTIGUO_2020',
  'VIDEO_BAJA_CALIDAD',
  'VIDEO_REPETIDO'
];
```

### Ejemplo 3: Forzar orden de videos importantes

```typescript
// En src/data/videoCuration.ts
export const videoOverrides = {
  'VIDEO_MUY_IMPORTANTE': {
    priority: 5,
    featured: true
  },
  'VIDEO_NUEVO_DESTACADO': {
    priority: 4,
    featured: true
  }
};
```

---

## 📊 Sistema de Ordenamiento Automático

Si **NO especificas** una configuración manual, los videos se ordenan automáticamente por:

### Engagement Score (por defecto)
Fórmula: `(likes × 10 + comentarios × 5 + vistas) / 1000`

**Ejemplo de cálculo:**
- Video con 500 vistas, 50 likes, 10 comentarios
- Score = `(50 × 10 + 10 × 5 + 500) / 1000 = 1.05`

### Otros criterios disponibles:
1. **Vistas**: Videos con más visualizaciones primero
2. **Likes**: Videos con más likes primero
3. **Engagement**: Combinación de todos los factores (predeterminado)

---

## ⚠️ Notas Importantes

1. **Límite por Zona**: Por defecto, cada galería muestra **6 videos**
2. **Filtrado Automático**: Solo se muestran videos con:
   - Zona muscular definida
   - Nivel definido
   - Mínimo 100 vistas
   - Mínimo 5 likes
3. **Orden de Prioridad**:
   - 1º → Videos en `featuredVideos`
   - 2º → Videos con `priority` alta en `videoOverrides`
   - 3º → Ordenamiento por engagement score
4. **Videos Ocultos**: Se filtran ANTES de aplicar cualquier otro criterio

---

## 🆘 Soporte

Si tienes dudas o encuentras errores:
1. Revisa que los Video IDs estén escritos correctamente (sensible a mayúsculas)
2. Verifica que el formato de duración sea correcto (ISO 8601)
3. Asegúrate de guardar los archivos después de hacer cambios
4. Recarga la página para ver los cambios aplicados

---

**Última actualización**: 2025
