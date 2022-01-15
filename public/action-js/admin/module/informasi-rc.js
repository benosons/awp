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

    $('#nilai_a1').on('change', function() {
      $('#total_poin_a').text(this.value);
    })

    $('[name="nilai_b"]').on('change', function() {
      var b1 = Number.isNaN(parseInt($('#nilai_b1').val())) ? 0 : parseInt($('#nilai_b1').val());
      var b2 = Number.isNaN(parseInt($('#nilai_b2').val())) ? 0 : parseInt($('#nilai_b2').val());
      var b3 = Number.isNaN(parseInt($('#nilai_b3').val())) ? 0 : parseInt($('#nilai_b3').val());
      var b4 = Number.isNaN(parseInt($('#nilai_b4').val())) ? 0 : parseInt($('#nilai_b4').val());
      $('#total_poin_b').text(b1+b2+b3+b4);
    })

    $('[name="nilai_c"]').on('change', function() {
      var c1 = Number.isNaN(parseInt($('#nilai_c1').val())) ? 0 : parseInt($('#nilai_c1').val());
      var c2 = Number.isNaN(parseInt($('#nilai_c2').val())) ? 0 : parseInt($('#nilai_c2').val());
      var c3 = Number.isNaN(parseInt($('#nilai_c3').val())) ? 0 : parseInt($('#nilai_c3').val());
      var c4 = Number.isNaN(parseInt($('#nilai_c4').val())) ? 0 : parseInt($('#nilai_c4').val());
      var c5 = Number.isNaN(parseInt($('#nilai_c5').val())) ? 0 : parseInt($('#nilai_c5').val());
      $('#total_poin_c').text(c1+c2+c3+c4+c5);
    })

    $('[name="nilai_d"]').on('change', function() {
      var d1 = Number.isNaN(parseInt($('#nilai_d1').val())) ? 0 : parseInt($('#nilai_d1').val());
      var d2 = Number.isNaN(parseInt($('#nilai_d2').val())) ? 0 : parseInt($('#nilai_d2').val());
      $('#total_poin_d').text(d1+d2);
    })

    $('#nilai_e1').on('change', function() {
      $('#total_poin_e').text(this.value);
    })

    $('#nilai_f1').on('change', function() {
      $('#total_poin_f').text(this.value);
    })

    setInterval(function(){
      var a1 = Number.isNaN(parseInt($('#nilai_a1').val())) ? 0 : parseInt($('#nilai_a1').val());
      $('#total_poin_a').text(a1);
    }, 5000);

    setInterval(function(){
      var b1 = Number.isNaN(parseInt($('#nilai_b1').val())) ? 0 : parseInt($('#nilai_b1').val());
      var b2 = Number.isNaN(parseInt($('#nilai_b2').val())) ? 0 : parseInt($('#nilai_b2').val());
      var b3 = Number.isNaN(parseInt($('#nilai_b3').val())) ? 0 : parseInt($('#nilai_b3').val());
      var b4 = Number.isNaN(parseInt($('#nilai_b4').val())) ? 0 : parseInt($('#nilai_b4').val());
      $('#total_poin_b').text(b1+b2+b3+b4);
    }, 5000);

    setInterval(function(){
      var c1 = Number.isNaN(parseInt($('#nilai_c1').val())) ? 0 : parseInt($('#nilai_c1').val());
      var c2 = Number.isNaN(parseInt($('#nilai_c2').val())) ? 0 : parseInt($('#nilai_c2').val());
      var c3 = Number.isNaN(parseInt($('#nilai_c3').val())) ? 0 : parseInt($('#nilai_c3').val());
      var c4 = Number.isNaN(parseInt($('#nilai_c4').val())) ? 0 : parseInt($('#nilai_c4').val());
      var c5 = Number.isNaN(parseInt($('#nilai_c5').val())) ? 0 : parseInt($('#nilai_c5').val());
      $('#total_poin_c').text(c1+c2+c3+c4+c5);
    }, 5000);

    setInterval(function(){
      var d1 = Number.isNaN(parseInt($('#nilai_d1').val())) ? 0 : parseInt($('#nilai_d1').val());
      var d2 = Number.isNaN(parseInt($('#nilai_d2').val())) ? 0 : parseInt($('#nilai_d2').val());
      $('#total_poin_d').text(d1+d2);
    }, 5000);

    setInterval(function(){
      var e1 = Number.isNaN(parseInt($('#nilai_e1').val())) ? 0 : parseInt($('#nilai_e1').val());
      $('#total_poin_e').text(e1);
    }, 5000);

    setInterval(function(){
      var f1 = Number.isNaN(parseInt($('#nilai_f1').val())) ? 0 : parseInt($('#nilai_f1').val());
      $('#total_poin_f').text(f1);
    }, 5000);

    setInterval(function(){
      var total_a = Number.isNaN(parseInt($('#total_poin_a').text())) ? 0 : parseInt($('#total_poin_a').text()) ;
      var total_b = Number.isNaN(parseInt($('#total_poin_b').text())) ? 0 : parseInt($('#total_poin_b').text()) ;
      var total_c = Number.isNaN(parseInt($('#total_poin_c').text())) ? 0 : parseInt($('#total_poin_c').text()) ;
      var total_d = Number.isNaN(parseInt($('#total_poin_d').text())) ? 0 : parseInt($('#total_poin_d').text()) ;
      var total_e = Number.isNaN(parseInt($('#total_poin_e').text())) ? 0 : parseInt($('#total_poin_e').text()) ;
      var total_f = Number.isNaN(parseInt($('#total_poin_f').text())) ? 0 : parseInt($('#total_poin_f').text()) ;

      $('#total_poin_all').text(total_a+total_b+total_c+total_d+total_e+total_f);
    }, 5000);

// $($('div#dd-w-0').children().children().children()[1]).remove()
// $($('div#dd-w-1').children().children().children()[1]).remove()

  $('#save-penilaian').on('click', function(){
        var formData = new FormData();

          formData.append('id', $('#idnya').val());
          formData.append('id_lahan', $('#id_lahan').val());
          // A
          formData.append('nilai_a1', $('#nilai_a1').val());
          formData.append('link_a1', $('#link_a1').val());
          formData.append('keterangan_a1', $('#keterangan_a1').val());
          // B
          formData.append('nilai_b1', $('#nilai_b1').val());
          formData.append('link_b1', $('#link_b1').val());
          formData.append('keterangan_b1', $('#keterangan_b1').val());
          
          formData.append('nilai_b2', $('#nilai_b2').val());
          formData.append('link_b2', $('#link_b2').val());
          formData.append('keterangan_b2', $('#keterangan_b2').val());

          formData.append('nilai_b3', $('#nilai_b3').val());
          formData.append('link_b3', $('#link_b3').val());
          formData.append('keterangan_b3', $('#keterangan_b3').val());

          formData.append('nilai_b4', $('#nilai_b4').val());
          formData.append('link_b4', $('#link_b4').val());
          formData.append('keterangan_b4', $('#keterangan_b4').val());
          // C
          formData.append('nilai_c1', $('#nilai_c1').val());
          formData.append('link_c1', $('#link_c1').val());
          formData.append('keterangan_c1', $('#keterangan_c1').val());
          
          formData.append('nilai_c2', $('#nilai_c2').val());
          formData.append('link_c2', $('#link_c2').val());
          formData.append('keterangan_c2', $('#keterangan_c2').val());

          formData.append('nilai_c3', $('#nilai_c3').val());
          formData.append('link_c3', $('#link_c3').val());
          formData.append('keterangan_c3', $('#keterangan_c3').val());

          formData.append('nilai_c4', $('#nilai_c4').val());
          formData.append('link_c4', $('#link_c4').val());
          formData.append('keterangan_c4', $('#keterangan_c4').val());

          formData.append('nilai_c5', $('#nilai_c5').val());
          formData.append('link_c5', $('#link_c5').val());
          formData.append('keterangan_c5', $('#keterangan_c5').val());

          // D
          formData.append('nilai_d1', $('#nilai_d1').val());
          formData.append('link_d1', $('#link_d1').val());
          formData.append('keterangan_d1', $('#keterangan_d1').val());
          
          formData.append('nilai_d2', $('#nilai_d2').val());
          formData.append('link_d2', $('#link_d2').val());
          formData.append('keterangan_d2', $('#keterangan_d2').val());

          // E
          formData.append('nilai_e1', $('#nilai_e1').val());
          formData.append('link_e1', $('#link_e1').val());
          formData.append('keterangan_e1', $('#keterangan_e1').val());

          // F
          formData.append('nilai_f1', $('#nilai_f1').val());
          formData.append('link_f1', $('#link_f1').val());
          formData.append('keterangan_f1', $('#keterangan_f1').val());


        save(formData);    
  })

  loaddata($('#id_lahan').val());
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

function loaddata(param, ids){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadpenilaian',
      data : {
              param      : param,
              id         : ids,
      },
      success: function(result){
          let data = result.data;
          let code = result.code;
          
        if(code == '1'){
          var isi = data[0];
          $('#idnya').val(isi.id);
          // A
          $('#nilai_a1').val(isi.nilai_a1);
          $('#link_a1').val(isi.link_a1);
          $('#keterangan_a1').val(isi.keterangan_a1);
          // B
          $('#nilai_b1').val(isi.nilai_b1);
          $('#link_b1').val(isi.link_b1);
          $('#keterangan_b1').val(isi.keterangan_b1);
          
          $('#nilai_b2').val(isi.nilai_b2);
          $('#link_b2').val(isi.link_b2);
          $('#keterangan_b2').val(isi.keterangan_b2);

          $('#nilai_b3').val(isi.nilai_b4);
          $('#link_b3').val(isi.link_b4);
          $('#keterangan_b3').val(isi.keterangan_b4);

          $('#nilai_b4').val(isi.nilai_b4);
          $('#link_b4').val(isi.link_b4);
          $('#keterangan_b4').val(isi.keterangan_b4);
          // C
          $('#nilai_c1').val(isi.nilai_c1);
          $('#link_c1').val(isi.link_c1);
          $('#keterangan_c1').val(isi.keterangan_c1);
          
          $('#nilai_c2').val(isi.nilai_c2);
          $('#link_c2').val(isi.ink_c2);
          $('#keterangan_c2').val(isi.keterangan_c2);

          $('#nilai_c3').val(isi.nilai_c3);
          $('#link_c3').val(isi.link_c3);
          $('#keterangan_c3').val(isi.keterangan_c3);

          $('#nilai_c4').val(isi.nilai_c4);
          $('#link_c4').val(isi.link_c4);
          $('#keterangan_c4').val(isi.keterangan_c4);

          $('#nilai_c5').val(isi.ilai_c5);
          $('#link_c5').val(isi.link_c5);
          $('#keterangan_c5').val(isi.keterangan_c5);

          // D
          $('#nilai_d1').val(isi.nilai_d1);
          $('#link_d1').val(isi.link_d1);
          $('#keterangan_d1').val(isi.keterangan_d1);
          
          $('#nilai_d2').val(isi.nilai_d2);
          $('#link_d2').val(isi.link_d2);
          $('#keterangan_d2').val(isi.keterangan_d2);

          // E
          $('#nilai_e1').val(isi.nilai_e1);
          $('#link_e1').val(isi.link_e1);
          $('#keterangan_e1').val(isi.keterangan_e1);

          // F
          $('#nilai_f1').val(isi.nilai_f1);
          $('#link_f1').val(isi.link_f1);
          $('#keterangan_f1').val(isi.keterangan_f1);
        }else{

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
      url: 'savePenilaian',
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
    formData.append('keterangan', $('#keterangan').val());
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
        $('#keterangan').val('');
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


      function menurc(id){
        var baseUrl = $('#is_baseURL').val();
        window.location.href = baseUrl.replace("public", "rc?ids="+id);
      }

      
