import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoutineBreadcrumbs from "@/components/routine/RoutineBreadcrumbs";
import BlogPostCard from "@/components/blog/BlogPostCard";
import LatestVideosCarousel from "@/components/LatestVideosCarousel";

const Blog = () => {
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Blog", href: "/blog/" },
  ];

  const posts = [
    {
      title: "Qué es la Calistenia",
      excerpt: "Descubre qué es la calistenia, sus orígenes históricos y por qué es el mejor método de entrenamiento con peso corporal.",
      slug: "que-es-la-calistenia",
      date: "2025",
      readTime: "8 min",
    },
  ];

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
          
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Blog de Calistenia
            </h1>
            <p className="text-lg text-muted-foreground">
              Guías completas, consejos de entrenamiento y todo sobre calistenia
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} {...post} />
            ))}
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
