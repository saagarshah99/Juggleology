//lists of examples for different numbers of objects
var siteswapPatterns3 = ["3", "423", "5223", "441", "52512", "531"];
var siteswapPatterns4 = ["4", "453", "53", "552"];
var siteswapPatterns5 = ["5", "645", "753", "97531"];
var siteswapPatterns7 = ["7", "9955"];
var siteswapPatternsOther = ["A", "B"];

//randomly generating a pattern based on the link clicked from the arrays above
function generateRandomPattern(patternList)
{
	var randomTrickIndex = Math.floor((Math.random() * patternList.length) + 1);
	
	if(randomTrickIndex < 0) {randomTrickIndex *= -1;}
	
	document.getElementById("myPattern").value = patternList[randomTrickIndex-1];
	savePatternCookies();	 
}

//merge all tricks into an array and randomly select an example
function generateValidExample()
{
	var allExamples = siteswapPatterns3.concat(siteswapPatterns4, siteswapPatterns5, siteswapPatterns7);
	generateRandomPattern(allExamples);
}

//update value of range slider as you change the position
function updateRangeValue(idName, newAmount)
{
	$("#" + idName).html(newAmount);
}
