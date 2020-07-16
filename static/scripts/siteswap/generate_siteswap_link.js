//extract query string from url
var siteswapQueryString = decodeURIComponent(window.location.search);
siteswapQueryString = siteswapQueryString.substring(1);
var queries = siteswapQueryString.split("&");

//loop through query string and extract the siteswap number
var siteswapPattern = ""
for(var i=0; i<queries.length; i++)
{
	siteswapPattern += queries[i];
}	

//take the value after the "?" and load it into the simulator (siteswap number)
if (window.location.href.indexOf("?") != -1)
{
	$("#myPattern").val(siteswapPattern);
	savePatternCookies();
	window.location.href = "/Juggleology/siteswap"; //remove query string to prevent continuous reloading
}
