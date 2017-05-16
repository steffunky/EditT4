(function() {
  $(function() {
    $("body").addClass('dropper');
    while(global.is_ldd != 1){
      ;
    }
    var popupNotions = new PopupNotions();
    popupNotions.create();
    popupNotions.show();

    $(".close_button").hide();
    $(".valid_button").off("click");
    $(".valid_button").on({
      click: (function(_this) {
        return function() {

          global.popupNotions.$popupnotions.trigger('notionsCreated', [popupNotions.notions]);
          global.popupNotions.close();
          return false;
        };
      })(this)
    });

    //popup in original window
    global.dic["add_notion"].click();
    setTimeout(function(){
      global.popupNotions.close();
    }, 100);
  });
}).call(this);
