# ------------------------------------------------------------------
# Production Dockerfile for elwaqf-elnamy frontend
# Optimized for Google Cloud Run / Container Registry deployment
# ------------------------------------------------------------------

# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with production optimizations
RUN npm ci --only=production --no-audit --loglevel=error --prefer-offline && \
    npm cache clean --force

# Stage 2: Builder
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci --no-audit --loglevel=error --prefer-offline

# Copy source code
COPY . .

# Set production environment
ENV NODE_ENV=production
ENV VITE_NODE_ENV=production

# Build the application
RUN npm run build

# Stage 3: Production Runtime
FROM nginx:1.27-alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Create nginx user and set permissions
RUN addgroup -g 1001 -S nginx && \
    adduser -S nginx -u 1001 -G nginx

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY app.conf /etc/nginx/conf.d/app.conf

# Copy built assets
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Set proper permissions
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /var/run /usr/share/nginx/html

# Create health check script
RUN echo '#!/bin/sh' > /health-check.sh && \
    echo 'curl -f http://localhost/health || exit 1' >> /health-check.sh && \
    chmod +x /health-check.sh

# Switch to non-root user
USER nginx

# Expose port 80 (standard for nginx)
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD /health-check.sh

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
