# Generated by Django 3.0.4 on 2020-04-12 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Juggleology', '0009_goal_isgoalchecked'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='ticketCost',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
