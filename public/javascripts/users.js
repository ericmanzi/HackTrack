/**
 * Created by ericmanzi on 11/20/15.
 * Lead author: Eric Manzi
 */

(function() {
    $(document).on('submit', '#signin-form', function(evt) {
        evt.preventDefault();
        $.post(
            '/users/login',
            helpers.getFormData(this)
        ).done(function(response) {
            currentUser = response.content.user;
            $('#signin').hide();
            $('.modal-backdrop').hide();
            $('body,html').removeClass("modal-open");
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

    $(document).on('click', '#agree', function(evt) {
        if (!($(this).is(':checked'))) {
            $('#signup-btn').attr('disabled', 'disabled');
        } else {
            $('#signup-btn').removeAttr('disabled');
        }
    });

    $(document).on('click', '#terms-link', function(evt) {
        $('#terms-nav-tab').addClass("active");
        $('#register-nav-tab').removeClass("active");
    });


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
            $('#register').hide();
            $('.modal-backdrop').hide();
            $('body,html').removeClass("modal-open");
            //loadHomePage();
            $('#emailSent').modal();
        }).fail(function(responseObject) {
            //console.log(JSON.stringify(responseObject));
            var response = $.parseJSON(responseObject.responseText);
            //console.log("error signing up:"+response.err);
            $('.error').text(response.err);
        });
    });

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


    $(document).on('click', '#favorite-button', function(evt) {
        evt.preventDefault();
        var item = $(this).parent();
        var data = { projectID: item.data('project-id'), csrftoken: getCSRFToken() };
        $.post(
            '/users/favorites',
            data
        ).done(function(response) {
            loadProjectPage(data.projectID);
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });



})(); // Wrap in an immediately invoked function expression.

