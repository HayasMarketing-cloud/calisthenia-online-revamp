import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBlogPosts, useDeleteBlogPost } from "@/hooks/useBlogPosts";
import { Plus, Search, Pencil, Trash2, Eye, Calendar } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BlogManager = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: posts, isLoading } = useBlogPosts(statusFilter);
  const deleteMutation = useDeleteBlogPost();

  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      published: "default",
      draft: "secondary",
      scheduled: "outline",
    };
    return (
      <Badge variant={variants[status]}>
        {status === "published" ? "Publicado" : status === "draft" ? "Borrador" : "Programado"}
      </Badge>
    );
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteMutation.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const stats = {
    total: posts?.length || 0,
    published: posts?.filter((p) => p.status === "published").length || 0,
    draft: posts?.filter((p) => p.status === "draft").length || 0,
    scheduled: posts?.filter((p) => p.status === "scheduled").length || 0,
    totalViews: posts?.reduce((sum, p) => sum + p.views, 0) || 0,
  };

  return (
    <>
      <Helmet>
        <title>Gestor de Blog - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <AdminBreadcrumbs current="Blog" />
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Gestor de Blog</h1>
                <p className="text-muted-foreground">
                  Administra tus artículos y contenido
                </p>
              </div>
              <Button onClick={() => navigate("/admin/blog/nuevo")} size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Nuevo Post
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Posts</CardDescription>
                  <CardTitle className="text-3xl">{stats.total}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Publicados</CardDescription>
                  <CardTitle className="text-3xl">{stats.published}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Borradores</CardDescription>
                  <CardTitle className="text-3xl">{stats.draft}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Programados</CardDescription>
                  <CardTitle className="text-3xl">{stats.scheduled}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Vistas Totales</CardDescription>
                  <CardTitle className="text-3xl">{stats.totalViews}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="published">Publicados</TabsTrigger>
                <TabsTrigger value="draft">Borradores</TabsTrigger>
                <TabsTrigger value="scheduled">Programados</TabsTrigger>
              </TabsList>

              <TabsContent value={statusFilter}>
                {isLoading ? (
                  <div className="text-center py-12">Cargando...</div>
                ) : filteredPosts && filteredPosts.length > 0 ? (
                  <div className="space-y-4">
                    {filteredPosts.map((post) => (
                      <Card key={post.id}>
                        <CardContent className="pt-6">
                          <div className="flex gap-4">
                            {post.featured_image && (
                              <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-32 h-20 object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="text-xl font-semibold mb-1">
                                    {post.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {post.excerpt}
                                  </p>
                                </div>
                                {getStatusBadge(post.status)}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                {post.category && (
                                  <span
                                    className="px-2 py-1 rounded text-xs font-medium"
                                    style={{
                                      backgroundColor: post.category.color + "20",
                                      color: post.category.color,
                                    }}
                                  >
                                    {post.category.name}
                                  </span>
                                )}
                                {post.publish_date && (
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {format(new Date(post.publish_date), "d 'de' MMMM, yyyy", {
                                      locale: es,
                                    })}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {post.views} vistas
                                </span>
                                {post.read_time && <span>{post.read_time} min lectura</span>}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/admin/blog/editar/${post.id}`)}
                                >
                                  <Pencil className="h-4 w-4 mr-1" />
                                  Editar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Ver
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setDeleteId(post.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Eliminar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">No hay posts disponibles</p>
                      <Button
                        onClick={() => navigate("/admin/blog/nuevo")}
                        className="mt-4"
                      >
                        Crear tu primer post
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El post será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BlogManager;
