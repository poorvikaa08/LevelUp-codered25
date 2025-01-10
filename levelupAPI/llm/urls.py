from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('upload-file/', views.UploadFileAPIView.as_view(), name='upload-file'),
    path('create-questions/', views.CreateQuestionsAPIView.as_view(), name='create_questions'),
    path('generate-feedback/', views.GenerateFeedbackAPIView.as_view(), name="generate_feedback"),
    path('create-subjective-questions/', views.CreateSubjectiveQuestionsAPIView.as_view(), name="subjective-questions"),
    path("playground/", views.python_playground, name="python_playground"),
    path('summarize/', views.YouTubeSummaryView.as_view(), name='youtube-summary'),
]
