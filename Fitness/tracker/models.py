from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class WorkoutTracker(models.Model):
    class Intensity(models.IntegerChoices):
        EASY = 1, _('Easy')
        MEDIUM = 2, _('Medium')
        HARD = 3, _('Hard')

    class Days(models.IntegerChoices):
        Monday = 1, _('Monday')
        Tuesday = 2, _('Tuesday')
        Wednesday = 3, _('Wednesday')
        Thursday = 4, _('Thursday')
        Friday = 5, _('Friday')
        Saturday = 6, _('Saturday')
        Sunday = 7, _('Sunday')

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exercise = models.CharField(max_length=24)
    weight = models.IntegerField()

    sets = models.IntegerField()
    reps = models.IntegerField()

    

    intensity = models.IntegerField(
        choices=Intensity.choices,
        default=Intensity.MEDIUM
    )

    days = models.IntegerField(
        choices=Days.choices,
    )

    def __str__(self):
        return self.exercise
    

