"""
Django settings for server project.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.8/ref/settings/

NOTE: __generator-usf-gift_ may automatically modify this file.
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
import json, yaml

SETTINGS_DIR = os.path.dirname(__file__)
BASE_DIR = os.path.dirname(SETTINGS_DIR)
PROJECT_DIR = os.path.dirname(BASE_DIR)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

with open(os.path.join(SETTINGS_DIR, '.secrets.yml')) as conf_file:
    # We use Ansible and Ansible vault to keep sensible informations secrets
    sensible_cfg = yaml.load(conf_file)
SECRET_KEY = sensible_cfg['SECRET_KEY']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = (
    # 'django_su',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # DRF, Compressor, and DjangularJS core
    'rest_framework',
    'compressor',
    'server.core',

    # allAuth required apps
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    # Required for Google login
    'allauth.socialaccount.providers.google',

    # GIFT Apps
)

# Settings for Django Sites and allAuth
SITE_ID = 1
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_VERIFICATION = "none"
SOCIALACCOUNT_QUERY_EMAIL = True
LOGIN_REDIRECT_URL = "/"

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'server.urls'

AUTHENTICATION_BACKENDS = (
    # Standard Django auth
    "django.contrib.auth.backends.ModelBackend",
    # django-su auth
    # "django_su.backends.SuBackend",
    # "server.authentication.backends.EmailBackend",
    #  allauth methods
    "allauth.account.auth_backends.AuthenticationBackend",
)


WSGI_APPLICATION = 'server.wsgi.application'


# Database
DATABASES = sensible_cfg['DATABASES']  # see provisioning/group_vars/dev and/or server/settings/conf.json

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'debug': DEBUG,
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                #  'django.contrib.messages.context_processors.messages',
                "django.template.context_processors.i18n",
                "django.template.context_processors.media",
                "django.template.context_processors.static",
                "django.template.context_processors.tz",
                # Required for the allauth (Google/Facebook/Etc) templates 
                "django.template.context_processors.request",
            ],
        },
    },
]

# Static files (CSS, JavaScript, Images)
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',  # TODO: check if necessary
    'compressor.finders.CompressorFinder',
)

STATIC_ROOT = os.path.join(PROJECT_DIR, 'static/')

with open(os.path.join(PROJECT_DIR, 'assets.json')) as assets_file:
    ASSETS = json.load(assets_file)

STATIC_URL = ASSETS['staticUrl']

STATICFILES_DIRS = (
    os.path.join(PROJECT_DIR, 'public/'),
    os.path.join(PROJECT_DIR, 'dist/'),
)

COMPRESS_JS_FILTERS = [] # disable JS minification (done with uglifyjs)
