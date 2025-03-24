//performing ajax call for post request for adding an event to the database
function addEvents()
{		
	event.preventDefault();
	$("#submitting").html("Submitting..."); //temporary message in case server is running slow
	
	$.ajax(
	{
		url: '/Juggleology/add_event/',
		type: "POST",
		dataType: "json",
		data: $("#createEvent").serialize(),
		success: handleEventCreationSuccess,
	})
}

//output success message and redirect to main events page once created
function handleEventCreationSuccess(data, textStatus, jqXHR)
{
	alert("Event successfully added!");
	location.href = '/Juggleology/view-events#bottomOfPage';
}
