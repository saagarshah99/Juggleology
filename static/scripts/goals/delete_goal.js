//ajax delete request using the goal ID that is passed into this function
function deleteGoals(goalID)
{
  var confirmDelete = confirm("Are you sure you want to delete this goal?");
  if(confirmDelete == true)
  {
    $("#progressBar"+goalID).html("Deleting..."); //temporary message in case server is running slow
    
    $.ajax({
      url : '/Juggleology/remove_goal/',
      type: 'DELETE',
      data: $.param({item_ID: goalID}),
      dataType: 'json',
      success: processGoalDeletion,
      error: logError,
    })
  }
}

//updating list of goals once this one has been deleted
function processGoalDeletion(response)
{
  fetchGoals();
}
