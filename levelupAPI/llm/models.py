from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    file_upload = models.FileField(upload_to='files/', null=True, blank=True)
    uploaded_at = models.DateField(auto_now_add=True)
    
