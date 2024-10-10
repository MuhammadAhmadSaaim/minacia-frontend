from django.urls import path
from .views import *

urlpatterns = [
    path('save-billing-info/', CreateBillingInfo.as_view(), name='save_billing_info'),
    path('save-payment/', CreatePayment.as_view(), name='save-payment'),
]
