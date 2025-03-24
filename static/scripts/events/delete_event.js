//performing ajax call for delete request, passing in ID of event
function deleteEvents(eventID)
{
  var confirmDelete = confirm("Are you sure you want to delete this event?");
  if(confirmDelete)
  {
    $("#deleting"+eventID).html("Deleting...<br />"); //temporary message in case server is running slow
    
    $.ajax({
      url : '/Juggleology/remove_event/',
      type: 'DELETE',
      data: $.param({item_ID: eventID}),
      dataType: 'json',
      success: processEventDeletion,
    })
  }
}

//output success message and reload to view remaining events
function processEventDeletion(response)
{
  fetchEvents();
}
