/*!
  jQuery ReUp - v0.0.1
  © 2013 - Caleb Troughton
  MIT Licensed: http://opensource.org/licenses/MIT
  For more information, visit https://github.com/imakewebthings/jquery-reup
*/
(function(undefined) {
  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery'], function($) {
        return factory($, root);
      });
    }
    return factory(root.jQuery, root);
  })(this, function($, window) {

    $.fn.reup = function(overrides) {      
      var replacements = [];
      var idCounter = 0;

      var updateFilename = function($replacement, $input, options) {
        $(options.filenameSelector).text(options.filenameFilter($input.val()));
      };

      var ensureId = function(input, options) {
        if (!input.id) {
          input.id = options.idPrefix + idCounter++;
        }
      };

      this.each(function() {
        var $this = $(this);
        var declareds = {
          labelText: $this.data('reup-label-text')
        };
        var options = $.extend({}, $.fn.reup.defaults, declareds, overrides);
        var template = options.template.replace(
          /{{ *input *}}/,
          '<div class="input-placeholder"></div>'
        );
        var $replacement = $(template);

        $this.after($replacement);
        $replacement.find('.input-placeholder').append($this);
        $this.unwrap();
        $this.css({
          position: 'absolute',
          left: '-99999px'
        });

        updateFilename($replacement, $this, options);
        ensureId(this, options);
        $replacement.find(options.labelSelector)
          .text(options.labelText)
          .attr('for', this.id);
        $this.on('change.reup', function() {
          updateFilename($replacement, $this, options);
        });

        replacements.push($replacement[0]);
      });

      return this.pushStack(replacements);
    };

    $.fn.reup.defaults = {
      template: '<div class="reup"><label class="reup-label"></label>{{ input }}<span class="reup-filename"></span></div>',
      labelText: 'Choose File',
      labelSelector: '.reup-label',
      filenameSelector: '.reup-filename',
      filenameFilter: function(path) {
        if (!path) {
          return 'No file selected';
        }
        var segments = path.split('/');
        segments = segments[segments.length - 1].split('\\');
        return segments[segments.length - 1];
      },
      idPrefix: 'reup-id-'
    };
  });
})();