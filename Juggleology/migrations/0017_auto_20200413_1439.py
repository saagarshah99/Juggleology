# Generated by Django 3.0.4 on 2020-04-13 13:39

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0016_auto_20200413_1346'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='endTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 13, 13, 39, 36, 604615, tzinfo=utc), verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='eventDescription',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='event',
            name='eventGenre',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='event',
            name='eventHost',
            field=models.CharField(default='Saagar Shah', max_length=50),
        ),
        migrations.AlterField(
            model_name='event',
            name='eventLocation',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='event',
            name='eventName',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='event',
            name='startTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 13, 13, 39, 36, 604615, tzinfo=utc), verbose_name='Start Time'),
        ),
        migrations.AlterField(
            model_name='goal',
            name='goalDetails',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='trick',
            name='trickName',
            field=models.CharField(max_length=100),
        ),
    ]
