$(document).ready( function () {
     pipleline();
});

function pipleline()
{
    getPendingApprovalList();
    getSiteVisitList();
    getApproveLegalAgreementList();
    getPaymentList();
    getConfirmedList();
    getWithdrawDeclinedList();
}

function getPendingApprovalList()
{
    $.ajax({
      url: api_url+"tenant-pending-apporval",
      method: 'GET',
      data: {},
      headers: {
        'Authorization': 'Bearer '+ token,
      },
      beforeSend: function() {
        $('.loader').show().css('opacity','0.4');
      },
      success: function (response) {
         tenantPendingApproval(response);
          // $( "#pending_approval").after('');

          // var enquiry_details = response.data;

          // if(enquiry_details.length > 0)
          // {
          //     for(var e=0;e<enquiry_details.length;e++)
          //     {

          //     }
          // }
      },
      error: function (response) {
        $(".loader").hide();
      }
  });
}

function getSiteVisitList()
{
  $.ajax({
        url: api_url+"tenant-site-visit",
        method: 'GET',
        data: {},
        headers: {
          'Authorization': 'Bearer '+ token,
        },
        beforeSend: function() {
          $('.loader').show().css('opacity','0.4');
        },
        success: function (response) {
          tenantSiteVisit(response);
        },
        error: function (response) {
          $(".loader").hide();
        }
    });
}

function getApproveLegalAgreementList()
{
  $.ajax({
            url: api_url+"tenant-approved-legal-agreement",
            method: 'GET',
            data: {},
            headers: {
              'Authorization': 'Bearer '+ token,
            },
            beforeSend: function() {
              $('.loader').show().css('opacity','0.4');
            },
            success: function (response) {
              tenantAgreement(response);
            },
            error: function (response) {
              $(".loader").hide();
            }
        });

}

function getPaymentList()
{
      $.ajax({
            url: api_url+"tenant-payment-pipeline",
            method: 'GET',
            data: {},
            headers: {
              'Authorization': 'Bearer '+ token,
            },
            beforeSend: function() {
              $('.loader').show().css('opacity','0.4');
            },
            success: function (response) {
              tenantPayment(response);
            },
            error: function (response) {
              $(".loader").hide();
            }
        });
}

function getConfirmedList()
{
      $.ajax({
            url: api_url+"tenant-confirm-pipeline",
            method: 'GET',
            data: {},
            headers: {
              'Authorization': 'Bearer '+ token,
            },
            beforeSend: function() {
              $('.loader').show().css('opacity','0.4');
            },
            success: function (response) {
              tenantConfirm(response);
            },
            error: function (response) {
              $(".loader").hide();
            }
        });
}

function getWithdrawDeclinedList()
{
      $.ajax({
            url: api_url+"tenant-declined-pipeline",
            method: 'GET',
            data: {},
            headers: {
              'Authorization': 'Bearer '+ token,
            },
            beforeSend: function() {
              $('.loader').show().css('opacity','0.4');
            },
            success: function (response) {
              tenantWithdrawDeclined(response);
            },
            error: function (response) {
              $(".loader").hide();
            }
        });
}
function tenantPayment(response)
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
          var card_class = '';
          var text_color = 'text-grey';
          var day_class = '';
          var legal_class = 'text-dark-grey';
          var agreement_view_class = 'text-primary';
          var date_class = 'small';

          var landlord_name = payment_enquiry[pe]['property']['space_owner_contact_person'];
          if(payment_enquiry[pe]['is_payment_done_by_tenant'] == 1)
          {
              card_class = ' bg-primary';
              text_color = 'text-white';
              day_class = ' btn-primary-light font-weight-bold';
              legal_class = 'text-white';
              agreement_view_class = 'text-white';
              date_class = 'btn btn-primary-light';
          }
          //Card Cloumn Start
          var div_card = $('<div/>').addClass("card-column"+card_class);

          //Card DATE Start
          var div_created_date = $('<div/>').addClass("card-head d-flex justify-content-between");
          div_created_date.append('<p>'+payment_enquiry[pe]['created_date']+'</p>');
          div_created_date.append('<p>Ref. No:'+payment_enquiry[pe]['property']['reference_number']+'</p>');
          if(payment_enquiry[pe]['is_payment_done_by_tenant'] == 0)
              div_created_date.append('<p>'+payment_enquiry[pe]['time_left_to_do_payment']+' hours left</p>');
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



          //if(payment_enquiry[pe]['is_payment_done_by_tenant'] == 1)


          var div_day_price = $('<div/>').addClass("d-flex justify-content-between pb-2");
          div_day_price.append('<p class="btn cursor-unset '+day_class+'">'+payment_enquiry[pe]['property_rate_details']['total_days']+' Days</p>');
          div_day_price.append('<span class="btn btn-dark cursor-unset">R '+payment_enquiry[pe]['property_rate_details']['tenant_amount_with_vat']+'</span>');
          card_body.append(div_day_price);


          var div_note = $('<div/>').addClass("d-flex justify-content-between align-items-center");
          div_note.append('<p><span class="small font-weight-medium">Please note: The amount shown above does not reflect a deposit or any other amounts specific to your agreement that have been agreed with <strong>'+landlord_name+'</strong>.</span></p>');
          card_body.append(div_note);

          div_card.append(card_body);
          //Card body END
          //Card Foot Start
          var card_foot = $('<div/>').addClass("card-foot");
          if(payment_enquiry[pe]['is_payment_done_by_tenant'] == 0)
          {
              var div_agreement_view = $('<div/>').addClass("d-flex justify-content-between align-items-center");
              div_agreement_view.append('<p class="font-weight-medium '+legal_class+'">Legal Agreement</p>');
            //  div_agreement_view.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" class="btn btn-secondary small font-weight-medium view-agreement"><u>View Agreement</u></a>');
              card_foot.append(div_agreement_view);
          }
          if(payment_enquiry[pe]['is_payment_done_by_tenant'] == 1)
          {
            var div_agreement_view = $('<div/>').addClass("d-flex justify-content-between align-items-center");
            div_agreement_view.append('<p class="font-weight-medium '+legal_class+'">Payment confirmation has been uploaded.</p>');
          //  div_agreement_view.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" class="btn btn-secondary small font-weight-medium view-agreement"><u>View Agreement</u></a>');
            card_foot.append(div_agreement_view);

            var div_button = $('<div/>').addClass("d-flex justify-content-between mt-2");
            div_button.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" class="btn btn-secondary view-agreement">View lease agreement</a>');
            card_foot.append(div_button);
          }


          var div_button = $('<div/>').addClass("d-flex justify-content-between mt-2");
          if(payment_enquiry[pe]['is_payment_done_by_tenant'] == 1)
          {
            //   div_button.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" class="btn btn-secondary withdraw-enquiry">Withdraw</a>');
              div_button.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" class="btn btn-secondary view-enquiry">View</a>');
              div_button.append('<span class="btn btn-light"><i class="icon icon-paid-primary mr-2"></i>Paid</span>');
          }

          if(payment_enquiry[pe]['is_payment_done_by_tenant'] == 0)
          {
              div_button.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" class="btn btn-secondary view-agreement">View Agreement</a>');
              div_button.append('<a href="javascript:void(0)" data-id="'+payment_enquiry[pe]['id']+'" data-payableamount="'+payment_enquiry[pe]['property_rate_details']['tenant_amount_with_vat']+'" class="btn btn-primary payment-enquiry">Upload payment confirmation</a>');
          }
          //if(payment_enquiry[pe]['is_payment_done_by_tenant'] == 1)



          card_foot.append(div_button);
          div_card.append(card_foot);
          //Card foot End
          if(payment_enquiry[pe]['is_payment_done_by_tenant'] == 0)
          {
          var div_note1 = $('<div/>').addClass("d-flex justify-content-between align-items-center");
          div_note1.append('<p><span class="small font-weight-medium">Please note: You will receive an invoice from SpaceMatch by email.Please arrange payment using one of our payment options and upload confirmation using the link above.</span></p>');
          div_card.append(div_note1);
          }



          $(div_card).appendTo("#payment");

          //Card Cloumn End
    }

    $('.withdraw-enquiry').click(function () {
        var enquiryId = $(this).data('id');
        $("#modalWithdrawConfimation #enquiryId").val('');
        $("#modalWithdrawConfimation #enquiryId").val( enquiryId );
        $('#modalWithdrawConfimation').modal('show');
    });

    $('.view-enquiry').click(function () {
      var enquiryId = $(this).data('id');
      viewEnquiry(enquiryId);
    });

    $('.payment-enquiry').click(function () {
      var enquiryId = $(this).data('id');
      var payable_amount = $(this).data('payableamount');
      paymentEnquiry(enquiryId,payable_amount);
    });

    $('.view-agreement').click(function(){
      var enquiryId = $(this).data('id');
      viewAgreement(enquiryId);
    });
  }

  $(".loader").hide();
}

function tenantPendingApproval(response)
{
  $('#pending_approval').html('');
  var pending_enquiry = response.data;

  if(pending_enquiry.length == 0)
  {
    var no_record_text = 'No enquiries at this stage';
    $('#pending_approval').html(no_record_text);
  }
  if(pending_enquiry.length > 0)
  {
    for(var pa=0;pa<pending_enquiry.length;pa++)
    {
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
          //div_propery_detail.append('<p class="">'+pending_enquiry[pa]['property']['name']+'</p>');
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
          div_day_price.append('<span class="btn btn-dark cursor-unset">R '+pending_enquiry[pa]['property_rate_details']['tenant_amount_with_vat']+'</span>');
          card_body.append(div_day_price);

          var site_visit_status = '';
          if(pending_enquiry[pa]['site_visit'] == 1)
              site_visit_status = 'Yes';
          if(pending_enquiry[pa]['site_visit'] == 0)
              site_visit_status = 'No';
          var div_site_visit = $('<div/>').addClass("d-flex py-2 mt-1");
          div_site_visit.append('<p class="font-weight-medium text-dark-grey">Site visit?</p>');
          div_site_visit.append('<p class="font-weight-bold ml-2">'+site_visit_status+'</p>');
          card_body.append(div_site_visit);
          div_card.append(card_body);
          //Card body END
          //Card Foot Start
          var card_foot = $('<div/>').addClass("card-foot");

          var footer_class = '';



          if(pending_enquiry[pa]['tenant_detail']['is_fica_details_uploaded'] == '0')
          {
              footer_class = ' mt-2';
              card_foot.append('<p class="small font-italic text-warning">You have not uploaded FICA Detail\'s. Please click <a href="'+base_url+'/tenant-fica-details" target="_blank" class="font-weight-bold text-danger">HERE</a> to upload it.</p>');
          }

          if(pending_enquiry[pa]['tenant_detail']['is_fica_details_uploaded'] == '1' && pending_enquiry[pa]['tenant_detail']['is_verify_fica_category_by_admin'] == '0')
          {
              footer_class = ' mt-2';
              card_foot.append('<p class="small font-italic text-warning">Your FICA Detail\'s are not approved. Please click <a href="'+base_url+'/tenant-fica-details" target="_blank" class="font-weight-bold text-danger">HERE</a> to check it.</p>');
          }
          var div_button = $('<div/>').addClass("d-flex justify-content-between"+ footer_class);

          if(pending_enquiry[pa]['tenant_detail']['is_verify_fica_category_by_admin'] == 1) //
              div_button.append('<a href="javascript:void(0)" data-id="'+pending_enquiry[pa]['id']+'" class="btn btn-secondary withdraw-enquiry">Withdraw</a>');

          div_button.append('<a href="javascript:void(0)" data-id="'+pending_enquiry[pa]['id']+'" class="btn btn-primary view-enquiry">View</a>');
          card_foot.append(div_button);
          div_card.append(card_foot);
          //Card foot End

          $(div_card).appendTo("#pending_approval");

          //Card Cloumn End
    }

    $('.withdraw-enquiry').click(function () {
        var enquiryId = $(this).data('id');
        $("#modalWithdrawConfimation #enquiryId").val('');
        $("#modalWithdrawConfimation #enquiryId").val( enquiryId );
        $('#modalWithdrawConfimation').modal('show');
    });

    $('.view-enquiry').click(function () {
      var enquiryId = $(this).data('id');
      viewEnquiry(enquiryId);
    });
  }

  $(".loader").hide();
}


function tenantSiteVisit(response)
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
              var siteVisitEnquiryId = sitevisit_enquiry[sv]['id'];
             //Card Cloumn Start
              var div_card = $('<div/>').addClass("card-column");

              //Card DATE Start
              var div_created_date = $('<div/>').addClass("card-head d-flex justify-content-between");
              div_created_date.append('<p>'+sitevisit_enquiry[sv]['created_date']+'</p>');
              div_created_date.append('<p>Ref. No:'+sitevisit_enquiry[sv]['property']['reference_number']+'</p>');
              div_card.append(div_created_date);
              //Card DATE END
              //Card body Start
              var card_body = $('<div/>').addClass("card-body p-0");
              var div_propery_detail = $('<div/>').addClass("pb-2");
              //div_propery_detail.append('<p class="">'+sitevisit_enquiry[sv]['property']['name']+'</p>');
              div_propery_detail.append('<p class=""><a href="'+base_url+'/space/'+sitevisit_enquiry[sv]['property']['slug']+'" target="_blank">'+sitevisit_enquiry[sv]['property']['name']+'</a></p>');
              var postal_code = '';
              if(sitevisit_enquiry[sv]['property']['address_postal_code'] != '' && sitevisit_enquiry[sv]['property']['address_postal_code'] != null)
                postal_code = ","+sitevisit_enquiry[sv]['property']['address_postal_code'];

              div_propery_detail.append('<p class="small text-grey mt-1">'+sitevisit_enquiry[sv]['property']['full_address']+postal_code+'</p>');
              card_body.append(div_propery_detail);

              if(sitevisit_enquiry[sv]['has_landlord_set_date'] == '1' && sitevisit_enquiry[sv]['site_visit_status'] == '0')
              {
                  var site_visit_dates = sitevisit_enquiry[sv]['spaceSiteVisit'][0];

                  var div_suggested_date_time = $('<div/>').addClass("border-top pt-2");
                  div_suggested_date_time.append('<p class="small">Suggested Date & Time</p>');

                  var date_time_block1 = $('<div/>').addClass("d-flex justify-content-between align-items-center mt-3");
                  date_time_block1.append('<p class="small text-dark-grey" id="suggested_time_label_1_'+siteVisitEnquiryId+'">'+site_visit_dates['converted_date_1']+'</p>');

                  var div_date_time1 =  $('<div/>').addClass("custom-control custom-checkbox");
                  div_date_time1.append('<input type="radio" class="custom-control-input site_visit_radio" id="suggestdatetime_1_'+siteVisitEnquiryId+'" value="date_1#'+site_visit_dates['id']+'#'+siteVisitEnquiryId+'" name="suggestdatetime_'+siteVisitEnquiryId+'[]">');
                  div_date_time1.append('<label class="custom-control-label pl-0" for="suggestdatetime_1_'+siteVisitEnquiryId+'">&nbsp;</label>');
                  date_time_block1.append(div_date_time1);

                  div_suggested_date_time.append(date_time_block1);


                  var date_time_block2 = $('<div/>').addClass("d-flex justify-content-between align-items-center mt-3");
                  date_time_block2.append('<p class="small text-dark-grey" id="suggested_time_label_2_'+siteVisitEnquiryId+'">'+site_visit_dates['converted_date_2']+'</p>');

                  var div_date_time2 =  $('<div/>').addClass("custom-control custom-checkbox");
                  div_date_time2.append('<input type="radio" class="custom-control-input site_visit_radio" id="suggestdatetime_2_'+siteVisitEnquiryId+'" value="date_2#'+site_visit_dates['id']+'#'+siteVisitEnquiryId+'" name="suggestdatetime_'+siteVisitEnquiryId+'[]">');
                  div_date_time2.append('<label class="custom-control-label pl-0" for="suggestdatetime_2_'+siteVisitEnquiryId+'">&nbsp;</label>');
                  date_time_block2.append(div_date_time2);

                  div_suggested_date_time.append(date_time_block2);

                  var date_time_block3 = $('<div/>').addClass("d-flex justify-content-between align-items-center mt-3");
                  date_time_block3.append('<p class="small text-dark-grey"  id="suggested_time_label_3_'+siteVisitEnquiryId+'">'+site_visit_dates['converted_date_3']+'</p>');

                  var div_date_time3 =  $('<div/>').addClass("custom-control custom-checkbox");
                  div_date_time3.append('<input type="radio" class="custom-control-input site_visit_radio" id="suggestdatetime_3_'+siteVisitEnquiryId+'" value="date_3#'+site_visit_dates['id']+'#'+siteVisitEnquiryId+'" name="suggestdatetime_'+siteVisitEnquiryId+'[]">');
                  div_date_time3.append('<label class="custom-control-label pl-0" for="suggestdatetime_3_'+siteVisitEnquiryId+'">&nbsp;</label>');
                  date_time_block3.append(div_date_time3);

                  div_suggested_date_time.append(date_time_block3);


                  card_body.append(div_suggested_date_time);

              }

              div_card.append(card_body);
              //Card body END
              //Card Foot Start
              var card_foot = $('<div/>').addClass("card-foot");

              var footer_class = '';

              if(sitevisit_enquiry[sv]['has_landlord_set_date'] == '0')
              {
                  footer_class = ' mt-2';
                  card_foot.append('<p class="small font-italic text-warning">The Owner will contact you to arrange a site visit</p>');
              }

              if(sitevisit_enquiry[sv]['site_visit_status'] == '1' && sitevisit_enquiry[sv]['is_tenant_happy_with_space'] == 0)
              {
                  footer_class = ' mt-2';

                  card_foot.append('<p class="font-weight-medium text-center text-dark-grey mt-2">Confirmed site visit time :</p>');
                  card_foot.append('<span class="btn cursor-unset">'+sitevisit_enquiry[sv]['site_visit_selected_date_time']+'</span>');
              }
              if(sitevisit_enquiry[sv]['has_landlord_set_date'] == '1' && sitevisit_enquiry[sv]['site_visit_status'] == '1')
              {

                  footer_class = ' mt-2';
                  if(sitevisit_enquiry[sv]['is_tenant_happy_with_space'] == 0)
                  {
                      card_foot.append('<p class="small mt-2">Please select whether to book the Space or not : </p>');
                      card_foot.append('<p class="font-weight-medium text-center text-dark-grey mt-2">Book Space ? </p>');
                      if(sitevisit_enquiry[sv]['tenant_detail']['is_fica_details_uploaded'] == '0')
                      {
                          card_foot.append('<p class="small font-italic text-warning mt-2">In order to proceed with your booking, we will need your Fica details. Please click <a href="'+base_url+'/tenant-fica-details" target="_blank" class="font-weight-bold text-danger">HERE</a> to upload your FICA details.</br>After the site visit and once your Fica details are verified, you can select whether to book the Space or not:');
                      }
                  }
                  if(sitevisit_enquiry[sv]['is_tenant_happy_with_space'] == 1 && sitevisit_enquiry[sv]['is_fica_verify_by_landlord'] == 2 && sitevisit_enquiry[sv]['is_fica_sortout_by_admin'] == 1)
                  {
                    card_foot.append('<p class="small font-italic text-warning mt-2">The Space owner will prepare and send an online lease agreement to you for signing.</p>');
                  }

              }

              var div_button = $('<div/>').addClass("d-flex justify-content-between"+footer_class);

              if(sitevisit_enquiry[sv]['has_landlord_set_date'] == '1'  && sitevisit_enquiry[sv]['site_visit_status'] == '0')
              {
                  div_button.append('<a href="javascript:void(0)" data-sitevisitid="'+site_visit_dates['id']+'" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-secondary non-of-works-for-tenant">Non of these times<br/>work for me</a>');
              }
              if(sitevisit_enquiry[sv]['has_landlord_set_date'] == '1' && sitevisit_enquiry[sv]['site_visit_status'] == '1')
              {
                  var div_button1 = $('<div/>').addClass("d-flex justify-content-between"+footer_class);
                  if(sitevisit_enquiry[sv]['tenant_detail']['is_fica_details_uploaded'] == '0' && sitevisit_enquiry[sv]['is_tenant_happy_with_space'] == 0)
                  {
                      div_button1.append('<span class="btn btn-secondary cursor-unset">Yes</span>');
                      div_button1.append('<span class="btn btn-secondary cursor-unset">No</span>');
                  }
                  if(sitevisit_enquiry[sv]['tenant_detail']['is_fica_details_uploaded'] == '1')
                  {
                      if(sitevisit_enquiry[sv]['is_tenant_happy_with_space'] == 0)
                      {
                          div_button1.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-primary happy-enquiry">Yes</a>');
                          div_button1.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-danger not-happy-enquiry">No</a>');
                      }

                  }
                  if(sitevisit_enquiry[sv]['is_tenant_happy_with_space'] == 1 && sitevisit_enquiry[sv]['is_fica_verify_by_landlord'] == 2 && sitevisit_enquiry[sv]['is_fica_sortout_by_admin'] == 1)
                  {
                      div_button1.append('<span class="btn btn-primary cursor-unset">Booking sent to Space Owner</span>');
                  }
                  card_foot.append(div_button1);
              }

              if(sitevisit_enquiry[sv]['has_landlord_set_date'] == '0' || sitevisit_enquiry[sv]['site_visit_status'] == '1' )
              {
                  var div_button = $('<div/>').addClass("d-flex justify-content-between"+footer_class);
                  if(sitevisit_enquiry[sv]['has_landlord_set_date'] == '0')
                      div_button.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-secondary withdraw-enquiry">Withdraw</a>');

                  if(sitevisit_enquiry[sv]['is_tenant_happy_with_space'] == 1)
                    div_button.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn btn-secondary view-enquiry">View Space</a>');
                  else
                    div_button.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn btn-secondary view-enquiry">View</a>');

                if(sitevisit_enquiry[sv]['is_fica_verify_by_landlord'] == 2 && sitevisit_enquiry[sv]['is_fica_sortout_by_admin'] == 0)
                {
                    card_foot.append('<p class="small font-italic text-success mt-2">Landlord raised FICA issue, SpaceMatch might contact you.</p>');
                }
                  //div_button1.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-secondary withdraw-enquiry">Withdraw</a>');
                  //div_button1.append('<a href="javascript:void(0)" data-id="'+sitevisit_enquiry[sv]['id']+'" class="btn btn-primary view-enquiry">View</a>');
              }

              card_foot.append(div_button);
              div_card.append(card_foot);
              if(sitevisit_enquiry[sv]['has_landlord_set_date'] == '1' && sitevisit_enquiry[sv]['site_visit_status'] == '1' && sitevisit_enquiry[sv]['is_tenant_happy_with_space'] == 0 && sitevisit_enquiry[sv]['tenant_detail']['is_fica_details_uploaded'] == 1)
              {
                  card_foot.append('<p class="small font-italic text-warning mt-2">Please note: If you select <strong>NO</strong>, your enquiry will be terminated. If you select <strong>YES</strong>, the Space Owner will prepare a lease agreement for you..');
              }

              //Card foot End


              $(div_card).appendTo("#site_visit");

              //Card Cloumn End
        }

        $('.site_visit_radio').click(function(){
            var site_visit_detail = $(this).val();
            selectSiteVisitDate(site_visit_detail);

        });
        $('.non-of-works-for-tenant').click(function(){
            var enquiryId = $(this).data('id');
            var sitevisitId = $(this).data('sitevisitid');
            noDateSuitableToTenant(enquiryId,sitevisitId);
        });

        $('.withdraw-enquiry').click(function () {
            var enquiryId = $(this).data('id');
            $("#modalWithdrawConfimation #enquiryId").val('');
            $("#modalWithdrawConfimation #enquiryId").val( enquiryId );
            $('#modalWithdrawConfimation').modal('show');
        });

        $('.not-happy-enquiry').click(function () {
            var enquiryId = $(this).data('id');
            $("#modalNotHappyConfimation #enquiryId").val('');
            $("#modalNotHappyConfimation #enquiryId").val( enquiryId );
            $('#modalNotHappyConfimation').modal('show');
        });

        $('.happy-enquiry').click(function () {
          var enquiryId = $(this).data('id');
          $("#modalHappyConfimation #enquiryId").val('');
          $("#modalHappyConfimation #enquiryId").val( enquiryId );
          $('#modalHappyConfimation').modal('show');
        });

        $('.view-enquiry').click(function () {
          var enquiryId = $(this).data('id');
          viewEnquiry(enquiryId);
        });
    }

    $(".loader").hide();
}

function tenantAgreement(response)
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
          var landlord_name = agreement_enquiry[ae]['property']['space_owner_contact_person'];

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
        //  div_propery_detail.append('<p class="">'+agreement_enquiry[ae]['property']['name']+'</p>');
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

          var div_day_price = $('<div/>').addClass("d-flex justify-content-between pb-3");
          div_day_price.append('<p class="btn cursor-unset">'+agreement_enquiry[ae]['property_rate_details']['total_days']+' Days</p>');
          div_day_price.append('<span class="btn btn-dark cursor-unset">R '+agreement_enquiry[ae]['property_rate_details']['tenant_amount_with_vat']+'</span>');
          card_body.append(div_day_price);

          var div_note = $('<div/>').addClass("d-flex justify-content-between align-items-center");
          div_note.append('<p><span class="small font-weight-medium">Please note: The amount shown above does not reflect a deposit or any other amounts specific to your agreement that have been agreed with '+landlord_name+'</span></p>');
          card_body.append(div_note);






          // var site_visit_status = '';
          // if(agreement_enquiry[ae]['site_visit'] == 1)
          //     site_visit_status = 'Yes';
          // if(agreement_enquiry[ae]['site_visit'] == 0)
          //     site_visit_status = 'No';
          // var div_site_visit = $('<div/>').addClass("d-flex py-2 mt-1");
          // div_site_visit.append('<p class="font-weight-medium text-dark-grey">Site visit?</p>');
          // div_site_visit.append('<p class="font-weight-bold ml-2">'+site_visit_status+'</p>');
          // card_body.append(div_site_visit);


          div_card.append(card_body);
          //Card body END
          //Card Foot Start
          var card_foot = $('<div/>').addClass("card-foot");

          var footer_class = '';

          if(agreement_enquiry[ae]['is_agreement_send_to_landlord'] == 1 && agreement_enquiry[ae]['is_sign_by_landlord'] == 0)
          {
              footer_class  = ' mt-2';
              var legal_agreement_div = $('<div/>').addClass("d-flex justify-content-between align-items-center");
              legal_agreement_div.append('<p><span class="text-warning small font-weight-medium"> Awaiting  '+landlord_name+' to signed it.</span></p>');
              card_foot.append(legal_agreement_div);
          }
         // if(agreement_enquiry[ae]['is_agreement_send_to_landlord'] == 1 && agreement_enquiry[ae]['is_sign_by_landlord'] == 1)
         if(agreement_enquiry[ae]['is_agreement_send_to_tenant'] == 1 && agreement_enquiry[ae]['is_sign_by_tenant'] == 0)
          {
              footer_class  = ' mt-2';
              var legal_agreement_div = $('<div/>').addClass("d-flex justify-content-between align-items-center");

              legal_agreement_div.append('<p class="text-primary small font-weight-medium"> '+landlord_name+' has sent you a lease agreement.</p>');
              //legal_agreement_div.append('<p class="text-primary small font-weight-medium">Space Owner has signed rental agreement and send rental agreement to you on your register email.</p>');
              card_foot.append(legal_agreement_div);
          }
          // <div class="d-flex justify-content-between align-items-center">
					// 						<p class="font-weight-medium text-dark-grey">Legal Agreement</p>
					// 						<p class="text-primary small font-weight-medium">Ready</p>
					// 					</div>


          var div_button = $('<div/>').addClass("d-flex justify-content-between"+ footer_class);
          div_button.append('<a href="javascript:void(0)" data-id="'+agreement_enquiry[ae]['id']+'" class="btn btn-secondary withdraw-enquiry">Withdraw</a>');
          div_button.append('<a href="javascript:void(0)" data-id="'+agreement_enquiry[ae]['id']+'" class="btn btn-primary view-enquiry">View</a>');
          card_foot.append(div_button);
          div_card.append(card_foot);
          //Card foot End

          $(div_card).appendTo("#approve_legal_agreement");

          //Card Cloumn End
    }

    $('.withdraw-enquiry').click(function () {
        var enquiryId = $(this).data('id');
        $("#modalWithdrawConfimation #enquiryId").val('');
        $("#modalWithdrawConfimation #enquiryId").val( enquiryId );
        $('#modalWithdrawConfimation').modal('show');
    });

    $('.view-enquiry').click(function () {
      var enquiryId = $(this).data('id');
      viewEnquiry(enquiryId);
    });
  }

  $(".loader").hide();
}

function noDateSuitableToTenant(enquiryId, sitevisitId)
{
  $.ajax({
    url: api_url+"tenant-no-date-suitable",
    method: 'post',
    data:  {'enquiry_id':enquiryId, 'sitevisit_id':sitevisitId},
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
    }
  });
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


      //  $("#entity_individually").hide();
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
        $("#modalEnquirydetail #property_images").html('');
        $("#modalEnquirydetail #entity_individually").html('');
        $("#modalEnquirydetail #view_tenant_name").html('');

        $("#modalEnquirydetail #landlord_name").html('');
        $("#modalEnquirydetail #landlord_mobile").html('');
        $("#modalEnquirydetail #landlord_email").html('');

        $("#modalEnquirydetail #landlord_name").html(enquiry_detail['property']['space_owner_contact_person']);
        $("#modalEnquirydetail #landlord_mobile").html(enquiry_detail['property']['space_owner_contact_person_mobile']);
        $("#modalEnquirydetail #landlord_email").html(enquiry_detail['property']['space_owner_contact_person_email']);


        $("#modalEnquirydetail #enquiry_property_name").removeAttr('href');

        $("#modalEnquirydetail #view_tenant_name").html(enquiry_detail['tenant_detail']['firstname']+' '+enquiry_detail['tenant_detail']['surname']);

        if(enquiry_detail['bookingentity'] == 0)
            $("#entity_individually").html("No");
        if(enquiry_detail['bookingentity'] == 1)
            $("#entity_individually").html("Yes");


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
        $("#modalEnquirydetail #enquiry_price").html(enquiry_detail['property']['property_size']+' '+enquiry_detail['property']['property_size_type']);
        $("#modalEnquirydetail #enquiry_price").html(enquiry_detail['property_rate_details']['tenant_amount_with_vat']);
        $("#modalEnquirydetail #enquiry_days").html(enquiry_detail['property_rate_details']['total_days']);

        $("#modalEnquirydetail #enquiry_start_date").html(enquiry_detail['start_date']);
        $("#modalEnquirydetail #enquiry_end_date").html(enquiry_detail['end_date']);
        $("#modalEnquirydetail #project_name").html(enquiry_detail['project_name']);
        $("#modalEnquirydetail #project_desc").html( $.parseHTML(enquiry_detail['project_desc']));
        $("#modalEnquirydetail #space_look_like").html($.parseHTML(enquiry_detail['talkspaceowner']));
        var space_used_for = enquiry_detail['spaceUsedFor'];
        for(sp=0;sp<space_used_for.length;sp++)
        {
            $("#space_used_for").append('<a href="javascript:void(0)" class="text-grey text-center"> <span><i class="icon '+space_used_for[sp]['space_used_for_image_class']+' d-block mb-3"></i></span>'+space_used_for[sp]['title']+'</a>');
        }

        var property_images = enquiry_detail['property']['spacePropertyImages'];
        for(pi=0;pi<property_images.length;pi++)
        {
           var image_path = property_images[pi]['property_image_path'];
           var image_name = property_images[pi]['property_image_name'];
           var image_details = image_path.split(image_name);
           var new_image_path = image_details[0]+'medium_'+image_name;

           var  image_type = property_images[pi]['property_image_type'];
           if(image_type == 1)
           {
                var image_name = property_images[pi]['property_image_path'];
                if(image_name.includes("_collage.jpg") == true)
                    $("#modalEnquirydetail #property_images").append('<div class="space-image-item"><img src="'+property_images[pi]['property_image_path']+'" class="img-fluid" alt="'+property_images[pi]['property_image_name']+'"/></div>');
           }
           if(image_type == 2)
           {
                $("#modalEnquirydetail #property_images").append('<div class="space-image-item"><img src="'+new_image_path+'" class="img-fluid" alt="'+property_images[pi]['property_image_name']+'"/></div>');
           }
        }


        var enquiry_images = enquiry_detail['spaceEnquiryImages'];

        for(si=0;si<enquiry_images.length;si++)
        {
            $("#enquiry_iamges").append('<li class="col-sm-4 col-6"><img src="'+enquiry_images[si]['enquiry_image_path']+'" class="img-fluid rounded w-100"/></li>');
        }
        $('#modalEnquirydetail').modal('show');

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
    },
    error: function (data) {
      $(".loader").hide();
    }
});
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
       // var enquiry_detail = data.data;


    },
    error: function (data) {
      $(".loader").hide();
    }
});
}

function paymentEnquiry(enquiry_id,payable_amount)
{
     $("#modalPayment").modal('show');

     $("#modalPayment #entityId").val('');
     $("#modalPayment #entityId").val(enquiry_id);
     $("#modalPayment #tenant_paid_amount").text('');
     $("#modalPayment #tenant_paid_amount").text("R "+payable_amount);
     $("#modalPayment #tenant_total_paid_amount").val('');
     $("#modalPayment #tenant_total_paid_amount").val(payable_amount);
     $(".icon-delete").hide();
     $('.select2').select2({
      width: "100%",
      minimumResultsForSearch: -1
    });
    $('b[role="presentation"]').hide();
    $('.select2-selection__arrow').append('<i class="icon icon-chevron-down-gray"></i>');

    $('.custom-file').each(function() {
      var $customfil = $(this);
    //  $(".icon-delete", $customfil).hide();

      $(".custom-file-input", $customfil).on("change", function() {

        var allowedFiles = ["jpg","png","gif","jpeg","doc", "docx", "pdf"];
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        var fileName = $(this).val().split("\\").pop();

        var file_ext  = fileName.split('.').pop().toLowerCase();

        if($.inArray(file_ext, allowedFiles) == -1) {
          // $("#payment_proof-error").hide();
          // $("#payment_proof_error").show();
          // $(".custom-file-label", $customfil).siblings("span").hide();
          // $("#modalPayment .icon-delete").hide();
          // $('#payment_proof_error').html("Please upload only jpg,png,gif,doc,docx and pdf format files for Payment proof.");
        }
        else
        {
          $("#payment_proof-error").hide();
          $("#payment_proof_error").hide();
          $('#payment_proof_error').html('');
          $("#payment_proof").removeClass('is-invalid');
          $(".custom-file-label", $customfil).siblings("span").show();
          $(".custom-file-label", $customfil).siblings("span").addClass("selected").html(fileName);
          $(".icon-delete", $customfil).show();
        }
      });

      $(".icon-delete", $customfil).on("click", function() {
        var fileName = "";
        $("span", $customfil).removeClass("selected").html(fileName);
        $(".icon-delete", $customfil).hide();
      });
    });
    // $("#show_account_number,#show_bank_name,#show_cheque_number,#show_reference_number").hide();
    // $("#reference_number,#cheque_number,#account_number").on("input", function(evt) {
    //   var self = $(this);
    //   self.val(self.val().replace(/[^0-9\.]/g, ''));
    //   if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57))
    //   {
    //     evt.preventDefault();
    //   }
    // });


    // $("#payment_method").change(function(){
    //    var payment_method = $(this).val();
    //    if(payment_method == '')
    //    {
    //       $("#show_account_number,#show_bank_name,#show_cheque_number,#show_reference_number").hide();
    //    }
    //    if(payment_method == 1)
    //    {
    //       $("#show_account_number,#show_bank_name,#show_cheque_number,#show_reference_number").hide();
    //    }
    //    if(payment_method == 2)
    //    {
    //         $("#show_account_number,#show_bank_name,#show_cheque_number").show();
    //         $("#show_reference_number").hide();
    //    }
    //    if(payment_method == 3)
    //    {
    //         $("#show_account_number,#show_bank_name,#show_reference_number").show();
    //         $("#show_cheque_number").hide();
    //    }

    // });
}
function selectSiteVisitDate(site_visit_detail)
{
  var site_detail;
  site_detail = site_visit_detail.split("#");
  var selected_date_time = site_detail[0];
  var sitevisitId = site_detail[1];
  var enquiryId = site_detail[2];
  var label_detail = selected_date_time.split("_");

  var label_id = label_detail[1];
  var label = $("#suggested_time_label_"+label_id+'_'+enquiryId).text();

  $("#modalSiteVisitTimeConfimation").modal('show');

  $("#modalSiteVisitTimeConfimation #enquiryId").val('');
  $("#modalSiteVisitTimeConfimation #enquiryId").val(enquiryId);
  $("#modalSiteVisitTimeConfimation #selected_site_visit_time").html('');
  $("#modalSiteVisitTimeConfimation #selected_site_visit_time").html(label);
  $("#modalSiteVisitTimeConfimation #sitevisitId").val('');
  $("#modalSiteVisitTimeConfimation #sitevisitId").val(sitevisitId);
  $("#modalSiteVisitTimeConfimation #selected_date_time").val('');
  $("#modalSiteVisitTimeConfimation #selected_date_time").val(selected_date_time);
  // $.ajax({
  //           url: api_url+"tenant-choose-date-time",
  //           method: 'post',
  //           data:  {'enquiry_id':enquiryId, 'sitevisit_id':sitevisitId, 'selected_date_time':selected_date_time},
  //           headers: {
  //             'Authorization': 'Bearer '+ token,
  //             "Accept": "application/json",
  //           },
  //           beforeSend: function() {
  //             $('.loader').show().css('opacity','0.4');
  //           },
  //           success: function (data) {
  //               $(".loader").hide();
  //               if(data.success == true){
  //                 setTimeout(function(){
  //                   pipleline();
  //                 }, 1000);
  //               }
  //           },
  //           error: function (data) {
  //             $(".loader").hide();
  //           }
  // });

}
$('#confrim-sitevisit-time').click(function() {
    var enquiryId = $('#modalSiteVisitTimeConfimation #enquiryId').val();
    var sitevisitId = $('#modalSiteVisitTimeConfimation #sitevisitId').val();
    var selected_date_time = $('#modalSiteVisitTimeConfimation #selected_date_time').val();
    $.ajax({
                url: api_url+"tenant-choose-date-time",
                method: 'post',
                data:  {'enquiry_id':enquiryId, 'sitevisit_id':sitevisitId, 'selected_date_time':selected_date_time},
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
                       $('#modalSiteVisitTimeConfimation').modal('hide');
                      setTimeout(function(){
                        pipleline();
                      }, 1000);
                    }
                },
                error: function (data) {
                  $(".loader").hide();
                }
      });
});
$('#withdraw-enquiry').click(function() {

  var enquiryId = $('#modalWithdrawConfimation #enquiryId').val();
  $.ajax({
    url: api_url+"tenant-status-update",
    method: 'PATCH',
    data:  {'status_id': '6', 'enquiry_id':enquiryId},
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

          $('#modalWithdrawConfimation').modal('hide');

          setTimeout(function(){
            pipleline();
          }, 1000);
        }
    },
    error: function (data) {
      $(".loader").hide();
      $('#modalDeleteConfimation').modal('hide');
    }
});
});

$('#not-happy-space').click(function() {

  var enquiryId = $('#modalNotHappyConfimation #enquiryId').val();
  $.ajax({
    url: api_url+"tenant-status-update",
    method: 'PATCH',
    data:  {'status_id': '28', 'enquiry_id':enquiryId},
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

          $('#modalNotHappyConfimation').modal('hide');

          setTimeout(function(){
            pipleline();
          }, 1000);
        }
    },
    error: function (data) {
      $(".loader").hide();
      $('#modalNotHappyConfimation').modal('hide');
    }
});
});

$('#happy-space').click(function() {

  var enquiryId = $('#modalHappyConfimation #enquiryId').val();
    $.ajax({
      url: api_url+"tenant-happy-space",
      method: 'POST',
      data:  {'status_id': '28', 'enquiry_id':enquiryId},
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

            $('#modalHappyConfimation').modal('hide');

            setTimeout(function(){
              pipleline();
            }, 1000);
          }
      },
      error: function (data) {
        $(".loader").hide();
        $('#modalHappyConfimation').modal('hide');
      }
  });
});

$("#payment_done_by_tenant").click(function(){
  $("#frmPayment").validate( {
    rules: {
      payment_method: "required",
      payment_proof:
      {
        required: true,
        extension: "JPG|JPEG|GIF|PNG|gif|jpeg|png|jpg|PDF|DOC|DOCX|pdf|doc|docx"
      }

      // bank_name: {
      //   required: function(element) {
      //     return ($("#payment_method").val() == 2 || $("#payment_method").val() == 3);
      //   }
      // },
      // account_number: {
      //   required: function(element) {
      //     return ($("#payment_method").val() == 2 || $("#payment_method").val() == 3);
      //   }
      // },
      // cheque_number: {
      //   required: function(element) {
      //     return ($("#payment_method").val() == 2);
      //   }
      // },
      // reference_number: {
      //   required: function(element) {
      //     return ($("#payment_method").val() == 3);
      //   }
      // }
    },
    messages: {
      payment_method: "Please select payment method",
      payment_proof:
      {
        required: "Please upload Payment proof.",
        extension: "Please upload only jpg,png,gif,doc,docx and pdf format files for Payment proof."
      }
      // bank_name: "Please enter bank name",
      // account_number: "Please enter account number",
      // cheque_number: "Please enter cheque number",
      // reference_number: "Please enter reference number",
    },
    errorElement: "em",
    errorPlacement: function ( error, element ) {

      error.addClass( "invalid-feedback" );
      if ( element.prop( "type" ) === "checkbox" ) {
        error.insertAfter( element.next( "label" ) );
      }
      else if ( element.prop( "type" ) === "file" ) {
        error.insertAfter( $("#pay_proof") );
      }
      else {
        error.insertAfter( element );
      }

      if (element.hasClass("select2-hidden-accessible")) {
        element = $("#select2-" + element.attr("id") + "-container").parent();
        element.parents('.form-group').append(error);
      }
    },
    highlight: function ( element, errorClass, validClass ) {
      $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
    },
    unhighlight: function (element, errorClass, validClass) {
      $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
    }
  });

   if ($("#frmPayment").valid() == true) {
    var form = $('#frmPayment')[0];
    var formData = new FormData(form);
    $.ajax({
      url: api_url+"tenant-payment-detail",
            method: 'POST',
           // data: $("#frmPayment").serializeArray(),
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
                $("#modalPayment").modal('hide');
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
                    $('#'+index+'_error').show();
                    $('#'+index+'_error').html(item);

                    $('#'+index).change(function(){
                      $('#'+index+'_error').hide();
                      $('#'+index+'_error').html('');
                    });
                });
              }
            }
      });

   }

});

$("#payment_decline_by_tenant").click(function(){
    var enquiryId = $("#modalPayment #entityId").val();
    $("#modalPayment").modal('hide');
    $("#modalWithdrawConfimation #enquiryId").val('');
    $("#modalWithdrawConfimation #enquiryId").val( enquiryId );
    $('#modalWithdrawConfimation').modal('show');
});
function tenantConfirm(response)
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
          //div_propery_detail.append('<p class="">'+confirmed_enquiry[ce]['property']['name']+'</p>');
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

function tenantWithdrawDeclined(response)
{
  $('#withdraw_declined').html('');
  var withdraw_declined_enquiry = response.data;

  if(withdraw_declined_enquiry.length == 0)
  {
    var no_record_text = 'No enquiries at this stage';
    $('#withdraw_declined').html(no_record_text);
  }
  if(withdraw_declined_enquiry.length > 0)
  {
    for(var wde=0;wde<withdraw_declined_enquiry.length;wde++)
    {
          var agreement_enquiry_id = withdraw_declined_enquiry[wde]['id'];
          //Card Cloumn Start
          var div_card = $('<div/>').addClass("card-column overlay");

          //Card DATE Start
          var div_created_date = $('<div/>').addClass("card-head d-flex justify-content-between");
          div_created_date.append('<p>'+withdraw_declined_enquiry[wde]['created_date']+'</p>');
          div_created_date.append('<p>Ref. No:'+withdraw_declined_enquiry[wde]['property']['reference_number']+'</p>');

          div_card.append(div_created_date);

          //Card DATE END

          //Card body Start
          var card_body = $('<div/>').addClass("card-body p-0");

          var div_propery_detail = $('<div/>').addClass("pb-2");
        // div_propery_detail.append('<p class="">'+withdraw_declined_enquiry[wde]['property']['name']+'</p>');
        div_propery_detail.append('<p class=""><a href="'+base_url+'/space/'+withdraw_declined_enquiry[wde]['property']['slug']+'" target="_blank">'+withdraw_declined_enquiry[wde]['property']['name']+'</a></p>');

          var postal_code = '';
          if(withdraw_declined_enquiry[wde]['property']['address_postal_code'] != '' && withdraw_declined_enquiry[wde]['property']['address_postal_code'] != null)
            postal_code = ","+withdraw_declined_enquiry[wde]['property']['address_postal_code'];

          div_propery_detail.append('<p class="small text-grey mt-1">'+withdraw_declined_enquiry[wde]['property']['full_address']+postal_code+'</p>');
          card_body.append(div_propery_detail);

          var div_start_end_date = $('<div/>').addClass("d-flex justify-content-around my-2 py-2");
          div_start_end_date.append('<p class="small"><span class="text-grey mr-1">Start:</span> '+withdraw_declined_enquiry[wde]['start_date']+'</p>');
          div_start_end_date.append('<p class="small"><span class="text-grey mr-1">End:</span>'+withdraw_declined_enquiry[wde]['end_date']+'</p>');
          card_body.append(div_start_end_date);

          var div_day_price = $('<div/>').addClass("d-flex justify-content-between pb-3");
          div_day_price.append('<p class="btn cursor-unset">'+withdraw_declined_enquiry[wde]['property_rate_details']['total_days']+' Days</p>');
          div_day_price.append('<span class="btn btn-dark cursor-unset">R '+withdraw_declined_enquiry[wde]['property_rate_details']['landlord_amount_with_vat']+'</span>');
          card_body.append(div_day_price);

          div_card.append(card_body);
          //Card body END
          //Card Foot Start
          var card_foot = $('<div/>').addClass("card-foot");

          var div_button = $('<div/>').addClass("d-flex align-items-center justify-content-between mt-2");
          div_button.append('<a href="javascript:void(0)" data-id="'+withdraw_declined_enquiry[wde]['id']+'" class="btn btn-secondary btn-auto view-enquiry">View</a>');
          card_foot.append(div_button);

          div_card.append(card_foot);
          //Card foot End

          //Card Overlay Start
          var card_overlay = $('<div/>').addClass("card-overlay");
          var overlay_reason = '';
          if(withdraw_declined_enquiry[wde]['status_id'] == '5' || withdraw_declined_enquiry[wde]['status_id'] == '7')
                overlay_reason = 'Declined by Owner';

          if(withdraw_declined_enquiry[wde]['status_id'] == '6')
                overlay_reason = 'Withdrawal by you';

          if(withdraw_declined_enquiry[wde]['status_id'] == '11')
                overlay_reason = 'Time expired to<br>sign agreement';

          if(withdraw_declined_enquiry[wde]['status_id'] == '14')
                overlay_reason = 'Time expired to<br>make payment';

          if(withdraw_declined_enquiry[wde]['status_id'] == '28')
                overlay_reason = 'NOT happy with space';

          if(withdraw_declined_enquiry[wde]['status_id'] == '31')
                overlay_reason = 'Dead due to Fica not resolved';

          card_overlay.append('<p class="font-weight-bold text-white mb-2">'+overlay_reason+'</p>');
          card_overlay.append('<a href="javascript:void(0);" data-slug="'+withdraw_declined_enquiry[wde]['property']['slug']+'" data-id="'+withdraw_declined_enquiry[wde]['id']+'" data-property_id="'+withdraw_declined_enquiry[wde]['property_id']+'" class="btn btn-secondary redo-enquiry">Redo Enquiry</a>');


		      div_card.append(card_overlay);
         //Card Overlay End
          $(div_card).appendTo("#withdraw_declined");

          //Card Cloumn End
    }

    $('.redo-enquiry').click(function () {
      event.preventDefault();
      event.stopPropagation();
      var enquiryId = $(this).data('id');
      var property_id = $(this).data('property_id');
      var slug = $(this).data('slug');
      console.log("enquiryId==>"+enquiryId);
      console.log("property_id==>"+property_id);
      console.log("slug==>"+slug);

      $.redirect(base_url + '/space/'+slug,
				{
					"_token": $("#csrf-token").val(),
          'enquiry_id' : enquiryId,
          'property_id' : property_id,
				},
				"POST");
    });


  }

  $(".loader").hide();
}

function withdrawEnquiry(enquiry_id)
{

}
