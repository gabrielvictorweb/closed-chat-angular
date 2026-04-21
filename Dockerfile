# syntax=docker/dockerfile:1

# Install dependencies (including dev) once and reuse the layers
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the Angular SSR bundle
FROM deps AS build
COPY . .
RUN npm run build

# Production image: only runtime dependencies + compiled dist
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/closed-chat-angular/server/server.mjs"]
