# Generated by Django 3.0.7 on 2020-07-04 23:16

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0042_auto_20200704_2315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='endTime',
            field=models.TimeField(default=datetime.datetime(2020, 7, 4, 23, 16, 48, 647098, tzinfo=utc), verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='startTime',
            field=models.TimeField(default=datetime.datetime(2020, 7, 4, 23, 16, 48, 647055, tzinfo=utc), verbose_name='Start Time'),
        ),
        migrations.AlterField(
            model_name='forum',
            name='timePostSubmitted',
            field=models.TimeField(default=datetime.datetime(2020, 7, 4, 23, 16, 48, 647718, tzinfo=utc), verbose_name='Submission Time'),
        ),
        migrations.AlterField(
            model_name='forumresponse',
            name='timeResponded',
            field=models.TimeField(default=datetime.datetime(2020, 7, 4, 23, 16, 48, 648780, tzinfo=utc), verbose_name='Response Time'),
        ),
    ]
