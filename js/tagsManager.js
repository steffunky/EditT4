// Generated by CoffeeScript 1.9.3
// file unchanged (same content as EditT3)
(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.TagsManager = (function() {
    function TagsManager() {
      this.clear();
    }

    // Reset all attributes
    TagsManager.prototype.clear = function() {
      // List of tags
      this.tags = [];

      this.tagsActive = [];
      // Configuration of the tags (color, display)
      this.tags_conf = {};
      // Default colors
      return this.colors = {
        'default': '#C2C2C2',
        white: 'rgb(255, 255, 255)',
        black: 'rgb(0, 0, 0)',
        red: 'rgb(255, 0, 0)',
        green: 'rgb(0, 255, 0)',
        blue: 'rgb(0, 0, 255)'
      };
    };

    // Set tags by reference
    TagsManager.prototype.setTags = function(tags) {
      this.tags.push(tags);
      //return this.updateTagsConf();
    };

    // Get tags by reference
    TagsManager.prototype.getTags = function() {
      return this.tags;
    };

    // Get an hash of tags with all the values to false
    TagsManager.prototype.getHashTags = function() {
      var i, len, ref, tag, tags;
      tags = {};
      ref = this.tags;
      for (i = 0, len = ref.length; i < len; i++) {
        tag = ref[i];
        tags[tag] = false;
      }
      return tags;
    };

    // Get tags conf by reference
    TagsManager.prototype.getTagsConf = function() {
      return this.tags_conf;
    };

    // Set tags conf by reference
    TagsManager.prototype.setTagsConf = function(tags_conf) {
      return this.tags_conf = tags_conf;
    };

    // Update tags configuration by remove ones which don't exist and add new ones
    TagsManager.prototype.updateTagsConf = function() {
      var i, len, ref, results, tag;
      // Delete tags which don't exist anymore
      for (tag in this.tags_conf) {
        if ((indexOf.call(this.tags, tag) < 0)) {
          delete this.tags_conf[tag];
        }
      }

      ref = this.tags;
      results = [];
      // Add new tag
      for (i = 0, len = ref.length; i < len; i++) {
        tag = ref[i];
        if (this.tags_conf[tag] == null) {
          results.push(this.tags_conf[tag] = {
            color: this.getDefaultColors()['default'],
            display: false
          });
        }
      }
      return results;
    };

    // Get the colors by reference
    TagsManager.prototype.getDefaultColors = function() {
      return this.colors;
    };

    return TagsManager;

  })();

}).call(this);
