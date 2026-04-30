from pathlib import Path
import os
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-qoec*+3(604*(v!l1&yz@6xj(ay^6(xw1$2j(k^97-x74@$(9r")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "yes")

ALLOWED_HOSTS = []
CORS_ALLOW_ALL_ORIGINS = True

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "rest_framework",
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    "corsheaders",
    "apps.users"
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME", "foto_album"),
        "USER": os.getenv("DB_USER", "foto_album"),
        "PASSWORD": os.getenv("DB_PASSWORD", "foto_album_dev"),
        "HOST": os.getenv("DB_HOST", "localhost"),
        "PORT": os.getenv("DB_PORT", "5432"),
    }
}

# --- DRF: usar JWT como método de autenticación por defecto ---
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        # Todas las rutas requieren autenticación por defecto.
        # Se puede sobreescribir por vista con AllowAny
        'rest_framework.permissions.IsAuthenticated',
    ),
}

# --- Configuración de Simple JWT ---
SIMPLE_JWT = {
    # Cuánto tiempo vive el access token
    # Corto a propósito: si lo roban, expira rápido
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),

    # Cuánto tiempo vive el refresh token
    # Más largo: el usuario no tiene que hacer login cada 30 min
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),

    # Al usar el refresh token para renovar, se genera uno nuevo
    # y el anterior queda inválido (más seguro)
    'ROTATE_REFRESH_TOKENS': True,

    # El refresh token anterior se agrega a la blacklist
    # (requiere 'rest_framework_simplejwt.token_blacklist' en INSTALLED_APPS)
    'BLACKLIST_AFTER_ROTATION': True,

    # Prefijo que el cliente debe enviar en el header
    # Authorization: Bearer <token>
    'AUTH_HEADER_TYPES': ('Bearer',),

    # Qué campo del usuario se incluye en el token
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
