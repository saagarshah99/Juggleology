//run validation function if enter is pressed from within one of the event form fields
var eventFields = ["txtEventName", "txtNumberOfTickets", "txtTicketCost", 
"txtEventDate", "cmbGenres", "txtEventStartTime", 
"txtEventEndDate", "txtEventEndTime", "txtLocationSearch"];
for(var i=0; i<eventFields.length; i++)
{
	document.getElementById(eventFields[i]).addEventListener("keyup", function(event) 
	{
			if (event.keyCode === 13) {event.preventDefault(); validateCreateEvents();}
	});
}

//basic frontend validation for event creation form
function validateCreateEvents()
{	
	//if description or cost fields are empty, fill in default values
	if(isEmpty(storeField("#txtEventDescription"))) {$("#txtEventDescription").val("N/A");}
	if($("#txtTicketCost").val() == "" || $("#txtTicketCost").val() == null)
	{
		$("#txtTicketCost").val(0);
	}
	
	if(isEmpty(storeField("#txtEventName"))) 
	{
		alert("Error: Please enter an event name!"); 
		return false;
	}	
	if(isEmpty(storeField("#txtLocationSearch"))) 
	{
		alert("Error: Please enter a location!"); 
		return false;
	}
	
	//running validation on start date and time
	var currentDate = new Date().toDateString();	
	var startDate = new Date(storeField("#txtEventDate")).toDateString();
	var endDate = new Date(storeField("#txtEventEndDate")).toDateString();	
	dateValidation(currentDate, startDate, endDate);
	timeValidation(currentDate, startDate, endDate);
}

//return error if date entered has already passed or if start date > end
function dateValidation(currentDate, startDate, endDate)
{
	if(currentDate > startDate) 
	{
		alert("Error: Please enter a start date that has not passed yet!"); 
		return false;
	}
	
	if(currentDate > endDate) 
	{
		alert("Error: Please enter an end date that has not passed yet!");
		return false;
	}
	
	if(startDate > endDate)
	{
		alert("Error: The start date is greater than the end date!");
		return false;
		
	}
}

//validating time entered by user
function timeValidation(currentDate, startDate, endDate)
{
	var startTime = storeField("#txtEventStartTime");
	var endTime = storeField("#txtEventEndTime");
	
	//if the event starts and ends on the same day, end time should be later than start time
	if(startDate == endDate)
	{
		if(startTime > endTime)
		{
			alert("Error: Start time is later than the end time!");
			return false;
		}
	}
	
	addEvents(); //only run if all of this validation passes
}
