import { format, parseISO, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

export interface PrintableWeeklyReview {
  week_start_date: string;
  summary?: string | null;
  strengths?: string | null;
  improvement_areas?: string | null;
  next_steps?: string | null;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const section = (title: string, value?: string | null) => {
  if (!value || !value.trim()) return '';
  return `
    <section>
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(value).replace(/\n/g, '<br>')}</p>
    </section>
  `;
};

export function openWeeklyReviewPrint(clientName: string, review: PrintableWeeklyReview) {
  const start = parseISO(review.week_start_date);
  const end = addDays(start, 6);
  const period = `${format(start, "d 'de' MMMM", { locale: es })} – ${format(end, "d 'de' MMMM yyyy", { locale: es })}`;
  const title = `Revisión semanal · ${clientName}`;

  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    @page { size: A4; margin: 20mm; }
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #111; line-height: 1.5; padding: 0; margin: 0; }
    header { border-bottom: 2px solid #111; padding-bottom: 12px; margin-bottom: 24px; }
    h1 { font-size: 22px; margin: 0 0 4px; }
    .meta { color: #555; font-size: 13px; }
    section { margin-bottom: 18px; page-break-inside: avoid; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #2563eb; margin: 0 0 6px; }
    p { margin: 0; font-size: 14px; white-space: pre-wrap; }
    footer { margin-top: 32px; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 10px; }
    .actions { padding: 16px; text-align: center; }
    .actions button { font-size: 14px; padding: 10px 20px; border-radius: 6px; border: 1px solid #2563eb; background: #2563eb; color: #fff; cursor: pointer; }
    @media print { .actions { display: none; } }
  </style>
</head>
<body>
  <div class="actions"><button onclick="window.print()">Imprimir / Guardar como PDF</button></div>
  <header>
    <h1>${escapeHtml(title)}</h1>
    <div class="meta">Semana del ${escapeHtml(period)}</div>
  </header>
  ${section('Resumen', review.summary)}
  ${section('Fortalezas', review.strengths)}
  ${section('Áreas de mejora', review.improvement_areas)}
  ${section('Próximos pasos', review.next_steps)}
  <footer>Calisthenia · ${escapeHtml(format(new Date(), "d 'de' MMMM yyyy", { locale: es }))}</footer>
  <script>setTimeout(function(){ window.print(); }, 350);</script>
</body>
</html>`;

  const win = window.open('', '_blank', 'width=820,height=1000');
  if (!win) return;
  win.document.open();
  win.document.write(html);
  win.document.close();
}
