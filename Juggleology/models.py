from django.db import models
from django.utils.timezone import now
from django.utils import timezone
import datetime
from datetime import date, time
	
class User(models.Model):
	firstName = models.CharField(max_length=100)
	lastName = models.CharField(max_length=100)
	userName = models.CharField(max_length=30)
	password = models.CharField(max_length=150)
	
#storing valid search queries in order to provide more accurate suggestions in the future
class Search(models.Model):
	search_query = models.CharField(max_length=100)

class Trick(models.Model):
	trickBelongsToWhichUser = models.ForeignKey(User, on_delete=models.CASCADE)
	backupUserID = models.IntegerField()
	trickName = models.CharField(max_length=200)
	trickDescription = models.CharField(max_length=400)
	numberOfObjects = models.IntegerField()
	propCategory = models.CharField(max_length=100)
	difficultyLevel = models.CharField(max_length=100)

class Goal(models.Model):
	goalBelongsToWhichUser = models.ForeignKey(User, on_delete=models.CASCADE)
	backupUserID = models.IntegerField()
	goalDetails = models.CharField(max_length=200)
	dateToAchieveBy = models.DateTimeField("Date to achieve by")
	isGoalChecked = models.BooleanField(default=False)
	

class Event(models.Model):
	eventBelongsToWhichUser = models.ForeignKey(User, on_delete=models.CASCADE)
	backupUserID = models.IntegerField()
	eventHost = models.CharField(max_length=100)
	eventName = models.CharField(max_length=200)
	eventGenre = models.CharField(max_length=100)
	numberOfTicketsAvailable = models.IntegerField()
	ticketCost = models.IntegerField()	
	startDate = models.DateField("Start Date", default=date.today)	
	startTime = models.TimeField("Start Time", default=timezone.now())	
	endDate = models.DateField("End Date", default=date.today)	
	endTime = models.TimeField("End Time", default=timezone.now())
	eventLocation = models.CharField(max_length=300)
	eventDescription = models.CharField(max_length=400)
	
class Forum(models.Model):
	postBelongsToWhichUser = models.ForeignKey(User, on_delete=models.CASCADE)
	backupUserID = models.IntegerField()
	forumContributorName = models.CharField(max_length=100)
	forumPostTitle = models.CharField(max_length=200)
	forumComment = models.CharField(max_length=400)
	forumOptionalMedia = models.ImageField(upload_to='forum_media', blank=True)
	datePostSubmitted = models.DateField("Submission Date", default=date.today)
	timePostSubmitted = models.TimeField("Submission Time", default=timezone.now())

class ForumResponse(models.Model):
	responseBelongsToWhichUser = models.ForeignKey(User, on_delete=models.CASCADE)
	backupUserID = models.IntegerField()
	belongsToForumPost = models.ForeignKey(Forum, on_delete=models.CASCADE)
	forumPostID = models.IntegerField()	
	responderName = models.CharField(max_length=100)
	responsePostTitle = models.CharField(max_length=200)
	responseComment = models.CharField(max_length=400)
	responseOptionalMedia = models.ImageField(upload_to='forum_media/responses', blank=True)
	dateResponded = models.DateField("Response Date", default=date.today)
	timeResponded = models.TimeField("Response Time", default=timezone.now())

