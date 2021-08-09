jQuery(document).ready(function($){
    //Tracking conversions in Google Analytics

    //Phone Numbers
    $('#contactUsPhone').click(function(){
        gaEventTracing('Phone', 'On-click');
    });

    //Email Addresses
    $('#emailUsLink').click(function(){
        gaEventTracing('Email', 'On-click');
    });

    // Start Enquiry Button
    $('#submitEnquiry').click(function(){
        gaEventTracing('Start Enquiry', 'On-click');
    });

    //SEND US AN EMAIL link on listings
    $('#sendUsEmail').click(function(){
        gaEventTracing('Send email from Space detail page', 'On-click');
    });

    $('#sendPropertyEmail').click(function(){
        gaEventTracing('Send email from Property detail page', 'On-click');
    });

    $('#sendPropertyCall').click(function(){
        gaEventTracing('Property Call', 'On-click');
    });
});
function gaEventTracing(label, category){
    gtag('event', 'click', {
            'send_to': 'UA-171845301-1',
            'event_category': category,
            'event_label': label
        }
    );
 }
