"""
tests settings and globals
"""


from .dev import *

INSTALLED_APPS += ('django_nose',)

DATABASES = {
    'default': {'ENGINE': 'django.db.backends.postgresql_psycopg2',
                'NAME': 'usf_gift_dev',
                'USER': 'vagrant',
                'PASSWORD': 'vagrant',
                'HOST': 'localhost',
                'PORT': ''}
}

TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'
NOSE_ARGS = ['--logging-level=INFO']
