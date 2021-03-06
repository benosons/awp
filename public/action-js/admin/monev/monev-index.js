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

  // loaddata();
  // loadaspek('aspek')
  $('#pilih-aspek').on('change', function(){
    loadaspek('indikator', this.value)
  });

  $('#pilih-indikator').on('change', function(){
    loadaspek('parameter', this.value)
  })

  // $('#pilih-kota-kab').on('change', function(){
  //   loaddata(this.value);
  //   loadinformasi(this.value);
  // })
  
  $('#btn-load').on('click', function(){
    loaddata($('#pilih-kota-kab').val(), '', $('#pilih-periode').val());
    loadinformasi($('#pilih-kota-kab').val(), '', $('#pilih-periode').val());
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

function loaddata(param, ids, periode){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadmonev',
      data : {
              param      : param,
              id         : ids,
              periode    : periode,
      },
      success: function(result){
          let data = result.data;
          let code = result.code;

      if(code == 1){
        var sum_nilai_1 = 0;
        var sum_nilai_2 = 0;
        var sum_nilai_3 = 0;
        var sum_nilai_4 = 0;
        var sum_nilai_5 = 0;

        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          
          $('#id_'+element['kode_aspek']+'_'+element['nomor']).val(element['id']);
          $('#nilai_'+element['kode_aspek']+'_'+element['nomor']).val(element['nilai']);
          $('#keterangan_'+element['kode_aspek']+'_'+element['nomor']).val(element['keterangan']);
          $('#sumber_'+element['kode_aspek']+'_'+element['nomor']).val(element['sumber']);
          $('#url_'+element['kode_aspek']+'_'+element['nomor']).val(element['url']);
          $('#tahun_'+element['kode_aspek']+'_'+element['nomor']).val(element['tahun']);
          $('#new_keterangan_'+element['kode_aspek']+'_'+element['nomor']).val(element['note']);

          if(element['kode_aspek'] == 1){
            sum_nilai_1 += parseInt(element['nilai']);
          }else if(element['kode_aspek'] == 2){
            sum_nilai_2 += parseInt(element['nilai']);
          }else if(element['kode_aspek'] == 3){
            sum_nilai_3 += parseInt(element['nilai']);
          }else if(element['kode_aspek'] == 4){
            sum_nilai_4 += parseInt(element['nilai']);
          }else if(element['kode_aspek'] == 5){
            sum_nilai_5 += parseInt(element['nilai']);
          }
          
        }

        $('#sum_nilai_1').html(sum_nilai_1);
        $('#sum_nilai_2').html(sum_nilai_2);
        $('#sum_nilai_3').html(sum_nilai_3);
        $('#sum_nilai_4').html(sum_nilai_4);
        $('#sum_nilai_5').html(sum_nilai_5);
      }else{
        $('input').val('');
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

function loadinformasi(param, ids, periode){

      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadinformasi',
          data : {
                  param      : param,
                  id         : ids,
                  periode    : periode,
          },
          success: function(result){
              let data = result.data;
              let code = result.code;
    
            if(code == 1){
              for (let index = 0; index < data.length; index++) {
                const element = data[index];

                if(element['nomor']){
                  if(element['group'] == '1'){
                    $('#id_'+element['kode']+'_'+element['nomor']).val(element['id']);
                    $('#isian_'+element['kode']+'_'+element['nomor']).val(element['isian']);
                    $('#sumber_'+element['kode']+'_'+element['nomor']).val(element['sumber']);
                    $('#tahun_'+element['kode']+'_'+element['nomor']).val(element['tahun']);
                    $('#keterangan_'+element['kode']+'_'+element['nomor']).val(element['keterangan']);
                  }else if(element['group'] == '2'){
                    $('#id_'+element['kode']+'_'+element['nomor']).val(element['id']);
                    $('#jumlah1_'+element['kode']+'_'+element['nomor']).val(element['jumlah1']);
                    $('#kapasitas1_'+element['kode']+'_'+element['nomor']).val(element['kapasitas1']);
                    $('#sumber1_'+element['kode']+'_'+element['nomor']).val(element['sumber1']);
                    $('#tahun1_'+element['kode']+'_'+element['nomor']).val(element['tahun1']);
                    $('#kapasitas2_'+element['kode']+'_'+element['nomor']).val(element['kapasitas2']);
                    $('#ritasi_'+element['kode']+'_'+element['nomor']).val(element['ritasi']);
                    $('#jumlah2_'+element['kode']+'_'+element['nomor']).val(element['jumlah2']);
                    $('#kapasitas3_'+element['kode']+'_'+element['nomor']).val(element['kapasitas3']);
                    $('#sumber2_'+element['kode']+'_'+element['nomor']).val(element['sumber2']);
                    $('#tahun2_'+element['kode']+'_'+element['nomor']).val(element['tahun2']);
                    $('#keterangan_'+element['kode']+'_'+element['nomor']).val(element['keterangan']);
                  }else if(element['group'] == '3'){
                    $('#id_'+element['kode']+'_'+element['nomor']).val(element['id']);
                    $('#jumlah_'+element['kode']+'_'+element['nomor']).val(element['jumlah']);
                    $('#sumber_'+element['kode']+'_'+element['nomor']).val(element['sumber']);
                    $('#tahun_'+element['kode']+'_'+element['nomor']).val(element['tahun']);
                  }
                }else{
                  if(element['group'] == '1'){
                    $('#id_'+element['kode']).val(element['id']);
                    $('#isian_'+element['kode']).val(element['isian']);
                    $('#sumber_'+element['kode']).val(element['sumber']);
                    $('#tahun_'+element['kode']).val(element['tahun']);
                    $('#keterangan_'+element['kode']).val(element['keterangan']);
                  }else if(element['group'] == '3'){
                    $('#id_'+element['kode']).val(element['id']);
                    $('#jumlah_'+element['kode']).val(element['jumlah']);
                    $('#sumber_'+element['kode']).val(element['sumber']);
                    $('#tahun_'+element['kode']).val(element['tahun']);
                  }else if(element['group'] == '4'){
                    $('#id_'+element['kode']).val(element['id']);
                    $('#jumlah_'+element['kode']).val(element['jumlah']);
                    $('#sumber_'+element['kode']).val(element['sumber']);
                    $('#tahun_'+element['kode']).val(element['tahun']);
                    $('#keterangan_'+element['kode']).val(element['keterangan']);
                  }
                }
              }
            }else{
              
              $('input').val('');
            }            
    
                
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

function submit(param, aspek, number, group){
  
  if(param == 'informasi_umum'){
    var formData = new FormData();
    formData.append('periode', $('#pilih-periode').val());
    if(number){
      if(group == '1'){
        formData.append('id', $('#id_'+aspek+'_'+number).val());
        formData.append('isian', $('#isian_'+aspek+'_'+number).val());
        formData.append('sumber', $('#sumber_'+aspek+'_'+number).val());
        formData.append('tahun', $('#tahun_'+aspek+'_'+number).val());
        formData.append('keterangan', $('#keterangan_'+aspek+'_'+number).val());
        formData.append('tipe', param);
        formData.append('kode', aspek);
        formData.append('nomor', number);
        formData.append('kota', $('#pilih-kota-kab').val());
        formData.append('group', group);
      }else if(group == '2'){
        
        formData.append('id', $('#id_'+aspek+'_'+number).val());
        formData.append('jumlah1', $('#jumlah1_'+aspek+'_'+number).val());
        formData.append('kapasitas1', $('#kapasitas1_'+aspek+'_'+number).val());
        formData.append('sumber1', $('#sumber1_'+aspek+'_'+number).val());
        formData.append('tahun1', $('#tahun1_'+aspek+'_'+number).val());
        formData.append('kapasitas2', $('#kapasitas2_'+aspek+'_'+number).val());
        formData.append('ritasi', $('#ritasi_'+aspek+'_'+number).val());
        formData.append('jumlah2', $('#jumlah2_'+aspek+'_'+number).val());
        formData.append('kapasitas3', $('#kapasitas3_'+aspek+'_'+number).val());
        formData.append('sumber2', $('#sumber2_'+aspek+'_'+number).val());
        formData.append('tahun2', $('#tahun2_'+aspek+'_'+number).val());
        formData.append('keterangan', $('#keterangan_'+aspek+'_'+number).val());
        formData.append('tipe', param);
        formData.append('kode', aspek);
        formData.append('nomor', number);
        formData.append('kota', $('#pilih-kota-kab').val());
        formData.append('group', group);
      }else if(group == '3'){
        formData.append('id', $('#id_'+aspek+'_'+number).val());
        formData.append('jumlah', $('#jumlah_'+aspek+'_'+number).val());
        formData.append('sumber', $('#sumber_'+aspek+'_'+number).val());
        formData.append('tahun', $('#tahun_'+aspek+'_'+number).val());
        formData.append('tipe', param);
        formData.append('kode', aspek);
        formData.append('nomor', number);
        formData.append('kota', $('#pilih-kota-kab').val());
        formData.append('group', group);
      }
    }else{
      if(group == '1'){
        formData.append('id', $('#id_'+aspek).val());
        formData.append('isian', $('#isian_'+aspek).val());
        formData.append('sumber', $('#sumber_'+aspek).val());
        formData.append('tahun', $('#tahun_'+aspek).val());
        formData.append('keterangan', $('#keterangan_'+aspek).val());
        formData.append('tipe', param);
        formData.append('kode', aspek);
        formData.append('nomor', '');
        formData.append('kota', $('#pilih-kota-kab').val());
        formData.append('group', group);
      }else if(group == '2'){
        formData.append('id', $('#id_'+aspek).val());
        formData.append('jumlah1', $('#jumlah1_'+aspek).val());
        formData.append('kapasitas1', $('#kapasitas1_'+aspek).val());
        formData.append('sumber1', $('#sumber1_'+aspek).val());
        formData.append('tahun1', $('#tahun1_'+aspek).val());
        formData.append('kapasitas2', $('#kapasitas2_'+aspek).val());
        formData.append('ritasi', $('#ritasi_'+aspek).val());
        formData.append('jumlah2', $('#jumlah2_'+aspek).val());
        formData.append('kapasitas3', $('#kapasitas3_'+aspek).val());
        formData.append('sumber2', $('#sumber2_'+aspek).val());
        formData.append('tahun2', $('#tahun2_'+aspek).val());
        formData.append('keterangan', $('#keterangan_'+aspek).val());
        formData.append('tipe', param);
        formData.append('kode', aspek);
        formData.append('nomor', '');
        formData.append('kota', $('#pilih-kota-kab').val());
        formData.append('group', group);
      }else if(group == '3'){
        formData.append('id', $('#id_'+aspek).val());
        formData.append('jumlah', $('#jumlah_'+aspek).val());
        formData.append('sumber', $('#sumber_'+aspek).val());
        formData.append('tahun', $('#tahun_'+aspek).val());
        formData.append('tipe', param);
        formData.append('kode', aspek);
        formData.append('nomor', '');
        formData.append('kota', $('#pilih-kota-kab').val());
        formData.append('group', group);
      }else if(group == '4'){
        formData.append('id', $('#id_'+aspek).val());
        formData.append('jumlah', $('#jumlah_'+aspek).val());
        formData.append('sumber', $('#sumber_'+aspek).val());
        formData.append('tahun', $('#tahun_'+aspek).val());
        formData.append('keterangan', $('#keterangan_'+aspek).val());
        formData.append('tipe', param);
        formData.append('kode', aspek);
        formData.append('nomor', '');
        formData.append('kota', $('#pilih-kota-kab').val());
        formData.append('group', group);
      }
    }

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

    }else{

      $.ajax({
          type: 'post',
          processData: false,
          contentType: false,
          url: 'saveInformasi',
          data : formData,
          success: function(result){
            location.reload();
          }
        });
  }

  }else{
      var formData = new FormData();
          formData.append('periode', $('#pilih-periode').val());
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
