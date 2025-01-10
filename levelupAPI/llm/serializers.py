from rest_framework import serializers
from .models import User
from django.utils import timezone

class FileUploadSerializer(serializers.ModelSerializer):
    uploaded_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = User
        fields = ['file_upload', 'uploaded_at']
        
    def update(self, instance, validated_data):
        instance.uploaded_at = timezone.now()
        return super().update(instance, validated_data)

