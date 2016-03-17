// Write by hand => use CoffeeScript ?
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
      $open_button = this.createButton('Open');
      $open_button.on({
        click: (function(_this) {
          return function() {
            return _this.$popupimport.trigger('openNotions');
          };
        })(this)
      });
      $open_block = this.createBlock();
      $open_block.append($open_button);
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

    PopupImport.prototype.show = function() {
      return this.$popupimport.popup('show');
    };

    PopupImport.prototype.close = function() {
      return this.$popupimport.popup('hide');
    };

    PopupImport.prototype.getNode = function() {
      return this.$popupimport;
    };

    return PopupImport;

  })(Popup);

}).call(this);
