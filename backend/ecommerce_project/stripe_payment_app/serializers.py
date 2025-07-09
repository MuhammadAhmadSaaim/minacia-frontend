from .models import BillingInfo, Payment
from rest_framework import serializers


class BillingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingInfo
        fields = '__all__'
        

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'  # includes billing_info

    def create(self, validated_data):
        return Payment.objects.create(**validated_data)