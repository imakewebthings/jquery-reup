# jQuery ReUp

- Master: [![Master Build Status](https://travis-ci.org/imakewebthings/jquery-reup.png?branch=master)](https://travis-ci.org/imakewebthings/jquery-reup)

ReUp (Replace Upload) hides the ugly, impossible-to-style native file input field and replaces it with a stylable `label`.

## Basic Usage

```js
$('input[type=file]').reup();
```

This will turn a file input...

```html
<input type="file" name="photo" id="user-photo">
```

...into the following chunk of code:

```html
<div class="reup">
  <label class="reup-label" for="user-photo">Choose File</label>
  <input type="file" name="photo" id="user-photo" style="position:absolute; left:-99999px;">
  <span class="reup-filename"></span>
</div>
```

The `label` acts as the upload button, and the `span` as the filename field. The original file input is hidden offscreen but continues to serve its purpose in the form.

The `label` will use the `input`'s id as its `for` attribute. If the file input has no id, one will be generated for it.

## Options

- **template** - The snippet of HTML that will replace the file input. The original input can be placed in this snippet string with `{{ input }}`
- **labelText** - The text on the upload label.
- **labelSelector** - Selector that matches the replacement label.
- **filenameSelector** - Selector that matches the replacement filename field.
- **filenameFilter** - When a file is selected, the value of the file field is run through a function and the return value is displayed in the replacement filename field. By default, this function strips away all the folders in the string and just shows the filename and extension.,
- **idPrefix** - If the plugin needs to generate an id for the input, it will append an incrementing number to this prefix.

## Defaults

```js
{
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
}
```

## Declarative Equivalents

Plugin users can set the `labelText` option by using a data attribute on the file input instead of passing it in as an option:

```html
<input type="file" name="photo" data-reup-label-text="Custom Label Text">
```

## What About Styling?

This repository includes no CSS. It is up to you to style the upload replacement elements to fit your needs.

## Changelog

- 0.0.1: Initial release.

## License

© 2013 - Caleb Troughton. Licensed under the [MIT license](http://opensource.org/licenses/MIT).