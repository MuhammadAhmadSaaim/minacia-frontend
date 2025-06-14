from django.contrib import admin
from .models import *


class MyAdminSite(admin.AdminSite):
    site_header = "Minicia Administrator"  
    site_title = "Minicia"    
    index_title = "Welcome to Minicia"

admin_site = MyAdminSite(name='myadmin')

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]

admin_site.register(Product, ProductAdmin)
admin_site.register(ProductImage) 
admin_site.register(ProductCategory)
admin_site.register(Cart)
admin_site.register(CartProduct)
admin_site.register(OrderProduct)
admin_site.register(Subscriber)