function viewAcceptFicaDetails(enquiryId, userId)
{
    $.ajax({
        url: api_url+"get-details/"+userId,
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
                var details;
                if(data.data.fica_individuals_details != null){
                    details  = '<li>Colour photo of SA ID : <a href="'+data.data.fica_individuals_details.colour_photo_of_sa_id+'" title="Download" target="_blank">'+getFileName(data.data.fica_individuals_details.colour_photo_of_sa_id)+'</a></li>'+
                    '<li>Valid passport : <a href="'+data.data.fica_individuals_details.valid_passport+'" title="Download" target="_blank">'+getFileName(data.data.fica_individuals_details.valid_passport)+'</a></li>'+
                    '<li>Valid proof of address : <a href="'+data.data.fica_individuals_details.proof_of_address+'" title="Download" target="_blank">'+getFileName(data.data.fica_individuals_details.proof_of_address)+'</a></li>';
                }else if(data.data.fica_non_listed_companies_details != null){
                    details  = '<li>Certificate Of Incorporation  : <a href="'+data.data.fica_non_listed_companies_details.cm1+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.cm1)+'</a></li>'+
                    '<li>Registration Certificate : <a href="'+data.data.fica_non_listed_companies_details.cm2+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.cm2)+'</a></li>'+
                    '<li>Memorandum of Incorporation : <a href="'+data.data.fica_non_listed_companies_details.cor14_3+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.cor14_3)+'</a></li>'+
                    '<li>Certificate of change of name of company : <a href="'+data.data.fica_non_listed_companies_details.certi_change_of_name_of_company+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.certi_change_of_name_of_company)+'</a></li>'+
                    '<li>Certificate of registered address : <a href="'+data.data.fica_non_listed_companies_details.cor21_1+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.cor21_1)+'</a></li>'+
                    '<li>Notice of registered office : <a href="'+data.data.fica_non_listed_companies_details.cm22+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.cm22)+'</a></li>'+
                    '<li>Evidence reflecting the business trading name : <a href="'+data.data.fica_non_listed_companies_details.er_business_trading_name+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.er_business_trading_name)+'</a></li>'+
                    '<li>Operating Address  : '+data.data.fica_non_listed_companies_details.operating_address+'</a></li>'+
                    '<li>Recent documentary evidence : <a href="'+data.data.fica_non_listed_companies_details.operating_address_documentary_evidence+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.operating_address_documentary_evidence)+'</a></li>'+
                    '<li>Confirmation of Income Tax : <a href="'+data.data.fica_non_listed_companies_details.confirm_of_income_tax+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.confirm_of_income_tax)+'</a></li>'+
                    '<li>Confirmation of VAT Registration numbers : <a href="'+data.data.fica_non_listed_companies_details.confirm_of_vat_register_no+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.confirm_of_vat_register_no)+'</a></li>'+
                    '<li>CEO colour photo of SA ID : <a href="'+data.data.fica_non_listed_companies_details.ceo_colour_photo_of_sa_id+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.ceo_colour_photo_of_sa_id)+'</a></li>'+
                    '<li>CEO valid passport : <a href="'+data.data.fica_non_listed_companies_details.ceo_valid_passport+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.ceo_valid_passport)+'</a></li>'+
                    '<li>SpaceMatch colour photo of SA ID : <a href="'+data.data.fica_non_listed_companies_details.sm_ceo_colour_photo_of_sa_id+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.sm_ceo_colour_photo_of_sa_id)+'</a></li>'+
                    '<li>SpaceMatch Valid passport : <a href="'+data.data.fica_non_listed_companies_details.sm_ceo_valid_passport+'" title="Download" target="_blank">'+getFileName(data.data.fica_non_listed_companies_details.sm_ceo_valid_passport)+'</a></li>';
                    if(data.data.fica_non_listed_companies_details.fica_non_listed_companies_shareholders != null){
                        details  += getFicaShareHolders(data.data.fica_non_listed_companies_details.fica_non_listed_companies_shareholders);
                    }

                }else if(data.data.fica_listed_companies_details != null){
                    details  = '<li>Registered name : <a href="'+data.data.fica_listed_companies_details.registered_name+'" title="Download" target="_blank">'+data.data.fica_listed_companies_details.registered_name+'</a></li>'+
                    '<li>Documentary evidence of entity\'s existence : <a href="'+data.data.fica_listed_companies_details.registered_name_path+'">'+getFileName(data.data.fica_listed_companies_details.registered_name_path)+'</a></li>'+
                    '<li>Registration number : <a href="'+data.data.fica_listed_companies_details.registration_number+'">'+data.data.fica_listed_companies_details.registration_number+'</a></li>'+
                    '<li> Documentary evidence of entity\'s registration number : <a href="'+data.data.fica_listed_companies_details.registration_number_path+'" title="Download" target="_blank">'+getFileName(data.data.fica_listed_companies_details.registration_number_path)+'</a></li>'+
                    '<li>Registered address : <a href="'+data.data.fica_listed_companies_details.registered_address+'">'+data.data.fica_listed_companies_details.registered_address+'</a></li>'+
                    '<li>Certificate of Incorporation/Registration : <a href="'+data.data.fica_listed_companies_details.registered_address_path+'" title="Download" target="_blank">'+getFileName(data.data.fica_listed_companies_details.registered_address_path)+'</a></li>'+
                    '<li>Trading name : <a href="'+data.data.fica_listed_companies_details.trading_name+'">'+data.data.fica_listed_companies_details.trading_name+'</a></li>'+
                    '<li>Documentary evidence reflecting the Business / Trading Name : <a href="'+data.data.fica_listed_companies_details.trading_name_path+'" title="Download" target="_blank">'+getFileName(data.data.fica_listed_companies_details.trading_name_path)+'</a></li>'+
                    '<li>Operating Address : <a href="'+data.data.fica_listed_companies_details.operating_address+'">'+data.data.fica_listed_companies_details.operating_address+'</a></li>'+
                    '<li>Recent documentary evidence of the operating address : <a href="'+data.data.fica_listed_companies_details.operating_address_path+'" title="Download" target="_blank">'+getFileName(data.data.fica_listed_companies_details.operating_address_path)+'</a></li>'+
                    '<li>Head Office Address : <a href="'+data.data.fica_listed_companies_details.head_office_address+'">'+data.data.fica_listed_companies_details.head_office_address+'</a></li>'+
                    '<li>Recent documentary evidence of the operating address : <a href="'+data.data.fica_listed_companies_details.head_office_address_path+'" title="Download" target="_blank">'+getFileName(data.data.fica_listed_companies_details.head_office_address_path)+'</a></li>'+
                    '<li>SA Income Tax : <a href="'+data.data.fica_listed_companies_details.sa_income_tax+'">'+data.data.fica_listed_companies_details.sa_income_tax+'</a></li>'+
                    '<li>Document/s issued by the SARS containing Income Tax : <a href="'+data.data.fica_listed_companies_details.sa_income_tax_path+'" title="Download" target="_blank">'+getFileName(data.data.fica_listed_companies_details.sa_income_tax_path)+'</a></li>'+
                    '<li>VAT Registration numbers : <a href="'+data.data.fica_listed_companies_details.sa_vat_register_no+'">'+data.data.fica_listed_companies_details.sa_vat_register_no+'</a></li>'+
                    '<li>Document/s issued by the SARS containing VAT Registration Numbers : <a href="'+data.data.fica_listed_companies_details.sa_vat_register_no_path+'" title="Download" target="_blank">'+getFileName(data.data.fica_listed_companies_details.sa_vat_register_no_path)+'</a></li>'+
                    '<li>CEO colour photo of SA ID : <a href="'+data.data.fica_listed_companies_details.ceo_colour_photo_of_sa_id+'" title="Download" target="_blank">'+getFileName(data.data.fica_listed_companies_details.ceo_colour_photo_of_sa_id)+'</a></li>'+
                    '<li>CEO valid passport : <a href="'+data.data.fica_listed_companies_details.ceo_valid_passport+'" title="Download" target="_blank">'+getFileName(data.data.fica_listed_companies_details.ceo_valid_passport)+'</a></li>'+
                    '<li>SpaceMatch colour photo of SA ID : <a href="'+data.data.fica_listed_companies_details.sm_ceo_colour_photo_of_sa_id+'" title="Download" target="_blank">'+getFileName(data.data.fica_listed_companies_details.sm_ceo_colour_photo_of_sa_id)+'</a></li>'+
                    '<li>SpaceMatch Valid passport : <a href="'+data.data.fica_listed_companies_details.sm_ceo_valid_passport+'" title="Download" target="_blank">'+getFileName(data.data.fica_listed_companies_details.sm_ceo_valid_passport)+'</a></li>';
                }
                $('#modalViewAcceptFICA #enquiryId').val('');
                $('#modalViewAcceptFICA #enquiryId').val(enquiryId);
                $('#modalViewAcceptFICA #userFicaDetails').html(details);
                $('#modalViewAcceptFICA').modal('show');
            }
        },
        error: function (data) {
            $(".loader").hide();
            if(data.responseJSON.success == false) {
                var messageList = data.responseJSON.message;
                $.each(messageList, function(index, item) {
                    if(index == date_block1)
                        $("#"+index).addClass( "invalid-feedback is-invalid" );
                });
            }
        }
    });

}
function getFileName(url){
    if(url != null){
        return url.split('/').pop()+'<i class="icon icon-download-active ml-1"></i>';
    }
    return '-';
}

function getFicaShareHolders(details){
    if(details != null){
        var html = '<li><h3>Shareholders</h3>';
        for(var pa=0;pa<details.length;pa++){
            html +='<p class="fica-counter">'+ (pa+1)+'<ul><li>CEO colour photo of SA ID : <a href="'+details[pa].colour_photo_of_sa_id+'" title="Download" target="_blank">'+getFileName(details[pa].colour_photo_of_sa_id)+'</a></li>'+
                '<li>CEO Valid passport : <a href="'+details[pa].valid_passport+'" title="Download" target="_blank">'+getFileName(details[pa].valid_passport)+'</a></li>'+
                '<li>Documentary evidence of shareholding : <a href="'+details[pa].documentary_evidence+'" title="Download" target="_blank">'+getFileName(details[pa].documentary_evidence)+'</a></li></ul>';
        }
        html += '</li>';
        return html;
    }
}
