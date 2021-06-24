"use strict"
$(document).ready(function(){

  $('.pcoded-navbar').attr("pcoded-navbar-position", 'fixed' );
  $('.pcoded-header .pcoded-left-header').attr("pcoded-lheader-position", 'fixed' );

  $('.pcoded-header').attr("pcoded-header-position", 'fixed' );
  $('.pcoded-navbar').attr("pcoded-header-position", 'fixed' );
  $('.pcoded-main-container').css('margin-top', $(".pcoded-header").outerHeight());

  $('.pcoded-navbar .pcoded-hasmenu').attr('dropdown-icon', 'style1');
  $('.pcoded-navbar .pcoded-hasmenu').attr('subitem-icon', 'style1');

  $('.pcoded-header').attr("header-theme", 'theme6');
  $('.pcoded-navbar').attr("navbar-theme", 'theme6');
  $('.pcoded-navbar').attr("active-item-theme", 'theme4');

  $(".js-example-basic-single").select2();

  $(".js-example-basic-single-modal").select2({
    dropdownParent: $("[name='in-modal']")
  });

  if($('#is_open').val() == 1){
    $('.pcoded-navbar').css('display', 'none');
    $('#pcoded').attr('vertical-nav-type', 'collapsed');
    $('.pcoded-header').css('display', 'none');
  }

});
