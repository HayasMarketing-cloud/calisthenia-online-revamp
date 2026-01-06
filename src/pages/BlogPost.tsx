import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoutineBreadcrumbs from "@/components/routine/RoutineBreadcrumbs";
import { useBlogPost, useIncrementViews, usePublishedBlogPosts } from "@/hooks/useBlogPosts";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, Calendar, Eye, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StructuredData from "@/components/seo/StructuredData";
import { generateVideoSchema } from "@/lib/schemas";
import { sanitizeHtml } from "@/lib/sanitizer";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug || "");
  const { data: allPosts } = usePublishedBlogPosts();
  const incrementViews = useIncrementViews();

  useEffect(() => {
    if (post?.id) {
      incrementViews.mutate(post.id);
    }
  }, [post?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">Cargando...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Post no encontrado</h1>
            <Link to="/blog">
              <Button>Volver al blog</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Blog", href: "/blog/" },
    { label: post.title, href: `/blog/${post.slug}/` },
  ];

  const relatedPosts = allPosts
    ?.filter((p) => p.id !== post.id && p.category_id === post.category_id)
    .slice(0, 3);

  const shareUrl = `https://calisthenia.online/blog/${post.slug}/`;
  const shareText = post.title;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    image: post.featured_image,
    datePublished: post.publish_date,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: "Nicolás Reyero",
    },
    publisher: {
      "@type": "Organization",
      name: "Calistenia Online",
      logo: {
        "@type": "ImageObject",
        url: "https://calisthenia.online/logo.png",
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>{post.seo_title || post.title} - Calistenia Online</title>
        <meta
          name="description"
          content={post.seo_description || post.excerpt || ""}
        />
        <link rel="canonical" href={shareUrl} />
        <meta property="og:title" content={post.seo_title || post.title} />
        <meta
          property="og:description"
          content={post.seo_description || post.excerpt || ""}
        />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta property="article:published_time" content={post.publish_date || ""} />
        <meta property="article:modified_time" content={post.updated_at} />
      </Helmet>

      <StructuredData data={articleSchema} />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-12">
          <RoutineBreadcrumbs items={breadcrumbItems} />

          <article className="max-w-4xl mx-auto">
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-lg mb-8"
              />
            )}

            {post.category && (
              <span
                className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                style={{
                  backgroundColor: post.category.color + "20",
                  color: post.category.color,
                }}
              >
                {post.category.name}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
              {post.publish_date && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(post.publish_date), "d 'de' MMMM, yyyy", {
                    locale: es,
                  })}
                </span>
              )}
              {post.read_time && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.read_time} min de lectura
                </span>
              )}
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {post.views} vistas
              </span>
            </div>

            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />

            {post.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-2">Etiquetas:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-b py-6 mb-12">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Compartir este artículo
              </h3>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                      "_blank"
                    )
                  }
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
                      "_blank"
                    )
                  }
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                      "_blank"
                    )
                  }
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>

            {relatedPosts && relatedPosts.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6">Artículos relacionados</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}/`}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        {relatedPost.featured_image && (
                          <img
                            src={relatedPost.featured_image}
                            alt={relatedPost.title}
                            className="w-full h-40 object-cover"
                          />
                        )}
                        <CardHeader>
                          <CardTitle className="text-lg">{relatedPost.title}</CardTitle>
                          <CardDescription>{relatedPost.excerpt}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
