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
            formData.append('koordinat', $('#koordinat').val());
            formData.append('desa_kel', $('#desa_kel').val());
            formData.append('kecamatan', $('#kecamatan').val());
            formData.append('luas', $('#luas').val());
            formData.append('status', $('#status').val());
            formData.append('status_1', $('#status_1').val());
            formData.append('keterangan', $('#keterangan').text());
            formData.append('link_surat_minat', $('#link_surat_minat').val());
            formData.append('link_sertifikat', $('#link_sertifikat').val());
            formData.append('link_surat_aset', $('#link_surat_aset').val());
            formData.append('link_surat_kesiapan', $('#link_surat_kesiapan').val());
            formData.append('link_surat_kesesuaian', $('#link_surat_kesesuaian').val());
            formData.append('link_dokumen_lingkungan', $('#link_dokumen_lingkungan').val());
            formData.append('link_dokumen_sra', $('#link_dokumen_sra').val());
        
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
                    {'mDataProp': 'id'},
                    {'mDataProp': 'kota_kab'},
                    {'mDataProp': 'lokasi'},
                    {'mDataProp': 'koordinat'},
                    {'mDataProp': 'desa_kel'},
                    {'mDataProp': 'kecamatan'},
                    {'mDataProp': 'luas'},
                    {'mDataProp': 'status'},
                    {'mDataProp': 'status_1'},
                    {'mDataProp': 'keterangan'},
                    {'mDataProp': 'link_surat_minat'},
                    {'mDataProp': 'link_sertifikat'},
                    {'mDataProp': 'link_surat_aset'},
                    {'mDataProp': 'link_surat_penyediaan'},
                    {'mDataProp': 'link_surat_kesiapan'},
                    {'mDataProp': 'link_surat_kesesuaian'},
                    {'mDataProp': 'link_dokumen_lingkungan'},
                    {'mDataProp': 'link_dokumen_sra'},
                    {'mDataProp': 'id'},

                ],
                'rowsGroup': [0],
                
                "columnDefs": [
                    // { "targets": "_all", "orderable": false },
                    {
                        mRender: function ( data, type, row ) {
                          console.log(row);
                          var el =`<center><div class="btn-group dropdown-split-info">
                                      <button type="button" class="btn btn-info btn-mini dropdown-toggle dropdown-toggle-split waves-effect waves-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          <span class="sr-only"></span>
                                      </button>
                                      <div class="dropdown-menu">
                                          <a class="dropdown-item waves-effect waves-light" onclick="editdong(
                                            '`+row.id+`','`+row.kota_kab+`','`+row.lokasi+`','`+row.koordinat+`','`+row.desa_kel+`','`+row.kecamatan+`','`+row.luas+`','`+row.status+`','`+row.status_1+`','`+row.keterangan+`','`+row.link_surat_minat+`','`+row.link_sertifikat+`','`+row.link_surat_aset+`','`+row.link_surat_penyediaan+`','`+row.link_surat_kesiapan+`','`+row.link_surat_kesesuaian+`','`+row.link_dokumen_lingkungan+`','`+row.link_dokumen_sra+`')">Edit</a>
                                          <a class="dropdown-item waves-effect waves-light"onclick="deletedong('`+row.id+`')">Delete</a>
                                      </div>
                                  </div></center>`;
      
                            return el;
                        },
                        aTargets: [ 18 ]
                    },
                    {
                      mRender: function ( data, type, row ) {
                        if(row.link_surat_minat.includes('https://') || row.link_surat_minat.includes('http://')){
                          var alink = row.link_surat_minat;
                        }else{
                          var alink = 'https://'+row.link_surat_minat;
                        }
                        var el =`<center><a target="_blank" href="`+alink+`">`+row.link_surat_minat+`</a></center>`;
    
                          return el;
                      },
                      aTargets: [ 10]
                  },
                    {
                      mRender: function ( data, type, row ) {
    
                        if(row.link_sertifikat.includes('https://') || row.link_sertifikat.includes('http://')){
                          var alink = row.link_sertifikat;
                        }else{
                          var alink = 'https://'+row.link_sertifikat;
                        }
                        var el =`<center><a target="_blank" href="`+alink+`">`+row.link_sertifikat+`</a></center>`;
    
                          return el;
                      },
                      aTargets: [ 11 ]
                  },
                    {
                      mRender: function ( data, type, row ) {
    
                        if(row.link_surat_aset.includes('https://') || row.link_surat_aset.includes('http://')){
                          var alink = row.link_surat_aset;
                        }else{
                          var alink = 'https://'+row.link_surat_aset;
                        }
                        var el =`<center><a target="_blank" href="`+alink+`">`+row.link_surat_aset+`</a></center>`;
    
                          return el;
                      },
                      aTargets: [ 12 ]
                  },
                    {
                      mRender: function ( data, type, row ) {
    
                        if(row.link_surat_penyediaan.includes('https://') || row.link_surat_penyediaan.includes('http://')){
                          var alink = row.link_surat_penyediaan;
                        }else{
                          var alink = 'https://'+row.link_surat_penyediaan;
                        }
                        var el =`<center><a target="_blank" href="`+alink+`">`+row.link_surat_penyediaan+`</a></center>`;
    
                          return el;
                      },
                      aTargets: [ 13 ]
                  },
                    {
                      mRender: function ( data, type, row ) {
                        
                        if(row.link_surat_kesiapan.includes('https://') || row.link_surat_kesiapan.includes('http://')){
                          var alink = row.link_surat_kesiapan;
                        }else{
                          var alink = 'https://'+row.link_surat_kesiapan;
                        }
                        var el =`<center><a target="_blank" href="`+alink+`">`+row.link_surat_kesiapan+`</a></center>`;
    
                          return el;
                      },
                      aTargets: [ 14 ]
                  },
                    {
                      mRender: function ( data, type, row ) {
    
                        if(row.link_surat_kesesuaian.includes('https://') || row.link_surat_kesesuaian.includes('http://')){
                          var alink = row.link_surat_kesesuaian;
                        }else{
                          var alink = 'https://'+row.link_surat_kesesuaian;
                        }
                        var el =`<center><a target="_blank" href="`+alink+`">`+row.link_surat_kesesuaian+`</a></center>`;
    
                          return el;
                      },
                      aTargets: [ 15 ]
                  },
                    {
                      mRender: function ( data, type, row ) {
    
                        if(row.link_surat_kesesuaian.includes('https://') || row.link_surat_kesesuaian.includes('http://')){
                          var alink = row.link_surat_kesesuaian;
                        }else{
                          var alink = 'https://'+row.link_surat_kesesuaian;
                        }
                        var el =`<center><a target="_blank" href="`+alink+`">`+row.link_surat_kesesuaian+`</a></center>`;
    
                          return el;
                      },
                      aTargets: [ 16 ]
                  },
                    {
                      mRender: function ( data, type, row ) {
    
                        if(row.link_dokumen_lingkungan.includes('https://') || row.link_dokumen_lingkungan.includes('http://')){
                          var alink = row.link_dokumen_lingkungan;
                        }else{
                          var alink = 'https://'+row.link_dokumen_lingkungan;
                        }
                        var el =`<center><a target="_blank" href="`+alink+`">`+row.link_dokumen_lingkungan+`</a></center>`;
    
                          return el;
                      },
                      aTargets: [ 17 ]
                  },
                    {
                      mRender: function ( data, type, row ) {
    
                        if(row.link_dokumen_sra.includes('https://') || row.link_dokumen_sra.includes('http://')){
                          var alink = row.link_dokumen_sra;
                        }else{
                          var alink = 'https://'+row.link_dokumen_sra;
                        }
                        var el =`<center><a target="_blank" href="`+alink+`">`+row.link_dokumen_sra+`</a></center>`;
    
                          return el;
                      },
                      aTargets: [ 18 ]
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
    formData.append('koordinat', $('#koordinat').val());
    formData.append('desa_kel', $('#desa_kel').val());
    formData.append('kecamatan', $('#kecamatan').val());
    formData.append('luas', $('#luas').val());
    formData.append('status', $('#status').val());
    formData.append('status_1', $('#status_1').val());
    formData.append('keterangan', $('#keterangan').text());
    formData.append('link_surat_minat', $('#link_surat_minat').val());
    formData.append('link_sertifikat', $('#link_sertifikat').val());
    formData.append('link_surat_aset', $('#link_surat_aset').val());
    formData.append('link_surat_penyediaan', $('#link_surat_penyediaan').val());
    formData.append('link_surat_kesiapan', $('#link_surat_kesiapan').val());
    formData.append('link_surat_kesesuaian', $('#link_surat_kesesuaian').val());
    formData.append('link_dokumen_lingkungan', $('#link_dokumen_lingkungan').val());
    formData.append('link_dokumen_sra', $('#link_dokumen_sra').val());

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

      function editdong(id,kota_kab,lokasi,koordinat,desa_kel,kecamatan,luas,status,status_1,keterangan,link_surat_minat,link_sertifikat,link_surat_aset,link_surat_penyediaan,link_surat_kesiapan,link_surat_kesesuaian,link_dokumen_lingkungan,link_dokumen_sra){
        $('#tambah-modal').modal('show');

        $('#idnya').val(id);

        $('#kota_kab').val(kota_kab);
        $('#lokasi').val(lokasi);
        $('#koordinat').val(koordinat);
        $('#desa_kel').val(desa_kel);
        $('#kecamatan').val(kecamatan);
        $('#luas').val(luas);
        $('#status').val(status);
        $('#status_1').val(status_1);
        $('#keterangan').text(keterangan);
        $('#link_surat_minat').val(link_surat_minat);
        $('#link_sertifikat').val(link_sertifikat);
        $('#link_surat_aset').val(link_surat_aset);
        $('#link_surat_penyediaan').val(link_surat_penyediaan);
        $('#link_surat_kesiapan').val(link_surat_kesiapan);
        $('#link_surat_kesesuaian').val(link_surat_kesesuaian);
        $('#link_dokumen_lingkungan').val(link_dokumen_lingkungan);
        $('#link_dokumen_sra').val(link_dokumen_sra);

        $('#save-lahan').hide();
        $('#update-lahan').show();
      }

      function tambahdong(){
        $('#tambah-modal').modal('show');

        $('#idnya').val('');
        $('#kota_kab').val('');
        $('#lokasi').val('');
        $('#koordinat').val('');
        $('#desa_kel').val('');
        $('#kecamatan').val('');
        $('#luas').val('');
        $('#status').val('');
        $('#status_1').val('');
        $('#keterangan').text('');
        $('#link_surat_minat').val('');
        $('#link_sertifikat').val('');
        $('#link_surat_aset').val('');
        $('#link_surat_penyediaan').val('');
        $('#link_surat_kesiapan').val('');
        $('#link_surat_kesesuaian').val('');
        $('#link_dokumen_lingkungan').val('');
        $('#link_dokumen_sra').val('');

        $('#save-lahan').show();
        $('#update-lahan').hide();
      }

      
