from rest_framework import serializers
from .models import Time

class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = ['id','start_time','end_time']