// Lead author: Kairat Ashim <kairat@mit.edu>

// Wrapped in an immediately invoked function expression.
(function() {

    ////////////// START: listeners for posting a new project /////////////////////
    $(document).on('click', '#submit-project-post', function(evt) {
        evt.preventDefault();
        var errorDiv = $("#post-project-error");
        var title = $('#project-post-title').val();
        if (title === ""){
            errorDiv.hide();
            errorDiv.html('Title cannot be empty.');
            errorDiv.show(300);
            return;
        }
        var description = $('#project-post-description').val();
        if (description === ""){
            errorDiv.hide();
            errorDiv.html('Description cannot be empty.');
            errorDiv.show(300);
            return;
        }
        var tags = $("#project-post-tags").tagit("assignedTags");

        var imageLinksArray = $('.project-post-image-links').map(function(){
            return $(this).val();
        }).get();

        var imageLinks = $.grep(imageLinksArray, function(n, i){
            return n !== "";
        })

        var videoLink = $('#project-post-videoLink').val();
        if ((videoLink !== "" && videoLink.search('youtu') === -1) || (videoLink.search(',') !== -1)){
            errorDiv.hide();
            errorDiv.html('Only one YouTube video is allowed.');
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
                videoLink : videoLink,
                csrftoken: getCSRFToken()
            }
        ).done(function(response) {
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $("#post-project-error").hide();
            $("#post-project-error").html(response.err);
            $("#post-project-error").show(300);
        });
    });

    $(document).on('click', '#cancel-project-post', function(event){
        event.preventDefault();
        loadHomePage();
    });

    $(document).on('click', '.add_imagelink_field_button', function(event){
        event.preventDefault();
        var max_image_links = 5;
        var field_count = $('.project-post-image-links').map(function(){
            return $(this).val();
        }).get().length;
        if (field_count < max_image_links){
            var images_wrapper = $('.image_input_fields_wrap');
            images_wrapper.append('<div><input type="text" class="form-control project-post-image-links" placeholder="Enter project image link..."><button class="btn btn-warning btn-sm remove_imagelink_field">Remove</button></div>');
        }
    });

    $(document).on('click', '.remove_imagelink_field', function(event){
        event.preventDefault();
        $(this).parent('div').remove();
    });

    ////////////// END: listeners for posting a new project /////////////////////

    ////////////// START: listeners for editing a new project /////////////////////
    $(document).on('click', '#submit-project-edit', function(evt) {
        evt.preventDefault();
        console.log('submitting the edit');
        var errorDiv = $("#edit-project-error");
        var projectID = errorDiv.parent().data("project-edit-id");

        var title = $('#project-edit-title').val();
        if (title === ""){
            errorDiv.hide();
            errorDiv.html('Title cannot be empty.');
            errorDiv.show(300);
            return;
        }

        var description = $('#project-edit-description').val();
        if (description === ""){
            errorDiv.hide();
            errorDiv.html('Description cannot be empty.');
            errorDiv.show(300);
            return;
        }

        var tags = $("#project-edit-tags").tagit("assignedTags");

        var imageLinksArray = $('.project-edit-image-links').map(function(){
            return $(this).val();
        }).get();

        var imageLinks = $.grep(imageLinksArray, function(n, i){
            return n !== "";
        })

        var videoLink = $('#project-edit-videoLink').val();
        if ((videoLink !== "" && videoLink.search('youtu') === -1) || (videoLink.search(',') !== -1)){
            errorDiv.hide();
            errorDiv.html('Only one YouTube video is allowed.');
            errorDiv.show(300);
            return;
        }

        tags = tags.join(',');
        imageLinks = imageLinks.join(",");

        $.post(
            '/projects/'+ projectID + '/edit',
            {
                title : title,
                description : description,
                imageLinks : imageLinks,
                tags : tags,
                videoLink : videoLink,
                csrftoken: getCSRFToken()
            }
        ).done(function(response) {
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $("#edit-project-error").hide();
            $("#edit-project-error").html(response.err);
            $("#edit-project-error").show(300);
        });
    });

    $(document).on('click', '.add_imagelinkEdit_field_button', function(event){
        event.preventDefault();
        var max_image_links = 5;
        var field_count = $('.project-edit-image-links').map(function(){
            return $(this).val();
        }).get().length;
        if (field_count < max_image_links){
            var images_wrapper = $('.image_input_fields_wrap');
            images_wrapper.append('<div><input type="text" class="form-control project-edit-image-links" placeholder="Enter project image link..."><button class="btn btn-warning btn-sm remove_imagelink_field">Remove</button></div>');
        }
    });

    $(document).on('click', '#cancel-project-edit', function(event){
        event.preventDefault();
        loadHomePage();
    });

    ////////////// END: listeners for editing a new project /////////////////////

    $(document).on('click', '#myButton-upvote', function(evt) {
        evt.preventDefault();
        var item = $(this).parent();
        var id = item.data('project-id');
        $.post(
            '/projects/' + id,
            {csrftoken: getCSRFToken()}
        ).done(function(response) {
            loadProjectPage(id, true);
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

    $(document).on('click', '.view-user', function(event) {
        event.preventDefault();
        var user = $(this).attr('view-user-id');
        loadUserPage(user);
    });


    $(document).on('click', '#edit-project-button', function(event){
        event.preventDefault();
        var projectID = $(this).parent().data('project-id');
        loadEditProjectPage(projectID);
    });

})();