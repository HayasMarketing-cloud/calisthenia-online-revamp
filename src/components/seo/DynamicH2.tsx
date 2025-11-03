import { useSEOPage } from "@/hooks/useSEOData";

interface DynamicH2Props {
  type: "primary" | "secondary";
  index?: number; // For secondary H2s: 0, 1, or 2
  fallback?: string;
  className?: string;
  path?: string;
}

const DynamicH2 = ({
  type,
  index = 0,
  fallback,
  className = "",
  path,
}: DynamicH2Props) => {
  const { data: seoData } = useSEOPage(path);

  let h2Text = fallback || "";

  if (type === "primary") {
    h2Text = seoData?.h2_primary || fallback || "";
  } else if (type === "secondary") {
    if (index === 0) {
      h2Text = seoData?.h2_secondary_1 || fallback || "";
    } else if (index === 1) {
      h2Text = seoData?.h2_secondary_2 || fallback || "";
    }
  }

  if (!h2Text) return null;

  return <h2 className={className}>{h2Text}</h2>;
};

export default DynamicH2;
