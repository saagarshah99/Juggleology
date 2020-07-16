//fetching events from database upon loading page
function fetchEvents()
{
	$.ajax(
	{
		url: '/Juggleology/fetch_events/',
		type: 'GET',
		dataType: 'json',
		success: outputEventsResponse,
	})
}

//looping through and output each event
function outputEventsResponse(response)
{	
	var outputText = "";	
	for(var i=0; i<response.events.length; i++)
	{
		var startDate = convertDateUKFormat(response.events[i].startDate);
		var endDate = convertDateUKFormat(response.events[i].endDate);
		
		//output free if cost is £0
		var costOfTicket = response.events[i].ticketCost;
		if(costOfTicket == 0) {costOfTicket = "Free";}
		else {costOfTicket = "£"+response.events[i].ticketCost;}
				
		//generate location text and form to pass it into google maps (query string) for directions	
		var outputLocation = '<form action="https://www.google.co.uk/maps/place/webhp"' +
		'target="output_frame" method="GET">' +
		"<b class='eventAttributes'>Location: </b>" + response.events[i].eventLocation + "&nbsp;&nbsp;" +
		"<input type='hidden' name ='q' value='"+response.events[i].eventLocation+"' />" +
		"<input type='submit' class='btn-warning' value='Get Directions?' /></form>";
			
		//generating button for deleting this event - only visible to event creator
		var deleteButton = "";
		if(response.events[i].backupUserID == response.currentuser)
		{
			deleteButton = "<input type='button' class='btn-danger' value='Delete' "+
			"onclick='deleteEvents("+response.events[i].id+")' />";
		}
		
		//gathering event detail text to output
		outputText += "<hr /><p><h5>"+response.events[i].eventName+
		" - Host: "+response.events[i].eventHost+"</h5><b><div id='deleting"+response.events[i].id+"'></div></b>"+
		"<i style='font-size: -80%; color: #807b7a;'>"+
		response.events[i].eventDescription+"</i></p>"+
		
		"<b class='eventAttributes'>Starts: </b>"+startDate+", "+response.events[i].startTime+"&nbsp;&nbsp;"+
		"<b class='eventAttributes'>Ends: </b>"+endDate+", "+response.events[i].endTime+"<br />"+
		outputLocation+
		"<b class='eventAttributes'>Cost: </b>"+costOfTicket+"<br />"+
		"<b class='eventAttributes'>Spaces Available: </b>"+response.events[i].numberOfTicketsAvailable+"<br />"+
		"<b class='eventAttributes'>Genre: </b>"+response.events[i].eventGenre+"<p />"+
		deleteButton;
	}	
	
	//outputting all data collected, event detail titles are blue
	$("#eventOutput").html(outputText);
	$(".eventAttributes").css("color", "#19b6ff");
}

fetchEvents();
