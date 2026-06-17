import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GAMMA_URL = "https://0-a-5-dominadas-25igo3j.gamma.site/";

const LeadCapture = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", goal: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.age || !form.goal.trim() || !form.phone.trim()) {
      toast({ title: "Completa todos los campos", variant: "destructive" });
      return;
    }
    const age = parseInt(form.age, 10);
    if (isNaN(age) || age < 10 || age > 100) {
      toast({ title: "Edad no válida", variant: "destructive" });
      return;
    }
    if (form.phone.trim().length < 6) {
      toast({ title: "Teléfono no válido", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.functions.invoke("submit-lead", {
      body: {
        name: form.name.trim(),
        age,
        goal: form.goal.trim(),
        phone: form.phone.trim(),
      },
    });
    setLoading(false);

    if (error || (data && (data as { error?: string }).error)) {
      toast({ title: "Error al enviar", description: "Inténtalo de nuevo", variant: "destructive" });
      return;
    }

    window.location.href = GAMMA_URL;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-4 bg-gradient-to-br from-background to-muted">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
              Programa gratuito
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              De 0 a 5 Dominadas
            </h1>
            <p className="text-muted-foreground text-base">
              Consigue tu primera dominada (o llega a 5) con un plan progresivo paso a paso. Déjanos tus datos y accede al programa completo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 bg-card p-6 rounded-xl border shadow-lg">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                placeholder="Tu nombre completo"
                value={form.name}
                onChange={handleChange}
                maxLength={100}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Edad</Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Ej: 28"
                min={10}
                max={100}
                value={form.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Objetivo</Label>
              <select
                id="goal"
                name="goal"
                value={form.goal}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
              >
                <option value="">Selecciona tu objetivo</option>
                <option value="Ganar fuerza">Ganar fuerza</option>
                <option value="Perder grasa">Perder grasa</option>
                <option value="Aprender calistenia">Aprender calistenia</option>
                <option value="Mejorar movilidad">Mejorar movilidad</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+34 600 000 000"
                value={form.phone}
                onChange={handleChange}
                maxLength={20}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Enviando..." : "Quiero hacer mi primera dominada 💪"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Al enviar aceptas que guardemos tus datos para contactarte.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeadCapture;
