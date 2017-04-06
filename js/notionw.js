(function() {
  $(function() {
    console.log("yo");
    $("body").addClass('dropper');

    var popupNotions = new PopupNotions();
    popupNotions.create();
    popupNotions.show();

    $(".close_button").hide();
    $(".valid_button").off("click");
    $(".valid_button").on({
      click: (function(_this) {
        return function() {
          console.log("hihi");
          console.log(popupNotions.notions);
          console.log("allo");
          global.dic["pn"].$popupnotions.trigger('notionsCreated', [popupNotions.notions]);
          global.dic["pn"].close();
          return false;
        };
      })(this)
    });
  global.dic["add_notion"].click();
  //global.dic["pn"].$popupnotions.popup('hide');
  //global.dic["pn"].$popupnotions.empty();
  //console.log(global.dic["pn"].$popupnotions.find(".close_button"));
  console.log(global.dic["nf"]);

  global.dic["pn"].close();
  //global.dic["cb"].click();
  //global.dic["pn"].hide();
  console.log(global.dic["nf"]);
  //global.dic["facto"](global.dic["nf"]);
  //global.dic["pn"].close();
  });
}).call(this);
