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

  $('#update-jadwal').hide();

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

  $('#jadwal-modal').on('hide.bs.modal', function(){
    $('#idjadwal').val('');
    $('#detim').val('');
    $('#keterangan_jadwal').val('');

  });

  $('#update-jadwal').on('click' , function(){
    var id = $('#idjadwal').val();
    var date = $('#detim').val();
    var keterangan = $('#keterangan_jadwal').val();

    isAction('update', id, date, keterangan );
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
          clndr(data);
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
              {
                  mRender: function ( data, type, row ) {

                    var el = `<button class="btn btn-info btn-mini" style="width:50px;" onclick="action('edit','`+row.id+`','`+row.datetime+`', '`+row.keterangan+`')" ><i class="icofont icofont icofont-edit"></i>Edit</button>`;
                     el += `<button class="btn btn-danger btn-mini" style="width:50px;" onclick="action('delete','`+row.id+`','', '')" ><i class="icofont icofont icofont-trash"></i>Hapus</button>`;

                      return el;
                  },
                  aTargets: [ 5 ]
              },
            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                var index = iDisplayIndexFull + 1;
                $('td:eq(0)', nRow).html('#'+index);
                return  index;
            },
            fnInitComplete: function () {

              if($('#is_open').val() == 1){
                this.api().column(5).visible(true);
                this.$('tr').each(function() {
                    $(this).find(':last-child').remove();
                });
              }
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
          // loaddata('data_jadwal');
          // $('#jadwal-modal').modal('hide');
          // $('#detim').val('');
          // $('#keterangan_jadwal').val('');
          location.reload()
      }
    });
  };

  function action(mode, id, date, keterangan){
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
            isAction(mode, id, date, keterangan);
    			}
    		}
    });
  }else{
    $('#jadwal-modal').modal('show');
    $('#idjadwal').val(id);
    $('#detim').val(date);
    $('#keterangan_jadwal').val(keterangan);

    $('#save-jadwal').hide();
    $('#update-jadwal').show();
  }
}

  function isAction(mode, id, date, keterangan){
    var formData = new FormData();
    formData.append('mode', mode);
    formData.append('id', id);
    formData.append('date', date);
    formData.append('keterangan', keterangan);
    formData.append('table', 'data_jadwal');
    $.ajax({
        type: 'post',
        processData: false,
        contentType: false,
        url: 'actionJadwal',
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

      function clndr(datas){

          var a = moment().format("YYYY-MM"),
          b = moment().add(1, "month").format("YYYY-MM");
          var c = [];
          for (let index = 0; index < datas.length; index++) {
            const element = datas[index];
            console.log(element);
            var det = {
                        date: element.datetime,
                        title: element.keterangan,
                        id:  element.id,
                        location:  `<button class="btn btn-danger btn-mini" onclick="action('delete','`+element.id+`','', '')" ><i class="icofont icofont icofont-trash"></i>Hapus</button>`
                      }
                      c.push(det);
          }
          // var c = [
          //     {
          //         date: a + "-10",
          //         title: "Robot war",
          //         location: "Center of Science"
          //     }, 
          //     {
          //         date: a + "-19",
          //         title: "Cat Frisbee",
          //         location: "Jefferson Park"
          //     }, 
          //     {
          //         date: a + "-23",
          //         title: "Elephent fight",
          //         location: "Natural Park"
          //     }, 
          //     {
          //         date: b + "-07",
          //         title: "Small Cat Photo Session",
          //         location: "Center for Cat Photography"
          //     }
          //   ];

        $("#clndr-selected-date").clndr({
          template: $("#clndr-template").html(),
          events: c,
          trackSelectedDate: !0,
          clickEvents: {
            click: function(target) {
              var selectedClass = target.date.format('YYYY-MM-DD');
              if(target.events.length){
                  // $('#jadwal-modal').modal('show');
                  // $('#detim').val(selectedClass);
                  // $('#keterangan_jadwal').val(target.events[0].title);
                  // console.log(target.events[0].id);
                  if($('#is_open').val() != '1'){
                    action('edit', target.events[0].id , selectedClass , target.events[0].title);
                  }
                }
                // $('.event-item:not('+selectedClass+')').hide();
                // $('.event-item'+selectedClass).show();
              
            },
            onMonthChange: function(month) {
              console.log('you just went to ' + month.format('MMMM, YYYY'));
            }
          },
        })
      }
