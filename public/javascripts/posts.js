// Lead author: Favyen Bastani <fbastani@mit.edu>

(function() {
    // Discussion form submission.
    // POST to /projects/{id}/addDiscussion with discussion text content
    var addDiscussion = function() {
        var projectID = $('#project-header').data('project-id');
        var content = $('#project-discussion-add-content').val();
        var data = { content: content, csrftoken: getCSRFToken() };
        $.post(
            '/projects/' + projectID + '/discussion',
            data
        ).done(function(response) {
            loadProjectPage(projectID);
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    };

    $(document).on('click', '#project-discussion-add-btn', function(evt) {
        evt.preventDefault();
        addDiscussion();
    });
    $(document).on('keyup', '#project-discussion-add-content', function(evt) {
        if(evt.keyCode == 13) {
            evt.preventDefault();
            addDiscussion();
        }
    });

    // Comment/reply form submission.
    // POST to /projects/{projectID}/discussions/{discussionID}/comment with text content
    var addComment = function(discussionID) {
        var projectID = $('#project-header').data('project-id');
        var content = $('#comment-add-content-' + discussionID).val();
        var data = { content: content, csrftoken: getCSRFToken() };
        $.post(
            '/projects/' + projectID + '/discussions/' + discussionID + '/comment',
            data
        ).done(function(response) {
            loadProjectPage(projectID);
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    };

    $(document).on('click', '.comment-add-btn', function(evt) {
        evt.preventDefault();
        addComment($(this).parent().data('discussion-id'));
    });
    $(document).on('keyup', '.comment-add-content', function(evt) {
        if(evt.keyCode == 13) {
            evt.preventDefault();
            addComment($(this).parent().data('discussion-id'));
        }
    });
})();
