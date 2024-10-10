from django.contrib import admin
from .models import *
from ecommerce_app.admin import admin_site
# Register your models here.

admin_site.register(Payment)
admin_site.register(BillingInfo)
