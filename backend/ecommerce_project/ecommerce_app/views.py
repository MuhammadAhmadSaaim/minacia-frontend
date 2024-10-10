from django.shortcuts import render
from rest_framework import generics
from .serializers import ProductListingSerializer
from .models import *
from django.db.models import Q


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListingSerializer

def searching(request):
    query = request.GET.get('query')
    result = Product.objects.filter(Q(user__username__icontains = query) | Q(text__icontains = query))
    return render(request, 'tweet/tweet_list.html',{'tweets':result})    


    