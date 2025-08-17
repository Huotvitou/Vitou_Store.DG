# Neon Store — MongoDB + Email/Password — Vercel Ready
Env on Vercel:
- MONGODB_URI=your_uri
- JWT_SECRET=any_random_string

Create first admin (one-time):
POST /api/auth/register  { "email":"admin@your.com", "password":"1234" }

Routes:
- / (storefront) — reads products from DB (auto-seeds 20 items)
- /admin/login — login
- /admin — products CRUD (auth required)
