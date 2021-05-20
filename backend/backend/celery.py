from __future__ import absolute_import
import os
from celery import Celery
from django.conf import settings
import pandas as pd
from django.apps import apps
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver

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
 

""" @app.task(bind=True) 
def tweet(self):
    url="https://twitter.com/login"
    driver1 = ChromeDriverManager().install()
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    driver = webdriver.Chrome(driver1)
    driver.get(url)
    username = driver.find_element_by_name("r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-1dz5y72 r-fdjqy7 r-13qz1uu")
    username.click()
    username.send_keys(getattr(settings, "TWITTER_USERNAME", None))
    passsword = driver.find_element_by_name("session[password]")
    passsword.click()
    username.send_keys(getattr(settings, "TWITTER_PASSWORD", None))
    login = driver.find_element_by_class_name("css-18t94o4")
    login.click()

    inp = driver.find_element_by_name("public-DraftStyleDefault-block public-DraftStyleDefault-ltr")
    inp.click()
    inp.send_keys("Need help")

    submit = driver.find_element_by_class_name("css-901oao r-1awozwy r-jwli3a r-6koalj r-18u37iz r-16y2uox r-1qd0xha r-a023e6 r-b88u0q r-1777fci r-rjixqe r-dnmrzs r-bcqeeo r-q4m81j r-qvutc0")
    submit.click() """
