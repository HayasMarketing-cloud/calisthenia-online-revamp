import { Helmet } from "react-helmet-async";
import { useSEOPage } from "@/hooks/useSEOData";

interface EnhancedSEOProps {
  path?: string;
}

const EnhancedSEO = ({ path }: EnhancedSEOProps) => {
  const { data: seoData, isLoading } = useSEOPage(path);

  if (isLoading || !seoData) return null;

  const canonical = seoData.canonical || `https://calisteniaonline.com${seoData.path}`;
  const ogImage = seoData.og_image || "https://calisteniaonline.com/hero-calisthenics.jpg";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoData.title}</title>
      {seoData.description && (
        <meta name="description" content={seoData.description} />
      )}
      {seoData.keywords && Array.isArray(seoData.keywords) && seoData.keywords.length > 0 && (
        <meta name="keywords" content={seoData.keywords.join(", ")} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={seoData.title} />
      {seoData.description && (
        <meta property="og:description" content={seoData.description} />
      )}
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={seoData.title} />
      {seoData.description && (
        <meta property="twitter:description" content={seoData.description} />
      )}
      <meta property="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default EnhancedSEO;
