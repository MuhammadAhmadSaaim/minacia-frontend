from django.shortcuts import render
from rest_framework import generics,status
from .serializers import ProductListingSerializer
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SubscriberSerializer
from django.db.models import Q


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListingSerializer

def searching(request):
    query = request.GET.get('query')
    result = Product.objects.filter(Q(user__username__icontains = query) | Q(text__icontains = query))
    return render(request, 'tweet/tweet_list.html',{'tweets':result})    



class SubscribeView(APIView):
    def post(self, request):
        serializer = SubscriberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Subscribed successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
