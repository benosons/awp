"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('.main-menu').find('.active').removeClass("active");
  $('.main-menu').find('.pcoded-trigger').removeClass("pcoded-trigger");
  $('#menu_pelelangan').addClass('active');

    window.isExist = 1;
  $('#all-pelelangan').DataTable();

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
  loadpelelangan('')
  $('#pilih-aspek').on('change', function(){
    loadaspek('indikator', this.value)
  });

  $('#pilih-indikator').on('change', function(){
    loadaspek('parameter', this.value)
  })

  $('#pilih-kota-kab').on('change', function(){
    loaddata(this.value);
    loadinformasi(this.value);
  })



  if($('#is_open').val() == 1){
    $('#btn-tambah').hide();
  }

  $('[name="pelelangan"]').on('change', function(){
    var thisid = this.id;
    var split = thisid.split("_");
    var param = split[0];
    var kode  = split[1];
    var pelaksanaan = 0;
    var jadwal = 0;

      if($('#alokasi_'+kode).val() && $('#realisasi_'+kode).val()){
        var hari = parseInt($('#alokasi_'+kode).val())-parseInt($('#realisasi_'+kode).val());
        var persentase = hari/parseInt($('#alokasi_'+kode).val());
        jadwal += Math.round((parseInt($('#alokasi_'+kode).val())/parseInt($('#realisasi_'+kode).val()))*100);
        $('#persentase_'+kode).html(Math.ceil(persentase*100)+'%');
        $('#hari_'+kode).html(hari);
        $('#jadwal_'+kode).html(jadwal+'%');

      }

      if($('#progress_'+kode).val() && $('#pemenuhan_'+kode).val()){
        pelaksanaan += (parseInt($('#progress_'+kode).val())/parseInt($('#pemenuhan_'+kode).val()))*100;
        $('#pelaksanaan_'+kode).html(pelaksanaan+'%');
      }

      if(pelaksanaan && jadwal){
        var rata = ((pelaksanaan+jadwal)/2)/100;
        $('#rata_'+kode).html(rata.toFixed(2));
      }
    
  })
  

});

function loadpelelangan(param, kode){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadpelelangan',
      data : {
              param      : param,
              kode         : kode,
      },
      success: function(result){
          let data = result.data;
          let code = result.code;

          var sum_pemenuhan = 0;
          var sum_alokasi = 0;
          var sum_progress = 0;
          var sum_realisasi = 0;
          var sum_hari = 0;

          var avg_persentase = 0;
          var array_persentase = [];

          var avg_pelaksanaan = 0;
          var array_pelaksanaan = [];

          var avg_jadwal = 0;
          var array_jadwal = [];

          var avg_rata = 0;
          var array_rata = [];

          for (let index = 0; index < data.length; index++) {
            let kode = data[index]['kode'];
            $('#pemenuhan_'+kode).val(data[index]['pemenuhan']);
            $('#alokasi_'+kode).val(data[index]['alokasi']);
            $('#progress_'+kode).val(data[index]['progress']);
            $('#realisasi_'+kode).val(data[index]['realisasi']);

            sum_pemenuhan += parseInt(data[index]['pemenuhan']);
            sum_alokasi += parseInt(data[index]['alokasi']);
            sum_progress += parseInt(data[index]['progress']);
            sum_realisasi += parseInt(data[index]['realisasi']);
            
          }
          $('[name="pelelangan"]').trigger('change');

          $('#sum_pemenuhan').html(sum_pemenuhan);
          $('#sum_alokasi').html(sum_alokasi);
          $('#sum_progress').html(sum_progress);
          $('#sum_realisasi').html(sum_realisasi);

          
          for (let i = 1; i <= 16; i++) {
          
            if(!isNaN(($('#hari_'+i).html()))){
              sum_hari += parseInt($('#hari_'+i).html());
            }

            if(!isNaN(($('#persentase_'+i).html().replace("%","")))){
              avg_persentase += parseInt($('#persentase_'+i).html().replace("%",""));
              array_persentase.push($('#persentase_'+i).html());
            }

            if(!isNaN(($('#pelaksanaan_'+i).html().replace("%","")))){
              avg_pelaksanaan += parseInt($('#pelaksanaan_'+i).html().replace("%",""));
              array_pelaksanaan.push($('#pelaksanaan_'+i).html());
            }

            if(!isNaN(($('#jadwal_'+i).html().replace("%","")))){
              avg_jadwal += parseInt($('#jadwal_'+i).html().replace("%",""));
              array_jadwal.push($('#jadwal_'+i).html());
            }

            if(!isNaN(($('#rata_'+i).html().replace("%","")))){
              avg_rata += parseInt($('#rata_'+i).html());
              array_rata.push($('#rata_'+i).html());
            }
          }

          $('#sum_hari').html(sum_hari);
          $('#avg_persentase').html(avg_persentase/array_persentase.length+'%');
          $('#avg_pelaksanaan').html(avg_pelaksanaan/array_pelaksanaan.length+'%');
          $('#avg_jadwal').html(avg_jadwal/array_jadwal.length+'%');
          $('#avg_rata').html((avg_rata/array_rata.length).toFixed(2));
            
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

      if(code == 1){
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

function loadinformasi(param, ids){

      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadinformasi',
          data : {
                  param      : param,
                  id         : ids,
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

function submit(kode){
  
      var formData = new FormData();
      formData.append('id', $('#id_'+kode).val());

      formData.append('pemenuhan', $('#pemenuhan_'+kode).val());
      formData.append('alokasi', $('#alokasi_'+kode).val());
      formData.append('progress', $('#progress_'+kode).val());
      formData.append('realisasi', $('#realisasi_'+kode).val());
      formData.append('kode', kode);

      $.ajax({
          type: 'post',
          processData: false,
          contentType: false,
          url: 'savePelelangan',
          data : formData,
          success: function(result){
            location.reload();
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
