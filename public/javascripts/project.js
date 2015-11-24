// Lead author: Kairat Ashim <kairat@mit.edu>

// Wrapped in an immediately invoked function expression.
(function() {
    // listener for posting a new project
    $(document).on('submit', 'form#post-project', function(evt) {
        evt.preventDefault();
        var title = $('#project-post-title').val();
        var description = $('#project-post-description').val();
        var imageLinks = $('#project-post-image-links').val();
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

    $(document).on('click', '#myButton-upvote', function(evt) {
        evt.preventDefault();
        var item = $(this).parent();
        var id = item.data('project-id');
        $.post(
            '/projects/' + id
        ).done(function(response) {
            loadProjectPage(id);
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

    $(document).on('click', '#view-user', function(event) {
        event.preventDefault();
        var user = $(this).text();
        loadUserPage(user);
    });

})();