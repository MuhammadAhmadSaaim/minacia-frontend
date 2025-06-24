from django.shortcuts import render

import stripe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from .models import Payment

stripe.api_key = settings.STRIPE_SECRET_KEY


class CreateStripeCheckoutSession(APIView):
    #permission_classes = [IsAuthenticated]
    print("Stripe Payment")
    def post(self, request):
        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
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
                success_url='https://yourdomain.com/success',
                cancel_url='https://yourdomain.com/cancel',
                metadata={
                    'user_id': request.user.id,
                }
            )

            return Response({'sessionId': checkout_session['id']})
        except Exception as e:
            return Response({'error': str(e)}, status=400)
