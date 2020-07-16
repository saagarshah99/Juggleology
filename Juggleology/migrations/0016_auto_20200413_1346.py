# Generated by Django 3.0.4 on 2020-04-13 12:46

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0015_auto_20200412_1831'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='eventHost',
            field=models.CharField(default='Saagar Shah', max_length=30),
        ),
        migrations.AlterField(
            model_name='event',
            name='endTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 13, 12, 46, 36, 563874, tzinfo=utc), verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='startTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 13, 12, 46, 36, 563874, tzinfo=utc), verbose_name='Start Time'),
        ),
    ]