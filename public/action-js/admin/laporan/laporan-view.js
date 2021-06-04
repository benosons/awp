"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  const ids = $('#ids').val();
  window.roles = $('#role').val();
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-laporan').addClass('active');

  // loadkegiatan("program",0);
  loadtarget(ids);

  $("#pilih_bulan").chosen().change(function(){
    let nama = $('option:selected', this).text();
    $('[name="isibulan"]').html(nama);
    loadbulan(this.value);
  });

});

function saveminggu(ke){

  var formData = new FormData();
  formData.append('kode_bulan', $('#pilih_bulan').val());
  formData.append('id_paket', $('#id_paket').val());
  formData.append('m'+ke, $('#progres_mingu_'+ke).val());
  formData.append('total_progres', $('#total_progres').val());
  if($('#edit_'+ke).is(":checked")){
    formData.append('edited', 1);
    formData.append('idnya', $('#edit_'+ke).attr("idnya"));
  }
  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'addRealisasi',
      data : formData,
      success: function(result){
        Swal.fire({
          type: 'success',
          title: 'Berhasil Tambah Realisasi Minggu Ke #'+ke+' !',
          showConfirmButton: true,
          // showCancelButton: true,
          confirmButtonText: `Ok`,
        }).then((result) => {
          $(document).ready(function(){
              // loadprogram('');
              // $('#kode_program').val('');
              // $('#nama_program').val('');

          });
        })
      }
    });
}

    function loadtarget(param){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadtarget',
      data : {
              code      : param,
      },
      success: function(result){
          let data = result.data;
          // $('#kode_program').html('<option value="'+data[0].kode_program+'">'+data[0].kode_program+'</option>').trigger("chosen:updated");
          $('#kode_program').val(data[0].kode_program);
          $('#nama_program').val(data[0].nama_program);

          // $('#kode_kegiatan').html('<option value="'+data[0].kode_kegiatan+'">'+data[0].kode_kegiatan+'</option>').trigger("chosen:updated");
          $('#kode_kegiatan').val(data[0].kode_kegiatan);
          $('#nama_kegiatan').val(data[0].nama_kegiatan);

          // $('#kode_subkegiatan').html('<option value="'+data[0].kode_subkegiatan+'">'+data[0].kode_subkegiatan+'</option>').trigger("chosen:updated");
          $('#kode_subkegiatan').val(data[0].kode_subkegiatan);
          $('#nama_subkegiatan').val(data[0].nama_subkegiatan);

          // $('#paket').html('<option value="'+data[0].id_paket+'">'+data[0].nama_paket+'</option>').trigger("chosen:updated");
          $('#paket').val(data[0].nama_paket);
          $('#id_paket').val(data[0].id_paket);
          $('#pagu_kegiatan').val(data[0].pagu);

          for (var i = 0; i < data.length; i++) {
            if(window.roles == '40'){
              $('#inikeuangan').show(true);
              if(data[i].type == 'keuangan'){

                let databulan = '<option value="0"></option>';


                if(data[i].n1 == ''){
                  $('#k1').hide(true);
                  databulan += '<option value="n1">Januari</option>';

                }
                if(data[i].n2 == ''){
                  $('#k2').hide(true);
                  databulan += '<option value="n2">Februari</option>';

                }
                if(data[i].n3 == ''){
                  $('#k3').hide(true);
                  databulan += '<option value="n3">Maret</option>';

                }
                if(data[i].n4 == ''){
                  $('#k4').hide(true);
                  databulan += '<option value="n4">April</option>';

                }
                if(data[i].n5 == ''){
                  $('#k5').hide(true);
                  databulan += '<option value="n5">Mei</option>';

                }
                if(data[i].n6 == ''){
                  $('#k6').hide(true);
                  databulan += '<option value="n6">Juni</option>';

                }
                if(data[i].n7 == ''){
                  $('#k7').hide(true);
                  databulan += '<option value="n7">Juli</option>';

                }
                if(data[i].n8 == ''){
                  $('#k8').hide(true);
                  databulan += '<option value="n8">Agustus</option>';

                }
                if(data[i].n9 == ''){
                  $('#k9').hide(true);
                  databulan += '<option value="n9">September</option>';

                }
                if(data[i].n10 == ''){
                  $('#k10').hide(true);
                  databulan += '<option value="n10">Oktober</option>';

                }
                if(data[i].n11 == ''){
                  $('#k11').hide(true);
                  databulan += '<option value="n11">November</option>';

                }
                if(data[i].n12 == ''){
                  $('#k12').hide(true);
                  databulan += '<option value="n12">Desember</option>';

                }

                $('#pilih_bulan').html(databulan);
                $('#pilih_bulan').trigger("chosen:updated");


                $('#k1').val(data[i].n1);
                $('#k2').val(data[i].n2);
                $('#k3').val(data[i].n3);
                $('#k4').val(data[i].n4);
                $('#k5').val(data[i].n5);
                $('#k6').val(data[i].n6);
                $('#k7').val(data[i].n7);
                $('#k8').val(data[i].n8);
                $('#k9').val(data[i].n9);
                $('#k10').val(data[i].n10);
                $('#k11').val(data[i].n11);
                $('#k12').val(data[i].n12);
              }
            }else if(window.roles == '30'){
              $('#inifisik').show(true);
              if(data[i].type == 'fisik'){

              let databulan = '<option value="0"></option>';

              if(data[i].n1 != ''){
                databulan += '<option value="n1">Januari</option>';
              }
              if(data[i].n2 != ''){
                databulan += '<option value="n2">Februari</option>';
              }
              if(data[i].n3 != ''){
                databulan += '<option value="n3">Maret</option>';
              }
              if(data[i].n4 != ''){
                databulan += '<option value="n4">April</option>';
              }
              if(data[i].n5 != ''){
                databulan += '<option value="n5">Mei</option>';
              }
              if(data[i].n6 != ''){
                databulan += '<option value="n6">Juni</option>';
              }
              if(data[i].n7 != ''){
                databulan += '<option value="n7">Juli</option>';
              }
              if(data[i].n8 != ''){
                databulan += '<option value="n8">Agustus</option>';
              }
              if(data[i].n9 != ''){
                databulan += '<option value="n9">September</option>';
              }
              if(data[i].n10 != ''){
                databulan += '<option value="n10">Oktober</option>';
              }
              if(data[i].n11 != ''){
                databulan += '<option value="n11">November</option>';
              }
              if(data[i].n12 != ''){
                databulan += '<option value="n12">Desember</option>';
              }

              $('#pilih_bulan').html(databulan);
              $('#pilih_bulan').trigger("chosen:updated");

            }
            }
          }
        }
      })
    }

    function loadkegiatan(param, code){
        var formData = new FormData();
        formData.append('code', code);

      $.ajax({
          type: 'post',
          processData: false,
          contentType: false,
          url: 'load'+param,
          data : formData,
          success: function(result){

            let data = result.data;
            let el1   = '<option value=""></option>';
            let el2   = '<option value=""></option>';
            let el3   = '<option value=""></option>';
            let el4   = '<option value=""></option>';

            if(typeof data == 'object'){
              for (var i = 0; i < data.length; i++) {
                el1 += '<option nama="'+data[i].nama_program+'" value="'+data[i].kode_program+'">'+data[i].kode_program+'</option>';
                el2 += '<option nama="'+data[i].nama_kegiatan+'" value="'+data[i].kode_kegiatan+'">'+data[i].kode_kegiatan+'</option>';
                el3 += '<option nama="'+data[i].nama_subkegiatan+'" value="'+data[i].kode_subkegiatan+'">'+data[i].kode_subkegiatan+'</option>';
                el4 += '<option value="'+data[i].id+'">'+data[i].nama_paket+'</option>';
              }
            }

              if(param == 'program'){
                $('#kode_program').html(el1);
                $('#kode_program').trigger("chosen:updated");
                loadkegiatan("kegiatan", code);
              }else if(param == 'kegiatan'){
                $('#kode_kegiatan').html(el2);
                $('#kode_kegiatan').trigger("chosen:updated");
                loadkegiatan("subkegiatan",code);
              }else if(param == 'subkegiatan'){
                $('#kode_subkegiatan').html(el3);
                $('#kode_subkegiatan').trigger("chosen:updated");
                loadkegiatan("paket",code);
              }else if(param == 'paket'){
                $('#paket').html(el4);
                $('#paket').trigger("chosen:updated");
                loadtarget(ids.value);
              }
            }
          })
        }

    function loadbulan(param){

      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadminggu',
          data : {
                  code      : param,
          },
          success: function(result){
              let data = result.data;
              if(typeof data[0] !== 'undefined'){
                $('#progres_mingu_1').val(data[0].m1);
                $('#edit_1').attr('idnya',data[0].id);
                $('#total_progres').val(data[0].m1);
                $('#progres_bulan_lalu').val(data[0].total_sebelumnya);
              }else{
                $('#progres_mingu_1').val('');
                $('#progres_mingu_1').prop('disabled', false);
                $('#save_minggu_1').prop('disabled', false);
              }

              if(typeof data[1] !== 'undefined'){
                $('#progres_mingu_2').val(data[1].m2);
                $('#edit_2').attr('idnya',data[1].id);
                $('#total_progres').val(data[1].m2);
                $('#progres_bulan_lalu').val(data[1].total_sebelumnya);
              }else{
                $('#progres_mingu_2').val('');
                $('#progres_mingu_2').prop('disabled', false);
                $('#save_minggu_2').prop('disabled', false);
              }

              if(typeof data[2] !== 'undefined'){
                $('#progres_mingu_3').val(data[2].m3);
                $('#edit_3').attr('idnya',data[2].id);
                $('#total_progres').val(data[2].m3);
                $('#progres_bulan_lalu').val(data[2].total_sebelumnya);
              }else{
                $('#progres_mingu_3').val('');
                $('#progres_mingu_3').prop('disabled', false);
                $('#save_minggu_3').prop('disabled', false);
              }

              if(typeof data[3] !== 'undefined'){
                $('#progres_mingu_4').val(data[3].m4);
                $('#edit_4').attr('idnya',data[3].id);
                $('#total_progres').val(data[3].m4);
                $('#progres_bulan_lalu').val(data[3].total_sebelumnya);
              }else{
                $('#progres_mingu_4').val('');
                $('#progres_mingu_4').prop('disabled', false);
                $('#save_minggu_4').prop('disabled', false);
              }

              if(typeof data[4] !== 'undefined'){
                $('#progres_mingu_5').val(data[4].m5);
                $('#edit_5').attr('idnya',data[4].id);
                $('#total_progres').val(data[4].m5);
                $('#progres_bulan_lalu').val(data[4].total_sebelumnya);
              }else{
                $('#progres_mingu_5').val('');
                $('#progres_mingu_5').prop('disabled', false);
                $('#save_minggu_5').prop('disabled', false);
              }

                if(typeof data[0] !== 'undefined'){
                  if(data[0].m1){
                    $('#progres_mingu_1').prop('disabled', true);
                    $('#save_minggu_1').prop('disabled', true);
                  }else{
                    $('#progres_mingu_1').prop('disabled', false);
                    $('#save_minggu_1').prop('disabled', false);
                  }
                }else{
                  $('#progres_mingu_1').val('');
                }

                if(typeof data[1] !== 'undefined'){
                  if(data[1].m2){
                    $('#progres_mingu_2').prop('disabled', true);
                    $('#save_minggu_2').prop('disabled', true);
                  }else{
                    $('#progres_mingu_2').prop('disabled', false);
                    $('#save_minggu_2').prop('disabled', false);
                  }
                }else{
                  $('#progres_mingu_2').val('');
                }

                if(typeof data[2] !== 'undefined'){
                  if(data[2].m3){
                    $('#progres_mingu_3').prop('disabled', true);
                    $('#save_minggu_3').prop('disabled', true);
                  }else{
                    $('#progres_mingu_3').prop('disabled', false);
                    $('#save_minggu_3').prop('disabled', false);
                  }
                }else{
                  $('#progres_mingu_3').val('');
                }

                if(typeof data[3] !== 'undefined'){
                  if(data[3].m4){
                    $('#progres_mingu_4').prop('disabled', true);
                    $('#save_minggu_4').prop('disabled', true);
                  }else{
                    $('#progres_mingu_4').prop('disabled', false);
                    $('#save_minggu_4').prop('disabled', false);
                  }
                }else{
                  $('#progres_mingu_4').val('');
                }

                if(typeof data[4] !== 'undefined'){
                  if(data[4].m5){
                    $('#progres_mingu_5').prop('disabled', true);
                    $('#save_minggu_5').prop('disabled', true);
                  }else{
                    $('#progres_mingu_5').prop('disabled', false);
                    $('#save_minggu_5').prop('disabled', false);
                  }
                }else{
                  $('#progres_mingu_5').val('');
                }

            }
          });
        }

  function editdong(ke){
    if($('#progres_mingu_'+ke).val()){
      if($('#edit_'+ke).is(":checked")){
        $('#progres_mingu_'+ke).prop('disabled', false);
        $('#save_minggu_'+ke).prop('disabled', false);
      }else{
        $('#progres_mingu_'+ke).prop('disabled', true);
        $('#save_minggu_'+ke).prop('disabled', true);
      }
    }

  }
