import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoutineBreadcrumbs from "@/components/routine/RoutineBreadcrumbs";
import BlogPostCard from "@/components/blog/BlogPostCard";
import LatestVideosCarousel from "@/components/LatestVideosCarousel";
import { usePublishedBlogPosts } from "@/hooks/useBlogPosts";
import { useBlogCategories } from "@/hooks/useBlogCategories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: posts, isLoading } = usePublishedBlogPosts();
  const { data: categories } = useBlogCategories();

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Blog", href: "/blog/" },
  ];

  const filteredPosts = posts?.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Blog de Calistenia | Guías y Consejos - Calistenia Online</title>
        <meta
          name="description"
          content="Blog de calistenia con guías completas, consejos de entrenamiento y todo lo que necesitas saber sobre ejercicios con peso corporal."
        />
        <link rel="canonical" href="https://calisthenia.online/blog/" />
        <meta property="og:title" content="Blog de Calistenia | Guías y Consejos" />
        <meta
          property="og:description"
          content="Blog de calistenia con guías completas, consejos de entrenamiento y todo lo que necesitas saber sobre ejercicios con peso corporal."
        />
        <meta property="og:url" content="https://calisthenia.online/blog/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <RoutineBreadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Blog de Calistenia
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Guías completas, consejos de entrenamiento y todo sobre calistenia
              </p>

              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                <Button
                  variant={!selectedCategory ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Todas
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    style={
                      selectedCategory === cat.id
                        ? { backgroundColor: cat.color, borderColor: cat.color }
                        : {}
                    }
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-12">Cargando artículos...</div>
            ) : filteredPosts && filteredPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <BlogPostCard
                    key={post.slug}
                    title={post.title}
                    excerpt={post.excerpt || ""}
                    slug={post.slug}
                    date={post.publish_date || post.created_at}
                    readTime={post.read_time ? `${post.read_time} min` : ""}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No se encontraron artículos
                </p>
                <Button onClick={() => { setSearchTerm(""); setSelectedCategory(null); }}>
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>

          <section className="py-16 bg-slate-50 mt-16 rounded-xl">
            <div className="container mx-auto px-4">
              <LatestVideosCarousel />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
