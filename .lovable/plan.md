# Plan: 10 Single Redirect Rules en Cloudflare (plan Free)

## Estrategia

Cloudflare Free permite **10 Single Redirect Rules**, pero cada regla puede agrupar **muchas URLs origen** hacia un mismo destino usando la expresión:

```
(http.host eq "calisthenia.online" and http.request.uri.path in {"/url-1/" "/url-2/" "/url-3/"})
```

→ 1 destino = 1 regla, con N URLs origen dentro. Así caben los 40+ redirects de `public/_redirects` en 10 reglas reales en el edge (301 reales, no client-side).

Las URLs sobrantes que no entren en las 10 reglas se mantienen en `RedirectHandler.tsx` (fallback React) — son las de menor valor SEO (sin tráfico en GSC).

## Las 10 reglas

Orden por prioridad SEO (las 4 con tráfico confirmado en GSC van primero).

### Regla 1 → `/rutina-pecho-calistenia/` (status 301)
**41 impresiones GSC**
```
/la-rutina-perfecta-de-empuje-en-casa/
```

### Regla 2 → `/calistenia-principiantes/` (301)
**63 impresiones + 1 clic GSC**
```
/la-mejor-rutina-para-empezar-en-calistenia-rutina-fullbody-para-principiantes/
/como-empezar-a-entrenar-calistenia-en-casa/
/3-pasos-para-iniciarte-en-calistenia/
/rutina-para-principiantes-y-no-tanto-calisteniapp-mi-nueva-colaboracion-nico-reyero/
/ejercicios-para-empezar-en-calistenia-💪⚡️/
```

### Regla 3 → `/calistenia-nivel-avanzado/` (301)
**15 impresiones GSC en /category/calistenia-nivel-intermedio/**
```
/category/calistenia-nivel-intermedio/
/tuck-planche-tutorial-cero-to-full-planche/
```

### Regla 4 → `/programas/` (301)
**Bucket con la mayor cantidad de URLs legacy (incluye /la-guia-del-entrenamiento-de-fuerza-en-casa.../ con tráfico GSC)**
```
/la-guia-del-entrenamiento-de-fuerza-en-casa-ejercicios-de-calistenia-para-3-meses/
/rutinas-con-kettlebells/
/rutinas-con-bandas-elasticas-para-calistenia/
/rutina-de-resistencia-calistenia/
/corrige-el-valgo-de-rodilla/
/el-metodo-mas-rapido-de-definicion-el-hiit-y-su-evidencia-cientifica/
/las-4-mejores-rutinas-de-calistenia-para-mejorar-en-1-semana/
/pros-contras-gym-vs-calistenia/
/mejora-tu-postura-con-estos-3-pasos-ep2/
/hiperlordosis-y-3-ejercicios-que-puedes-hacer-para-corregirla/
/3-ejercicios-para-fortalecer-el-cuello/
/mejores-rutinas-calistenia-para-mejorar/
/empiezo-rutina-de-flexibilidad-diaria/
```

### Regla 5 → `/rutinas-de-hombro-calistenia/` (301)
```
/category/hombros/
/rutina-de-fuerza-enfocada-en-hombros-handstand/
/rutina-de-pino-facil-para-dominarlo/
```

### Regla 6 → `/rutina-espalda-calistenia/` (301)
```
/category/espalda/
```

### Regla 7 → `/rutina-calistenia-en-casa/` (301)
```
/rutina-calistenia-en-casa-de-30-minutos/
/se-pueden-hacer-dominadas-en-casa/
```

### Regla 8 → `/calistenia-en-parque/` (301)
```
/entrenar-calistenia-en-el-parque/
```

### Regla 9 → `/blog/que-es-la-calistenia/` (301)
```
/calistenia/
/calistenia
```

### Regla 10 → `/` (301)
**Catch-all para legacy sin equivalente claro + categorías obsoletas**
```
/category/calistenia/
/category/estiramientos/
/guia-consigue-5-dominadas-estrictas-desde-cero/
/como-empiezo-en-calistenia-sin-material/
/como-organizar-rutinas-calistenia-semanales/
/tipos-dominadas-objetivo/
/core-y-abdomen-de-acero-sin-material-en-10/
/rutina-de-fuerza-en-parque-para-empezar-a-entrenar/
```

## Quedan en fallback (RedirectHandler.tsx / _redirects)

URLs sin tráfico GSC y sin agrupación rentable. Se mantienen como redirect 301 client-side vía la tabla `redirects` de Supabase:

- `/presentacion/` → `/quien-soy/`
- `/rutina-fullbody-en-casa-de-calistenia/` → `/rutina-full-body/`

(Penalización SEO marginal: son URLs con 0 impresiones en los últimos 90 días.)

## Cómo crear cada regla en Cloudflare

Para cada una de las 10:

1. Cloudflare Dashboard → `calisthenia.online` → **Rules** → **Redirect Rules** → **Create rule**.
2. **Rule name**: el nombre del destino (p. ej. `Legacy → /programas/`).
3. **If incoming requests match... → Custom filter expression** (edit expression):
   ```
   (http.host eq "calisthenia.online" and http.request.uri.path in {"/url-1/" "/url-2/"})
   ```
4. **Then... → Type**: Static.
5. **URL**: `https://calisthenia.online/destino/`
6. **Status code**: `301`
7. **Preserve query string**: ON.
8. **Deploy**.

## Pasos posteriores

Una vez creadas las 10 reglas en Cloudflare:

1. Verificar con `curl -I https://calisthenia.online/la-rutina-perfecta-de-empuje-en-casa/` que devuelve `301` y `Location: /rutina-pecho-calistenia/`.
2. Limpiar `public/_redirects` eliminando las entradas ahora cubiertas por Cloudflare (Cloudflare actúa antes que el origen, así que duplicarlas no rompe nada, pero limpia mantenibilidad).
3. Limpiar entradas duplicadas en la tabla `redirects` de Supabase.
4. En **Google Search Console** → **Inspección de URL** → solicitar reindexación de las 4 URLs legacy con tráfico (las del bucket prioritario).

## Detalles técnicos

- Las reglas Single Redirect en Free plan **no soportan wildcards reales** (`*`), por eso usamos `path in {...}` con lista enumerada — funciona perfectamente y caben cientos de paths por regla.
- Las reglas se evalúan **en el edge de Cloudflare** antes de llegar al origen Lovable → 301 reales, sin coste de render React, óptimo para SEO.
- Si más adelante necesitas wildcards o regex, requiere plan Pro (Cloudflare Bulk Redirects o expresiones avanzadas).

## Lo que NO voy a tocar (salvo confirmación)

- El archivo `public/_redirects` se mantiene tal cual hasta confirmar que las reglas de Cloudflare están desplegadas y funcionando.
- `RedirectHandler.tsx` se mantiene como fallback para `/presentacion/` y `/rutina-fullbody.../`.
- No modifico el setup CNAME / proxy de Cloudflare.
