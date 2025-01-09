from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('upload-file/', views.UploadFileAPIView.as_view(), name='upload-file'),
    path('create-questions/', views.CreateQuestionsAPIView.as_view(), name='create_questions'),
    path('generate-feedback/', views.GenerateFeedbackAPIView.as_view(), name="generate_feedback"),
]
