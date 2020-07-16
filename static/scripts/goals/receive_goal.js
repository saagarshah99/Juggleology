//taking data for the selected trick as a query string from the url and parsing it (split into array)
var goalQueryString = decodeURIComponent(window.location.search)
goalQueryString = goalQueryString.substring(1)
var queries = goalQueryString.split("&")

//loop through query string and fill goal textbox with the data
var goalText = ""
for(var i=0; i<queries.length; i++)
{
	goalText += queries[i]
}	
$("#addGoalField").val(goalText)

/*
	- output a prompt telling the user to set a date and submit the goal
	- won't run if the user loaded the page normally, only if the query string was transferred to the textbox
*/
var addGoalField = storeField("#addGoalField")	
if(addGoalField != "" && addGoalField != null)
{		
	$("#goalPrompt").html(
		"Your goal has been added to the form (for that specific trick you selected), "+
		"please set an achieve by date and submit to save it..."		
	).css("color", "#f00").css("font-weight", "bold")
}
