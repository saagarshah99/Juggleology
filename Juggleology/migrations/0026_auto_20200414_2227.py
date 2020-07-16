# Generated by Django 3.0.4 on 2020-04-14 21:27

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0025_auto_20200414_2223'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='endTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 14, 21, 27, 4, 285706, tzinfo=utc), verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='startTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 14, 21, 27, 4, 285706, tzinfo=utc), verbose_name='Start Time'),
        ),
        migrations.AlterField(
            model_name='forum',
            name='forumOptionalMedia',
            field=models.ImageField(blank=True, upload_to='forum_media'),
        ),
        migrations.AlterField(
            model_name='forum',
            name='timePostSubmitted',
            field=models.TimeField(default=datetime.datetime(2020, 4, 14, 21, 27, 4, 286706, tzinfo=utc), verbose_name='Submission Time'),
        ),
    ]