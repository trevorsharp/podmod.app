FROM oven/bun:1.3.14-alpine AS base
WORKDIR /app

# Build static UI
FROM base AS build

COPY ui/package.json ui/bun.lock ./ui/
RUN cd ui && bun install --frozen-lockfile
COPY ./ui ./ui
COPY ./src/shared ./src/shared
ENV NODE_ENV=production
RUN cd ui && bun run build

# Compose release container
FROM base AS release

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production
COPY --from=build /static ./static
COPY ./src ./src

EXPOSE 3000
CMD ["bun", "run", "start"]
