from __future__ import absolute_import
import os
from celery import Celery
from django.conf import settings
import pandas as pd
from django.apps import apps

# # set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# # Using a string here means the worker doesn't have to serialize
# # the configuration object to child processes.
# # - namespace='CELERY' means all celery-related configuration keys
# #   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# # Load task modules from all registered Django app configs.
app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def update_data(self):
    print("done")
    url="https://stopcorona.tn.gov.in/beds.php"
    df = pd.read_html(url, attrs={"id": "dtBasicExample"})
    df = df[0]
    df =df.head(25)
    df = df.fillna(0)
    for i,j in df.iterrows():
        try:
            data = list(j)
            Hospitals = apps.get_model(app_label='app', model_name='Hospitals')
            hospital = Hospitals.objects.get(data[2])            
            data.pop(0)
            data.pop(1)
            hospital.covid_bed_total=data[2]
            hospital.covid_bed_occupied=data[3]
            hospital.covid_bed_vacant=data[4]
            hospital.oxy_bed_total=data[5]
            hospital.oxy_bed_occupied=data[6] 
            hospital.oxy_bed_vacant=data[7]
            hospital.non_oxy_bed_total=data[8]
            hospital.non_oxy_bed_occupied=data[9]
            hospital.non_oxy_bed_vacant=data[10]
            hospital.icu_bed_total=data[11]
            hospital.icu_bed_occupied=data[12]
            hospital.icu_bed_vacant=data[13]
            hospital.vent_bed_total=data[14]
            hospital.vent_bed_occupied=data[15]
            hospital.vent_bed_vacant=data[16]
            hospital.last_updated=data[17]
            hospital.save()
            
        except:
            pass
 