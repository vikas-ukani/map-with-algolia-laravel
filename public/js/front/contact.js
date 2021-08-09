$(document).ready( function () {
    var form = $("#contactForm");
    form.validate( {
        rules: {
            email: {
                required: true,
                email: true
            },
            // message: {
            //     required: true,
            // }
        },
        messages: {
            email: {
                required: "Please enter email",
                email: "Please enter valid email",
            },
            // message: {
            //     required: "Please enter message",
            // },
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {

            error.addClass( "invalid-feedback" );
            error.insertAfter( element );

            if (element.attr("name") == "email" ) {
                error.insertAfter($('#email_error'));
              }
        },
        highlight: function ( element, errorClass, validClass ) {
            $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
        },
        unhighlight: function (element, errorClass, validClass) {
            $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
        }

    });


  $('#contactus').click(function()
  {
    if (form.valid() == true)
    {
        var formData= [];
        formData.push({
            email : $('#email').val(),
            // message : $('#message').val(),
        });

        $('.loader').show().css('opacity','0.4');
        $.ajax({
            url: api_url + "contact-us",
            method: 'post',
            data: formData[0],
            success: function (data) {
                $('.loader').hide();
                if(data.success == true){
                    form[0].reset();
                    $('#contact-success-message').show();
                    $('#contact-success-message-show').text('Thank you for subscribing to our newsletter');
                    setTimeout(function(){
                        $('#contact-success-message').hide();
                        $('#contact-success-message-show').text('');
                    }, 2000);
                }else{
                    $('#contactus_error').show();
                    $('#contactus_error').html(data.message.email);
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
