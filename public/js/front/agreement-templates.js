$(document).ready(function() {
    loadAgreementTemplates();
    var editor1 = new FroalaEditor('#addAgreementTemplate textarea#agreement_details', {
        toolbarButtons: [['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|','fontFamily', 'fontSize', 'color','|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertTable', '|', 'fontAwesome', 'insertHR', '|', 'undo', 'redo']],
        events: {
                'contentChanged': function () {
                    $('.fr-box .fr-wrapper > div:first').find('a').remove();
                }
            }
        }, function () {
            $('.fr-box .fr-wrapper > div:first').find('a').remove();
    });

    var addAgreementTemplate = $('#addAgreementTemplate');
    addAgreementTemplate.validate( {
        rules: {
            agreement_name: "required",
            agreement_details: "required",
        },
        messages: {
            agreement_name: "Please enter Agreement Name",
            agreement_details: "Please enter Agreement Detail",
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
        },
        submitHandler: function() {
            $successMsg.show();
        }
    });


    $('#add-agreement').click(function() {
        var messageLength = getString(editor1.html.get());
        if($('#agreement_name').val() == ''){
            $('#agreement_name_error').show();
            $('#agreement_name_error').html('Please enter agreement name.');
        }else{
            $('#agreement_name_error').hide();
            $('#agreement_name_error').html('');
        }
        if( !messageLength )
        {
            $('#agreement_details_error').show();
            $('#agreement_details_error').html('Please enter agreement detail.');
            event.preventDefault( );
            return false;
        }
        if (addAgreementTemplate.valid() == true) {

            var agreementId = $("#addAgreementTemplate #agreementId").val();
            if(agreementId != ''){
                var url = api_url + "agreement-template/"+$("#addAgreementTemplate #agreementId").val();
                var method = "PATCH";
            }else{
                var url = api_url + "agreement-template";
                var method = "POST";
            }
            $.ajax({
                url: url ,
                method: method,
                data: {
                    agreement_name : $('#agreement_name').val(),
                    agreement_details: messageLength
                },
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
                        addAgreementTemplate[0].reset();
                        $("#tblDetailAgreements").find("tr:gt(0)").remove();
                        var tbody =  $('<tbody/>');
                        var tr_row =  $('<tr/>');
                        tr_row.append("<td colspan='2'><p class='text-center'>Loading agreement templates...</p></td>");
                        tbody.append(tr_row);
                        $("#agreement_list").after(tbody);
                        setTimeout(function(){
                            loadAgreementTemplates();
                            $('#success-message').hide();
                            $('#success-message-show').text('');
                        }, 2000);
                        $('#add-agreement').text('Add Agreement');
                    }
                },
                error: function (data) {
                    $(".loader").hide();
                    if(data.responseJSON.success == false) {
                        var messageList = data.responseJSON.message;
                        $.each(messageList, function(index, item) {
                            if(index == 'agreement_name')
                            {
                                $('#agreement_name_error').show();
                                $('#agreement_name_error').html(item);
                            }
                            if(index == 'agreement_details')
                            {
                                $('#agreement_details_error').show();
                                $('#agreement_details_error').html(item);
                            }
                        });
                    }
                }
            });

            $("#addAgreementTemplate #agreementId").val('');
            $("#addAgreementTemplate #agreement_name").val('');
            $("#addAgreementTemplate #agreement_details").text('');
        }
    });

    $('.show-variable-list').click(function () {
        $('#modalVariableList').modal('show');
    });
});


$('#delete-agreement').click(function() {
    var agreementId = $('#modalAgreementDeleteConfimation #agreementId').val();
    $.ajax({
        url: api_url+"agreement-template/"+agreementId,
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
                $('#success-message').show();
                $('#success-message-show').text(data.message);
                $('#modalAgreementDeleteConfimation').modal('hide');
                $("#tblDetailAgreements").find("tr:gt(0)").remove();
                var tbody =  $('<tbody/>');
                var tr_row =  $('<tr/>');
                tr_row.append("<td colspan='2'><p class='text-center'>Loading agreement templates...</p></td>");
                tbody.append(tr_row);
                $("#agreement_list").after(tbody);
                setTimeout(function(){
                    loadAgreementTemplates();
                    $('#success-message').hide();
                    $('#success-message-show').text('');
                }, 2000);
            }
        },
        error: function (data) {
        $(".loader").hide();
        $('#modalAgreementDeleteConfimation').modal('hide');
        }
    });
});

function loadAgreementTemplates()
{
    $.ajax({
        url: api_url + "agreement-template/all",
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
            $( "#agreement_list").after('');
            var agreement_details = data.data;
            $("#tblDetailAgreements").find("tr:gt(0)").remove();
            if(agreement_details.length == 0)
            {
                var tbody =  $('<tbody/>');
                var tr_row =  $('<tr/>');
                tr_row.append("<td colspan='3'><p class='text-center'>No Agreement Templates</p></td>");
                tbody.append(tr_row);
                $( "#agreement_list" ).after(tbody);
            }
            if(agreement_details.length > 0)
            {
                for(var e=0;e<agreement_details[0].length;e++)
                {
                    var tbody =  $('<tbody/>');
                    var tr_row =  $('<tr/>');
                    tr_row.append('<td data-th="agreement_name">'+ agreement_details[0][e]['name'] + '</td>');
                    var action_td;
                    action_td = $('<td/>').attr('data-th','action').addClass("text-lg-right");
                    action_td.append('<a data-id="'+ agreement_details[0][e]['id'] +'"  onClick="javascript:setTemplate('+ agreement_details[0][e]['id'] +')"><i class="icon icon-edit-black mr-3"></i></a>');
                    tr_row.append(action_td);
                    tbody.append(tr_row);
                    $("#tblDetailAgreements").children().last().after(tbody);
                }

                for(var e=0;e<agreement_details[1].length;e++)
                {
                    var tbody =  $('<tbody/>');
                    var tr_row =  $('<tr/>');
                    tr_row.append('<td data-th="agreement_name">'+ agreement_details[1][e]['agreement_name'] + '</td>');
                    var action_td;
                    action_td = $('<td/>').attr('data-th','action').addClass("text-lg-right");
                    action_td.append('<a data-id="'+ agreement_details[1][e]['id'] +'"  class="open-EditAgreementDialog"><i class="icon icon-edit-black mr-3"></i></a>');
                    // action_td.append('<a href="javascript:void(0);" data-id="'+ agreement_details[1][e]['id'] +'" class="open-DeleteAgreementDialog"><i class="icon icon-delete-black"></i></a>');
                    tr_row.append(action_td);
                    tbody.append(tr_row);
                    $("#tblDetailAgreements").children().last().after(tbody);
                }
                $('.open-DeleteAgreementDialog').click(function () {
                    var agreementId = $(this).data('id');
                    $("#modalAgreementDeleteConfimation #agreementId").val('');
                    $("#modalAgreementDeleteConfimation #agreementId").val( agreementId );
                    $('#modalAgreementDeleteConfimation').modal('show');
                });

                $('.open-EditAgreementDialog').click(function () {
                    var agreementId = $(this).data('id');
                    $('#add-agreement').text('Edit Agreement');
                    $.ajax({
                        url: api_url+"agreement-template/"+agreementId,
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

                            $("#addAgreementTemplate #agreementId").val('');
                            $("#addAgreementTemplate #agreement_name").val('');
                            $("#addAgreementTemplate #agreement_details").text('');

                            var editor1 = new FroalaEditor('#addAgreementTemplate textarea#agreement_details', {
                                toolbarButtons: [['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|','fontFamily', 'fontSize', 'color','|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertTable', '|', 'fontAwesome', 'insertHR', '|', 'undo', 'redo']],
                                events: {
                                        'contentChanged': function () {
                                            $('.fr-box .fr-wrapper > div:first').find('a').remove();
                                        }
                                    }
                                }, function () {
                                    $('.fr-box .fr-wrapper > div:first').find('a').remove();
                            });
                            $("#addAgreementTemplate #agreementId").val( agreementId );
                            $("#addAgreementTemplate #agreement_name").val( data.data.agreement_name);
                            $("#addAgreementTemplate #agreement_details").text( data.data.agreement_details);

                            editor1.html.set(data.data.agreement_details);
                            $('#addAgreementTemplate #agreement_name_error').hide();
                            $('#addAgreementTemplate #agreement_details_error').hide();
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

function getString(string){
    avoid = '<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>';
    myString = string.replace(avoid,'');
    return myString;
}

function setTemplate(templateId){
    $.ajax({
        url: api_url+"agreement-template/admin/"+templateId,
        method: 'get',
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
                $("#addAgreementTemplate #agreementId").val('');
                $("#addAgreementTemplate #agreement_name").val('');
                $("#addAgreementTemplate #agreement_details").text('');
                $('#add-agreement').text('Add Agreement');
                var editor2 = new FroalaEditor('#addAgreementTemplate textarea#agreement_details', {
                    toolbarButtons: [['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|','fontFamily', 'fontSize', 'color','|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertTable', '|', 'fontAwesome', 'insertHR', '|', 'undo', 'redo']],
                    events: {
                            'contentChanged': function () {
                                $('.fr-box .fr-wrapper > div:first').find('a').remove();
                            }
                        }
                    }, function () {
                        $('.fr-box .fr-wrapper > div:first').find('a').remove();
                });
                $("#addAgreementTemplate #agreementId").val('');
                $("#addAgreementTemplate #agreement_name").val('');
                $("#addAgreementTemplate #agreement_details").text(data.data.agreement_content);

                editor2.html.set(data.data.agreement_content);
                $('#addAgreementTemplate #agreement_name_error').hide();
                $('#addAgreementTemplate #agreement_details_error').hide();
            }
        },
        error: function (data) {
            $(".loader").hide();
        }
    });
}
