from rest_framework import serializers
from .models import Invoice, InvoiceDetail

class InvoiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceDetail
        fields = ['id', 'description', 'quantity', 'unit_price']

class InvoiceSerializer(serializers.ModelSerializer):
    details = InvoiceDetailSerializer(many=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Invoice
        fields = ['id', 'invoice_number', 'customer_name', 'date', 'details', 'total_amount']

    def create(self, validated_data):
        details_data = validated_data.pop('details')
        invoice = Invoice.objects.create(**validated_data)
        
        # Create details and calculate total
        total_amount = 0
        for detail_data in details_data:
            detail = InvoiceDetail.objects.create(invoice=invoice, **detail_data)
            total_amount += detail.line_total
        
        # Update invoice with calculated total
        invoice.total_amount = total_amount
        invoice.save()
        
        return invoice

    def update(self, instance, validated_data):
        details_data = validated_data.pop('details')
        instance.customer_name = validated_data.get('customer_name', instance.customer_name)
        instance.date = validated_data.get('date', instance.date)
        
        existing_details = {detail.id: detail for detail in instance.details.all()}
        
        # Update or create details
        total_amount = 0
        for detail_data in details_data:
            detail_id = detail_data.get('id')
            if detail_id and detail_id in existing_details:
                detail = existing_details[detail_id]
                detail.description = detail_data.get('description', detail.description)
                detail.quantity = detail_data.get('quantity', detail.quantity)
                detail.unit_price = detail_data.get('unit_price', detail.unit_price)
                detail.save()
                del existing_details[detail_id]
            else:
                detail = InvoiceDetail.objects.create(invoice=instance, **detail_data)
            total_amount += detail.line_total

        # Delete details that weren't included in the update
        for detail in existing_details.values():
            detail.delete()

        # Update total amount
        instance.total_amount = total_amount
        instance.save()

        return instance