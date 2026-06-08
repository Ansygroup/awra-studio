# ─── Stage 1: deps ───────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app

COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/db/package.json ./packages/db/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/config/package.json ./packages/config/package.json
COPY packages/prompts/package.json ./packages/prompts/package.json

RUN pnpm install --frozen-lockfile --filter @awra/api... 2>/dev/null || pnpm install --filter @awra/api...

# ─── Stage 2: prisma generate ─────────────────────────────────────────────────
FROM deps AS prisma
COPY packages/db ./packages/db
RUN pnpm --filter @awra/db exec prisma generate --schema=./prisma/schema.prisma

# ─── Stage 3: builder ─────────────────────────────────────────────────────────
FROM prisma AS builder
COPY . .
RUN pnpm --filter @awra/api build

# ─── Stage 4: runner ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules 2>/dev/null || true
COPY --from=builder /app/packages/db/prisma ./packages/db/prisma
COPY --from=builder /app/packages/db/node_modules ./packages/db/node_modules 2>/dev/null || true

# local storage dirs
RUN mkdir -p apps/api/storage/html apps/api/storage/screenshots \
    apps/api/storage/reports apps/api/storage/exports apps/api/storage/emails

EXPOSE 4000

# default: start API (override with `node apps/api/dist/worker.js` for worker)
CMD ["node", "apps/api/dist/main.js"]
