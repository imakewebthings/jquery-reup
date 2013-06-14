/*!
  jQuery ReUp - v0.0.3
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

    var brokenFirefox = (function() {
      var ua = window.navigator.userAgent;
      var ff = ua.match(/Firefox.*/);
      return ff && ff.length && parseFloat(ff[0].split('/')[1]) < 23; 
    })();

    $.fn.reup = function(overrides) {      
      var replacements = [];
      var idCounter = 0;

      var mergeOptions = function($input) {
        var declareds = {
          labelText: $input.data('reup-label-text')
        };
        return $.extend({}, $.fn.reup.defaults, declareds, overrides);
      };

      var buildReplacement = function(options) {
        return $(options.template.replace(
          /{{ *input *}}/,
          '<div class="input-placeholder"></div>'
        ));
      };

      var replaceInput = function($replacement, $input, options) {
        $input.after($replacement);
        $replacement.find('.input-placeholder').append($input);
        $replacement.find(options.labelSelector)
          .text(options.labelText)
          .attr('for', $input[0].id);
        $input.unwrap();
        $input.css({
          position: 'absolute',
          left: '-99999px'
        });
      };

      var updateFilename = function($replacement, $input, options) {
        $replacement.find(options.filenameSelector)
          .text(options.filenameFilter($input.val()));
      };

      var ensureId = function(input, options) {
        if (!input.id) {
          input.id = options.idPrefix + idCounter++;
        }
      };

      var fixLabelClick = function($replacement, $input, options) {
        $replacement.on('click.reup', options.labelSelector, function(event) {
          setTimeout(function() {
            $input.click();
          }, 1);
        });
      }

      this.each(function() {
        var $this = $(this);
        var options = mergeOptions($this);
        var $replacement = buildReplacement(options);

        ensureId(this, options);
        replaceInput($replacement, $this, options);
        updateFilename($replacement, $this, options);
        
        $this.on('change.reup', function() {
          updateFilename($replacement, $this, options);
        });

        if (brokenFirefox) {
          fixLabelClick($replacement, $this, options);
        }

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