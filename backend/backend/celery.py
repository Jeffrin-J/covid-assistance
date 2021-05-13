from __future__ import absolute_import
import os
from celery import Celery
from django.conf import settings

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


# @app.task(bind=True)
# def debug_task(self):
#     print(f'Request: {self.request!r}')

@app.task(bind=True)
def hello_world(self):
    print('Hello world!')