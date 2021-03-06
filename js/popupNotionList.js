// Gère quelles notions / tag sont actifs.
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.PopupNotionList = (function(superClass) {
    extend(PopupNotionList, superClass);

    function PopupNotionList() {
      this.$popupnotionlist = null;
      this.notions = {};
    }

    // Create the popup when user want to create notions
    PopupNotionList.prototype.create = function(notions, active_notions, tags, active_tags) {
      var $body, $closebutton, $create_button, $filter_div, $label, $menu, $select_tag, $tag_div, createFilter;
      $body = $('<div></div>').attr('id', 'popup_notionlist');
      $notionlist = $('<table></table>');
      $tag_div = $('<div></div>');

      for(var i =0; i<notions.length; ++i){
        notion=notions[i];
        $td_notion = $('<td></td>').append(notion.getName());
        is_in = false;
        for (var j = 0; j<active_notions.length; ++j){
          if (notion == active_notions[j])
            is_in = true;
        }
        $td_cb = $('<td></td>').append(this.createCheckbox(notion.getName(), 'notion_' + notion.getName(), is_in) );
        $notionlist.append( $('<tr></tr>').append([$td_notion,$td_cb]));
      }
      $notionsdiv = $('<div></div>').attr('id','notionsdiv').html("<p>Notions</p>");
      $notionsdiv.append($notionlist);

      $tagslist = $('<table></table>');

      for(var i =0; i < tags.length; ++i){
        $td_tags = $('<td></td>').append(tags[i]);
        $td_cb = $('<td></td>').append(this.createCheckbox(tags[i], 'tags_' + tags[i], 0) );
        $tagslist.append($('<tr></tr>').append([$td_tags,$td_cb]));
      }
      $tagsdiv = $('<div></div>').attr('id','tagsdiv').html("<p>Tags</p>");
      $tagsdiv.append($tagslist);

      //createFilter();
      $create_button = this.createButton('Save', true);
      $create_button.on({
        click: (function(_this) {
          return function() {
            res = {'add' : [], 'del' : []}
            for(var i =0; i<notions.length; ++i){
              notion=notions[i];
              if($notionlist.find('input#notion_' + notion.getName()).is(':checked')){
                is_in = false;
                for (var j = 0; j<active_notions.length; ++j){
                  if (notion == active_notions[j]){
                    is_in = true;
                    break;
                  }
                }
                if(!is_in){
                  res['add'].push(notion);
                }
              }
              else{
                is_in = false;
                for (var j = 0; j<active_notions.length; ++j){
                  if (notion == active_notions[j]){
                    is_in = true;
                    break;
                  }
                }
                if(is_in){
                  res['del'].push(notion);
                }
              }
            }
            _this.$popupnotionlist.trigger('notionsActivation', [res]);
            return _this.close();
          };
        })(this)
      });

      $closebutton = this.createCloseButton();
      $menu = $('<div></div>').append([$create_button, $closebutton]);

      // Append the left part and the right part to our popup
      this.$popupnotionlist = this.createPopup([this.createTitle('Components')],  [$notionsdiv,$tagsdiv], [$menu],  'components');
      this.applyCloseButtonEvents($closebutton, this.$popupnotionlist);
      return this.$popupnotionlist.on({
        close: (function(_this) {
          return function() {
            return _this.$popupnotionlist.empty();
          };
        })(this)
      });
    };

    // Show the popup to create notions
    PopupNotionList.prototype.show = function() {
      return this.$popupnotionlist.popup('show');
    };

    // Hide the popup to create notions
    PopupNotionList.prototype.close = function() {
      this.$popupnotionlist.popup('hide');
      return this.$popupnotionlist.empty();
    };

    // Return the popupnotions object
    PopupNotionList.prototype.getNode = function() {
      return this.$popupnotionlist;
    };

    return PopupNotionList;

  })(Popup);

}).call(this);
