# PATHWAY

AI-powered resume builder for chronological, functional, combination, targeted, and academic CV formats.

## Start locally

1. Install Node.js 20.9 or newer.
2. Copy `.env.example` to `.env.local` and add your own provider credentials.
3. Run `npm install`, then `npm run dev`.
4. Apply `supabase/migrations/20260715_pathway_schema.sql` in the Supabase SQL editor.

## Services

- Supabase: authentication and PostgreSQL data
- OpenAI: server-only AI actions
- Razorpay: Indian subscriptions and webhooks
- Resend: transactional messages
- Cloudinary: user-uploaded images
- Vercel: deployment

Never place secret keys in variables prefixed with `NEXT_PUBLIC_`.
