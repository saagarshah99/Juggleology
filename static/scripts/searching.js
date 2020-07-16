/**************PROCESSING AJAX SEARCH REQUEST*****************/

//activate search function when enter is pressed inside search textbox
document.getElementById("searchBox").addEventListener("keyup", function(event)
{
		if (event.keyCode === 13) {event.preventDefault(); search();}
});


function search()
{
	removeForbidden("#searchBox");

	//return error if search box is empty
	if($("#searchBox").val() == "" || $("#searchBox") == null)
	{
		alert("Error: Search box is empty!");
		return false;
	}

	//ajax search request
	$.ajax({
		url: "/Juggleology/searchAll/",
		type: 'POST',
		data: $('#searchForm').serializeArray(),
		success: successfulAllSearch,
		error: logError,
		})
}

//variables for outputting search results and determining whether or not results were returned
var output = "";
var fillingResults = "";

//output results from searching all tables, generating only the ones that have been found
function successfulAllSearch(response)
{
	output = ""; fillingResults = ""; //reset at the beginning of each search
	
	if(response.filteredtricks != "") {generateTrickResults(response);}
	if(response.filteredgoals != "") {generateGoalResults(response);}
	if(response.filteredevents != "") {generateEventResults(response);}
	if(response.filteredforumposts != "") {generateForumResults(response);}
	
	outputResults();
}

//generate output for search results from tricks table
function generateTrickResults(response)
{
	output += generatePageTitleLink("Tricks");
	for(var i=0; i<response.filteredtricks.length; i++)
	{		
		//only return results for goals associated with the account currently logged in
		if(response.filteredtricks[i].backupUserID == response.currentuser)
		{
			output += "<h6>"+response.filteredtricks[i].trickName+"</h6><ul>" +
			"<li><b>Number of Objects</b>: "+response.filteredtricks[i].numberOfObjects+"</li>" +
			"<li><b>Prop Category</b>: "+response.filteredtricks[i].propCategory+"</li>" +
			"<li><b>Difficulty Level</b>: "+response.filteredtricks[i].difficultyLevel+"</li>" + 
			"</ul><p />";		
			fillingResults += response.filteredtricks[i].trickName; //remain empty if no results returned		
		}
		
	}
}

//generate output for search results from goals table
function generateGoalResults(response)
{
	output += generatePageTitleLink("Goals");
	for(var i=0; i<response.filteredgoals.length; i++)
	{
		//only return results for goals associated with the account currently logged in
		if(response.filteredgoals[i].backupUserID == response.currentuser)
		{
			var achieved;
			if(response.filteredgoals[i].isGoalChecked)
			{
				achieved = "<span class='achieved'>Achieved</span>"
			}
			else {achieved = "<span class='notachieved'>Not Achieved</span>"}
				
			var dateSliced = response.filteredgoals[i].dateToAchieveBy.slice(0, 10);
					
			output += "<h6>"+response.filteredgoals[i].goalDetails+"</h6><ul>" +
			"<li><b>Date to achieve by</b>: "+dateSliced+"</li>" +
			"<li><b>"+achieved+"</b></li>" +
			"</ul><p />";
			
			fillingResults += response.filteredgoals[i].goalDetails; //remain empty if no results returned
		}
	}
}

//generate output for search results from events table
function generateEventResults(response)
{
	output += generatePageTitleLink("Events");
	for(var i=0; i<response.filteredevents.length; i++)
	{
		var numTickets = response.filteredevents[i].numberOfTicketsAvailable;
		var startDate = response.filteredevents[i].startDate;
		var startTime = response.filteredevents[i].startTime;
		var endDate = response.filteredevents[i].endDate;
		var endTime = response.filteredevents[i].endTime;
		
		output += "<h6>"+response.filteredevents[i].eventName+"</h6><ul>" +		
		"<li><b>Host</b>: "+response.filteredevents[i].eventHost+"</li>" +
		"<li><b>Description</b>: "+response.filteredevents[i].eventDescription+"</li>" +	
		"<li><b>Genre</b>: "+response.filteredevents[i].eventGenre+"</li>" +
		"<li><b>Number of Tickets Available</b>: "+numTickets+"</li>" +
		"<li><b>Start</b>: "+startDate+" | "+startTime+"</li>" +
		"<li><b>End</b>: "+endDate+" | "+endTime+"</li>" +
		"<li><b>Location</b>: "+response.filteredevents[i].eventLocation+"</li>" +		
		"</ul><p />";
		
		fillingResults += response.filteredevents[i].eventName; //will remain empty if no results returned
	}
}

//generate output for search results from forum table
function generateForumResults(response)
{
	output += generatePageTitleLink("Forum");
	for(var i=0; i<response.filteredforumposts.length; i++)
	{
		var forumPostID = response.filteredforumposts[i].id;		
		var datePostSubmitted = response.filteredforumposts[i].datePostSubmitted;
		var timePostSubmitted = response.filteredforumposts[i].timePostSubmitted;
		
		//contains link pointing to the individual forum post
		output += "<h6>" +
		"<a style='color: #fff' href='/Juggleology/forum-post?"+forumPostID+"'>" + 
		response.filteredforumposts[i].forumPostTitle+"</a></h6><ul>" +
		
		"<li><b>Posted by:</b> "+response.filteredforumposts[i].forumContributorName+"</li>" +
		"<li><b>Posted on</b>: "+datePostSubmitted+" | "+timePostSubmitted+"</li>" +
		"</ul>" +		
		response.filteredforumposts[i].forumComment+"<p />";
		
		fillingResults += response.filteredforumposts[i].eventName; //remain empty if no results returned
	}
}

//a title with a link to divide search results depending on the table they came from
function generatePageTitleLink(tableName)
{
	var pageNames = ["view-tricks", "juggling-goals", "forum", "view-events"];
	var tableNames = ["Tricks", "Goals", "Forum", "Events"];
	for(var i=0; i<pageNames.length; i++)
	{
		if(tableName == tableNames[i])
		{
			return "<h5><a href='/Juggleology/"+pageNames[i]+"'>"+tableName+"</a>";
		}
	}
}

//preparing results for cookies before loading them
function outputResults()
{
	if(fillingResults == "") {output = "No results found...";}
	
	var searchQuery = $("#searchBox").val();
	saveSearchCookies(searchQuery);
}



/********************SAVING AND LOADING SEARCH COOKIES****************************/


//storing all search input and output in a cookie so that it can be maintained until another search is performed
var searchResultCookie = {};
function saveSearchCookies(searchQuery)
{
	
	//storing search information in array using key
	searchResultCookie["_searchQuery"] = searchQuery;
	searchResultCookie["_output"] = output;
	searchResultCookie["_searchBox"] = $("#searchBox").val();
	
	//building cookie with keys and expiry date
	document.cookie = "";
	var expiresAttrib = new Date(Date.now() + 60 * 1000).toString();
	var cookieString = "";
	for (var key in searchResultCookie)
	{
		/*
			- Separate each value with ";"
			- Using & to escape "=" because that symbol often need to be saved in the cookie
		*/
		cookieString = key + "=&" + searchResultCookie[key] + ";" + expiresAttrib + ";";
		document.cookie = cookieString;
	}
	
	//redirect to search results page where the results will be displayed
	location.href = "/Juggleology/search";
}

//runs when the search results page loads
function loadSearchCookies()
{
	//rebuild cookie by separating the information
	searchResultCookie = {};
	var keyValue = document.cookie.split(";");
	for (var id in keyValue)
	{
		//using & to escape "=" because that symbol often need to be saved in the cookie
		var cookie = keyValue[id].split("=&"); 
		searchResultCookie[cookie[0].trim()] = cookie[1];
	}
	
	//retrieve search information and display it
	var searchQuery = searchResultCookie["_searchQuery"];
	output = searchResultCookie["_output"];
	$("#searchBox").val(searchResultCookie["_searchBox"]);
	
	$("#searchResults").html('<h4>Search results for: "'+searchQuery+'"</h4>' + output);
}



/*********************SEARCH SUGGESTIONS****************/



//ajax request for fetching save queries from database
$.ajax({
	url: "/Juggleology/fetchSearchQueries/",
	type: 'GET',
	success: successfulQueryAccumulation,
})

//fetch existing queries from DB, storing in array with some default values and load into search box
var searchSuggestions = ["meetup","juggling", "progress", "balls", 
"mile end", "juggling progress", "cascade"];
function successfulQueryAccumulation(response)
{
	for(var i=0; i<response.queries.length; i++)
	{		
		var currentQuery = response.queries[i].search_query;		
		if(searchSuggestions.includes(currentQuery) == false)
		{
			searchSuggestions.push(currentQuery.toLowerCase());
		}
	}
	searchSuggestions.sort(); //alphabetical order
}
$("#searchBox").autocomplete({source: searchSuggestions}); 


/********************ACTIVE PAGE IN NAV BAR**********************/

//creating list of pages and corresponding objects in the search bar			
var pages = ["siteswap", "maths", "directory", "view_tricks", "juggling_goals", 
"forum", "forum-post", "createEvent", "viewEvents"]; 

//some sections cover multiple pages
var navLinkIDs = [];
appendMultipleSame(navLinkIDs, "mathsNav", 2);
appendMultipleSame(navLinkIDs, "tricksNav", 2);
navLinkIDs.push("goalsNav");
appendMultipleSame(navLinkIDs, "forumNav", 2);
appendMultipleSame(navLinkIDs, "eventsNav", 2);

//highlight the nav bar link for the current page/section
for(var z=0; z<pages.length; z++)
{
	if(isCurrentPage(pages[z]))
	{
		highlightCurrentNav("#"+navLinkIDs[z]);
	}
}

//appending mulitple of the same element to an array
function appendMultipleSame(array, element, n)
{
	for(var x=0; x<n; x++)
	{
		array.push(element);
	}
}

//pass in a page name from a list and return true if it's the current one
function isCurrentPage(page)
{
	return location.pathname == "/Juggleology/" + page;
}

//highlight the text of the given id
function highlightCurrentNav(linkID)
{
	$(linkID).css("color", "#00ff00").css("font-weight", "bold");
}
