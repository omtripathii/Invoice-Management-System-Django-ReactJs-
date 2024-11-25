from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.db.models import Q
from .models import Invoice
from .serializers import InvoiceSerializer

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'results': data,
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
        })

class InvoiceViewSet(viewsets.ModelViewSet):
    serializer_class = InvoiceSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Invoice.objects.all()
        
        # Apply filters
        invoice_number = self.request.query_params.get('invoice_number')
        customer_name = self.request.query_params.get('customer_name')
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        sort_by = self.request.query_params.get('sort_by', 'date')
        sort_order = self.request.query_params.get('sort_order', 'desc')

        if invoice_number:
            queryset = queryset.filter(invoice_number__icontains=invoice_number.upper())

        if customer_name:
            queryset = queryset.filter(customer_name__icontains=customer_name)
        
        if date_from:
            queryset = queryset.filter(date__gte=date_from)
        
        if date_to:
            queryset = queryset.filter(date__lte=date_to)

        # Apply sorting
        sort_field = sort_by
        if sort_order == 'desc':
            sort_field = f'-{sort_field}'
        
        return queryset.order_by(sort_field)