# Enlazado interno contextual SEO

## Objetivo

Reforzar la arquitectura SEO con enlaces internos **inline en párrafos**, usando anchors descriptivos exact-match, desde cada sección de las 12 páginas del cluster hacia rutinas relacionadas, el hub `/programas/` y la guía de principiantes.

## Páginas en alcance (12)

Rutinas (9): `/rutina-brazos-calistenia/`, `/rutina-espalda-calistenia/`, `/rutina-abdominales-calistenia/`, `/rutina-core-calistenia/`, `/rutina-piernas-calistenia/`, `/rutina-pecho-calistenia/`, `/rutinas-de-hombro-calistenia/`, `/rutina-full-body/`, `/rutina-calistenia-en-casa/`

Hubs temáticos (3): `/calistenia-en-parque/`, `/calistenia-principiantes/`, `/calistenia-nivel-avanzado/`, `/blog/que-es-la-calistenia/`

## Mapa de enlaces (silo)

```text
                  /que-es-la-calistenia/  (pillar conceptual)
                            │
                  /calistenia-principiantes/  (pillar nivel inicial)
                  /calistenia-nivel-avanzado/ (pillar nivel avanzado)
                            │
       ┌───────── Rutinas por grupo muscular ─────────┐
       │  brazos ↔ espalda ↔ pecho ↔ hombro ↔ core    │
       │  piernas ↔ full body ↔ casa ↔ parque         │
       └───────────────────────────────────────────────┘
                            │
                   /programas/  (conversión)
```

Reglas:
- Cada página debe enlazar a **3-5 páginas hermanas** + **1 a `/programas/`** + **1 a `/calistenia-principiantes/`** (o `/calistenia-nivel-avanzado/` si la página ya es de iniciación).
- Anclas **descriptivas y variadas** (nunca "haz click aquí"), priorizando keyword exacta de la página destino.
- Sin enlaces auto-referentes y sin duplicar el mismo destino más de 2 veces por página.

## Patrón de implementación

Cada enlace inline usa `<Link to="..." className="text-primary hover:underline font-medium">ancla descriptiva</Link>` insertado **dentro de párrafos existentes** de las secciones (intro, "qué es", "beneficios", "progresión", "errores", etc.). No se crean cards nuevas ni se mueve estructura.

Ejemplos de anclas por contexto:

| En página | Sección | Ancla | Destino |
|---|---|---|---|
| RutinaBrazos | Intro | "rutina de espalda con calistenia" | /rutina-espalda-calistenia/ |
| RutinaBrazos | Progresión | "rutina full body" | /rutina-full-body/ |
| RutinaBrazos | Equipo | "entrenar en un parque de calistenia" | /calistenia-en-parque/ |
| RutinaBrazos | Cierre | "programas de coaching de calistenia" | /programas/ |
| RutinaCasa | Equipo mínimo | "rutina en parque de calistenia" | /calistenia-en-parque/ |
| RutinaCasa | Plan 4 semanas | "guía de calistenia para principiantes" | /calistenia-principiantes/ |
| CalisteniaPrincipiantes | Progresión | "rutina full body en casa" | /rutina-full-body/ |
| CalisteniaPrincipiantes | Siguiente paso | "calistenia nivel avanzado" | /calistenia-nivel-avanzado/ |
| CalisteniaParque | Tipos de barras | "rutina de espalda en barra" | /rutina-espalda-calistenia/ |
| QueEsLaCalistenia | Por dónde empezar | "calistenia para principiantes" | /calistenia-principiantes/ |

(El mapa completo se aplica análogamente al resto.)

## Detalles técnicos

- Importar `Link` de `react-router-dom` donde no esté ya.
- Reutilizar clase de enlace consistente: `text-primary hover:underline font-medium underline-offset-4`.
- Verificar que cada `<Link>` apunta a una ruta existente en `App.tsx` con la **barra final** (el sitio usa rutas con trailing slash).
- No tocar JSON-LD, schemas ni componentes de layout. Solo ediciones puntuales de texto en los `.tsx` de las páginas listadas.
- No añadir más de ~6 enlaces internos nuevos por página (densidad razonable, evita keyword stuffing de anchors).

## Entregables

12 archivos editados en `src/pages/` con enlaces inline contextuales según el mapa, manteniendo el copy actual y la jerarquía de secciones.
