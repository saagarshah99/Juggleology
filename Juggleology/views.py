from .models import Trick, Event, Goal, Forum, ForumResponse, User, Search
from django.template import loader
from django.http import Http404, HttpResponse, JsonResponse, HttpResponseRedirect
from django.contrib.sessions.models import Session
from django.shortcuts import redirect
from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt, csrf_protect, requires_csrf_token
from django.db.models import Q
from django.contrib.auth.hashers import make_password, check_password


####################################LOADING PAGES################################################

#these pages don't need a login session to be established to load
def index(request): return render(request, 'index.html')	
def loadSiteswap(request): return render(request, 'Maths/siteswap.html')
def loadMaths(request): return render(request, 'Maths/mathematics_info.html')

#login and registration pages can only be loaded if login session not found
def loadLoginPage(request): 
	if request.session.get('id') is None:
		return render(request, 'User_Accounts/login.html')
	else: return redirect('/Juggleology/')
def loadRegistration(request): 
	if request.session.get('id') is None:
		return render(request, 'User_Accounts/register.html')
	else: return redirect('/Juggleology/')

'''
	* Only load the following pages if the user is logged in
	* Otherwise, redirct to login page, passing query string to redirect back to 
	the original page once logged in.
'''
def loadSearchResults(request): 
	if request.session.get('id') is not None:
		return render(request, 'search_results.html')
	else: return redirect('/Juggleology/login?search')
	
def loadDirectory(request): 	
	if request.session.get('id') is not None:
		return render(request, 'Directory/trick_directory.html') #add trick form	
	else: return redirect('/Juggleology/login?add-trick')
	
def loadViewTricks(request): 
	sessionID = request.session.get('id')
	if sessionID is not None:
		return render(request, 'Directory/view_tricks.html')
	else: return redirect('/Juggleology/login?view-tricks')

def loadJugglingGoals(request): 
	if request.session.get('id') is not None:
		return render(request, 'juggling_goals.html')
	else: return redirect('/Juggleology/login?juggling-goals')

def loadForum(request): 
	if request.session.get('id') is not None:
		return render(request, 'Forum/forum.html')
	else: return redirect('/Juggleology/login?forum')

def loadIndividualForumPost(request): 
	if request.session.get('id') is not None:
		return render(request, 'Forum/individual_forum_post.html')
	else: return redirect('/Juggleology/login?forum-post')

def loadCreateEvents(request): 
	if request.session.get('id') is not None:
		return render(request, 'Events/create_event_form.html')
	else: return redirect('/Juggleology/login?create-event')

def loadViewEvents(request): 
	if request.session.get('id') is not None:
		return render(request, 'Events/view_events.html')
	else: return redirect('/Juggleology/login?view-events')






############HANDLING TRICK DIRECTORY AJAX REQUESTS############

#return list of all tricks from DB and current user ID
@csrf_protect
def fetch_tricks(request):
	if request.method == 'GET':		
		userID = request.session["id"]		
		return JsonResponse({
			'tricks' : list(Trick.objects.values()), 
			'currentuser' : userID,
		})
		

#add trick to the directory that belongs to the user currently logged in
@csrf_protect
def add_trick(request):
	if request.method == 'POST':
		newTrick = Trick(
			trickBelongsToWhichUser = User.objects.get(id = request.session["id"]),
			backupUserID = request.session["id"],
			trickName = request.POST['nameOfTrick'],
			trickDescription = request.POST['descriptionOfTrick'],
			numberOfObjects = request.POST['objectCount'],
			propCategory = request.POST['propType'],
			difficultyLevel = request.POST['levelOfDifficulty'] 
		)
		newTrick.save()

		return JsonResponse({'trickName' : newTrick.trickName})
		
		
#extract id of trick to delete from request string and deleting corresponding trick
@csrf_exempt
@requires_csrf_token
def remove_trick(request):
	if request.method == 'DELETE':
		reqList = str(list(request))
		trickID = reqList.split("'")[1].split("=")[1]		
		
		trickToDelete = Trick.objects.get(id=trickID)
		trickToDelete.delete()
				
		return JsonResponse({'tricks': trickToDelete.trickName,})
		
		
#splitting request to extract id, field and value of selected trick to edit
@csrf_exempt
@requires_csrf_token
def edit_trick(request):
	if request.method == 'PUT':
		requestList = str(list(request))
		splitRequestPart = requestList.split("'")[1].split("&") #separated w/ "&"
		trickID = splitRequestPart[0].split("=")[1]
		
		trickFieldArray = splitRequestPart[1].split("=")
		attribute = trickFieldArray[0]
		newTrickValue = convertPlusToSpace(trickFieldArray[1])		
		
		editWhichField(request, attribute, trickID, newTrickValue)		

		return JsonResponse({'trickID' : trickID,})
		
		
#removes "+"s from string and replaces them w/ spaces
def convertPlusToSpace(givenString):
	givenString = [text.replace('+',' ') for text in givenString]	
	convertedString = ""
	for i in range(len(givenString)): 
		convertedString += givenString[i]	
	return convertedString

#checking each field to find the one that is to be edited and updating the DB record
def editWhichField(request, attribute, trickID, newTrickValue):
	trickRecordToModify = Trick.objects.get(id = trickID)
	
	if(attribute == "trickNameField"): trickRecordToModify.trickName = newTrickValue
	elif(attribute == "trickDescriptionField"): trickRecordToModify.trickDescription = newTrickValue
	elif(attribute == "objectCountField"): trickRecordToModify.numberOfObjects = newTrickValue
	elif(attribute == "propCategoryField"): trickRecordToModify.propCategory = newTrickValue
	elif(attribute == "difficultyLevelField"): trickRecordToModify.difficultyLevel = newTrickValue	

	trickRecordToModify.save()
	





############HANDLING GOAL AJAX REQUESTS############

#collect goals from database
@csrf_protect
def fetch_goal(request):
	if request.method == 'GET':
		userID = request.session["id"]
		return JsonResponse({
			'goals' : list(Goal.objects.values()), 
			'currentuser' : userID,
		})


#fetch input data from goal form and save in instance of Goal table (for current user)
@csrf_protect
def add_goal(request):
	if request.method == 'POST':	
		newGoal = Goal(
			goalBelongsToWhichUser = User.objects.get(id = request.session["id"]),
			backupUserID = request.session["id"],
			goalDetails = request.POST['txtAddGoal'],
			dateToAchieveBy = request.POST['txtDateToAchieveBy'],
		)
		newGoal.save()

		return JsonResponse({'goalDetails' : newGoal.goalDetails,})
		
    
#extract id of goal to delete from request string and deleting corresponding goal
@csrf_exempt
@requires_csrf_token
def remove_goal(request):
	if request.method == 'DELETE':
		reqList = str(list(request))
		goalID = reqList.split("'")[1].split("=")[1]
		
		goalToDelete = Goal.objects.get(id=goalID)
		goalToDelete.delete()
		
		return JsonResponse({'goals': goalToDelete.goalDetails,})
		
	
#splitting request to extract id and current goal state to change it (check/uncheck)
@csrf_exempt
def edit_goal_state(request):
	if request.method == 'PUT':		
		requestArray = str(list(request))
		splitRequestPart = requestArray.split("'")[1].split("&") #separated w/ "&"
		goalID = splitRequestPart[0].split("=")[1]		
		goalState = splitRequestPart[1].split("=")[1]

		recordToUpdate = Goal.objects.get(id=goalID)
		recordToUpdate.isGoalChecked = goalState
		recordToUpdate.save()
        
		return JsonResponse({'goalID' : goalID, 'updated': goalState,})	
    







############HANDLING EVENT AJAX REQUESTS############

#fetch input data from event form and saved in instance of Event table
@csrf_protect
def add_event(request):
	if request.method == 'POST':	
		newEvent = Event(
			eventBelongsToWhichUser = User.objects.get(id = request.session["id"]),
			backupUserID = request.session["id"],
			eventHost = request.session.get('firstName')+" "+request.session.get('lastName'),
			eventName = request.POST['eventName'],
			eventGenre = request.POST['genre'],
			numberOfTicketsAvailable = request.POST['totalTickets'],
			ticketCost = request.POST['ticketCost'],
			startDate = request.POST['eventDate'],
			startTime = request.POST['eventStartTime'],
			endDate = request.POST['eventEndDate'],
			endTime = request.POST['eventEndTime'],
			eventLocation = request.POST['eventLocation'],
			eventDescription = request.POST['descriptionText'],
		)
		newEvent.save()
		
		return JsonResponse({'Event Name' : newEvent.eventName,})
		
		
@csrf_protect
def fetch_events(request):
	if request.method == 'GET':
		userID = request.session["id"]
		return JsonResponse({
			'events' : list(Event.objects.values()), 
			'currentuser' : userID,
		})
		
		
#split request to extract id of event and then deleting corresponding event
@csrf_exempt
@requires_csrf_token
def remove_event(request):
	if request.method == 'DELETE':
		requestList = str(list(request))
		eventID = requestList.split("'")[1].split("=")[1]
		
		eventToDelete = Event.objects.get(id = eventID)
		eventToDelete.delete()
		return JsonResponse({'events': eventToDelete.eventName,})
		






############HANDLING FORUM AJAX REQUESTS############
		
#add a submitted forum post to an instance of the forum table
@csrf_protect
def add_forum_post(request):
	if request.method == 'POST':
		userID = request.session["id"]		
		newForumPost = saveForumPost(userID, request)		
		return JsonResponse({'postID' : newForumPost.id,'postTitle' : newForumPost.forumPostTitle,})
		
		
#preparing all data to be saved, exception thrown if no found find (it's optional)
def saveForumPost(userID, request):
	txtContributorName = request.session.get('firstName')+" "+request.session.get('lastName')
	
	try:
		imgOptionalMedia = request.FILES['mediaToUpload']
		newForumPost = Forum(
			postBelongsToWhichUser = User.objects.get(id = userID),
			backupUserID = userID,
			forumContributorName = txtContributorName, 
			forumPostTitle = request.POST['postTitle'], 
			forumComment = request.POST['comment'], 
			forumOptionalMedia = imgOptionalMedia		
		)
	except:
		newForumPost = Forum(
			postBelongsToWhichUser = User.objects.get(id = userID),
			backupUserID = userID,
			forumContributorName = txtContributorName, 
			forumPostTitle = request.POST['postTitle'], 
			forumComment = request.POST['comment']
		)
	newForumPost.save()
	return newForumPost
	
		
#fetching all posts in forum from database
@csrf_protect
def fetch_all_forum_posts(request):
	if request.method == 'GET':
		userID = request.session["id"]
		return JsonResponse({
			'all_forum_posts' : list(Forum.objects.values()), 
			'currentuser' : userID,
		})
		
		
#split request to extract id of forum post and deleting corresponding one
@csrf_exempt
@requires_csrf_token
def remove_forum_post(request):
	if request.method == 'DELETE':
		requestList = str(list(request))
		postID = requestList.split("'")[1].split("=")[1]
		
		forumPostToDelete = Forum.objects.get(id = postID)
		forumPostToDelete.delete()
		return JsonResponse({'Forum Post Title': forumPostToDelete.forumPostTitle,})
		
		
#submit forum response to database, uniquely identifying original post it belongs to
@csrf_protect
def add__forum_response(request):
	if request.method == 'POST':		
		userID = request.session["id"]
		currentUser = User.objects.get(id = userID)

		newForumResponse = saveForumResponse(userID, currentUser, request)
		
		return JsonResponse({'Forum Post Response Title' : newForumResponse.responsePostTitle,})
		
		
#preparing all data to be saved, exception thrown if no found find (it's optional)
def saveForumResponse(userID, currentUser, request):
	txtResponderName = request.session.get('firstName') + " " + request.session.get('lastName')		
	associatedForumPost = Forum.objects.get(id = request.POST['responsePostID'])
	
	try:
		imgResponseMedia = request.FILES['responseMedia']
		newForumResponse = ForumResponse(				
			responseBelongsToWhichUser = currentUser,
			backupUserID = userID,
			belongsToForumPost = associatedForumPost,
			forumPostID = request.POST['responsePostID'],
			responderName = txtResponderName,
			responsePostTitle = associatedForumPost.forumPostTitle,
			responseComment = request.POST['responseComment'],
			responseOptionalMedia = imgResponseMedia
		)
	except:
		newForumResponse = ForumResponse(
			responseBelongsToWhichUser = currentUser,
			backupUserID = userID,
			belongsToForumPost = associatedForumPost,
			forumPostID = request.POST['responsePostID'],
			responderName = txtResponderName,
			responsePostTitle = associatedForumPost.forumPostTitle,
			responseComment = request.POST['responseComment']
		)
	newForumResponse.save()
	return newForumResponse
	
		
#fetching ALL responses to posts in the forum from database - not specific to a certain post here
@csrf_protect
def fetch_forum_responses(request):
	if request.method == 'GET':		
		userID = request.session["id"]
		return JsonResponse({
			'forum_responses' : list(ForumResponse.objects.values()), 
			'currentuser' : userID,
		})
		

#split request to extract id of forum post and deleting corresponding one
@csrf_exempt
@requires_csrf_token
def remove_forum_response(request):
	if request.method == 'DELETE':
		requestList = str(list(request))
		forumResponseID = requestList.split("'")[1].split("=")[1]
		
		forumResponseToDelete = ForumResponse.objects.get(id = forumResponseID)
		forumResponseToDelete.delete()
		return JsonResponse({'Forum Response Title': forumResponseToDelete.responsePostTitle,})
		







############HANDLING USER ACCOUNT AJAX REQUESTS & OTHER PROCESSING############

#adding a new user to the database upon successful registration
@csrf_protect
def create_account(request):
	if request.method == 'POST':
		txtUsernameReg = request.POST['usernameReg']
		txtPasswordReg = make_password(request.POST['passwordReg']) #hashed
		
		#checking if username or password has been taken
		if User.objects.filter(userName = txtUsernameReg).exists():
			return JsonResponse({'status': "Username Exists"})
		elif User.objects.filter(password = txtPasswordReg).exists():
			return JsonResponse({'status': "Password Exists"})
		else:	
			newUser = User(
				firstName = request.POST['firstName'],
				lastName = request.POST['lastName'],
				userName = txtUsernameReg,
				password = txtPasswordReg,
			)
			newUser.save()
		
			return JsonResponse({'status': "Account created successfully!"})
			

#checking credentials entered against database and establishing login session if successful
@csrf_protect
def attempt_login(request):	
	txtUsernameLogin = request.POST['usernameLog']
	txtPasswordLogin = request.POST['passwordLog']	
	
	if User.objects.filter(userName = txtUsernameLogin).exists():
		existingUser = User.objects.get(userName = txtUsernameLogin)
		
		#decrypting hashed password and checking against the one entered
		if(check_password(txtPasswordLogin, existingUser.password)):
			request.session['id'] = existingUser.id
			request.session['firstName'] = existingUser.firstName
			request.session['lastName'] = existingUser.lastName
			request.session['userName'] = existingUser.userName
			request.session['password'] = existingUser.password
			
			return JsonResponse({'status': "Logged in successfully!"})		
		else: 
			return JsonResponse({'status': "Incorrect password!"})			
	else: 
		return JsonResponse({'status': "Incorrect username!"})
		
	
#killing the current login session and redirecting to the homepage
def log_out(request):
	request.session.flush()
	return redirect('/Juggleology')
    
	
#return whether or not the user is logged in and their name accordingly
def get_login_state(request):
	if request.session.get('id') is not None:		
		firstName = request.session.get('firstName')
		return JsonResponse({'status': "logged in", 'nameOfUser': firstName})
	else:
		return JsonResponse({'status': "logged out", 'nameOfUser': "Guest"})
	






############HANDLING SEARCH QUERIES############
	
#return a list of all records satisfying the search for all applicable tables
@csrf_protect
def searchAll(request):	
	searchQuery = request.POST["query"]
	
	searchTricks = Trick.objects.filter(trickName__contains = searchQuery).values() | Trick.objects.filter(trickDescription__contains = searchQuery).values() | Trick.objects.filter(numberOfObjects__contains = searchQuery).values() | Trick.objects.filter(propCategory__contains = searchQuery).values() | Trick.objects.filter(difficultyLevel__contains = searchQuery).values()

	searchGoals = Goal.objects.filter(goalDetails__contains = searchQuery).values()
	
	searchForum = Forum.objects.filter(forumPostTitle__contains = searchQuery).values() | Forum.objects.filter(forumContributorName__contains = searchQuery).values() | Forum.objects.filter(forumComment__contains = searchQuery).values()
	
	searchEvents = Event.objects.filter(eventName__contains = searchQuery).values() | Event.objects.filter(eventHost__contains = searchQuery).values() | Event.objects.filter(eventLocation__contains = searchQuery).values() | Event.objects.filter(eventDescription__contains = searchQuery).values()
	
	'''if at least some results are returned and the query hasn't been saved before, save it to the database
	so that the user will be presented with more suggestions'''
	results = list(searchTricks) + list(searchGoals) + list(searchForum) + list(searchEvents)
	if(results != [] and Search.objects.filter(search_query = searchQuery).count() == 0):
		Search(search_query = searchQuery).save()
	
	#return all results for the search results page and the id of the current user
	return JsonResponse({
		'filteredtricks' : list(searchTricks),
		'filteredgoals' : list(searchGoals),
		'filteredforumposts' : list(searchForum),
		'filteredevents' : list(searchEvents),
		'currentuser' : request.session["id"],
	})
	
	
#return records from search table - for search suggestions
@csrf_protect
def fetchSearchQueries(request):
	if request.method == 'GET':
		return JsonResponse({
			'queries' : list(Search.objects.values())
		})


