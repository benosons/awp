"use strict";
console.log('You are running jQuery versionin: ' + $.fn.jquery);
$(document).ready(function(){
  $('.main-menu').find('.active').removeClass("active");
  $('.main-menu').find('.pcoded-trigger').removeClass("pcoded-trigger");
  $('#menu_module_rc').addClass("pcoded-trigger active");
  $('#menu_informasi_lahan').addClass('active');

    window.isExist = 1;
  $('#all-lahan').DataTable();
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

  $('#save-lahan').on('click', function(){
        var formData = new FormData();
            formData.append('kota_kab', $('#kota_kab').val());
            formData.append('lokasi', $('#lokasi').val());
            formData.append('desa_kel', $('#desa_kel').val());
            formData.append('kecamatan', $('#kecamatan').val());
            formData.append('luas', $('#luas').val());
            formData.append('status', $('#status').val());
            formData.append('keterangan', $('#keterangan').val());
        
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
      url: 'loadlahan',
      data : {
              param      : param,
              id         : ids,
              periode    : periode,
      },
      success: function(result){
          let data = result.data;
          let code = result.code;
          
        if(code == '1'){
            
            var groupColumn = 1;
            var table = $('#all-lahan').DataTable({
                destroy: true,
                paging: true,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
                autoWidth: false,
                responsive: false,
                pageLength: 30,
                aaData: result.data,
                aoColumns: [
                    { 'mDataProp': 'id' },
                    { 'mDataProp': 'kota_kab' },
                    { 'mDataProp': 'lokasi'},
                    { 'mDataProp': 'desa_kel'},
                    { 'mDataProp': 'kecamatan'},
                    { 'mDataProp': 'luas'},
                    { 'mDataProp': 'status'},
                    { 'mDataProp': 'keterangan'},
                    { 'mDataProp': 'id' },

                ],
                'rowsGroup': [0],
                
                "columnDefs": [
                    // { "targets": "_all", "orderable": false },
                    {
                        mRender: function ( data, type, row ) {
      
                          var el =`<center><div class="btn-group dropdown-split-info">
                                      <button type="button" class="btn btn-info btn-mini dropdown-toggle dropdown-toggle-split waves-effect waves-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          <span class="sr-only"></span>
                                      </button>
                                      <div class="dropdown-menu">
                                          <a class="dropdown-item waves-effect waves-light" onclick="editdong('`+row.id+`','`+row.kota_kab+`','`+row.lokasi+`','`+row.desa_kel+`','`+row.kecamatan+`','`+row.luas+`','`+row.status+`','`+row.keterangan+`')">Edit</a>
                                          <a class="dropdown-item waves-effect waves-light"onclick="deletedong('`+row.id+`')">Delete</a>
                                      </div>
                                  </div></center>`;
      
                            return el;
                        },
                        aTargets: [ 8 ]
                    },
                    
                ],
                "order": [[ 1, 'asc' ]],
                fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                    var index = iDisplayIndexFull + 1;
                    $('td:eq(0)', nRow).html('#'+index);
                    return  index;
                },
            });
            
        }else{
            var table = $('#all-lahan').DataTable();
            table.clear().draw();
        }
        

            
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
      url: 'saveLahan',
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

  function deletedong(id){
      bootbox.confirm({
        message: "Anda yakin <b>Hapus</b> data ini ?",
        buttons: {
         confirm: {
             label: '<i class="fa fa-check"></i> Ya',
             className: 'btn-success btn-xs',
         },
         cancel: {
             label: '<i class="fa fa-times"></i> Tidak',
             className: 'btn-danger btn-xs',
         }
       },
        callback : function(result) {
  			if(result) {
          var formData = new FormData();
          formData.append('id', id);
          $.ajax({
              type: 'post',
              processData: false,
              contentType: false,
              url: 'deletelahan',
              data : formData,
              success: function(result){
                location.reload();
              }
            });
    			}
    		}
    });
  
}

  function updatelahan(){
    var formData = new FormData();
    formData.append('id', $('#idnya').val());
    formData.append('kota_kab', $('#kota_kab').val());
    formData.append('lokasi', $('#lokasi').val());
    formData.append('desa_kel', $('#desa_kel').val());
    formData.append('kecamatan', $('#kecamatan').val());
    formData.append('luas', $('#luas').val());
    formData.append('status', $('#status').val());
    formData.append('keterangan', $('#keterangan').val());
    $.ajax({
        type: 'post',
        processData: false,
        contentType: false,
        url: 'saveLahan',
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

      function editdong(id,kota_kab,lokasi,desa_kel,kecamatan,luas,status,keterangan){
        $('#tambah-modal').modal('show');

        $('#idnya').val(id);
        $('#kota_kab').val(kota_kab);
        $('#lokasi').val(lokasi);
        $('#desa_kel').val(desa_kel);
        $('#kecamatan').val(kecamatan);
        $('#luas').val(luas);
        $('#status').val(status);
        $('#keterangan').val(keterangan);

        $('#save-lahan').hide();
        $('#update-lahan').show();
      }

      function tambahdong(){
        $('#tambah-modal').modal('show');

        $('#idnya').val('');
        $('#kota_kab').val('');
        $('#lokasi').val('');
        $('#desa_kel').val('');
        $('#kecamatan').val('');
        $('#luas').val('');
        $('#status').val('');
        $('#keterangan').val('');

        $('#save-lahan').show();
        $('#update-lahan').hide();
      }

      
