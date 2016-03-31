// Write by hand => use CoffeeScript ?
//TODO : Add commentaries
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.PopupImport = (function(superClass) {
    extend(PopupImport, superClass);

    function PopupImport() {
      this.$popupimport = null;
    }

    PopupImport.prototype.create = function() {
      var $close_button, $create_notions_block, $create_notions_button, $open_block, $open_button;

      // file selector
      $open_file = this.createInputFile();
      $open_file.on({
        change: (function(_this) {
          return function() {
            return _this.load(this.value);//TODO : tester sans return ?
          };
        })(this)

      });

      $open_block = this.createBlock();
      $open_block.append($open_button);
      $open_block.append($open_file);

      // Block to create a tree from scratch (directly create notions)
      $create_notions_button = this.createButton('Create from scratch');
      $create_notions_button.on({
        click: (function(_this) {
          return function() {
            return _this.$popupimport.trigger('createNotions');
          };
        })(this)
      });
      $create_notions_block = this.createBlock('Create from scratch');
      $create_notions_block.append($create_notions_button);
      $close_button = this.createCloseButton();
      this.$popupimport = this.createPopup([this.createTitle('Import')], [$open_block, $create_notions_block], [$close_button]);
      return this.applyCloseButtonEvents($close_button, this.$popupimport);
    };

    // Load data from file
    PopupImport.prototype.load = function(file) {
      //TODO : read file 
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
