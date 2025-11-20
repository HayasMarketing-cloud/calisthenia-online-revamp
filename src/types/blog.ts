export type BlogStatus = 'draft' | 'published' | 'scheduled';

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  author_id?: string;
  category_id?: string;
  category?: BlogCategory;
  tags: string[];
  featured_image?: string;
  status: BlogStatus;
  publish_date?: string;
  views: number;
  read_time?: number;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  created_at: string;
  updated_at: string;
}

export interface BlogPostFormData {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category_id?: string;
  tags: string[];
  featured_image?: string;
  status: BlogStatus;
  publish_date?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
}
