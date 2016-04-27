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
          $create_notions_button, $open_block, $open_button;

      $open_block = this.createBlock();
      $open_block.append($open_button);
      
      // file selector
      $open_file = this.createInputFile();
      $open_file.on({
        change: (function(_this) {
          return function() {
            return _this.load(this.value, $open_block);
          };
        })(this)
      });
      $open_block.append($open_file);

      $close_button = this.createCloseButton();
      this.$popupimport = this.createPopup([this.createTitle('Import')], $open_block, $close_button);
      return this.applyCloseButtonEvents($close_button, this.$popupimport);
    };

    // Load data from file
    PopupImport.prototype.load = function(file, $open_block) {
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
      var $group = this.createFieldset('Cell display');
      $group.attr('id', 'cell_display');
      
      // Create table

      //for each notion
      for (var i = 0, len = file_notions.length; i < len; i++) {

        notion = file_notions[i];
        var $title = $('<caption></caption>').text(notion['name']);
        var $tr = $('<tr></tr>');
        $tr.append([$('<th></th>').text('Cell'), $('<th></th>').text('Tooltip')]);
        var $table = $('<table></table>').addClass('table_notion_display').append([$title, $tr]);

        var instances = notion['class_instances'];
        var instance;
        for (var j = 0, lenb = instances.length; j < lenb; j++) {
          instance = instances[j];
          console.log(instance);
        }
/*
        ref = notion.getClassAttributesModel();
        
        // Create lines
        for (attribute in ref) {
          display = ref[attribute];
          $tr = $('<tr></tr>');
          ref1 = ['cell', 'tooltip'];
          z
          // Create cells
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            key = ref1[j];
            $label = $('<label></label>').addClass('label_display').text(attribute);
            $input = this.createCheckbox('', attribute, display[key]);
            $label.prepend($input);
            $td = $('<td></td>').append($label);
            $tr.append($td);
          }
          $table.append($tr);
        }*/
        $group.append($table);
      }
      $body.append($group);

      return $open_block.append($body);
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
