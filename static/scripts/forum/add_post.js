//ajax post request for adding forum post to database
function addForumPost()
{		
	event.preventDefault();
	
	//required in order to add file
	let addPostForm = document.getElementById('postToForum')
	let formData = new FormData(addPostForm)
	
	$("#posting").html("Uploading..."); //temporary message in case server is running slow
	
	$.ajax(
	{
		url: '/Juggleology/add_forum_post/',
		method: "POST",
		dataType: "json",
		data: formData,		
		processData: false,
		contentType: false,
		success: handleForumPostSubmission,
	})
}

//output success message and load the full post you just submitted
function handleForumPostSubmission(response)
{
	alert("Forum post successfully added!");
	window.location.href = "/Juggleology/forum-post?" + response.postID;
}
