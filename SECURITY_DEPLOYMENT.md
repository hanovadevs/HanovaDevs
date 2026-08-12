# Security deployment checklist

The former `VITE_ADMIN_USER` and `VITE_ADMIN_PASS` browser credentials are no longer used and must be deleted from every Vercel environment.

1. In Supabase Authentication, disable or delete the account that used the old browser password and rotate that password anywhere it was reused.
2. Create a new Supabase Auth user with a unique email and generated password.
3. Set the role with a trusted server or the Supabase SQL editor; never expose the service-role key to the browser:

   ```sql
   update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
   where email = 'your-admin@example.com';
   ```

4. Run `supabase_schema.sql` in the Supabase SQL editor and verify the policies in Authentication > Policies.
5. Delete `VITE_ADMIN_USER` and `VITE_ADMIN_PASS` from Vercel Development, Preview, and Production settings, then redeploy.
6. Keep `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, and `EMAIL_PASS` server-only. Rotate any of them immediately if they have ever used a `VITE_` prefix, appeared in a deployed bundle, or were shared outside the deployment provider.
7. Confirm an anonymous browser can insert a booking but cannot select, update, or delete appointments or transcripts.
