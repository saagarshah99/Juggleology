//run add trick function if enter is pressed from within one of the directory form fields
var directoryFormFields = ["trickName", "numberObjects", 
"propCategory", "difficultyLevel"];
for(var i=0; i<directoryFormFields.length; i++)
{
	document.getElementById(directoryFormFields[i]).addEventListener("keyup", function(event) 
	{
			if (event.keyCode === 13) {event.preventDefault(); validateAddTricksForm();}
	});
}

//basic frontend validation for adding trick form
function validateAddTricksForm()
{	
	if(isEmpty(storeField("#trickName"))) {alert("Error: Please enter a trick!"); return false;}
	if(isEmpty(storeField("#trickDescription"))) {$("#trickDescription").val("N/A")}
	if(isEmpty(storeField("#numberObjects"))){alert("Error: Please enter the number of objects!"); return false}

	addTricks();
}
