
-- baseline_metrics: client can update/delete their own rows
CREATE POLICY "Clients can update own baseline metrics"
  ON public.baseline_metrics FOR UPDATE TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can delete own baseline metrics"
  ON public.baseline_metrics FOR DELETE TO authenticated
  USING (client_id = auth.uid());

-- goal_progress_history: client can insert/delete their own rows
CREATE POLICY "Clients can insert own goal history"
  ON public.goal_progress_history FOR INSERT TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can delete own goal history"
  ON public.goal_progress_history FOR DELETE TO authenticated
  USING (client_id = auth.uid());

-- session_checkins: client can update/delete check-ins of their own sessions
CREATE POLICY "Clients can update own session checkins"
  ON public.session_checkins FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.workout_sessions ws
    WHERE ws.id = session_checkins.session_id
      AND ws.client_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.workout_sessions ws
    WHERE ws.id = session_checkins.session_id
      AND ws.client_id = auth.uid()
  ));

CREATE POLICY "Clients can delete own session checkins"
  ON public.session_checkins FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.workout_sessions ws
    WHERE ws.id = session_checkins.session_id
      AND ws.client_id = auth.uid()
  ));

-- session_exercise_logs: client can update/delete logs of their own sessions
CREATE POLICY "Clients can update own session exercise logs"
  ON public.session_exercise_logs FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.workout_sessions ws
    WHERE ws.id = session_exercise_logs.session_id
      AND ws.client_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.workout_sessions ws
    WHERE ws.id = session_exercise_logs.session_id
      AND ws.client_id = auth.uid()
  ));

CREATE POLICY "Clients can delete own session exercise logs"
  ON public.session_exercise_logs FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.workout_sessions ws
    WHERE ws.id = session_exercise_logs.session_id
      AND ws.client_id = auth.uid()
  ));
