"use strict";

// Lead author: Favyen Bastani <fbastani@mit.edu>
// A Post is either a discussion or comment.
//  Discussions can be posted on a project.
//  Comments are replies to a discussion.

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
var async = require("async");
var moment = require('moment');
var Activity = require('./activity.js');
var common = require('./common.js');

var postSchema = Schema({
    // the author of the post
    user: {type: Schema.Types.ObjectId, ref: 'User'},

    // post text
    content: String,

    // timestamp when post was created
    time: {type: Date, default: Date.now},

    // true if this post is a discussion
    isDiscussion: Boolean,

    // the parent discussion of this comment
    // (null if isDiscussion = true)
    parent: {type: Schema.Types.ObjectId, ref: 'Post', index: true},

    // project that this discussion belongs to
    // (null if isDiscussion = false)
    project: {type: Schema.Types.ObjectId, ref: 'Project', index: true},
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
        user: userID,
        content: content,
        isDiscussion: true,
        project: projectID,
    });
    discussion.save(function(err) {
        if(err) {
            if(callback) {
                callback(err);
            }
            return;
        }
        Activity.addActivity(userID, Activity.Types.POST_CREATE, discussion.id, function(err) {
            if(callback) {
                callback(err, discussion.id);
            }
        });
    });
};

// Gets all discussions for a project.
// projectID: the project to fetch discussions for.
// callback: a function(err, discussions)
//   discussions is a list of discussion objects
//   each discussion object is of the form {id, user, time, prettyDate, prettyTime, content, comments: [...]}
//   the comments field is a list of comment objects, each of which is of the form {id, userID, username, time, content}
postSchema.statics.getDiscussions = function(projectID, callback) {
    Post.
        find({'project': projectID}).
        sort({time: 1}).
        populate('user').
        exec(function(err, discussions) {
            if(err) {
                callback(err);
                return;
            }
            async.map(discussions, function(discussion, callback) {
                Post.getDiscussionComments(discussion.id, function(err, comments) {
                    var discussionObj = {
                        id: discussion.id,
                        user: discussion.user,
                        time: discussion.time,
                        prettyDate: moment(discussion.time).format(common.DATE_FORMAT),
                        prettyTime: moment(discussion.time).format(common.TIME_FORMAT),
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
//   comments is a list of comment objects,
//   each of which is of the form {id, user, time, prettyDate, prettyTime, content}
postSchema.statics.getDiscussionComments = function(discussionID, callback) {
    Post.
        find({'parent': discussionID}).
        sort({time: 1}).
        populate('user').
        exec(function(err, comments) {
            if(err) {
                callback(err);
                return;
            }
            var commentToObj = function(comment) {
                return {
                    id: comment.id,
                    user: comment.user,
                    time: comment.time,
                    prettyDate: moment(comment.time).format(common.DATE_FORMAT),
                    prettyTime: moment(comment.time).format(common.TIME_FORMAT),
                    content: comment.content,
                };
            };
            callback(null, comments.map(commentToObj));
        });
};

// Adds a new comment to an existing discussion.
// projectID, discussionID, userID: the project, discussion, and user that this comment belongs to
// content: comment text
// callback: optional callback of the form function(err, commentID)
postSchema.statics.addComment = function(projectID, discussionID, userID, content, callback) {
    // verify discussion exists
    Post.findOne({'_id': discussionID, 'project': projectID}, function(err, discussion) {
        if(err) {
            callback(err);
            return;
        } else if(!discussion) {
            callback(new Error('no such discussion'));
            return;
        }
        var comment = new Post({
            user: userID,
            content: content,
            isDiscussion: false,
            parent: discussionID,
        });
        comment.save(function(err) {
            if(callback) {
                if(err) {
                    callback(err);
                } else {
                    Activity.addActivity(userID, Activity.Types.POST_CREATE, comment.id, function(err) {
                        callback(err, comment.id);
                    });
                }
            }
        });
    });
}

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
