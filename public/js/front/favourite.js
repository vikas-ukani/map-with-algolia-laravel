function isAuthenticated(){
    if(user_id > 0){
        return true;
    }else{
        $.redirect(base_url + '/login',
        {
            "_token": $('meta[name="csrf-token"]').attr('content'),
            'previous_url': window.location.pathname,
        },
        "POST");
    }
}
function addToFavorite(space_id, obj, is_detail_page)
{
    if(isAuthenticated()){
        $.ajax({
            url: api_url + "space/add-to-favorite/"+space_id,
            method: 'post',
            data: {},
            headers: {
            'Authorization': 'Bearer '+ token,
            },
            beforeSend: function() {
                $('.loader').show().css('opacity','0.4');
            },
            success: function (data) {
                $(".loader").hide();
                if(data.success == true){
                    if(is_detail_page){
                        var divHtml = '<a onclick="javascript:removeFromFavorite('+space_id+',this, true)" class="text-primary small"><i class="icon icon-heart-mountain mr-2"></i> Remove as Favourite</a>';
                    }else{
                        var divHtml = '<a class="space-like" onClick="javascript:removeFromFavorite('+space_id+', this)"><i class="icon icon-heart-active" title="Remove as Favourite"></i></a>';
                    }
                    $(obj).parent().html(divHtml);
                }
            },
            error: function (data) {
                $(".loader").hide();
            }
        });
    }
}
function removeFromFavorite(space_id, obj, is_detail_page)
{
    if(isAuthenticated()){
        if(space_id != ''){
            $.ajax({
                url: api_url + "space/remove-from-favorite/"+space_id,
                method: 'post',
                data: {},
                headers: {
                'Authorization': 'Bearer '+ token,
                },
                beforeSend: function() {
                    $('.loader').show().css('opacity','0.4');
                },
                success: function (data) {
                    $(".loader").hide();
                    if(data.success == true){
                        if(is_detail_page){
                            var divHtml = '<a onclick="javascript:addToFavorite('+space_id+',this, true)" class="text-primary small"><i class="icon icon-heart-mountain mr-2"></i> Add as Favourite</a>';
                        }else{
                            var divHtml = '<a class="space-like" onClick="javascript:addToFavorite('+space_id+', this)"><i class="icon icon-heart" title="Add as Favourite"></i></a>';                    }
                        $(obj).parent().html(divHtml);
                    }
                },
                error: function (data) {
                    $(".loader").hide();
                }
            });
        }
    }
}

function removeFromFavoriteList(space_id, obj)
{
    if(isAuthenticated()){
        if(space_id != ''){
            $.ajax({
                url: api_url + "space/remove-from-favorite/"+space_id,
                method: 'post',
                data: {},
                headers: {
                'Authorization': 'Bearer '+ token,
                },
                beforeSend: function() {
                    $('.loader').show().css('opacity','0.4');
                },
                success: function (data) {
                    $(".loader").hide();
                    if(data.success == true){
                        $(obj).parent().parent().remove();
                        $('#success-message').show();
                        $('#success-message-show').text(data.message);
                        setTimeout(function(){
                            $('#success-message').hide();
                            $('#success-message-show').text('');
                        }, 2000);
                        if($('#my-spaces').children().length == 0){
                            $('#my-spaces').html('<div class="col-lg-6">You do not have any space in favourite list.</div>');
                        }
                    }
                },
                error: function (data) {
                    $(".loader").hide();
                }
            });
        }
    }
}

function myFavoritesFindSpace() {

    if(user_id > 0){
        $.ajax({
            url: api_url + "space/my-favorites",
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
                $.each(data.data.data, function( index, items ) {
                    $.each( items.favorites, function( key, space ) {
                        $('#filter-space-list .space-item').each(function(){
                            if($(this).attr('data-id') == space.property_id){
                                var divHtml = '<a class="space-like" onClick="javascript:removeFromFavorite('+space.property_id+', this)"><i class="icon icon-heart-active" title="Remove as Favourite"></i></a>';
                                $(this).find('.space-favorite').html(divHtml);
                            }
                        });
                    });
                });
            },
            error: function (data) {
                $(".loader").hide();
            }
        });
    }
}
