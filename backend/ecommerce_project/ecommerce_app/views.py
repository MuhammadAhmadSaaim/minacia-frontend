from django.shortcuts import render
from rest_framework import generics,status
from .serializers import ProductListingSerializer
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SubscriberSerializer, CategorySerializer, ProductListingSerializer, AdditionalPaysSerializer
from django.db.models import Q

class AdditionalPaysView(APIView):
    def get(self, request):
        instance = AdditionalPays.objects.first()
        if instance:
            return Response({
                "shipping": float(instance.Shipping),
                "tax": float(instance.Tax)
            })
        return Response({"shipping": 0, "tax": 0})

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
