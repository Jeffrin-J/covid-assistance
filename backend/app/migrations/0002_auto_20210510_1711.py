# Generated by Django 3.2.2 on 2021-05-10 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='hospitals',
            name='no_applied_covid',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='hospitals',
            name='no_applied_icu',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='hospitals',
            name='no_applied_nonOxy',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='hospitals',
            name='no_applied_oxy',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='hospitals',
            name='no_applied_vent',
            field=models.IntegerField(null=True),
        ),
    ]
