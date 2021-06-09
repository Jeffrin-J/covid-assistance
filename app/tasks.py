# from celery import shared_task
# from rest_framework.views import APIView
# from .models import *
# import pandas as pd
# import traceback

# @shared_task
# class updateData(APIView):
#     def get(self, request):
#         print("hello")
#         url="https://stopcorona.tn.gov.in/beds.php"
#         df = pd.read_html(url, attrs={"id": "dtBasicExample"})
#         df = df[0]
#         df =df.head(25)
#         df = df.fillna(0)
#         for i,j in df.iterrows():
#             try:
#                 data = list(j)
#                 hospital = Hospitals.objects.get(user = data[2])            
#                 data.pop(0)
#                 data.pop(1)
#                 hospital.covid_bed_total=data[2]
#                 hospital.covid_bed_occupied=data[3]
#                 hospital.covid_bed_vacant=data[4]
#                 hospital.oxy_bed_total=data[5]
#                 hospital.oxy_bed_occupied=data[6] 
#                 hospital.oxy_bed_vacant=data[7]
#                 hospital.non_oxy_bed_total=data[8]
#                 hospital.non_oxy_bed_occupied=data[9]
#                 hospital.non_oxy_bed_vacant=data[10]
#                 hospital.icu_bed_total=data[11]
#                 hospital.icu_bed_occupied=data[12]
#                 hospital.icu_bed_vacant=data[13]
#                 hospital.vent_bed_total=data[14]
#                 hospital.vent_bed_occupied=data[15]
#                 hospital.vent_bed_vacant=data[16]
#                 hospital.last_updated=data[17]
#                 hospital.save()
                
#             except:
#                 traceback.print_exc()
#                 pass