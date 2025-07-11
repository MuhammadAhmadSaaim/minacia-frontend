from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField 
from stripe_payment_app.models import BillingInfo, Payment


class AdditionalPays(models.Model):
    id = models.AutoField(primary_key=True)
    Tax = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.Tax.__str__() 

class ProductCategory(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    details = JSONField(null=True, blank=True)
    originalPrice = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name='products')
    def __str__(self):
        return self.name

    @property
    def category_name(self):
        return self.category.name


class ColorVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='color_variants')
    color_name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.product.name} - {self.color_name}"
    
class ColorImage(models.Model):
    color_variant = models.ForeignKey(ColorVariant, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_color_images/')

    def __str__(self):
        return f"{self.color_variant.color_name} - Image"



    
class Order(models.Model):
    order_no = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    order_amount = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateTimeField(auto_now_add=True)
    
    billing_info = models.ForeignKey(BillingInfo, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_items = models.PositiveIntegerField(default=0)

    status = models.CharField(max_length=50, default='processing')  # processing, shipped, delivered, etc.

    def __str__(self):
        return f"Order {self.order_no} by {self.user.username}"



class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    color_variant = models.ForeignKey('ColorVariant', on_delete=models.SET_NULL, null=True, blank=True)

    product_name = models.CharField(max_length=255)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)  # price at time of order
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product_name} (Order #{self.order.order_no})"

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email