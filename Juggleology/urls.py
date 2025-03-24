from django.urls import path
from . import views

app_name = 'Juggleology'
urlpatterns = [
    #urls for loading pages
    path('', views.index, name='index'),
    path('siteswap', views.loadSiteswap, name='siteswap'),
    path('maths', views.loadMaths, name='maths'),
    path('add-trick', views.loadDirectory, name='directory'),
    path('view-tricks', views.loadViewTricks, name='loadViewTricks'),
    path('juggling-goals', views.loadJugglingGoals, name='loadJugglingGoals'),
    path('forum', views.loadForum, name='forum'),
    path('forum-post', views.loadIndividualForumPost, name='individual_forum_post'),
    path('create-event', views.loadCreateEvents, name='createEvent'),
    path('view-events', views.loadViewEvents, name='viewEvents'),
    path('login', views.loadLoginPage, name='login'),
    path('register', views.loadRegistration, name='register'),
    path('search', views.loadSearchResults, name='search'),
    
    #urls for trick directory ajax requests
    path('add_trick/', views.add_trick, name='add_trick'),
    path('fetch_tricks/', views.fetch_tricks, name='fetch_tricks'),
    path('remove_trick/', views.remove_trick, name='remove_trick'),
    path('edit_trick/', views.edit_trick, name='edit_trick'),
    
    #urls for goal ajax requests
    path('add_goal/', views.add_goal, name='add_goal'),
    path('fetch_goal/', views.fetch_goal, name='fetch_goal'),
    path('remove_goal/', views.remove_goal, name='remove_goal'),    
    path('edit_goal_state/', views.edit_goal_state, name='edit_goal_state'),   

    #urls for event ajax requests
    path('add_event/', views.add_event, name='add_event'),
    path('fetch_events/', views.fetch_events, name='fetch_events'),
    path('remove_event/', views.remove_event, name='remove_event'),
    
    #urls for forum ajax requests
    path('add_forum_post/', views.add_forum_post, name='add_forum_post'),
    path('fetch_all_forum_posts/', views.fetch_all_forum_posts, name='fetch_all_forum_posts'),
    path('add__forum_response/', views.add__forum_response, name='add__forum_response'),
    path('fetch_forum_responses/', views.fetch_forum_responses, name='fetch_forum_responses'),
    path('remove_forum_post/', views.remove_forum_post, name='remove_forum_post'),
    path('remove_forum_response/', views.remove_forum_response, name='remove_forum_response'),
    
    #urls for user account requests and other processing
    path('create_account/', views.create_account, name='create_account'),
    path('attempt_login/', views.attempt_login, name='attempt_login'),
    path('logout/', views.log_out, name='log_out'),
    path('get_login_state/', views.get_login_state, name='get_login_state'),
    
    #urls for searching
    path('searchAll/', views.searchAll, name='searchAll'),    
    path('fetchSearchQueries/', views.fetchSearchQueries, name='fetchSearchQueries'),
]
