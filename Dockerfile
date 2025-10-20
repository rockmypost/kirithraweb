# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage with SSL
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Install certbot for SSL
RUN apk add --no-cache certbot certbot-nginx

# Copy built app
COPY --from=builder /app/dist .

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL setup script
COPY setup-ssl.sh /usr/local/bin/setup-ssl.sh
RUN chmod +x /usr/local/bin/setup-ssl.sh

EXPOSE 80 443

CMD ["/usr/local/bin/setup-ssl.sh"]
