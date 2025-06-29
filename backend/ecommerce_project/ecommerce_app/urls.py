from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('productListing/<int:category_id>/', ProductListByCategory.as_view(), name='productListingbyCategory'),
    path('productListing/', ProductList.as_view(), name='productListing'),
    path('search/', views.searching, name = 'search'),
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('additionalPays/', AdditionalPaysView.as_view(), name='additional-pays'),
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
]