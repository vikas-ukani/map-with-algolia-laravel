$(document).ready( function () {
     pipleline();
});

function pipleline()
{
    getPendingApprovalList();
    getSiteVisitList();
    getApproveLegalAgreementList();
    getPaymentList();
    getConfrimList();
}

function getPendingApprovalList()
{

    $.ajax({
      url: api_url+"landlord-pending-apporval",
      method: 'GET',
      data: {},
      headers: {
        'Authorization': 'Bearer '+ token,
      },
      beforeSend: function() {
        $('.loader').show().css('opacity','0.4');
      },
      success: function (response) {
         landlordPendingApproval(response);
      },
      error: function (response) {
        $(".loader").hide();
      }
  });
}

function getSiteVisitList()
{
      $.ajax({
        url: api_url+"landlord-site-visit",
        method: 'GET',
        data: {},
        headers: {
          'Authorization': 'Bearer '+ token,
        },
        beforeSend: function() {
          $('.loader').show().css('opacity','0.4');
        },
        success: function (response) {
          landlordSiteVisit(response);
        },
        error: function (response) {
          $(".loader").hide();
        }
    });


}

function getApproveLegalAgreementList()
{
      $.ajax({
        url: api_url+"landlord-approved-legal-agreement",
        method: 'GET',
        data: {},
        headers: {
          'Authorization': 'Bearer '+ token,
        },
        beforeSend: function() {
          $('.loader').show().css('opacity','0.4');
        },
        success: function (response) {
          landlordLegalAgreement(response);
        },
        error: function (response) {
          $(".loader").hide();
        }
    });
}

function getPaymentList()
{
  $.ajax({
        url: api_url+"landlord-payment-pipeline",
        method: 'GET',
        data: {},
        headers: {
          'Authorization': 'Bearer '+ token,
        },
        beforeSend: function() {
          $('.loader').show().css('opacity','0.4');
        },
        success: function (response) {
          landlordPayment(response);
        },
        error: function (response) {
          $(".loader").hide();
        }
    });
}

function getConfrimList()
{
    $.ajax({
        url: api_url+"landlord-confirm-pipeline",
        method: 'GET',
        data: {},
        headers: {
          'Authorization': 'Bearer '+ token,
        },
        beforeSend: function() {
          $('.loader').show().css('opacity','0.4');
        },
        success: function (response) {
          landlordConfirm(response);
        },
        error: function (response) {
          $(".loader").hide();
        }
    });
  //  $('#confirmed').html('This page is under development. ');
}

function landlordSiteVisit(response)
{
  $('#site_visit').html('');
  var sitevisit_enquiry = response.data;
  if(sitevisit_enquiry.length == 0)
  {
    var no_record_text = 'No enquiries at this stage';
    $('#site_visit').html(no_record_text);
  }
  if(sitevisit_enquiry.length > 0)
  {
    for(var sv=0;sv<sitevisit_enquiry.length;sv++)
    {
         var site_enquiry_id = sitevisit_enquiry[sv]['id'];

         //Card Cloumn Start
         var div_card = $('<div/>').addClass("card-column");
          //Card DATE Start
          var div_created_date = $('<div/>').addClass("card-head d-flex justify-content-between");
          div_created_date.append('<p>'+sitevisit_enquiry[sv]['created_date']+'</p>');
          div_created_date.append('<p>Ref. No:'+sitevisit_enquiry[sv]['property']['reference_number']+'</p>');
          div_card.append(div_created_date);

          //Card body Start
          var card_body = $('<div/>').addClass("card-body p-0");
          var div_propery_detail = $('<div/>').addClass("pb-2");

          div_propery_detail.append('<p class=""><a href="'+base_url+'/space/'+sitevisit_enquiry[sv]['property']['slug']+'" target="_blank">'+sitevisit_enquiry[sv]['property']['name']+'</a></p>');
          var postal_code = '';
          if(sitevisit_enquiry[sv]['property']['address_postal_code'] != '' && sitevisit_enquiry[sv]['property']['address_postal_code'] != null){
            postal_code = ","+sitevisit_enquiry[sv]['property']['address_postal_code'];
          }

          div_propery_detail.append('<p class="small text-grey mt-1">'+sitevisit_enquiry[sv]['property']['full_address']+postal_code+'</p>');
          card_body.append(div_propery_detail);

          var div_start_end_date = $('<div/>').addClass("d-flex justify-content-around my-2 py-2 input-daterange");
          div_start_end_date.append('<p class="small"><span class="text-grey mr-1">Start:</span> '+sitevisit_enquiry[sv]['start_date']+'</p>');
          div_start_end_date.append('<p class="small"><span class="text-grey mr-1">End:</span>'+sitevisit_enquiry[sv]['end_date']+'</p>');
          card_body.append(div_start_end_date);

          if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
          {
                if(sitevisit_enquiry[sv]['has_landlord_set_date'] == 0 && sitevisit_enquiry[sv]['site_visit_status'] == 0) // has_landlord_set_date = 0 && site_visit_status = 0
                {
                    var from_date = $('<form/>').attr('id','frm_date_'+site_enquiry_id).attr('name','frm_date_'+site_enquiry_id).attr('method','POST');

                    var add_dates_blocks = $('<div/>').addClass("border-top pt-2");
                    add_dates_blocks.append('<p class="small">Set 3 Site Visit Date Options</p>');

                    var date_block1 =  $('<div/>').addClass("d-flex justify-content-between align-items-center mt-3");
                    date_block1.append('<p class="small text-dark-grey w-50">Date: <input type="text" class="visit-datepicker input-datepicker form-control" name="visitdate_1_'+site_enquiry_id+'" id="visitdate_1_'+site_enquiry_id+'" /></p>');
                    date_block1.append('<p class="small text-dark-grey w-50">Time: <input type="text" class="visit-timepicker input-datepicker form-control" name="visittime_1_'+site_enquiry_id+'" id="visittime_1_'+site_enquiry_id+'" /></p>');
                    add_dates_blocks.append(date_block1);

                    var date_block2 =  $('<div/>').addClass("d-flex justify-content-between align-items-center mt-3");
                    date_block2.append('<p class="small text-dark-grey w-50">Date: <input type="text" class="visit-datepicker input-datepicker form-control" name="visitdate_2_'+site_enquiry_id+'" id="visitdate_2_'+site_enquiry_id+'" /></p>');
                    date_block2.append('<p class="small text-dark-grey w-50">Time: <input type="text" class="visit-timepicker input-datepicker form-control" name="visittime_2_'+site_enquiry_id+'" id="visittime_2_'+site_enquiry_id+'"/></p>');
                    add_dates_blocks.append(date_block2);

                    var date_block3 =  $('<div/>').addClass("d-flex justify-content-between align-items-center mt-3");
                    date_block3.append('<p class="small text-dark-grey w-50">Date: <input type="text" class="visit-datepicker input-datepicker form-control" name="visitdate_3_'+site_enquiry_id+'" id="visitdate_3_'+site_enquiry_id+'" /></p>');
                    date_block3.append('<p class="small text-dark-grey w-50">Time: <input type="text" class="visit-timepicker input-datepicker form-control" name="visittime_3_'+site_enquiry_id+'" id="visittime_3_'+site_enquiry_id+'"/></p>');
                    add_dates_blocks.append(date_block3);

                    from_date.append(add_dates_blocks);
                    card_body.append(from_date);
                }
          }
          else
          {
              if(sitevisit_enquiry[sv]['has_landlord_set_date'] == 0 && sitevisit_enquiry[sv]['site_visit_status'] == 0) // has_landlord_set_date = 0 && site_visit_status = 0
              {
                  var add_dates_blocks = $('<div/>').addClass("border-top pt-2");
                  add_dates_blocks.append('<p class="small font-italic text-warning">You do not have permission to choose date and time.</p>');
                  card_body.append(add_dates_blocks);
              }
          }

         // card_body.append(add_dates_blocks);
          div_card.append(card_body);


          //Card Foot Start
          var card_foot = $('<div/>').addClass("card-foot");


          if(sitevisit_enquiry[sv]['has_landlord_set_date'] == 1 && sitevisit_enquiry[sv]['site_visit_status'] == 0) // has_landlord_set_date = 0 && site_visit_status = 0
          {
              card_foot.append('<p class="small font-italic text-warning">Awaiting '+sitevisit_enquiry[sv]['tenant_detail']['firstname']+' '+sitevisit_enquiry[sv]['tenant_detail']['surname']+' selection of a date and time.</p>');
              var div_button = $('<div/>').addClass("d-flex justify-content-between mt-2");
              if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
              {
                div_button.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-danger decline-enquiry">Decline Enquiry</a>');
              }
              div_button.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn btn-secondary view-enquiry">View</a>');
              card_foot.append(div_button);
          }
          else
          {
              var footer_class = '';
              if(sitevisit_enquiry[sv]['site_visit_status'] == 1)
              {
                  footer_class = ' mt-2';
                  card_foot.append('<span class="btn btn-dark">'+sitevisit_enquiry[sv]['site_visit_selected_date_time']+'</span>');
              }
              //div_button.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-secondary view-enquiry">View</a>');
              if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
              {
                  footer_class = ' mt-2';
                  // var div_button = $('<div/>').addClass("d-flex justify-content-between"+footer_class);
                  // div_button.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-secondary decline-enquiry">Decline</a>');
                  // card_foot.append(div_button);

                  if(sitevisit_enquiry[sv]['has_landlord_set_date'] == 0 && sitevisit_enquiry[sv]['site_visit_status'] == 0) // has_landlord_set_date = 0 && site_visit_status = 0
                  {

                    var div_button = $('<div/>').addClass("d-flex justify-content-between"+footer_class);
                    div_button.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-danger decline-enquiry">Decline Enquiry</a>');
                    div_button.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-primary send-site-visit-enquiry">Send</a>');
                    card_foot.append(div_button);
                    // var div_button2 = $('<div/>').addClass("d-flex justify-content-between"+footer_class);
                    // div_button2.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-primary send-site-visit-enquiry">Send</a>');
                    // card_foot.append(div_button2);
                  }
                  if(sitevisit_enquiry[sv]['has_landlord_set_date'] == 1 && sitevisit_enquiry[sv]['site_visit_status'] == 1) // has_landlord_set_date = 0 && site_visit_status = 0
                  {
                      var div_button = $('<div/>').addClass("d-flex justify-content-between"+footer_class);
                      div_button.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-danger decline-enquiry">Decline Enquiry</a>');
                      card_foot.append(div_button);

                      var div_button1 = $('<div/>').addClass("d-flex justify-content-between"+footer_class);
                      div_button1.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-primary send-agreement-only">Send Agreement</a>');
                      card_foot.append(div_button1);
                  }

              }


          }
          div_card.append(card_foot);
          $(div_card).appendTo("#site_visit");
          var date = new Date();
          date.setDate(date.getDate());
          $('.visit-datepicker').datepicker({
            autoclose: true,
            format: "dd-mm-yyyy",
            startDate: date,
          }).on('changeDate', function (e) {
            if($(this).valid()){
              $(this).removeClass('invalid').addClass('success');
            }
          });
          var first_date = '';
          first_date = sitevisit_enquiry[sv]['enquiry_start_date'];
          var first_dates = first_date.split('-');
          var first_year = first_dates[0];
          var first_month = first_dates[1];
          var first_day = first_dates[2];
          var newEndDate = '';
          newEndDate = first_day+'-'+first_month+'-'+first_year;
          $('#visitdate_1_'+site_enquiry_id).datepicker('setEndDate',newEndDate);
          $('#visitdate_2_'+site_enquiry_id).datepicker('setEndDate',newEndDate);
          $('#visitdate_3_'+site_enquiry_id).datepicker('setEndDate',newEndDate);

          $('.visit-timepicker').datetimepicker({
            format: 'LT',
            keepOpen: false,
            widgetPositioning: {
              horizontal: "right",
            },
            icons: {
              up: "icon icon-chevron-down-gray",
              down: "icon icon-chevron-down-gray"
            },
            debug: false
          });





    }
    $('.decline-enquiry').click(function () {
        var enquiryId = $(this).data('id');
        declineEnquiryByOwner(enquiryId);
    });
    $('.view-enquiry').click(function () {
      var enquiryId = $(this).data('id');
      viewEnquiry(enquiryId);
    });
    $('.send-agreement-only').click(function() {
      var enquiryId = $(this).data('id');
      sendAgreementToTenant(enquiryId,0);
    });
    $(".send-site-visit-enquiry").click(function(){
      var site_enquiryId = $(this).data('id');
      var site_visit_frm = $('#frm_date_'+site_enquiryId);

      var rules = new Object();
      var messages = new Object();

      var date_block1 = 'visitdate_1_'+site_enquiryId;
      rules[date_block1] = { required: true };
      messages[date_block1] = { required: 'Please select date in row 1' };

      var time_block1 = 'visittime_1_'+site_enquiryId;
      rules[time_block1] = { required: true };
      messages[time_block1] = { required: 'Please select time in row 1' };

      var date_block2 = 'visitdate_2_'+site_enquiryId;
      rules[date_block2] = { required: true };
      messages[date_block2] = { required: 'Please select date in row 2' };

      var time_block2 = 'visittime_2_'+site_enquiryId;
      rules[time_block2] = { required: true };
      messages[time_block2] = { required: 'Please select time in row 2' };

      var date_block3 = 'visitdate_3_'+site_enquiryId;
      rules[date_block3] = { required: true };
      messages[date_block3] = { required: 'Please select date in row 3' };

      var time_block3 = 'visittime_3_'+site_enquiryId;
      rules[time_block3] = { required: true };
      messages[time_block3] = { required: 'Please select time in row 3' };



      $("#frm_date_"+site_enquiryId).validate({
            rules: rules,
            messages: messages,
            errorElement: "em",
            errorPlacement: function ( error, element ) {
              error.addClass( "invalid-feedback" );
            },
            highlight: function ( element, errorClass, validClass ) {
              $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
            },
            unhighlight: function (element, errorClass, validClass) {
              $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
            }
        });

        if(site_visit_frm.valid() == true) {

          var site_visit_frm_data = site_visit_frm.serializeArray();
          site_visit_frm_data.push({ name: "enquiry_id", value: site_enquiryId });
          $.ajax({
            url: api_url+"landlord-select-site-visit-date",
            method: 'post',
            data:  site_visit_frm_data,
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
                  setTimeout(function(){
                    pipleline();
                  }, 1000);
                }
            },
            error: function (data) {
              $(".loader").hide();
              if(data.responseJSON.success == false) {
                var messageList = data.responseJSON.message;
                $.each(messageList, function(index, item) {
                    if(index == date_block1)
                         $("#"+index).addClass( "invalid-feedback is-invalid" );
                    if(index == time_block1)
                         $("#"+index).addClass( "invalid-feedback is-invalid" );

                    if(index == date_block2)
                         $("#"+index).addClass( "invalid-feedback is-invalid" );
                    if(index == time_block2)
                         $("#"+index).addClass( "invalid-feedback is-invalid" );

                    if(index == date_block3)
                         $("#"+index).addClass( "invalid-feedback is-invalid" );
                    if(index == time_block3)
                         $("#"+index).addClass( "invalid-feedback is-invalid" );
                });
              }
            }
        });
        }

    });
  }

}
function landlordPendingApproval(response)
{
  $('#pending_approval').html('');
  var pending_enquiry = response.data;
  $("#pending-count").html(pending_enquiry.length);
  if(pending_enquiry.length == 0)
  {
    var no_record_text = 'No enquiries at this stage';
    $('#pending_approval').html(no_record_text);
  }
  if(pending_enquiry.length > 0)
  {
    for(var pa=0;pa<pending_enquiry.length;pa++)
    {
          var pending_enquiry_id = pending_enquiry[pa]['id'];
          //Card Cloumn Start
          var div_card = $('<div/>').addClass("card-column");

          //Card DATE Start
          var div_created_date = $('<div/>').addClass("card-head d-flex justify-content-between");
          div_created_date.append('<p>'+pending_enquiry[pa]['created_date']+'</p>');
          div_created_date.append('<p>Ref. No:'+pending_enquiry[pa]['property']['reference_number']+'</p>');

          div_card.append(div_created_date);

          //Card DATE END

          //Card body Start
          var card_body = $('<div/>').addClass("card-body p-0");

          var div_propery_detail = $('<div/>').addClass("pb-2");
          div_propery_detail.append('<p class=""><a href="'+base_url+'/space/'+pending_enquiry[pa]['property']['slug']+'" target="_blank">'+pending_enquiry[pa]['property']['name']+'</a></p>');
          var postal_code = '';
          if(pending_enquiry[pa]['property']['address_postal_code'] != '' && pending_enquiry[pa]['property']['address_postal_code'] != null)
            postal_code = ","+pending_enquiry[pa]['property']['address_postal_code'];

          div_propery_detail.append('<p class="small text-grey mt-1">'+pending_enquiry[pa]['property']['full_address']+postal_code+'</p>');
          card_body.append(div_propery_detail);

          var div_start_end_date = $('<div/>').addClass("d-flex justify-content-around my-2 py-2");
          div_start_end_date.append('<p class="small"><span class="text-grey mr-1">Start:</span> '+pending_enquiry[pa]['start_date']+'</p>');
          div_start_end_date.append('<p class="small"><span class="text-grey mr-1">End:</span>'+pending_enquiry[pa]['end_date']+'</p>');
          card_body.append(div_start_end_date);

          var div_day_price = $('<div/>').addClass("d-flex justify-content-between border-bottom pb-3");
          div_day_price.append('<p class="btn cursor-unset">'+pending_enquiry[pa]['property_rate_details']['total_days']+' Days</p>');
          div_day_price.append('<span class="btn btn-dark cursor-unset">R '+pending_enquiry[pa]['property_rate_details']['landlord_amount_with_vat']+'</span>');
          card_body.append(div_day_price);

          var site_visit_status = '';
          if(pending_enquiry[pa]['site_visit'] == 1)
              site_visit_status = 'Yes';
          if(pending_enquiry[pa]['site_visit'] == 0)
              site_visit_status = 'No';
          var div_site_visit = $('<div/>').addClass("d-flex justify-content-between align-items-center py-2 mt-1");
          div_site_visit.append('<p class="font-weight-medium text-dark-grey">Site visit?</p>');
          div_site_visit.append('<p class="font-weight-bold ml-2">'+site_visit_status+'</p>');
          card_body.append(div_site_visit);

          // var div_tenant_detail = $('<div/>').addClass("border-top pt-2 pb-1");
          // div_tenant_detail.append('<p class="font-weight-medium">Tenant Details:</p>');

          // var div_tenant_name_mobile = $('<div/>').addClass("d-flex justify-content-between");
          // div_tenant_name_mobile.append('<p class="small text-grey">'+pending_enquiry[pa]['tenant_detail']['firstname']+' '+pending_enquiry[pa]['tenant_detail']['surname']+'</p>');
          // div_tenant_name_mobile.append('<p class="small text-grey">'+pending_enquiry[pa]['tenant_detail']['mobile']+'</p>');
          // div_tenant_detail.append(div_tenant_name_mobile);

          // div_tenant_detail.append('<p class="small text-grey mt-1">'+pending_enquiry[pa]['tenant_detail']['email']+'</p>');

          // card_body.append(div_tenant_detail);

          div_card.append(card_body);
          //Card body END
          //Card Foot Start
          var card_foot = $('<div/>').addClass("card-foot");


          var div_button = $('<div/>').addClass("d-flex justify-content-between");
          div_button.append('<a href="javascript:void(0)" data-id="'+pending_enquiry[pa]['id']+'" class="btn btn-secondary view-enquiry">View</a>');
          if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
          {
            div_button.append('<a href="javascript:void(0)" data-id="'+pending_enquiry[pa]['id']+'" class="btn btn-danger decline-enquiry">Decline</a>');
            if(pending_enquiry[pa]['site_visit'] == 1)
            {
                div_button.append('<a href="javascript:void(0)" data-id="'+pending_enquiry[pa]['id']+'" class="btn btn-primary accept-enquiry">accept</a>');
            }
            // if(pending_enquiry[pa]['site_visit'] == 0)
            // {
            //   div_button.append('<a href="javascript:void(0)" data-id="'+pending_enquiry[pa]['id']+'" class="btn btn-primary accept-enquiry">accept & send agreement</a>');
            // }
          }
          card_foot.append(div_button);
          if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
          {
              if(pending_enquiry[pa]['site_visit'] == 0)
              {
                var div_button1 = $('<div/>').addClass("d-flex justify-content-between mt-2");
                div_button1.append('<a href="javascript:void(0)" data-id="'+pending_enquiry[pa]['id']+'" class="btn btn-primary accept-and-send-agreement">accept & send agreement</a>');
                card_foot.append(div_button1);
              }
          }
          div_card.append(card_foot);
          //Card foot End

          $(div_card).appendTo("#pending_approval");

          //Card Cloumn End
    }

    $('.accept-and-send-agreement').click(function() {
        var enquiryId = $(this).data('id');
        sendAgreementToTenant(enquiryId,1);
    });

    $('.decline-enquiry').click(function () {
        var enquiryId = $(this).data('id');
        declineEnquiryByOwner(enquiryId);
    });
    $('.accept-enquiry').click(function () {
        var enquiryId = $(this).data('id');
        acceptEnquiryByOwner(enquiryId);
    });


    $('.view-enquiry').click(function () {
      var enquiryId = $(this).data('id');
      viewEnquiry(enquiryId);
    });
  }

  $(".loader").hide();
}


$("#decline-enquiry-by-owner").click(function() {
  var entityId = $('#modalDeclineConfimation #enquiryId').val();
  var decline_enquiry_frm = $('#decline_enquiry_frm');
  decline_enquiry_frm.validate( {
      rules: {
        decline_reason:'required',
      },
      messages: {
        decline_reason: "Please enter decline reason",
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

  if(decline_enquiry_frm.valid() == true) {
      var formData = decline_enquiry_frm.serializeArray();

      $.ajax({
          url: api_url+"landlord-decline-enquiry",
          method: 'post',
          data:  formData,
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

                $('#modalDeclineConfimation').modal('hide');

                setTimeout(function(){
                  pipleline();
                }, 1000);
              }
          },
          error: function (data) {
            $(".loader").hide();
            $('#modalDeclineConfimation').modal('hide');
          }
      });
  }
});


$("#accept-enquiry-by-owner").click(function() {
   var enquiryId = $('#modalAcceptConfimation #enquiryId').val();

   $.ajax({
    url: api_url+"landlord-accept-enquiry",
    method: 'post',
    data: {enquiry_id: enquiryId},
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
          $('#modalAcceptConfimation').modal('hide');
          setTimeout(function(){
            pipleline();
          }, 1000);
        }
    },
    error: function (data) {
      $(".loader").hide();
      $('#modalAcceptConfimation').modal('hide');
    }
});
});

$("#agreement").change(function(){
    var agreement_id = $("#modelAgreement #agreement").val();
    $('#modelAgreement #agreement_content').html('');
    if(agreement_id > 0)
    {
        var enquiry_id = $("#modelAgreement #enquiryId").val();
        $.ajax({
                url: api_url+"landlord-tenant-rental-agreement",
                method: 'post',
                data: {enquiry_id: enquiry_id, agreement_id:agreement_id},
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
                      $('#modelAgreement #agreement_content').html('');
                      $('#modelAgreement #agreement_content').html(data.data);
                    }
                },
                error: function (data) {
                  $(".loader").hide();
                }
            });
    }
});

function declineEnquiryByOwner(enquiryId)
{
    $('#modalDeclineConfimation #enquiryId').val('');
    $('#modalDeclineConfimation #enquiryId').val(enquiryId);
    $('#modalDeclineConfimation').modal('show');
}

function viewEnquiry(enquiryId)
{
  $.ajax({
    url: api_url+"enquiry/"+enquiryId,
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


        $("#entity_individually").hide();
        $("#entity_behalf").hide();

        var enquiry_detail = data.data;

        $("#modalEnquirydetail #enquiry_created_date").html('');
        $("#modalEnquirydetail #enquiry_address").html('');
        $("#modalEnquirydetail #enquiry_property_name").html('');
        $("#modalEnquirydetail #enquiry_property_size").html('');
        $("#modalEnquirydetail #enquiry_price").html('');
        $("#modalEnquirydetail #enquiry_days").html('');
        $("#modalEnquirydetail #enquiry_start_date").html('');
        $("#modalEnquirydetail #enquiry_end_date").html('');
        $("#modalEnquirydetail #entity_name").html('');
        $("#modalEnquirydetail #entity_vat").html('');
        $("#modalEnquirydetail #website_url").html('');
        $("#modalEnquirydetail #space_used_for").html('');
        $("#modalEnquirydetail #project_name").html('');
        $("#modalEnquirydetail #project_desc").html('');
        $("#modalEnquirydetail #space_look_like").html('');
        $("#modalEnquirydetail #enquiry_iamges").html('');
        $("#modalEnquirydetail #enquiry_property_name").removeAttr('href');

        $("#modalEnquirydetail #tenant_name").html('');
        $("#modalEnquirydetail #tenant_mobile").html('');
        $("#modalEnquirydetail #tenant_email").html('');
        $("#modalEnquirydetail #property_images").html('');
        $("#modalEnquirydetail #price_list").html('');


        if(enquiry_detail['bookingentity'] == 0)
            $("#entity_individually").show();

        if(enquiry_detail['bookingentity'] == 1)
        {
            $("#entity_behalf").show();
            $("#modalEnquirydetail #entity_name").html(enquiry_detail['entityname']);
            $("#modalEnquirydetail #entity_vat").html(enquiry_detail['vatnumber']);


            if(enquiry_detail['dontwebsite'] == 1)
                $("#website_detail").hide();
            if(enquiry_detail['dontwebsite'] == 0)
            {
                $("#website_detail").show();
                $("#website_url").html(enquiry_detail['website']);
            }
        }

        var postal_code = '';
        if(enquiry_detail['property']['address_postal_code'] != '' && enquiry_detail['property']['address_postal_code'] != null)
          postal_code = ","+enquiry_detail['property']['address_postal_code'];

        $("#modalEnquirydetail #enquiry_created_date").html(enquiry_detail.created_date);
        $("#modalEnquirydetail #enquiry_property_name").html(enquiry_detail['property']['name']);

        $("#modalEnquirydetail #enquiry_property_name").attr('href',base_url+'/space/'+enquiry_detail['property']['slug']);
        $("#modalEnquirydetail #enquiry_address").html(enquiry_detail['property']['full_address']+postal_code);
        $("#modalEnquirydetail #enquiry_property_size").html(enquiry_detail['property']['property_size']+' '+enquiry_detail['property']['property_size_type']);
      //  $("#modalEnquirydetail #enquiry_price").html(enquiry_detail['property']['property_size']+' '+enquiry_detail['property']['property_size_type']);
        $("#modalEnquirydetail #enquiry_price").html(enquiry_detail['property_rate_details']['landlord_amount_with_vat']);
        $("#modalEnquirydetail #enquiry_days").html(enquiry_detail['property_rate_details']['total_days']);

        $("#modalEnquirydetail #enquiry_start_date").html(enquiry_detail['start_date']);
        $("#modalEnquirydetail #enquiry_end_date").html(enquiry_detail['end_date']);
        $("#modalEnquirydetail #project_name").html(enquiry_detail['project_name']);
        $("#modalEnquirydetail #project_desc").html( $.parseHTML(enquiry_detail['project_desc']));
        $("#modalEnquirydetail #space_look_like").html($.parseHTML(enquiry_detail['talkspaceowner']));

        $("#modalEnquirydetail #tenant_name").html(enquiry_detail['tenant_detail']['firstname']+' '+enquiry_detail['tenant_detail']['surname']);
        $("#modalEnquirydetail #tenant_mobile").html(enquiry_detail['tenant_detail']['mobile']);
        $("#modalEnquirydetail #tenant_email").html(enquiry_detail['tenant_detail']['email']);

        if(enquiry_detail['property_is_daily'] == 1)
            $("#modalEnquirydetail #price_list").append('<p class="space-price">R '+enquiry_detail['property_daily_rate']+' <span class="space-size">per day</span></p>');
        if(enquiry_detail['property_is_weekly'] == 1)
            $("#modalEnquirydetail #price_list").append('<p class="space-price">R '+enquiry_detail['property_weekly_rate']+' <span class="space-size">per week</span></p>');
        if(enquiry_detail['property_is_monthly'] == 1)
            $("#modalEnquirydetail #price_list").append('<p class="space-price">R '+enquiry_detail['property_monthly_rate']+' <span class="space-size">per month</span></p>');

        var space_used_for = enquiry_detail['spaceUsedFor'];
        for(sp=0;sp<space_used_for.length;sp++)
        {
            $("#space_used_for").append('<a href="javascript:void(0)" class="text-grey text-center"><span><i class="icon '+space_used_for[sp]['space_used_for_image_class']+' d-block mb-3"></i></span> '+space_used_for[sp]['title']+'</a>');
        }
        var property_images = enquiry_detail['property']['spacePropertyImages'];
        for(pi=0;pi<property_images.length;pi++)
        {
           var  image_type = property_images[pi]['property_image_type'];
           if(image_type == 1)
           {
                // var image_name = property_images[pi]['property_image_path'];
                // if(image_name.includes("_collage.jpg") == true)
                //     $("#modalEnquirydetail #property_images").append('<div class="space-image-item"><img src="'+property_images[pi]['property_image_path']+'" class="img-fluid" alt="'+property_images[pi]['property_image_name']+'"/></div>');
           }
           if(image_type == 2)
           {
                $("#modalEnquirydetail #property_images").append('<div class="space-image-item"><img src="'+property_images[pi]['property_image_path']+'" class="img-fluid" alt="'+property_images[pi]['property_image_name']+'"/></div>');
           }
        }

        var enquiry_images = enquiry_detail['spaceEnquiryImages'];

        for(si=0;si<enquiry_images.length;si++)
        {
            $("#modalEnquirydetail #enquiry_iamges").append('<div><img src="'+enquiry_images[si]['enquiry_image_path']+'" class="img-fluid rounded w-100"/></div>');
        }

        $('#modalEnquirydetail').modal('show');

        $("#modalEnquirydetail .spacemodal-carousel").slick({
          autoplay: false,
          dots: true,
          adaptiveHeight: true,
          slidesToShow: 3,
          prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon-small-chevron-right'></i></div>",
          nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-small-chevron-left'></i></div>",
          responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          ]
        });

        setTimeout(function() {

          var $modalRentalSlider = $('#modalEnquirydetail .spaceinnerRental-carousel');

          if($modalRentalSlider.hasClass('slick-initialized')) {
            $modalRentalSlider.unslick();
          }

          $modalRentalSlider.slick({
            autoplay: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            adaptiveHeight: true,
            prevArrow: "<div class='slick-arrow-parent right'><i class='icon icon-small-chevron-right'></i></div>",
            nextArrow: "<div class='slick-arrow-parent left'><i class='icon icon-small-chevron-left'></i></div>",
          });

          $modalRentalSlider.slick("setPosition", 0);

          $(".modal").on("hidden.bs.modal", function() {
            $(".slick-slider").slick('destroy').html("");
          });

        },200);
        var enquiryDisableDates = [];
        if(enquiry_detail['property']['spaceUnavailabeDates'] != '')
             enquiryDisableDates = enquiry_detail['property']['spaceUnavailabeDates'];
        if($.fn.datepicker) {
         $('#availableDateSingle .range-start').datepicker({
            inline: true,
            format: "dd-mm-yyyy",
            maxViewMode: 0,
            datesDisabled: enquiryDisableDates,
            templates: {
              leftArrow: "<div class=\"text-center\"><i class=\"icon icon-small-chevron-right\"></i></div>",
              rightArrow: "<div class=\"text-center\"><i class=\"icon icon-small-chevron-left\"></i></div>"
            }
          });
        }


        $("#modalEnquirydetail .spacemodal-carousel").slick("setPosition", 0);
    },
    error: function (data) {
      $(".loader").hide();
    }
});
}

function acceptEnquiryByOwner(enquiryId)
{
  $('#modalAcceptConfimation #enquiryId').val('');
  $('#modalAcceptConfimation #enquiryId').val(enquiryId);
  $('#modalAcceptConfimation').modal('show');
}

function sendAgreementToTenant(enquiryId,is_accept)
{
    $('#modelAgreement #enquiryId').val('');
    $('#modelAgreement #enquiryId').val(enquiryId);

    $('#modelAgreement #is_accept').val('');
    $('#modelAgreement #is_accept').val(is_accept);

    $("#modelAgreement #agreement").val('');

    $("#modelAgreement #agreement_content").html('');

    $('#modelAgreement').modal('show');
    $('#agreement_error').hide();
    $('.select2').select2({
      width: "100%",
      minimumResultsForSearch: -1
    });

    $('b[role="presentation"]').hide();
    $('.select2-selection__arrow').append('<i class="icon icon-chevron-down-gray"></i>');
}

$('#send_agreement_to_tenant').click(function(){
  var frmAgreement = $('#frmAgreement');
  frmAgreement.validate( {
    rules: {
      agreement:'required',
    },
    messages: {
      agreement: "Please select agreement",
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

  if (frmAgreement.valid() == true) {
    var formData = frmAgreement.serializeArray();
    $.ajax({
          url: api_url + "send-agreement-to-tenant",
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
                $('#modelAgreement').modal('hide');
                setTimeout(function(){
                  pipleline();
                }, 1000);
              }
          },
          error: function (data) {
            $(".loader").hide();
            if(data.responseJSON.success == false) {
              var messageList = data.responseJSON.message;
              $.each(messageList, function(index, item) {
                  if(index == 'agreement')
                  {
                    $('#agreement_error').show();
                    $('#agreement_error').html(item);
                  }
              });
            }
          }
  });
 }
});

function landlordLegalAgreement(response)
{
  $('#approve_legal_agreement').html('');
  var agreement_enquiry = response.data;

  if(agreement_enquiry.length == 0)
  {
    var no_record_text = 'No enquiries at this stage';
    $('#approve_legal_agreement').html(no_record_text);
  }
  if(agreement_enquiry.length > 0)
  {
    for(var ae=0;ae<agreement_enquiry.length;ae++)
    {
          var agreement_enquiry_id = agreement_enquiry[ae]['id'];
          //Card Cloumn Start
          var div_card = $('<div/>').addClass("card-column");

          //Card DATE Start
          var div_created_date = $('<div/>').addClass("card-head d-flex justify-content-between");
          div_created_date.append('<p>'+agreement_enquiry[ae]['created_date']+'</p>');
          div_created_date.append('<p>Ref. No:'+agreement_enquiry[ae]['property']['reference_number']+'</p>');

          div_card.append(div_created_date);

          //Card DATE END

          //Card body Start
          var card_body = $('<div/>').addClass("card-body p-0");

          var div_propery_detail = $('<div/>').addClass("pb-2");
          div_propery_detail.append('<p class=""><a href="'+base_url+'/space/'+agreement_enquiry[ae]['property']['slug']+'" target="_blank">'+agreement_enquiry[ae]['property']['name']+'</a></p>');
          var postal_code = '';
          if(agreement_enquiry[ae]['property']['address_postal_code'] != '' && agreement_enquiry[ae]['property']['address_postal_code'] != null)
            postal_code = ","+agreement_enquiry[ae]['property']['address_postal_code'];

          div_propery_detail.append('<p class="small text-grey mt-1">'+agreement_enquiry[ae]['property']['full_address']+postal_code+'</p>');
          card_body.append(div_propery_detail);

          var div_start_end_date = $('<div/>').addClass("d-flex justify-content-around my-2 py-2");
          div_start_end_date.append('<p class="small"><span class="text-grey mr-1">Start:</span> '+agreement_enquiry[ae]['start_date']+'</p>');
          div_start_end_date.append('<p class="small"><span class="text-grey mr-1">End:</span>'+agreement_enquiry[ae]['end_date']+'</p>');
          card_body.append(div_start_end_date);

          var div_day_price = $('<div/>').addClass("d-flex justify-content-between border-bottom pb-3");
          div_day_price.append('<p class="btn cursor-unset">'+agreement_enquiry[ae]['property_rate_details']['total_days']+' Days</p>');
          div_day_price.append('<span class="btn btn-dark cursor-unset">R '+agreement_enquiry[ae]['property_rate_details']['landlord_amount_with_vat']+'</span>');
          card_body.append(div_day_price);

          var site_visit_status = '';
          if(agreement_enquiry[ae]['site_visit'] == 1)
              site_visit_status = 'Yes';
          if(agreement_enquiry[ae]['site_visit'] == 0)
              site_visit_status = 'No';
          var div_site_visit = $('<div/>').addClass("d-flex justify-content-between align-items-center py-2 mt-1");
          div_site_visit.append('<p class="font-weight-medium text-dark-grey">Site visit?</p>');
          div_site_visit.append('<p class="font-weight-bold ml-2">'+site_visit_status+'</p>');
          card_body.append(div_site_visit);

          var div_tenant_detail = $('<div/>').addClass("border-top pt-2 pb-1");
          div_tenant_detail.append('<p class="font-weight-medium">Tenant Details:</p>');

          var div_tenant_name_mobile = $('<div/>').addClass("d-flex justify-content-between");
          div_tenant_name_mobile.append('<p class="small text-grey">'+agreement_enquiry[ae]['tenant_detail']['firstname']+' '+agreement_enquiry[ae]['tenant_detail']['surname']+'</p>');
          div_tenant_name_mobile.append('<p class="small text-grey">'+agreement_enquiry[ae]['tenant_detail']['mobile']+'</p>');
          div_tenant_detail.append(div_tenant_name_mobile);

          div_tenant_detail.append('<p class="small text-grey mt-1">'+agreement_enquiry[ae]['tenant_detail']['email']+'</p>');

          card_body.append(div_tenant_detail);

          div_card.append(card_body);
          //Card body END
          //Card Foot Start
          var card_foot = $('<div/>').addClass("card-foot");
          var footer_class = '';
          if(agreement_enquiry[ae]['is_agreement_send_to_landlord'] == 1 && agreement_enquiry[ae]['is_sign_by_landlord'] == 0)
          {
              footer_class  = ' mt-2';
              var legal_agreement_div = $('<div/>').addClass("d-flex justify-content-between align-items-center");
              legal_agreement_div.append('<p class="text-primary small font-weight-medium">Legal Agreement is ready and sent to your register email.Please signed it.</p>');
              card_foot.append(legal_agreement_div);
          }
          if(agreement_enquiry[ae]['is_agreement_send_to_tenant'] == 1 && agreement_enquiry[ae]['is_sign_by_landlord'] == 1)
          {
              footer_class  = ' mt-2';
              var legal_agreement_div = $('<div/>').addClass("d-flex justify-content-between align-items-center");
              legal_agreement_div.append('<p class="text-warning small font-weight-medium">Awaiting '+agreement_enquiry[ae]['tenant_detail']['firstname']+' '+agreement_enquiry[ae]['tenant_detail']['surname']+' to signed it.</p>');
              card_foot.append(legal_agreement_div);
          }
          var div_button = $('<div/>').addClass("d-flex justify-content-between"+footer_class);
          div_button.append('<a href="javascript:void(0)" data-id="'+agreement_enquiry[ae]['id']+'" class="btn btn-secondary view-enquiry">View</a>');
          if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
          {
            div_button.append('<a href="javascript:void(0)" data-id="'+agreement_enquiry[ae]['id']+'" class="btn btn-danger decline-enquiry">Decline</a>');

          }
          card_foot.append(div_button);

          div_card.append(card_foot);
          //Card foot End

          $(div_card).appendTo("#approve_legal_agreement");

          //Card Cloumn End
    }
    $('.decline-enquiry').click(function () {
        var enquiryId = $(this).data('id');
        declineEnquiryByOwner(enquiryId);
    });
    $('.accept-enquiry').click(function () {
        var enquiryId = $(this).data('id');
        acceptEnquiryByOwner(enquiryId);
    });


    $('.view-enquiry').click(function () {
      var enquiryId = $(this).data('id');
      viewEnquiry(enquiryId);
    });
  }

  $(".loader").hide();
}

function landlordPayment(response)
{
  $('#payment').html('');
  var payment_enquiry = response.data;

  if(payment_enquiry.length == 0)
  {
    var no_record_text = 'No enquiries at this stage';
    $('#payment').html(no_record_text);
  }
  if(payment_enquiry.length > 0)
  {
    for(var pe=0;pe<payment_enquiry.length;pe++)
    {
          var agreement_enquiry_id = payment_enquiry[pe]['id'];
          //Card Cloumn Start
          var card_class = '';
          var text_color = 'text-grey';
          var day_class = '';
          var agreement_view_class = 'text-primary';
          var date_class = 'small';

          if(payment_enquiry[pe]['is_payment_apporved_by_admin'] == 1)
          {
              card_class = ' bg-primary';
              text_color = 'text-white';
              day_class = ' btn-primary-light font-weight-bold';
              agreement_view_class = 'text-white';
              date_class = 'btn btn-primary-light';
          }
          var div_card = $('<div/>').addClass("card-column"+card_class);

          //Card DATE Start
          var div_created_date = $('<div/>').addClass("card-head d-flex justify-content-between");
          div_created_date.append('<p>'+payment_enquiry[pe]['created_date']+'</p>');
          div_created_date.append('<p>Ref. No:'+payment_enquiry[pe]['property']['reference_number']+'</p>');

          div_card.append(div_created_date);

          //Card DATE END

          //Card body Start
          var card_body = $('<div/>').addClass("card-body p-0");

          var div_propery_detail = $('<div/>').addClass("pb-2");
          div_propery_detail.append('<p class=""><a href="'+base_url+'/space/'+payment_enquiry[pe]['property']['slug']+'" target="_blank">'+payment_enquiry[pe]['property']['name']+'</a></p>');
          var postal_code = '';
          if(payment_enquiry[pe]['property']['address_postal_code'] != '' && payment_enquiry[pe]['property']['address_postal_code'] != null)
            postal_code = ","+payment_enquiry[pe]['property']['address_postal_code'];

          div_propery_detail.append('<p class="small '+text_color+' mt-1">'+payment_enquiry[pe]['property']['full_address']+postal_code+'</p>');
          card_body.append(div_propery_detail);

          var div_start_end_date = $('<div/>').addClass("d-flex justify-content-around my-2 py-2");
          div_start_end_date.append('<p class="cursor-unset '+date_class+'"><span class="'+text_color+' mr-1">Start:</span> '+payment_enquiry[pe]['start_date']+'</p>');
          div_start_end_date.append('<p class="cursor-unset '+date_class+'"><span class="'+text_color+' mr-1">End:</span>'+payment_enquiry[pe]['end_date']+'</p>');
          card_body.append(div_start_end_date);

          var div_day_price = $('<div/>').addClass("d-flex justify-content-between pb-3");
          div_day_price.append('<p class="btn cursor-unset '+day_class+'">'+payment_enquiry[pe]['property_rate_details']['total_days']+' Days</p>');
          div_day_price.append('<span class="btn btn-dark cursor-unset">R '+payment_enquiry[pe]['property_rate_details']['landlord_amount_with_vat']+'</span>');
          card_body.append(div_day_price);

          var div_tenant_detail = $('<div/>').addClass("border-top pt-2 pb-1");
          div_tenant_detail.append('<p class="font-weight-medium">Tenant Details:</p>');

          var div_tenant_name_mobile = $('<div/>').addClass("d-flex justify-content-between");
          div_tenant_name_mobile.append('<p class="small '+text_color+'">'+payment_enquiry[pe]['tenant_detail']['firstname']+' '+payment_enquiry[pe]['tenant_detail']['surname']+'</p>');
          div_tenant_name_mobile.append('<p class="small '+text_color+'">'+payment_enquiry[pe]['tenant_detail']['mobile']+'</p>');
          div_tenant_detail.append(div_tenant_name_mobile);

          div_tenant_detail.append('<p class="small '+text_color+' mt-1">'+payment_enquiry[pe]['tenant_detail']['email']+'</p>');

          card_body.append(div_tenant_detail);

          div_card.append(card_body);
          //Card body END
          //Card Foot Start
          var card_foot = $('<div/>').addClass("card-foot");

          if(payment_enquiry[pe]['is_payment_done_by_tenant'] == 0 || payment_enquiry[pe]['is_payment_apporved_by_admin'] == 0 )
          {
              var payment_div = $('<div/>').addClass("d-flex justify-content-between align-items-center");
              payment_div.append('<p class="text-warning small font-weight-medium">Awaiting payment.</p>');
              card_foot.append(payment_div);
          }

          var div_button = $('<div/>').addClass("d-flex justify-content-between mt-2");
          div_button.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" class="btn btn-secondary view-enquiry">View</a>');
          if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
          {
            if( payment_enquiry[pe]['is_payment_apporved_by_admin'] == 0)
              div_button.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" class="btn btn-primary view-agreement">View signed agreement</a>');

          }
          if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
          {
              if( payment_enquiry[pe]['is_payment_apporved_by_admin'] == 1)
              {
                 div_button.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" class="btn btn-light confirm-payment">Confirm</a>');
                 div_button.append('<span class="btn btn-primary"><i class="icon icon-paid-white mr-2"></i> paid</span>');
              }
          }

        //  div_button.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" class="btn btn-primary view-agreement">View signed agreement</a>');
          card_foot.append(div_button);

          if( payment_enquiry[pe]['is_payment_apporved_by_admin'] == 1)
          {
              if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
              {
                var div_button1 = $('<div/>').addClass("d-flex justify-content-between mt-2");
                div_button1.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" class="btn btn-primary view-agreement">View signed agreement</a>');
                div_button1.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" class="btn btn-danger decline-enquiry">Decline</a>');
                card_foot.append(div_button1);
              }
          }



          div_card.append(card_foot);
          //Card foot End

          $(div_card).appendTo("#payment");

          //Card Cloumn End
    }

    $('.decline-enquiry').click(function () {
      var enquiryId = $(this).data('id');
      declineEnquiryByOwner(enquiryId);
    });

    $('.view-agreement').click(function(){
      var enquiryId = $(this).data('id');
      viewAgreement(enquiryId);
    });

    $('.view-enquiry').click(function () {
      var enquiryId = $(this).data('id');
      viewEnquiry(enquiryId);
    });

    $('.confirm-payment').click(function () {
      var enquiryId = $(this).data('id');
      confirmPayment(enquiryId);
    });

  }

  $(".loader").hide();
}

function viewAgreement(enquiryId)
{
  $.ajax({
    url: api_url+"view-rental-agreement",
    method: 'POST',
    data:{enquiry_id : enquiryId},
    headers: {
      'Authorization': 'Bearer '+ token,
      "Accept": "application/json",
    },
    beforeSend: function() {
      $('.loader').show().css('opacity','0.4');
    },
    success: function (data) {
        $(".loader").hide();
        $("#modalViewAgreement").modal('show');

        $("#iframe_agreement").attr('src',data.data);
    },
    error: function (data) {
      $(".loader").hide();
    }
});
}

function confirmPayment(enquiryId)
{
  $('#modalPaymentConfimation #enquiryId').val('');
  $('#modalPaymentConfimation #enquiryId').val(enquiryId);
  $('#modalPaymentConfimation').modal('show');
}
$("#confirm-payment-by-owner").click(function(){
    var enquiry_id = $("#modalPaymentConfimation #enquiryId").val();
    $.ajax({
        url: api_url+"payment-confirm-by-owner",
        method: 'post',
        data: {enquiry_id: enquiry_id},
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
              $('#modalPaymentConfimation').modal('hide');
              setTimeout(function(){
                pipleline();
              }, 1000);
            }
        },
        error: function (data) {
          $(".loader").hide();
          $('#modalPaymentConfimation').modal('hide');
        }
    });
});


function landlordConfirm(response)
{
  $('#confirmed').html('');
  var confirmed_enquiry = response.data;

  if(confirmed_enquiry.length == 0)
  {
    var no_record_text = 'No enquiries at this stage';
    $('#confirmed').html(no_record_text);
  }
  if(confirmed_enquiry.length > 0)
  {
    for(var ce=0;ce<confirmed_enquiry.length;ce++)
    {
          var agreement_enquiry_id = confirmed_enquiry[ce]['id'];
          //Card Cloumn Start
          var div_card = $('<div/>').addClass("card-column");

          //Card DATE Start
          var div_created_date = $('<div/>').addClass("card-head d-flex justify-content-between");
          div_created_date.append('<p>'+confirmed_enquiry[ce]['created_date']+'</p>');
          div_created_date.append('<p>Ref. No:'+confirmed_enquiry[ce]['property']['reference_number']+'</p>');

          div_card.append(div_created_date);

          //Card DATE END

          //Card body Start
          var card_body = $('<div/>').addClass("card-body p-0");

          var div_propery_detail = $('<div/>').addClass("pb-2");
          div_propery_detail.append('<p class=""><a href="'+base_url+'/space/'+confirmed_enquiry[ce]['property']['slug']+'" target="_blank">'+confirmed_enquiry[ce]['property']['name']+'</a></p>');
          var postal_code = '';
          if(confirmed_enquiry[ce]['property']['address_postal_code'] != '' && confirmed_enquiry[ce]['property']['address_postal_code'] != null)
            postal_code = ","+confirmed_enquiry[ce]['property']['address_postal_code'];

          div_propery_detail.append('<p class="small text-grey mt-1">'+confirmed_enquiry[ce]['property']['full_address']+postal_code+'</p>');
          card_body.append(div_propery_detail);

          var div_start_end_date = $('<div/>').addClass("d-flex justify-content-around my-2 py-2");
          div_start_end_date.append('<p class="small"><span class="text-grey mr-1">Start:</span> '+confirmed_enquiry[ce]['start_date']+'</p>');
          div_start_end_date.append('<p class="small"><span class="text-grey mr-1">End:</span>'+confirmed_enquiry[ce]['end_date']+'</p>');
          card_body.append(div_start_end_date);

          var div_day_price = $('<div/>').addClass("d-flex justify-content-between pb-3");
          div_day_price.append('<p class="btn cursor-unset">'+confirmed_enquiry[ce]['property_rate_details']['total_days']+' Days</p>');
          div_day_price.append('<span class="btn btn-dark cursor-unset">R '+confirmed_enquiry[ce]['property_rate_details']['landlord_amount_with_vat']+'</span>');
          card_body.append(div_day_price);

          var div_tenant_detail = $('<div/>').addClass("border-top pt-2 pb-1");
          div_tenant_detail.append('<p class="font-weight-medium">Tenant Details:</p>');

          var div_tenant_name_mobile = $('<div/>').addClass("d-flex justify-content-between");
          div_tenant_name_mobile.append('<p class="small text-grey">'+confirmed_enquiry[ce]['tenant_detail']['firstname']+' '+confirmed_enquiry[ce]['tenant_detail']['surname']+'</p>');
          div_tenant_name_mobile.append('<p class="small text-grey">'+confirmed_enquiry[ce]['tenant_detail']['mobile']+'</p>');
          div_tenant_detail.append(div_tenant_name_mobile);

          div_tenant_detail.append('<p class="small text-grey mt-1">'+confirmed_enquiry[ce]['tenant_detail']['email']+'</p>');

          card_body.append(div_tenant_detail);

          div_card.append(card_body);
          //Card body END
          //Card Foot Start
          var card_foot = $('<div/>').addClass("card-foot");

          var div_button = $('<div/>').addClass("d-flex align-items-center justify-content-between mt-2");
          div_button.append('<a href="javascript:void(0)" data-id="'+confirmed_enquiry[ce]['id']+'" class="btn btn-secondary btn-auto view-enquiry">View</a>');
          div_button.append('<p class="font-weight-bold text-uppercase text-dark small text-capitalize"><span class="font-weight-normal text-dark-grey mr-2">Leasing starts in</span>'+confirmed_enquiry[ce]['lease_start_in_days']+' Days</p>');


          card_foot.append(div_button);

          div_card.append(card_foot);
          //Card foot End

          $(div_card).appendTo("#confirmed");

          //Card Cloumn End
    }


    $('.view-enquiry').click(function () {
      var enquiryId = $(this).data('id');
      viewEnquiry(enquiryId);
    });
  }

  $(".loader").hide();
}
