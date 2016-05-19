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
          $body,                  $left,                  $right;

      $open_block = this.createBlock();
      //$open_block.append($open_button);

      //$right  = this.createBlock('Current project');
      $right = $('<div></div>');
      
      // file selector
      $open_file = this.createInputFile();
      $open_file.on({
        change: (function(_this) {
          return function() {
            //RIGHT : import project
            return _this.displaySave(this.value, $right);
          };
        })(this)
      });
      $open_block.append($open_file);





      //LEFT : Current Project

      $left  = this.createBlock('Current project');
      // Cell/tooltip display
      var $group = $('<div></div>');
      //$group.attr('id', 'cell_display');
      
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

        for(var attribute in notion['class_attributes_model']) {
          $tr = $('<tr></tr>');
          $td = $('<td></td>').append(attribute);
          $tr.append($td);

          $tbody.append($tr);
        }
        $table.append($tbody);
        $group.append($table);
      }
      $left.append($group);






      //body : left = current project | right = import project
      $body = this.createSideBlocks([$left, $right], [6, 6]);

      //HEAD : title + file selector
      $header = $('<div></div>');
      $title = this.createTitle('Import');
      $header.append($title);

      $header.append($open_block);

      // Menu (validate, close...)
      $create_button = this.createButton('Save', true);
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

      this.$popupimport = this.createPopup([$header], [$body], [$menu], 'import');
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
    PopupImport.prototype.displaySave = function(file, $display_block) {

      var fs = require('fs');
      var data = JSON.parse(fs.readFileSync(file));

      //notions :
      var notions = data.notions;

      //var $body = $('<div></div>').addClass('modal-body');
      var $body = this.createBlock(file.replace(/^.*[\\\/]/, ''));

      // Cell/tooltip display
      var $group = $('<div></div>');
/*      var $group = this.createFieldset('Import from ' + file.replace(/^.*[\\\/]/, ''));
      $group.attr('id', 'cell_display');*/
      
      // Create table

      //for each notion
      for (var i = 0, len = notions.length; i < len; i++) {
        notion = notions[i];

        var $table = $('<table></table>').addClass('table table-condensed import_table_import');
        var $tr = $('<tr></tr>');
        var $th;
        var $thead = $('<thead></thead>');
        var $tbody = $('<tbody></tbody>');

        var $title = notion['name'];
        //1rst col : notion's name
        $th = $('<th></th>').append($title);
        $tr.append($th);
        //2nd col  : dropdown
        $th = $('<th></th>').append($('<select><option>[current_notions]</option><option>new</option></select>'));
        $tr.append($th);

        $thead.append($tr);
        $table.append($thead);

        // Create lines

        console.log(notion);

        //1) attributes
        for(var attribute in notion['class_attributes_model']) {

          $tr = $('<tr></tr>');
          //1rst col : item's name
          $td = $('<td></td>').append(attribute);
          $tr.append($td);
          //2nd col  : dropdown
          $td = $('<td></td>').append($('<select><option>[current_attributes]</option><option>new</option></select>'));
          $tr.append($td);                  

          //$table.append($tr);
          $tbody.append($tr);
          //$table.append($tbody);
        }

        //2) instances

        instances = notion['class_instances'];
        var instance;
        var ci;

        for (var j = 0; j < instances.length; j++) {
          instance = instances[j];
          ci = instance['class_attributes'];
          display = instances[ci];
          $tr = $('<tr></tr>');
          key = 'cell';
          $label = ci['name'];
          //checkbox
          $input = this.createCheckbox('', j, null);
          //1rst col : item's name
          $td = $('<td></td>').append([$input,ci['name']]);
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
