//using an ajax put method to edit a value for a particular record in the juggling trick directory
function editTricks(trickID, fieldToEdit)
{	
	var passedValues;
	
	//detect field user's trying to edit, validate it and assemble data to pass into ajax request
	if(fieldToEdit == "trickname")
	{
		if(isEmpty(storeField("#editTrickNameID"+trickID))) {alert("Please enter a trick name!"); return false;}
		passedValues = {itemid: trickID, trickNameField: $("#editTrickNameID"+trickID).val()};
	}	
	if(fieldToEdit == "trickdescription")
	{
		if(isEmpty(storeField("#editTrickDescriptionID"+trickID))) {alert("Please enter a trick description!"); return false;}
		passedValues = {itemid: trickID, trickDescriptionField: $("#editTrickDescriptionID"+trickID).val()};
	}	
	if(fieldToEdit == "objectcount")
	{
		if(isEmpty(storeField("#editNumberObjectsID"+trickID))) 
		{
			alert("Please enter the number of objects!"); 
			return false;
		}
		passedValues = {itemid: trickID, objectCountField: $("#editNumberObjectsID"+trickID).val()};
	}	
	if(fieldToEdit == "propcategory")
	{
		passedValues = {itemid: trickID, propCategoryField: $("#editPropCategoryID"+trickID).val()};
	}	
	if(fieldToEdit == "difficultylevel")
	{
		passedValues = {itemid: trickID, difficultyLevelField: $("#editDifficultyLevelID"+trickID).val()};
	}	
	
	$("#progressBar"+trickID).html("<b>Editing...</b><br />"); //temporary message in case server is running slow

	$.ajax({
		url : '/Juggleology/edit_trick/',
		type: 'PUT',
		data: passedValues,
		dataType: 'json',
		success: successfulTrickEdit,
		error: logError,
	})
}

//fetch updated trick data from database
function successfulTrickEdit(request)
{
	fetchTricks();
	$("#progressBar"+trickID).html("");
}
