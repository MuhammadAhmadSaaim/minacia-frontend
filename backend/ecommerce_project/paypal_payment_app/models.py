from django.db import models
from django.contrib.auth.models import User


class Payment(models.Model):
    id = models.AutoField(primary_key=True)
    method = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')

    def __str__(self):
        return f"Payment {self.id} by {self.user.username}"
    

class BillingInfo(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total_items = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='billinginfo')

    def __str__(self):
        return self.name

    
