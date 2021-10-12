"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('.main-menu').find('.active').removeClass("active");
  $('.main-menu').find('.pcoded-trigger').removeClass("pcoded-trigger");
  $('#menu_jadwal').addClass('active');

  $('#jadwal-data').DataTable();

  $('#jadwal-modal').on('hide.bs.modal', function () {
    $('#detim').val('');
    $('#keterangan_jadwal').val('');
  })

  $("#detim").flatpickr({
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true
  });

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

  loaddata('data_jadwal');

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

  $('#save-jadwal').on('click', function(){
    let param = 'data_jadwal';
    let date = $('#detim').val();
    let ket = $('#keterangan_jadwal').val();

    var formData = new FormData();
    formData.append('param', param);
    formData.append('date', date);
    formData.append('keterangan', ket);
    save(formData);

});

});

function loaddata(param, ids){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadjadwal',
      data : {
              param      : param,
              id         : ids,
      },
      success: function(result){
          let data = result.data;
          var dt = $('#jadwal-data').DataTable({
            destroy: true,
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: false,
            pageLength: 10,
            aaData: result.data,
            aoColumns: [
                { 'mDataProp': 'id'},
                { 'mDataProp': 'datetime'},
                { 'mDataProp': 'datetime'},
                { 'mDataProp': 'datetime'},
                { 'mDataProp': 'keterangan'},

            ],
            order: [[0, 'asc']],
            fixedColumns: true,
            aoColumnDefs:[
              { width: 50, targets: 0 },
              {
                  mRender: function ( data, type, row ) {
                    var datetime = new Date(data);
                    var hours = datetime.getHours(); //returns 0-23
                    var minutes = datetime.getMinutes(); //returns 0-59
                    var seconds = datetime.getSeconds(); //returns 0-59
                    var year = datetime.getFullYear(); 
                    var month = datetime.getMonth(); 
                    var date = datetime.getDate();

                    var monthname = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

                    var el = monthname[month] + '-' + year;

                      return el;
                  },
                  aTargets: [ 1 ]
              },

              {
                mRender: function ( data, type, row ) {
                  var datetime = new Date(data);
                  var hours = datetime.getHours(); //returns 0-23
                  var minutes = datetime.getMinutes(); //returns 0-59
                  var seconds = datetime.getSeconds(); //returns 0-59
                  var year = datetime.getFullYear(); 
                  var month = datetime.getMonth(); 
                  var date = datetime.getDate();

                  var monthname = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

                  var el = date;

                    return el;
                },
                aTargets: [ 2 ]
            },

            {
              mRender: function ( data, type, row ) {
                var datetime = new Date(data);
                var hours = datetime.getHours(); //returns 0-23
                var minutes = datetime.getMinutes(); //returns 0-59
                var seconds = datetime.getSeconds(); //returns 0-59
                var year = datetime.getFullYear(); 
                var month = datetime.getMonth(); 
                var date = datetime.getDate();

                var monthname = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

                var el = hours + ':' + minutes + ':' + seconds ;

                  return el;
              },
              aTargets: [ 3 ]
          },
              // {
              //     mRender: function ( data, type, row ) {

              //       var el = `<button class="btn btn-danger btn-sm" onclick="action('delete','`+row.id+`','')" ><i class="icofont icofont icofont-trash"></i>Hapus</button>`;

              //         return el;
              //     },
              //     aTargets: [ 6 ]
              // },
            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                var index = iDisplayIndexFull + 1;
                $('td:eq(0)', nRow).html('#'+index);
                return  index;
            },
            fnInitComplete: function () {

                var that = this;
                var td ;
                var tr ;
                this.$('td').click( function () {
                    td = this;
                });
                this.$('tr').click( function () {
                    tr = this;
                });
              }
            });
          }
          // const sortedActivities = data.sort((a, b) => b.updated_date - a.updated_date)

          // $('#last-updated').html('Last Update : '+sortedActivities[0].updated_date);
          // for (var i = 0; i < data.length; i++) {
          //   if($('#is_open').val() == 1){
          //     let val = data[i].value;
          //     $('#'+data[i].param).parent().after(val);
          //     $('#'+data[i].param).parent().hide();
          //     let note = data[i].note;
          //     $('#'+data[i].param.replace("input", "catatan")).after(note);
          //     $('#'+data[i].param.replace("input", "catatan")).hide();
          //     $('[name="button_catatan"]').parent().hide();
              
          //   }else{
          //     $('#'+data[i].param).val(data[i].value);
          //     $('#'+data[i].param.replace("input", "catatan")).val(data[i].note);
          //     $('[name="button_catatan"]').parent().show();
          //   }
          // }
        // }
      })
    }

function save(formData){

  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'addjadwal',
      data : formData,
      success: function(result){
          loaddata('data_jadwal');
          $('#jadwal-modal').modal('hide');
          $('#detim').val('');
          $('#keterangan_jadwal').val('');
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
