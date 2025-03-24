//using ajax to fetch goals from database
function fetchGoals()
{
	$.ajax(
	{
		url: '/Juggleology/fetch_goal/',
		type: 'GET',
		dataType: 'json',
		success: outputSetGoalResponse,
		error: logError,
	})
}

//output goals and the state of them if get request is successful
function outputSetGoalResponse(response)
{  
	loopThroughGoals(response, "");
	retrieveGoalState(response);
}

//loop through list of goals and output each record
function loopThroughGoals(response, outputText)
{
	outputText += "<form name='frmOutputGoals'><table class='table table-responsive'>";
	for(var i=0; i<response.goals.length; i++)
	{
		//only showing goals for current user
		if(response.goals[i].backupUserID == response.currentuser)
		{
			var extractedDate = convertDateUKFormat(response.goals[i].dateToAchieveBy);
			
			outputText += "<tr>" +
			"<td><li><label>" +
			
			"<input type='checkbox' class='form-control' id='chkGoals"+response.goals[i].id+"'" +
			"onclick='editGoalState("+response.goals[i].id+")' />" +
			
			"<span class='icon'></span><span class='goalListItem' id='goalSummary"+response.goals[i].id+"'>" +
			response.goals[i].goalDetails + 
			" - <span class='achieveByDateStyle'>Achieve by: " + extractedDate + "</span>" +		
			"</span>" +
			"</label></li><div id='progressBar"+response.goals[i].id+"'></div>" +
			"</td>" + 
			"<td><input type='button' value='X' class='btn-danger' onclick='deleteGoals("+response.goals[i].id+")'/></td>" +		
			//class='btnDeleteGoal'
			"</tr>";		
		}		
	}
	outputText += "</table></form>";
	$("#goalList").html(outputText);
}

//if a goal has been checked off, run this function to update a value in the DB so that the state can be retrieved
function editGoalState(goalID)
{
	var updatedInput = "False";
	if(document.getElementById("chkGoals"+goalID).checked)
	{
		updatedInput = "True";
	}
	
	var passedValues = {itemid: goalID, input: updatedInput};
	
	$.ajax
	({
		url: '/Juggleology/edit_goal_state/',
		type: "PUT",
		data: passedValues,
		dataType: 'json',
		success: console.log("Successfully updated goal state!"),
	})
}

//state of saved goal retrieved upon reloading the page
function retrieveGoalState(response) 
{	
	for(var i=0; i<response.goals.length; i++)
	{
		if(response.goals[i].isGoalChecked)
		{	
			document.getElementById("chkGoals"+response.goals[i].id).checked = true;
		}
	}
}

fetchGoals();
