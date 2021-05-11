from django.db.models import fields
from rest_framework import serializers

from .models import *

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospitals
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospitals
        fields = ('latitude', 'longitude')