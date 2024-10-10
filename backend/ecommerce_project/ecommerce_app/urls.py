from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('productListing/', ProductList.as_view(), name='productListing'),
    path('search/', views.searching, name = 'search'),
]