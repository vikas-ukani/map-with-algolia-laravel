$(document).ready( function () {

  $('#emailerror').hide();
  $('#success-message').hide();  
  var form = $('#forgotForm');

    form.validate( {
      rules: {
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        email: {
          required: "Please enter email",
          email: "Please enter a valid Email address"
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


$('#forgot-pwd').click(function() {
    if(form.valid() == true) {
    var formData = form.serializeArray();
    $.ajax({
              url: api_url + "forgotpassword-create",
              method: 'post',
              data: formData,
              beforeSend: function() {
                $('.loader').show().css('opacity','0.4');
              },
              success: function (data) {
                  $(".loader").hide();
                  if(data.success == true){ 
                      $('#success-message').show();
                      $('#success-message-detail').html(data.message); 

                  }else{
                    $('#emailerror').show();
                    $('#emailerror').html(data.message);  
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
                    });
                  } 
              }
          }); 
    }
});

$( "#email" ).focus(function() {
  $('#emailerror').hide();
  $('#emailerror').html('');
});

});
