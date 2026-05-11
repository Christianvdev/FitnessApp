from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

# Create your models here.
class WorkoutTracker(models.Model):
    class Intensity(models.IntegerChoices):
        EASY = 1, _('Easy')
        MEDIUM = 2, _('Medium')
        HARD = 3, _('Hard')

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.CharField(max_length=24)
    weight = models.IntegerField()

    sets = models.IntegerField()
    reps = models.IntegerField()

    intensity = models.IntegerField(
        choices=Intensity.choices,
        default=Intensity.MEDIUM
    )

    def __str__(self):
        return self.exercise
    

