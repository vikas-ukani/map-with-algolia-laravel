$(document).ready( function () {
    // $("#one_header_images").hide();
    $("#fileupload-error").hide();
    if($('#file_ids').val() == '')
        $(".upload-image-list").hide();
    else
        $(".upload-image-list").show();
    if($(location).attr('hash') == '#step2'){
        var navTag = $('.nav-tabs .active').parent().next('li');
        navTag.find('a').removeClass('active');
        navTag.find('a').trigger('click');
    }


    $('.btnPrevious').click(function() {
        $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
    });

    $('.select2').select2({
        width: "100%",
        minimumResultsForSearch: -1
    });
    $('b[role="presentation"]').hide();
    $('.select2-selection__arrow').append('<i class="icon icon-chevron-down-gray"></i>');

    var form;
    if($('#wizardForm').length){
        form = $("#wizardForm");
    }else{
        form = $("#editSpaceForm");
    }

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

    $.validator.addMethod('headerMinimumImage', function(value, element, param) {
        var uploadHeaderCollage = 0;
        uploadHeaderCollage = $("#uploadCoverPhoto").closest("div").find(".uploaded").children().length;
        if(uploadHeaderCollage < param ) {
            return false;
        }
        else {
            return true;
        }
    }, 'Please select at least 5 Header Image');

    $.validator.addMethod('oneCoverMinimumImage', function(value, element) {

        var total_file_ids = $('#file_ids').val().split(',');
        uploadOneCover = total_file_ids.length;
        if(uploadOneCover > 0 ) {
            return true;
        }
        else {
            return false;
        }
    }, 'Please select at least 1 Cover Image');

    $.validator.addMethod("endTimeValidator", function (value, element, params) {
        var endt  = new Date('1/1/1991' + ' ' + value);
        endt = endt.getTime();

        var stt  = new Date('1/1/1991' + ' ' + $(params).val());
        stt = stt.getTime();
        if(stt > endt)
            return false;
        else if(stt < endt)
            return true;

    }, 'Closing time must be later than opening time.');
    $.validator.addMethod("timeValidator", function (value, element, params) {
            var stt  = new Date('1/1/1991' + ' ' + value);
            stt = stt.getTime();
            var endt  = new Date('1/1/1991' + ' ' + $(params).val());
            endt = endt.getTime();
            if(stt > endt)
                return false;
            else if(stt < endt)
                return true;
        }, 'Opening time must be earlier than closing time.');
    form.validate( {
        rules: {
            name: "required",
            propertytype: "required",
            // shoppingmall: "required",
            selectcompany: "required",
            description: "required",
            address: "required",
            address2: "required",
            selectportfolio: "required",
            space_owner_contact_person_email: {
                required: true,
                email: true
            },
            space_owner_contact_person: "required",
            refno: "required",
            minbookingdays: "required",
            maxbookingdays:{
                required: true,
                min: function() {
                    return parseInt($('#minbookingdays').val());
                }
            },
            propertysize: "required",
            // startdate: "required",
            enddate: {
                required: function(element) {
                    if($('#startdate').val().length === 0)
                        return false;
                    else
                        return true;
                }
            },
            // aboutspace: "required",
            rulesspace: "required",
            few_things_to_know: "required",
            monday_to_friday_start_time:
            {
                required :true,
                timeValidator: "#monday_to_friday_end_time"
            },
            monday_to_friday_end_time: {
                required :true,
                endTimeValidator: "#monday_to_friday_start_time"
            },
            saturday_start_time: {
                required: function(element) {
                    return $('#saturday_open').is(':checked')
                },
                timeValidator: "#saturday_end_time"
            },
            // saturday_start_time: {
            //      required :true,
            //     timeValidator: "#saturday_end_time"
            // },
            saturday_end_time: {
                required: function(element) {
                    return $('#saturday_open').is(':checked')
                },
                endTimeValidator: "#saturday_start_time"
            },
            // saturday_end_time: {
            //     required :true,
            //     endTimeValidator: "#saturday_start_time"
            // },
            sunday_start_time: {
                required :true,
                timeValidator: "#sunday_end_time"
            },
            sunday_end_time: {
                required :true,
                endTimeValidator: "#sunday_start_time"
            },
            // daily :"required",
            ratedaily: {
                required: function(element) {
                    return $('#daily').is(':checked')
                }
            },
            // weekly :"required",
            rateweekly: {
                required: function(element) {
                    return $('#weekly').is(':checked')
                }
            },
            // monthly :"required",
            ratemonthly: {
                required: function(element) {
                    return $('#monthly').is(':checked')
                }
            },
            'feature[]': {
                required: true,
            },
            'ideause[]': {
                required: true,
            },
            //headercollage: "required",

            // 'uploadCoverPhoto[]': {
            // 	required: function(element) {
            //         uploadHeaderCollage = $("#uploadCoverPhoto").closest("div").find(".uploaded").children().length;
            // 		return ($('#headercollage').is(':checked') && uploadHeaderCollage == 0 )
            // 	},
            //     headerMinimumImage: 5
            // },
            // onecoverheader: "required",
            'uploadimages[]': {
                required: function(element) {
                    var uploadPhotos = '';
                    var file_ids = $('#file_ids').val();
                    if(file_ids == '')
                        return true;
                    else
                        return false;
                },
                extension: "JPG|JPEG|GIF|PNG|gif|jpeg|png|jpg",
                //oneCoverMinimumImage: 1
            },
        },
        messages: {
            name: "Please enter Property Name",
            propertytype: "Please select Property Type",
            shoppingmall: "Please select Shopping Mall",
            selectcompany: "Please select Company",
            description: "Please enter Description",
            address: "Please enter Address",
            address2: "Please enter Address Line 2",
            selectportfolio: "Please select Portfolio type",
            space_owner_contact_person: "Please enter space owner contact person",
            space_owner_contact_person_email:{
                required: "Please enter space owner contact person email",
                email: "Please enter valid space owner contact person email",
            },
            refno: "Please enter refrence no",
            minbookingdays: "Please select Minimum booking days",
            maxbookingdays: "",
            maxbookingdays: {
                required: "Please select Maximum booking days",
                min: "Maximum Booking Days must be greater than Minimum Booking Days."
            },
            propertysize: "Please enter property size",
            startdate: "Please select start date",
            enddate: "Please select end date",
            aboutspace: "Please enter about space",
            rulesspace: "Please enter rules of space",
            few_things_to_know: "Please enter A few things you need to know",
            monday_to_friday_start_time: {
                required:"Please select start time for Monday to Friday",
                timeValidator:"Opening time must be earlier than closing time."
            },
            monday_to_friday_end_time: {
                required: "Please select end time for Monday to Friday",
                endTimeValidator:"Closing time must be later than opening time."
            },
            saturday_start_time: {
                required:"Please select start time for Saturday",
                timeValidator:"Opening time must be earlier than closing time."
            },
            saturday_end_time: {
                required: "Please select end time for Saturday",
                endTimeValidator:"Closing time must be later than opening time."
            },
            sunday_start_time: {
                required:"Please select start time for Sunday",
                timeValidator:"Opening time must be earlier than closing time."
            },
            sunday_end_time:  {
                required: "Please select end time for Sunday",
                endTimeValidator:"Closing time must be later than opening time."
            },
            daily :"Please select daily",
            ratedaily: "Please enter amount for daily rate",
            monthly :"Please select monthly",
            ratemonthly: "Please enter amount for monthly rate",
            weekly :"Please select weekly",
            rateweekly: "Please enter amount for weekly rate",
            // 'feature[]': {
            // 	required: "Please select atleast one Feature",
            // },
            'ideause[]': {
                required: "Please select atleast one Feature",
            },
            onecoverheader: "Please select Cover header",
            'uploadimages[]': {
                required: "Please Upload Photo",
                extension: "Please upload only JPG, GIF, PNG  and JPEG format files",
                oneCoverMinimumImage: "Please select at least 1 Cover Image"
            },
            // 'uploadCoverPhoto[]': {
            // 	required: "Please Upload Header Collage",
            //     headerMinimumImage: "Please select at least 5 Header Image"
            // },

            //headercollage: "Please select Header collage",
        },

        errorElement: "em",
        errorPlacement: function ( error, element ) {

            error.addClass( "invalid-feedback" );
            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.next( "label" ) );
            }

            else {
                error.insertAfter( element );
            }

            if ( element.attr( "name" ) === "feature[]" ) {
                error.appendTo('#errorFeature');
            }

            if ( element.attr( "name" ) === "ideause[]" ) {
                error.appendTo('#errorIdeal');
            }

            if ( element.attr( "name" ) === "uploadCoverPhoto" ) {
                error.appendTo('#errorCollageUpload');
            }

            if ( element.attr( "name" ) === "uploadimages" ) {
                error.appendTo('#errorUpload');
            }

            if ( element.attr( "name" ) === "propertysize" ) {
                error.appendTo('#errorSize');
            }

            if (element.attr("name") == "uploadimages[]" ) {
                error.appendTo($('#errorSpaceImage'));
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
        },
        // submitHandler: function() {
        // 	$successMsg.show();
        // }
    });

    $('select').on('change', function() {
    $(this).valid();
    });

    $('#stepbtn1').click(function() {
        if (form.valid() == true) {
            var formData = form.serializeArray();
            $.ajax({
                url: api_url + "space/step1",
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
            // formDataNew = formData.filter(function( obj ) {
            //     return obj.value !== '';
            // });
            $.ajax({
                url: api_url + "space/step2",
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
            if ($('.all-rates input.rates').filter(':checked').length < 1){
                $('#rates-error').text("Please select at least one of the rate..").show();
                return false;
            }
            var formData = form.serializeArray();
            $.ajax({
                url: api_url + "space/step3",
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
            var formData = form.serializeArray();
            $.ajax({
                url: api_url + "space/step4",
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
                        $('#tabstep5').trigger('click');
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

    $('#stepbtn5').click(function() {
        if (form.valid() == true) {
            var formData = form.serializeArray();
            $.ajax({
                url: api_url + "space/step5",
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
                        $('#tabstep6').trigger('click');
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
        if (form.valid() == true) {
            if ($('input.isHeaderImage').filter(':checked').length < 1){
                $('#isHeaderImage_error').text("Please select one of image as your cover image").show();
                return false;
            }

            // if ($('input.header-upload-images').filter(':checked').length < 1){
            //     $('#uploadimages-error').text("Please select at least one of the header..").show();
            //     return false;
            // }
            //  var formData = new FormData(form[0]);
            // $("#errorGalleryPhoto").hide();
            $.ajax({
                url: api_url + "space",
                method: 'post',
                data: form.serializeArray(),
                // enctype: 'multipart/form-data',
                // processData: false,
                // contentType: false,
                // cache: false,
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
                        $.redirect(base_url + '/add-space-thank-you','',"GET");
                    }
                },
                error: function (data) {
                    $(".loader").hide();
                    if(data.responseJSON.success == false) {
                        var messageList = data.responseJSON.message;
                        $.each(messageList, function(index, item) {
                            $('#'+index+'_error').show();
                            $('#'+index+'_error').html(item);
                            if(index == 'onecoverheader')
                            {
                                $('#uploadimages-error').show();
                                $('#uploadimages-error').html(item);
                            }
                        });
                    }
                }
            });
        }
    });
    $('#stepbtnsubmitedit').click(function() {
        if (form.valid() == true) {
            if ($('input.isHeaderImage').filter(':checked').length < 1){
                $('#isHeaderImage_error').text("Please select one of image as your cover image").show();
                return false;
            }
            // if ($('input.header-upload-images').filter(':checked').length < 1){
            //     $('#uploadimages-error').text("Please select at least one of the header..").show();
            //     return false;
            // }
            //  $("#errorGalleryPhoto").hide();
            //var formData = new FormData(form[0]);
            var spaceId = $('#editSpaceForm #spaceId').val();
            $.ajax({
                url: api_url + "space/"+spaceId+"/update",
                method: 'post',
                data: form.serializeArray(),
                // enctype: 'multipart/form-data',
                // processData: false,
                // contentType: false,
                // cache: false,
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
                        form[0].reset();
                        $.redirect(base_url + '/edit-space-thank-you','',"GET");
                    }
                },
                error: function (data) {
                    $(".loader").hide();
                    if(data.responseJSON.success == false) {
                        var messageList = data.responseJSON.message;
                        $.each(messageList, function(index, item) {
                            $('#'+index+'_error').show();
                            $('#'+index+'_error').html(item);

                            if(index == 'onecoverheader')
                            {
                                $('#uploadimages-error').show();
                                $('#uploadimages-error').html(item);
                            }
                        });
                    }
                }
            });
        }
    });

    // $('.input-images').imageUploader({
    // 	extensions: ['.jpg', '.jpeg', '.png'],
    // 	mimes: ['image/jpeg', 'image/png'],
    // 	maxSize: 5 * 1024 * 1024,
    // 	maxFiles: 20,
    // 	imagesInputName: "uploadimages",
    // 	preloadedInputName: "test",
    // 	label: "Upload photos"
    // });
    // $('.input-images').imageUploader({
    // 	extensions: ['.jpg', '.jpeg', '.png'],
    // 	mimes: ['image/jpeg', 'image/png'],
    // 	maxSize: 5 * 1024 * 1024,
    //     maxFiles: 5,
    // 	imagesInputName: "uploadCoverPhoto",
    // 	preloadedInputName: "test1",
    // 	label: "Upload Header Collage (5 images)"
    // });

    /* Toggle Text Box */

    $('.isRateClick').each(function() {
        var $isRateClick = $(this);
        if($isRateClick.find('input[type="checkbox"]').prop("checked") == true)
            $('.isRateShow', $isRateClick).show();
        else
            $('.isRateShow', $isRateClick).hide();

        $(".custom-control-label", $isRateClick).on("click", function() {
            $('.isRateShow', $isRateClick).toggle();
        });
    });

    $('.isDaysClick').change(function() {
        var ischecked = $('#saturday_open').prop("checked");
        if(ischecked == true) {
            $('.isDaysShow').show();
        }
        else
        {
            $('.isDaysShow').hide();
        }
    });
    $('.isDaySundayClick').click(function() {
        var ischecked = $('#sunday_open').prop("checked");
        if(ischecked == true) {
            $('.isDaySundayShow').show();
        }
        else
        {
            $('.isDaySundayShow').hide();
        }
    });

    /* Get Size */
    $(".dropdown-menu a").click(function(){
        $(this).parents(".input-group-append").find('.dropdown-toggle span').text($(this).text());
    });

    initCalendar();

    $('#selectcompany').change(function() {
        loadFeatures();
        loadPortfolios();
    });

    $('#addFeatures').click(function() {
        if($('#addFeatures_input').val() != ''){
            var new_feature = $('#addFeatures_input').val();
            var feature_div ='<div class="form-group col-lg-6"><div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="feature_'+new_feature+'" value="'+new_feature+'" name="feature_new[]"><label class="custom-control-label" for="feature_'+new_feature+'">'+new_feature+'</label></div></div>';
            $('#feature_append').append(feature_div);
        }
        $('#addFeatures_input').val('');
    });

    // $("#uploadimages").change(function() {
    //     var uploadOneCover = 0;
    //     var $uploadedCoverList = $(this);
    //     uploadOneCover = $uploadedCoverList.closest("div").find(".uploaded").children().length;
    //     $('#countUploadedImages').text(uploadOneCover+' of 20');
    //     $(".delete-image").click(function() {
    //         uploadOneCover = $uploadedCoverList.closest("div").find(".uploaded").children().length;
    //         $('#countUploadedImages').text(uploadOneCover+' of 20');
    //     });
    // });

    // $("#uploadCoverPhoto").change(function() {
    //         var uploadHeaderCollage = 0;
    //         var $uploadedCoverList = $(this);
    //         $("#uploadCoverPhoto-error").html('');
    //         $("#uploadCoverPhoto-error").hide();
    //         uploadHeaderCollage = $("#uploadCoverPhoto").closest("div").find(".uploaded").children().length;
    //         $('#countUploadedImagesHeader').text(uploadHeaderCollage+' of 5');
    //         $(".delete-image").click(function() {
    //             uploadHeaderCollage = $("#uploadCoverPhoto").closest("div").find(".uploaded").children().length;
    //             $('#countUploadedImagesHeader').text(uploadHeaderCollage+' of 5');
    //         });
    // });

    $("#propertysize,#ratedaily,#ratemonthly,#rateweekly").on("input", function(evt) {
        var self = $(this);
        self.val(self.val().replace(/[^0-9\.]/g, ''));
        if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57))
        {
        evt.preventDefault();
        }
    });

    var addMoreDatesForm = $('#addMoreDatesForm');
    $('#add-unavailable-dates').click(function() {
        var is_valid = true;
        $("#addMoreDatesForm .unavailableStartDate").each(function(){
            if($(this).val() == ''){
                is_valid = false;
                $(this).next('em').text('Please select start date').show();
            }else{
                $(this).next('em').text('').hide();
            }

        });
        $("#addMoreDatesForm .unavailableEndDate").each(function(){
            if($(this).val() == ''){
                is_valid = false;
                $(this).next('em').text('Please select end date').show();
            }else{
                $(this).next('em').text('').hide();
            }
        });
        if (is_valid == true) {
            var space_id = $('#modalAddMoreDates #propertyId').val();
            var formData = addMoreDatesForm.serializeArray();

            var is_hide_from_search = [];
            var ischecked;
            $("#addMoreDatesForm .custom-control-input").each(function(){
                ischecked = $(this).prop("checked");
                is_hide_from_search.push(ischecked);
            });

            formData.push({
                "name": "is_hide_from_search_new[]",
                "value": is_hide_from_search
            });

            $.ajax({
                url: api_url + "space/"+space_id+"/add-unavailable-dates",
                method: 'POST',
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
                        location.reload();
                    }
                },
                error: function (data) {
                    $(".loader").hide();
                    if(data.responseJSON.success == false) {
                        $('#dates_error').text('Please select start and end dates').show();
                    }
                }
            });
        }
    });

    $('#addMoreDates').click(function () {
        $('#modalAddMoreDates').modal('show');
    });
});

function initCalendar() {
	var container = $(".search-calendar");
	var calendar = container.find(".bs-datepicker");
	if (!container.length || !calendar.length)
		return;
	var inputs = container.find('.range-input');
    var date = new Date();
    date.setDate(date.getDate());
	calendar.datepicker({
        format: "dd-mm-yyyy",
        startDate: date,
		inputs: calendar.find('.range-start, .range-end'),
		maxViewMode: 0,
		templates: {
			leftArrow: "<div class=\"text-center\"><i class=\"icon icon-small-chevron-right\"></i></div>",
			rightArrow: "<div class=\"text-center\"><i class=\"icon icon-small-chevron-left\"></i></div>"
		}
	});

	var start = calendar.find('.range-start'),
	end = calendar.find('.range-end');
	end.hide();
	start.on('changeDate', function (e) {
		if (typeof e.dates !== 'undefined' && e.dates.length && start.is(':visible')) {
			end.show().addClass('text-primary');
			start.hide().removeClass('text-primary');
			if (inputs && inputs.length) {
				$(inputs[0]).val(e.format());
			}
		}
	});

	end.on('changeDate', function (e) {
		if (typeof e.dates !== 'undefined' && e.dates.length && end.is(':visible')) {
			start.show().addClass('text-primary');
			end.hide().removeClass('text-primary');
			if (inputs && inputs.length && inputs.length > 1) {
				$(inputs[1]).val(e.format());
			}
		}
	});
}

function loadPortfolios()
{
  $.ajax({
    url: api_url + "getPortfolioByEntity/"+$('#selectcompany').val(),
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
        $('#selectportfolio').html('');
        $('#selectportfolio').append($("<option></option>").attr("value","").text("-Please Select Portfolio-"));
        var portfolio_details = data.data;
        if(portfolio_details.length > 0){

          $.each(portfolio_details, function(key, value) {
                  $('#selectportfolio').append($("<option></option>").attr("value",value.id).text(value.portfolio_name));
            });
        }
    },
    error: function (data) {
      $(".loader").hide();
    }
  });

}

function loadFeatures()
{
    $.ajax({
        url: api_url + "getPropertyFeaturesList/"+$('#selectcompany').val(),
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
        var feature_div = '';
        var features_details = data.data;
        if(features_details.length > 0){
            $.each(features_details, function(key, value) {
                feature_div = feature_div + '<div class="form-group col-lg-6"><div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="feature_'+value.id+'" value="'+value.id+'" name="feature[]"><label class="custom-control-label" for="feature_'+value.id+'">'+value.name+'</label></div></div>';
            });
        }else{
            feature_div = '<p>No Records</p>';
        }
        $('#feature_append').html(feature_div);
    },
    error: function (data) {
        $(".loader").hide();
    }
  });

}

function deleteImage(image_id){
    event.preventDefault();
    event.stopPropagation();
    //if (confirm("Are you sure you want to delete this image?")) {
        $.ajax({
            url: api_url + "space/delete-image",
            method: 'post',
            data: {image_id : image_id},
                headers: {
                'Authorization': 'Bearer '+ token,
            },
            beforeSend: function() {
                $('.loader').show().css('opacity','0.4');
            },
            success: function (data) {
                $(".loader").hide();

                $("#errorSpaceImage").hide();
                $('#space_image_'+image_id).remove();

                var file_ids = $('#file_ids').val();
                var all_file_ids = file_ids.split(",");
                var new_all_file_ids = jQuery.grep(all_file_ids, function(value) {
                    return value != image_id;
                  });
                if(new_all_file_ids.length < 6)
                    $("#image_enquiry").removeClass('disabled');

                $('#countSpaceUploadedImages').text(new_all_file_ids.length+' of 20');
                var new_file_ids =   new_all_file_ids.join(',');
                $('#file_ids').val(new_file_ids);

                if($('#file_ids').val() == '')
                  $(".upload-image-list").hide();

                // $(obj).parent().remove();
                // var cnt = 0;
                // if(type == 1){
                //     $('#uploadedCollageCount').val($('#uploadedCollageCount').val() - 1);
                //      cnt =parseInt($("#uploadCoverPhoto").closest("div").find(".uploaded").children().length) ;
                //     $('#countUploadedImagesHeader').text(cnt+' of 5');
                // }
                // else{
                //     $('#uploadedHeaderCount').val($('#uploadedHeaderCount').val() - 1);
                //     cnt =$("#uploadimages").closest("div").find(".uploaded").children().length;
                //     $('#countUploadedImages').text(cnt+' of 5');
                // }
            },
            error: function (data) {
                $(".loader").hide();
            }
        });
   //}
}
function deleteImage_21_4_20(obj, image_id, type){
    event.preventDefault();
    event.stopPropagation();
    if (confirm("Are you sure you want to delete this image?")) {
        $.ajax({
            url: api_url + "space/delete-image",
            method: 'post',
            data: {image_id : image_id},
                headers: {
                'Authorization': 'Bearer '+ token,
            },
            beforeSend: function() {
                $('.loader').show().css('opacity','0.4');
            },
            success: function (data) {
                $(".loader").hide();
                $(obj).parent().remove();
                var cnt = 0;
                if(type == 1){
                    $('#uploadedCollageCount').val($('#uploadedCollageCount').val() - 1);
                     cnt =parseInt($("#uploadCoverPhoto").closest("div").find(".uploaded").children().length) ;
                    $('#countUploadedImagesHeader').text(cnt+' of 5');
                }
                else{
                    $('#uploadedHeaderCount').val($('#uploadedHeaderCount').val() - 1);
                    cnt =$("#uploadimages").closest("div").find(".uploaded").children().length;
                    $('#countUploadedImages').text(cnt+' of 5');
                }
            },
            error: function (data) {
                $(".loader").hide();
            }
        });
    }
}

function setAsHeaderImage(obj){
    if ($(obj).is(":checked")) {
        $('input.isHeaderImage').prop("checked", false);
        var group = "input:checkbox[name='" + $(obj).attr("name") + "']";
        $(group).prop("checked", false);
        $(obj).prop("checked", true);
    } else {
        $(obj).prop("checked", false);
    }
}
