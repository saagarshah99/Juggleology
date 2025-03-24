//performing ajax call for delete request
function deleteTricks(trickID)
{
  var confirmDelete = confirm("Are you sure you want to delete this trick?");
  if(confirmDelete == true)
  {
  	$("#progressBar"+trickID).html("<b>Deleting...</b><br />"); //temporary message in case server is running slow
  	
    $.ajax({
      url : '/Juggleology/remove_trick/',
      type: 'DELETE',
      data: $.param({item_ID: trickID}),
      dataType: 'json',
      success: processTrickDeletion,
      error: logError,
    })
  }
}

//removing the button for the record also and updating directory without refreshing page
function processTrickDeletion(response)
{
  fetchTricks();
}
