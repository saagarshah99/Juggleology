# Generated by Django 2.2.6 on 2020-02-07 00:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Trick',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trickName', models.CharField(max_length=30)),
                ('trickDescription', models.CharField(max_length=150)),
                ('numberOfObjects', models.IntegerField()),
                ('propCategory', models.CharField(max_length=30)),
                ('difficultyLevel', models.CharField(max_length=30)),
            ],
        ),
    ]