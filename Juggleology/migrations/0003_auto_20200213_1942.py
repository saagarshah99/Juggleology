# Generated by Django 3.0.2 on 2020-02-13 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0002_event'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trick',
            name='trickDescription',
            field=models.CharField(max_length=300),
        ),
    ]
