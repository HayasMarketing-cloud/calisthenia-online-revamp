import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, ChevronRight, ChevronLeft } from 'lucide-react';

const TOTAL_STEPS = 4;

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    short_term_goal: '',
    long_term_goal: '',
    health_conditions: '',
    activity_level: 'sedentary' as 'sedentary' | 'light_active' | 'active' | 'very_active',
    lifestyle_description: '',
    training_experience: '',
    bodyweight_experience: false,
    current_training_description: '',
    max_pull_ups: '',
    max_push_ups: '',
    max_squats: '',
    training_location: '',
    available_equipment: '',
    training_days_per_week: '3',
    session_duration_minutes: '60',
    date_of_birth: '',
    weight_kg: '',
    height_cm: '',
  });

  const update = (key: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error: profileError } = await supabase.from('client_profiles').insert({
        id: user.id,
        short_term_goal: form.short_term_goal || null,
        long_term_goal: form.long_term_goal || null,
        health_conditions: form.health_conditions || null,
        activity_level: form.activity_level,
        lifestyle_description: form.lifestyle_description || null,
        training_experience: form.training_experience || null,
        bodyweight_experience: form.bodyweight_experience,
        current_training_description: form.current_training_description || null,
        max_pull_ups: form.max_pull_ups ? parseInt(form.max_pull_ups) : null,
        max_push_ups: form.max_push_ups ? parseInt(form.max_push_ups) : null,
        max_squats: form.max_squats ? parseInt(form.max_squats) : null,
        training_location: form.training_location || null,
        available_equipment: form.available_equipment || null,
        training_days_per_week: parseInt(form.training_days_per_week) || 3,
        session_duration_minutes: parseInt(form.session_duration_minutes) || 60,
        date_of_birth: form.date_of_birth || null,
        weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
        height_cm: form.height_cm ? parseFloat(form.height_cm) : null,
      });

      if (profileError) throw profileError;

      // Create initial baseline metrics
      if (form.max_pull_ups || form.max_push_ups || form.max_squats || form.weight_kg) {
        await supabase.from('baseline_metrics').insert({
          client_id: user.id,
          max_pull_ups: form.max_pull_ups ? parseInt(form.max_pull_ups) : null,
          max_push_ups: form.max_push_ups ? parseInt(form.max_push_ups) : null,
          max_squats: form.max_squats ? parseInt(form.max_squats) : null,
          weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
        });
      }

      toast.success('¡Perfil completado! Bienvenido 💪');
      // Set cache directly to avoid race condition with AppRoute guard
      queryClient.setQueryData(['client-profile', user.id], { id: user.id });
      navigate('/app', { replace: true });
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar el perfil');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-muted h-1">
        <div
          className="bg-primary h-1 transition-all duration-300"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          {step === 1 && '🎯 Tus objetivos'}
          {step === 2 && '🏃 Tu nivel actual'}
          {step === 3 && '💪 Baseline'}
          {step === 4 && '📅 Disponibilidad'}
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">Paso {step} de {TOTAL_STEPS}</p>

        {/* Step 1: Goals */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label>¿Qué quieres conseguir a corto plazo?</Label>
              <Textarea value={form.short_term_goal} onChange={e => update('short_term_goal', e.target.value)} placeholder="Ej: Hacer mi primera dominada" />
            </div>
            <div>
              <Label>¿Y a medio-largo plazo?</Label>
              <Textarea value={form.long_term_goal} onChange={e => update('long_term_goal', e.target.value)} placeholder="Ej: Muscle-up, plancha..." />
            </div>
            <div>
              <Label>¿Alguna lesión o condición de salud?</Label>
              <Textarea value={form.health_conditions} onChange={e => update('health_conditions', e.target.value)} placeholder="Opcional — esta info es privada" />
            </div>
          </div>
        )}

        {/* Step 2: Current level */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Nivel de actividad diaria</Label>
              <Select value={form.activity_level} onValueChange={v => update('activity_level', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentario</SelectItem>
                  <SelectItem value="light_active">Ligeramente activo</SelectItem>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="very_active">Muy activo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Describe tu día a día</Label>
              <Textarea value={form.lifestyle_description} onChange={e => update('lifestyle_description', e.target.value)} placeholder="Trabajo de oficina, camino 30min..." />
            </div>
            <div>
              <Label>Experiencia de entrenamiento</Label>
              <Textarea value={form.training_experience} onChange={e => update('training_experience', e.target.value)} placeholder="¿Cuánto llevas entrenando?" />
            </div>
            <div>
              <Label>¿Cómo entrenas actualmente?</Label>
              <Textarea value={form.current_training_description} onChange={e => update('current_training_description', e.target.value)} placeholder="Tipo de ejercicios, frecuencia..." />
            </div>
          </div>
        )}

        {/* Step 3: Baseline */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">No pasa nada si es 0 — es tu punto de partida.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Dominadas máx.</Label>
                <Input type="number" value={form.max_pull_ups} onChange={e => update('max_pull_ups', e.target.value)} placeholder="0" />
              </div>
              <div>
                <Label>Flexiones máx.</Label>
                <Input type="number" value={form.max_push_ups} onChange={e => update('max_push_ups', e.target.value)} placeholder="0" />
              </div>
              <div>
                <Label>Sentadillas máx.</Label>
                <Input type="number" value={form.max_squats} onChange={e => update('max_squats', e.target.value)} placeholder="0" />
              </div>
              <div>
                <Label>Peso (kg)</Label>
                <Input type="number" value={form.weight_kg} onChange={e => update('weight_kg', e.target.value)} placeholder="70" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Altura (cm)</Label>
                <Input type="number" value={form.height_cm} onChange={e => update('height_cm', e.target.value)} placeholder="175" />
              </div>
              <div>
                <Label>Fecha nacimiento</Label>
                <Input type="date" value={form.date_of_birth} onChange={e => update('date_of_birth', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Availability */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <Label>¿Dónde entrenas?</Label>
              <Input value={form.training_location} onChange={e => update('training_location', e.target.value)} placeholder="Parque, casa, gimnasio..." />
            </div>
            <div>
              <Label>Material disponible</Label>
              <Input value={form.available_equipment} onChange={e => update('available_equipment', e.target.value)} placeholder="Barra, anillas, bandas..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Días por semana</Label>
                <Select value={form.training_days_per_week} onValueChange={v => update('training_days_per_week', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[2, 3, 4, 5, 6].map(n => (
                      <SelectItem key={n} value={String(n)}>{n} días</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Min. por sesión</Label>
                <Select value={form.session_duration_minutes} onValueChange={v => update('session_duration_minutes', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[30, 45, 60, 75, 90].map(n => (
                      <SelectItem key={n} value={String(n)}>{n} min</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-auto pt-8 flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(s => s - 1)} className="flex-1">
              <ChevronLeft className="h-4 w-4 mr-1" /> Atrás
            </Button>
          )}
          {step < TOTAL_STEPS ? (
            <Button onClick={() => setStep(s => s + 1)} className="flex-1">
              Siguiente <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={saving} className="flex-1">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Completar perfil 💪
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
