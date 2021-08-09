// Forgot password javascript
$(document).ready( function () { 

    loadEntities();

    $('#companyname_error').hide();
    $('#registrationnumber_error').hide();
    $('#vatnumber_error').hide();

    var staffPermission = $("#staffPermissionList").val();
    var new_staffPermission = staffPermission.split('#'); 
    $('#edit_staff_permission').html('');
    $('#edit_staff_permission').append($("<option></option>").attr("value","").text("-Select Permission-")); 
    $.each(new_staffPermission, function(key, value) {      
            var permission_list = value.split(',');             
            $('#edit_staff_permission').append($("<option></option>").attr("value",permission_list[0]).text(permission_list[1]));                           
      }); 

    var addEntityForm = $('#addEntityForm');
    addEntityForm.validate( {
      rules: {
				companyname: {
					required: true,
					minlength: 2, 
        },
        registrationnumber:'required',
        vatnumber:'required',
			},
      messages: {
        companyname: {
          required: "Please enter company name",
        },
        registrationnumber: "Please enter registration number",
        vatnumber: "Please enter vat number",
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
      }
    });
  
  $('#add-entity').click(function() { 
   if (addEntityForm.valid() == true) {
      var formData = addEntityForm.serializeArray();  
      $.ajax({
                url: api_url + "entity", 
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
                      $('#success-message').show();
                      $('#success-message-show').text(data.message);  
                      addEntityForm[0].reset();
                      $("#tblDetailEntity").find("tr:gt(0)").remove();
                      var tbody =  $('<tbody/>'); 
                      var tr_row =  $('<tr/>');
                      tr_row.append("<td colspan='7'><p class='text-center'>Loading Entities....</p></td>");
                      tbody.append(tr_row);       
                      $( "#entity_list" ).after(tbody);   
                      setTimeout(function(){
                        loadEntities();
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
                        if(index == 'companyname')
                        {
                          $('#companyname_error').show();
                          $('#companyname_error').html(item);
                        }      
                        if(index == 'registrationnumber')
                        {
                          $('#registrationnumber_error').show();
                          $('#registrationnumber_error').html(item);
                        } 
                        if(index == 'vatnumber')
                        {
                          $('#vatnumber_error').show();
                          $('#vatnumber_error').html(item);
                        }             
                    });
                  } 
              }
            }); 
      }
  });


});

$( "#vatnumber" ).focus(function() {
  $('#vatnumber_error').hide();
  $('#vatnumber_error').html('');
});

$( "#companyname" ).focus(function() {
  $('#companyname_error').hide();
  $('#companyname_error').html('');
});

$( "#registrationnumber" ).focus(function() {
  $('#registrationnumber_error').hide();
  $('#registrationnumber_error').html('');
});

function loadEntities()
{
    $.ajax({
        url: api_url + "entity", 
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
            $( "#entity_list").after('');
            var entity_details = data.data;
            $("#tblDetailEntity").find("tr:gt(0)").remove();
            if(entity_details.length == 0)
            { 
              var tbody =  $('<tbody/>'); 
              var tr_row =  $('<tr/>');
              tr_row.append("<td colspan='7'><p class='text-center'>No Entitys</p></td>");
              tbody.append(tr_row);       
              $( "#entity_list" ).after(tbody);        
            } 
            
            if(entity_details.length > 0)
            {
               
              for(var e=0;e<entity_details.length;e++)
              { 
                  var tbody =  $('<tbody/>'); 
                  var tr_row =  $('<tr/>');
                  tr_row.append('<td data-th="Company Name">'+ entity_details[e]['name'] + '</td>');
                  tr_row.append('<td data-th="vat number">'+ entity_details[e]['registration_number'] +'</td>');
                  tr_row.append('<td data-th="REG no">'+ entity_details[e]['vat_number'] +'</td>');
                  tr_row.append('<td data-th="porfolios"><span class="font-weight-bold text-dark">'+entity_details[e]['portfolio_count']+'</span></td>');
                  tr_row.append('<td data-th="spaces"><span class="font-weight-bold text-dark">'+entity_details[e]['space_count']+'</a></td>');
                  tr_row.append('<td data-th="staffs"><span class="font-weight-bold text-dark">'+entity_details[e]['staff_count']+'</a></td>');
 
                  var action_td = $('<td/>').attr('data-th','action').addClass("text-lg-right");
                  action_td.append('<a href="javascript:void(0);" title="Add/Maintain Users" data-toggle="collapse" data-target="#no-records-of-rows-'+ entity_details[e]['id'] +'" aria-expanded="false" aria-controls="no-records-of-rows-'+ entity_details[e]['id'] +'"><i class="icon icon-user-view mr-3"></i></a>');
                  if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
                  {
                      action_td.append('<a href="javascript:void(0);" title="Edit" data-id="'+ entity_details[e]['id'] +'"  class="open-EditEntityDialog"><i class="icon icon-edit-black mr-3"></i></a>');                     
                  }  
                  if(is_staff == '0')
                      action_td.append('<a href="javascript:void(0);" title="delete" data-id="'+ entity_details[e]['id'] +'" class="open-DeleteEntityDialog"><i class="icon icon-delete-black"></i></a>');

                  tr_row.append(action_td);
                  tbody.append(tr_row);  

                  if(entity_details[e]['staff_count'] == 0)
                  {
                      var parent_div_id = 'no-records-of-rows-'+ entity_details[e]['id'];
                      var child_div_id = 'with-records-of-rows-'+ entity_details[e]['id'];
                  }
                  else
                  {
                      var parent_div_id = 'no-records-of-rows-'+ entity_details[e]['id'];
                      var child_div_id = 'no-records-of-rows-'+ entity_details[e]['id'];
                  }
 
                  
                  if(entity_details[e]['staff_count'] == 0)
                  {
                  //   var tr_row1 =  $('<tr/>').attr('id','no-records-of-rows-'+ entity_details[e]['id']).addClass("collapse");
                      var tr_row1 =  $('<tr/>').attr('id',parent_div_id).addClass("collapse");
                      var action_td1 = $('<td/>').attr('colspan','4');
                      action_td1.append('<span class="mr-3 align-middle">Staff: </span> No Staff added in  <span class="font-weight-bold text-dark">'+entity_details[e]['name']+'.</span>');
                      tr_row1.append(action_td1);   

                      var action_td2 =  $('<td/>').attr('colspan','3').attr('align','middle').addClass("text-right");
                      action_td2.append('<a href="javascript:void(0);" class="text-uppercase text-primary font-weight-bold d-inline-block add-staff" data-toggle="collapse" data-target="#'+child_div_id +'" aria-expanded="false" aria-controls="no-records-of-rows-'+ entity_details[e]['id'] +'">Add staff and permissions</a>');
                      tr_row1.append(action_td2);
                      tbody.append(tr_row1);

                  }  

                  var tr_row3 =  $('<tr/>').attr('id',child_div_id).addClass("collapse");
                  var action_td3 = $('<td/>').attr('colspan','7').addClass("p-0");

                  var table = $('<table/>').addClass("table table-striped table-hover");

                  var table_tbody = $('<tbody/>');
                  var table_tbody_tr = $('<tr/>');
                  var table_tbody_td = $('<td/>').attr('colspan','').addClass("border-0"); 


                  if(entity_details[e]['staff_count'] > 0)
                      var staff_title = 'Staff Of ';
                  else  
                      var staff_title = 'Add Staff In ' ;
                    
                  table_tbody_td.append('<span class="mr-3 align-middle">'+staff_title+' <span class="font-weight-bold text-dark">'+entity_details[e]['name']+'</span></span>');
                  //Staff Adding Start

                  if(entity_details[e]['staff_count'] > 0)
                  {
                      var vars = {};
                      var staff_detail = '';
                      staff_detail = entity_details[e]['staff_list'];
                      for(var s=0;s<staff_detail.length;s++)
                      {   
                          var staff_name = '';
                          staff_name = staff_detail[s]['firstname']+' '+staff_detail[s]['surname'];
                          vars['table_tbody_span'+staff_detail[s]['id']] = $('<span/>').addClass('badge badge-dark').append('<span class="align-middle">'+staff_name+'</span>');
                          vars['staff_span'+staff_detail[s]['id']]  = $('<span/>').addClass("ml-3");
                          vars['staff_span'+staff_detail[s]['id']].append('<a href="javascript:void(0);" title="View" data-id="'+ staff_detail[s]['user_id'] +'" class="open-ViewStaffDialog" ><i class="icon icon-visibility-white mx-1"></i></a>');
                          
                          if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
                          { 
                              vars['staff_span'+staff_detail[s]['id']].append('<a href="javascript:void(0);" title="Edit" data-id="'+ staff_detail[s]['user_id'] +'"  class="open-EditStaffDialog"><i class="icon icon-edit-white mx-1"></i></a>');                             
                          } 
                          if(is_staff == '0')                            
                          {
                              vars['staff_span'+staff_detail[s]['id']].append('<a href="javascript:void(0);" title="Delete" data-id="'+ staff_detail[s]['user_id'] +'"  class="open-DeleteStaffDialog"><i class="icon icon-delete-white mx-1"></i></a>');                             
                          }
                          vars['table_tbody_span'+staff_detail[s]['id']].append(vars['staff_span'+staff_detail[s]['id']]);

                          table_tbody_td.append(vars['table_tbody_span'+staff_detail[s]['id']]); 
                      } 
                      
                  }
                  //Staff Adding End
                  table_tbody_tr.append(table_tbody_td);  
                   
                   
                  var table_tbody_td1 = $('<td/>').attr('colspan','3').addClass("text-right border-0"); 
                  
                  table_tbody_td1.append('<a class="text-uppercase text-primary font-weight-bold d-inline-block add-staff" href="javascript:void(0);">Add staff and permissions</a>');
                  
                

                  var table_staff_tr = $('<tr/>');
                  var table_staff_tr_td = $('<td/>').attr('colspan','7').addClass("p-0 border-0");

                  var td_div = $('<div/>').addClass("bg-light-grey px-3 pb-0"); 

                  if( (is_staff == '1' && user_permission_name == 'write') || is_staff == '0')
                  { 
                        var td_div_form = $('<form/>').attr('id','addStaffForm_'+entity_details[e]['id']).attr('name','addStaffForm_'+entity_details[e]['id']).addClass("form-dashboard"); 

                        var form_div = $('<div/>').addClass("row").attr("id",'frmRow'+entity_details[e]['id']);  

                        
                        var name_div = $('<div/>').addClass("col-xl-4");  
                        var name_div1 = $('<div/>').addClass("form-group");  
                        name_div1.append('<label>Name*</label>');
                        name_div1.append('<input type="text" class="form-control" id="firstname_'+entity_details[e]['id']+'" name="firstname_'+entity_details[e]['id']+'" />'); 
                        name_div1.append('<em id="firstname_'+entity_details[e]['id']+'_error"  class="error invalid-feedback"></em>'); 
                        name_div.append(name_div1);
                        form_div.append(name_div);


                        var surname_div = $('<div/>').addClass("col-xl-4");  
                        var surname_div1 = $('<div/>').addClass("form-group");  
                        surname_div1.append('<label>Surname*</label>');
                        surname_div1.append('<input type="text" class="form-control" id="surname_'+entity_details[e]['id']+'" name="surname_'+entity_details[e]['id']+'" />'); 
                        surname_div1.append('<em id="surname_'+entity_details[e]['id']+'_error"  class="error invalid-feedback"></em>'); 
                        surname_div.append(surname_div1);
                        form_div.append(surname_div);

                        var email_div = $('<div/>').addClass("col-xl-4");  
                        var email_div1 = $('<div/>').addClass("form-group");  
                        email_div1.append('<label>Email</label>');
                        email_div1.append('<input type="email" class="form-control" id="email_'+entity_details[e]['id']+'" name="email_'+entity_details[e]['id']+'" />'); 
                        email_div1.append('<em id="email_'+entity_details[e]['id']+'_error"  class="error invalid-feedback"></em>'); 
                        email_div.append(email_div1);
                        form_div.append(email_div);

                        var title_div = $('<div/>').addClass("col-xl-4");  
                        var title_div1 = $('<div/>').addClass("form-group");  
                        title_div1.append('<label>Mobile</label>');
                        title_div1.append('<input type="text" class="form-control" id="mobile_'+entity_details[e]['id']+'" name="mobile_'+entity_details[e]['id']+'" maxlength="10" />'); 
                        title_div1.append('<em id="mobile_'+entity_details[e]['id']+'_error"  class="error invalid-feedback"></em>');
                        title_div.append(title_div1);
                        form_div.append(title_div);

                        var permission_div = $('<div/>').addClass("col-xl-4");  
                        var permission_div1 = $('<div/>').addClass("form-group");  
                        permission_div1.append('<label>Permission</label>');
                        permission_div1.append('<select class="select2" name="permission_'+entity_details[e]['id']+'" id="permission_'+entity_details[e]['id']+'"></select>');
                        permission_div1.append('<em id="permission_'+entity_details[e]['id']+'_error"  class="error invalid-feedback"></em>');
                        permission_div.append(permission_div1);
                        form_div.append(permission_div); 
                        form_div.append('<input type="hidden" class="form-control" id="entity_id_'+entity_details[e]['id']+'" name="entity_id_'+entity_details[e]['id']+'" value="'+entity_details[e]['id']+'" />');
    

                        td_div_form.append(form_div);

                        var form_div1 = $('<div/>').addClass("row");   
                        var add_staff_div = $('<div/>').addClass("col-xl-3 ml-auto");  
                        var staff_div1 = $('<div/>').addClass("form-group");   

                        staff_div1.append('<button type="button" data-id='+entity_details[e]['id']+' id="add-staff-'+entity_details[e]['id']+'" class="btn btn-primary btn-block add_staff">Add Staff</button>'); 
                        add_staff_div.append(staff_div1);
                        form_div1.append(add_staff_div); 
                        $("#addStaffForm").append(form_div1);

                        td_div_form.append(form_div1); 
                        td_div.append(td_div_form);
                        table_staff_tr_td.append(td_div);
                 // table_tbody_tr.append(table_tbody_td1);
                        

                  }
                  table_tbody.append(table_tbody_tr);
                  table_staff_tr.append(table_staff_tr_td);
                  table_tbody.append(table_staff_tr);
                  table.append(table_tbody);
                  action_td3.append(table);
                  tr_row3.append(action_td3);
                  tbody.append(tr_row3);
                   
                  $( "#tblDetailEntity" ).children().last().after(tbody);  
                 // $( "#entity_list" ).after(tbody);  

                  $('.select2').select2({
                    width: "100%",
                    minimumResultsForSearch: -1
                  });

                  $('b[role="presentation"]').hide();
                  $('.select2-selection__arrow').append('<i class="icon icon-chevron-down-gray"></i>');

                  // var add_button_click = '';
                  // add_button_click = '#add-staff-'+entity_details[e]['id']; 
 
                  $('#firstname_'+entity_details[e]['id']+'_error').hide();
                  $('#surname_'+entity_details[e]['id']+'_error').hide();
                  $('#email_'+entity_details[e]['id']+'_error').hide();
                  $('#mobile_'+entity_details[e]['id']+'_error').hide();
                  $('#permission_'+entity_details[e]['id']+'_error').hide(); 

                  $('#add-staff-'+entity_details[e]['id']).click(function() {  
                    var entity_id = '';
                    entity_id = $(this).data('id');  
                    
                    add_staff(entity_id);

                    $('#firstname_'+entity_id).focus(function() {
                      $('#firstname_'+entity_id+'_error').hide();
                      $('#firstname_'+entity_id+'_error').html('');
                    });
                    
                    $('#surname_'+entity_id).focus(function() {
                      $('#surname_'+entity_id+'_error').hide();
                      $('#surname_'+entity_id+'_error').html('');
                    });
  
                    $('#email_'+entity_id ).focus(function() {
                      $('#email_'+entity_id+'_error').hide();
                      $('#email_'+entity_id+'_error').html('');
                    });
  
                    $('#mobile_'+entity_id ).focus(function() {
                      $('#mobile_'+entity_id+'_error').hide();
                      $('#mobile_'+entity_id+'_error').html('');
                    });
  
                    $('#permission_'+entity_id).focus(function() {
                      $('#permission_'+entity_id+'_error').hide();
                      $('#permission_'+entity_id+'_error').html('');
                    });
                  });
                  
                  $("#mobile_"+entity_details[e]['id']).on("input", function(evt) {
                    var self = $(this);
                    self.val(self.val().replace(/[^0-9\.]/g, ''));
                    if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57))
                    {
                      evt.preventDefault();
                    }
                  });
                  var staffPermission = $("#staffPermissionList").val();
                  var new_staffPermission = staffPermission.split('#'); 

                  $('#permission_'+entity_details[e]['id']).html('');
                  $('#permission_'+entity_details[e]['id']).append($("<option></option>").attr("value","").text("-Select Permission-")); 
                  $.each(new_staffPermission, function(key, value) {      
                          var permission_list = value.split(',');             
                          $('#permission_'+entity_details[e]['id']).append($("<option></option>").attr("value",permission_list[0]).text(permission_list[1]));                           
                    }); 
              }
               

              $('.open-DeleteEntityDialog').click(function () { 
                var entityId = $(this).data('id'); 
                $("#modalDeleteConfimation #entityId").val('');
                $("#modalDeleteConfimation #entityId").val( entityId );
                $('#modalDeleteConfimation').modal('show');
              });

              $('.open-EditEntityDialog').click(function () {  
                var entityId = $(this).data('id'); 
                    $.ajax({
                      url: api_url+"entity/"+entityId,      
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
                          $("#modalEditEntity #entityId").val('');
                          $("#modalEditEntity #companyname").val('');
                          $("#modalEditEntity #registrationnumber").val('');
                          $("#modalEditEntity #vatnumber").val(''); 

                          $("#modalEditEntity #entityId").val( entityId ); 
                          $("#modalEditEntity #companyname").val( data.data.name); 
                          $("#modalEditEntity #registrationnumber").val(data.data.registration_number); 
                          $("#modalEditEntity #vatnumber").val( data.data.vat_number );  


                          $('#modalEditEntity #companyname_error').hide();
                          $('#modalEditEntity #registrationnumber_error').hide();
                          $('#modalEditEntity #vatnumber_error').hide();
                          $('#modalEditEntity').modal('show'); 
                      },
                      error: function (data) {   
                        $(".loader").hide();   
                      }
                  });   
              }); 
              $('.open-DeleteStaffDialog').click(function () { 
                var staff_id = $(this).data('id'); 
                $("#modalDeleteStaffConfimation #staff_id").val('');
                $("#modalDeleteStaffConfimation #staff_id").val( staff_id );
                $('#modalDeleteStaffConfimation').modal('show');
              });

              $('.open-EditStaffDialog').click(function () { 
                var staff_id = $(this).data('id');
                    $.ajax({
                      url: api_url+"staff/"+staff_id,      
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
                          $("#modalEditStaff #staff_id").val('');
                          $("#modalEditStaff #firstname").val('');
                          $("#modalEditStaff #surname").val('');
                          $("#modalEditStaff #email").val('');
                          $("#modalEditStaff #mobile").val(''); 
                          $("#modalEditStaff #edit_staff_permission").val(''); 

                          $("#modalEditStaff #staff_id").val( staff_id ); 
                          $("#modalEditStaff #firstname").val( data.data.firstname); 
                          $("#modalEditStaff #surname").val(data.data.surname); 
                          $("#modalEditStaff #mobile").val( data.data.mobile );  
                          $("#modalEditStaff #email").val( data.data.email ); 
                          $("#modalEditStaff #edit_staff_permission").val( data.data.permission ).trigger("change")
 
                          $('#modalEditStaff').modal('show'); 
                      },
                      error: function (data) {   
                        $(".loader").hide();   
                      }
                  });   
              });
              $('.open-ViewStaffDialog').click(function () { 
                var staff_id = $(this).data('id');
                    $.ajax({
                      url: api_url+"staff/"+staff_id,      
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
                          $("#modalViewStaff #firstname").text('');
                          $("#modalViewStaff #surname").text('');
                          $("#modalViewStaff #email").text('');
                          $("#modalViewStaff #mobile").text(''); 
                          $("#modalViewStaff #staff_permission").text(''); 
 
                          $("#modalViewStaff #firstname").text( data.data.firstname); 
                          $("#modalViewStaff #surname").text(data.data.surname); 
                          $("#modalViewStaff #mobile").text( data.data.mobile );  
                          $("#modalViewStaff #email").text( data.data.email ); 
                          $("#modalViewStaff #staff_permission").text( data.data.permission_name )
 
                          $('#modalViewStaff').modal('show'); 
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
$('#delete-entity').click(function() {

  var entityId = $('#modalDeleteConfimation #entityId').val();
  $.ajax({
        url: api_url+"entity/"+entityId,      
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
              $('#modalDeleteConfimation').modal('hide');
              $("#tblDetailEntity").find("tr:gt(0)").remove();
              var tbody =  $('<tbody/>'); 
              var tr_row =  $('<tr/>');
              tr_row.append("<td colspan='7'><p class='text-center'>Loading Entities....</p></td>");
              tbody.append(tr_row);       
              $( "#entity_list" ).after(tbody);   
              setTimeout(function(){
                loadEntities();
                $('#success-message').hide();
                $('#success-message-show').text('');  
              }, 2000);
            }             
        },
        error: function (data) {   
          $(".loader").hide();  
          $('#modalDeleteConfimation').modal('hide');
        }
    });  
});

$('#update-entity').click(function() {

  var entityId = $('#modalEditEntity #entityId').val(); 

  var updateEntityForm = $('#updateEntityForm');
  updateEntityForm.validate( {
      rules: {
				companyname: {
					required: true,
					minlength: 2, 
        },
        registrationnumber:'required',
        vatnumber:'required',
			},
      messages: {
        companyname: {
          required: "Please enter company name",
        },
        registrationnumber: "Please enter registration number",
        vatnumber: "Please enter vat number",
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
      }
    });

    if(updateEntityForm.valid() == true) {
      var formData = updateEntityForm.serializeArray();
      $.ajax({
        url: api_url+"entity/"+entityId,      
        method: 'PATCH',
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
              $('#success-message').show();
              $('#success-message-show').text(data.message);  
              $('#modalEditEntity').modal('hide');
              $("#tblDetailEntity").find("tr:gt(0)").remove();
              var tbody =  $('<tbody/>'); 
              var tr_row =  $('<tr/>');
              tr_row.append("<td colspan='7'><p class='text-center'>Loading Entities....</p></td>");
              tbody.append(tr_row);       
              $( "#entity_list" ).after(tbody);   
              setTimeout(function(){
                loadEntities();
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
                if(index == 'companyname')
                {
                  $('#modalEditEntity #companyname_error').show();
                  $('#modalEditEntity #companyname_error').html(item);
                }      
                if(index == 'registrationnumber')
                {
                  $('#modalEditEntity #registrationnumber_error').show();
                  $('#modalEditEntity #registrationnumber_error').html(item);
                } 
                if(index == 'vatnumber')
                {
                  $('#modalEditEntity #vatnumber_error').show();
                  $('#modalEditEntity #vatnumber_error').html(item);
                }             
            });
          } 
        }
    });  
    } 


    $( "#modalEditEntity #vatnumber" ).focus(function() {
      $('#modalEditEntity #vatnumber_error').hide();
      $('#modalEditEntity #vatnumber_error').html('');
    });

    $( "#modalEditEntity #companyname" ).focus(function() {
      $('#modalEditEntity #companyname_error').hide();
      $('#modalEditEntity #companyname_error').html('');
    });

    $( "#modalEditEntity #registrationnumber" ).focus(function() {
      $('#modalEditEntity #registrationnumber_error').hide();
      $('#modalEditEntity #registrationnumber_error').html('');
    });
});

$('#delete-staff').click(function() {

  var staff_id = $('#modalDeleteStaffConfimation #staff_id').val();
  $.ajax({
        url: api_url+"staff/"+staff_id,      
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
              $('#modalDeleteStaffConfimation').modal('hide');
              $("#tblDetailEntity").find("tr:gt(0)").remove();
              var tbody =  $('<tbody/>'); 
              var tr_row =  $('<tr/>');
              tr_row.append("<td colspan='7'><p class='text-center'>Loading Entities....</p></td>");
              tbody.append(tr_row);       
              $( "#entity_list" ).after(tbody);   
              setTimeout(function(){
                loadEntities();
                $('#success-message').hide();
                $('#success-message-show').text('');  
              }, 3000);
            }             
        },
        error: function (data) {   
          $(".loader").hide();  
          $('#modalDeleteStaffConfimation').modal('hide');
        }
    });  
});

$('#update-staff').click(function() {

  var staff_id = $('#modalEditStaff #staff_id').val(); 

  var updateStaffForm = $('#updateStaffForm');
  updateStaffForm.validate( {
      rules: {
				firstname: {
					required: true,
					minlength: 2, 
        },
        surname:'required',
        email: {
          required: true,
          email: true
        },
        mobile: {
          required: true,
          minlength: 10,
          number: true,
        },
        edit_staff_permission : 'required'
			},
      messages: {
        firstname: "Please enter name",
        surname: "Please enter surname",
        email: {
          required: "Please enter email",
          email: "Please enter valid email",
        },
        mobile: {
          required: "Please enter mobile no",
          minlength: "Please provide valid mobile no"
        },
        edit_staff_permission: "Please select permission"
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
      }
    });

   if(updateStaffForm.valid() == true) {
      var formData = updateStaffForm.serializeArray();
      $.ajax({
        url: api_url+"staff/"+staff_id,      
        method: 'PATCH',
        data:  {
                    firstname: $('#firstname').val(),
                    surname : $('#surname').val(),
                    email: $('#email').val(),
                    mobile: $('#mobile').val(),
                    entity_id: $('#entity_id').val(),
                    permission: $('#edit_staff_permission').val()
        },
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
              $('#modalEditStaff').modal('hide');
              $("#tblDetailEntity").find("tr:gt(0)").remove();
              var tbody =  $('<tbody/>'); 
              var tr_row =  $('<tr/>');
              tr_row.append("<td colspan='7'><p class='text-center'>Loading Entities....</p></td>");
              tbody.append(tr_row);       
              $( "#entity_list" ).after(tbody);   
              setTimeout(function(){
                loadEntities();
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
              if(index == 'firstname')
              { 
                $('#modalEditStaff #firstname_error').show();
                $('#modalEditStaff #firstname_error').html(item);
              }      
              if(index == 'surname')
              {
                $('#modalEditStaff #surname_error').show();
                $('#modalEditStaff #surname_error').html(item);
              }  
              if(index == 'mobile')
              {
                $('#modalEditStaff #mobile_error').show();
                $('#modalEditStaff #mobile_error').html(item);
              } 
              if(index == 'email')
              {
                $('#modalEditStaff #email_error').show();
                $('#modalEditStaff #email_error').html(item);
              } 
              if(index == 'permission')
              {
                $('#modalEditStaff #permission_error').show();
                $('#modalEditStaff #permission_error').html(item);
              }             
            });
          } 
        }
    });  
    } 


    $( "#modalEditStaff #firstname" ).focus(function() {
      $('#modalEditEntity #firstname_error').hide();
      $('#modalEditEntity #firstname_error').html('');
    });

    $( "#modalEditStaff #surname" ).focus(function() {
      $('#modalEditEntity #surname_error').hide();
      $('#modalEditEntity #surname_error').html('');
    });

    $( "#modalEditStaff #mobile" ).focus(function() {
      $('#modalEditEntity #mobile_error').hide();
      $('#modalEditEntity #mobile_error').html('');
    });

    $( "#modalEditStaff #email" ).focus(function() {
      $('#modalEditEntity #email_error').hide();
      $('#modalEditEntity #email_error').html('');
    });

    $( "#modalEditStaff #permission" ).focus(function() {
      $('#modalEditEntity #permission_error').hide();
      $('#modalEditEntity #permission_error').html('');
    });
});
function add_staff(entity_id)
{ 
    var vars = {};
    var addStaffForm = $("#addStaffForm_"+entity_id);

    vars['firstname'] ='firstname_'+entity_id;

     var staff_firstname = 'firstname_'+entity_id;
     addStaffForm.validate( {
        errorElement: "em",
        errorPlacement: function ( error, element ) {
          error.addClass( "invalid-feedback" );
          if ( element.prop( "type" ) === "checkbox" ) {
            error.insertAfter( element.next( "label" ) );
          } 
          else if (element.hasClass("select2-hidden-accessible")) {
            element = $("#select2-" + element.attr("id") + "-container").parent(); 
            element.parents('.form-group').append(error);  
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
  
      validationRules =  addStaffForm.validate();
      rules = {},
      messages = {}; 

      firstname = 'firstname_' + entity_id;
      rules[firstname] = { required: true }
      messages[firstname] = { required: 'Please enter name' };

      surname = 'surname_' + entity_id;
      rules[surname] = { required: true }
      messages[surname] = { required: 'Please enter surname' };

      email = 'email_' + entity_id;
      rules[email] = { required: true, email: true }
      messages[email] = { required: 'Please enter email' , email: "Please enter valid email", };

      mobile = 'mobile_' + entity_id;
      rules[mobile] = { required: true, minlength: 10, number: true }
      messages[mobile] = { required: "Please enter mobile no", minlength: "Please provide valid mobile no" };


      permission = 'permission_' + entity_id;
      rules[permission] = { required: true }
      messages[permission] = { required: "Please select permission" };
      

      $.extend(validationRules.settings, { rules: rules, messages: messages });

      if(addStaffForm.valid() == true) { 
         
        $.ajax({
                          url: api_url + "staff", 
                          method: 'POST',
                          data: { firstname: $('#firstname_'+entity_id).val(),
                                  surname : $('#surname_'+entity_id).val(),
                                  email: $('#email_'+entity_id).val(),
                                  mobile: $('#mobile_'+entity_id).val(),
                                  entity_id: $('#entity_id_'+entity_id).val(),
                                  permission: $('#permission_'+entity_id).val()
                                },
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
                                addStaffForm[0].reset();
                                $("#tblDetailEntity").find("tr:gt(0)").remove();
                                var tbody =  $('<tbody/>'); 
                                var tr_row =  $('<tr/>');
                                tr_row.append("<td colspan='7'><p class='text-center'>Loading Entities....</p></td>");
                                tbody.append(tr_row);       
                                $( "#entity_list" ).after(tbody);   
                                setTimeout(function(){
                                  loadEntities();
                                  $('#success-message').hide();
                                  $('#success-message-show').text('');  
                                }, 3000);
                              }  
                              else{
                                    $('.loader').hide();
                                    $('#email_'+entity_id+'_error').show();
                                    $('#email_'+entity_id+'_error').html(data.message.email); 
                              }
                          },
                          error: function (data) {
                            $(".loader").hide();  
                            if(data.responseJSON.success == false) {   
                              var messageList = data.responseJSON.message;    
                              $.each(messageList, function(index, item) {   
                                  if(index == 'firstname')
                                  { 
                                    $('#firstname_'+entity_id+'_error').show();
                                    $('#firstname_'+entity_id+'_error').html(item);
                                  }      
                                  if(index == 'surname')
                                  {
                                    $('#surname_'+entity_id+'_error').show();
                                    $('#surname_'+entity_id+'_error').html(item);
                                  }  
                                  if(index == 'mobile')
                                  {
                                    $('#mobile_'+entity_id+'_error').show();
                                    $('#mobile_'+entity_id+'_error').html(item);
                                  } 
                                  if(index == 'email')
                                  {
                                    $('#email_'+entity_id+'_error').show();
                                    $('#email_'+entity_id+'_error').html(item);
                                  } 
                                  if(index == 'permission')
                                  {
                                    $('#permission_'+entity_id+'_error').show();
                                    $('#permission_'+entity_id+'_error').html(item);
                                  }  
                              });
                            } 
                        }
                      }); 
                
     }
}