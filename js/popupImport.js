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
      $create_button = this.createButton('Confirm', true).attr('id', 'confirm_button');
      $menu.prepend($create_button);

      this.$popupimport = this.createPopup([$header], [$body, $divider], [$menu], 'import');
      this.applyCloseButtonEvents($close_button, this.$popupimport);

      this.$popupimport.css({
        'min-width': '800px'
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
      var notions = data.notions;

      var $body = this.createBlock('Import from : ' + file.replace(/^.*[\\\/]/, ''));

      // Cell/tooltip display
      var $group = $('<div></div>');
      
      //TODO : TEST instance details
      var tab_instance = [];

      // Create table

      //for each notion
      for (var i = 0, len = notions.length; i < len; i++) {
        var notion = notions[i];

        var $table = $('<table></table>').attr('id', notion['name']).addClass('table table-condensed import_table_import');
        var $thead = $('<thead></thead>');
        var $tbody = $('<tbody></tbody>');

        var tab_instance2 = [];
        
        //1st col : notion's name
        var $th = $('<th></th>').append(notion['name']);
        var $tr = $('<tr></tr>').attr('id', notion['name']).append($th);
        
        //2nd col : dropdown
        $select_notion = $('<select></select>').addClass('import_dropdown');
        // basic options
        $select_notion.append($('<option></option>').append('New notion'));
        $select_notion.append($('<option></option>').append('Ignore notion'));
        // merge options
        for(var j = 0; j < current_notions.length; ++j) {
          $select_notion.append($('<option></option>').append('Merge with ' + current_notions[j]['name']));
        }

        $th = $('<th></th>').addClass('import_dropdown_align').append($select_notion);
        $tr.append($th);

        $thead.append($tr);
        $table.append($thead);

        // Create lines

        var select_array = [];

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
          $select_att = $('<select></select>').addClass('import_dropdown');
          $select_att.append($('<option></option>').append("New attribute"));
          $select_att.append($('<option></option>').append("Ignore attribute"));
          select_array.push($select_att);
          
          $td = $('<td></td>').addClass('import_items_td').append($select_att);
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
          //TODO : faire la différence class / instance attributes pour les options du merge.
          $select_att = $('<select></select>').addClass('import_dropdown');
          $select_att.append($('<option></option>').append("New attribute"));
          $select_att.append($('<option></option>').append("Ignore attribute"));
          select_array.push($select_att);

          $td = $('<td></td>').addClass('import_items_td').append($select_att);
          $tr.append($td);
          $tbody.append($tr);
        }

        //Dynamic changes the dropdowns values.
        //TODO : move it to a function ?
        //TODO : empecher de merger 2 fois sur le meme attribut
        //TODO : empecher d'ignorer name ? (attribut obligatoire ?)
        $select_notion.on({
          change: (function(array) {
            return function() {
              for(var key in array) {
                array[key].options = function(mode) {
                  //clear previous values
                    array[key].html([]);
                  if (mode == "New notion") {
                    //basic options
                    array[key].append($('<option></option>').append("New attribute"));
                    array[key].append($('<option></option>').append("Ignore attribute"));
                  }
                  else if (mode == "Ignore notion") {
                    array[key].append($('<option></option>').append("Ignore attribute"));
                  }
                  else if (mode.substring(0, 5) == "Merge") {
                    //basic options
                    array[key].append($('<option></option>').append("New attribute"));
                    array[key].append($('<option></option>').append("Ignore attribute"));
                    //merge options
                    var substr = mode.replace("Merge with ", "");
                    for(var j = 0; j < current_notions.length; ++j) {
                      var current_notion = current_notions[j];
                      if(current_notion['name'] == substr) {
                        for(var attribute in current_notion['class_attributes_model']) {
                          array[key].append($('<option></option>').append('Merge with ' + attribute));
                        }
                        break;
                      }
                    }
                  }
                }(this.value)
              }
            };
          })(select_array)
        });

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

      // Menu (validate, close...) //TODO : move it to a function ?
      $create_button = this.createButton('Confirm', true);
      $create_button.attr('id', 'confirm_button');
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

              //Ignore notion if asked , otherwise set import_mode
              import_mode = $(ref_tr[0]).find('select').val();
              if(import_mode == "Ignore notion") {
                continue;
              }

              //TODO : perte des value1/value2/etc.. à régler

              //pour chaque attribut
              for (l = 1; l < ref_tr.length; l++) {
                var category;
                $tr = $(ref_tr[l]);
                //1) Dropdowns = Attributs
                if($tr.find('select').val() != null) {
                  $select = $tr.find('select');
                  if(category == "Class attributes") {
                    import_class_attributes[$tr.attr('id')] = $select.val();
                  } else if (category == "Instance attributes") {
                    import_instance_attributes[$tr.attr('id')] = $select.val();
                  }
                } 
                //2) Checkbox = Instances
                else if ($tr.find('input').prop('checked') != null) {
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
              //retrieve model from original imported notion (TODO : better way to do this)
              for (var i = 0, len = notions.length; i < len; i++) {
                var notion = notions[i];
                if (notion["name"] == $notion.attr('id')) {
                  //take out attributes that user wants to ignore
                  array["class_attributes_model"] = [];
                  for(var key in notion["class_attributes_model"]) {
                    if(import_class_attributes[key] != "Ignore attribute") {
                      array["class_attributes_model"][key] = notion['class_attributes_model'][key];
                    } else {
                      //update all instances (remove attribute for each)
                      for(var instance in import_instances) {
                        delete import_instances[instance][key];
                      }
                    }
                  }
                  array["instance_attributes_model"] = [];
                  for(var key in notion["instance_attributes_model"]) {
                    if(import_instance_attributes[key] != "Ignore attribute") {
                      array["instance_attributes_model"][key] = notion['instance_attributes_model'][key];
                    } else {
                      //update all instances (remove attribute for each)
                      for(var instance in import_instances) {
                        delete import_instances[instance][key];
                      }
                    }
                  }
                }
              }
              array["class_attributes_modes"] = import_class_attributes;
              array["instance_attributes_modes"] = import_instance_attributes;              
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
      //TODO : delete multiple confirm (better way do this ?)
      var test = document.getElementById("confirm_button");
      test.parentNode.removeChild(test);
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
