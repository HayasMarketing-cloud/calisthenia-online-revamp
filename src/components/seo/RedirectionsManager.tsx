import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { seoConfig, Redirect } from "@/config/seoConfig";
import { Search, Download, Plus, Trash2, Edit, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const RedirectionsManager = () => {
  const [redirects, setRedirects] = useState<Redirect[]>(seoConfig.redirects);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Redirect>({ from: "", to: "", code: 301 });

  const filteredRedirects = redirects.filter(
    redirect =>
      redirect.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      redirect.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (index: number) => {
    const newRedirects = redirects.filter((_, i) => i !== index);
    setRedirects(newRedirects);
    toast.success("Redirección eliminada");
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm(redirects[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const newRedirects = [...redirects];
      newRedirects[editingIndex] = editForm;
      setRedirects(newRedirects);
      setEditingIndex(null);
      toast.success("Redirección actualizada");
    }
  };

  const handleAdd = () => {
    if (editForm.from && editForm.to) {
      setRedirects([...redirects, editForm]);
      setEditForm({ from: "", to: "", code: 301 });
      toast.success("Redirección añadida");
    } else {
      toast.error("Completa todos los campos");
    }
  };

  const handleExport = () => {
    const content = redirects.map(r => `${r.from} ${r.to} ${r.code}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '_redirects';
    a.click();
    toast.success("Archivo exportado");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestor de Redirecciones</CardTitle>
          <CardDescription>
            Gestiona las {redirects.length} redirecciones 301 configuradas en tu sitio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por URL origen o destino..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL Origen</TableHead>
                  <TableHead>URL Destino</TableHead>
                  <TableHead className="w-24">Código</TableHead>
                  <TableHead className="w-32 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRedirects.map((redirect, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">
                      {editingIndex === index ? (
                        <Input
                          value={editForm.from}
                          onChange={(e) => setEditForm({ ...editForm, from: e.target.value })}
                          className="h-8"
                        />
                      ) : (
                        redirect.from
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {editingIndex === index ? (
                        <Input
                          value={editForm.to}
                          onChange={(e) => setEditForm({ ...editForm, to: e.target.value })}
                          className="h-8"
                        />
                      ) : (
                        redirect.to
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        {redirect.code}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {editingIndex === index ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleSaveEdit}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(index)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Añadir Nueva Redirección</CardTitle>
          <CardDescription>
            Crea una nueva redirección 301 permanente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="/url-antigua/"
              value={editForm.from}
              onChange={(e) => setEditForm({ ...editForm, from: e.target.value })}
            />
            <Input
              placeholder="/url-nueva/"
              value={editForm.to}
              onChange={(e) => setEditForm({ ...editForm, to: e.target.value })}
            />
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Añadir Redirección
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedirectionsManager;
