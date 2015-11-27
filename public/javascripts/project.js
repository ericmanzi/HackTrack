// Lead author: Kairat Ashim <kairat@mit.edu>

// Wrapped in an immediately invoked function expression.
(function() {

    ////////////// START: listeners for posting a new project /////////////////////
    $(document).on('click', '#submit-project-post', function(evt) {
        evt.preventDefault();
        var errorDiv = $("#post-project-error");
        var title = $('#project-post-title').val();
        if (title === ""){
            errorDiv.html('Title cannot be empty.');
            errorDiv.show(300);
            return;
        }
        var description = $('#project-post-description').val();
        if (description === ""){
            errorDiv.html('Description cannot be empty.');
            errorDiv.show(300);
            return;
        }
        var tags = $("#project-post-tags").tagit("assignedTags");
        var imageLinks = $('.project-post-image-links').map(function(){
            return $(this).val();
        }).get();
        var videoLink = $('#project-post-videoLink').val();
        if (videoLink !== "" && videoLink.search('youtu') === -1){
            errorDiv.html('Only YouTube videos are allowed.');
            errorDiv.show(300);
            return;
        }
        tags = tags.join(',');
        imageLinks = imageLinks.join(",");
        $.post(
            '/projects',
            {   title: title,
                description : description,
                imageLinks : imageLinks,
                tags : tags,
                videoLink : videoLink
            }
        ).done(function(response) {
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $("#post-project-error").html(response.err);
            $("#post-project-error").show(300);
        });
    });

    $(document).on('click', '#cancel-project-post', function(event){
        event.preventDefault();
        loadHomePage();
    });

    var max_image_links = 5;
    var field_count = 1;
    $(document).on('click', '.add_imagelink_field_button', function(event){
        event.preventDefault();
        if (field_count < max_image_links){
            field_count++;
            var images_wrapper = $('.image_input_fields_wrap');
            images_wrapper.append('<div><input type="text" class="form-control project-post-image-links" placeholder="Enter project image link..."><button class="btn btn-warning btn-sm remove_imagelink_field">Remove</button></div>');
        }
    });

    $(document).on('click', '.remove_imagelink_field', function(event){
        event.preventDefault();
        $(this).parent('div').remove();
        field_count--;
    });

    ////////////// END: listeners for posting a new project /////////////////////

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