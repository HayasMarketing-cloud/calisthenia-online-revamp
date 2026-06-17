
-- Revoke from anon and authenticated on internal SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_client_last_activity() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_client_last_activity_tr() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.snapshot_weekly_adherence() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.track_goal_progress() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.detect_session_milestones() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.generate_engagement_alerts() FROM PUBLIC, anon, authenticated;

-- RPCs called by the client app: keep authenticated, drop anon/public
REVOKE EXECUTE ON FUNCTION public.recalculate_adherence(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.create_template_version(uuid, text) FROM PUBLIC, anon;
