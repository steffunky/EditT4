// Generated by CoffeeScript 1.9.3
// TODO : delete unused file ?
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.PopupRestore = (function(superClass) {
    extend(PopupRestore, superClass);

    function PopupRestore() {
      this.$popuprestore = null;
    }

    PopupRestore.prototype.create = function(saves) {
      var $body, $closebutton, $description, $menu, $name, $remove_button, $restore_button, $save_block, fn, save, savename;
      $body = $('<div></div>');
      fn = (function(_this) {
        return function(save, $save_block) {
          $restore_button.on({
            click: function() {
              _this.$popuprestore.trigger('restoreSet', [save]);
              return _this.close();
            }
          });
          return $remove_button.on({
            click: function() {
              if (confirm('Are you sure you want to delete this save ?')) {
                _this.$popuprestore.trigger('deleteSave', [save.name]);
                return $save_block.remove();
              }
            }
          });
        };
      })(this);
      for (savename in saves) {
        save = saves[savename];
        $save_block = $('<div></div>').addClass('block_restore');
        $name = $('<strong></strong>').text(save.name);
        $restore_button = $('<span></span>').addClass('restore_button glyphicon glyphicon-floppy-open');
        $remove_button = $('<span></span>').addClass('restore_button glyphicon glyphicon-floppy-remove');
        fn(save, $save_block);
        $description = $('<div></div>').addClass('restore_description').text(save.description);
        $save_block.append([$name, $restore_button, $remove_button, $description]);
        $body.append($save_block);
      }
      // Menu (close)
      $closebutton = this.createCloseButton();
      $menu = $('<div></div>').append([$closebutton]);
      
      this.$popuprestore = this.createPopup([this.createTitle('Restore')], [$body], [$menu], 'restore');
      this.applyCloseButtonEvents($closebutton, this.$popuprestore);
     
      this.$popuprestore.css({
        'min-width': '400px',
        'max-width': '800px'
      });
      return this.$popuprestore.on({
        close: (function(_this) {
          return function() {
            return _this.$popuprestore.empty();
          };
        })(this)
      });
    };

    PopupRestore.prototype.show = function() {
      return this.$popuprestore.popup('show');
    };

    PopupRestore.prototype.close = function() {
      return this.$popuprestore.popup('hide');
    };

    PopupRestore.prototype.getNode = function() {
      return this.$popuprestore;
    };

    return PopupRestore;

  })(Popup);

}).call(this);
