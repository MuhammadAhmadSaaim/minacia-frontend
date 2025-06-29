from rest_framework import serializers
from .models import Product, ProductImage, AdditionalPays, Subscriber, ProductCategory


class AdditionalPaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalPays
        fields = ['Tax', 'Shipping']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image']


class ProductListingSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Product
        fields = '__all__' 

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name']

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ['email']
