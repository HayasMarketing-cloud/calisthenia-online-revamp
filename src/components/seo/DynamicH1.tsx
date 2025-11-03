import { useSEOPage } from "@/hooks/useSEOData";

interface DynamicH1Props {
  fallback?: string;
  className?: string;
  path?: string;
}

const DynamicH1 = ({ fallback, className = "", path }: DynamicH1Props) => {
  const { data: seoData } = useSEOPage(path);

  const h1Text = seoData?.h1 || fallback || "Calistenia Online";

  return <h1 className={className}>{h1Text}</h1>;
};

export default DynamicH1;
