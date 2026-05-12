from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Time(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True,blank=True)
    
    def duration(self):
        if self.start_time and self.end_time:
            return self.end_time - self.start_time
        return None