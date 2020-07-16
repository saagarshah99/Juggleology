/*activate validation functions in forum fields by pressing enter, differentiating 
between main form and response form*/
var forumFields = []; gatherCorrectFormFields();
for(var i=0; i<forumFields.length; i++)
{
	document.getElementById(forumFields[i]).addEventListener("keyup", function(event) 
	{
			if (event.keyCode === 13) 
			{
				event.preventDefault();
				runValidation();
			}
	});
}

//add form fields to array depending on the current page
function gatherCorrectFormFields()
{
	if(isCurrentPage("forum")) {forumFields.push("txtPostTitle", "fileMedia");}
	else if(isCurrentPage("forum-post")) {forumFields.push("txtResponseMedia");}
}

//run validation function depending on the current page
function runValidation()
{
	if(isCurrentPage("forum")) {validateForumPostSubmission();}
	else if(isCurrentPage("forum-post")) {validateResponseSubmission();}
}

//checking if fields in the forum post submission form meet requirements
function validateForumPostSubmission()
{
	if(isEmpty(storeField("#txtPostTitle")))
	{
		alert("Error: Please enter a post title!");
		return false;
	}
	if(isEmpty(storeField("#txtComment")))
	{
		alert("Error: Please enter a comment!");
		return false;
	}
	
	addForumPost(); //submit forum post if these tests pass
}

//checking if fields in the forum post response form meet requirements
function validateResponseSubmission()
{
	if(isEmpty(storeField("#txtResponseComment")))
	{
		alert("Error: Please enter a comment!");
		return false;
	}
	removeForbidden("#txtResponseComment");
	
	addForumResponse(); //add response if tests above pass
}


//return error if an unsupported file type has been uploaded
function checkFileExtension(uploadedFile)
{
  if(/\.(jpe?g|png|mp4)$/i.test(uploadedFile.files[0].name) === false)
  { 
		alert("Error: Please submit one of the supported file types!"); 
		$("#fileMedia").val(null); //clear field to prevent them from uploading the file anyway
		return false;
  }
}


//compute file size (MB) of file uploaded and return error if it exceeds the limit
function validateMediaFileSize(uploadedFile)
{
	var sizeOfFile = uploadedFile.files[0].size / 1024 / 1024;
	var uploadLimit = 500;
	if (sizeOfFile > uploadLimit) 
	{
		alert("Error: Please upload a file smaller than " + uploadLimit + "MB!");
		$("#fileMedia").val(null); //clear field to prevent them from uploading the file anyway
		return false;
	}
}

//pass in a page name from a list and return true if it's the current one
function isCurrentPage(page)
{
	return location.pathname == "/Juggleology/" + page;
}
