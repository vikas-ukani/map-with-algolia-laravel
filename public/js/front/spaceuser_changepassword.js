// Forgot password javascript
$(document).ready( function () {

    $('#oldpassword_error').hide();
    $('#password_error').hide();
    $('#confirmpassword_error').hide();
    $('#success-message').hide();

    $.validator.addMethod("validateNewPassword", function(value, element) {
      return this.optional(element) || value != 'default' ;
     }, " New Password does not ");
    
     $.validator.addMethod("notEqualTo", function(value, element, param) {
      return this.optional(element) || value != $(param).val();
      }, "This has to be different...");


    var passwordChanageForm = $('#passwordChanageForm');
    passwordChanageForm.validate( {
      rules: {
        oldpassword: {
          required: true,
        },
        newpassword: {
          required: true,
          notEqualTo:'#oldpassword',
          minlength: 8,
        },
        confirmpassword: {
          required: true,
          minlength: 8,
          equalTo: "#newpassword"
        }
      },
      messages: {
        oldpassword: {
          required: "Please enter old password",
        },
        newpassword: {
          required: "Please enter password",
          notEqualTo: "New Password and Old Password can't be same.",
          minlength: "Your password must be at least 8 characters long"
        },
        confirmpassword: {
          required: "Please enter confrim password",
          minlength: "Your password must be at least 8 characters long",
          equalTo: "Please enter the same password as new password"
        }
      },
      errorElement: "em",
      errorPlacement: function ( error, element ) {

        error.addClass( "invalid-feedback" );
        if ( element.prop( "type" ) === "checkbox" ) {
          error.insertAfter( element.next( "label" ) );
        } else {
          error.insertAfter( element );
        }
      },
      highlight: function ( element, errorClass, validClass ) {
        $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
      },
      unhighlight: function (element, errorClass, validClass) {
        $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
      }
    });
  
  $('#ownerChangePassword').click(function() { 
   if (passwordChanageForm.valid() == true) {
      var formData = $(passwordChanageForm).serializeArray();  
      $.ajax({
                url: api_url + "change-password",
                method: 'post',
                data: formData,
                headers: {
                  'Authorization': 'Bearer '+ token,
                  "Accept": "application/json",
                },    
                beforeSend: function() {
                  $('.loader').show().css('opacity','0.4');
                },
                success: function (data) {
                    $(".loader").hide();
                   
                    if(data.success == true){ 
                      $('#success-message').show();
                      $('#success-message-show').text(data.message);  
                      passwordChanageForm[0].reset();
                    }
                    if(data.success == false){  

                      if(data.status_code == 404)
                      {
                          $('#oldpassword_error').show();
                          $('#oldpassword_error').html(data.message); 
                      }
                      if(data.status_code == 401)
                      {
                          $('#password_error').show();
                          $('#password_error').html(data.message); 
                      }
                      
                    } 
                },
                error: function (data) {
                  $(".loader").hide(); 
                  
                  if(data.responseJSON.success == false) {  
                    var messageList = data.responseJSON.message; 
                    $.each(messageList, function(index, item) {  
                        if(index == 'oldpassword')
                        {
                          $('#oldpassword_error').show();
                          $('#oldpassword_error').html(item);
                        }
                        if(index == 'newpassword')
                        {
                          $('#password_error').show();
                          $('#password_error').html(item);
                        }
                        if(index == 'confirmpassword')
                        {
                          $('#confirmpassword_error').show();
                          $('#confirmpassword_error').html(item);
                        } 
                    });
                  }   
                   
              }
            }); 
      }
  });
});

$( '#oldpassword' ).blur(function() {
  $('#oldpassword_error').hide();
  $('#oldpassword_error').html('');
});

$( '#newpassword' ).blur(function() {
  $('#password_error').hide();
  $('#password_error').html('');
});

$( '#confirmpassword' ).blur(function() {
  $('#confirmpassword_error').hide();
  $('#confirmpassword_error').html('');
});