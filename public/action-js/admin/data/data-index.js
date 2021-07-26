"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('.main-menu').find('.active').removeClass("active");
  $('.main-menu').find('.pcoded-trigger').removeClass("pcoded-trigger");
  $('#menu_data').addClass('active');

  // $('#all-data').DataTable();

  $('[name="button_pemenuhan"]').on('click', function(){
    let ids = $(this).parent().prev().attr('id');
    let val = $(this).parent().prev().val();

    var formData = new FormData();
    formData.append('param', 'data');
    formData.append('id_param', ids);
    formData.append('value', val);
    save(formData);
  })

  $('[name="button_catatan"]').on('click', function(){
    let ids = $(this).parent().prev().attr('id');
    let val = $(this).parent().prev().val();
    
    var formData = new FormData();
    formData.append('param', 'data');
    formData.append('id_param', ids.replace(/catatan_/g, "input_"));
    formData.append('note', val);
    save(formData);
  })

  loaddata('data');

  $('#pilih_komponen').on('change', function(){
    loaddata('data_program', this.value);
  });

  $('#btn-monitoring').on('click', function(){
      window.open('http://plpbm.pu.go.id/tfl/production/', '_blank');
  });

  $("#btn-excel").on('click', function(e){
    
    var table = $('#all-data');
    console.log(table);
    if(table && table.length){
      
      $(table).table2excel({
        exclude: ".noExl",
        name: "Excel Document Name",
        filename: "Excel-" + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".xls",
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
      });
    }
  });

  $('#btn-pdf').on('click',function(){
    html2canvas($('#all-data'), {
      onrendered: function (canvas) {
          var data = canvas.toDataURL();
          var docDefinition = {
              content: [{
                  image: data,
                  width: 500
              }]
          };
          pdfMake.createPdf(docDefinition).download("Table.pdf");
      }
    })
  })

});

function loaddata(param, ids){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loaddata',
      data : {
              param      : param,
              id         : ids,
      },
      success: function(result){
          let data = result.data;
          const sortedActivities = data.sort((a, b) => b.updated_date - a.updated_date)

          $('#last-updated').html('Last Update : '+sortedActivities[0].updated_date);
          for (var i = 0; i < data.length; i++) {
            if($('#is_open').val() == 1){
              let val = data[i].value;
              $('#'+data[i].param).parent().after(val);
              $('#'+data[i].param).parent().hide();
              let note = data[i].note;
              $('#'+data[i].param.replace("input", "catatan")).after(note);
              $('#'+data[i].param.replace("input", "catatan")).hide();
              $('[name="button_catatan"]').parent().hide();
              
            }else{
              $('#'+data[i].param).val(data[i].value);
              $('#'+data[i].param.replace("input", "catatan")).val(data[i].note);
              $('[name="button_catatan"]').parent().show();
            }
          }
        }
      })
    }

function save(formData){

  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'updateData',
      data : formData,
      success: function(result){
          loaddata('data');
      }
    });
  };

  function action(mode, id, status){
    if(mode == 'delete'){
      bootbox.confirm({
        message: "Are you sure to <b>Delete</b> ?",
        buttons: {
         confirm: {
             label: '<i class="fa fa-check"></i> Yes',
             className: 'btn-success btn-xs',
         },
         cancel: {
             label: '<i class="fa fa-times"></i> No',
             className: 'btn-danger btn-xs',
         }
       },
        callback : function(result) {
  			if(result) {
            isAction(mode, id, status);
    			}
    		}
    });
  }else{
    isAction(mode, id, status);
  }
}

  function isAction(mode, id, status){
    var formData = new FormData();
    formData.append('mode', mode);
    formData.append('id', id);
    formData.append('status', status);
    formData.append('table', 'data_kegiatan');
    $.ajax({
        type: 'post',
        processData: false,
        contentType: false,
        url: 'actionData',
        data : formData,
        success: function(result){
          location.reload();
        }
      });
  }

  function loadparam(param){

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'loadparam',
        data : {
                param      : param,
        },
        success: function(result){
            let data = result.data;
            var opt = '<option value="0">- Pilih Satuan -</option>';
            for (var i = 0; i < data.length; i++) {
              opt += '<option value="'+data[i].satuan_code+'">'+data[i].satuan_desc+'</option>';
            }

            $('#user_satuan').append(opt);
          }
        })
      }
