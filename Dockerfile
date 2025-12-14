# ------------------------------------------------------------------
# Stage 1: “builder” – Install dependencies & build the Vite app
# ------------------------------------------------------------------
FROM node:22-alpine AS node-builder

WORKDIR /app

# Install dependencies based on lockfile to leverage caching
COPY package.json package-lock.json ./
# Verify lockfile is in sync, then install
RUN npm ci --no-audit

# Copy source and build
COPY . .
RUN npm run build


# ------------------------------------------------------------------
# Stage 2: “runtime” – Nginx serving the built assets
# ------------------------------------------------------------------
FROM nginx:1.27-alpine

# Remove default content and add our configuration
RUN rm -rf /usr/share/nginx/html/*


# Copy compiled assets from builder
COPY --from=node-builder /app/dist /usr/share/nginx/html

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]