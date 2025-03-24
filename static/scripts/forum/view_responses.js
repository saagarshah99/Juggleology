//get individual forum post from database upon loading page
function fetchForumResponses()
{
	$.ajax(
	{
		url: '/Juggleology/fetch_forum_responses/',
		type: 'GET',
		dataType: 'json',
		success: outputForumResponses,
	})
}

//output the content if the get request is successful
function outputForumResponses(response)
{

	//looping through records for this forum post and generating output for them
	var associatedKeys = getAssociatedResponses(response);
	var outputText = "";
	for(var i=0; i<associatedKeys.length; i++)
	{
		var current = associatedKeys[i]; //key of current response to output
		var forumResponseID = response.forum_responses[current].id;
		var deleteButton = '<a href="javascript: deleteForumResponse('+forumResponseID+')"' +
		'class="text-danger"><b>Delete</b></a>';

		//don't show delete button if the user who posted the reponse is not logged in
		if(response.forum_responses[current].backupUserID != response.currentuser)
		{
			deleteButton = "";
		}

		//extracting responses for the individual post and storing in variables with some formatting
		var title = "<h5>Re: " + response.forum_responses[current].responsePostTitle + "</h5>";
		var contributor = "Response from <b><i>" + response.forum_responses[current].responderName + "</i></b>";
		var date = convertDateUKFormat(response.forum_responses[current].dateResponded);
		var time = response.forum_responses[current].timeResponded.slice(0,8);
		var comment = response.forum_responses[current].responseComment;
		var fileName = response.forum_responses[current].responseOptionalMedia;

		//generating output of each response
		outputText += title + deleteButton + "<br /><b><div id='deleting"+forumResponseID+"'></div></b>" +
		"<span class='contributionStamp'>" +
		contributor + " ("+date+", "+time+")</span><p />" +
		comment + "<p />" +
		generateMediaOutput(fileName) + "<hr />";
	}

	//outputting each response below the form
	$("#outputForumResponses").html(outputText);
	$(".contributionStamp").css("color", "#9152ff").css("font-size", "small");
}

//return array of keys for accessing responses associated with the current forum post
function getAssociatedResponses(response)
{
	var associatedKeys = [];

	for(var i=0; i<response.forum_responses.length; i++)
	{
		if(response.forum_responses[i].forumPostID == extractPostID())
		{
			associatedKeys.push(i);
		}
	}

	return associatedKeys;
}

fetchForumResponses();
