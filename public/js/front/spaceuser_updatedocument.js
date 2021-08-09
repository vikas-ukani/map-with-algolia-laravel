// Update Document javascript
$(document).ready( function () {

  $('#bankname_error').hide();
  $('#nameaccountholder_error').hide();
  $('#accountnumber_error').hide();
  $('#branchcode_error').hide();
  $('#bankdocument_error').hide();

  $("#accountnumber,#branchcode").on("input", function(evt) {
    var self = $(this);
    self.val(self.val().replace(/[^0-9\.]/g, ''));
    if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57))
    {
      evt.preventDefault();
    }
  });

  if($("#action_name").val() == 'add')
  {
    $(".icon-delete").hide();
    $("#btn-verified").hide();
    $("#btn-pending-approval").hide();
  }

  if($("#action_name").val() == 'update')
  {
      $(".icon-delete").show();
  }


  jQuery.validator.addMethod("extension", function (value, element, param) {
    param = typeof param === "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
    return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
}, "Please enter a value with a valid extension.");


  var bankLandlordForm = $('#bankLandlordForm');
    bankLandlordForm.validate( {
      rules: {
        bankname: "required",
        nameaccountholder: "required",
        accountnumber: {
          required: true,
          number: true,
          digits: true
        },
        branchcode: {
          required: true,
          number: true,
          digits: true
        },
        bankdocument:
        {
          required: function(element) {
            if($('#action_name').val() == 'add')
                return true;
            else
                return false;
          },
          extension: "pdf|doc|docx"
          //accept: "pdf,doc,docx"
        }
      },
      messages: {
        bankname: "Please enter bank.",
        nameaccountholder: "Please enter Name of Account Holder",
        accountnumber: {
          required: "Please enter account number",
          number: "Please enter only numbers",
          digits:"Please enter only digits"
        },
        branchcode: {
          required: "Please enter branch code",
          number: "Please enter only numbers",
          digits:"Please enter only digits"
        },
        bankdocument:
        {
          required: "Please upload Bank Stamped proof ",
          extension: "Please upload only .doc,.docx and .pdf format files for Bank Stamped proof"
        }
      },
      errorElement: "em",
      errorPlacement: function ( error, element ) {

        error.addClass( "invalid-feedback" );
        if ( element.prop( "type" ) === "checkbox" ) {
          error.insertAfter( element.next( "label" ) );
        }
        else if ( element.prop( "type" ) === "file" ) {
          error.insertAfter( $("#bank_proof") );
        }
        else {
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

  $('#updateDocument').click(function(event) {

   if (bankLandlordForm.valid() == true) {
     event.preventDefault();
      var form = bankLandlordForm[0];
      $("#updateDocument").prop("disabled", true);

      var formData = new FormData(form);
      $.ajax({
                url: api_url + "update-bank-detail",
                method: 'post',
                type: "POST",
                enctype: 'multipart/form-data',
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
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
                    //   $(".icon-delete").show();
                      $("#updateDocument").prop("disabled", true);
                    //   $("#bank_id").val(data.data.id);
                    //   $("#action_name").val('update');
                      $('#success-message').show();
                      $('#success-message-show').text(data.message);

                    //   var DOCUMENT_STR = '';
                    //   DOCUMENT_STR = '<a href="'+data.data.documents.document_path+'" download="'+data.data.documents.document_path+'" target="_blank">'+data.data.documents.document_name+'</a>';
                    //   $('.text-dark-grey').html('');
                    //   $('.text-dark-grey').html(DOCUMENT_STR);

                      setTimeout(function(){
                          location.reload();
                        }, 1000);
                    }
                    if(data.success == false){
                      $('#email_error').show();
                      $('#email_error').html(data.message);
                    }
                },
                error: function (data) {
                  $(".loader").hide();
                  $("#updateDocument").prop("disabled", false);
                  if(data.responseJSON.success == false) {
                    var messageList = data.responseJSON.message;
                    $.each(messageList, function(index, item) {
                        if(index == 'bankname')
                        {
                          $('#bankname_error').show();
                          $('#bankname_error').html(item);
                        }
                        if(index == 'nameaccountholder')
                        {
                          $('#nameaccountholder_error').show();
                          $('#nameaccountholder_error').html(item);
                        }
                        if(index == 'accountnumber')
                        {
                          $('#accountnumber_error').show();
                          $('#accountnumber_error').html(item);
                        }
                        if(index == 'branchcode')
                        {
                          $('#branchcode_error').show();
                          $('#branchcode_error').html(item);
                        }
                        if(index == 'bankdocument')
                        {
                          $('#bankdocument_error').show();
                          $('#bankdocument_error').html(item);
                        }
                    });
                  }
                }
            });
     }
  });
});

$( '#bankname' ).blur(function() {
  $('#bankname_error').hide();
  $('#bankname_error').html('');
});

$( '#nameaccountholder' ).blur(function() {
  $('#nameaccountholder_error').hide();
  $('#nameaccountholder_error').html('');
});


$( '#accountnumber' ).blur(function() {
  $('#accountnumber_error').hide();
  $('#accountnumber_error').html('');
});

$( '#branchcode' ).blur(function() {
  $('#branchcode_error').hide();
  $('#branchcode_error').html('');
});

$( '#bankdocument' ).blur(function() {
  $('#bankdocument_error').hide();
  $('#bankdocument_error').html('');
});
