from rest_framework import serializers
from .models import WorkoutTracker

class WorkoutTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutTracker
        fields = ['id','exercise','weight','sets','reps','intensity', 'days']

    