from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from .models import Time
from .serializers import TimeSerializer

# Create your views here.
class StartTimer(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        session = Time.objects.create(
            user = request.user,
            start_time=timezone.now()
        )
        return Response({'id': session.id, 'start_time': session.start_time})
    
class StopTimer(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        try:
            session = Time.objects.get(id=id, user=request.user)
            session.end_time = timezone.now()
            session.save()
            return Response({
                'id': session.id,
                'start_time':session.start_time,
                'end_time': session.end_time,
            })
        except Time.DoesNotExist:
            return Response({'error': 'session not found'}, status=404)