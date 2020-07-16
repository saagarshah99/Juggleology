# Generated by Django 3.0.4 on 2020-04-29 18:36

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0033_auto_20200419_2232'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='endTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 29, 18, 36, 44, 770554, tzinfo=utc), verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='startTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 29, 18, 36, 44, 770554, tzinfo=utc), verbose_name='Start Time'),
        ),
        migrations.AlterField(
            model_name='forum',
            name='timePostSubmitted',
            field=models.TimeField(default=datetime.datetime(2020, 4, 29, 18, 36, 44, 770554, tzinfo=utc), verbose_name='Submission Time'),
        ),
        migrations.AlterField(
            model_name='forumresponse',
            name='timeResponded',
            field=models.TimeField(default=datetime.datetime(2020, 4, 29, 18, 36, 44, 771553, tzinfo=utc), verbose_name='Response Time'),
        ),
    ]
