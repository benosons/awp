"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('.main-menu').find('.active').removeClass("active");
  $('.main-menu').find('.pcoded-trigger').removeClass("pcoded-trigger");
  $('#menu_monev').addClass('active');

    window.isExist = 1;
  $('#all-monev').DataTable();

  for (let i = 1; i <= 11; i++) {
      $('#komponen_'+i+'_usd').mask('000.000.000.000.000', {reverse: true});      
      $('#komponen_'+i+'_idr').mask('000.000.000.000.000', {reverse: true});      
  }

    $("[name='dropper-default']").dateDropper({
        dropWidth: 150,
        dropPrimaryColor: "#1abc9c",
        dropBorder: "1px solid #1abc9c",
        format: 'm/Y',
        minYear: "2021",
    }),

// $($('div#dd-w-0').children().children().children()[1]).remove()
// $($('div#dd-w-1').children().children().children()[1]).remove()

  $('#save-aspek').on('click', function(){
        var formData = new FormData();
            formData.append('kode_aspek', $('#pilih-aspek').val());
            formData.append('kode_indikator', $('#pilih-indikator').val());
            formData.append('kode_parameter', $('#pilih-parameter').val());
            formData.append('keterangan', $('#keterangan').val());
            formData.append('sumber', $('#sumber_data').val());
            formData.append('url', $('#url').val());
            formData.append('tahun', $('#tahun').val());
            formData.append('catatan', $('#catatan').val());
        
        save(formData);    
  })

  loaddata();
  // loadaspek('aspek')
  $('#pilih-aspek').on('change', function(){
    loadaspek('indikator', this.value)
  });

  $('#pilih-indikator').on('change', function(){
    loadaspek('parameter', this.value)
  })

  $('#pilih-kota-kab').on('change', function(){
    loaddata(this.value)
  })



  if($('#is_open').val() == 1){
    $('#btn-tambah').hide();
  }

});

function loadaspek(param, kode){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadaspek',
      data : {
              param      : param,
              kode         : kode,
      },
      success: function(result){
          let data = result.data;
          let code = result.code;
          var opt = '<option value="0">Pilih</option>';
          for (let index = 0; index < data.length; index++) {
            opt += '<option value="'+data[index]['kode']+'">'+data[index]['desc']+'</option>';
          }

          if(param == 'aspek'){
            $('#pilih-aspek').html(opt);
          }else if(param == 'indikator'){
            $('#pilih-indikator').html(opt);
          }else if(param == 'parameter'){
            $('#pilih-parameter').html(opt);
          }

            
        }
      })
    }

function loaddata(param, ids){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadmonev',
      data : {
              param      : param,
              id         : ids,
      },
      success: function(result){
          let data = result.data;
          let code = result.code;

      if(code){
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          
          $('#id_'+element['kode_aspek']+'_'+element['nomor']).val(element['id']);
          $('#nilai_'+element['kode_aspek']+'_'+element['nomor']).val(element['nilai']);
          $('#keterangan_'+element['kode_aspek']+'_'+element['nomor']).val(element['keterangan']);
          $('#sumber_'+element['kode_aspek']+'_'+element['nomor']).val(element['sumber']);
          $('#url_'+element['kode_aspek']+'_'+element['nomor']).val(element['url']);
          $('#tahun_'+element['kode_aspek']+'_'+element['nomor']).val(element['tahun']);
          $('#new_keterangan_'+element['kode_aspek']+'_'+element['nomor']).val(element['note']);
          
        }
      }else{
        
        $('[name="aspek_peraturan"]').val('');
      }
          
        // if(code == '1'){
            
        //     var groupColumn = 1;
        //     var table = $('#all-monev').DataTable({
        //         destroy: true,
        //         paging: true,
        //         lengthChange: false,
        //         searching: true,
        //         ordering: true,
        //         info: true,
        //         autoWidth: false,
        //         responsive: false,
        //         pageLength: 30,
        //         aaData: result.data,
        //         aoColumns: [
        //             { 'mDataProp': 'kode_indikator' },
        //             { 'mDataProp': 'nomor_aspek'},
        //             { 'mDataProp': 'desc_aspek'},
        //             { 'mDataProp': 'desc_indikator', 'width': '50%'},
        //             { 'mDataProp': 'desc_parameter', 'width': '50%'},
        //             { 'mDataProp': 'bobot'},
        //             { 'mDataProp': 'nilai'},
        //             { 'mDataProp': 'keterangan'},
        //             { 'mDataProp': 'sumber'},
        //             { 'mDataProp': 'tahun'},
        //             { 'mDataProp': 'catatan'},
        //             { 'mDataProp': 'id' },


        //         ],
        //         'rowsGroup': [0],
                
        //         "columnDefs": [
        //             // { "targets": "_all", "orderable": false },
        //             { "visible": false, "targets": 1 },
        //             { "visible": false, "targets": 2 },
        //             {
        //                 mRender: function ( data, type, row ) {
      
        //                   var el = row.kode_indikator.substring(2);
      
        //                     return el;
        //                 },
        //                 aTargets: [ 0 ]
        //             },
        //             {
        //                 mRender: function ( data, type, row ) {
      
        //                   var el ='<a target="_blank" href="'+row.url+'">'+row.sumber+'</a>';
      
        //                     return el;
        //                 },
        //                 aTargets: [ 8 ]
        //             },
        //             {
        //                 mRender: function ( data, type, row ) {
      
        //                   var el =`<div class="btn-group dropdown-split-info">
        //                               <button type="button" class="btn btn-info btn-mini"><i class="icofont icofont-info-square"></i>Action</button>
        //                               <button type="button" class="btn btn-info btn-mini dropdown-toggle dropdown-toggle-split waves-effect waves-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //                                   <span class="sr-only">Toggle primary</span>
        //                               </button>
        //                               <div class="dropdown-menu">
        //                                   <a class="dropdown-item waves-effect waves-light" href="button.html#">Action</a>
        //                                   <a class="dropdown-item waves-effect waves-light" href="button.html#">Another action</a>
        //                                   <a class="dropdown-item waves-effect waves-light" href="button.html#">Something else here</a>
        //                               </div>
        //                           </div>`;
      
        //                     return el;
        //                 },
        //                 aTargets: [ 11 ]
        //             },
        //             // {
        //             //     mRender: function ( data, type, row ) {
      
        //             //       var el = data+`%`;
      
        //             //         return el;
        //             //     },
        //             //     aTargets: [ 10 ]
        //             // },
        //             // {
        //             //     mRender: function ( data, type, row ) {
                            
        //             //       var el = rubah(data);
      
        //             //         return el;
        //             //     },
        //             //     aTargets: [ 3, 4, 5, 6, 7, 8, 9 ]
        //             // },
        //             // {
        //             //     mRender: function ( data, type, row ) {
      
        //             //       var el = `<button class="btn btn-info btn-mini"><i class="icofont icofont-edit"></i>Edit</button>`;
      
        //             //         return el;
        //             //     },
        //             //     aTargets: [ 11 ]
        //             // },
        //         ],
        //         "order": [[ 1, 'asc' ]],
        //          "displayLength": 25,
        //       "drawCallback": function ( settings ) {
        //           var api = this.api();
        //           var rows = api.rows( {page:'current'} ).nodes();
        //           var last=null;
       
        //           api.column(2, {page:'current'} ).data().each( function ( group, i ) {
                    
        //               if ( last !== group ) {
        //                   $(rows).eq( i ).before(
        //                       '<tr class="group"><td colspan="10"><center> Aspek '+group+'<center></td></tr>'
        //                   );
       
        //                   last = group;
        //               }
        //           } );
        //       },
        //       // fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
        //       //     var index = iDisplayIndexFull + 1;
        //       //     $('td:eq(0)', nRow).html('#'+index);
        //       //     return  index;
        //       // },
        //         fnInitComplete: function () {
        //           if($('#is_open').val() == 1){
        //             this.api().column(11).visible(true);
        //             this.$('tr').each(function() {
        //                 $(this).find(':last-child').remove();
        //             });
        //           }
        //         }
        //     });
            
        // }else{
        //     var table = $('#all-monev').DataTable();
        //     table.clear().draw();
        // }
        

            
        }
      })
    }

function rubah(angka){
    angka = angka ? angka : 0;
    var reverse = angka.toString().split('').reverse().join(''),
    ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
}

function save(formData){

  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'saveAspek',
      data : formData,
      success: function(result){
        location.reload();
      }
    });
  };

function submit(param, aspek, number){
  
  var formData = new FormData();
      formData.append('id', $('#id_'+aspek+'_'+number).val());
      formData.append('aspek', param);
      formData.append('kode_aspek', aspek);
      formData.append('nomor', number);
      formData.append('kota', $('#pilih-kota-kab').val());
      formData.append('nilai',$('#nilai_'+aspek+'_'+number).val());
      formData.append('keterangan',$('#keterangan_'+aspek+'_'+number).val());
      formData.append('sumber',$('#sumber_'+aspek+'_'+number).val());
      formData.append('tahun',$('#tahun_'+aspek+'_'+number).val());
      formData.append('note',$('#new_keterangan_'+aspek+'_'+number).val());
      formData.append('url',$('#url_'+aspek+'_'+number).val());
      
      if($('#pilih-kota-kab').val() == ''){
        
        bootbox.alert({
            message: "Silahkan pilih Kota/ Kabupaten!",
            size: 'small',
            buttons: {
              ok: {
                label: '<i class="fa fa-check"></i> Ok',
                className: 'btn-success btn-mini',
              }
            }
        });
        // bootbox.confirm({
        //       message: "Silahkan pilih Kota/ Kabupaten !",
        //       buttons: {
        //       confirm: {
        //           label: '<i class="fa fa-check"></i> Ok',
        //           className: 'btn-success btn-xs',
        //       },
        //       cancel: {
        //           label: '<i class="fa fa-times"></i> No',
        //           className: 'btn-danger btn-xs',
        //       }
        //     },
        //       callback : function(result) {
        //       // if(result) {
        //       //     isAction(mode, id, status);
        //       //   }
        //       }
        //     });
          }else{

            $.ajax({
                type: 'post',
                processData: false,
                contentType: false,
                url: 'saveAspek',
                data : formData,
                success: function(result){
                  location.reload();
                }
              });
      }
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

      function cekperiode(param){

        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'cekperiode',
            data : {
                    param      : param,
            },
            success: function(result){
                let code = result.code;
                    if(code == '1'){
                        $("#isExist").css("display", "block");
                        window.isExist = 1;
                        setTimeout(function(){
                            $("#isExist").css("display", "none");
                            $('#save-realisasi').prop("disabled", false);
                        },2000);
                    }else{
                        window.isExist = 0;
                        $('#save-realisasi').prop("disabled", false);
                    }
                }
            })
          }
