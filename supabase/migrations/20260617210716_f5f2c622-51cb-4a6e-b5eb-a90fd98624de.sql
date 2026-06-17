CREATE OR REPLACE FUNCTION public.user_owns_program_day(_day_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF _user_id IS DISTINCT FROM auth.uid() AND NOT public.has_role(auth.uid(), 'admin') THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM program_days pd
    JOIN program_weeks pw ON pw.id = pd.week_id
    JOIN programs p ON p.id = pw.program_id
    WHERE pd.id = _day_id AND p.client_id = _user_id
  );
END $$;
REVOKE EXECUTE ON FUNCTION public.user_owns_program_day(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.user_owns_program_day(uuid, uuid) TO authenticated, service_role;