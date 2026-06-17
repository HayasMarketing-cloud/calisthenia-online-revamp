
-- 1) Remove unrestricted anonymous INSERT on leads. Submissions now go through the submit-lead edge function (service_role).
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

-- 2) Public storage listing on blog-images: drop the broad SELECT policy.
-- The bucket remains public so direct object URLs continue to work, but the API can no longer be used to list/enumerate files.
DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;

-- 3) has_role is SECURITY DEFINER and only needed inside RLS policies (which run as the table owner).
-- Remove direct EXECUTE access from API roles so clients cannot probe it.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
