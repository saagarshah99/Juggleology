//ajax request for deleting forum post, passing in id of post
function deleteForumPost(postID)
{
  var confirmDelete = confirm("Are you sure you want to delete this forum post?");
  if(confirmDelete == true)
  {
    $("#deleting").html("Deleting...<br />"); //temporary message in case server is running slow
    
    $.ajax({
      url : '/Juggleology/remove_forum_post/',
      type: 'DELETE',
      data: $.param({item_ID: postID}),
      dataType: 'json',
      success: processForumPostDeletion,
    })      
  }
}

//redirecting to main forum page because this post no longer exists
function processForumPostDeletion(response)
{
  location.href = "/Juggleology/forum";
}
