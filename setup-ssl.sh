#!/bin/sh

# Get domain from environment variable
DOMAIN=${DOMAIN:-kirithraweb.rockmypost.com}

# Start nginx in HTTP mode first (without SSL config)
nginx -g "daemon on;"

# If domain is not localhost, get SSL certificate
if [ "$DOMAIN" != "localhost" ]; then
    # Create certbot webroot directory
    mkdir -p /var/www/certbot
    
    # Get SSL certificate
    certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email ${EMAIL:-admin@$DOMAIN} \
        --agree-tos \
        --no-eff-email \
        --force-renewal \
        -d $DOMAIN
    
    # Update nginx config with actual domain
    sed -i "s/kirithraweb.rockmypost.com/$DOMAIN/g" /etc/nginx/conf.d/default.conf
    
    # Reload nginx with SSL config
    nginx -s reload
    
    # Setup auto-renewal
    echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -
fi

# Keep container running
tail -f /var/log/nginx/access.log
