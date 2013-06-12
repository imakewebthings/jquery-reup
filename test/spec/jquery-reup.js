describe('jQuery ReUp', function() {
  var $input, $reup;

  beforeEach(function() {
    setFixtures('<input type="file" name="test_file" id="test_id">');
    $input = $('input[name="test_file"]');
  });

  describe('with default options', function() {
    beforeEach(function() {
      $reup = $input.reup();

    });

    it('returns the replacement div', function() {
      expect($reup).toHaveClass('reup');
    });

    it('pushes the return onto the jQuery object stack', function() {
      expect($reup.end()).toEqual($input);
    });

    it('creates the upload label with label text', function() {
      expect($reup.find('.reup-label')).toHaveText('Choose File');
    });

    it('creates the filename replacement', function() {
      expect($reup.find('.reup-filename')).toHaveText('No file selected');
    });

    it('places the input inside the replacement', function(){
      expect($reup).toContain($input);
    });

    it('hides the input off screen', function() {
      expect($input).toHaveCss({
        position: 'absolute',
        left: '-99999px'
      });
    });

    it('points the label [for] attribute to the input', function() {
      expect($input).toHaveAttr('for', 'test_id');
    });
  });

  describe('with custom options', function() {
    beforeEach(function() {
      $input[0].id = '';
      $reup = $input.reup({
        template: '<div class="custom-reup"><label class="custom-label"></label><p class="custom-filename"></p>{{ input }}</div>',
        labelText: 'Custom Label',
        labelSelector: '.custom-label',
        filenameSelector: '.custom-filename',
        filenameFilter: function() { return 'Custom Filename'; },
        idPrefix: 'custom-id-'
      });
    });

    it('uses the specified label text', function() {
      expect($reup.find('.custom-label')).toHaveText('Custom Label');
    });

    it('uses the specified filename filter', function() {
      expect($reup.find('.custom-filename')).toHaveText('Custom Filename');
    });

    it('generates input id with specified prefix', function() {
      expect($input[0].id).toMatch('custom-id-');
    });

    it('points the label [for] attribute to the generated id', function() {
      expect($reup.find('.custom-label').attr('for')).toMatch('custom-id-');
    });
  });

  describe('declarative options', function() {
    beforeEach(function() {
      setFixtures('<input type="file" data-reup-label-text="Decl Label">');
      $input = $('input[data-reup-label-text]');
      $reup = $input.reup();
    });

    it('uses the data attribute label text', function() {
      expect($reup.find('.reup-label')).toHaveText('Decl Label');
    });
  });
});