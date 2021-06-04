"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  const ids = $('#ids').val();
  window.roles = $('#role').val();
  $('#nav-menu li').removeClass();
  $('#nav-menu li#menu-rekap').addClass('active');

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
      url: 'loadtargetNip',
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
        $('#pagu_kegiatan').val(data[0].pagu);

        $('#nip').val(data[0].nip);
        $('#ppk').val(data[0].user_fullname);

        for (var i = 0; i < data.length; i++) {
          if(data[i].type == 'keuangan'){
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
          }else if(data[i].type == 'fisik'){

            $('#f1').val(data[i].n1);
            $('#f2').val(data[i].n2);
            $('#f3').val(data[i].n3);
            $('#f4').val(data[i].n4);
            $('#f5').val(data[i].n5);
            $('#f6').val(data[i].n6);
            $('#f7').val(data[i].n7);
            $('#f8').val(data[i].n8);
            $('#f9').val(data[i].n9);
            $('#f10').val(data[i].n10);
            $('#f11').val(data[i].n11);
            $('#f12').val(data[i].n12);

              $('#fr1').val(data[i]['progres'].n1.tot);
              $('#fr2').val(data[i]['progres'].n2.tot);
              $('#fr3').val(data[i]['progres'].n3.tot);
              $('#fr4').val(data[i]['progres'].n4.tot);
              $('#fr5').val(data[i]['progres'].n5.tot);
              $('#fr6').val(data[i]['progres'].n6.tot);
              $('#fr7').val(data[i]['progres'].n7.tot);
              $('#fr8').val(data[i]['progres'].n8.tot);
              $('#fr9').val(data[i]['progres'].n9.tot);
              $('#fr10').val(data[i]['progres'].n10.tot);
              $('#fr11').val(data[i]['progres'].n11.tot);
              $('#fr12').val(data[i]['progres'].n12.tot);

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
