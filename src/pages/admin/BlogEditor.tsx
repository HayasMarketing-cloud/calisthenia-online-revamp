import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBlogPost, useCreateBlogPost, useUpdateBlogPost } from "@/hooks/useBlogPosts";
import { useBlogCategories } from "@/hooks/useBlogCategories";
import { BlogPostFormData } from "@/types/blog";
import { ArrowLeft, Save, Eye, Calendar } from "lucide-react";
import slugify from "slugify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { data: post, isLoading: isLoadingPost } = useBlogPost(id || "");
  const { data: categories } = useBlogCategories();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();

  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BlogPostFormData>({
    defaultValues: {
      status: "draft",
      tags: [],
    },
  });

  const title = watch("title");

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("slug", post.slug);
      setValue("excerpt", post.excerpt || "");
      setValue("category_id", post.category_id || "");
      setValue("featured_image", post.featured_image || "");
      setValue("status", post.status);
      setValue("publish_date", post.publish_date || "");
      setValue("seo_title", post.seo_title || "");
      setValue("seo_description", post.seo_description || "");
      setValue("seo_keywords", post.seo_keywords || []);
      setContent(post.content);
      setTags(post.tags.join(", "));
    }
  }, [post, setValue]);

  useEffect(() => {
    if (title && !isEditing) {
      const slug = slugify(title, { lower: true, strict: true, locale: "es" });
      setValue("slug", slug);
    }
  }, [title, setValue, isEditing]);

  const onSubmit = async (data: BlogPostFormData) => {
    const formData: BlogPostFormData = {
      ...data,
      content,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    if (isEditing && id) {
      await updateMutation.mutateAsync({ id, data: formData });
    } else {
      await createMutation.mutateAsync(formData);
    }

    navigate("/admin/blog");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  if (isLoadingPost && isEditing) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{isEditing ? "Editar Post" : "Nuevo Post"} - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate("/admin/blog")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>

            <h1 className="text-4xl font-bold mb-8">
              {isEditing ? "Editar Post" : "Nuevo Post"}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contenido Principal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="title">Título *</Label>
                        <Input
                          id="title"
                          {...register("title", { required: true })}
                          placeholder="Título del artículo"
                        />
                        {errors.title && (
                          <p className="text-sm text-destructive mt-1">El título es requerido</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="slug">Slug (URL)</Label>
                        <Input id="slug" {...register("slug", { required: true })} />
                        {errors.slug && (
                          <p className="text-sm text-destructive mt-1">El slug es requerido</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="excerpt">Extracto</Label>
                        <Textarea
                          id="excerpt"
                          {...register("excerpt")}
                          placeholder="Breve descripción del artículo"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Contenido *</Label>
                        <div className="mt-2 bg-background">
                          <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            className="min-h-[400px]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>SEO</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="seo_title">Título SEO</Label>
                        <Input
                          id="seo_title"
                          {...register("seo_title")}
                          placeholder="Dejar vacío para usar el título del post"
                        />
                      </div>

                      <div>
                        <Label htmlFor="seo_description">Descripción SEO</Label>
                        <Textarea
                          id="seo_description"
                          {...register("seo_description")}
                          placeholder="Meta descripción para buscadores"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Publicación</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="status">Estado</Label>
                        <Select
                          value={watch("status")}
                          onValueChange={(value) => setValue("status", value as any)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Borrador</SelectItem>
                            <SelectItem value="published">Publicado</SelectItem>
                            <SelectItem value="scheduled">Programado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {watch("status") !== "draft" && (
                        <div>
                          <Label htmlFor="publish_date">Fecha de publicación</Label>
                          <Input
                            id="publish_date"
                            type="datetime-local"
                            {...register("publish_date")}
                          />
                        </div>
                      )}

                      <div className="pt-4 space-y-2">
                        <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>
                          <Save className="mr-2 h-4 w-4" />
                          {isEditing ? "Actualizar" : "Crear"}
                        </Button>
                        {watch("slug") && (
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => window.open(`/blog/${watch("slug")}`, "_blank")}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Vista Previa
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Organización</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="category_id">Categoría</Label>
                        <Select
                          value={watch("category_id")}
                          onValueChange={(value) => setValue("category_id", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="tags">Etiquetas (separadas por coma)</Label>
                        <Input
                          id="tags"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="calistenia, ejercicios, rutina"
                        />
                      </div>

                      <div>
                        <Label htmlFor="featured_image">Imagen destacada (URL)</Label>
                        <Input
                          id="featured_image"
                          {...register("featured_image")}
                          placeholder="https://ejemplo.com/imagen.jpg"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogEditor;
