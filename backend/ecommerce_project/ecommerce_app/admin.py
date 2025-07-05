import nested_admin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import *
from django.contrib.auth.models import User, Group

class MyAdminSite(admin.AdminSite):
    site_header = "Minacia Administrator"
    site_title = "Minacia"
    index_title = "Welcome to Minacia"

admin_site = MyAdminSite(name='myadmin')

# Inline for images under each color variant
class ColorImageInline(nested_admin.NestedTabularInline):
    model = ColorImage
    extra = 1

# Inline for color variants under each product
class ColorVariantInline(nested_admin.NestedTabularInline):
    model = ColorVariant
    inlines = [ColorImageInline]
    extra = 1

# Admin for the product that nests variants and their images
class ProductAdmin(nested_admin.NestedModelAdmin):
    inlines = [ColorVariantInline]
    list_display = ['name', 'price', 'category']

class UserAdmin(DefaultUserAdmin):
    pass  # or modify list_display, fieldsets, etc.


admin_site.register(Product, ProductAdmin)
admin_site.register(ColorVariant)
admin_site.register(ColorImage) 
admin_site.register(ProductCategory)
admin_site.register(Cart)
admin_site.register(CartProduct)
admin_site.register(OrderProduct)
admin_site.register(Subscriber)
admin_site.register(AdditionalPays)
admin_site.register(User, UserAdmin)
admin_site.register(Group)