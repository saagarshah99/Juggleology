//ajax post request for adding a goal
function addGoals()
{	
	event.preventDefault();
	$("#submitting").html("Submitting..."); //temporary message in case server is running slow

	$.ajax(
	{
		url: '/Juggleology/add_goal/',
		type: "POST",
		dataType: "json",
		data: $("#addGoalForm").serialize(),
		success: handleGoalPostSuccess,
		error: logError,
	})
}

//reset goal form, output success message and update goal list with new one
function handleGoalPostSuccess(data, textStatus, jqXHR)
{
	$("#addGoalForm")[0].reset();
	$("#goalPrompt").html("");
	document.getElementById("achieveByField").valueAsDate = new Date();
	alert("Goal successfully added!");
	fetchGoals();
	$("#submitting").html("");
}
