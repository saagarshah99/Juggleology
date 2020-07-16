//performing ajax call for post request for adding trick
function addTricks()
{	
	event.preventDefault();	
	$("#adding").html("Submitting..."); //temporary message in case server is running slow

	$.ajax(
	{
		url: '/Juggleology/add_trick/',
		type: "POST",
		dataType: "json",
		data: $(".frmAddTrick").serialize(),
		success: handleTrickPostSuccess,
		error: logError,
	})
}

//keeping a log of information for HTTP post success
function handleTrickPostSuccess(data, textStatus, jqXHR)
{
	alert("Trick successfully added!");
	location.href = '/Juggleology/view-tricks#bottomOfPage'; //redirect back to tricks once created
}
