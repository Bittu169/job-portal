from django.contrib import admin
from django.urls import path, include
# from .views import hello_api

urlpatterns = [
    path("",include("backend.urls"))

]
