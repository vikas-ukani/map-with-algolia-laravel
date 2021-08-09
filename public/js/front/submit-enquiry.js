$(document).ready( function () {
        $("#fileupload-error").hide(); 
        if($('#file_ids').val() == '') 
            $(".upload-image-list").hide();
        else    
            $(".upload-image-list").show();
        var form; 
        form = $("#wizardenquiryForm");
        form[0].reset();  

        $('#bookingentity_error').hide();
        $('#entityname_error').hide();
        $('#vatnumber_error').hide();
        $('#usespacelist_error').hide();
        $('#project_name_error').hide();
        $('#project_desc_error').hide();

        $('.btnPrevious').click(function() {
			$('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
		});

        $(".list-detail").hide();
        
        $('.isHide').hide();
        $("#bookingentityyes").prop("checked", false);
        $("#bookingentityno").prop("checked", false);

        if($("#is_reopen_enquiry").val() > 0)
        {
            if($("#bookingentity_status").val() == 0)
            {
                $("#bookingentityyes").prop("checked", false);
                $("#bookingentityno").prop("checked", true);
                $('.isHide').hide();
            }
            if($("#bookingentity_status").val() == 1)
            {
                $("#bookingentityyes").prop("checked", true);
                $("#bookingentityno").prop("checked", false);
                $('.isHide').show();
            }
        }

		$('.list-space-item').each(function() {
			var $spaceList = $(this);

			$("a.click-detail", $spaceList).click(function(e) {
				e.preventDefault();
				$(".list-detail", $spaceList).show();
				return false;
			});

			$("a.click-close", $spaceList).click(function(e) {
				e.preventDefault();
				$(".list-detail", $spaceList).hide();
				return false;
			});

			$('#bookingentityyes').click(function(){
				$('.isHide').show();
			});

			$('#bookingentityno').click(function(){
				$('.isHide').hide();
			});
		});

        
 

        form.validate( {
			rules: {
				bookingentity: {
					required: true,
                },
                entityname: {
                        required: function(element) {
                            return $('#bookingentityyes').is(':checked')
                        }
                    },
				//: "required",
				vatnumber: {
                    required: function(element) {
                        return $('#bookingentityyes').is(':checked')
                    }
                },
                'usespacelist[]': {
					required: true,
                },
                project_name: "required",
				project_desc: "required",											
                talkspaceowner: "required",
                'enquiry_uploadimages[]': {
                    required: function(element) {
                        var uploadPhotos = '';
                        var file_ids = $('#file_ids').val();
                        if(file_ids == '')
                            return true;                            
                        else 
                            return false;
					},
                    extension: "JPG|JPEG|GIF|PNG|gif|jpeg|png|jpg" 
                    
				}, 
			},
			messages: {
				bookingentity: {
					required: "Please select booking of entity",
				},
				entityname: "Please enter entity name",
                vatnumber: "Please enter VAT number",
                'usespacelist[]': {
					required: "Please select atleast one entity details.",
                },
                project_name: "Please enter your project/application name",
				project_desc: "Please enter your project/application desciption",
				
                talkspaceowner: "Please talk the Space Owner through the look and feel.",
                'enquiry_uploadimages[]': {
                    required: "Please Upload Photo",  
                    extension: "Please upload only JPG, GIF, PNG  and JPEG format files" 
				}, 
			},

			errorElement: "em",
			errorPlacement: function ( error, element ) { 
				error.addClass( "invalid-feedback" );

                if ( element.prop( "type" ) === "radio" ) {
                    if ( element.prop( "name" ) === "bookingentity" ) {
						error.appendTo( "#errorBookingEntity" );
					}
                }
				else if ( element.prop( "type" ) === "checkbox" ) { 
					if ( element.prop( "name" ) === "usespacelist[]" ) {
						error.appendTo( "#errorUserSpace" );
					} 

					else if ( element.prop( "name" ) === "selectspace[]" ) {
						error.appendTo( "#errorSelectSpace" );
					}

					else {
						error.insertAfter( element.next( "label" ) );
					}
				}
 
                // if (element.attr("name") == "bookingentity" ) {
                //     error.insertAfter($('#errorBookingEntity'));
                // }

                else if (element.attr("name") == "enquiry_uploadimages[]" ) {
                    error.appendTo($('#errorEnquiryImage'));
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
 

		$('#stepbtn1').click(function() {
			if (form.valid() == true) {
                var formData = form.serializeArray();
                $.ajax({
                    url: api_url + "enquiry/step1",
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
				            $('#tabstep2').trigger('click');
                        }
                    },
                    error: function (data) {
                        $(".loader").hide();
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

		$('#stepbtn2').click(function() {
			if (form.valid() == true) {
                var formData = form.serializeArray();
                
                $.ajax({
                    url: api_url + "enquiry/step2",
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
				            $('#tabstep3').trigger('click');
                        }
                    },
                    error: function (data) {
                        $(".loader").hide();
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

		$('#stepbtn3').click(function() {
			if (form.valid() == true) {
                var formData = form.serializeArray();
                $.ajax({
                    url: api_url + "enquiry/step3",
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
                            $('#tabstep4').trigger('click');
                        }
                    },
                    error: function (data) {
                        $(".loader").hide();
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

		$('#stepbtn4').click(function() {
			if (form.valid() == true) {
               // var formData = new FormData(form[0]);
                $.ajax({
                    url: api_url + "enquiry",
                    method: 'post',
                    data: form.serializeArray(),                    
                    headers: {
                    'Authorization': 'Bearer '+ token,
                    },  
                    beforeSend: function() {
                        $('.loader').show().css('opacity','0.4');
                    },
                    success: function (data) {
                        $(".loader").hide();
                        if(data.success == true){  

                            // var forgot_property_id = '{{session()->forget("property_id")}}'; 
                            // var forgot_start_date = '{{session()->forget("start_date")}}'; 
                            // var forgot_end_date = '{{session()->forget("end_date")}}'; 
                            // var forgot_property_slug = '{{session()->forget("property_slug")}}';  

                            // var forgot_space_detail_user_id = '{{session()->forget("space_detail_user_id")}}';
                            // var forgot_is_reopen_enquiry = '{{session()->forget("is_reopen_enquiry")}}';
                            // var forgot_space_detail_enquiry_id = '{{session()->forget("space_detail_enquiry_id")}}';
                            // var forgot_space_detail_property_id = '{{session()->forget("space_detail_property_id")}}';


                            $.ajax({
                                url: base_url + "/remove_session_of_enquiry",
                                method: 'post',
                                data: { "_token": $("#csrf-token").val()}, 
                                beforeSend: function() { 
                                  },
                                success: function (data) {  
                                    $('#tabstep5').trigger('click');
                                    fetchSubmittedEnquires();                
                                },
                                error: function (data) { 
                                }
                          });
                           
                        }
                    },
                    error: function (data) {
                        $(".loader").hide();
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
                            form[0].reset();
                            $.redirect(base_url + '/thank-you-for-sending-enquiry','','GET');
                        }
                    },
                    error: function (data) {
                        $(".loader").hide();                         
                    }
                });                
            }
            
        });  

		/* Get Size */
		$(".dropdown-menu a").click(function(){
			$(this).parents(".input-group-append").find('.dropdown-toggle span').text($(this).text());
		});  

        $('#tabstep5').click(function(){
            fetchSubmittedEnquires();
        });
});

function fetchSubmittedEnquires()
{
    $.ajax({
        url: api_url+"enquiry_submit",      
        method: 'GET',  
        data: {},
        headers: {
          'Authorization': 'Bearer '+ token, 
        },    
        beforeSend: function() {
          $('.loader').show().css('opacity','0.4');
        },
        success: function (response) {
            $(".loader").hide();
 
            $( "#enquiry_list").html('');
            var enquiry_details = response.data;

            if(enquiry_details.length > 0)
            {
                for(var e=0;e<enquiry_details.length;e++)
                { 
                    var div =  $('<div/>').addClass("list-space-card d-lg-flex align-items-lg-center");

                    var div_form_group = $('<div/>').addClass("form-group");
                    var div_space_checkbox = $('<div/>').addClass("custom-control custom-checkbox custom-control-inline");

                    div_space_checkbox.append('<input type="checkbox" class="custom-control-input" id="selectspace_'+enquiry_details[e]['id'] +'" name="selectspace[]" value="'+enquiry_details[e]['id']+'">');
                    div_space_checkbox.append('<label class="custom-control-label pl-0" for="selectspace_'+enquiry_details[e]['id'] +'">&nbsp;</label>');
                
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
                   // div_space.append('<a class="space-title text-truncate" href="javascript:void(0);">'+enquiry_details[e]['property']['name']+'</a>');
                    
                    var div_space_name_price = $('<div/>');
                    
                    div_space_name_price.append('<p class="space-address text-truncate">'+enquiry_details[e]['property']['full_address']+' '+((pincode !='') ? (','+pincode) : '')+'</p>');
                    div_space_name_price.append('<p class="space-size">'+enquiry_details[e]['property']['property_size']+' '+enquiry_details[e]['property']['property_size_type']+'</p>');
                    div_space.append(div_space_name_price); 

                    var div_space_price = $('<div/>');
                    div_space_price.append('<p class="space-price">R '+enquiry_details[e]['property_rate_details']['tenant_amount_with_vat']+'  <span class="space-size">for '+enquiry_details[e]['property_rate_details']['total_days']+' day</span></p>');
                    div_space.append(div_space_price);
 

//var div_space_site_visit = $('<div/>').addClass("mt-1 mb-lg-0 mb-3");
//div_space_site_visit.append('<span class="text-dark-grey font-weight-medium d-block d-lg-inline mb-2">Would you like a site visit? </span>');

                
                    // var div_site_visit_yes = $('<div/>').addClass("custom-control custom-checkbox custom-control-inline mr-4 ml-lg-4");
                    
                    // if(enquiry_details[e]['site_visit'] == 1) 
                    // {
                    //     div_site_visit_yes.append('<input type="radio" class="custom-control-input" id="sitevisitYes'+enquiry_details[e]['id'] +'" name="sitevisit'+enquiry_details[e]['id'] +'"  checked="checked" disabled>');
                    // }
                    // if(enquiry_details[e]['site_visit'] == 0) 
                    // {
                    //     div_site_visit_yes.append('<input type="radio" class="custom-control-input" id="sitevisitYes'+enquiry_details[e]['id'] +'" name="sitevisit'+enquiry_details[e]['id'] +'" disabled>');
                    // }
                    // div_site_visit_yes.append('<label class="custom-control-label" for="sitevisitYes'+enquiry_details[e]['id'] +'">Yes</label>');
                    // div_space_site_visit.append(div_site_visit_yes);


                    // var div_site_visit_no = $('<div/>').addClass("custom-control custom-checkbox custom-control-inline mr-4 ml-lg-4");
                    // if(enquiry_details[e]['site_visit'] == 0)
                    // {
                    //     div_site_visit_no.append('<input type="radio" class="custom-control-input" id="sitevisitNo'+enquiry_details[e]['id'] +'" name="sitevisit'+enquiry_details[e]['id'] +'" checked="checked" disabled>');
                    // }
                    // if(enquiry_details[e]['site_visit'] == 1) 
                    // {
                    //     div_site_visit_no.append('<input type="radio" class="custom-control-input" id="sitevisitNo'+enquiry_details[e]['id'] +'" name="sitevisit'+enquiry_details[e]['id'] +'" disabled>');
                    // }
                   
                    
                    // div_site_visit_no.append('<label class="custom-control-label" for="sitevisitNo'+enquiry_details[e]['id'] +'">No</label>');
                    // div_space_site_visit.append(div_site_visit_no);

                    //latest Working Site Visit yes OR No , but comment it due to client want it. 1st june,2020
                    // var site_visit_yes= '';
                    // var site_visit_no = '';

                    // if(enquiry_details[e]['site_visit'] == 1) 
                    // {
                    //     site_visit_yes = 'checked="checked"';
                    //     site_visit_no = '';
                    // }
                    // if(enquiry_details[e]['site_visit'] == 0) 
                    // {
                    //     site_visit_yes = '';
                    //     site_visit_no = 'checked="checked"';                        
                    // }
                    // var div_site_visit_yes = $('<div/>').addClass("custom-control custom-checkbox custom-control-inline mr-2 ml-lg-3");
                    // div_site_visit_yes.append('<input type="radio" class="custom-control-input" id="sitevisitYes'+enquiry_details[e]['id'] +'" value="1" name="sitevisit_'+enquiry_details[e]['id'] +'" '+site_visit_yes+'>');
                    // div_site_visit_yes.append('<label class="custom-control-label" for="sitevisitYes'+enquiry_details[e]['id'] +'">Yes</label>');
                    // div_space_site_visit.append(div_site_visit_yes); 

                    // var div_site_visit_no = $('<div/>').addClass("custom-control custom-checkbox custom-control-inline mr-2 ml-lg-3");
                    // div_site_visit_no.append('<input type="radio" class="custom-control-input" id="sitevisitNo'+enquiry_details[e]['id'] +'" value="0" name="sitevisit_'+enquiry_details[e]['id'] +'" '+site_visit_no+'>');
                    // div_site_visit_no.append('<label class="custom-control-label" for="sitevisitNo'+enquiry_details[e]['id'] +'">No</label>');
                    // div_space_site_visit.append(div_site_visit_no);

                    // div_space.append(div_space_site_visit);

                    // var div_error = $('<div/>').attr('id','errorSiteVisit').addClass("text-center");
                    // div_space.append(div_error);
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
                    div.append(div_start_end_date); 

                    // var div_delete_icon = $('<div/>').addClass("form-group text-right");
                    // div_delete_icon.append('<a href="javascript:void(0);"><i class="icon icon-circle-delete"></i></a>');
                    // div.append(div_delete_icon); 
                    if(enquiry_details[e]['status_id'] == 1 || enquiry_details[e]['status_id'] == 4)    
                    {
                        var div_delete_icon = $('<div/>').addClass("form-group text-right");
                        div_delete_icon.append('<a href="'+base_url+'/tenant-edit-enquiry/'+enquiry_details[e]['id']+'" class="enquiry-edit  mt-2"><i class="icon icon-circle-edit"></i></a>');
                        // div_delete_icon.append('<a href="javascript:void(0);"><i class="icon icon-circle-delete"></i></a>');
                        div.append(div_delete_icon);  
                    }        

                   // $(div).insertAfter( "#enquiry_list"); 
                   $(div).appendTo( "#enquiry_list"); 

                    //latest Working Site Visit yes OR No , but comment it due to client want it. 1st june,2020
                 //  $('#sitevisitNo'+enquiry_details[e]['id'] ).prop( 'disabled', true);    
                  // $('#sitevisitYes'+enquiry_details[e]['id'] ).prop( 'disabled', true);
                    
                }

                 var div_error = $('<div/>').attr('id','errorSelectSpace').addClass("my-3 text-center invalid-feedback");
                 $(div_error).appendTo( "#enquiry_list"); 
                 //$(div_error).insertAfter( "#enquiry_list");       
                 
            //      $('input[type=checkbox][name="selectspace[]"]').change(function(event) {
            //         var enq_id = '';
            //         enq_id = $(this).val();
            //        if ($(this).is(":checked")) {
            //            $('#sitevisitNo'+enq_id).prop( 'disabled', false);    
            //            $('#sitevisitYes'+enq_id).prop( 'disabled', false); 
            //        } else {
            //            $('#sitevisitNo'+enq_id).prop( 'disabled', true);    
            //            $('#sitevisitYes'+enq_id).prop( 'disabled', true);
            //        }
            //        $('#errorSelectSpace').hide();
            //        $('#errorSelectSpace').html('');
            //    });     
               
            }    
        },
        error: function (response) {   
          $(".loader").hide();   
        }
    }); 
}

function deleteImage(image_id){
    event.preventDefault();
    event.stopPropagation();

    var image_id = image_id; 
    $.ajax({
          url: api_url+"enquiry/delete-image/"+image_id,      
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
                $(".loader").hide();     
                $("#errorEnquiryImage").hide();
                $('#space_image_'+image_id).remove();      
                 
                var file_ids = $('#file_ids').val();
                var all_file_ids = file_ids.split(",");
                var new_all_file_ids = jQuery.grep(all_file_ids, function(value) {
                    return value != image_id;
                  });  
                if(new_all_file_ids.length < 6)
                    $("#image_enquiry").removeClass('disabled');

                $('#countEnquiryUploadedImages').text(new_all_file_ids.length+' of 6');
                var new_file_ids =   new_all_file_ids.join(',');
                $('#file_ids').val(new_file_ids); 

                if($('#file_ids').val() == '')
                  $(".upload-image-list").hide();
              }             
          },
          error: function (data) {   
            $(".loader").hide();   
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