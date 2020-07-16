# Generated by Django 3.0.4 on 2020-04-15 21:57

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0026_auto_20200414_2227'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='endTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 15, 21, 57, 6, 138216, tzinfo=utc), verbose_name='End Time'),
        ),
        migrations.AlterField(
            model_name='event',
            name='startTime',
            field=models.TimeField(default=datetime.datetime(2020, 4, 15, 21, 57, 6, 138216, tzinfo=utc), verbose_name='Start Time'),
        ),
        migrations.AlterField(
            model_name='forum',
            name='timePostSubmitted',
            field=models.TimeField(default=datetime.datetime(2020, 4, 15, 21, 57, 6, 139216, tzinfo=utc), verbose_name='Submission Time'),
        ),
        migrations.CreateModel(
            name='ForumResponse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('responderName', models.CharField(max_length=100)),
                ('responsePostTitle', models.CharField(max_length=200)),
                ('responseComment', models.CharField(max_length=400)),
                ('responseOptionalMedia', models.ImageField(blank=True, upload_to='forum_media/responses')),
                ('dateResponded', models.DateField(default=datetime.date.today, verbose_name='Response Date')),
                ('timeResponded', models.TimeField(default=datetime.datetime(2020, 4, 15, 21, 57, 6, 139216, tzinfo=utc), verbose_name='Response Time')),
                ('belongsToForumPost', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Juggleology.Forum')),
            ],
        ),
    ]