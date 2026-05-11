from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import meView

from .views import userViewSet


router = DefaultRouter()

router.register(r'users', userViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('me/', meView.as_view())
]