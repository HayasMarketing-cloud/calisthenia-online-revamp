import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { seoConfig } from "@/config/seoConfig";
import { useLocation } from "react-router-dom";

export interface SEOPage {
  id?: string;
  path: string;
  title?: string;
  description?: string;
  h1?: string;
  h2_primary?: string;
  h2_secondary_1?: string;
  h2_secondary_2?: string;
  canonical?: string;
  og_image?: string;
  keywords?: string[];
  created_at?: string;
  updated_at?: string;
}

// Hook to get all SEO pages with fallback to seoConfig
export const useAllSEOPages = () => {
  return useQuery({
    queryKey: ["seo-pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_pages")
        .select("*")
        .order("path");

      if (error) throw error;

      // Merge with seoConfig data
      const configPaths = seoConfig.pages.map((p) => p.path);
      const dbPaths = data?.map((p) => p.path) || [];
      
      // Get pages from config that are not in DB
      const missingPages = seoConfig.pages.filter(
        (p) => !dbPaths.includes(p.path)
      );

      return [
        ...(data || []),
        ...missingPages.map((p) => ({
          path: p.path,
          title: p.title,
          description: p.description,
          h1: p.h1,
          h2_primary: p.h2s?.[0],
          h2_secondary_1: p.h2s?.[1],
          h2_secondary_2: p.h2s?.[2],
          canonical: p.canonical,
          og_image: p.ogImage,
          keywords: [],
        })),
      ];
    },
  });
};

// Hook to get SEO data for specific page with fallback
export const useSEOPage = (path?: string) => {
  const location = useLocation();
  const currentPath = path || location.pathname;

  return useQuery({
    queryKey: ["seo-page", currentPath],
    queryFn: async () => {
      // Try to get from Supabase first
      const { data, error } = await supabase
        .from("seo_pages")
        .select("*")
        .eq("path", currentPath)
        .maybeSingle();

      if (error) {
        console.error("Error fetching SEO data:", error);
      }

      // If found in DB, return it
      if (data) return data;

      // Fallback to seoConfig
      const configPage = seoConfig.pages.find((p) => p.path === currentPath);
      if (configPage) {
        return {
          path: configPage.path,
          title: configPage.title,
          description: configPage.description,
          h1: configPage.h1,
          h2_primary: configPage.h2s?.[0],
          h2_secondary_1: configPage.h2s?.[1],
          h2_secondary_2: configPage.h2s?.[2],
          canonical: configPage.canonical,
          og_image: configPage.ogImage,
          keywords: [],
        };
      }

      // Auto-generate from path as last resort
      const pathSegments = currentPath.split("/").filter(Boolean);
      const title = pathSegments
        .join(" ")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return {
        path: currentPath,
        title: title || "Calistenia Online",
        description: `Descubre ${title.toLowerCase()} en Calistenia Online`,
        h1: title || "Calistenia Online",
        keywords: [],
      };
    },
  });
};

// Hook to update SEO page
export const useUpdateSEOPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (seoData: SEOPage) => {
      const { data, error } = await supabase
        .from("seo_pages")
        .upsert(seoData, { onConflict: "path" })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-pages"] });
      queryClient.invalidateQueries({ queryKey: ["seo-page"] });
    },
  });
};

// Hook to delete SEO page
export const useDeleteSEOPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (path: string) => {
      const { error } = await supabase
        .from("seo_pages")
        .delete()
        .eq("path", path);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-pages"] });
    },
  });
};
