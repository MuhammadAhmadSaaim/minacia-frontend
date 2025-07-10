from django.contrib import admin
from .models import Payment, BillingInfo


class PaymentAdmin(admin.ModelAdmin):
    readonly_fields = ['user', 'method', 'amount', 'status', 'created_at']
    list_filter = ['method', 'status', 'created_at']
    search_fields = ['user__username', 'method']
    ordering = ['-created_at']

class BillingInfoAdmin(admin.ModelAdmin):
    readonly_fields = ['address','name', 'email', 'phone', 'user']
    search_fields = ['name', 'email', 'user__username']

# Register with the custom admin site
admin.site.register(Payment, PaymentAdmin)
admin.site.register(BillingInfo, BillingInfoAdmin)
