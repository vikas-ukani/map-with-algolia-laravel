$(document).ready( function () {
  $('#entity_name_detail').hide();
  $('#vat_number_detail').hide();
  $('#registration_number_detail').hide();
  $('#space_user_type_error').hide();
  $('#firstname_error').hide();
  $('#surname_error').hide();
  $('#email_error').hide();
  $('#password_error').hide();
  $('#mobile_error').hide();

  $('#address1_error').hide();
  $('#provinces_error').hide();
  $('#cities_error').hide();
  $('#post_code_error').hide();

  $('#vat_number_error').hide();
  $('#entity_name_error').hide();
  $('#registration_number_detail').hide();
  $('#termsandcondition_error').hide();

  $('.select2').select2({
    width: "100%",
    minimumResultsForSearch: -1
  });

  $('b[role="presentation"]').hide();
  $('.select2-selection__arrow').append('<i class="icon icon-chevron-down-gray"></i>');

    var form = $("#registerForm");
   form.validate( {
      rules: {
        'space_user_type[]': {
          required: true,
        },
        firstname: {
          required: true,
          minlength: 2
        },
        surname: {
          required: true,
          minlength: 2
        },
        email: {
          required: true,
          email: true
        },
        password : {
            required: true,
            minlength : 8
        },
        mobile: {
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
        entity_name: {
					required: function(element) {
						return $('#spaceowner').is(':checked')
					}
        },
        vat_number: {
					required: function(element) {
						return $('#spaceowner').is(':checked')
					}
        },
        registration_number: {
					required: function(element) {
						return $('#spaceowner').is(':checked')
					}
				},
        termsandcondition: "required"
      },
      messages: {
        'space_user_type[]': {
          required: "Please register as Space User or Space Owner",
        },
        firstname: "Please enter name",
        surname: "Please enter surname",
        email: {
          required: "Please enter email",
          email: "Please enter valid email",
        },
        password: {
            required: "Please enter password",
            minlength: "Your password must be at least 8 characters long"
        },
        mobile: {
          required: "Please enter mobile no",
          minlength: "Please provide valid mobile no"
        },
        mobile_prefix: {
          required: "Please select mobile prefix",
        },
        address1: "Please enter Address1",
        provinces:"Please select province",
        cities:"Please select city",
        post_code: "Please enter postal code",
        entity_name: "Please enter company name",
        vat_number: "Please enter vat number",
        registration_number: "Please enter registration number",
        termsandcondition: "Please accept Terms and Conditions"
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

      if (element.attr("name") == "mobile" ) {
        error.insertAfter($('#mobile_error'));
      }
    },
    highlight: function ( element, errorClass, validClass ) {
      $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
    },
    unhighlight: function (element, errorClass, validClass) {
      $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
    }

  });

  $('#spaceowner').change(function() {
    if(this.checked) {
        $('#entity_name_detail').show();
        $('#vat_number_detail').show();
        $('#registration_number_detail').show();
    }
    else
    {
        $('#entity_name_detail').hide();
        $('#vat_number_detail').hide();
        $('#registration_number_detail').hide();
    }
});

  $('#signup').click(function()
  {
    if (form.valid() == true)
    {
        var formData= [];
        var spaceuser =  $.map($(':checkbox[name=space_user_type\\[\\]]:checked'), function (n, i) {
            return n.value;
        }).join(',');

        var _token = $('#_token').val();

        formData.push({
            space_user_type:spaceuser,
            firstname : $('#firstname').val(),
            surname : $('#surname').val(),
            email : $('#email').val(),
            password : $('#password').val(),
            mobile : $('#mobileno').val(),
            mobile_prefix : $('#mobile_prefix').val(),
            address1 : $('#address1').val(),
            address2 : $('#address2').val(),
            provinces : $('#provinces').val(),
            cities : $('#cities').val(),
            post_code : $('#post_code').val(),
            subscribed : $('#subscribed').val(),
            vat_number : $('#vat_number').val(),
            entity_name : $('#entity_name').val(),
            termsandcondition : $('#termsandcondition').val(),
            registration_number : $('#registration_number').val(),
        });

        $('.loader').show().css('opacity','0.4');
        $.ajax({
            url: api_url + "register",
            method: 'post',
            data: formData[0],
            success: function (data) {
                if(data.success == true){
                    if(base_env == 'production'){
                        gaEventTracing('Register', 'On-click');
                    }
                    setTimeout(function(){
                    $('.loader').hide();
                    $.redirect(base_url + '/email-confirmation',
                    {
                      _token: _token,
                      user_name: data.data.username,
                      user_email: data.data.email,
                      user_type: data.data.user_type
                    },
                    "POST");
                    },1000)
                }else{
                    $('.loader').hide();
                    $('#email_error').show();
                    $('#email_error').html(data.message.email);
                }
            },
            error: function (data) {
                $('.loader').hide();
                if(data.responseJSON.success == false) {
                  var messageList = data.responseJSON.message;
                  $.each(messageList, function(index, item) {
                      if(index == 'space_user_type')
                      {
                        $('#space_user_type_error').show();
                        $('#space_user_type_error').html(item);
                      }
                      if(index == 'firstname')
                      {
                        $('#firstname_error').show();
                        $('#firstname_error').html(item);
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
                      if(index == 'password')
                      {
                        $('#password_error').show();
                        $('#password_error').html(item);
                      }
                      if(index == 'mobile')
                      {
                        $('#mobile_error').show();
                        $('#mobile_error').html(item);
                      }
                      if(index == 'mobile_prefix')
                      {
                        $('#mobile_error').show();
                        $('#mobile_error').html(item);
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

                      if(index == 'vat_number')
                      {
                        $('#vat_number_error').show();
                        $('#vat_number_error').html(item);
                      }
                      if(index == 'entity_name')
                      {
                        $('#entity_name_error').show();
                        $('#entity_name_error').html(item);
                      }

                      if(index == 'registration_number')
                      {
                        $('#registration_number_error').show();
                        $('#registration_number_error').html(item);
                      }

                      if(index == 'termsandcondition')
                      {
                        $('#termsandcondition_error').show();
                        $('#termsandcondition_error').html(item);
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
            if(city_details.length > 0){
              $.each(city_details, function(key, value) {
                      $('#cities').append($("<option></option>").attr("value",value.id).text(value.name));
                });
            }
        },
        error: function (data) {
            $(".loader").hide();
        }
  });

}
$('input[name="space_user_type[]"]').click(function(){

  if($(this).prop("checked") == true){
    $('#space_user_type_error').hide();
    $('#space_user_type_error').html('');
  }
});


$( '#firstname' ).blur(function() {
  $('#firstname_error').hide();
  $('#firstname_error').html('');
});

$( '#surname' ).blur(function() {
  $('#surname_error').hide();
  $('#surname_error').html('');
});

$( '#email' ).blur(function() {
  $('#email_error').hide();
  $('#email_error').html('');
});

$( '#password' ).blur(function() {
  $('#password_error').hide();
  $('#password_error').html('');
});

$( '#mobileno' ).blur(function() {
  $('#mobile_error').hide();
  $('#mobile_error').html('');
});

$( '#entity_name' ).blur(function() {
    $('#entity_name_error').hide();
    $('#entity_name_error').html('');
  });

$( '#vat_number' ).blur(function() {
  $('#vat_number_error').hide();
  $('#vat_number_error').html('');
});

$( '#registration_number' ).blur(function() {
  $('#registration_number_error').hide();
  $('#registration_number_error').html('');
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

$( '#termsandcondition' ).click(function() {
  if($(this).prop("checked") == true){
  $('#termsandcondition_error').hide();
  $('#termsandcondition_error').html('');
  }
});


$("#mobileno,#post_code").on("input", function(evt) {
  var self = $(this);
  self.val(self.val().replace(/[^0-9\.]/g, ''));
  if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57))
  {
    evt.preventDefault();
  }
});
