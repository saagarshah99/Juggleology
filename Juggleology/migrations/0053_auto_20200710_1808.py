# Generated by Django 3.0.7 on 2020-07-10 18:08

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0052_auto_20200705_0226'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='endTime',
            field=models.TimeField(default=datetime.datetime(2020, 7, 10, 18, 8, 0, 441007, tzinfo=utc), verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='startTime',
            field=models.TimeField(default=datetime.datetime(2020, 7, 10, 18, 8, 0, 440961, tzinfo=utc), verbose_name='Start Time'),
        ),
        migrations.AlterField(
            model_name='forum',
            name='timePostSubmitted',
            field=models.TimeField(default=datetime.datetime(2020, 7, 10, 18, 8, 0, 441835, tzinfo=utc), verbose_name='Submission Time'),
        ),
        migrations.AlterField(
            model_name='forumresponse',
            name='timeResponded',
            field=models.TimeField(default=datetime.datetime(2020, 7, 10, 18, 8, 0, 442985, tzinfo=utc), verbose_name='Response Time'),
        ),
    ]
