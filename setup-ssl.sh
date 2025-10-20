#!/bin/sh
set -e  # Exit on error

# Get domain (default value)
DOMAIN=${DOMAIN:-kirithraweb.rockmypost.com}
EMAIL=${EMAIL:-admin@$DOMAIN}

echo "🏗 Starting Nginx with HTTP-only configuration..."

# Start Nginx in background with HTTP-only config
nginx -g "daemon off;" &
NGINX_PID=$!

# Wait for Nginx to be ready
sleep 3

# Only issue certificate if not localhost
if [ "$DOMAIN" != "localhost" ]; then
    echo "📜 Generating Let's Encrypt certificate for $DOMAIN"

    # Create webroot path
    mkdir -p /var/www/certbot

    # Test if domain is reachable
    echo "🔍 Testing if domain resolves correctly..."
    if ! curl -s -o /dev/null -w "%{http_code}" "http://$DOMAIN/.well-known/acme-challenge/test" > /dev/null 2>&1; then
        echo "⚠️  Warning: Domain might not be properly configured yet"
    fi

    # Obtain certificate
    echo "🔐 Requesting SSL certificate..."
    if certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        --non-interactive \
        -d "$DOMAIN"; then
        
        echo "✅ Certificate obtained successfully!"

        # Stop current Nginx instance
        echo "🔁 Switching to HTTPS configuration..."
        nginx -s quit
        wait $NGINX_PID

        # Replace config with SSL version
        cp /etc/nginx/conf.d/nginx-ssl.conf /etc/nginx/conf.d/default.conf
        
        # Remove HTTP-only config to avoid conflicts
        rm -f /etc/nginx/conf.d/nginx-http-only.conf

        # Start Nginx with SSL
        echo "🚀 Starting Nginx with SSL..."
        nginx -g "daemon off;" &
        NGINX_PID=$!

        # Setup auto-renewal (start crond if not running)
        echo "⏰ Setting up certificate auto-renewal..."
        echo "0 3 * * * /usr/bin/certbot renew --quiet && nginx -s reload" > /etc/crontabs/root
        crond
        
        echo "✅ SSL setup complete!"
    else
        echo "❌ Certificate generation failed!"
        echo "📋 Certbot logs:"
        cat /var/log/letsencrypt/letsencrypt.log 2>/dev/null || echo "No logs available"
        echo ""
        echo "⚠️  Continuing with HTTP-only mode..."
    fi
else
    echo "🌐 Running in localhost mode (HTTP only)"
fi

# Keep container running and show logs
echo "📊 Tailing Nginx logs..."
tail -f /var/log/nginx/access.log /var/log/nginx/error.log