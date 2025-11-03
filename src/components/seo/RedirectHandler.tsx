import { Navigate, useLocation } from "react-router-dom";
import { seoConfig } from "@/config/seoConfig";

export const RedirectHandler = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Normalizar: asegurar que termina con /
  const normalizedPath = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;

  // Buscar coincidencia exacta primero
  let redirect = seoConfig.redirects.find(r => r.from === normalizedPath);
  
  // Si no encuentra, buscar sin barra final
  if (!redirect) {
    const pathWithoutSlash = currentPath.endsWith('/') 
      ? currentPath.slice(0, -1) 
      : currentPath;
    redirect = seoConfig.redirects.find(r => r.from === pathWithoutSlash || r.from === `${pathWithoutSlash}/`);
  }

  if (redirect) {
    console.log(`🔀 Redirección 301: ${currentPath} → ${redirect.to}`);
    return <Navigate to={redirect.to} replace />;
  }

  return null;
};
