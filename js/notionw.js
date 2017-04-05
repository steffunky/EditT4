(function() {
  $(function() {
    console.log("yo");
    $("body").addClass('dropper');
  /*$("body").addEventListener('drop', function(e) {

    e.preventDefault(); // Cette méthode est toujours nécessaire pour éviter une éventuelle redirection inattendue

    alert('Vous avez bien déposé votre élément !');

});
    $("body").droppable({
                tolerance: 'touch',
                            accept: '#dragCourse',
                            activeClass: 'ui-state-hover',
                              hoverClass: 'ui-state-active',
                              drop: function( event, ui ) {
                                $( this ).append("<p>").html(event);
                        }
                    });*/
    popupNotions = new PopupNotions();
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
          return false;
        };
      })(this)
    });
  });
  global.dic["add_notion"].click();
  //global.dic["pn"].$popupnotions.popup('hide');
  //global.dic["pn"].$popupnotions.empty();
  console.log(global.dic["pn"].$popupnotions.find(".close_button"));
  global.dic["pn"].$popupnotions.find(".close_button").click();

  //global.dic["pn"].hide();
  console.log(global.dic["nf"]);
  //global.dic["facto"](global.dic["nf"]);
}).call(this);
