import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost, BlogPostFormData } from "@/types/blog";
import { toast } from "sonner";
import readingTime from "reading-time";

export const useBlogPosts = (status?: string) => {
  return useQuery({
    queryKey: ["blog-posts", status],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select(`
          *,
          category:blog_categories(*)
        `)
        .order("created_at", { ascending: false });

      if (status && status !== "all") {
        query = query.eq("status", status as any);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as BlogPost[];
    },
  });
};

export const usePublishedBlogPosts = () => {
  return useQuery({
    queryKey: ["published-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          category:blog_categories(*)
        `)
        .eq("status", "published")
        .lte("publish_date", new Date().toISOString())
        .order("publish_date", { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          category:blog_categories(*)
        `)
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data as BlogPost;
    },
    enabled: !!slug,
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BlogPostFormData) => {
      const stats = readingTime(data.content);
      const readTime = Math.ceil(stats.minutes);

      const { data: post, error } = await supabase
        .from("blog_posts")
        .insert([{ ...data, read_time: readTime }])
        .select()
        .single();

      if (error) throw error;
      return post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Post creado exitosamente");
    },
    onError: (error) => {
      toast.error("Error al crear el post: " + error.message);
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<BlogPostFormData> }) => {
      let readTime = undefined;
      if (data.content) {
        const stats = readingTime(data.content);
        readTime = Math.ceil(stats.minutes);
      }

      const { data: post, error } = await supabase
        .from("blog_posts")
        .update({ ...data, read_time: readTime })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-post"] });
      toast.success("Post actualizado exitosamente");
    },
    onError: (error) => {
      toast.error("Error al actualizar el post: " + error.message);
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Post eliminado exitosamente");
    },
    onError: (error) => {
      toast.error("Error al eliminar el post: " + error.message);
    },
  });
};

export const useIncrementViews = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      // Simple increment without RPC function
      const { data: post } = await supabase
        .from("blog_posts")
        .select("views")
        .eq("id", id)
        .single();

      if (post) {
        await supabase
          .from("blog_posts")
          .update({ views: post.views + 1 })
          .eq("id", id);
      }
    },
  });
};
