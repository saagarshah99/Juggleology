from django.contrib import admin
from .models import Trick, Event, Goal, Forum, ForumResponse, User, Search

admin.site.register(Trick)
admin.site.register(Goal)
admin.site.register(Event)
admin.site.register(Forum)
admin.site.register(ForumResponse)
admin.site.register(User)
admin.site.register(Search)
