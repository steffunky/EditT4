// Write by hand => use CoffeeScript ?
//TODO : Add commentaries
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

      $close_button = this.createCloseButton();
      this.$popupimport = this.createPopup([this.createTitle('Import')], $open_block, $close_button);
      return this.applyCloseButtonEvents($close_button, this.$popupimport);
    };

    // Load data from file
    PopupImport.prototype.load = function(file, $display_block) {
      //TODO : read file 
      console.log(file);
      var fs = require('fs');
      var data = JSON.parse(fs.readFileSync(file));

      //TODO : display content
      //notions :
      console.log('data out :');
      console.log(data);
      var file_notions = data.notions;

      var $body = $('<div></div>');

      // Cell/tooltip display
      var $group = this.createFieldset('Import from ' + file.replace(/^.*[\\\/]/, ''));
      $group.attr('id', 'cell_display');
      
      // Create table

      //for each notion
      for (var i = 0, len = file_notions.length; i < len; i++) {

        notion = file_notions[i];
        var $title = $('<caption></caption>').text(notion['name']);
        var $tr = $('<tr></tr>');
        $tr.append($('<th></th>').text('Cell'));
        var $table = $('<table></table>').addClass('table_notion_display').append([$title, $tr]);

        instances = notion['class_instances'];
        console.log(instances);
        var instance;
        var ci;

        // Create lines

        console.log('instances de j');
        for (var j = 0; j < instances.length; j++) {
          instance = instances[j];
          console.log(instance);
          ci = instance['class_attributes'];
          console.log(ci);
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
