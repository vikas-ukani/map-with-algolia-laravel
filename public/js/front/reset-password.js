$(document).ready( function () { 
  $('#email_error').hide();
  $('#password_confirmation_error').hide();
  $('#password_error').hide();
    $('#emailerror').hide();
    $('#success-message').hide();
    $('#error-message').hide();
    var form = $('#resetForm');
    form.validate( {
      rules: {
        password: {
          required: true,
          minlength: 8
        },
        password_confirmation: {
          required: true,
          minlength: 8,
          equalTo: "#password"
        }
      },
      messages: {
        password: {
          required: "Please enter new password",
          minlength: "Your password must be at least 8 characters long"
        },
        password_confirmation: {
          required: "Please enter confrim password",
          minlength: "Your password must be at least 8 characters long",
          equalTo: "Please enter the same password as above"
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


    $('#reset-password').click(function() {
 
      if (form.valid() == true) {
 
        var formData = $(form).serializeArray();
        $.ajax({
                  url: api_url + "forgotpassword-reset",
                  method: 'post',
                  data: formData,
                  beforeSend: function() {
                    $('.loader').show().css('opacity','0.4');
                  },
                  success: function (data) {
                      $(".loader").hide(); 
                      if(data.success == true){ 
                          $('#success-message').show();
                          $('#success-message-detail').text(data.message);  
                          form[0].reset();
    
                      }else{

                        if(data.statusCode == '404')
                        {
                            $('#email_error').show();
                            $('#email_error').html(data.message); 
                        }
                        if(data.statusCode == '401')
                        {
                            $('#error-message').show();
                            $('#error-message-detail').text(data.message);
                        }
                        form[0].reset(); 
                      }
                  },
                  error: function (data) {

                    $(".loader").hide(); 
                  
                    if(data.responseJSON.success == false) {   
                      var messageList = data.responseJSON.message; 
                      $.each(messageList, function(index, item) {  
                          if(index == 'email')
                          {
                            $('#email_error').show();
                            $('#email_error').html(item);
                          }
                          if(index == 'password')
                          {
                            $('#password_error').show();
                            $('#password_error').html(item);
                          }
                          if(index == 'password_confirmation')
                          {
                            $('#password_confirmation_error').show();
                            $('#password_confirmation_error').html(item);
                          }                         
                      });
                    }    
                  }
              }); 
      } 
  }); 

  });

  $( "#password" ).focus(function() {
    $('#password_error').hide();
    $('#password_error').html('');
  });

  $( "#password_confirmation" ).focus(function() {
    $('#password_confirmation_error').hide();
    $('#password_confirmation_error').html('');
  });

  $( "#email" ).focus(function() {
    $('#email_error').hide();
    $('#email_error').html('');
  });