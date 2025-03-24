/*GENERIC VALIDATION FUNCTIONS*/

//return value of a field in the form
function storeField(elementID)
{
	return $(elementID).val();
}

//return true if a field has not been filled in
function isEmpty(fieldName)
{
	if (fieldName==null || fieldName=="")
	{
		return true;
	}
}

//return true if the email address entered is in the incorrect format
function checkEmail(mail)
{
	//using a regular expression to check
	var positionOfAt=mail.indexOf("@");
	var positionOfPeriod=mail.lastIndexOf(".");
	
	if(positionOfAt < 1 || positionOfPeriod < positionOfAt + 2 || positionOfPeriod + 2 >= mail.length)
	{
		return true;
	}
}

//return the date string in the UK format
function convertDateUKFormat(dateInput)
{
	var date = dateInput.slice(8,10);
	var month = dateInput.slice(5,7);
	var year = dateInput.slice(0,4);
	
	return date + "/" + month + "/" + year;
}

//taking input from the user and removing any occurences of forbidden strings before submitting
function removeForbidden(textInputID)
{
	var inputValue = $(textInputID).val();
	var forbiddenStrings = ["<script>", "</script>"];
	
	for(var i=0; i<forbiddenStrings.length; i++)
	{
		inputValue = inputValue.replace(forbiddenStrings[i], "");	
	}
	
	$(textInputID).val(inputValue);
}

//capitalise first letter of each word in the string
function capitaliseFirstLetter(input) 
{
    input = input.split(" ");

    for(var i=0; i<input.length; i++) 
    {
        input[i] = input[i][0].toUpperCase() + input[i].substr(1);
    }

    return input.join(" ");
}

//replace spaces with hyphens
function spacesToHyphen(input)
{
	return input.split(" ").join("-")
}

//remove forbidden characters spaces from given string
function removeSpaces(inputID)
{
	removeForbidden(inputID);
	
	var givenInput = $(inputID).val();
	var inputWithoutSpaces = givenInput.replace(" ", "");
	$(inputID).val(inputWithoutSpaces);
}

//using regular expression, remove any input that is not a letter in real-time
function lettersOnly(inputField)
{
	var letterRegex = /[^a-z  -]/gi;
	inputField.value = inputField.value.replace(letterRegex, "");
}

//prevent non-numeric input from even occuring
function numbersOnly(myEvent)
{	
	if(!(/[0-9 .]/.test(String.fromCharCode(myEvent.which))))
	{
		myEvent.preventDefault();
	}
}
