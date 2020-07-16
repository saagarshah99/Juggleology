# Generated by Django 3.0.4 on 2020-04-29 18:48

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0034_auto_20200429_1936'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='endTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 29, 18, 48, 11, 321244, tzinfo=utc), verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='startTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 29, 18, 48, 11, 321244, tzinfo=utc), verbose_name='Start Time'),
        ),
        migrations.AlterField(
            model_name='forum',
            name='timePostSubmitted',
            field=models.TimeField(default=datetime.datetime(2020, 4, 29, 18, 48, 11, 322243, tzinfo=utc), verbose_name='Submission Time'),
        ),
        migrations.AlterField(
            model_name='forumresponse',
            name='timeResponded',
            field=models.TimeField(default=datetime.datetime(2020, 4, 29, 18, 48, 11, 323243, tzinfo=utc), verbose_name='Response Time'),
        ),
    ]