// Portfolio javascript
$(document).ready( function () {
   // $('#companyname_error').hide();
    $('#portfolio_name_error').hide();
    $('#company_error').hide();

    $('.select2').select2({
      width: "100%",
      minimumResultsForSearch: -1
    });

    $('b[role="presentation"]').hide();
    $('.select2-selection__arrow').append('<i class="icon icon-chevron-down-gray"></i>');


    loadPortfolios();
    loadPortFoliosEntities();

    var addPortfolioForm = $('#addPortfolioForm');
    addPortfolioForm.validate( {
      rules: {
				portfolio_name: {
					required: true,
					minlength: 2,
        },
        company:'required',
			},
      messages: {
        portfolio_name: {
          required: "Please enter portfolio name",
        },
        company: "Please enter company",
      },
      errorElement: "em",
      errorPlacement: function ( error, element ) {

        error.addClass( "invalid-feedback" );
        if ( element.prop( "type" ) === "checkbox" ) {
          error.insertAfter( element.next( "label" ) );
        }
        else if (element.hasClass("select2-hidden-accessible")) {
					element = $("#select2-" + element.attr("id") + "-container").parent();
          element.parents('.form-group').append(error);
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
      },
    });

    $('#add-portfolio').click(function(e) {
      if (addPortfolioForm.valid() == true) {
        e.preventDefault();
         var formData = addPortfolioForm.serializeArray();
         $('#add-portfolio').prop('disabled', true);
         $.ajax({
                   url: api_url + "portfolio",
                   method: 'post',
                   data: formData,
                   headers: {
                     'Authorization': 'Bearer '+ token,
                   },
                   beforeSend: function() {
                     $('.loader').show().css('opacity','0.4');
                   },
                   success: function (data) {
                       $(".loader").hide();

                       if(data.success == true){
                         $('#portfolio-success-message').show();
                         $('#portfolio-success-message-show').text(data.message);
                         addPortfolioForm[0].reset();
                         $("#tblDetailPortfolio").find("tr:gt(0)").remove();
                         var tbody =  $('<tbody/>');
                         var tr_row =  $('<tr/>');
                         tr_row.append("<td colspan='3'><p class='text-center'>Loading Portfolios....</p></td>");
                         tbody.append(tr_row);
                         $( "#portfolio_list" ).after(tbody);
                         setTimeout(function(){
                           loadPortfolios();
                           $('#potfopportfolioortfoliolio-success-message').hide();
                           $('#portfolio-success-message-show').text('');
                         }, 2000);
                       }
                       $('#add-portfolio').prop('disabled', false);
                   },
                   error: function (data) {
                     $(".loader").hide();
                     if(data.responseJSON.success == false) {
                       var messageList = data.responseJSON.message;
                       $.each(messageList, function(index, item) {
                           if(index == 'portfolio_name')
                           {
                             $('#portfolio_name_error').show();
                             $('#portfolio_name_error').html(item);
                           }
                           if(index == 'company')
                           {
                             $('#company_error').show();
                             $('#company_error').html(item);
                           }
                       });
                     }
                     $('#add-portfolio').prop('disabled', false);
                 }

               });
         }
     });

});
$( "#company" ).focus(function() {
  $('#company_error').hide();
  $('#company_error').html('');
});

$( "#portfolio_name" ).focus(function() {
  $('#portfolio_name_error').hide();
  $('#portfolio_name_error').html('');
});
function loadPortFoliosEntities()
{
  $.ajax({
    url: api_url + "entity",
    method: 'get',
    data: {},
    headers: {
      'Authorization': 'Bearer '+ token,
    },
    beforeSend: function() {
      $('.loader').show().css('opacity','0.4');
    },
    success: function (data) {
        $(".loader").hide();
        var entity_details = data.data;
        if(entity_details.length > 0){

          $("#modalEditPortfolio #company1").html('');
          $("#modalEditPortfolio #company1").append($("<option></option>").attr("value","").text("-Please Select Company-"));
          $('#company').html('');
          $('#company').append($("<option></option>").attr("value","").text("-Please Select Company-"));
          $.each(entity_details, function(key, value) {
                  $('#company').append($("<option></option>").attr("value",value.id).text(value.name));
                  $('#modalEditPortfolio #company1').append($("<option></option>").attr("value",value.id).text(value.name));
            });
        }
    },
    error: function (data) {
      $(".loader").hide();
    }
  });

}
function loadPortfolios()
{
    $.ajax({
        url: api_url + "portfolio",
        method: 'get',
        data: {},
        headers: {
          'Authorization': 'Bearer '+ token,
        },
        beforeSend: function() {
          $('.loader').show().css('opacity','0.4');
        },
        success: function (data) {
            $(".loader").hide();
            $( "#portfolio_list").after('');
            var portfolio_details = data.data;
            $("#tblDetailPortfolio").find("tr:gt(0)").remove();
            if(portfolio_details.length == 0)
            {
              var tbody =  $('<tbody/>');
              var tr_row =  $('<tr/>');
              tr_row.append("<td colspan='3'><p class='text-center'>No Portfolios</p></td>");
              tbody.append(tr_row);

              $( "#portfolio_list" ).after(tbody);
             // $( "#portfolio_list" ).children().last().after(tbody);
              //$(tbody).insertAfter($( "#portfolio_list" ).children().last());
            }

            if(portfolio_details.length > 0)
            {

              for(var e=0;e<portfolio_details.length;e++)
              {
                  var tbody =  $('<tbody/>');
                  var tr_row =  $('<tr/>');
                  tr_row.append('<td data-th="portfolio name">'+ portfolio_details[e]['portfolio_name'] + '</td>');
                  tr_row.append('<td data-th="Company">'+ portfolio_details[e]['companyDetails']['name'] +'</td>');
                  var action_td;
                  if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
                  {
                      action_td = $('<td/>').attr('data-th','action').addClass("text-lg-right");
                    //  action_td.append('<a href="javascript:void(0);" data-toggle="collapse" data-target="#no-records-of-rows-'+ portfolio_details[e]['id'] +'" aria-expanded="false" aria-controls="no-records-of-rows-'+ portfolio_details[e]['id'] +'"><i class="icon icon-visibility mr-3"></i></a>');
                      action_td.append('<a href="javascript:void(0);" data-id="'+ portfolio_details[e]['id'] +'"  class="open-EditPortfolioDialog"><i class="icon icon-edit-black mr-3"></i></a>');
                      action_td.append('<a href="javascript:void(0);" data-id="'+ portfolio_details[e]['id'] +'" class="open-DeletePortfolioDialog"><i class="icon icon-delete-black"></i></a>');
                  }
                  else
                  {
                    action_td = $('<td/>').addClass("text-lg-right");
                  }
                  tr_row.append(action_td);


                  tbody.append(tr_row);
                  $( "#tblDetailPortfolio" ).children().last().after(tbody);
                 // $( "#portfolio_list" ).after(tbody);


                  $('.select2').select2({
                    width: "100%",
                    minimumResultsForSearch: -1
                  });

                  $('b[role="presentation"]').hide();
                  $('.select2-selection__arrow').append('<i class="icon icon-chevron-down-gray"></i>');
              }



              $('.open-DeletePortfolioDialog').click(function () {
                var portfolioId = $(this).data('id');
                $("#modalPortfolioDeleteConfimation #portfolioId").val('');
                $("#modalPortfolioDeleteConfimation #portfolioId").val( portfolioId );
                $('#modalPortfolioDeleteConfimation').modal('show');
              });

              $('.open-EditPortfolioDialog').click(function () {

                var portfolioId = $(this).data('id');
                    $.ajax({
                      url: api_url+"portfolio/"+portfolioId,
                      method: 'GET',
                      headers: {
                        'Authorization': 'Bearer '+ token,
                        "Accept": "application/json",
                      },
                      beforeSend: function() {
                        $('.loader').show().css('opacity','0.4');
                      },
                      success: function (data) {
                          $(".loader").hide();
                          $("#modalEditPortfolio #portfolioId").val('');
                          $("#modalEditPortfolio #portfolio_name").val('');
                          $("#modalEditPortfolio #company1").val('');

                          $("#modalEditPortfolio #portfolioId").val( portfolioId );
                          $("#modalEditPortfolio #portfolio_name").val( data.data.portfolio_name);
                          $("#modalEditPortfolio #company1").val(data.data.company).trigger("change");

                          $('#modalEditPortfolio #portfolio_name_error').hide();
                          $('#modalEditPortfolio #company_error').hide();
                          $('#modalEditPortfolio').modal('show');
                      },
                      error: function (data) {
                        $(".loader").hide();
                      }
                  });
              });
            }
        },
        error: function (data) {
          $(".loader").hide();
      }
    });

}


$('#delete-portfolio').click(function() {

  var portfolioId = $('#modalPortfolioDeleteConfimation #portfolioId').val();
  $.ajax({
        url: api_url+"portfolio/"+portfolioId,
        method: 'DELETE',
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
              $('#portfolio-success-message').show();
              $('#portfolio-success-message-show').text(data.message);
              $('#modalPortfolioDeleteConfimation').modal('hide');
              $("#tblDetailPortfolio").find("tr:gt(0)").remove();
              var tbody =  $('<tbody/>');
              var tr_row =  $('<tr/>');
              tr_row.append("<td colspan='3'><p class='text-center'>Loading Portfolios....</p></td>");
              tbody.append(tr_row);
              $( "#portfolio_list" ).after(tbody);
              setTimeout(function(){
                loadPortfolios();
                $('#portfolio-success-message').hide();
                $('#portfolio-success-message').text('');
              }, 2000);
            }
        },
        error: function (data) {
          $(".loader").hide();
          $('#modalPortfolioDeleteConfimation').modal('hide');
        }
    });
});

$('#update-portfolio').click(function() {

  var portfolioId = $('#modalEditPortfolio #portfolioId').val();

  var updatePortfolioForm = $('#updatePortfolioForm');
  updatePortfolioForm.validate( {
    ules: {
      portfolio_name: {
        required: true,
        minlength: 2,
      },
      company1:'required',
    },
    messages: {
      portfolio_name: {
        required: "Please enter portfolio name",
      },
      company1: "Please enter company",
    },
      errorElement: "em",
      errorPlacement: function ( error, element ) {

        error.addClass( "invalid-feedback" );
        if ( element.prop( "type" ) === "checkbox" ) {
          error.insertAfter( element.next( "label" ) );
        }
        else if (element.hasClass("select2-hidden-accessible")) {
					element = $("#select2-" + element.attr("id") + "-container").parent();
          element.parents('.form-group').append(error);
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

    if(updatePortfolioForm.valid() == true) {
      var formData = updatePortfolioForm.serializeArray();
      $.ajax({
        url: api_url+"portfolio/"+portfolioId,
        method: 'PATCH',
        data : { 'portfolio_name': $('#modalEditPortfolio #portfolio_name').val() , 'company' : $('#company1').val(), "portfolioId":portfolioId},
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
              $('#portfolio-success-message').show();
              $('#portfolio-success-message-show').text(data.message);
              $('#modalEditPortfolio').modal('hide');
              $("#tblDetailPortfolio").find("tr:gt(0)").remove();
              var tbody =  $('<tbody/>');
              var tr_row =  $('<tr/>');
              tr_row.append("<td colspan='3'><p class='text-center'>Loading Portfolios....</p></td>");
              tbody.append(tr_row);
              $( "#portfolio_list" ).after(tbody);
              setTimeout(function(){
                loadPortfolios();
                $('#portfolio-success-message').hide();
                $('#portfolio-success-message-show').text('');
              }, 2000);
            }
        },
        error: function (data) {
          $(".loader").hide();
          if(data.responseJSON.success == false) {
            var messageList = data.responseJSON.message;
            $.each(messageList, function(index, item) {
                if(index == 'company')
                {
                  $('#modalEditPortfolio #company_error').show();
                  $('#modalEditPortfolio #company_error').html(item);
                }
                if(index == 'portfolio_name')
                {
                  $('#modalEditPortfolio #portfolio_name_error').show();
                  $('#modalEditPortfolio #portfolio_name_error').html(item);
                }
            });
          }
        }
    });
    }


    $( "#modalEditPortfolio #company" ).focus(function() {
      $('#modalEditPortfolio #company_error').hide();
      $('#modalEditPortfolio #company_error').html('');
    });

    $( "#modalEditPortfolio #portfolio_name" ).focus(function() {
      $('#modalEditPortfolio #portfolio_name_error').hide();
      $('#modalEditPortfolio #portfolio_name_error').html('');
    });
});
