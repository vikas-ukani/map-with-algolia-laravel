$(document).ready( function () {
  $('#contact_first_name_error').hide();
  $('#contact_last_name_error').hide();
  $('#contact_email_error').hide();
  $('#contact_phone_error').hide();
  $('#contact_desciption_error').hide();  

    var form = $("#contact-us-form");
   form.validate( {
      rules: { 
        contact_first_name: {
          required: true,
          minlength: 2
        },
        contact_last_name: {
          required: true,
          minlength: 2
        },
        contact_email: {
          required: true,
          email: true
        },
        contact_phone : {
            required: true,
            minlength : 8
        }, 
        contact_desciption: {
          required: true,
        }, 
      },
      messages: { 
        contact_first_name: "Please enter First Name",
        contact_last_name: "Please enter Last Name",
        contact_email: {
          required: "Please enter Email",
          email: "Please enter valid Email",
        }, 
        contact_phone: {
          required: "Please enter Phone",
          minlength: "Please provide valid Phone"
        }, 
        contact_desciption: "Please enter Description", 
      },
      errorElement: "em",
      errorPlacement: function ( error, element ) {

        error.addClass( "invalid-feedback" );
        if ( element.prop( "type" ) === "checkbox" ) {
        error.appendTo( element.parents('.form-group') );
      } else {
        error.insertAfter( element );
      }

      if (element.hasClass("select2-hidden-accessible")) {
        element = $("#select2-" + element.attr("id") + "-container").parent();
        element.parents('.form-group').append(error);
      }

      // if (element.attr("name") == "mobile" ) {
      //   error.insertAfter($('#mobile_error'));
      // }
    },
    highlight: function ( element, errorClass, validClass ) {
      $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
    },
    unhighlight: function (element, errorClass, validClass) {
      $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
    }

  }); 

  $('#send_message').click(function()
  {
    if (form.valid() == true)
    {
        var formData= [];   
        formData.push({ 
            contact_first_name : $('#contact_first_name').val(),
            contact_last_name : $('#contact_last_name').val(),
            contact_email : $('#contact_email').val(),
            contact_phone : $('#contact_phone').val(),
            contact_desciption : $('#contact_desciption').val(), 
        });

        $('.loader').show().css('opacity','0.4');
        $.ajax({
            url: api_url + "contact-us-form",
            method: 'post',
            data: formData[0],
            success: function (data) {
                $('.loader').hide();
                if(data.success == true){
                    form[0].reset(); 
                    setTimeout(function(){
                      window.location.href = base_url + '/thank-you-contact-us';                      
                    }, 1500);
                }
            },
            error: function (data) {
              $('.loader').hide();
              if(data.responseJSON.success == false) {
                  var messageList = data.responseJSON.message;
                  $.each(messageList, function(index, item) {
                      $('#'+index+'_error').show();
                      $('#'+index+'_error').html(item);
                  });
              }
            }
        });

     }
  });
});
 


$( '#contact_first_name' ).blur(function() {
  $('#contact_first_name_error').hide();
  $('#contact_first_name_error').html('');
});

$( '#contact_last_name' ).blur(function() {
  $('#contact_last_name_error').hide();
  $('#contact_last_name_error').html('');
});

$( '#contact_email' ).blur(function() {
  $('#contact_email_error').hide();
  $('#contact_email_error').html('');
});

$( '#contact_phone' ).blur(function() {
  $('#contact_phone_error').hide();
  $('#contact_phone_error').html('');
});

$( '#contact_desciption' ).blur(function() {
  $('#contact_desciption_error').hide();
  $('#contact_desciption_error').html('');
});

$("#contact_phone").on("input", function(evt) {
  var self = $(this);
  self.val(self.val().replace(/[^0-9\.]/g, ''));
  if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57))
  {
    evt.preventDefault();
  }
});
