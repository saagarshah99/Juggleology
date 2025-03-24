//activate validation function by pressing enter from within the login fields
var loginFormFields = ["txtUsernameLog", "txtPasswordLog"];
for(var i=0; i<loginFormFields.length; i++)
{
	document.getElementById(loginFormFields[i]).addEventListener("keyup", function(event) 
	{
			if (event.keyCode === 13) {event.preventDefault(); validateLogin();}
	});	
}

//performing ajax request for logging in
function attemptLogin()
{
	$("#processing").html("Processing..."); //temporary message in case server is running slow
	
	$.ajax({
		url : "/Juggleology/attempt_login/",
		type: 'POST',
		dateType: 'json',
		data: $('#loginForm').serializeArray(),
		success: onSuccessfulLogin,
		error: logError,
	})	
}

//output response message depending on the success of the login request
function onSuccessfulLogin(response)
{
	if(response.status == "Incorrect username!")
	{
		alert(response.status);
		$("#processing").html("");
		return false;
	}
	else if(response.status == "Incorrect password!")
	{
		alert(response.status);
		$("#processing").html("");
		return false;
	}	
	else if(response.status == "Logged in successfully!")
	{
		alert(response.status);
		extractOriginalPage(); //extracting query string to redirect back to original page
	}
}

//extracting the original (restricted) page from the query string to redirect back to it
function extractOriginalPage()
{
	var pageQueryString = decodeURIComponent(window.location.search);
	pageQueryString = pageQueryString.substring(1);
	var queries = pageQueryString.split("?");
	
	var originalPage = "";	
	for(var i=0; i<queries.length; i++)
	{
		originalPage += queries[i];
	}
	
	location.href = "/Juggleology/" + originalPage;
}

//check if login fields have been filled in
function validateLogin()
{
	if(isEmpty(storeField("#txtUsernameLog")))
	{
		alert("Please enter a username!");
		return false;
	}
	if(isEmpty(storeField("#txtPasswordLog")))
	{
		alert("Please enter a password!");
		return false;
	}
	
	attemptLogin(); //attempt to login if a username and password has been entered	
}
