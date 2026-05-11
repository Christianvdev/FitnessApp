from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import WorkoutTracker
from .serializers import WorkoutTrackerSerializer

# Create your views here.
class workoutTrackerViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = WorkoutTrackerSerializer
    
    def get_queryset(self):
        return WorkoutTracker.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)