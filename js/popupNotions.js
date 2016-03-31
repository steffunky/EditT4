// Generated by CoffeeScript 1.9.3
//TODO : Add commentaries
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.PopupNotions = (function(superClass) {
    extend(PopupNotions, superClass);

    function PopupNotions() {
      this.addInput = bind(this.addInput, this);
      this.$popupnotion = null;
      this.notions = {};
    }

    PopupNotions.prototype.create = function() {
      var $class_attributes_block, $closebutton, $create_button, $instance_attributes_block, $left, $menu, $right;
      $left = this.createBlock('Notions', 'div_block').attr('id', 'notions_block');
      $right = this.createBlock('Attributes', 'div_block').attr('id', 'attributes_block');
      $class_attributes_block = this.createBlock('Class attributes', 'div_block col-md-2').attr('id', 'class_attributes_block');
      $instance_attributes_block = this.createBlock('Instance attributes', 'div_block col-md-2').attr('id', 'instance_attributes_block');
      $right.append(this.createSideBlocks([$class_attributes_block, $instance_attributes_block], [5, 5]));
      this.createLeftNotionNameInputs($left, $right);
      $create_button = this.createButton('Create', true);
      $create_button.on({
        click: (function(_this) {
          return function() {
            _this.$popupnotions.trigger('notionsCreated', [_this.notions]);
            return _this.close();
          };
        })(this)
      });
      $closebutton = this.createCloseButton();
      $menu = $('<div></div>').append([$create_button, $closebutton]);
      this.$popupnotions = this.createPopup([this.createTitle('Create notions')], [this.createSideBlocks([$left, $right], [4, 8])], [$menu], 'notions');
      this.applyCloseButtonEvents($closebutton, this.$popupnotions);
      this.$popupnotions.css({
        width: "800px"
      });
      return this.$popupnotions.on({
        close: (function(_this) {
          return function() {
            _this.$popupnotions.empty();
            return _this.notions = {};
          };
        })(this)
      });
    };

    PopupNotions.prototype.show = function() {
      return this.$popupnotions.popup('show');
    };

    PopupNotions.prototype.close = function() {
      this.$popupnotions.popup('hide');
      this.$popupnotions.empty();
      return this.notions = {};
    };

    PopupNotions.prototype.getNode = function() {
      return this.$popupnotions;
    };

    PopupNotions.prototype.createLeftNotionNameInputs = function($left, $right) {
      var $input, old_name, right_panel_hidden;
      $input = this.createInputText('input_notions');
      right_panel_hidden = true;
      old_name = null;
      $input.on({
        keyup: (function(_this) {
          return function(event) {
            var $elem, $next_input;
            $elem = $(event.currentTarget);
            if ($elem.val().length !== 0) {
              if ($elem.next().length === 0) {
                _this.createLeftNotionNameInputs($left, $right);
              }
              if (right_panel_hidden === true) {
                _this.loadRightPanel($elem, $right);
                return right_panel_hidden = false;
              }
            } else {
              $next_input = $elem.next();
              if ($next_input.length !== 0 && $next_input.val().length === 0) {
                $next_input.remove();
              }
              if (right_panel_hidden === false) {
                _this.loadRightPanel(null, $right);
                return right_panel_hidden = true;
              }
            }
          };
        })(this),
        blur: (function(_this) {
          return function(event) {
            return _this.saveNameNotions(old_name, $(event.currentTarget).val());
          };
        })(this),
        focus: (function(_this) {
          return function(event) {
            var $elem, ref;
            $elem = $(event.currentTarget);
            old_name = $elem.val();
            _this.loadRightPanel($elem, $right);
            return right_panel_hidden = (ref = old_name === '') != null ? ref : {
              "true": false
            };
          };
        })(this)
      });
      this.loadRightPanel($input, $right);
      return $left.append($input);
    };

    PopupNotions.prototype.loadRightPanel = function($notion_name_input, $right) {
      var class_values, instance_values, name;
      if ($notion_name_input === null) {
        $right.find('.body').empty();
        return;
      }
      name = $notion_name_input.val();
      if ((this.notions[name] != null)) {
        class_values = this.notions[name]["class"];
        instance_values = this.notions[name]["instance"];
      } else {
        class_values = instance_values = null;
      }
      this.createInputsClass($notion_name_input, class_values, $right.find('#class_attributes_block'));
      return this.createInputsInstance($notion_name_input, instance_values, $right.find('#instance_attributes_block'));
    };

    PopupNotions.prototype.createInputsClass = function($notion_name_input, values, $class_block) {
      var $block, $group, $name_input_class, $name_input_val, index, val;
      $block = $class_block.find('.body');
      $block.empty();
      $group = $('<div></div>').addClass('form-group');
      $name_input_class = this.createInputText().attr('disabled', 'disabled').val('Name');
      $name_input_val = this.createInputText().attr('disabled', 'disabled');
      $group.append([$name_input_class, $name_input_val]);
      $block.append($group);
      if (values !== null) {
        for (index in values) {
          val = values[index];
          if (index !== 'name') {
            this.addInput($notion_name_input, index, val, $block, 'class', (function(_this) {
              return function(name_notion, old_key, key, val) {
                return _this.saveClassValuesNotions(name_notion, old_key, key, val);
              };
            })(this));
          }
        }
      }
      return this.addInput($notion_name_input, '', '', $block, 'class', (function(_this) {
        return function(name_notion, old_key, key, val) {
          return _this.saveClassValuesNotions(name_notion, old_key, key, val);
        };
      })(this));
    };

    PopupNotions.prototype.createInputsInstance = function($notion_name_input, values, $instance_block) {
      var $block, index, val;
      $block = $instance_block.find('.body');
      $block.empty();
      if (values !== null) {
        for (index in values) {
          val = values[index];
          this.addInput($notion_name_input, index, val, $block, 'attribute', (function(_this) {
            return function(name_notion, old_key, key, val) {
              return _this.saveInstanceValuesNotions(name_notion, old_key, key, val);
            };
          })(this));
        }
      }
      return this.addInput($notion_name_input, '', '', $block, 'attribute', (function(_this) {
        return function(name_notion, old_key, key, val) {
          return _this.saveInstanceValuesNotions(name_notion, old_key, key, val);
        };
      })(this));
    };

    PopupNotions.prototype.saveNameNotions = function(old_name, new_name) {
      if (new_name === '') {
        delete this.notions[old_name];
        return;
      }
      if (old_name !== new_name) {
        this.notions[new_name] = this.notions[old_name];
        if ((this.notions[new_name] == null) || (this.notions[new_name]["class"] == null)) {
          this.notions[new_name] = {
            'class': {
              name: ''
            },
            instance: {}
          };
        }
        return delete this.notions[old_name];
      }
    };

    PopupNotions.prototype.saveClassValuesNotions = function(name, old_key, new_key, val) {
      if (name === '') {
        return;
      }
      if (old_key !== new_key) {
        delete this.notions[name]['class'][old_key];
      }
      if (new_key !== '') {
        return this.notions[name]['class'][new_key] = val;
      }
    };

    PopupNotions.prototype.saveInstanceValuesNotions = function(name, old_key, new_key, val) {
      if (name === '') {
        return;
      }
      if (old_key !== new_key) {
        delete this.notions[name]['instance'][old_key];
      }
      if (new_key !== '') {
        return this.notions[name]['instance'][new_key] = val;
      }
    };

    PopupNotions.prototype.addInput = function($notion_name_input, key, val, $block, class_prefix, save_callback) {
      var $element, $group, $input_key, $input_val, i, len, name, old_key, ref;
      name = $notion_name_input.val();
      $notion_name_input.on({
        keyup: function(event) {
          return name = $(event.currentTarget).val();
        }
      });
      $group = $('<div></div>').addClass('form-group');
      $input_key = this.createInputText(class_prefix + "_key").attr('placeholder', 'key').val(key);
      $input_val = this.createInputText(class_prefix + "_val").attr('placeholder', 'value1/value2/...').val(val);
      old_key = key;
      $input_key.on({
        keyup: (function(_this) {
          return function(event) {
            var $elem, $next_group;
            $elem = $(event.currentTarget);
            if ($elem.val().length !== 0) {
              if ($elem.parent().next().length === 0) {
                return _this.addInput($notion_name_input, '', '', $block, class_prefix, save_callback);
              }
            } else {
              $next_group = $elem.parent().next();
              if ($next_group.length !== 0 && $next_group.find("." + class_prefix + "_key").val().length === 0) {
                return $next_group.remove();
              }
            }
          };
        })(this)
      });
      ref = [$input_key, $input_val];
      for (i = 0, len = ref.length; i < len; i++) {
        $element = ref[i];
        $element.on({
          blur: (function(_this) {
            return function(event) {
              var $elem;
              $elem = $(event.currentTarget);
              if ($elem.hasClass(class_prefix + "_key")) {
                key = $elem.val();
                val = $elem.next().val();
              } else if ($elem.hasClass(class_prefix + "_val")) {
                val = $elem.val();
                key = $elem.prev().val();
              }
              return save_callback(name, old_key, key, val);
            };
          })(this),
          focus: (function(_this) {
            return function(event) {
              var $elem;
              $elem = $(event.currentTarget);
              if ($elem.hasClass(class_prefix + "_key")) {
                return old_key = $elem.val();
              } else if ($elem.hasClass(class_prefix + "_val")) {
                return old_key = $elem.prev().val();
              }
            };
          })(this)
        });
      }
      $group.append([$input_key, $input_val]);
      return $block.append($group);
    };

    return PopupNotions;

  })(Popup);

}).call(this);
