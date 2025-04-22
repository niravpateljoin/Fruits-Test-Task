FROM php:8.2-fpm

# Install system dependencies, including netcat-openbsd
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libzip-dev \
    libonig-dev \
    npm \
    nodejs \
    netcat-openbsd \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libxml2-dev \
    && docker-php-ext-install zip pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Expose port
EXPOSE 8000

# Run migrations after waiting for DB, then start Laravel server
CMD sh -c "php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000"
