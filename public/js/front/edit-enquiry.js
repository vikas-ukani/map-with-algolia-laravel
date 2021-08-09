$(document).ready( function () { 

        $("#fileupload-error").hide(); 
        if($('#file_ids').val() == '') 
            $(".upload-image-list").hide();
        else    
            $(".upload-image-list").show();
        var form; 
        form = $("#wizardenquiryForm");
        form[0].reset(); 

        let prevent = function (e) {
            // Prevent browser default event and stop propagation
            e.preventDefault();
            e.stopPropagation();
        };

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
				// 'selectspace[]': {
				// 	required: true,
				// },
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
				// 'selectspace[]': {
				// 	required: 'Please select atleast one space',
				// },
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
            
            var enquiry_detail_id = $('#enquiry_detail_id').val(); 
			//if (form.valid() == true) {
                var formData = new FormData(form[0]);
                $.ajax({
                    url: api_url + "enquiry/update/"+enquiry_detail_id,
                    method: 'POST',
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
                            $.redirect(base_url + '/thank-you-for-edit-enquiry','','GET');  
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
			//}
        }); 
 
         
		// $('.input-images').imageUploader({
		// 	extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
		// 	mimes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
		// 	maxSize: 5 * 1024 * 1024,
        //     maxFiles: 6, 
		// 	imagesInputName: "enquiry_uploadimages",
		// 	preloadedInputName: "test",
		// 	label: "Upload photos"
		// }); 
		 

		/* Get Size */
		$(".dropdown-menu a").click(function(){
			$(this).parents(".input-group-append").find('.dropdown-toggle span').text($(this).text());
		}); 

        // $("#enquiry_uploadimages").change(function(e) {
        //     e.preventDefault();
        //     e.stopPropagation();
        //     var uploadOneCover = 0;;
        //     var $uploadedCoverList = $(this);
        //     $("#errorGalleryPhoto").hide();
        //     $("#enquiry_uploadimages-error").html(''); 
        //     $("#enquiry_uploadimages-error").hide();
        //     uploadOneCover = $uploadedCoverList.closest("div").find(".uploaded").children().length;
        //     $('#countEnquiryUploadedImages').text(uploadOneCover+' of 6');
        //     $("#images_count").val(uploadOneCover);
        //     $(".delete-image").click(function() {
        //         uploadOneCover = $uploadedCoverList.closest("div").find(".uploaded").children().length;
        //         $('#countEnquiryUploadedImages').text(uploadOneCover+' of 6');
        //         $("#images_count").val(uploadOneCover); 
        //         if(spaceImages.length == 0 )
		//         {
        //             $(".upload-text").removeClass("hide-upload-text");			
        //         } 
        //     });
        // });  
        
});

function deleteImage(image_id){
    event.preventDefault();
    event.stopPropagation();
    $("#modalDeleteEnquiry #image_id").val('');
    $("#modalDeleteEnquiry #image_id").val( image_id );
    // $("#modalDeleteEnquiry #image_obj").val('');
    // $("#modalDeleteEnquiry #image_obj").val( image_obj );
    $('#modalDeleteEnquiry').modal('show');    
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

$('#delete-space-image').click(function() {

    var image_id = $('#modalDeleteEnquiry #image_id').val();
   // var image_obj = $('#modalDeleteEnquiry #image_obj').val();
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
                $('#modalDeleteEnquiry').modal('hide'); 
                $("#errorEnquiryImage").show();
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
            $('#modalDeleteEnquiry').modal('hide');
          }
      });  
  });