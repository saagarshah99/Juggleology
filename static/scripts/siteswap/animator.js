"use strict";

/*	
	
	Useful links: 
	- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice
	- https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
	- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics
	- http://www.gunswap.co/about/
	- https://github.com/dtreiter/siteswap-js/
*/


/**********************GRABBING AND SENDING USER PATTERN INFORMATION***********************/

var glbSiteswapPattern;
var glbZoom;
var glbWidthOfToss;
var glbSizeOfBall;
var glbThrowFrameRate; //number of frames between each throw
var glbTossHeight = 10;
var glbBallGravity = 1;
var glbShowPatternTrace;
var glbChooseHand;

//press enter from within the siteswap number textbox instead of having to click on generate
document.getElementById("myPattern").addEventListener("keyup", function(event) 
{
		if (event.keyCode === 13) {event.preventDefault(); savePatternCookies();}
});

/*
	- Return number of objects by splitting each throw digit and computing the average.
	- Generate a valid example if an illegal combination is entered.
*/
function numberOfObjects()
{	
	var patternSplit = glbSiteswapPattern.split("");
	var average = calculateAverage(patternSplit, glbSiteswapPattern.length);	
	
	if(average % 1 == 0) {return average;}
	else
	{
		alert("Error: " + glbSiteswapPattern + " is not a valid siteswap pattern...\n\n" +
		"It must contain digits that collectively yield an average that is a whole number.\n\n" + 
		"Here is a valid example...");
		
		generateValidExample();
	}	
}

//store pattern information in cookies and reload the page
var myCookies = {};
function savePatternCookies()
{
	removeForbidden("#myPattern");
	myCookies["_pattern"] = document.getElementById("myPattern").value;
	myCookies["_simulatorZoom"] = document.getElementById("simulatorZoom").value;
	myCookies["_frameRate"] = document.getElementById("frameRate").value;
	myCookies["_showPatternTrace"] = document.frmSiteswapSimulator.radShowPatternTrace.value;
	myCookies["_chooseHand"] = document.frmSiteswapSimulator.radChooseHand.value;
	
	document.cookie = "";
	var expiresAttrib = new Date(Date.now() + 60 * 1000).toString();
	var cookieString = "";
	for (var key in myCookies)
	{
		//separate each value with ";"
		cookieString = key + "=" + myCookies[key] + ";" + expiresAttrib + ";";
		document.cookie = cookieString;
	}
	
	location.reload();
}

//rebuild cookie by separating information when page loads
function loadPatternCookies()
{
	myCookies = {};
	var keyValue = document.cookie.split(";");
	for (var id in keyValue)
	{
		var cookie = keyValue[id].split("=");
		myCookies[cookie[0].trim()] = cookie[1];
	}
	
	//load information back into the fields after processed and then start the new animation
	document.getElementById("myPattern").value = myCookies["_pattern"];
	document.getElementById("simulatorZoom").value = myCookies["_simulatorZoom"];
	document.getElementById("frameRate").value = myCookies["_frameRate"];
	document.frmSiteswapSimulator.radShowPatternTrace.value = myCookies["_showPatternTrace"];
	document.frmSiteswapSimulator.radChooseHand.value = myCookies["_chooseHand"];
		
	new animator();
}

//change pattern values based on user input
function changeValues()
{
	glbSiteswapPattern = $("#myPattern").val();
	
	//randomly generate valid example if siteswap field is empty or undefined
	if(isEmpty(glbSiteswapPattern) || glbSiteswapPattern === "undefined")
	{
		generateValidExample();
	}

	//update pattern width and ball size according to the new zoom value
	var newZoom = parseInt(document.getElementById("simulatorZoom").value);
	var difference = newZoom - 15;	
	glbWidthOfToss = 270 + difference;
	glbSizeOfBall = 15 + difference;
	
	glbThrowFrameRate = parseInt(document.getElementById("frameRate").value);
	glbShowPatternTrace = document.frmSiteswapSimulator.radShowPatternTrace.value;
	glbChooseHand = document.frmSiteswapSimulator.radChooseHand.value;
	
	document.getElementById("numObjects").innerHTML = "<h5>Number of Balls: " + 
	numberOfObjects() + "</h5>";	
}

//load default values if reset button clicked
function resetPattern()
{
	document.getElementById("myPattern").value = "3";
	
	glbZoom = 15;
	glbWidthOfToss = 270;	
	glbSizeOfBall = 15;
	document.getElementById("simulatorZoom").value = glbZoom;
	
	glbThrowFrameRate = 30;
	document.getElementById("frameRate").value = glbThrowFrameRate;
	
	document.frmSiteswapSimulator.radShowPatternTrace.value = "No";
	document.frmSiteswapSimulator.radChooseHand.value = "Left";
	
	//save to cookies and retrieve after refreshing
	savePatternCookies();
	location.reload();
}



/******************************PROCESSING USER PATTERN INFORMATION******************************/


//defining variables for initiating the canvas and the pattern itself
var graphic;
var tosses;
var tossLoopNumber; //used to call siteswap.toss every glbTossHeight (toss duration) number of frames
var siteswap;
var Hand = {"RIGHT" : 1, "LEFT"  : 0}; //right dominant


//grab pattern information, create canvas, grab pattern to be split into tosses...
function animator() 
{
	changeValues();
	graphic = new BuildCanvas();
	tosses = glbSiteswapPattern;
	this.setPattern(glbSiteswapPattern);
	tossLoopNumber = 1; //used to call siteswap.toss every glbTossHeight (toss duration) number of frames
	
	resumeSimulator(); //repeat execution of function continuously
}

//set pattern, separate each throw into array and restart the animation
animator.prototype.setPattern = function(pattern) 
{
	tosses = pattern.split("").map(function(toss) 
	{
		return parseInt(toss);
	});
	
	siteswap = new Siteswap(graphic, tosses);
}

//clearing the interval to pause the simulation when the button is clicked
var glbInterval;
function pauseSimulator()
{
	clearInterval(glbInterval); 
	glbInterval = 0;
	
	//only show resume button once executed
	$("#pauseSimulatorButton").hide();
	$("#resumeSimulatorButton").show();
}

//restarting interval to resume animation when button is clicked
function resumeSimulator()
{
	glbInterval = setInterval(mainLoop, 1000/glbThrowFrameRate);

	//only show pause button once executed
	$("#pauseSimulatorButton").show();
	$("#resumeSimulatorButton").hide();
}

//referencing html canvas and initiating its basic properties
function BuildCanvas() 
{
	this.canvas = document.getElementById("myAnimator");
	this.context = this.canvas.getContext("2d");
	this.w = this.canvas.width;
	this.h = this.canvas.height;
}
//unless yes selected, clear canvas at end of each loop to remove trace of previous throws/rounds
BuildCanvas.prototype.clear = function() 
{
	if(glbShowPatternTrace == "No")
	{
		this.context.clearRect(0, 0, this.w, this.h);
	}
}
//building a circle to represent the ball that lives on the canvas and has a certain path to follow
BuildCanvas.prototype.fillCircle = function(xCircleCenter, yCircleCenter, radius, colour) 
{
	yCircleCenter = this.h - yCircleCenter;
	var startingAngle = 0;
	var endingAngle = 2 * Math.PI;
	
	this.context.arc(xCircleCenter, yCircleCenter, radius, startingAngle, endingAngle);
	this.context.fillStyle = colour;	
	this.context.fill();
	this.context.beginPath();
}



//defining properties for the juggling ball itself
function JugglingBall(graphic, xCircleCenter, yCircleCenter, radius, hand, colour) 
{
	this.graphic = graphic;
	this.xCircleCenter = xCircleCenter;
	this.yCircleCenter = yCircleCenter;
	this.radius = radius;
	this.hand = hand;
	this.color = colour;
	
	/*gravity - d represents "differentiation" which allows us to find the rate of change of velocity with regards 
	to time (in this case we're dealing with gravity)*/
	this.decay = .5; //reduce gravity by consistent amount
	this.dx = 0;
	this.dy = 0;
	this.ddy = -glbBallGravity;
}

/*updating each juggling ball and showing the effect of gravity as each ball drops (allowing for 
the next throw from the same hand)*/
JugglingBall.prototype.update = function() 
{
	/*monitoring gravity of ball - newX and newY allow us to update the current position of the ball 
	in relation to the width and height of the canvas*/
	this.dy += this.ddy;	
	var newX = this.xCircleCenter + this.dx;
	var newY = this.yCircleCenter + this.dy;
	
	/*compensating for the width of the canvas in relation to the circle properties, 
	gravity and where a particular ball is currently positioned in the canvas*/
	if (newX - this.radius < 0 || newX + this.radius > this.graphic.w) 
	{
		this.dx = -this.decay * this.dx;
		newX = this.xCircleCenter + this.dx;
	}
	//doing the same for the height of the canvas
	if (newY - this.radius < 0 || newY + this.radius > this.graphic.h) 
	{
		this.dy = -this.decay * this.dy;
		newY = this.yCircleCenter + this.dy;
	}
	
	//if a pattern terminates early e.g. if non-symmetrical, prevent ball from bouncing forever
	if (newY < this.r+2 && Math.abs(this.dx) < 3) newX = this.xCircleCenter;
	if (newY < this.r+2 && Math.abs(this.dy) < 3) newY = this.radius;
	
	//updating position of ball in relation to width and height of canvas
	this.xCircleCenter = newX;
	this.yCircleCenter = newY;
}
//execute the next toss with the previously defined gravity properties
JugglingBall.prototype.toss = function(dx, dy) 
{
	this.dx = dx;
	this.dy = dy;
}
//draw/build the juggling ball once it has been updated
JugglingBall.prototype.draw = function() 
{
	this.graphic.fillCircle(this.xCircleCenter, this.yCircleCenter, this.radius, this.color);
}


function Siteswap(graphic, myThrows) 
{	
	//represents different throws in pattern and animation of each ball
	this.myThrows = myThrows;
	this.graphic = graphic;
	
	/*compute number of objects (average of sequence) and largest throw in sequence, then 
	initialise array that will store each ball in the pattern*/
	this.largestSiteswapValue = getLargestThrow(this.myThrows);
	this.numberOfObjects = calculateAverage(myThrows, glbSiteswapPattern.length);
	this.balls = new Array();
	
	//used to look at the current throw and move to the next throw in the list
	this.currentSiteswapNumber = 0;
	this.nextThrow = 0;
	
	//initialise the whole siteswap queue to 0s to reset the balls each time
	for (var i=0; i<this.largestSiteswapValue; i++) {this.balls.push(0);}
	
	
	//initialise each ball in the pattern
	var hand;
	var ballX;
	var ballY  = 20; 
	
	//binary value for chosen hand - asymmetrical patterns will be affected by this
	var handBin;
	if(glbChooseHand == "Left") {handBin = 0;}
	else {handBin = 1;}
	
	
	
	//choosing which hand executes a throw in a given moment by looping through the array containing each throw
	for(var i=0; i<this.numberOfObjects; i++) 
	{
		//generating a random colour for EACH throw (left or right)
		if(i % 2 == handBin)
		{
			ballX = (this.graphic.w - glbWidthOfToss) / 2;
			hand = Hand.LEFT;
			this.balls[i] = new JugglingBall(this.graphic, ballX, ballY, glbSizeOfBall, hand, randomColour());
		}
		else 
		{
			ballX = (this.graphic.w + glbWidthOfToss) / 2;
			hand = Hand.RIGHT;
			this.balls[i] = new JugglingBall(this.graphic, ballX, ballY, glbSizeOfBall, hand, randomColour());
		}		
	}
}
Siteswap.prototype.toss = function() 
{
	//when a ball gets thrown/tossed, we move to the next one
	var toss = this.myThrows[this.nextThrow];
	var ball = this.balls[this.currentSiteswapNumber];
	
	//if there is no throw (siteswap 0), return so we can move to the next one
	if (ball == 0) {return;}
	
	/*
		- calculate the velocities for the ball
		- we are checking if the toss number is odd or even (will it divide exactly by 2?)
			* Even stays on the same side
			* Odd goes to the opposite side
	*/
	var dx;
	if (toss % 2 == 0) {dx = 0;} 
	
	//if it is an odd number, then a ball in the right hand should be passed to the left and vice versa.
	else if (ball.hand == Hand.RIGHT) 
	{
		dx = -glbWidthOfToss / (toss * glbTossHeight);
		ball.hand = Hand.LEFT;
	}
	else if (ball.hand == Hand.LEFT) 
	{
		dx = glbWidthOfToss / (toss * glbTossHeight);
		ball.hand = Hand.RIGHT;
	}
	var dy = toss * 0.5 * glbBallGravity * glbTossHeight;
	
	ball.toss(dx, dy);
	
	/* Update the balls array. */
	var nextSiteswapValue = (this.currentSiteswapNumber + toss) % this.largestSiteswapValue;
	/* Only update if the ball swapped sites. */
	if (nextSiteswapValue != this.currentSiteswapNumber) 
	{
		this.balls[nextSiteswapValue] = ball;
		this.balls[this.currentSiteswapNumber] = 0;
	}
	
	this.nextThrow = (this.nextThrow + 1) % this.myThrows.length;
	this.currentSiteswapNumber  = (this.currentSiteswapNumber  + 1) % this.largestSiteswapValue;
}
//loop through the different balls in the pattern sequence and update them as you go along
Siteswap.prototype.update = function() 
{
	this.balls.forEach(function (ball) 
	{
		//unless there is a hole in the pattern (unless one of the siteswap numbers is 0)
		if(ball != 0) {ball.update();}
	});
}
//loop through the different balls in the pattern sequence and draw each of them
Siteswap.prototype.draw = function() 
{
	this.balls.forEach(function (ball) 
	{
		//unless there is a hole in the pattern (unless one of the siteswap numbers is 0)
		if (ball != 0) {ball.draw();}
	});
}



//executed each time the pattern is looped back to the beginning
function mainLoop() 
{
	//reset animation and execute first toss in siteswap pattern
	graphic.clear();	
	if (tossLoopNumber == 0) 
	{
		siteswap.toss();
	}
	
	//as the siteswap value changes, update it and draw the new one
	siteswap.update();
	siteswap.draw();	
	tossLoopNumber = (tossLoopNumber + 1) % glbTossHeight;
}

//calculate average of elements in an array
function calculateAverage(array, numberOfElements)
{
	var sum = 0;
	for(var i=0; i<array.length; i++) 
	{
		sum += parseInt(array[i]);
	}	
	return sum/numberOfElements;
}

//return throw with largest siteswap value from array of throws
function getLargestThrow(myThrows) 
{
	return Math.max.apply(null, myThrows);
}

//generate random colour for one of the balls and ensure it cannot be selected again
var colours = ["#f00", "#187fff", "#0f0", "#fcaf3e", "#6034df", "#f90cc1", "#fce94f"];
var currentSelection = [];
function randomColour()
{
	var randColour;	
	if(colours.length != 0) 
	{
		randColour = colours[randomNumber(0, colours.length-1)];
		colours = removeElement(colours, randColour);
		currentSelection.push(randColour);
	}
	else 
	{
		//generate random hash if we run out of colours from the list
		randColour = randomColourHash();
	}
	
	return randColour;
}

//generate random number between a certain range
function randomNumber(min, max)
{
	return Math.floor(Math.random() * max) + min;
}

//remove an element from an array
function removeElement(originalArray, elementToRemove)
{
	var newArray = [];
	for(var i=0; i<originalArray.length; i++)
	{
		if(originalArray[i] != elementToRemove)
		{
			newArray.push(originalArray[i]);
		}
	}
	
	return newArray;
}

//returns a random hex colour each time it is invoked
function randomColourHash()
{
	return "#"+Math.floor(Math.random()*16777215).toString(16);
}


/***********************LOADING/RETRIEVING PATTERN INFORMATION****************************/

loadPatternCookies(); //load cookies to retrieve pattern data


/*
	- If there's no cookie or any fields are null, reset pattern to load default values
	- Usually for first-time visitors in a browser
*/
if(noCookieFound() || nullFields() || anyRadioButtonsUnchecked())
{
	resetPattern();
}


//return true if no cookie found (they can contain partial information)
function noCookieFound()
{
	return document.cookie == "" || document.cookie == null;
}


//return true is at least one of the following fields is null
function nullFields()
{
	return isEmpty("#myPattern") || isEmpty("#frameRate");
}


//return true if at least one of the radio button groups is completely null
function anyRadioButtonsUnchecked()
{
	var traceChecked = radChecked("#traceYes") || radChecked("#traceNo");
	var handChecked = radChecked("#chooseLeft") || radChecked("#chooseRight");
	
	return traceChecked == false || handChecked == false;
}

//return true is the given radio button is checked
function radChecked(buttonID)
{
	return $(buttonID).is(':checked');
}
