// Update profile javascript
$(document).ready( function () {
  $('#name_error').hide();
  $('#surname_error').hide();
  $('#email_error').hide();
  $('#mobileno_error').hide();

  $('#address1_error').hide();
  $('#provinces_error').hide();
  $('#cities_error').hide();
  $('#post_code_error').hide();
  $('#success-message').hide();
  if ($.fn.select2){
    $('.select2').select2({
      width: "100%",
      minimumResultsForSearch: -1
    });

    $('b[role="presentation"]').hide();
    $('.select2-selection__arrow').append('<i class="icon icon-chevron-down-gray"></i>');

    if($.fn.select2) {
        $('#mobile_prefix').select2({
            width: "70px"
        });
        $('b[role="presentation"]').hide();
    }
  }
  $("#mobileno,#post_code").on("input", function(evt) {
    var self = $(this);
    self.val(self.val().replace(/[^0-9\.]/g, ''));
    if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57))
    {
      evt.preventDefault();
    }
  });
  loadCities();
    var updateProfileForm = $('#updateProfileForm');
    updateProfileForm.validate( {
      rules: {
        name: {
                required: true,
                minlength: 2,
              },
        surname: {
          required: true,
          minlength: 2,
        },
        email: {
          required: true,
          email: true
        },
        mobileno: {
          required: true,
          minlength: 10,
          number: true,
        },
        mobile_prefix: {
          required: true,
        },
        address1: {
          required: true,
        },
        provinces:{
          required: true,
        },
        cities:{
          required: true,
        },
        post_code: {
          required: true,
        },
      },
      messages: {
        name: "Please enter name",
        surname: "Please enter surname",
        email: {
          required: "Please enter email",
          minlength: "Please enter a valid Email address"
        },
        mobileno: {
          required: "Please enter mobile no",
          minlength: "Please enter valid mobile No"
        },
        mobile_prefix: {
          required: "Please select mobile prefix",
        },
        address1: "Please enter Address1",
        provinces:"Please select province",
        cities:"Please select city",
        post_code: "Please enter postal code",
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

  $('#updateProfile').click(function() {

   if (updateProfileForm.valid() == true) {
      var formData = updateProfileForm.serializeArray();
      $.ajax({
                url: api_url + "update-profile",
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

                      setTimeout(function(){
                            $('#success-message').hide();
                            $('#success-message-show').text('');
                            window.location.reload();
                        }, 2000);
                    }
                    if(data.success == false){
                      $('#email_error').show();
                      $('#email_error').html(data.message);
                    }
                },
                error: function (data) {
                  $(".loader").hide();
                  if(data.responseJSON.success == false) {
                    var messageList = data.responseJSON.message;
                    $.each(messageList, function(index, item) {
                        if(index == 'name')
                        {
                          $('#name_error').show();
                          $('#name_error').html(item);
                        }
                        if(index == 'surname')
                        {
                          $('#surname_error').show();
                          $('#surname_error').html(item);
                        }
                        if(index == 'email')
                        {
                          $('#email_error').show();
                          $('#email_error').html(item);
                        }
                        if(index == 'moblieno')
                        {
                          $('#mobileno_error').show();
                          $('#mobileno_error').html(item);
                        }
                        if(index == 'mobile_prefix')
                        {
                          $('#mobileno_error').show();
                          $('#mobileno_error').html(item);
                        }
                        if(index == 'address1')
                      {
                        $('#address1_error').show();
                        $('#address1_error').html(item);
                      }
                      if(index == 'provinces')
                      {
                        $('#provinces_error').show();
                        $('#provinces_error').html(item);
                      }
                      if(index == 'cities')
                      {
                        $('#cities_error').show();
                        $('#cities_error').html(item);
                      }
                      if(index == 'post_code')
                      {
                        $('#post_code_error').show();
                        $('#post_code_error').html(item);
                      }
                    });
                  }
                }
            });
     }
  });
});

$('#provinces').change(function() {
  loadCities();
});
function loadCities()
{
    $.ajax({
        url: api_url + "getCitiesListOfProvince/"+$('#provinces').val(),
        method: 'get',
        data: {},
        beforeSend: function() {
            $('.loader').show().css('opacity','0.4');
        },
        success: function (data) {
            $(".loader").hide();
            $('#cities').html('');
            $('#cities').append($("<option></option>").attr("value","").text("-Please Select City-"));
            var city_details = data.data;
            var selected_city = $('#selected_city').val();
            if(city_details.length > 0){
              $.each(city_details, function(key, value) {
                       if(selected_city == value.id)
                         $('#cities').append($("<option></option>").attr("value",value.id).attr("selected","selected").text(value.name));
                       else
                          $('#cities').append($("<option></option>").attr("value",value.id).text(value.name));
                });
            }
        },
        error: function (data) {
            $(".loader").hide();
        }
  });

}
$( '#name' ).blur(function() {
  $('#name_error').hide();
  $('#name_error').html('');
});

$( '#surname' ).blur(function() {
  $('#surname_error').hide();
  $('#surname_error').html('');
});


$( '#email' ).blur(function() {
  $('#email_error').hide();
  $('#email_error').html('');
});

$( '#moblieno' ).blur(function() {
  $('#mobileno_error').hide();
  $('#mobileno_error').html('');
});

$('#address1' ).blur(function() {
  $('#address1_error').hide();
  $('#address1_error').html('');
});
$('#provinces' ).blur(function() {
  $('#provinces_error').hide();
  $('#provinces_error').html('');
});
$('#cities' ).blur(function() {
  $('#cities_error').hide();
  $('#cities_error').html('');
});
$('#post_code' ).blur(function() {
  $('#post_code_error').hide();
  $('#post_code_error').html('');
});
