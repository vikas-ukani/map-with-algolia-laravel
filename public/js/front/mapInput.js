var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initialize() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    var input = document.getElementById('address');
    var options = {
        // types: ['geocode'],
        componentRestrictions: {country: 'ZA'}
    };
    autocomplete = new google.maps.places.Autocomplete(input, options);

    //autocomplete.setFields(['address_component']);
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {

    
    $("#loader").show();
    $("#space-list").hide();
    $("#space-top-list").hide();
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    $('#address_lat').val(place.geometry['location'].lat()).change();
    $('#address_lon').val(place.geometry['location'].lng()).change();
    $('#address_url').val(place.url);
    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }
    

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        if(val)
        document.getElementById(addressType).value = val;
        }
    }
}
