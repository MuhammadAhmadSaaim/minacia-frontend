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
        country = request.data.get("country")
        # Mapping of ISO country codes to shipping details (amount in pence)
        shipping_rate_map = {
    # Main Countries
    'GB': {'label': 'UK Standard Shipping', 'amount': 599, 'min_day': 2, 'max_day': 4},
    'GB_': {'label': 'UK Express Shipping', 'amount': 899, 'min_day': 1, 'max_day': 2},
    'IE': {'label': 'Shipping to Ireland', 'amount': 1299, 'min_day': 3, 'max_day': 5},
    'US': {'label': 'Shipping to USA', 'amount': 2499, 'min_day': 6, 'max_day': 7},
    'AU': {'label': 'Shipping to Australia', 'amount': 2899, 'min_day': 6, 'max_day': 7},
    'CA': {'label': 'Shipping to Canada', 'amount': 2699, 'min_day': 6, 'max_day': 7},

    # European Countries
    'FR': {'label': 'Shipping to France', 'amount': 1399, 'min_day': 3, 'max_day': 5},
    'MC': {'label': 'Shipping to Monaco', 'amount': 1499, 'min_day': 3, 'max_day': 5},
    'DE': {'label': 'Shipping to Germany', 'amount': 1299, 'min_day': 3, 'max_day': 5},
    'IT': {'label': 'Shipping to Italy', 'amount': 1499, 'min_day': 3, 'max_day': 5},
    'NL': {'label': 'Shipping to Netherlands', 'amount': 1499, 'min_day': 3, 'max_day': 5},
    'ES': {'label': 'Shipping to Spain', 'amount': 1499, 'min_day': 3, 'max_day': 5},
    'PT': {'label': 'Shipping to Portugal', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'BE': {'label': 'Shipping to Belgium', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'CH': {'label': 'Shipping to Switzerland', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'LU': {'label': 'Shipping to Luxembourg', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'AT': {'label': 'Shipping to Austria', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'HR': {'label': 'Shipping to Croatia', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'SI': {'label': 'Shipping to Slovenia', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'SK': {'label': 'Shipping to Slovakia', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'CZ': {'label': 'Shipping to Czech Republic', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'HU': {'label': 'Shipping to Hungary', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'PL': {'label': 'Shipping to Poland', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'RO': {'label': 'Shipping to Romania', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'RS': {'label': 'Shipping to Serbia', 'amount': 1899, 'min_day': 3, 'max_day': 5},
    'BG': {'label': 'Shipping to Bulgaria', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'GR': {'label': 'Shipping to Greece', 'amount': 1599, 'min_day': 3, 'max_day': 5},
    'AL': {'label': 'Shipping to Albania', 'amount': 2499, 'min_day': 3, 'max_day': 5},
    'XK': {'label': 'Shipping to Kosovo', 'amount': 2999, 'min_day': 3, 'max_day': 5},
    'BA': {'label': 'Shipping to Bosnia-Herzegovina', 'amount': 2499, 'min_day': 3, 'max_day': 5},
    'ME': {'label': 'Shipping to Montenegro', 'amount': 2499, 'min_day': 3, 'max_day': 5},
    'MK': {'label': 'Shipping to North Macedonia', 'amount': 2499, 'min_day': 3, 'max_day': 5},
    'MT': {'label': 'Shipping to Malta', 'amount': 1499, 'min_day': 3, 'max_day': 5},
    'CY': {'label': 'Shipping to Cyprus', 'amount': 1499, 'min_day': 3, 'max_day': 5},
    'DK': {'label': 'Shipping to Denmark', 'amount': 1499, 'min_day': 3, 'max_day': 5},
    'LT': {'label': 'Shipping to Lithuania', 'amount': 1499, 'min_day': 3, 'max_day': 5},
    'LV': {'label': 'Shipping to Latvia', 'amount': 1499, 'min_day': 3, 'max_day': 5},
    'EE': {'label': 'Shipping to Estonia', 'amount': 1499, 'min_day': 3, 'max_day': 5},
    'SE': {'label': 'Shipping to Sweden', 'amount': 1499, 'min_day': 3, 'max_day': 5},
    'NO': {'label': 'Shipping to Norway', 'amount': 1899, 'min_day': 3, 'max_day': 5},
    'FI': {'label': 'Shipping to Finland', 'amount': 1599, 'min_day': 3, 'max_day': 5},

    # Middle East
    'EG': {'label': 'Shipping to Egypt', 'amount': 3099, 'min_day': 6, 'max_day': 7},
    'TR': {'label': 'Shipping to Turkey', 'amount': 1899, 'min_day': 6, 'max_day': 7},
    'JO': {'label': 'Shipping to Jordan', 'amount': 3099, 'min_day': 6, 'max_day': 7},
    'SA': {'label': 'Shipping to Saudi Arabia', 'amount': 2999, 'min_day': 6, 'max_day': 7},
    'KW': {'label': 'Shipping to Kuwait', 'amount': 3099, 'min_day': 6, 'max_day': 7},
    'BH': {'label': 'Shipping to Bahrain', 'amount': 3099, 'min_day': 6, 'max_day': 7},
    'AE': {'label': 'Shipping to UAE', 'amount': 3099, 'min_day': 6, 'max_day': 7},
    'QA': {'label': 'Shipping to Qatar', 'amount': 3099, 'min_day': 6, 'max_day': 7},

    # Asia
    'TM': {'label': 'Shipping to Turkmenistan', 'amount': 2799, 'min_day': 6, 'max_day': 7},
    'UZ': {'label': 'Shipping to Uzbekistan', 'amount': 2799, 'min_day': 6, 'max_day': 7},
    'KZ': {'label': 'Shipping to Kazakhstan', 'amount': 2099, 'min_day': 6, 'max_day': 7},
    'KG': {'label': 'Shipping to Kyrgyzstan', 'amount': 2799, 'min_day': 6, 'max_day': 7},
    'TJ': {'label': 'Shipping to Tajikistan', 'amount': 2799, 'min_day': 6, 'max_day': 7},
    'MY': {'label': 'Shipping to Malaysia', 'amount': 3099, 'min_day': 6, 'max_day': 7},
    'SG': {'label': 'Shipping to Singapore', 'amount': 3799, 'min_day': 6, 'max_day': 7},

    # Other Countries
    'MX': {'label': 'Shipping to Mexico', 'amount': 2999, 'min_day': 6, 'max_day': 7},
    'IS': {'label': 'Shipping to Iceland', 'amount': 1999, 'min_day': 6, 'max_day': 7},
    'GL': {'label': 'Shipping to Greenland', 'amount': 1999, 'min_day': 6, 'max_day': 7},
    'BR': {'label': 'Shipping to Brazil', 'amount': 3199, 'min_day': 6, 'max_day': 7},
    'AR': {'label': 'Shipping to Argentina', 'amount': 3199, 'min_day': 6, 'max_day': 7},
    'ZA': {'label': 'Shipping to South Africa', 'amount': 3199, 'min_day': 6, 'max_day': 7},
    'TN': {'label': 'Shipping to Tunisia', 'amount': 3199, 'min_day': 6, 'max_day': 7},
    'MA': {'label': 'Shipping to Morocco', 'amount': 3199, 'min_day': 6, 'max_day': 7},
    'DZ': {'label': 'Shipping to Algeria', 'amount': 3199, 'min_day': 6, 'max_day': 7},
    'GG': {'label': 'Shipping to Guernsey', 'amount': 699, 'min_day': 2, 'max_day': 4},
    'JE': {'label': 'Shipping to Jersey', 'amount': 699, 'min_day': 2, 'max_day': 4},
    'NZ': {'label': 'Shipping to New Zealand', 'amount': 3499, 'min_day': 6, 'max_day': 7},
}

        shipping_options = []
        #for iso_code, data in shipping_rate_map.items():
        print(country)
        shipping_options.append({
            'shipping_rate_data': {
                'type': 'fixed_amount',
                'fixed_amount': {
                    'amount': shipping_rate_map[country]['amount'],
                    'currency': 'gbp'
                },
                'display_name': shipping_rate_map[country]['label'],
                'delivery_estimate': {
                    'minimum': {'unit': 'business_day', 'value': shipping_rate_map[country]['min_day']},
                    'maximum': {'unit': 'business_day', 'value': shipping_rate_map[country]['max_day']}
                }
            }
        })

        if country == "GB":
            country_ = "GB_"
            shipping_options.append({
            'shipping_rate_data': {
                'type': 'fixed_amount',
                'fixed_amount': {
                    'amount': shipping_rate_map[country_]['amount'],
                    'currency': 'gbp'
                },
                'display_name': shipping_rate_map[country_]['label'],
                'delivery_estimate': {
                    'minimum': {'unit': 'business_day', 'value': shipping_rate_map[country_]['min_day']},
                    'maximum': {'unit': 'business_day', 'value': shipping_rate_map[country_]['max_day']}
                }
            }
        })
        try:
            checkout_session = stripe.checkout.Session.create(
                mode='payment',
                shipping_address_collection={"allowed_countries": [country]},
                shipping_options=shipping_options,
                line_items=[
                    {
                        'price_data': {
                            'currency': 'gbp',
                            'product_data': {
                                'name': 'All Products',
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
            print(checkout_session.url)
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
    
