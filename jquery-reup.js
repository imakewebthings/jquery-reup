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

    

  });
})();