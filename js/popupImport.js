(function() {
  var extend = function(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key))
        child[key] = parent[key];
    } function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  },
  hasProp = {}.hasOwnProperty;

  window.PopupImport = (function(superClass) {
    extend(PopupImport, superClass);

    function PopupImport() {
      this.$popupimport = null;
    }

    PopupImport.prototype.create = function(notions) {
      var $close_button,          $create_notions_block,  $create_notions_button,
          $open_block,            $open_button,           $header,
          $body,                  $left,                  $right,
          $divider;

      $open_block = this.createBlock();

      $right = $('<div></div>');
      
      // file selector
      $open_file = this.createInputFile();
      $open_file.on({
        change: (function(_this) {
          return function() {
            //RIGHT : import project
            $right.empty();
            _this.displaySave(this.value, notions, $right, $menu);
          };
        })(this)
      });
      $open_block.append('<br>');
      $open_block.append($open_file);

      //LEFT : Current Project

      $left = this.createBlock('Current project');
      // Cell/tooltip display
      var $group = $('<div></div>');
      
      // Create table

      //for each notion
      for (var i = 0, len = notions.length; i < len; i++) {
        notion = notions[i];

        var $table = $('<table></table>').addClass('table table-condensed import_table_current');
        var $tr = $('<tr></tr>');
        var $th;
        var $thead = $('<thead></thead>');
        var $tbody = $('<tbody></tbody>');

        var $title = notion['name'];
        //1rst col : notion's name
        $th = $('<th></th>').addClass('table_import_align').append($title);
        $tr.append($th);

        $thead.append($tr);
        $table.append($thead);
/*
        console.log(notion);*/

        //1) class attributes
        //a) desc
        $td = $('<td></td>').addClass('import_descs').append('Class attributes');
        $tr = $('<tr></tr>').append($td);
        $tbody.append($tr);
        //b) items
        for(var attribute in notion['class_attributes_model']) {
          $td = $('<td></td>').addClass('import_items_td').append(attribute);
          $tr = $('<tr></tr>').addClass('import_items_th').append($td);
          $tbody.append($tr);
        }

        //1) instance attributes
        //a) desc
        $td = $('<td></td>').addClass('import_descs').append('Instance attributes');
        $tr = $('<tr></tr>').append($td);
        $tbody.append($tr);
        //b) items
        for(var attribute in notion['instance_attributes_model']) {
          $td = $('<td></td>').addClass('import_items_td').append(attribute);
          $tr = $('<tr></tr>').addClass('import_items_th').append($td);
          $tbody.append($tr);
        }

        //3) instances
        //a) desc
        $td = $('<td></td>').addClass('import_descs').append('Instances');
        $tr = $('<tr></tr>').append($td); 
        $tbody.append($tr);
        //b) items
        instances = notion['class_instances'];
        for (var j = 0; j < instances.length; j++) {
          instance = instances[j];
          ci = instance['class_attributes'];
          $td = $('<td></td>').addClass('import_items_td').append(ci['name']);
          $tr = $('<tr></tr>').addClass('import_items_th').append($td); 
          $tbody.append($tr);
        }

        $table.append($tbody);
        $group.append($table);
      }
      $left.append($group);

      //body : left = current project | right = import project
      $body = this.createSideBlocks([$left, $right], [6, 6]);

      $divider = $('<div></div>').addClass('import_divider');

      //HEAD : title + file selector
      $header = $('<div></div>');
      $title = this.createTitle('Import');
      $header.append($title);
      $header = this.createSideBlocks([$title, $open_block], [6, 6]);

      $close_button = this.createCloseButton();
      $menu = $('<div></div>').append($close_button);

      this.$popupimport = this.createPopup([$header], [$body, $divider], [$menu], 'import');
      this.applyCloseButtonEvents($close_button, this.$popupimport);

      this.$popupimport.css({
        'min-width': '800px'/*,
        'max-width': '1200px'*/
      });

      return this.$popupimport.on({
        close: (function(_this) {
          return function() {
            return _this.$popupimport.empty();
          };
        })(this)
      });
    };

    // Load data from file
    PopupImport.prototype.displaySave = function(file, current_notions, $display_block, $menu) {

      var fs = require('fs');
      var data = JSON.parse(fs.readFileSync(file));
/*
      console.log("data = ");
      console.log(data);*/

      //notions :
      var notions = data.notions;

      var $body = this.createBlock('Import from : ' + file.replace(/^.*[\\\/]/, ''));

      // Cell/tooltip display
      var $group = $('<div></div>');
      
      //TODO : TEST instance details
      var tab_instance = [];

      // Create table

      //for each notion
      for (var i = 0, len = notions.length; i < len; i++) {
        notion = notions[i];

        var $table = $('<table></table>').attr('id', notion['name']).addClass('table table-condensed import_table_import');
        var $tr = $('<tr></tr>');
        var $th;
        var $thead = $('<thead></thead>');
        var $tbody = $('<tbody></tbody>');
        var tab_instance2 = [];
        
        //1st col : notion's name
        $th = $('<th></th>').append(notion['name']);
        $tr.append($th);
        
        //2nd col : dropdown
        $select = $('<select></select>').addClass('import_dropdown');
        // 1) "new" option
        $option = $('<option></option>').append('New notion');
        $select.append($option);
        // 2) "ignore" option
        $option = $('<option></option>').append('Ignore notion');
        $select.append($option);
        // 3) current notions
        for(var j = 0; j < current_notions.length; ++j) {
          current_notion = current_notions[j];
          $option = $('<option></option>').append('Merge with ' + current_notion['name']);
          $select.append($option);
        }
        //TODO : listener onchange (update dropdown items)
        $select.change(function() {
          console.log('select='+i);
        });

        $th = $('<th></th>').addClass('import_dropdown_align').append($select);
        $tr.append($th);

        $thead.append($tr);
        $table.append($thead);

        // Create lines

        //1) class attributes
        //a) desc
        $td = $('<td></td>').addClass('import_descs').append('Class attributes');
        $tr = $('<tr></tr>').attr('id', 'Class attributes').append($td);
        $tr.append('<td></td>');//TODO : improve ? empty td, just to fit table size (2 columns)
        $tbody.append($tr);
        //b) items
        for(var attribute in notion['class_attributes_model']) {
          //1st col : item's name
          $td = $('<td></td>').addClass('import_items_td').append(attribute);
          $tr = $('<tr></tr>').addClass('import_items_th').attr('id', attribute).append($td);
          //2nd col : dropdown
          $select = $('<select></select>').addClass('import_dropdown');
          // 1) "new" option
          $option = $('<option></option>').append('New attribute');
          $select.append($option);
          // 2) "ignore" option
          $option = $('<option></option>').append('Ignore attribute');
          $select.append($option);
          // 2) current notions
          for(var attribute in current_notions[0]['class_attributes_model']) {
            $option = $('<option></option>').append('Merge with ' + attribute);
            $select.append($option);
          }          

          $td = $('<td></td>').addClass('import_items_td').append($select);
          $tr.append($td);          

          $tbody.append($tr);
        }

        //2) instance attributes
        //a) desc
        $td = $('<td></td>').addClass('import_descs').append('Instance attributes');
        $tr = $('<tr></tr>').attr('id', 'Instance attributes').append($td);
        $tr.append('<td></td>');//TODO : improve ? empty td, just to fit table size (2 columns)
        $tbody.append($tr);
        //b) items
        for(var attribute in notion['instance_attributes_model']) {
          //1st col : item's name
          $td = $('<td></td>').addClass('import_items_td').append(attribute);
          $tr = $('<tr></tr>').addClass('import_items_th').attr('id', attribute).append($td);
          //2nd col : dropdown
          $select = $('<select></select>').addClass('import_dropdown');
          // 1) "new" option
          $option = $('<option></option>').append('New attribute');
          $select.append($option);
          // 2) "ignore" option
          $option = $('<option></option>').append('Ignore attribute');
          $select.append($option);
          // 2) current notions
          for(var attribute in current_notions[0]['instance_attributes_model']) {
            $option = $('<option></option>').append('Merge with ' + attribute);
            $select.append($option);
          }          

          $td = $('<td></td>').addClass('import_items_td').append($select);
          $tr.append($td);

          $tbody.append($tr);
        }

        //3) instances
        //a) desc
        $td = $('<td></td>').addClass('import_descs').append('Instances');
        $tr = $('<tr></tr>').append($td); 
        $tr.append('<td></td>');//TODO : empty, just to fit table size (2 columns)
        $tbody.append($tr);
        //b) items
        instances = notion['class_instances'];
        for (var j = 0; j < instances.length; j++) {
          var instance = instances[j];
          var ca = instance['class_attributes'];
          $tr = $('<tr></tr>').addClass('import_items_th').attr('id', ca['name']);
          $input = this.createCheckbox('', j, null);
          $td = $('<td></td>').addClass('import_items_td').append(ca['name']);
          $tr.append($td);
          $td = $('<td></td>').addClass('import_items_td').append($input);
          $tr.append($td);
          $tbody.append($tr);
          //TODO : TEST instance details
          tab_instance2[ca['name']] = ca;
        }
        $table.append($tbody);
        $group.append($table);

        tab_instance[notion['name']] = tab_instance2;
      }
      $body.append($group);

      //TODO : Confirm button

      // Menu (validate, close...)
      $create_button = this.createButton('Confirm', true);
      $create_button.on({
        click: (function(_this) {
          return function() {
            //TODO : complete
            import_notions = [];
            ref_body = $body.find('.import_table_import');
            
            //pour chaque notion
            for (var k = 0; k < ref_body.length; k++) {
              var notion = ref_body[k];
              var $notion = $(notion);

              var import_mode;
              var import_class_attributes = [];
              var import_instance_attributes = [];
              var import_instances = [];


              ref_tr = $notion.find('tr');

              //pour chaque ligne
              for (l = 0; l < ref_tr.length; l++) {
                var category;
                $tr = $(ref_tr[l]);
                
                if($tr.find('select').val() != null) {
                  //Attributes
                  $select = $tr.find('select');
                  if($tr.attr('id') == null) {
                    import_mode = $select.val();
                  } else {
                    if(category == "Class attributes") {
                      import_class_attributes[$tr.attr('id')] = "";//$select.val();
                    } else if (category == "Instance attributes") {
                      import_instance_attributes[$tr.attr('id')] = "";//$select.val();
                    }                    
                  }
                } else if ($tr.find('input').prop('checked') != null) {
                  //Instances
                  $input = $tr.find('input');
                  if($input.prop('checked') == true) {
                    //TODO : whole instance not just name
                    import_instances.push(tab_instance[$notion.attr('id')][$tr.attr('id')]);
                  }
                } else {
                  //goes here for descriptive tr ("attributes :", "instances :")
                  category = $tr.attr('id');
                }
              }
              var array = [];
              array["mode"] = import_mode;
              array["class_attributes"] = import_class_attributes;
              array["instance_attributes"] = import_instance_attributes;
              array["instances"] = import_instances;
              import_notions[$notion.attr('id')] = array;
            }
            console.log("import_notions =");
            console.log(import_notions);
            _this.$popupimport.trigger('importSet', [import_notions]);
            return _this.close();
          };
        })(this)
      });
      $menu.prepend($create_button);

      return $display_block.append($body);
    };

    // Show the popup
    PopupImport.prototype.show = function() {
      return this.$popupimport.popup('show');
    };

    // Hide the popup
    PopupImport.prototype.close = function() {
      return this.$popupimport.popup('hide');
    };

    // Return the popup new
    PopupImport.prototype.getNode = function() {
      return this.$popupimport;
    };

    return PopupImport;

  })(Popup);

}).call(this);
