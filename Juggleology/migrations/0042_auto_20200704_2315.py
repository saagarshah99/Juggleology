# Generated by Django 3.0.7 on 2020-07-04 23:15

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0041_auto_20200704_2311'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trick',
            name='belongsToWhichUser',
        ),
        migrations.AlterField(
            model_name='event',
            name='endTime',
            field=models.TimeField(default=datetime.datetime(2020, 7, 4, 23, 15, 53, 89579, tzinfo=utc), verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='startTime',
            field=models.TimeField(default=datetime.datetime(2020, 7, 4, 23, 15, 53, 89542, tzinfo=utc), verbose_name='Start Time'),
        ),
        migrations.AlterField(
            model_name='forum',
            name='timePostSubmitted',
            field=models.TimeField(default=datetime.datetime(2020, 7, 4, 23, 15, 53, 90129, tzinfo=utc), verbose_name='Submission Time'),
        ),
        migrations.AlterField(
            model_name='forumresponse',
            name='timeResponded',
            field=models.TimeField(default=datetime.datetime(2020, 7, 4, 23, 15, 53, 90785, tzinfo=utc), verbose_name='Response Time'),
        ),
    ]
