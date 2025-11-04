import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Plus, Trash2, Edit, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRedirects, useCreateRedirect, useUpdateRedirect, useDeleteRedirect } from "@/hooks/useSEOData";

const RedirectionsManager = () => {
  const { data: redirects, isLoading } = useRedirects();
  const createRedirect = useCreateRedirect();
  const updateRedirect = useUpdateRedirect();
  const deleteRedirect = useDeleteRedirect();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ from_path: "", to_path: "", code: 301 });
  const [newForm, setNewForm] = useState({ from_path: "", to_path: "", code: 301 });

  const filteredRedirects = redirects?.filter(
    redirect =>
      redirect.from_path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      redirect.to_path.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteRedirect.mutateAsync(id);
      toast.success("Redirección eliminada");
    } catch (error) {
      toast.error("Error al eliminar redirección");
    }
  };

  const handleEdit = (redirect: any) => {
    setEditingId(redirect.id);
    setEditForm({
      from_path: redirect.from_path,
      to_path: redirect.to_path,
      code: redirect.code
    });
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await updateRedirect.mutateAsync({ id, ...editForm });
      setEditingId(null);
      toast.success("Redirección actualizada");
    } catch (error) {
      toast.error("Error al actualizar redirección");
    }
  };

  const handleAdd = async () => {
    if (newForm.from_path && newForm.to_path) {
      try {
        await createRedirect.mutateAsync(newForm);
        setNewForm({ from_path: "", to_path: "", code: 301 });
        toast.success("Redirección añadida");
      } catch (error) {
        toast.error("Error al añadir redirección");
      }
    } else {
      toast.error("Completa todos los campos");
    }
  };

  const handleExport = () => {
    const content = redirects?.map(r => `${r.from_path} ${r.to_path} ${r.code}`).join('\n') || '';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '_redirects';
    a.click();
    toast.success("Archivo exportado");
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando redirecciones...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestor de Redirecciones</CardTitle>
          <CardDescription>
            Gestiona las {redirects?.length || 0} redirecciones 301 configuradas en tu sitio
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
                {filteredRedirects.map((redirect) => (
                  <TableRow key={redirect.id}>
                    <TableCell className="font-mono text-sm">
                      {editingId === redirect.id ? (
                        <Input
                          value={editForm.from_path}
                          onChange={(e) => setEditForm({ ...editForm, from_path: e.target.value })}
                          className="h-8"
                        />
                      ) : (
                        redirect.from_path
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {editingId === redirect.id ? (
                        <Input
                          value={editForm.to_path}
                          onChange={(e) => setEditForm({ ...editForm, to_path: e.target.value })}
                          className="h-8"
                        />
                      ) : (
                        redirect.to_path
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        {redirect.code}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === redirect.id ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleSaveEdit(redirect.id)}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(redirect)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(redirect.id)}
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
              value={newForm.from_path}
              onChange={(e) => setNewForm({ ...newForm, from_path: e.target.value })}
            />
            <Input
              placeholder="/url-nueva/"
              value={newForm.to_path}
              onChange={(e) => setNewForm({ ...newForm, to_path: e.target.value })}
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
