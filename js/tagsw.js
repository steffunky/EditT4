(function() {
  $(function() {


    var win = nw.Window.get();
    win.on('close', function() {
      global.isTagsWindowOpen = false;
      win.close(true);
    });


    while(global.is_ldd != 1){
      ;
    }

    var popupTags = new PopupTags();
    global.popupTags = popupTags;
    global.popupTags.create(global.tagsManager.getTags());
    global.popupTags.show();
    global.popupTags.$popuptags.popup({blur : false});
    global.tagsWis_ldd = 1;
    $(".close_button").hide();
    $(".valid_button").off("click");
    $(".valid_button").on({
      click: ((function(_this) {
        return function() {
          var input_tag, tag, j, len1, ref;
          tags = [];
          console.log(_this);
          ref =   global.popupTags.$popuptags.find('.new_tag_input');
          console.log(ref);
          for (j = 0, len1 = ref.length; j < len1; j++) {
            input_tag = ref[j];
            tags.push($(input_tag).val());
          }
            global.popupTags.$popuptags.trigger('tagsSet', [tags]);
          return false;
        };
      })(this)
    )});

    //popup in original window
    global.dic["add_notion"].click();
    global.popupNotions.close();
    setTimeout(function(){
      global.popupNotions.close();
    }, 100);

  });
}).call(this);
