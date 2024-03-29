# Generated by Django 3.0.4 on 2020-04-14 20:49

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0022_auto_20200414_2041'),
    ]

    operations = [
        migrations.AddField(
            model_name='forum',
            name='datePostSubmitted',
            field=models.DateField(default=datetime.date.today, verbose_name='Submission Date'),
        ),
        migrations.AlterField(
            model_name='event',
            name='endTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 14, 20, 49, 16, 902505, tzinfo=utc), verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='startTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 14, 20, 49, 16, 902505, tzinfo=utc), verbose_name='Start Time'),
        ),
    ]
