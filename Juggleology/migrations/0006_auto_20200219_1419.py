# Generated by Django 2.2.6 on 2020-02-19 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0005_auto_20200218_1052'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goal',
            name='dateToAchieveBy',
            field=models.DateField(verbose_name='ouhouh'),
        ),
    ]
