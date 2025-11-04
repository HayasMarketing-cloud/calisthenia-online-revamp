import { Navigate, useLocation } from "react-router-dom";
import { useRedirects } from "@/hooks/useSEOData";

export const RedirectHandler = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { data: redirects, isLoading } = useRedirects();

  // Mientras carga, no hacer nada
  if (isLoading) return null;

  // Normalizar path
  const normalizedPath = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;

  // Buscar redirect en DB
  const redirect = redirects?.find(r => {
    const fromNormalized = r.from_path.endsWith('/') ? r.from_path : `${r.from_path}/`;
    return fromNormalized === normalizedPath;
  });

  if (redirect) {
    console.log(`🔀 Redirección ${redirect.code}: ${currentPath} → ${redirect.to_path}`);
    return <Navigate to={redirect.to_path} replace />;
  }

  return null;
};
