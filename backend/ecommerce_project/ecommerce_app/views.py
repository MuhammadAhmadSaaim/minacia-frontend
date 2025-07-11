from django.shortcuts import render
from rest_framework import generics,status
from .serializers import ProductListingSerializer
from .models import *
from rest_framework.views import APIView
from .models import ColorVariant
from rest_framework.response import Response
from .serializers import SubscriberSerializer, CategorySerializer, ProductListingSerializer, QuantityUpdateSerializer, OrderCreateSerializer
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ColorVariant
from rest_framework import status, permissions

class AdditionalPaysView(APIView):
    def get(self, request):
        instance = AdditionalPays.objects.first()
        if instance:
            return Response({
                "tax": float(instance.Tax)
            })
        return Response({"tax": 0})

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListingSerializer

class ProductListByCategory(generics.ListAPIView):
    serializer_class = ProductListingSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Product.objects.filter(category_id=category_id)

def searching(request):
    query = request.GET.get('query')
    result = Product.objects.filter(Q(user__username__icontains = query) | Q(text__icontains = query))
    return render(request, 'tweet/tweet_list.html',{'tweets':result})    

class CategoryListAPIView(APIView):
    def get(self, request):
        categories = ProductCategory.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class SubscribeView(APIView):
    def post(self, request):
        serializer = SubscriberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Subscribed successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuantityReduceView(APIView):
    def post(self, request):
        serializer = QuantityUpdateSerializer(data=request.data, many=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        for item in serializer.validated_data:
            variant_id = item["variant_id"]
            qty = item["quantity"]

            try:
                variant = ColorVariant.objects.get(id=variant_id)
            except ColorVariant.DoesNotExist:
                return Response(
                    {"error": f"Variant with ID {variant_id} does not exist."},
                    status=status.HTTP_404_NOT_FOUND
                )

            if variant.quantity < qty:
                return Response(
                    {"error": f"Insufficient stock for variant ID {variant_id}."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            variant.quantity -= qty
            variant.save()

        return Response({"message": "Quantities updated successfully."}, status=status.HTTP_200_OK)



@api_view(['POST'])
def validate_cart(request):
    cart_items = request.data.get('items', [])

    result = []
    for item in cart_items:
        try:
            variant = ColorVariant.objects.get(
                product__id=item['productId'],
                id=item['selectedColorId']
            )
            result.append({
                'productId': item['productId'],
                'selectedColorId': item['selectedColorId'],
                'currentStock': variant.quantity
            })
        except ColorVariant.DoesNotExist:
            result.append({
                'productId': item['productId'],
                'selectedColorId': item['selectedColorId'],
                'currentStock': 0
            })
    
    return Response(result)

class CreateOrderAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()
            return Response({"order_no": order.order_no}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
