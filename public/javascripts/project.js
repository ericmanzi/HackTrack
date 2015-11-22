// Wrapped in an immediately invoked function expression.
(function() {
  // listener for posting a new project
  $(document).on('submit', 'form#post-project', function(evt) {
    evt.preventDefault();
    var title = $('#project-title').val();
    var description = $('#project-description').val();
    var imageLinks = $('#project-image-links').val();
    $.post(
      '/projects',
      { title: title,
        description : description,
        imageLinks : imageLinks
      }
    ).done(function(response) {
      loadHomePage();
    }).fail(function(responseObject) {
      var response = $.parseJSON(responseObject.responseText);
      $('.error').text(response.err);
    });
  });

})();