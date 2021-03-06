from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Hospitals(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Hospital_name = models.CharField(max_length = 50, null=True)
    district = models.TextField(max_length=20)
    covid_bed_total = models.IntegerField()
    covid_bed_occupied = models.IntegerField()
    covid_bed_vacant = models.IntegerField()
    oxy_bed_total = models.IntegerField()
    oxy_bed_occupied = models.IntegerField()
    oxy_bed_vacant = models.IntegerField()
    non_oxy_bed_total = models.IntegerField()
    non_oxy_bed_occupied = models.IntegerField()
    non_oxy_bed_vacant = models.IntegerField()
    icu_bed_total = models.IntegerField()
    icu_bed_occupied = models.IntegerField()
    icu_bed_vacant = models.IntegerField()
    vent_bed_total = models.IntegerField()
    vent_bed_occupied = models.IntegerField()
    vent_bed_vacant = models.IntegerField()
    last_updated = models.DateTimeField()
    contactnumber=models.BigIntegerField()
    no_applied_covid = models.IntegerField(null = True)
    no_applied_oxy = models.IntegerField(null = True)
    no_applied_nonOxy = models.IntegerField(null = True)
    no_applied_icu = models.IntegerField(null = True)
    no_applied_vent = models.IntegerField(null = True)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self) -> str:
        return self.user.username

class Applied(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField()
    phone_number = models.PositiveBigIntegerField()
    bed_type = models.CharField(max_length=20, choices=(("1", "Covid Bed"),("2", "Oxygen Bed"),("3", "Non oxygen Bed"),("4", "ICU Bed"),("5", "Ventilator Bed")))
    hospital = models.CharField(max_length=50, null=True)
    timestamp = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=1, choices=(("0","Visible"),("1","Invisible")), default="0")
    tweeted = models.CharField(max_length=1, choices=(("0","tweeted"),("1","nottweeted")), default="1")

    def __str__(self) -> str:
        return self.name

