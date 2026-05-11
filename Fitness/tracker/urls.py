from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import workoutTrackerViewSet

router = DefaultRouter()

router.register(r'workout',workoutTrackerViewSet, basename='workout')

urlpatterns = [
    path('', include(router.urls))
]
