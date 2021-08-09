if($('#is_sign_request_sent').val() == 0)
{
        $('#signed-agrrement').show();
        $('#signed-succesfully').html('');

        $('#agreed-and-accepted').click(function() {
              $.ajax({
                url: api_url + "sign-agreement-by-landlord",
                method: 'get',
              //  data: {'landlord_signature': formData},
                headers: {
                  'Authorization': 'Bearer '+ token,
                },
                beforeSend: function() {
                  $('.loader').show().css('opacity','0.4');
                },
                success: function (data) {
                  $(".loader").hide();
                  if(data.success == true){

                    // $('#is_sign_request_sent').val(1);
                    // $('#signed-agrrement').show();
                    // $('#signed-succesfully').html('');
                    // $('#signed-succesfully').html(data.message);
                    // $('#not-signed-agrrement').hide();

                    setTimeout(function(){
                      $.ajax({
                        url: base_url + "/update-agreement-sign",
                        method: 'get',
                      });
                      window.location.reload();
                    }, 1000);
                  }
                },
                error: function (data) {
                  $(".loader").hide();
                }
              });
          });
}
// if($('#is_sign_request_sent').val() == 1)
// {

//     var is_agreement_signed = $("#is_agreement_signed").val();
//     var sign_message = '';
//     if(is_agreement_signed == 1)
//         sign_message = 'You have already signed Agreement. SPACE MATCH will soon check it & approved it.';
//     if(is_agreement_signed == 0)
//         sign_message = 'Your agreement has been sent to SpaceMatch for signing.';
//     $('#signed-agrrement').show();
//     $('#signed-succesfully').html('');
//     $('#signed-succesfully').html(sign_message);
//     $('#not-signed-agrrement').hide();
// }
