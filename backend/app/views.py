from django.shortcuts import render
from rest_framework.views import APIView
from time import sleep
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
from .serializers import *
from geopy.geocoders import Nominatim
from rest_framework.generics import ListCreateAPIView
from math import dist, radians, cos, sin, asin, sqrt

class getdata(APIView):
    def get(self, request):
        url="https://stopcorona.tn.gov.in/beds.php"
        df = pd.read_html(url, attrs={"id": "dtBasicExample"})
        df = df[0]
        df =df.head(25)
        df = df.fillna(0)
        for i,j in df.iterrows():
            data=list(j)
            address=data[2]
            try:
                geolocator = Nominatim(user_agent="forpythonmail@gmail.com")
                x = geolocator.geocode(address)
                lat = x.latitude
                lon = x.longitude

            except:
                pass
                """ geolocator = Nominatim(user_agent="forpythonmail@gmail.com")
                x = geolocator.geocode(data[1])
                lat = x.latitude
                lon = x.longitude """

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


class Postcurrentloc(ListCreateAPIView):
    serializer_class = LocationSerializer
    queryset = Hospitals.objects.all()

    def dist(self, lat1, long1, lat2, long2):
        lat1, long1, lat2, long2 = map(radians, [lat1, long1, lat2, long2])
        # haversine formula 
        dlon = long2 - long1 
        dlat = lat2 - lat1 
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * asin(sqrt(a)) 
        # Radius of earth in kilometers is 6371
        km = 6371* c
        return km

    def post(self, request):
        print(request.data)
        h_lat = float(request.data.get('latitude'))
        h_lon = float(request.data.get('longitude'))
        print(h_lat,h_lon)
        rad = 20
        result = []
        c=0
        for i in self.get_queryset():
            #print(type(i.latitude))
            if self.dist(h_lat, h_lon, i.latitude, i.longitude)<=rad:
                result.append({"lat":i.latitude, "lng":i.longitude})
                print(i)
            c+=0
            if c==100:
                break
        return Response(result)






