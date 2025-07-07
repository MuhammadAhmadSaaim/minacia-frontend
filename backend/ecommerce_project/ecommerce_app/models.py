from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField 



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


class Cart(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='carts')

    def __str__(self):
        return f"Cart {self.id} for {self.user.username}"


class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('cart', 'product')

    def __str__(self):
        return f"{self.quantity} of {self.product.name} in Cart {self.cart.id}"


class Order(models.Model):
    order_no = models.AutoField(primary_key=True)
    order_amount = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')

    def __str__(self):
        return f"Order {self.order_no}"


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_products')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('order', 'product')

    def __str__(self):
        return f"{self.quantity} of {self.product.name} in Order {self.order.order_no}"

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
