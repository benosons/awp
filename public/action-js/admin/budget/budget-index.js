"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('.main-menu').find('.active').removeClass("active");
  $('.main-menu').find('.pcoded-trigger').removeClass("pcoded-trigger");
  $('#menu_budget').addClass('active');

    window.isExist = 1;
  $('#all-budget').DataTable();

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

  $('#save-realisasi').on('click', function(){

    if(window.isExist == '1'){
        $("#isExist").css("display", "block");
        $('#save-realisasi').prop("disabled", true);
        setTimeout(function(){
            $("#isExist").css("display", "none");
        },2000);
    }else if(window.isExist == '0'){
        window.isExist = 0;
        var formData = new FormData();
        for (let i = 1; i <= 11; i++) {  
            formData.append('periode', $('#pilih-bulan-input').val());
            formData.append('komponen_'+i+'_usd', $('#komponen_'+i+'_usd').val());
            formData.append('komponen_'+i+'_idr', $('#komponen_'+i+'_idr').val());
        }
        
        // save(formData);
    }
    
  })


  $('#pilih_komponen').on('change', function(){
    loaddata('data_program', this.value);
  });

  $('#pilih-bulan').on('change', function(){
      loaddata(this.value);

  })

  $('#pilih-bulan-input').on('change', function(){
    cekperiode($('#pilih-bulan-input').val());

  })

  if($('#is_open').val() == 1){
    $('#btn-tambah').hide();
  }

  $('[name="komponen_usd"], [name="komponen_idr"]').on('change', function(){
        for (let i = 1; i <= 11; i++) {
            if($('#komponen_'+i+'_usd').val() && $('#komponen_'+i+'_idr').val()){
                $('#save-realisasi').prop("disabled", false);
            }else{
                $('#save-realisasi').prop("disabled", true);
            }
            
        }
  });


});

function loaddata(param, ids){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loadinstansi',
      data : {
              param      : param,
              id         : ids,
      },
      success: function(result){
          let data = result.data;
          let code = result.code;
        if(code == '1'){
            
            var groupColumn = 1;
            var table = $('#all-budget').DataTable({
                destroy: true,
                paging: true,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
                autoWidth: false,
                responsive: false,
                pageLength: 25,
                aaData: result.data,
                aoColumns: [
                    { 'mDataProp': 'id_instansi'},
                    { 'mDataProp': 'nama_instansi'},
                    { 'mDataProp': 'nama_komponen'},
                    { 'mDataProp': 'dipa_rev_usd', className: "text-right"},
                    { 'mDataProp': 'diva_rev_idr', className: "text-right"},
                    { 'mDataProp': 'real_usd', className: "text-right"},
                    { 'mDataProp': 'real_idr', className: "text-right"},
                    { 'mDataProp': 'sisa_usd', className: "text-right"},
                    { 'mDataProp': 'sisa_idr', className: "text-right"},
                    { 'mDataProp': 'persen_usd', className: "text-right"},
                    { 'mDataProp': 'persen_idr', className: "text-right"},
                    { 'mDataProp': 'id_instansi'},
                ],
                "columnDefs": [
                    { "targets": "_all", "orderable": false },
                    { "visible": false, "targets": groupColumn },
                    {
                        mRender: function ( data, type, row ) {
      
                          var el = ``;
      
                            return el;
                        },
                        aTargets: [ 0 ]
                    },
                    {
                        mRender: function ( data, type, row ) {
      
                          var el = data+`%`;
      
                            return el;
                        },
                        aTargets: [ 9 ]
                    },
                    {
                        mRender: function ( data, type, row ) {
      
                          var el = data+`%`;
      
                            return el;
                        },
                        aTargets: [ 10 ]
                    },
                    {
                        mRender: function ( data, type, row ) {
                            
                          var el = rubah(data);
      
                            return el;
                        },
                        aTargets: [ 3, 4, 5, 6, 7, 8, 9 ]
                    },
                    {
                        mRender: function ( data, type, row ) {
      
                          var el = `<button class="btn btn-info btn-mini"><i class="icofont icofont-edit"></i>Edit</button>`;
      
                            return el;
                        },
                        aTargets: [ 11 ]
                    },
                ],
                "order": [[ 0, 'asc' ]],
                "drawCallback": function ( settings ) {
                    var api = this.api();
                    var rows = api.rows( {page:'current'} ).nodes();
                    var last=null;
                    
                    api.rows({page:'current'} ).data().each( function (data, i ) {
                        let group = data.nama_instansi;
                        let no = data.id_instansi;
                        let total_rev_usd = rubah(data.dipa_rev_total_usd);
                        let total_rev_idr = rubah(data.dipa_rev_total_idr);
                        let total_real_usd = rubah(data.real_total_usd);
                        let total_real_idr = rubah(data.real_total_idr);
                        let total_sisa_usd = data.sisa_total_usd ? rubah(data.sisa_total_usd) : 0;
                        let total_sisa_idr = data.sisa_total_idr ? rubah(data.sisa_total_idr) : 0;
                        let total_persen_usd = Math.round(data.real_total_usd / data.dipa_rev_total_usd * 100);
                        let total_persen_idr = Math.round(data.real_total_idr / data.dipa_rev_total_idr * 100);
                        let td = '<td></td>';
                        if($('#is_open').val() == 1){
                            td = '';
                        }

                        if ( last !== group ) {
                            $(rows).eq( i ).before(
                                `<tr class="group bg-default" >
                                    <td>`+no+`</td>
                                    <td>`+group+`</td>
                                    <td class="text-right" name="total_rev_usd" value=`+total_rev_usd+`>`+total_rev_usd+`</td>
                                    <td class="text-right" name="total_rev_idr" value=`+total_rev_idr+`>`+total_rev_idr+`</td>
                                    <td class="text-right" name="total_real_usd" value=`+total_real_usd+`>`+total_real_usd+`</td>
                                    <td class="text-right" name="total_real_idr" value=`+total_real_idr+`>`+total_real_idr+`</td>
                                    <td class="text-right" name="total_sisa_usd" value=`+total_sisa_usd+`>`+total_sisa_usd+`</td>
                                    <td class="text-right" name="total_sisa_idr" value=`+total_sisa_idr+`>`+total_sisa_idr+`</td>
                                    <td class="text-right">`+total_persen_usd+`%</td>
                                    <td class="text-right">`+total_persen_idr+`%</td>
                                    `+td+`
                                </tr>`
                            );
        
                            last = group;
                        }
                    } );
                },
                fnInitComplete: function () {
                    
                    var that = this;
                    var td ;
                    var tr ;
                    this.$('td').click( function () {
                        td = this;
                    });
                    this.$('tr').click( function () {
                        tr = this;
                    });
                    
                    if($('#is_open').val() == 1){
                        this.api().column(11).visible(true);
                        this.$('tr').each(function() {
                            $(this).find(':last-child').remove();
                        });
                    }

                    let total_rev_usd  = $('[name="total_rev_usd"]');
                    let total_rev_idr  = $('[name="total_rev_idr"]');
                    let total_real_usd = $('[name="total_real_usd"]');
                    let total_real_idr = $('[name="total_real_idr"]');
                    let total_sisa_usd = $('[name="total_sisa_usd"]');
                    let total_sisa_idr = $('[name="total_sisa_idr"]');
                    let rev_usd  = 0;
                    let rev_idr  = 0;
                    let real_usd = 0;
                    let real_idr = 0;
                    let sisa_usd = 0;
                    let sisa_idr = 0;
                    let tdr       = '<td class="text-right"></td>';
                    if($('#is_open').val() == 1){
                        tdr = '';
                    }

                    for (let i = 0; i < total_rev_usd.length; i++) {
                        rev_usd += parseInt($(total_rev_usd[i]).attr('value').replaceAll('.', ''));
                    }
                    for (let i = 0; i < total_rev_idr.length; i++) {
                        rev_idr += parseInt($(total_rev_idr[i]).attr('value').replaceAll('.', ''));
                    }
                    for (let i = 0; i < total_real_usd.length; i++) {
                        real_usd += parseInt($(total_real_usd[i]).attr('value').replaceAll('.', ''));
                    }
                    for (let i = 0; i < total_real_idr.length; i++) {
                        real_idr += parseInt($(total_real_idr[i]).attr('value').replaceAll('.', ''));
                    }
                    for (let i = 0; i < total_sisa_usd.length; i++) {
                        sisa_usd += parseInt($(total_sisa_usd[i]).attr('value').replaceAll('.', ''));
                    }
                    for (let i = 0; i < total_sisa_idr.length; i++) {
                        sisa_idr += parseInt($(total_sisa_idr[i]).attr('value').replaceAll('.', ''));
                    }
                    
                    $('#tfoot').remove();
                    $(this).append(`<tfoot id="tfoot">
                    <tr class="bg-inverse">
                    <td colspan="2"><center>Total</center></td>
                    <td class="text-right">`+rubah(rev_usd)+`</td>
                    <td class="text-right">`+rubah(rev_idr)+`</td>
                    <td class="text-right">`+rubah(real_usd)+`</td>
                    <td class="text-right">`+rubah(real_idr)+`</td>
                    <td class="text-right">`+rubah(sisa_usd)+`</td>
                    <td class="text-right">`+rubah(sisa_idr)+`</td>
                    <td class="text-right">`+Math.round(real_usd/rev_usd*100)+`%</td>
                    <td class="text-right">`+Math.round(real_idr/rev_idr*100)+`%</td>
                    `+tdr+`
                    </tr>
                    </tfoot>`);
                }
            });
        }else{
            var table = $('#all-budget').DataTable();
            table.clear().draw();
            $("#all-budget").find("tfoot").remove();
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
      url: 'saveRealisasi',
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
