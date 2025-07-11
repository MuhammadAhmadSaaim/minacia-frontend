from django.db import models
from django.contrib.auth.models import User



class BillingInfo(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stripe_billinginfo')

    def __str__(self):
        return self.name

    

class Payment(models.Model):
    id = models.AutoField(primary_key=True)
    method = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stripe_payments')
    billing_info = models.ForeignKey(BillingInfo, on_delete=models.CASCADE, related_name='payments' , null=True, blank=True)  # 👈 NEW
    status = models.CharField(max_length=50, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.id} by {self.user.username}"