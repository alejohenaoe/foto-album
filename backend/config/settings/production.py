from .base import * # noqa
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DEBUG = True
ALLOWED_HOSTS = ['*']

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files (User uploads)
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Security settings for production
# SECURE_SSL_REDIRECT = False  # Set to True if using HTTPS
# SESSION_COOKIE_SECURE = False  # Set to True if using HTTPS
# CSRF_COOKIE_SECURE = False  # Set to True if using HTTPS

# CORS configuration for Cloudflare tunnel deployment
CORS_ALLOW_ALL_ORIGINS = True
# Accept all *.trycloudflare.com subdomains (tunnel URLs can vary)
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https?://.*\.trycloudflare\.com$",  # CloudFlare tunnel domains
]
CORS_ALLOWED_ORIGINS = [
    'http://localhost',
    'http://localhost:8007',
    'http://127.0.0.1',
    'http://127.0.0.1:8007',
]
# Add your custom domain here when deploying
# CORS_ALLOWED_ORIGINS += ['https://yourdomain.com', 'https://www.yourdomain.com']