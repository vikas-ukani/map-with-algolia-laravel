$(document).ready( function () {

    var user_type = $('#user_type').val();
    
    if(user_type == 'both' || user_type == 'landlord')
    {
        var verification_status = $('#verification_status').val();
        var already_register = $('#already_register').val();
        var user_id = $('#user_id').val();

        
        if(verification_status == 1 && already_register == 0)
        {
            setTimeout(function(){
              sendProcessEmailToSpaceOwner(user_id);
            }, 1000);
        } 
    }  
});

function sendProcessEmailToSpaceOwner(user_id)
{
    $.ajax({
          url: api_url + "sendProcessEmailToSpaceOwner",
          method: 'post',
          data: { user_id: user_id}, 
          beforeSend: function() { 
            },
          success: function (data) {                 
          },
          error: function (data) { 
          }
    });
}