#!/bin/bash
set -e

# Esperar a que la base de datos esté lista
echo "Esperando a que la base de datos esté lista..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done
echo "Base de datos lista!"

# Esperar un poco más para asegurarnos que PostgreSQL está completamente inicializado
sleep 5

# Aplicar migraciones
echo "Aplicando migraciones..."
python manage.py migrate --noinput
echo "Migraciones aplicadas!"

# Recopilar archivos estáticos
echo "Compilando archivos estáticos..."
python manage.py collectstatic --noinput
echo "Archivos estáticos compilados!"

# Iniciar la aplicación
echo "Iniciando la aplicación con gunicorn..."
gunicorn config.wsgi:application \
  --bind 0.0.0.0:${PORT:-8000} \
  --workers=2 \
  --threads=2 \
  --timeout=120 \
  --max-requests=500 \
  --max-requests-jitter=50 \
  --access-logfile - \
  --error-logfile - \
  --log-level info
