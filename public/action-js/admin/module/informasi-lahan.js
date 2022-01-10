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
            formData.append('indikator', $('#indikator').val());
            formData.append('link', $('#link').val());
        
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
                    { 'mDataProp': 'indikator'},
                    { 'mDataProp': 'link'},
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
                                          <a class="dropdown-item waves-effect waves-light" onclick="editdong('`+row.id+`','`+row.kota_kab+`','`+row.lokasi+`','`+row.desa_kel+`','`+row.kecamatan+`','`+row.luas+`','`+row.status+`','`+row.keterangan+`','`+row.indikator+`','`+row.link+`')">Edit</a>
                                          <a class="dropdown-item waves-effect waves-light"onclick="deletedong('`+row.id+`')">Delete</a>
                                      </div>
                                  </div></center>`;
      
                            return el;
                        },
                        aTargets: [ 10 ]
                    },
                    {
                      mRender: function ( data, type, row ) {
    
                        if(row.link.includes('https://') || row.link.includes('http://')){
                          var alink = row.link;
                        }else{
                          var alink = 'https://'+row.link;
                        }
                        var el =`<center><a target="_blank" href="`+alink+`">`+row.link+`</a></center>`;
    
                          return el;
                      },
                      aTargets: [ 9 ]
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
    formData.append('indikator', $('#indikator').val());
    formData.append('link', $('#link').val());

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

      function editdong(id,kota_kab,lokasi,desa_kel,kecamatan,luas,status,keterangan,indikator, link){
        $('#tambah-modal').modal('show');

        $('#idnya').val(id);
        $('#kota_kab').val(kota_kab);
        $('#lokasi').val(lokasi);
        $('#desa_kel').val(desa_kel);
        $('#kecamatan').val(kecamatan);
        $('#luas').val(luas);
        $('#status').val(status);
        $('#keterangan').val(keterangan);
        $('#indikator').val(indikator);
        $('#link').val(link);

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
        $('#indikator').val('');
        $('#link').val('');

        $('#save-lahan').show();
        $('#update-lahan').hide();
      }

      
