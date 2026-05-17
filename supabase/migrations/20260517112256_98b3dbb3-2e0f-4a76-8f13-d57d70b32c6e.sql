
-- ============== ENUM override_type ==============
CREATE TYPE public.override_type AS ENUM (
  'skip_day',
  'swap_exercise',
  'change_sets_reps',
  'add_exercise',
  'remove_exercise',
  'custom_note',
  'reschedule'
);

-- ============== program_template_versions ==============
CREATE TABLE public.program_template_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL,
  version_number int NOT NULL,
  snapshot_jsonb jsonb NOT NULL,
  change_notes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (template_id, version_number)
);
CREATE INDEX idx_template_versions_template ON public.program_template_versions(template_id, version_number DESC);
ALTER TABLE public.program_template_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages template versions"
ON public.program_template_versions FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- ============== program_day_overrides ==============
CREATE TABLE public.program_day_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_day_id uuid NOT NULL,
  client_id uuid NOT NULL,
  override_type override_type NOT NULL,
  payload_jsonb jsonb NOT NULL DEFAULT '{}'::jsonb,
  reason text,
  is_active boolean NOT NULL DEFAULT true,
  applied_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_day_overrides_day_client ON public.program_day_overrides(program_day_id, client_id, is_active);
CREATE INDEX idx_day_overrides_client ON public.program_day_overrides(client_id, applied_at DESC);
ALTER TABLE public.program_day_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages day overrides"
ON public.program_day_overrides FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients view own day overrides"
ON public.program_day_overrides FOR SELECT TO authenticated
USING (client_id = auth.uid());

CREATE TRIGGER trg_day_overrides_updated
BEFORE UPDATE ON public.program_day_overrides
FOR EACH ROW EXECUTE FUNCTION public.update_seo_pages_updated_at();

-- ============== Helper: crear snapshot de una plantilla ==============
CREATE OR REPLACE FUNCTION public.create_template_version(
  p_template_id uuid,
  p_change_notes text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_next_version int;
  v_snapshot jsonb;
  v_id uuid;
BEGIN
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'No autorizado';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM programs WHERE id = p_template_id AND is_template = true) THEN
    RAISE EXCEPTION 'La plantilla % no existe o no es plantilla', p_template_id;
  END IF;

  SELECT COALESCE(MAX(version_number), 0) + 1
    INTO v_next_version
    FROM program_template_versions
   WHERE template_id = p_template_id;

  -- Snapshot completo: programa + semanas + días + ejercicios
  SELECT jsonb_build_object(
    'program', to_jsonb(p.*),
    'weeks', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'week', to_jsonb(pw.*),
        'days', COALESCE((
          SELECT jsonb_agg(jsonb_build_object(
            'day', to_jsonb(pd.*),
            'exercises', COALESCE((
              SELECT jsonb_agg(to_jsonb(pde.*) ORDER BY pde.order_index)
              FROM program_day_exercises pde WHERE pde.day_id = pd.id
            ), '[]'::jsonb)
          ) ORDER BY pd.day_number)
          FROM program_days pd WHERE pd.week_id = pw.id
        ), '[]'::jsonb)
      ) ORDER BY pw.week_number)
      FROM program_weeks pw WHERE pw.program_id = p.id
    ), '[]'::jsonb)
  )
  INTO v_snapshot
  FROM programs p WHERE p.id = p_template_id;

  INSERT INTO program_template_versions (template_id, version_number, snapshot_jsonb, change_notes, created_by)
  VALUES (p_template_id, v_next_version, v_snapshot, p_change_notes, auth.uid())
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.create_template_version(uuid, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.create_template_version(uuid, text) TO authenticated;
