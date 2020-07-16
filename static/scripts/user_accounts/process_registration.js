//activate validation function by pressing enter from within the registration fields
var registrationFormFields = ["txtFirstName", "txtLastName", "txtUsernameReg", "txtPasswordReg"];
for(var i=0; i<registrationFormFields.length; i++)
{
	document.getElementById(registrationFormFields[i]).addEventListener("keyup", function(event) 
	{
			if (event.keyCode === 13) {event.preventDefault(); validateRegistration();}
	});	
}

//performing ajax request for registration
function createUserAccount()
{
	$("#processing").html("Processing..."); //temporary message in case server is running slow
	
	$.ajax({
		url : "/Juggleology/create_account/",
		type: 'POST',
		dataType: 'json',
		data: $('#registrationForm').serializeArray(),
		success: onSuccessfulRegistration,
		error: logError,
	});
}

//output response message depending on the success of the registration request
function onSuccessfulRegistration(response)
{
	if(response.status == "Username Exists")
	{
		alert("Error: Username has already been taken!"); 
		$("#processing").html("");
		return false;
	}
	else if(response.status == "Password Exists")
	{
		alert("Error: Password has already been taken!");
		$("#processing").html("");
		return false;
	}
	else if(response.status == "Account created successfully!")
	{
		alert(response.status);
		location.href = "/Juggleology/login"; //redirect to login page if registration successful
	}
}

//check if registration fields have been filled in
function validateRegistration()
{
	if(isEmpty(storeField("#txtFirstName")))
	{
		alert("Please enter a first name!");
		return false;
	}
	if(isEmpty(storeField("#txtLastName")))
	{
		alert("Please enter a last name!");
		return false;
	}
	if(isEmpty(storeField("#txtUsernameReg")))
	{
		alert("Please enter a username!");
		return false;
	}
	if(isEmpty(storeField("#txtPasswordReg")))
	{
		alert("Please enter a password!");
		return false;
	}
	
	createUserAccount(); //attempt to register once all validation rules above have passed
}

//remove forbidden strings, capitalise first letter only and joining spaces using hyphens for name inputs
//useful for those with middle names
function formatName(fieldID)
{
	removeForbidden(fieldID);
	
	var givenValue = $(fieldID).val();
	givenValue = capitaliseFirstLetter(givenValue.toLowerCase());	
	
	$(fieldID).val(spacesToHyphen(givenValue));
}

//remove forbidden strings, output error and clear field if password contains spaces
function passwordContainsSpaces(fieldID)
{
	removeForbidden(fieldID);
	if($(fieldID).val().includes(" "))
	{
		alert("Error: Passwords cannot contain spaces!");
		$(fieldID).val("");		
	}
}

