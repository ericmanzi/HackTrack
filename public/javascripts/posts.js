// Lead author: Favyen Bastani <fbastani@mit.edu>

(function() {
    var showError = function(msg) {
        $('.project-error-div').hide();
        $('.project-error-div').text(msg);
        $('.project-error-div').show();
        document.body.scrollTop = 0;
    };

    // Discussion form submission.
    // POST to /projects/{id}/addDiscussion with discussion text content
    var addDiscussion = function() {
        var projectID = $('#project-header').data('project-id');
        var content = $('#project-discussion-add-content').val();
        if(!content) {
            showError('Content is required.');
            return;
        }
        var data = { content: content, csrftoken: getCSRFToken() };
        $.post(
            '/projects/' + projectID + '/discussion',
            data
        ).done(function(response) {
            loadProjectPage(projectID, true);
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
        if(!content) {
            showError('Content is required.');
            return;
        }
        var data = { content: content, csrftoken: getCSRFToken() };
        $.post(
            '/projects/' + projectID + '/discussions/' + discussionID + '/comment',
            data
        ).done(function(response) {
            loadProjectPage(projectID, true);
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

    // helpers for post template to convert @mentions to links
    Handlebars.registerHelper('postContent', function(content) {
        content = Handlebars.Utils.escapeExpression(content);
        var mentionStart = false;
        for(var i = 0; i <= content.length; i++) {
            if(mentionStart === false) {
                if(i < content.length && content[i] == '@' && (i == 0 || /\s/.test(content[i - 1]))) {
                    mentionStart = i;
                }
            } else {
                if(i == content.length || /\s/.test(content[i])) {
                    var safeUsername = Handlebars.Utils.escapeExpression(content.substr(mentionStart + 1, i - mentionStart - 1));
                    var userlink = '<a href="#" class="view-user" view-user-id="' + safeUsername + '">@' + safeUsername + '</a>';
                    content = content.substr(0, mentionStart) + userlink + content.substr(i);
                    mentionStart = false;
                }
            }
        }
        return new Handlebars.SafeString(content);
    });
})();
