from django.urls import path
from .views import CreateStripeCheckoutSession , CreateBillingInfo , CreatePayment , BillingInfoExists

urlpatterns = [
    path('save-billing-info/', CreateBillingInfo.as_view(), name='save_billing_info'),
    path('create-stripe-session/', CreateStripeCheckoutSession.as_view(), name='create-stripe-session'),
    path('save-payment/', CreatePayment.as_view(), name='save-payment'),
    path('check-billing-info/', BillingInfoExists.as_view(), name='check-billing-info'),
]
