	$(document).ready( function () {

        fetchSubmittedEnquires();
        $('#stepbtnsubmit').click(function() {


            var atLeastOneIsChecked = $('input[name="selectspace[]"]:checked').length;
            if(atLeastOneIsChecked == 0)
            {
                $("#errorSelectSpace").show();
                $("#errorSelectSpace").text('Please select atleast one enquiry to send SPACE OWNERS.');
            }
            else
            {
                $("#errorSelectSpace").hide();
                $("#errorSelectSpace").text('');


                var selectedEnquiries = [];
                $('input[name="selectspace[]"]:checked').each(function(index, value) {
                    var enquiry_id = '';
                    var object = {};
                    enquiry_id =  $(this).val();
                    object['enquiry_id'] =  $(this).val();
                    object['enquiry_site_visit_status'] =  $("input[name='sitevisit_"+enquiry_id+"']:checked"). val();
                    selectedEnquiries.push(object);
                  });


                  $.ajax({
                    url: api_url + "enquiry_send_to_admin",
                    method: 'post',
                    data: {'selectedEnquiries':selectedEnquiries},
                    headers: {
                    'Authorization': 'Bearer '+ token,
                    },
                    beforeSend: function() {
                        $('.loader').show().css('opacity','0.4');
                    },
                    success: function (data) {
                        $(".loader").hide();
                        if(data.success == true){
                            //form[0].reset();
                            $.redirect(base_url + '/thank-you-for-sending-enquiry','','GET');
                        }
                    },
                    error: function (data) {
                        $(".loader").hide();
                    }
                });
            }

        });
});

function fetchSubmittedEnquires()
{
    $.ajax({
        url: api_url+"enquiry",
        method: 'GET',
        data: {},
        headers: {
          'Authorization': 'Bearer '+ token,
        },
        beforeSend: function() {
          $('.loader').show().css('opacity','0.4');
        },
        success: function (response) {


            $( "#enquiry_list").after('');
            var enquiry_details = response.data;

            if(enquiry_details.length > 0)
            {
                for(var e=0;e<enquiry_details.length;e++)
                {
                    var div =  $('<div/>').addClass("list-space-card d-lg-flex align-items-lg-center enquiry-"+enquiry_details[e]['id']+"");

                    var div_form_group = $('<div/>').addClass("form-group");
                    var div_space_checkbox = $('<div/>').addClass("custom-control custom-checkbox custom-control-inline");

                    if(enquiry_details[e]['status_id'] == 1 || enquiry_details[e]['status_id'] == 4)
                    {
                        div_space_checkbox.append('<input type="checkbox" class="custom-control-input" id="selectspace_'+enquiry_details[e]['id'] +'" name="selectspace[]" value="'+enquiry_details[e]['id']+'">');
                        div_space_checkbox.append('<label class="custom-control-label pl-0" for="selectspace_'+enquiry_details[e]['id'] +'">&nbsp;</label>');
                    }


                    div_form_group.append(div_space_checkbox);
                    div.append(div_form_group);


                    var property_image_path = enquiry_details[e]['property']['spacePropertyImages'][0]['property_image_path'];


                    var div_form_group1 = $('<div/>').addClass("form-group");
                    var div_image = $('<div/>').addClass("list-space-card-image");
                    div_image.append('<img src="'+property_image_path+'" class="img-fluid" alt="'+enquiry_details[e]['property']['name']+'" />');
                    div_form_group1.append(div_image);
                    div.append(div_form_group1);

                    var div_property = $('<div/>').addClass("form-group");

                    var div_space = $('<div/>').addClass("space-item");

                    var pincode = '';
                    pincode = enquiry_details[e]['property']['address_postal_code'];


                    div_space.append('<a class="space-title text-truncate" target="_blank" href="'+base_url+'/space/'+enquiry_details[e]['property']['slug']+'">'+enquiry_details[e]['property']['name']+'</a>');

                    var div_space_name_price = $('<div/>');

                    div_space_name_price.append('<p class="space-address text-truncate">'+enquiry_details[e]['property']['full_address']+' '+((pincode !='') ? (','+pincode) : '')+'</p>');
                    div_space_name_price.append('<p class="space-size">'+enquiry_details[e]['property']['property_size']+' '+enquiry_details[e]['property']['property_size_type']+'</p>');
                    div_space.append(div_space_name_price);

                    var div_space_price = $('<div/>');
                    div_space_price.append('<p class="space-price">R '+enquiry_details[e]['property_rate_details']['tenant_amount_with_vat']+'  <span class="space-size">for '+enquiry_details[e]['property_rate_details']['total_days']+' day</span></p>');
                    div_space.append(div_space_price);


                    var div_space_site_visit = $('<div/>').addClass("mt-1 mb-lg-0 mb-3");
                    div_space_site_visit.append('<span class="text-dark-grey font-weight-medium d-block d-lg-inline mb-2">Would you like a site visit? </span>');


                    var site_visit_yes= '';
                    var site_visit_no = '';

                    if(enquiry_details[e]['site_visit'] == 1)
                    {
                        site_visit_yes = 'checked="checked"';
                        site_visit_no = '';
                    }
                    if(enquiry_details[e]['site_visit'] == 0)
                    {
                        site_visit_yes = '';
                        site_visit_no = 'checked="checked"';
                    }
                    var div_site_visit_yes = $('<div/>').addClass("custom-control custom-checkbox custom-control-inline mr-2 ml-lg-3");
                    div_site_visit_yes.append('<input type="radio" class="custom-control-input" id="sitevisitYes'+enquiry_details[e]['id'] +'" value="1" name="sitevisit_'+enquiry_details[e]['id'] +'" '+site_visit_yes+'>');
                    div_site_visit_yes.append('<label class="custom-control-label" for="sitevisitYes'+enquiry_details[e]['id'] +'">Yes</label>');
                    div_space_site_visit.append(div_site_visit_yes);

                    var div_site_visit_no = $('<div/>').addClass("custom-control custom-checkbox custom-control-inline mr-2 ml-lg-3");
                    div_site_visit_no.append('<input type="radio" class="custom-control-input" id="sitevisitNo'+enquiry_details[e]['id'] +'" value="0" name="sitevisit_'+enquiry_details[e]['id'] +'" '+site_visit_no+'>');
                    div_site_visit_no.append('<label class="custom-control-label" for="sitevisitNo'+enquiry_details[e]['id'] +'">No</label>');
                    div_space_site_visit.append(div_site_visit_no);


                    div_space.append(div_space_site_visit);

                    div_property.append(div_space);
                    div.append(div_property);

                    var div_start_end_date = $('<div/>').addClass("form-group");
                    var div_date = $('<div/>').addClass("list-space-date d-flex flex-column");

                    var startdate = enquiry_details[e]['enquiry_start_date'];
                    var start_date_detail = startdate.split("-");
                    var new_startdate = start_date_detail[2]+'/'+start_date_detail[1]+'/'+start_date_detail[0];

                    var div_p_start_date = $('</p>').addClass("btn font-weight-medium bg-light-grey mb-2 cursor-unset");
                    div_p_start_date.append('<span class="text-dark-grey text-capitalize">Start:</span> '+ new_startdate );
                    div_date.append(div_p_start_date);


                    var enddate = enquiry_details[e]['enquiry_end_date'];
                    var end_date_detail = enddate.split("-");
                    var new_enddate = end_date_detail[2]+'/'+end_date_detail[1]+'/'+end_date_detail[0];

                    var div_p_end_date = $('</p>').addClass("btn font-weight-medium bg-light-grey mb-2 ml-0 mt-0 cursor-unset");
                    div_p_end_date.append('<span class="text-dark-grey text-capitalize">End:</span> '+ new_enddate);
                    div_date.append(div_p_end_date);
                    div_start_end_date.append(div_date);

                    var div_status = $('<div/>').addClass("list-space-date text-center");
                    div_status.append('<p>Status - <span class="font-weight-bold">'+enquiry_details[e]['status']['status_display_to_tenant']+'</span></p>');
                    div_start_end_date.append(div_status);


                    div.append(div_start_end_date);

                    if(enquiry_details[e]['status_id'] == 1 || enquiry_details[e]['status_id'] == 4)
                    {
                        var div_delete_icon = $('<div/>').addClass("form-group text-right");
                        div_delete_icon.append('<a href="'+base_url+'/tenant-edit-enquiry/'+enquiry_details[e]['id']+'" class="enquiry-edit  mt-2"><i class="icon icon-circle-edit"></i></a>');
                        div_delete_icon.append('<a href="javascript:deleteEnquiry('+enquiry_details[e]['id']+', this);"><i class="icon icon-circle-delete"></i></a>');
                        div.append(div_delete_icon);
                    }
                   // $(div).insertAfter( "#enquiry_list");
                   $(div).appendTo( "#enquiry_list");
                   $('#sitevisitNo'+enquiry_details[e]['id'] ).prop( 'disabled', true);
                   $('#sitevisitYes'+enquiry_details[e]['id'] ).prop( 'disabled', true);

                }

                 var div_error = $('<div/>').attr('id','errorSelectSpace').addClass("my-3 text-center invalid-feedback");
                 $(div_error).appendTo( "#enquiry_list");
                 //$(div_error).insertAfter( "#enquiry_list");

                 $('input[type=checkbox][name="selectspace[]"]').change(function(event) {
                     var enq_id = '';
                     enq_id = $(this).val();
                    if ($(this).is(":checked")) {
                        $('#sitevisitNo'+enq_id).prop( 'disabled', false);
                        $('#sitevisitYes'+enq_id).prop( 'disabled', false);
                    } else {
                        $('#sitevisitNo'+enq_id).prop( 'disabled', true);
                        $('#sitevisitYes'+enq_id).prop( 'disabled', true);
                    }
                    $('#errorSelectSpace').hide();
                    $('#errorSelectSpace').html('');
                });

                if(e == (enquiry_details.length - 1))
                {
                    $(".loader").hide();

                }
            }
            // setTimeout(function(){
            //     $(".loader").hide();
            //   }, 10000);
        },
        error: function (response) {
          $(".loader").hide();
        },
        complete: function(){
            //   setTimeout(function(){
            //     $(".loader").hide();
            //   }, 10000);
           }
    });
}


$('input[type=radio][name=bookingentity]').change(function() {
    $('#bookingentity_error').hide();
    $('#bookingentity_error').html('');
});
$( "#entityname" ).focus(function() {
    $('#entityname_error').hide();
    $('#entityname_error').html('');
});

$( "#vatnumber" ).focus(function() {
    $('#vatnumber_error').hide();
    $('#vatnumber_error').html('');
});

$('input[type=checkbox][name=usespacelist]').change(function() {
    $('#usespacelist_error').hide();
    $('#usespacelist_error').html('');
});

$( "#project_name" ).focus(function() {
    $('#project_name_error').hide();
    $('#project_name_error').html('');
});

$( "#project_desc" ).focus(function() {
    $('#project_desc_error').hide();
    $('#project_desc_error').html('');
});

function deleteEnquiry(enquiry_id, obj){
    if (confirm("Are you sure you want to delete this enquiry?")) {
        $.ajax({
            url: api_url + "enquiry/"+enquiry_id,
            method: 'delete',
            headers: {
                'Authorization': 'Bearer '+ token,
            },
            beforeSend: function() {
                $('.loader').show().css('opacity','0.4');
            },
            success: function (data) {
                $(".loader").hide();
                if(data.success == true){
                    $('#success-message').show();
                    $("#enquiry_list .enquiry-"+enquiry_id).remove();
                    $('#success-message-show').text(data.message);
                    if($('#enquiry_list').children().length == 0){
                        $('#enquiry_list').html('<div class="list-space-card">You do not have any enquiry yet.</div>');
                    }
                    setTimeout(function(){
                        $('#success-message').hide();
                        $('#success-message-show').text('');
                    }, 2000);
                }else{
                    $('#success-message').show();
                    $('#warning-message-show').text(data.message);
                    setTimeout(function(){
                        $('#success-message').hide();
                        $('#warning-message-show').text('');
                    }, 1000);
                }
            },
            error: function (data) {
                $(".loader").hide();
            }
        });
    }
}
