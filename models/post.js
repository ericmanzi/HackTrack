"use strict";

// Lead author: Favyen Bastani <fbastani@mit.edu>
// A Post is either a discussion or comment.
//  Discussions can be posted on a project.
//  Comments are replies to a discussion.

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
var async = require("async");

var postSchema = Schema({
    // the author of the post
    userID: {type: Schema.Types.ObjectId, ref: 'User'},

    // post text
    content: String,

    // timestamp when post was created
    time: {type: Date, default: Date.now},

    // true if this post is a discussion
    isDiscussion: Boolean,

    // the parent discussion of this comment
    // (null if isDiscussion = true)
    parentID: {type: Schema.Types.ObjectId, ref: 'Post', index: true},

    // project that this discussion belongs to
    // (null if isDiscussion = false)
    projectID: {type: Schema.Types.ObjectId, ref: 'Project', index: true},
});

postSchema.path('content').validate(function(value) {
    return (typeof value === 'string') && value !== '';
}, 'Discussion content cannot be empty');

// Creates a new discussion.
// projectID, userID: the project and user that this discussion belongs to
// content: discussion text
// callback: optional callback of the form function(err, discussionID)
postSchema.statics.addDiscussion = function(projectID, userID, content, callback) {
    var discussion = new Post({
        userID: userID,
        content: content,
        isDiscussion: true,
        projectID: projectID,
    });
    discussion.save(function(err) {
        if(err) {
            if(callback) {
                callback(err, undefined);
            }
            return;
        }
        if(callback) {
            callback(undefined, discussion.id);
        }
    });
};

// Gets all discussions for a project.
// projectID: the project to fetch discussions for.
// callback: a function(err, discussions)
//   discussions is a list of discussion objects
//   each discussion object is of the form {id, userID, time, content, comments: [...]}
//   the comments field is a list of comment objects, each of which is of the form {id, userID, time, content}
postSchema.statics.getDiscussions = function(projectID, callback) {
    Post.
        find({'projectID': projectID}).
        sort({time: 1}).
        exec(function(err, discussions) {
            if(err) {
                callback(err, undefined);
                return;
            }
            async.map(discussions, function(discussion, callback) {
                Post.getDiscussionComments(discussion.id, function(err, comments) {
                    var discussionObj = {
                        id: discussion.id,
                        userID: discussion.userID,
                        time: discussion.time,
                        content: discussion.content,
                        comments: comments,
                    };
                    callback(err, discussionObj);
                });
            }, callback);
        });
};

// Gets the comments for a specified discussion.
// discussionID: the discussion ID.
// callback: a function(err, comments)
//   comments is a list of comment objects, each of which is of the form {id, userID, time, content}
postSchema.statics.getDiscussionComments = function(discussionID, callback) {
    Post.
        find({'parentID': discussionID}).
        sort({time: 1}).
        exec(function(err, comments) {
            if(err) {
                callback(err, undefined);
                return;
            }
            var commentToObj = function(comment) {
                return {
                    id: comment.id,
                    userID: comment.userID,
                    time: comment.time,
                    content: comment.content,
                };
            };
            callback(undefined, comments.map(commentToObj));
        });
};

// Adds a new comment to an existing discussion.
// projectID, discussionID, userID: the project, discussion, and user that this comment belongs to
// content: comment text
// callback: optional callback of the form function(err, commentID)
postSchema.statics.addComment = function(projectID, discussionID, userID, content, callback) {
    // verify discussion exists
    Post.findOne({'_id': discussionID, 'projectID': projectID}, function(err, discussion) {
        if(err) {
            callback(err, undefined);
            return;
        } else if(!discussion) {
            callback(new Error('no such discussion'), undefined);
            return;
        }
        var comment = new Post({
            userID: userID,
            content: content,
            isDiscussion: false,
            parentID: discussionID,
        });
        comment.save(function(err) {
            if(callback) {
                if(err) {
                    callback(err, undefined);
                } else {
                    callback(undefined, comment.id);
                }
            }
        });
    });
}

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
