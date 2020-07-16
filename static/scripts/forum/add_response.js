//ajax post request for submitting response to forum post
function addForumResponse()
{		
	event.preventDefault();
	
	//required in order to add files
	let addPostForm = document.getElementById('respondToForumPost')
	let formData = new FormData(addPostForm)
	
	$("#posting").html("Uploading..."); //temporary message in case server is running slow
	
	$.ajax(
	{
		url: '/Juggleology/add__forum_response/',
		method: "POST",
		dataType: "json",
		data: formData,		
		processData: false,
		contentType: false,
		success: handleResponseSubmission,
	})
}

//reset response form, output success message and update entire post thread
function handleResponseSubmission(data, textStatus, jqXHR)
{
	fetchForumResponses();
	alert("Response successfully submitted!");	
	$("#respondToForumPost")[0].reset();
	$("#respondToForumPost").hide();
	$("#posting").html("");	
	window.scrollTo(0,document.body.scrollHeight);
}
