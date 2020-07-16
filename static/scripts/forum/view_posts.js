//get forum posts from database upon loading page
function fetchAllForumPosts()
{
	$.ajax(
	{
		url: '/Juggleology/fetch_all_forum_posts/',
		type: 'GET',
		dataType: 'json',
		success: outputAllPosts,
	})
}

//output the content if the get request is successful
function outputAllPosts(response)
{
	var outputText = "<table class='table' width='100%' cellpadding='5'>" +
	"<col width='33.3%'>" + "<tr><th>Post Title</th>" + "<th>Original Contributor</th>" + 
	"<th>Date/Time Posted</th></tr>";
	
	//looping through each forum post record to output a summary each one
	for(var i=0; i<response.all_forum_posts.length; i++)
	{
		
		//cutting off excess numbers in the time posted and combining it with the date
		var datePostSubmitted = convertDateUKFormat(response.all_forum_posts[i].datePostSubmitted);
		var dateTimePosted = datePostSubmitted + ", " +
		response.all_forum_posts[i].timePostSubmitted.slice(0,8);
		
		//generating title of post with a link to view the whole thing
		var postTitleLink = '<a href="javascript: passPostID('+response.all_forum_posts[i].id+')">' +
		response.all_forum_posts[i].forumPostTitle + "</a>";
		
		outputText += "<tr><td>" + postTitleLink + "</td>" +
		"<td>" + response.all_forum_posts[i].forumContributorName + "</td>" +
		"<td>" + dateTimePosted + "</tr>";
	}
	outputText += "</table>";
	
	//outputting all data collected, event detail titles are blue
	$("#outputAllForumPosts").html(outputText);	
	$("#outputAllForumPosts th").css("font-size", "110%");
}

//passing the post id to the page for outputting an individual forum post
function passPostID(postID)
{
	location.href = '/Juggleology/forum-post?' + postID;
}

fetchAllForumPosts();
