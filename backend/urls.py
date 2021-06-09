"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from app.views import *



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/get', getdata.as_view()),
    path('api/postcurrentloc',Postcurrentloc.as_view()),
    path('api/validateuser', VerifyLogin.as_view()),
    path('api/getrequests', GetBedRequests.as_view()),
    path('api/requestbed', BedRequest.as_view()),
    path('api/acceptOrReject', AcceptOrReject.as_view()),
    path('api/logout',logOut),
    path('', index),
]

