//upon loading the goal form, set to current date by default
document.getElementById("achieveByField").valueAsDate = new Date();

//run validation function if enter is pressed within one of the fields in the add goal form
var goalFields = ["addGoalField", "achieveByField"];
for(var i=0; i<goalFields.length; i++)
{
	document.getElementById(goalFields[i]).addEventListener("keyup", function(event)
	{
			if (event.keyCode === 13) {
				event.preventDefault();			
				validateGoals();			
			}
	});
}

//run validation tests and add goal if the data entered in the fields passes all of them
function validateGoals()
{		
	removeForbidden("#addGoalField");
	
	//return error if no goal details have been added
	if(isEmpty(storeField("#addGoalField")))
	{
		alert("Error: Please enter a brief description of the goal!"); 
		return false;
	}
	
	//extracting date only, otherwise it would compare time as well and it mightn't allow use of the current date
	var currentDate = new Date().toDateString()
	var dateEntered = new Date(storeField("#achieveByField")).toDateString()
	
	//return error if date entered has already passed
	if(currentDate > dateEntered) 
	{
		alert("Error: Please enter a date that has not passed yet!"); 
		return false;
	}
	
	addGoals();
}
