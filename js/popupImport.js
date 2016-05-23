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
            return _this.displaySave(this.value, notions, $right);
          };
        })(this)
      });
      $open_block.append('<br>');//TODO : TEST
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

        //1) attributes
        //a) desc
        $td = $('<td></td>').addClass('import_descs').append('Attributes');
        $tr = $('<tr></tr>').append($td);
        $tbody.append($tr);
        //b) items
        for(var attribute in notion['class_attributes_model']) {
          $td = $('<td></td>').addClass('import_items_td').append(attribute);
          $tr = $('<tr></tr>').addClass('import_items_th').append($td);
          $tbody.append($tr);
        }

        //2) instances
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
      //TODO : test divider
      $divider = $('<div></div>').addClass('import_divider');

      //HEAD : title + file selector
      $header = $('<div></div>');
      $title = this.createTitle('Import');
      $header.append($title);
      $header = this.createSideBlocks([$title, $open_block], [6, 6]);
      //$header.append($open_file);

      //$header.append($open_block);

      // Menu (validate, close...)
      $create_button = this.createButton('Confirm', true);
      $create_button.on({
        click: (function(_this) {
          return function() {
            _this.$popupimport.trigger('importSet', null);
            return _this.close();
          };
        })(this)
      });
      $close_button = this.createCloseButton();
      $menu = $('<div></div>').append([$create_button, $close_button]);

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
    PopupImport.prototype.displaySave = function(file, current_notions, $display_block) {

      var fs = require('fs');
      var data = JSON.parse(fs.readFileSync(file));

      //notions :
      var notions = data.notions;

      var $body = this.createBlock('Import from : ' + file.replace(/^.*[\\\/]/, ''));

      // Cell/tooltip display
      var $group = $('<div></div>');
      
      // Create table

      //for each notion
      for (var i = 0, len = notions.length; i < len; i++) {
        notion = notions[i];

        var $table = $('<table></table>').addClass('table table-condensed import_table_import');
        var $tr = $('<tr></tr>');
        var $th;
        var $thead = $('<tbody></tbody>');
        var $tbody = $('<tbody></tbody>');
        var $title = notion['name'];
        
        //1st col : notion's name
        $th = $('<th></th>').append($title);
        $tr.append($th);
        
        //2nd col : dropdown
        $select = $('<select></select>').addClass('import_dropdown');
        // 1) "new" option
        $option = $('<option></option>').append('New notion');
        $select.append($option);
        // 2) current notions
        for(var j = 0; j < current_notions.length; ++j) {
          current_notion = current_notions[j];
          $option = $('<option></option>').append(current_notion['name']);
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

        //1) attributes
        //a) desc
        $td = $('<td></td>').addClass('import_descs').append('Attributes');
        $tr = $('<tr></tr>').append($td);
        $tr.append('<td></td>');//TODO : empty, just to fit table size (2 columns)
        $tbody.append($tr);
        //b) items
        for(var attribute in notion['class_attributes_model']) {
          //1st col : item's name
          $td = $('<td></td>').addClass('import_items_td').append(attribute);
          $tr = $('<tr></tr>').addClass('import_items_th').append($td);
          //2nd col : dropdown
          $select = $('<select></select>').addClass('import_dropdown');
          // 1) "new" option
          $option = $('<option></option>').append('New attribute');
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

        //2) instances
        //a) desc
        $td = $('<td></td>').addClass('import_descs').append('Instances');
        $tr = $('<tr></tr>').append($td); 
        $tr.append('<td></td>');//TODO : empty, just to fit table size (2 columns)
        $tbody.append($tr);
        //b) items
        instances = notion['class_instances'];
        var instance;
        var ci;
        for (var j = 0; j < instances.length; j++) {
          instance = instances[j];
          ci = instance['class_attributes'];
          $input = this.createCheckbox('', j, null);
          $td = $('<td></td>').addClass('import_items_td').append(ci['name']);
          $tr = $('<tr></tr>').addClass('import_items_th').append($td);
          $td = $('<td></td>').addClass('import_items_td').append($input);
          $tr.append($td);
          $tbody.append($tr);
        }
        $table.append($tbody);
        $group.append($table);
      }
      $body.append($group);
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
