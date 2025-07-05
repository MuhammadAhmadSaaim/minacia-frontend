from django.shortcuts import render
from .models import BillingInfo , Payment
from .serializers import BillingInfoSerializer, PaymentSerializer
from rest_framework.generics import CreateAPIView
import stripe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework import status



stripe.api_key = settings.STRIPE_SECRET_KEY


class CreateStripeCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]
    
    
    def post(self, request):
        
        try:
            checkout_session = stripe.checkout.Session.create(
                mode='payment',
                line_items=[
                    {
                        'price_data': {
                            'currency': 'usd',
                            'product_data': {
                                'name': 'Your Product Name',
                            },
                            'unit_amount': int(float(request.data.get("amount")) * 100),  # in cents
                        },
                        'quantity': 1,
                    }
                ],
                success_url=f'{settings.FRONTEND_URL}/stripesuccess',
                cancel_url=f'{settings.FRONTEND_URL}/billing',
                metadata={
                    'user_id': request.user.id,
                }
            )
            print("sending to stripe")
#            print(checkout_session.url)
            return Response({'url': checkout_session.url})
        except Exception as e:
            return Response({'error': str(e)}, status=400)

class CreateBillingInfo(CreateAPIView):
    queryset = BillingInfo.objects.all()
    serializer_class = BillingInfoSerializer
    permission_classes = [IsAuthenticated]  

    def post(self, request):
        """
        Handle POST requests for saving billing information for user.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CreatePayment(CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BillingInfoExists(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        exists = BillingInfo.objects.filter(user=user).exists()
        return Response({'exists': exists})
    
