$(document).ready( function () {

    $('#emailerror').hide();
    $('#password_error').hide();
    $("#error-message").hide();


    var inputEmail = document.getElementById("email");
    // Execute a function when the user releases a key on the keyboard
    inputEmail.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("login-form").click();
      }
    });


    var inputPassword = document.getElementById("password");
    // Execute a function when the user releases a key on the keyboard
    inputPassword.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("login-form").click();
      }
    });

    var form = $("#loginForm");

    form.validate( {
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 5
        }
      },
      messages: {
        email: "Please enter a valid Email address",
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
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
    $('#login-form').click(function() {
      var _token = $('#csrfToken').val();
      if (form.valid() == true) {
          var formData = $(form).serializeArray();
          $.ajax({
              url: api_url + "login",
              method: 'post',
              data: formData,
              beforeSend: function() {
                  $('.loader').show().css('opacity','0.4');
               },
              success: function (data) {
                  if(data.success == true){
                    var response  = data.data; 
                    var user_type = response['user_data']['user_type'];

                      if(response['is_request_set'] == 1 )
                      {
                          if(response['user_data']['user_type'] == 'landlord')
                          {
                              $(".loader").hide();
                              $('#error-message').show();
                              $('#error-message-show').text("As a Space owner you can't enquiry about property.");
                              $('#is_request_set').val(0);
                              $('#property_id').val('');
                              $('#start_date').val('');
                              $('#end_date').val('');
                              $('#redirect_to').val('');
                          }
                          if(response['user_data']['user_type'] == 'tenant' || response['user_data']['user_type'] == 'both')
                          {
                                setTimeout(function(){
                                  $.redirect(base_url + '/submit-enquiry',
                                      {
                                          _token: _token,
                                          data: data.data
                                      },
                                  "POST");
                                  }, 5000);
                          }
                      }
                      if(response['is_request_set'] == 0)
                        {
                            $(".loader").hide();
                                setTimeout(function(){
                                    $.redirect(base_url + '/get-session',
                                    {
                                        _token: _token,
                                        data: data.data
                                    },
                                    "POST");
                                  }, 1000);
                        }

                  }else{
                      $(".loader").hide();
                      $('#error-message').show();
                      $('#error-message-show').text(data.message);
                  }
              },
              error: function (data) {
                  $(".loader").hide();

                  if(data.responseJSON.success == false) {
                    var messageList = data.responseJSON.message;
                    $.each(messageList, function(index, item) {
                        if(index == 'email')
                        {
                          $('#emailerror').show();
                          $('#emailerror').html(item);
                        }
                        if(index == 'password')
                        {
                          $('#password_error').show();
                          $('#password_error').html(item);
                        }
                    });
                  }
              }
          });

      }
  });

  });


  $( '#email' ).blur(function() {
    $('#emailerror').hide();
    $('#emailerror').html('');
  });

  $( '#password' ).blur(function() {
    $('#password_error').hide();
    $('#password_error').html('');
  });
