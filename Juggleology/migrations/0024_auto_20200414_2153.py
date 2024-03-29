# Generated by Django 3.0.4 on 2020-04-14 20:53

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0023_auto_20200414_2149'),
    ]

    operations = [
        migrations.AddField(
            model_name='forum',
            name='timePostSubmitted',
            field=models.TimeField(default=datetime.datetime(2020, 4, 14, 20, 53, 56, 872761, tzinfo=utc), verbose_name='Submission Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='endTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 14, 20, 53, 56, 871762, tzinfo=utc), verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='startTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 14, 20, 53, 56, 871762, tzinfo=utc), verbose_name='Start Time'),
        ),
    ]
