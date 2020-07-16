//check if the user is logged in or out upon loading any page
$.ajax(
{
	url: '/Juggleology/get_login_state/',
	type: 'GET',
	dataType: 'json',
	success: outputLoginState,
	error: logError,
})

//output appropriate buttons depending on if the user is logged in or out
function outputLoginState(response)
{
	if(response.status == "logged out")
	{		
		$(".ui-widget").hide();
				
		$("#logoutButton").hide();		
		$("#registerButton").show();		
		$("#loginButton").show();
	}	
	else if(response.status == "logged in")
	{
		$(".ui-widget").show(); //search bar only visible if logged in
		
		$("#logoutButton").show();		
		$("#registerButton").hide();		
		$("#loginButton").hide();
	}
	
	//output name of user in logo and make the user account buttons stand out in the nav menu
	$("#outputNameOfUser").html(response.nameOfUser);	
	var buttons = ["#logoutButton", "#registerButton", "#loginButton"];
	for(var i=0; i<buttons.length; i++)
	{
		$(buttons[i]+" a").css("color", "#a40000").css("font-weight", "bold");
	}
}

