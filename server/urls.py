# -*- coding: UTF-8 -*-
"""
Use `urlpatterns` to list both third parties and modules URLs.

For more information please see: https://docs.djangoproject.com/en/1.8/topics/http/urls/

NOTE: __generator-djangular-gift__ may automatically modify this file.
"""

from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.views import logout

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^su/', include('django_su.urls')),
    # leave me here #
    url(r'^', include('server.core.urls')),
]

urlpatterns += [
    url(
        r'^accounts/logout/$',
        logout,
        {'next_page': '/'},
    ),
    url(r'^accounts/', include('allauth.urls')),
]
