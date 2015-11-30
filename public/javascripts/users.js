/**
 * Created by ericmanzi on 11/20/15.
 * Lead author: Eric Manzi
 */
var files = [];

(function() {
    /**
     * Attempt to sign in user with data submitted in form.
     * Reload the home page.
     * if error, appropriate error message is shown
     */
    $(document).on('submit', '#signin-form', function(evt) {
        evt.preventDefault();
        $.post(
            '/users/login',
            helpers.getFormData(this)
        ).done(function(response) {
            currentUser = response.content.user;
            $('#signin').modal('hide');
            $('.modal-backdrop').modal('hide');
            $('.modal-backdrop').removeClass("modal-backdrop");
            $('body,html').removeClass("modal-open");
            $.get('/users/current', function(response) {
                profile_picture = response.content.profile_picture;
                loadHomePage();
            });
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

    /**
     * Enable signup button only when user has agreed to terms of use
     */
    $(document).on('click', '#agree', function(evt) {
        if (!($(this).is(':checked'))) {
            $('#signup-btn').attr('disabled', 'disabled');
        } else {
            $('#signup-btn').removeAttr('disabled');
        }
    });

    /**
     * Switch to terms of use tab
     */
    $(document).on('click', '#terms-link', function(evt) {
        $('#terms-nav-tab').addClass("active");
        $('#register-nav-tab').removeClass("active");
    });


    /**
     * Register the user with data submitted in registration form
     * if error, appropriate error message is shown
     * else, show modal indicating that a verification email has been sent
     */
    $(document).on('submit', '#register-form', function(evt) {
        evt.preventDefault();
        var formData = helpers.getFormData(this);
        if (formData.password !== formData.confirm) {
            $('.error').text('Password and confirmation do not match!');
            return;
        }
        delete formData['confirm'];
        $.post(
            '/users',
            formData
        ).done(function(response) {
            $('#register').modal('hide');
            $('.modal-backdrop').modal('hide');
            $('.modal-backdrop').removeClass("modal-backdrop");
            $('body,html').removeClass("modal-open");
            //loadHomePage();
            $('#emailSent').modal('show');
        }).fail(function(responseObject) {
            //console.log(JSON.stringify(responseObject));
            var response = $.parseJSON(responseObject.responseText);
            //console.log("error signing up:"+response.err);
            $('.error').text(response.err);
        });
    });

    /**
     * Log out the current user
     */
    $(document).on('click', '#logout-link', function(evt) {
        evt.preventDefault();
        $.post(
            '/users/logout',
            {csrftoken: getCSRFToken()}
        ).done(function(response) {
            currentUser = null;
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });


    /**
     * Favorite the project indicated by the project id
     * if error, appropriate error message is shown
     */
    $(document).on('click', '#favorite-button', function(evt) {
        evt.preventDefault();
        var item = $(this).parent();
        var data = { projectID: item.data('project-id'), csrftoken: getCSRFToken() };
        $.post(
            '/users/favorites',
            data
        ).done(function(response) {
            loadProjectPage(data.projectID, true);
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            console.log(response.err);
            $('.error').text(response.err);
        });
    });

    /**
     * Unfavorite the project indicated by the project id
     * if error, appropriate error message is shown
     */
    $(document).on('click', '#unfavorite-button', function(evt) {
        evt.preventDefault();
        var item = $(this).parent();
        var data = { projectID: item.data('project-id'), csrftoken: getCSRFToken() };
        $.ajax({
            url: '/users/favorites',
            method: 'DELETE',
            data: data
        }).done(function(response) {
            loadProjectPage(data.projectID, true);
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            console.log(response.err);
            $('.error').text(response.err);
        });
    });

    $(document).on('change', '#fileselect', function(evt) {
        files = $(this).get(0).files;
    });

    /**
     * Upload and set the selected profile picture
     * If error, appropriate error message is shown
     */
    $(document).on("click", "#upload_profile_button", function(){
        if (files.length > 0) { // if there's a file to upload
            var file = files[0];
            var parseFile = new Parse.File(file.name, file);

            parseFile.save()
                .then(function(savedFile) { // save was successful
                    var data = {
                        //username: currentUser,
                        profile_pic_url: savedFile.url(),
                        csrftoken: getCSRFToken()
                    };
                    $.post(
                        '/users/profiles/'+currentUser+'/profile_picture',
                        data
                    ).done(function(response) {
                        $('#uploadProfilePic').modal('hide');
                        $('.modal-backdrop').modal('hide');
                        $('body,html').removeClass("modal-open");
                        $('.modal-backdrop').removeClass("modal-backdrop");
                        $('#profile-sm').attr('src', data.profile_pic_url);
                        $('#profile-md').attr('src', data.profile_pic_url);
                        profile_picture = data.profile_pic_url;

                        //loadProfilePage();
                    }).fail(function(responseObject) {
                        var response = $.parseJSON(responseObject.responseText);
                        //console.log("response error:"+response.err);
                        $('.error').text(response.err);
                    });

                }, function(error) { // the save failed
                    $('.error').text("Error: " + error.code + " " + error.message);
                });
        }
    });

    $(document).on('submit', '#pwreset-request-form', function(evt) {
        evt.preventDefault();
        var username = $(this).find('input[name=username]').val();
        var email = $(this).find('input[name=email]').val();
        $.post(
            '/users/profiles/' + username + '/password',
            {email: email, csrftoken: getCSRFToken()}
        ).done(function(response) {
            $('#pwreset-request').modal('hide');
            $('#pwreset-requested').modal('show');
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

    $(document).on('submit', '#pwreset-finish-form', function(evt) {
        evt.preventDefault();
        var key = $('#pwreset-finish').data('key');
        var username = $('#pwreset-finish').data('username');
        var password = $(this).find('input[name=password]').val();
        $.post(
            '/users/profiles/' + username + '/password',
            {key: key, password: password, csrftoken: getCSRFToken()}
        ).done(function(response) {
            $('#pwreset-finish').modal('hide');
            $('#pwreset-finished').modal('show');
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

    /**
     * Follow the user indicated by the username
     * if error, appropriate error message is shown
     */
    $(document).on('click', '#follow-btn', function(evt) {
        evt.preventDefault();
        var item = $(this).parent();
        var data = { username: item.data('user-id'), csrftoken: getCSRFToken() };
        $.post(
            '/users/following',
            data
        ).done(function(response) {
            loadUserPage(data.username);
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            console.log(response.err);
            $('.error').text(response.err);
        });
    });

    /**
     * Unfollow the user indicated by the username
     * if error, appropriate error message is shown
     */
    $(document).on('click', '#unfollow-btn', function(evt) {
        evt.preventDefault();
        var item = $(this).parent();
        var data = { username: item.data('user-id'), csrftoken: getCSRFToken() };
        $.ajax({
            url: '/users/following',
            method: 'DELETE',
            data: data
        }).done(function(response) {
            loadUserPage(data.username);
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            console.log(response.err);
            $('.error').text(response.err);
        });
    });


})();