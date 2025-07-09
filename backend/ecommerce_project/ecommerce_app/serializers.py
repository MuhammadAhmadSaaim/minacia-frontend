from rest_framework import serializers
from .models import Product, ColorImage, AdditionalPays, Subscriber, ProductCategory, ColorVariant, Order, OrderItem


class AdditionalPaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalPays
        fields = ['Tax', 'Shipping']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorImage
        fields = ['image']

class ColorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorImage
        fields = ['image']

class ColorVariantSerializer(serializers.ModelSerializer):
    images = ColorImageSerializer(many=True, read_only=True)  # <-- Add this
    preview_image = serializers.SerializerMethodField()

    class Meta:
        model = ColorVariant
        fields = ['id', 'color_name', 'quantity', 'preview_image', 'images']  # <-- Include `images`

    def get_preview_image(self, obj):
        first_image = obj.images.first()
        return first_image.image.url if first_image else None

class ProductListingSerializer(serializers.ModelSerializer):
    color_variants = ColorVariantSerializer(many=True, read_only=True)
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'price', 'originalPrice', 'description', 'details', 'category_name', 'color_variants'
        ]



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name']

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ['email']


class QuantityUpdateSerializer(serializers.Serializer):
    variant_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'color_variant', 'product_name', 'product_price', 'quantity']

class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order
        fields = [
            'user', 'order_amount', 'billing_info', 'payment', 'tax',
            'shipping_cost', 'total_items', 'status', 'items'
        ]
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        for item in items_data:
            product = item['product']
            color_variant = item.get('color_variant')
            OrderItem.objects.create(
                order=order,
                product=product,
                color_variant=color_variant,
                product_name=product.name,
                product_price=product.price,
                quantity=item['quantity']
            )
            # Optional: Reduce color_variant quantity here

        return order