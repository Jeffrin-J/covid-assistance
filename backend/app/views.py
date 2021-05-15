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
from selenium import webdriver
from time import sleep
from webdriver_manager.chrome import ChromeDriverManager
from django.contrib.auth import authenticate
import tweepy
import traceback

class getdata(APIView):
    def post(self, request):
        url="https://stopcorona.tn.gov.in/beds.php"
        df = pd.read_html(url, attrs={"id": "dtBasicExample"})
        df = df[0].fillna(0)
        driver1 = ChromeDriverManager().install()
        inst = list(df.Institution.Institution)
        print(request.data)
        try:
            ind = [i for i in range(len(inst)) if inst[i].lower() == request.data["hospital_name"].lower()]
            ind = ind[0]       

            data = df.iterrows()
            data=list(list(data)[ind][1])
            address=data[2]+","+data[1]
            options = webdriver.ChromeOptions()
            options.add_argument('headless')
            driver = webdriver.Chrome(driver1, options=options)
            driver.get("https://www.google.com/maps")
            sleep(2)
            inp = driver.find_element_by_id("searchboxinput")
            inp.click()
            inp.send_keys(address)
            driver.find_element_by_id("searchbox-searchbutton").click()
            sleep(2)
            url = driver.current_url
            driver.close()
            url = url[url.index('@')+1:].split(",")[:2]

            user = User(username = request.data["username"])
            user.set_password(request.data["password"])
            user.save()
            print(url)
            print(data)
            data.pop(0)
            hospital = data.pop(1)
            data.pop(-1)
            data.insert(0,user)
            data.extend([0,0,0,0,0,float(url[0]),float(url[1])])
            
            Hospitals(user= user, Hospital_name = hospital, district=data[1], covid_bed_total=data[2], covid_bed_occupied=data[3], covid_bed_vacant=data[4], oxy_bed_total=data[5], oxy_bed_occupied=data[6], oxy_bed_vacant=data[7], non_oxy_bed_total=data[8], non_oxy_bed_occupied=data[9], non_oxy_bed_vacant=data[10], icu_bed_total=data[11], icu_bed_occupied=data[12], icu_bed_vacant=data[13], vent_bed_total=data[14], vent_bed_occupied=data[15], vent_bed_vacant=data[16], last_updated=data[17], contactnumber=data[18], no_applied_covid=data[19], no_applied_oxy=data[20], no_applied_nonOxy=data[21], no_applied_icu=data[22], no_applied_vent=data[23], latitude=data[24], longitude=data[25]).save()     
            return Response({"message":"user created successfully"})
        except:
            traceback.print_exc()
            return Response({"message":"Hospital not found in the database"})

    
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
        
        h_lat = float(request.data.get('lat'))
        h_lon = float(request.data.get('lng'))
        
        rad = 500
        result = []
        c=0
        for i in self.get_queryset():
            #print(type(i.latitude))
            if self.dist(h_lat, h_lon, i.latitude, i.longitude)<=rad:
                result.append({"lat":i.latitude, "lng":i.longitude,"place":i.user.username ,"covid_bed_total":i.covid_bed_total,"covid_bed_occupied":i.covid_bed_occupied,
                "covid_bed_vacant":i.covid_bed_vacant,"oxy_bed_total":i.oxy_bed_total,"oxy_bed_occupied":i.oxy_bed_occupied,
                "oxy_bed_vacant":i.oxy_bed_vacant,"non_oxy_bed_total":i.non_oxy_bed_total,"non_oxy_bed_occupied":i.non_oxy_bed_occupied,
                "non_oxy_bed_vacant":i.non_oxy_bed_vacant,"icu_bed_total":i.icu_bed_total,"icu_bed_occupied":i.icu_bed_occupied,
                "icu_bed_vacant":i.icu_bed_vacant,"vent_bed_total":i.vent_bed_total,"vent_bed_occupied":i.vent_bed_occupied,
                "vent_bed_vacant":i.vent_bed_vacant,"last_updated":i.last_updated,"contactnumber":i.contactnumber})

                
            c+=0
            if c==100:
                break
        return Response(result)


class VerifyLogin(ListCreateAPIView):
    serializer_class = LoginSerializer
    queryset = User.objects.all()
    
    def post(self, request):
        data = request.data
        print(data["username"], data["password"])
        user = authenticate(username=data["username"], password=data["password"])

        if user is not None:
            return Response({"message":"Logged in"})
        else:
            if not User.objects.filter(username = data["username"]).exists():
                return Response({"message":"user not found"})
            else:
                return Response({"message":"Invalid password"})


class Tweet(APIView):
    consumer_key ="xxxxxxxxxxxxxxxx"
    consumer_secret ="xxxxxxxxxxxxxxxx"
    access_token ="xxxxxxxxxxxxxxxx"
    access_token_secret ="xxxxxxxxxxxxxxxx"

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    api = tweepy.API(auth)
    def post(self, request):
        data = request.data
        self.api.update_status(status = data.message)




