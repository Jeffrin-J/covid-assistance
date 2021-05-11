from django.shortcuts import render
from rest_framework.views import APIView
from time import sleep
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
from .serializers import *
from geopy.geocoders import Nominatim

class getdata(APIView):
    def get(self, request):
        url="https://stopcorona.tn.gov.in/beds.php"
        df = pd.read_html(url, attrs={"id": "dtBasicExample"})
        df = df[0]
        df =df.head(25)
        df = df.fillna(0)
        for i,j in df.iterrows():
            data=list(j)
            address=data[2] + "," + data[1]
            try:
                geolocator = Nominatim(user_agent="forpythonmail@gmail.com")
                x = geolocator.geocode(address)
                lat = x.latitude
                lon = x.longitude

            except:
                geolocator = Nominatim(user_agent="forpythonmail@gmail.com")
                x = geolocator.geocode(data[1])
                lat = x.latitude
                lon = x.longitude

            user = User(username = data[2])
            user.set_password("admin")
            user.save()
            
            data.pop(0)
            data.pop(1)
            data.pop(-1)
            data.insert(0,user)
            data.extend([0,0,0,0,0,lat,lon])
            print(data)
            Hospitals(user= user, district=data[1], covid_bed_total=data[2], covid_bed_occupied=data[3], covid_bed_vacant=data[4], oxy_bed_total=data[5], oxy_bed_occupied=data[6], oxy_bed_vacant=data[7], non_oxy_bed_total=data[8], non_oxy_bed_occupied=data[9], non_oxy_bed_vacant=data[10], icu_bed_total=data[11], icu_bed_occupied=data[12], icu_bed_vacant=data[13], vent_bed_total=data[14], vent_bed_occupied=data[15], vent_bed_vacant=data[16], last_updated=data[17], contactnumber=data[18], no_applied_covid=data[19], no_applied_oxy=data[20], no_applied_nonOxy=data[21], no_applied_icu=data[22], no_applied_vent=data[23], latitude=data[24], longitude=data[25]).save()
            
            
        return Response({"hello"})


class Postcurrentloc(APIView):
    def Post(self, request):
        
        return Response({})





