from django.urls import path
from .views import CreateStripeCheckoutSession

urlpatterns = [
    path('create-stripe-session/', CreateStripeCheckoutSession.as_view(), name='create-stripe-session'),
]
