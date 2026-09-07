# --- builder: compiles the static site, never shipped ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx nuxi generate

# --- runtime: nginx only, no Node/npm ---
FROM nginx:alpine AS runtime

COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/.output/public /var/www/html

CMD ["nginx", "-g", "daemon off;"]
