import { useAllSEOPages } from "@/hooks/useSEOData";

const DynamicSitemap = () => {
  const { data: pages, isLoading } = useAllSEOPages();

  if (isLoading) {
    return <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: 0 }}>Loading...</pre>;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages?.map(page => {
    const priority = page.path === '/' ? '1.0' : page.path.includes('blog') ? '0.8' : '0.9';
    const changefreq = page.path === '/' ? 'weekly' : page.path.includes('blog') ? 'monthly' : 'weekly';
    const loc = page.canonical || `https://calisthenia.online${page.path}`;
    
    return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n')}
</urlset>`;

  return (
    <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: 0 }}>
      {sitemap}
    </pre>
  );
};

export default DynamicSitemap;
