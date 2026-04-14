import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { toast } from "@/hooks/use-toast";
import { Trash2, Download, Users } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  age: number;
  goal: string;
  phone: string;
  created_at: string;
}

const LeadsManager = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error al cargar leads", variant: "destructive" });
    } else {
      setLeads((data as Lead[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) {
      toast({ title: "Error al eliminar", variant: "destructive" });
    } else {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      toast({ title: "Lead eliminado" });
    }
  };

  const handleExportCSV = () => {
    if (!leads.length) return;
    const header = "Nombre,Edad,Objetivo,Teléfono,Fecha\n";
    const rows = leads.map((l) =>
      `"${l.name}",${l.age},"${l.goal}","${l.phone}","${new Date(l.created_at).toLocaleDateString("es-ES")}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/admin/">Admin</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Leads</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leads capturados</h1>
            <p className="text-sm text-muted-foreground">{leads.length} registro{leads.length !== 1 ? "s" : ""}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={!leads.length}>
            <Download className="h-4 w-4 mr-1" /> Exportar CSV
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Cargando…</div>
            ) : !leads.length ? (
              <div className="p-8 text-center text-muted-foreground flex flex-col items-center gap-2">
                <Users className="h-10 w-10" />
                <p>Aún no hay leads. Comparte la página <strong>/empezar/</strong></p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Edad</TableHead>
                    <TableHead>Objetivo</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.age}</TableCell>
                      <TableCell>{lead.goal}</TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {new Date(lead.created_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(lead.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeadsManager;
