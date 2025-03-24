# Generated by Django 3.0.2 on 2020-02-07 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eventName', models.CharField(max_length=30)),
                ('eventGenre', models.CharField(max_length=30)),
                ('numberOfTicketsAvailable', models.IntegerField()),
                ('starts', models.DateTimeField(verbose_name='Start Date')),
                ('ends', models.DateTimeField(verbose_name='End Date')),
                ('eventLocation', models.CharField(max_length=30)),
                ('eventDescription', models.CharField(max_length=150)),
            ],
        ),
    ]
