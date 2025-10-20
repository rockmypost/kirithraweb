# ---------- Build stage ----------
    FROM node:18-alpine AS builder
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci
    COPY . .
    RUN npm run build
    
    # ---------- Production stage ----------
    FROM nginx:alpine
    WORKDIR /usr/share/nginx/html
    
    # Install Certbot and dependencies
    RUN apk add --no-cache certbot certbot-nginx bash curl
    
    # Copy built React app
    COPY --from=builder /app/dist .
    
    # Copy Nginx configs
    COPY nginx-http-only.conf /etc/nginx/conf.d/default.conf
    COPY nginx-ssl.conf /etc/nginx/conf.d/nginx-ssl.conf
    
    # ✅ Copy main nginx.conf to fix “server directive is not allowed here” error
    COPY nginx.conf /etc/nginx/nginx.conf
    
    # Copy setup script
    COPY setup-ssl.sh /usr/local/bin/setup-ssl.sh
    RUN chmod +x /usr/local/bin/setup-ssl.sh
    
    EXPOSE 80 443
    
    CMD ["/usr/local/bin/setup-ssl.sh"]
    