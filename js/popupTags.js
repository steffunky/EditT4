// Generated by CoffeeScript 1.9.3
//TODO : Add commentaries
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.PopupTags = (function(superClass) {
    extend(PopupTags, superClass);

    function PopupTags() {
      this.$popuptags = null;
    }

    PopupTags.prototype.create = function(tags) {
      var $body, $closebutton, $create_button, $group_existing, $group_input, $group_new, $img_add, $input_new_tag, $menu, createExistingTag, i, len, tag;
      $body = $('<div></div>').addClass('tags_popup');
      $group_existing = this.createFieldset('Existing tags').attr('id', 'existing_tags');
      createExistingTag = (function(_this) {
        return function(tag) {
          var $group_input, $img_delete, $input_tag;
          $input_tag = _this.createInputText('default tags_input', '').attr('disabled', 'disabled').val(tag);
          $img_delete = $('<span></span>').addClass('input-group-addon span_action glyphicon glyphicon-minus-sign');
          $img_delete.on({
            click: function(event) {
              var $elem;
              $elem = $(event.currentTarget);
              return $elem.closest('.input-group').remove();
            }
          });
          $group_input = $('<div></div>').addClass('input-group').append([$input_tag, $img_delete]);
          $group_input.css({
            'margin-bottom': '3px'
          });
          return $group_existing.append($group_input);
        };
      })(this);
      $body.append($group_existing);
      for (i = 0, len = tags.length; i < len; i++) {
        tag = tags[i];
        createExistingTag(tag);
      }
      $group_new = this.createFieldset('New').attr('id', 'new_tag');
      $input_new_tag = this.createInputText('default new_tag_input', '');
      $img_add = $('<span></span>').attr('id', 'new_tag_action').addClass('input-group-addon span_action glyphicon glyphicon-plus-sign');
      $img_add.on({
        click: (function(_this) {
          return function(event) {
            var $elem;
            $elem = $(event.currentTarget);
            if ($input_new_tag.val() !== '') {
              createExistingTag($input_new_tag.val());
              return $input_new_tag.val('');
            }
          };
        })(this)
      });
      $group_input = $('<div></div>').addClass('input-group').append([$input_new_tag, $img_add]);
      $group_new.append($group_input);
      $body.append($group_new);
      $create_button = this.createButton('Save', true);
      $create_button.on({
        click: (function(_this) {
          return function() {
            var input_tag, j, len1, ref;
            tags = [];
            ref = _this.$popuptags.find('.tags_input');
            for (j = 0, len1 = ref.length; j < len1; j++) {
              input_tag = ref[j];
              tags.push($(input_tag).val());
            }
            _this.$popuptags.trigger('tagsSet', [tags]);
            return _this.close();
          };
        })(this)
      });
      $closebutton = this.createCloseButton();
      $menu = $('<div></div>').append([$create_button, $closebutton]);
      this.$popuptags = this.createPopup([this.createTitle('Tags')], [$body], [$menu], 'tags');
      this.applyCloseButtonEvents($closebutton, this.$popuptags);
      this.$popuptags.css({
        width: "400px"
      });
      return this.$popuptags.on({
        close: (function(_this) {
          return function() {
            return _this.$popuptags.empty();
          };
        })(this)
      });
    };

    PopupTags.prototype.show = function() {
      return this.$popuptags.popup('show');
    };

    PopupTags.prototype.close = function() {
      return this.$popuptags.popup('hide');
    };

    PopupTags.prototype.getNode = function() {
      return this.$popuptags;
    };

    return PopupTags;

  })(Popup);

}).call(this);
