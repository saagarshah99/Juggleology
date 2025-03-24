//ajax request for deleting response to forum post, passing in id of response
function deleteForumResponse(forumResponseID)
{
  var confirmDelete = confirm("Are you sure you want to delete this response?");
  if(confirmDelete == true)
  {
    $("#deleting"+forumResponseID).html("Deleting...<br />"); //temporary message in case server is running slow
    
    $.ajax({
      url : '/Juggleology/remove_forum_response/',
      type: 'DELETE',
      data: $.param({item_ID: forumResponseID}),
      dataType: 'json',
      success: processForumResponseDeletion,
    })      
  }
  
}

//update current forum post thread now that this response has been deleted
function processForumResponseDeletion(response)
{
  fetchForumResponses();
}
