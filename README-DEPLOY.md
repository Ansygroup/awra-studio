# 🚀 AWRA Studio — دليل النشر المجاني (Free Tier Deployment)

## ✅ الملفات المُضافة تلقائياً

| الملف | الغرض |
|-------|--------|
| `apps/web/Dockerfile` | بناء Next.js standalone |
| `apps/api/Dockerfile` | بناء NestJS + Worker |
| `render.yaml` | إعداد Render (API + Worker + DB) |
| `vercel.json` | إعداد Vercel (Web) |
| `.env.production` | متغيرات البيئة (template) |
| `.github/workflows/deploy.yml` | CI/CD تلقائي |

---

## 🆓 الخطة المجانية 100%

| المكوّن | المنصة | التكلفة |
|---------|--------|---------|
| Web (Next.js) | [Vercel](https://vercel.com) | مجاناً ✅ |
| API (NestJS) | [Render](https://render.com) | مجاناً ✅ |
| Worker (BullMQ) | Render | مجاناً ✅ |
| PostgreSQL | Render أو [Neon](https://neon.tech) | مجاناً ✅ |
| Redis | [Upstash](https://upstash.com) | مجاناً ✅ |
| Storage | Local (مبدئياً) | مجاناً ✅ |
| Auth | Starter mode | مجاناً ✅ |

---

## 📋 خطوات التنفيذ

### الخطوة 1 — إنشاء GitHub Repo

اذهب إلى https://github.com/new وأنشئ repo اسمه `awra-studio`، ثم:

```bash
cd /PATH/TO/awra-studio

git init
git add .
git commit -m "chore: production-ready deployment config"

git remote add origin https://github.com/YOUR_USERNAME/awra-studio.git
git branch -M main
git push -u origin main
```

---

### الخطوة 2 — إعداد Neon PostgreSQL (مجاني)

1. اذهب إلى https://neon.tech وسجّل دخول
2. **New Project** → اسمه `awra-studio`
3. انسخ الـ Connection String (تبدأ بـ `postgresql://...`)
4. احتفظ بها — ستستخدمها في الخطوتين 3 و4

---

### الخطوة 3 — إعداد Upstash Redis (مجاني)

1. اذهب إلى https://upstash.com وسجّل دخول
2. **Create Database** → اختر **Redis**
3. اسمه `awra-redis`، اختر أقرب Region
4. انسخ الـ `REDIS_URL` (تبدأ بـ `rediss://...`)

---

### الخطوة 4 — نشر API + Worker على Render

1. اذهب إلى https://render.com وسجّل دخول
2. **New** → **Blueprint** → اختر الـ GitHub repo
3. سيقرأ Render ملف `render.yaml` تلقائياً ويُنشئ:
   - **awra-api** (Web Service)
   - **awra-worker** (Background Worker)
   - **awra-postgres** (PostgreSQL — مجاني)

4. أضف هذه المتغيرات يدوياً في **Environment** لكل خدمة:

```
DATABASE_URL         ← من Neon (الخطوة 2)
REDIS_URL            ← من Upstash (الخطوة 3)
AUTH_SESSION_SECRET  ← شغّل: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
ASSET_SIGNING_SECRET ← شغّل نفس الأمر
INTERNAL_SERVICE_TOKEN ← شغّل نفس الأمر
APP_URL              ← https://awra-studio.vercel.app (بعد ما تحصل عليه)
OPENAI_API_KEY       ← مفتاحك (اختياري — يشتغل بدونه في fallback mode)
```

5. اضغط **Apply** → ينشر تلقائياً

6. بعد النشر، انسخ رابط API مثل: `https://awra-api.onrender.com`

---

### الخطوة 5 — تشغيل Database Migrations

بعد نشر الـ API على Render:

**من Render Dashboard:**
1. افتح خدمة **awra-api**
2. اذهب إلى **Shell** tab
3. شغّل:
```bash
pnpm migrate:deploy
```

أو شغّل من جهازك:
```bash
DATABASE_URL="postgresql://..." pnpm migrate:deploy
```

---

### الخطوة 6 — نشر Web على Vercel

1. اذهب إلى https://vercel.com/new
2. اختر الـ GitHub repo: `awra-studio`
3. الإعدادات:
   - **Framework**: Next.js (تلقائي)
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && pnpm --filter @awra/web build`
   - **Output Directory**: `.next`
4. أضف هذه **Environment Variables**:

```
NEXT_PUBLIC_APP_URL              = https://awra-studio.vercel.app
NEXT_PUBLIC_API_BASE_URL         = https://awra-api.onrender.com/api/v1
NEXT_PUBLIC_AUTH_PROVIDER  