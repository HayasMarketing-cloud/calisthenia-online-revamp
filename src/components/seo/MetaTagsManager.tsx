import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { seoConfig, PageSEO } from "@/config/seoConfig";
import { Search, Edit, Save, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const MetaTagsManager = () => {
  const [pages, setPages] = useState<PageSEO[]>(seoConfig.pages);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<PageSEO | null>(null);

  const filteredPages = pages.filter(
    page =>
      page.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...pages[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null && editForm) {
      const newPages = [...pages];
      newPages[editingIndex] = editForm;
      setPages(newPages);
      setEditingIndex(null);
      setEditForm(null);
      toast.success("Cambios guardados");
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditForm(null);
  };

  const getTitleLength = (title: string) => title.length;
  const getDescriptionLength = (desc: string) => desc.length;

  const isValidTitle = (title: string) => {
    const len = getTitleLength(title);
    return len >= 50 && len <= 60;
  };

  const isValidDescription = (desc: string) => {
    const len = getDescriptionLength(desc);
    return len >= 150 && len <= 160;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestor de Meta Tags</CardTitle>
          <CardDescription>
            Gestiona los meta tags, títulos y encabezados de todas las páginas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ruta o título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredPages.map((page, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{page.path}</CardTitle>
                      <CardDescription className="mt-1">
                        {editingIndex === index ? "Editando página" : page.title}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {editingIndex === index ? (
                        <>
                          <Button size="sm" onClick={handleSave}>
                            <Save className="h-4 w-4 mr-2" />
                            Guardar
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            <X className="h-4 w-4 mr-2" />
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleEdit(index)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingIndex === index && editForm ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Title Tag {getTitleLength(editForm.title)}/60
                          {!isValidTitle(editForm.title) && (
                            <span className="text-orange-500 ml-2">
                              <AlertCircle className="h-4 w-4 inline" />
                            </span>
                          )}
                        </label>
                        <Input
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          placeholder="Título SEO (50-60 caracteres)"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Meta Description {getDescriptionLength(editForm.description)}/160
                          {!isValidDescription(editForm.description) && (
                            <span className="text-orange-500 ml-2">
                              <AlertCircle className="h-4 w-4 inline" />
                            </span>
                          )}
                        </label>
                        <Textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          placeholder="Descripción meta (150-160 caracteres)"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">H1</label>
                        <Input
                          value={editForm.h1}
                          onChange={(e) => setEditForm({ ...editForm, h1: e.target.value })}
                          placeholder="Encabezado principal H1"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">H2s (hasta 3)</label>
                        {[0, 1, 2].map((i) => (
                          <Input
                            key={i}
                            value={editForm.h2s[i] || ""}
                            onChange={(e) => {
                              const newH2s = [...editForm.h2s];
                              newH2s[i] = e.target.value;
                              setEditForm({ ...editForm, h2s: newH2s });
                            }}
                            placeholder={`H2 #${i + 1} (opcional)`}
                            className="mb-2"
                          />
                        ))}
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Canonical URL</label>
                        <Input
                          value={editForm.canonical}
                          onChange={(e) => setEditForm({ ...editForm, canonical: e.target.value })}
                          placeholder="https://calisthenia.online/..."
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium">Title:</span>
                        <span className="ml-2 text-muted-foreground">{page.title}</span>
                        {isValidTitle(page.title) ? (
                          <CheckCircle2 className="h-4 w-4 inline text-green-500 ml-2" />
                        ) : (
                          <AlertCircle className="h-4 w-4 inline text-orange-500 ml-2" />
                        )}
                      </div>
                      <div>
                        <span className="font-medium">Description:</span>
                        <span className="ml-2 text-muted-foreground">{page.description}</span>
                        {isValidDescription(page.description) ? (
                          <CheckCircle2 className="h-4 w-4 inline text-green-500 ml-2" />
                        ) : (
                          <AlertCircle className="h-4 w-4 inline text-orange-500 ml-2" />
                        )}
                      </div>
                      <div>
                        <span className="font-medium">H1:</span>
                        <span className="ml-2 text-muted-foreground">{page.h1}</span>
                      </div>
                      <div>
                        <span className="font-medium">H2s:</span>
                        <ul className="ml-6 mt-1 list-disc">
                          {page.h2s.map((h2, i) => (
                            <li key={i} className="text-muted-foreground">{h2}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaTagsManager;
