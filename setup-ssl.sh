#!/bin/sh

# Get domain (default value)
DOMAIN=${DOMAIN:-kirithraweb.rockmypost.com}

echo "🏗 Starting Nginx temporary HTTP server..."
nginx -c /etc/nginx/conf.d/nginx-http-only.conf -g "daemon on;"

# Only issue certificate if not localhost
if [ "$DOMAIN" != "localhost" ]; then
    echo "📜 Generating Let's Encrypt certificate for $DOMAIN"

    # Create webroot path
    mkdir -p /var/www/certbot

    # Obtain certificate
    certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email admin@$DOMAIN \
        --agree-tos \
        --no-eff-email \
        --force-renewal \
        -d $DOMAIN

    # Replace Nginx config with SSL version
    echo "🔁 Enabling HTTPS configuration..."
    cp /etc/nginx/conf.d/nginx-ssl.conf /etc/nginx/conf.d/default.conf

    # Reload Nginx with SSL
    nginx -s reload

    # Setup auto-renewal
    echo "0 3 * * * /usr/bin/certbot renew --quiet && nginx -s reload" | crontab -
    echo "✅ SSL certificate installed and auto-renewal configured."
fi

# Keep container running
tail -f /var/log/nginx/access.log
