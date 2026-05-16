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
        queryset = WorkoutTracker.objects.filter(user=self.request.user)

        day = self.request.query_params.get('day')

        if day:
            day_map = {
                "Monday": 1,
                "Tuesday": 2,
                "Wednesday": 3,
                "Thursday": 4,
                "Friday": 5,
                "Saturday": 6,
                "Sunday": 7,
            }

            day_value = day_map.get(day)

            if day_value is not None:
                queryset = queryset.filter(days=day_value)

        return queryset
        

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)