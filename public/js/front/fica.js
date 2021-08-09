$(document).ready( function () {

    var individualsForm = $("#updateFICAIndividualsForm");
    var nonListedCompForm = $("#updateFICANonListedCompaniesForm");
    var listedCompForm = $("#updateFICAListedCompaniesForm");

    jQuery.validator.addMethod("extension", function (value, element, param) {
        param = typeof param === "string" ? param.replace(/,/g, '|') : "pdf|doc|docx";
        return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
    }, "Please upload only .doc, .docx and .pdf format files.");

    jQuery.validator.addMethod("requiredCheck", function (value, element, param) {
        if($('#'+element.id).attr('value') == '')
            return false;
        return true;
    }, "Please upload file.");

    individualsForm.validate( {
        rules: {
            colour_photo_of_sa_id:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            valid_passport:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx"
            },
            proof_of_address:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx"
            },
        },
        messages: {
            colour_photo_of_sa_id:
            {
                requiredCheck: "Please upload colour photo of SA ID",
                extension: "Please upload only .doc,.docx and .pdf format files for colour photo of SA ID"
            },
            valid_passport:
            {
                requiredCheck: "Please upload valid passport",
                extension: "Please upload only .doc,.docx and .pdf format files for valid passport"
            },
            proof_of_address:
            {
                requiredCheck: "Please upload valid proof of address",
                extension: "Please upload only .doc,.docx and .pdf format files for valid proof of address"
            }
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {

            error.addClass( "invalid-feedback" );
            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent());
            }
            else if ( element.prop( "type" ) === "file" ) {
                error.insertAfter( element.parent() );
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

    nonListedCompForm.validate( {
        rules: {
            cm1:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            cm2:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            cor14_3:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            cor15_3:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            certi_change_of_name_of_company:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            cor21_1:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            cm22:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            er_business_trading_name:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            operating_address: "required",
            operating_address_documentary_evidence:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            confirm_of_income_tax:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            confirm_of_vat_register_no:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            ceo_colour_photo_of_sa_id:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            ceo_valid_passport:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx"
            },
            sm_ceo_colour_photo_of_sa_id:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx"
            },
            sm_ceo_valid_passport:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx"
            },
        },
        messages: {
            cm1:
            {
                requiredCheck: "Please upload Certificate Of Incorporation",
                extension: "Please upload only .doc,.docx and .pdf format files for Certificate Of Incorporation"
            },
            cm2:
            {
                requiredCheck: "Please upload Memorandum of Incorporation",
                extension: "Please upload only .doc,.docx and .pdf format files for Memorandum of Incorporation"
            },
            cor14_3:
            {
                requiredCheck: "Please upload Registration Certificate",
                extension: "Please upload only .doc,.docx and .pdf format files for Registration Certificate"
            },
            cor15_3:
            {
                requiredCheck: "Please upload Memorandum of Incorporation",
                extension: "Please upload only .doc,.docx and .pdf format files for Memorandum of Incorporation"
            },
            certi_change_of_name_of_company:
            {
                requiredCheck: "Please upload Certificate of change of name of company",
                extension: "Please upload only .doc,.docx and .pdf format files for Certificate of change of name of company"
            },
            cor21_1:
            {
                requiredCheck: "Please upload Certificate of registered address",
                extension: "Please upload only .doc,.docx and .pdf format files for Certificate of registered address"
            },
            cm22:
            {
                requiredCheck: "Please upload Notice of registered office",
                extension: "Please upload only .doc,.docx and .pdf format files for Notice of registered office"
            },
            er_business_trading_name:
            {
                requiredCheck: "Please upload Evidence reflecting the business trading name",
                extension: "Please upload only .doc,.docx and .pdf format files for Evidence reflecting the business trading name"
            },
            operating_address: "Please enter operating address",
            operating_address_documentary_evidence:
            {
                requiredCheck: "Please upload Recent documentary evidence",
                extension: "Please upload only .doc,.docx and .pdf format files for Recent documentary evidence"
            },
            confirm_of_income_tax:
            {
                requiredCheck: "Please upload Confirmation of Income Tax",
                extension: "Please upload only .doc,.docx and .pdf format files for Confirmation of Income Tax"
            },
            confirm_of_vat_register_no:
            {
                requiredCheck: "Please upload Confirmation of VAT Registration numbers",
                extension: "Please upload only .doc,.docx and .pdf format files for Confirmation of VAT Registration numbers"
            },
            ceo_colour_photo_of_sa_id:
            {
                requiredCheck: "Please upload CEO colour photo of SA ID",
                extension: "Please upload only .doc,.docx and .pdf format files for CEO colour photo of SA ID"
            },
            ceo_valid_passport:
            {
                requiredCheck: "Please upload CEO valid passport",
                extension: "Please upload only .doc,.docx and .pdf format files for CEO valid passport"
            },
            sm_ceo_colour_photo_of_sa_id:
            {
                requiredCheck: "Please upload SpaceMatch colour photo of SA ID",
                extension: "Please upload only .doc,.docx and .pdf format files for SpaceMatch colour photo of SA ID"
            },
            sm_ceo_valid_passport:
            {
                requiredCheck: "Please upload SpaceMatch Valid passport",
                extension: "Please upload only .doc,.docx and .pdf format files for SpaceMatch Valid passport"
            }
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {

            error.addClass( "invalid-feedback" );
            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent());
            }
            else if ( element.prop( "type" ) === "file" ) {
                error.insertAfter( element.parent() );
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

    listedCompForm.validate( {
        rules: {
            registered_name:"required",
            registered_name_path1:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            registration_number:"required",
            registration_number_path:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            registered_address:"required",
            registered_address_path:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            trading_name:"required",
            trading_name_path:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            operating_address1:"required",
            operating_address_path:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            head_office_address:"required",
            head_office_address_path:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            sa_income_tax:"required",
            sa_income_tax_path:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            sa_vat_register_no:"required",
            sa_vat_register_no_path:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            ceo_colour_photo_of_sa_id1:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx",
            },
            ceo_valid_passport1:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx"
            },
            sm_ceo_colour_photo_of_sa_id1:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx"
            },
            sm_ceo_valid_passport1:
            {
                requiredCheck: true,
                extension: "pdf|doc|docx"
            },
        },
        messages: {
            registered_name: "Please enter registered name",
            registered_name_path:
            {
                requiredCheck: "Please upload Documentary evidence of entity's existence",
                extension: "only allow .doc,.docx and .pdf format files for Documentary evidence of entity's existence"
            },
            registration_number: "Please enter Registration number",
            registration_number_path:
            {
                requiredCheck: "Please upload Documentary evidence of entity's registration number",
                extension: "only allow .doc,.docx and .pdf format files for registration number"
            },
            registered_address: "Please enter Registered address",
            registered_address_path:
            {
                requiredCheck: "Please upload Certificate of Incorporation/Registration",
                extension: "only allow .doc,.docx and .pdf format files for Certificate of Incorporation/Registration"
            },
            trading_name: "Please enter Trading name",
            trading_name_path:
            {
                requiredCheck: "Please upload Documentary evidence reflecting the Business / Trading Name",
                extension: "only allow .doc,.docx and .pdf format files for Documentary evidence reflecting the Business / Trading Name"
            },
            operating_address1: "Please enter Operating Address",
            operating_address_path:
            {
                requiredCheck: "Please upload Recent documentary evidence of the operating address",
                extension: "only allow .doc,.docx and .pdf format files for Recent documentary evidence of the operating address"
            },
            head_office_address: "Please enter Head Office Address",
            head_office_address_path:
            {
                requiredCheck: "Please upload Recent documentary evidence of the operating address",
                extension: "only allow .doc,.docx and .pdf format files for Recent documentary evidence of the operating address"
            },
            sa_income_tax: "Please enter SA Income Tax",
            sa_income_tax_path:
            {
                requiredCheck: "Please upload Document/s issued by the SARS containing Income Tax",
                extension: "only allow .doc,.docx and .pdf format files for Document/s issued by the SARS containing Income Tax"
            },
            sa_vat_register_no: "Please enter VAT Registration numbers",
            sa_vat_register_no_path:
            {
                requiredCheck: "Please upload Document/s issued by the SARS containing VAT Registration Numbers ",
                extension: "only allow .doc,.docx and .pdf format files for Document/s issued by the SARS containing VAT Registration Numbers "
            },
            ceo_colour_photo_of_sa_id1:
            {
                requiredCheck: "Please upload CEO colour photo of SA ID",
                extension: "Please upload only .doc,.docx and .pdf format files for CEO colour photo of SA ID"
            },
            ceo_valid_passport1:
            {
                requiredCheck: "Please upload CEO Valid passport",
                extension: "Please upload only .doc,.docx and .pdf format files for CEO Valid passport"
            },
            sm_ceo_colour_photo_of_sa_id1:
            {
                requiredCheck: "Please upload SpaceMatch photo of SA ID",
                extension: "Please upload only .doc,.docx and .pdf format files for SpaceMatch photo of SA ID"
            },
            sm_ceo_valid_passport1:
            {
                requiredCheck: "Please upload SpaceMatch valid passport",
                extension: "Please upload only .doc,.docx and .pdf format files for SpaceMatch valid passport"
            },
        },
        errorElement: "em",
        errorPlacement: function ( error, element ) {

            error.addClass( "invalid-feedback" );
            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent());
            }
            else if ( element.prop( "type" ) === "file" ) {
                error.insertAfter( element.parent() );
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

    $('#updateFICAIndividuals').click(function() {

        $("#colour_photo_of_sa_id").removeClass('is-invalid');
        if (individualsForm.valid() == true) {
            var formData = new FormData(individualsForm[0]);
            formData.append("category","individuals");
            $.ajax({
                url: api_url + "update-fica-details",
                method: 'post',
                data: formData,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
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
                        $('#success-message-show').text(data.message);
                        $.ajax({
                            url: base_url + "/update-fica-status",
                            method: 'get',
                        });
                        setTimeout(function(){
                            location.reload();
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
                        });
                    }
                }
            });
        }
    });
    $('#updateFICANonListedCompanies').click(function() {
        if (nonListedCompForm.valid() == true) {
            var formData = new FormData(nonListedCompForm[0]);
            formData.append("category","non_listed_companies");
            $.ajax({
                url: api_url + "update-fica-details",
                method: 'post',
                data: formData,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
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
                        $('#success-message-show').text(data.message);

                        setTimeout(function(){
                            location.reload();
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
                        });
                    }
                }
            });
        }
    });
    $('#updateFICAListedCompanies').click(function() {
        if (listedCompForm.valid() == true) {
            var formData = new FormData(listedCompForm[0]);
            formData.append("category","listed_companies");
            $.ajax({
                url: api_url + "update-fica-details",
                method: 'post',
                data: formData,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
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
                        $('#success-message-show').text(data.message);

                        setTimeout(function(){
                            location.reload();
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
                        });
                    }
                }
            });
        }
    });
    /* Toggle Text Box */
    $('.isFicaOptionClick').each(function() {
        var $isFicaOptionClick = $(this);
        var blockToShow =  $(this).attr('aria-controls');
        if($isFicaOptionClick.find('input[type="checkbox"]').prop("checked") == true)
            $('#'+blockToShow).show();
        else
            $('#'+blockToShow).hide();

        $(".custom-control-label", $isFicaOptionClick).on("click", function() {
            var isChecked = $('#'+$(this).prop('for')).prop('checked');
            $('.isFicaOptionShow').hide();
            $('input[name="fica_categories"]').each(function() {
                this.checked = false;
            });
            $('#'+blockToShow).show();
        });
    });


    $('.custom-file').each(function() {
        var $customfil = $(this);
        var fileName = '';
        $(".custom-file-input", $customfil).on("change", function() {
            fileName = $(this).val().split("\\").pop();
            $(".custom-file-label", $customfil).siblings('.delete-action').find("span").addClass("selected").html(fileName);
            $(".icon-delete", $customfil).show();
            $(".custom-file-input", $customfil).attr('value',fileName);
            $(this).blur();
        });
        $(".icon-delete", $customfil).on("click", function() {
            var fileName = "";
            $(".custom-file-input", $customfil).attr('value','');
            $("span", $customfil).removeClass("selected").html(fileName);
            $(".icon-delete", $customfil).hide();
        });
    });

    $("input.individuals-upload").change(function(){
        formdata = new FormData();
        if($(this).prop('files').length > 0)
        {
            file =$(this).prop('files')[0];
            uploadFile(file, 'individuals', $(this).attr('name'));
        }
    });
    $("input.non-listed-upload").change(function(){
        formdata = new FormData();
        if($(this).prop('files').length > 0)
        {
            file =$(this).prop('files')[0];
            uploadFile(file, 'non_listed_companies', $(this).attr('name'));
        }
    });
    $("input.listed-upload").change(function(){
        formdata = new FormData();
        if($(this).prop('files').length > 0)
        {
            file =$(this).prop('files')[0];
            uploadFile(file, 'listed_companies', $(this).attr('name'));
        }
    });

    var addShareholdersNonListedForm = $('#addShareholdersNonListedForm');
    $('#add-shareholder-non-listed').click(function() {
        var is_valid = true;
        $("#addShareholdersNonListedForm .custom-file-input").each(function(){
            if($(this).attr('value') == ''){
                is_valid = false;
                $(this).parent().next('em.error').text('Please upload '+$(this).parent().parent().find('label.font-weight-medium').text()).show();
            }else{
                var allowedFiles = ["doc", "docx", "pdf"];
                var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
                var fileName = $(this).attr('value');
                var file_ext  = fileName.split('.').pop().toLowerCase();
                if($.inArray(file_ext, allowedFiles) == -1) {
                    is_valid = false;
                    $(this).parent().next('em.error').text('Please upload only .doc,.docx and .pdf format files for '+$(this).parent().parent().find('label.font-weight-medium').text()).show();
                }else{
                    $(this).parent().next('em.error').text('').hide();
                }
            }
        });
        if (is_valid == true) {
            var formData = new FormData(addShareholdersNonListedForm[0]);
            formData.append("category","non_listed_companies");
            $.ajax({
                url: api_url + "update-fica-shareholders",
                method: 'POST',
                data:  formData,
                enctype: 'multipart/form-data',
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
                    $('#success-message').show();
                    $('#success-message-show').text(data.message);
                    $('#modalAddShareholdersNonListed').modal('hide');
                    setTimeout(function(){
                        $('#success-message').hide();
                        $('#success-message-show').text('');
                    }, 2000);
                },
                error: function (data) {
                    $(".loader").hide();
                    if(data.responseJSON.success == false) {
                        $('#data_errors').text('Please upload files').show();
                    }
                }
            });
        }
    });

    var addShareholdersListedForm = $('#addShareholdersListedForm');
    $('#add-shareholder-listed').click(function() {
        var is_valid = true;
        $("#addShareholdersNonListedForm .custom-file-input").each(function(){
            if($(this).attr('value') == ''){
                is_valid = false;
                $(this).parent().next('em.error').text('Please upload '+$(this).parent().parent().find('label.font-weight-medium').text()).show();
            }else{
                var allowedFiles = ["doc", "docx", "pdf"];
                var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
                var fileName = $(this).attr('value');
                var file_ext  = fileName.split('.').pop().toLowerCase();
                if($.inArray(file_ext, allowedFiles) == -1) {
                    is_valid = false;
                    $(this).parent().next('em.error').text('Please upload only .doc,.docx and .pdf format files for '+$(this).parent().parent().find('label.font-weight-medium').text()).show();
                }else{
                    $(this).parent().next('em.error').text('').hide();
                }
            }
        });
        if (is_valid == true) {
            var formData = new FormData(addShareholdersListedForm[0]);
            formData.append("category","listed_companies");
            $.ajax({
                url: api_url + "update-fica-shareholders",
                method: 'POST',
                data:  formData,
                enctype: 'multipart/form-data',
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

                    $('#success-message').show();
                    $('#success-message-show').text(data.message);

                    $('#modalAddShareholdersListed').modal('hide');
                    setTimeout(function(){
                        $('#success-message').hide();
                        $('#success-message-show').text('');
                    }, 2000);
                },
                error: function (data) {
                    $(".loader").hide();
                    if(data.responseJSON.success == false) {
                        $('#data_errors').text('Please upload files').show();
                    }
                }
            });
        }
    });


});

function uploadFile(file, type, fname){

    var allowedFiles = ["doc", "docx", "pdf"];
    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
    var fileName = file.name;
    var file_ext  = file.name.split('.').pop().toLowerCase();
    if($.inArray(file_ext, allowedFiles) == -1) {
        return false;
    }
    var size = (file.size / 1024 / 1024).toFixed(2);
    if (size > 2) {
        $('#'+fname+'_error').show();
        $('#'+fname+'_error').html('Please select file upto 2MB in size.');
        return false;
    }

    formdata = new FormData();
    formdata.append("file", file);
    formdata.append("category", type);
    formdata.append("fieldName", fname);
    $.ajax({
        url: api_url + "fica-upload-file",
        method: 'POST',
        data: formdata,
        processData: false,
        contentType: false,
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

                $('#success-message').show();
                $('#success-message-show').text(data.message);

                $('#'+fname).attr('value',data.data.path);
                var DOCUMENT_STR = '';
                DOCUMENT_STR = '<a href="'+data.data.path+'" download="'+data.data.path+'" target="_blank">'+data.data.path.split('/').pop()+'</a>';
                $('input[name="'+fname+'"]').siblings('.delete-action').find("span").html('');
                $('input[name="'+fname+'"]').siblings('.delete-action').find("span").html(DOCUMENT_STR);

                setTimeout(function(){
                    $('#success-message').hide();
                    $('#success-message-show').text('');
                }, 2000);
            }
        },
        error: function (data) {
            $(".loader").hide();
            if(data.responseJSON.success == false) {
                var messageList = data.responseJSON.message;
                $.each(messageList, function(index, item) {
                    $('#'+fname+'_error').show();
                    $('#'+fname+'_error').html(item);
                });
            }
        }
    });
}


function showLabel(obj) {
    fileName = obj.val().split("\\").pop();
    obj.siblings('.delete-action').find("span").addClass("selected").html(fileName);
    obj.siblings('.delete-action').find(".icon-delete").show();
    obj.attr('value',fileName);
    obj.blur();
}


function deleteFileLabel(obj) {
    var fileName = "";
    obj.parent().parent().find(".custom-file-input").attr('value','');
    obj.siblings("span").removeClass("selected").html(fileName);
    obj.hide();
}
