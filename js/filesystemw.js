(function() {
  $(function() {


    var win = nw.Window.get();
    win.on('close', function() {
      global.isNotionWindowOpen = false;
      win.close(true);
    });
    while(global.is_ldd != 1){
      ;
    }
    var $mainDiv = $("#fs-container");
    var $img_folder = $("<img></img>").attr('src','image/folder.svg');
    var $img_comp = $("<img></img>").attr('src','image/com.png');
    var tabFolder = [{'node' : null, 'div': null, 'class' : "Notion", 'objects' : []},
                {'node' : null, 'div' : null,'class': "Tag", 'objects' : []},
                {'node' : null, 'div' : null, 'class' : "Filter",'objects' : [] }];

    //Objects[] could be Objects{object : , object_name}..
    var addComponent = function(node, node_name, type){
     for(var i = 0; i < tabFolder.length; ++i){
        if(type == tabFolder[i]['class']){
          var $caption = $("<figcaption></figcaption>").html(node_name);
          var $node = $("<figure></figure>").attr('class',"fs-component");
          $node.append($img_comp.clone());
          $node.append($caption);
          $("#fs-div-"+type).append( $("<div></div>").attr("id","fs-comp-" + node_name).attr("class","fs-div-component").append($node));
        }
      }
    };
    for(var i = 0; i < 3; ++i){
      var $caption = $("<figcaption></figcaption>").html(tabFolder[i]['class'] + "s");
      var $node = $("<figure></figure>").attr('class',"fs-folder");
      $node.append($img_folder.clone());
      $node.append($caption);
      tabFolder[i]['node'] = $node;
      $mainDiv.append($node);
      for(var j = 0; j < tabFolder[i]['objects'].length; ++j){
        addComponent(tabFolder[i]['objects'][j],tabFolder[i]['objects'][j],tabFolder[i]['class']);
        console.log(j);
      }
      tabFolder[i]['div'] = $("<div></div>").attr('id',"fs-div-" + tabFolder[i]['class']).css('display','none')

      $('body').append(tabFolder[i]['div']);
    }

     var populateNodes = function(node, type){
      for(var i = 0; i < tabFolder.length; ++i){
         if(type == tabFolder[i]['class']){
          var $node = $("<figure></figure>").attr('class',"fs-folder");
          $mainDiv.append($img);
          $mainDiv.append($node);
          $('body').append( $("<div></div>").attr('id',"fs-div-" + type).attr('display','none'))

        }
      }
    };
    addComponent("toto","toto","Notion");
    addComponent("toto","totoss","Notion");

    $(".fs-folder").on({
      click : function(){
        for(var i = 0; i < tabFolder.length;++i){
          console.log(this);
          console.log(tabFolder[i]['node'][0] );
          if(JSON.stringify(tabFolder[i]['node'][0]) == JSON.stringify(this)){
            $mainDiv.fadeOut(function(){
              tabFolder[i]['div'].fadeIn();
            });
            break;
          }
        }
      }
    })

    console.log("hello");
  });
}).call(this);
