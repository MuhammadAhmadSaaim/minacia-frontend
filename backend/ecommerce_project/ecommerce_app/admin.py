import nested_admin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import (
    ProductCategory, Product, ColorVariant, ColorImage,
    Order, OrderItem, AdditionalPays, Subscriber
)


# ---------- INLINE: ColorImage for ColorVariant ----------
class ColorImageInline(nested_admin.NestedStackedInline):  # ✅ must be nested
    model = ColorImage
    extra = 1


# ---------- INLINE: ColorVariant for Product ----------
class ColorVariantInline(nested_admin.NestedStackedInline):  # ✅ must be nested
    model = ColorVariant
    inlines = [ColorImageInline]
    extra = 1


# ---------- PRODUCT ADMIN (nested) ----------
class ProductAdmin(nested_admin.NestedModelAdmin):  # ✅ use nested admin
    list_display = ['name', 'category', 'price', 'originalPrice']
    list_filter = ['category']
    search_fields = ['name']
    ordering = ['name']
    inlines = [ColorVariantInline]


# ---------- COLOR VARIANT ADMIN (standalone) ----------
class ColorVariantAdmin(admin.ModelAdmin):
    list_display = ['product', 'color_name', 'quantity']
    inlines = [ColorImageInline]


# ---------- PRODUCT CATEGORY ----------
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ['name']


# ---------- COLOR IMAGE ----------
class ColorImageAdmin(admin.ModelAdmin):
    list_display = ['color_variant']


# ---------- ORDER ITEM INLINE ----------
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['product', 'product_name', 'product_price', 'quantity', 'color_variant']
    can_delete = False
    show_change_link = False


# ---------- ORDER ADMIN ----------
class OrderAdmin(admin.ModelAdmin):
    readonly_fields = [ 'tax', 'shipping_cost', 'total_items', 'order_no', 'user', 'order_amount', 'status', 'order_date']
    list_filter = ['status', 'order_date']
    search_fields = ['user__username', 'billing_info__email', 'payment__method']
    ordering = ['-order_date']
    inlines = [OrderItemInline]  # ✅ this shows OrderItems inline

    def billing_email(self, obj):
        return obj.billing_info.email if obj.billing_info else "N/A"

    def payment_status(self, obj):
        return obj.payment.status if obj.payment else "Unpaid"

    billing_email.short_description = "Billing Email"
    payment_status.short_description = "Payment Status"


# ---------- ADDITIONAL PAYS ----------
class AdditionalPaysAdmin(admin.ModelAdmin):
    list_display = ['id', 'Tax']


# ---------- SUBSCRIBER ----------
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'subscribed_at']
    search_fields = ['email']
    ordering = ['-subscribed_at']




# ---------- REGISTER TO CUSTOM ADMIN SITE ----------
admin.site.register(Product, ProductAdmin)
admin.site.register(ColorVariant, ColorVariantAdmin)
admin.site.register(ColorImage, ColorImageAdmin)
admin.site.register(ProductCategory, ProductCategoryAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)
admin.site.register(AdditionalPays, AdditionalPaysAdmin)
admin.site.register(Subscriber, SubscriberAdmin)
