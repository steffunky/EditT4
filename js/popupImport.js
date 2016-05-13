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

    PopupImport.prototype.create = function() {
      var $close_button,          $create_notions_block,
          $create_notions_button, $open_block, $open_button,
          $display_block;

      $display_block  = this.createBlock();

      $open_block = this.createBlock();
      $open_block.append($open_button);
      
      // file selector
      $open_file = this.createInputFile();
      $open_file.on({
        change: (function(_this) {
          return function() {            
            return _this.load(this.value, $display_block);
          };
        })(this)
      });
      $open_block.append($open_file);
      $open_block.append($display_block);

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

      this.$popupimport = this.createPopup([this.createTitle('Import')], $open_block, [$menu], 'import');
      return this.applyCloseButtonEvents($close_button, this.$popupimport);
    };

    // Load data from file
    PopupImport.prototype.load = function(file, $display_block) {

      var fs = require('fs');
      var data = JSON.parse(fs.readFileSync(file));

      //notions :
      var notions = data.notions;

      var $body = $('<div></div>').addClass('modal-body');

      // Cell/tooltip display
      var $group = this.createFieldset('Import from ' + file.replace(/^.*[\\\/]/, ''));
      $group.attr('id', 'cell_display');
      
      // Create table

      //for each notion
      for (var i = 0, len = notions.length; i < len; i++) {

        notion = notions[i];
        var $title = $('<caption></caption>').text(notion['name']);
        $input = this.createCheckbox('', i, null);
        $title.prepend($input);
        var $tr = $('<tr></tr>');
        var $table = $('<table></table>').addClass('table_notion_display').append([$title, $tr]);

        instances = notion['class_instances'];
        var instance;
        var ci;

        // Create lines
        for (var j = 0; j < instances.length; j++) {
          
          instance = instances[j];
          ci = instance['class_attributes'];
          display = instances[ci];
          $tr = $('<tr></tr>');
          key = 'cell';
          $label = $('<label></label>').addClass('label_display').text(ci['name']);
          $input = this.createCheckbox('', j, null);
          $label.prepend($input);
          $td = $('<td></td>').append($label);
          $tr.append($td);

          $table.append($tr);
        }
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
