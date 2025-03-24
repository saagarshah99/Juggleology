//ajax get request for fetching all forum posts (the individual post is extracted later)
$.ajax(
{
	url: '/Juggleology/fetch_all_forum_posts/',
	type: 'GET',
	dataType: 'json',
	success: outputIndividualPost,
})

$('#respondToForumPost').hide(); //hide response form by default

//output the content if the get request is successful
function outputIndividualPost(response)
{
	//extracting postID and then key from that to access information about the selected forum post
	var postID = extractPostID();
	var key = extractPostKey(postID, response);

	hasPostBeenDeleted(postID, response);

	//extracting data from the individual post and storing in variables with some formatting
	var title = "<h3>" + response.all_forum_posts[key].forumPostTitle + "</h3>";
	var contributor = "Originally posted by <b><i>" +
	response.all_forum_posts[key].forumContributorName + "</i></b>";
	var datePosted = convertDateUKFormat(response.all_forum_posts[key].datePostSubmitted);
	var timePosted = response.all_forum_posts[key].timePostSubmitted.slice(0,8); //removing excess numbers
	var comment = response.all_forum_posts[key].forumComment;
	var fileName = response.all_forum_posts[key].forumOptionalMedia;

	//generate buttons for moving to previous and next forum posts and deleting the current one
	var previousID = getAnotherID(storeAllPostIDs(response), postID, "previous");
	var previousButton = '<a class="text-warning" href="javascript: passPostID('+previousID+')"><b>Previous</b></a>';
	var nextID = getAnotherID(storeAllPostIDs(response), postID, "next");
	var nextButton = '<a href="javascript: passPostID('+nextID+')"><b>Next</b></a>';
	var deleteButton = '<a class="text-danger" href="javascript: deleteForumPost('+postID+')"><b>Delete</b></a>';

	//no delete button if the post doesn't belong to the user currently logged in'
	if(response.all_forum_posts[key].backupUserID != response.currentuser)
	{
		deleteButton = "";
	}

	//generating output with the data extracted above
	var outputText = "<hr />" + title +
	previousButton + "&nbsp;&nbsp;&nbsp;&nbsp;" + nextButton +
	"&nbsp;&nbsp;&nbsp;&nbsp;"+deleteButton + "<br /><b><div id='deleting'></div></b>" +
	"<span id='originalPosterText'>" + contributor + " (" + datePosted + ", " + timePosted + ")</span>" +
	"<br /><br />" + comment + "<br /><br />" +
	generateMediaOutput(fileName);
	$("#myIndividualPost").html(outputText);
	$("#txtResponsePostID").val(postID); //hidden field for storing in DB
	$("#originalPosterText").css("color", "#19b6ff").css("font-size", "small");
}

//return an array containing ids all of forum posts in the database
function storeAllPostIDs(response)
{
	var allPostIDs = [];

	for(var i=0; i<response.all_forum_posts.length; i++)
	{
		allPostIDs.push(response.all_forum_posts[i].id);
	}

	return allPostIDs;
}

//return the id of the next or previous forum post depending on which is being requested
function getAnotherID(allPostIDs, postID, whichPost)
{
	for(var i=0; i<allPostIDs.length; i++)
	{
		if(allPostIDs[i] == postID)
		{
			if(whichPost == "previous") {return allPostIDs[i-1];}
			else if(whichPost == "next") {return allPostIDs[i+1];}
		}
	}
}

//redirect to the main forum page if the post has been deleted
function hasPostBeenDeleted(postID, response)
{
	var deleted = "Yes";
	for(var i=0; i<response.all_forum_posts.length; i++)
	{
		if(response.all_forum_posts[i].id == postID)
		{
			deleted = "No";
		}
	}
	if(deleted == "Yes") {location.href = "/Juggleology/forum"}
}

//extracting the forum post id from the query string in the url
function extractPostID()
{
	var forumQueryString = decodeURIComponent(window.location.search);
	forumQueryString = forumQueryString.substring(1);
	var queries = forumQueryString.split("&");

	var postID = "";
	for(var i=0; i<queries.length; i++)
	{
		postID += queries[i];
	}
	return parseInt(postID);
}

//extracting the key to access the post using the post id found above
function extractPostKey(postID, response)
{
	var key;
	for(var i=0; i<response.all_forum_posts.length; i++)
	{
		if(response.all_forum_posts[i].id == postID)
		{
			key = i;
		}
	}
	return key;
}

function generateMediaOutput(fileName)
{
    return "<img src='/Juggleology/media/"+fileName+"' class='img-fluid' width='75%' height='75%' />";
}