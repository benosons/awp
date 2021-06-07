"use strict";
console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $('.main-menu').find('.active').removeClass("active");
  $('.main-menu').find('.pcoded-trigger').removeClass("pcoded-trigger");
  $('#menu_komponen').addClass('active');
  $('#menu_data_parent').addClass('pcoded-trigger');

  $('#all-komponen').DataTable();
  $('.user-tambah').hide();

  loaddata('data_komponen');

  $('#save-komponen').on('click', function(){
      let param = 'data_komponen';
      let komponen_ke = $('#komponen_ke').val();
      let nama_komponen = $('#nama_komponen').val();

      var formData = new FormData();
      formData.append('param', param);
      formData.append('komponen_ke', komponen_ke);
      formData.append('nama_komponen', nama_komponen);
      save(formData);

  });

});

function loaddata(param){

  $.ajax({
      type: 'post',
      dataType: 'json',
      url: 'loaddata',
      data : {
              param      : param,
      },
      success: function(result){
          let data = result.data;
          var dt = $('#all-komponen').DataTable({
            destroy: true,
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: false,
            pageLength: 10,
            aaData: result.data,
            aoColumns: [
                { 'mDataProp': 'komponen_ke'},
                { 'mDataProp': 'nama_komponen'},
                { 'mDataProp': 'id'},
            ],
            order: [[0, 'asc']],
            fixedColumns: true,
            aoColumnDefs:[
              { width: 50, targets: 0 },
              {
                  mRender: function ( data, type, row ) {

                    var el = `<center>`+data+`</center>`;

                      return el;
                  },
                  aTargets: [ 0 ]
              },
              {
                  mRender: function ( data, type, row ) {

                    var el = `<button class="btn btn-danger btn-sm" onclick="action('delete','`+row.id+`','')" ><i class="icofont icofont icofont-trash"></i>Hapus</button>`;

                      return el;
                  },
                  aTargets: [ 2 ]
              },
            ],
            // fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
            //     var index = iDisplayIndexFull + 1;
            //     $('td:eq(0)', nRow).html('#'+index);
            //     return  index;
            // },
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
            }
        });

        }
      })
    }

function onusers(type){
    $('.page-list > li').removeClass('active');
    if(type == 'input'){
      $('.user-tambah').show();
      $('.user-list').hide();
      $('#save-user').show();
      $('#tambah-user').hide();
    }else if(type == 'list'){
      loadusers('');
      $('#list-user').addClass('active');
      $('.user-tambah').hide();
      $('.user-list').show();
      $('#save-user').hide();
      $('#tambah-user').show();
    }
};

function save(formData){

  $.ajax({
      type: 'post',
      processData: false,
      contentType: false,
      url: 'addData',
      data : formData,
      success: function(result){
        Swal.fire({
          type: 'success',
          title: 'Success add User !',
          showConfirmButton: true,
          // showCancelButton: true,
          confirmButtonText: `Ok`,
        }).then((result) => {
          location.reload();
        })
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
    formData.append('table', 'data_komponen');
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
