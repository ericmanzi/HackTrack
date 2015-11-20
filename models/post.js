"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var postSchema = mongoose.Schema({
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
            callback(undefined, discussion._id);
        }
    });
}

// Gets all discussions for a project.
// projectID: the project to fetch discussions for.
// callback: a function(discussions)
//   discussions is a list of discussion objects
//   each discussion object is of the form {id, userID, time, contents, comments: [...]}
//   the comments field is a list of comment objects, each of which is of the form {id, userID, time, contents}
postSchema.statics.getDiscussions = function(projectID, callback) {
    // not implemented
}

// Adds a new comment to an existing discussion.
// discussionID, userID: the discussion and user that this comment belongs to
// content: comment text
// callback: optional callback of the form function(err, commentID)
postSchema.statics.addComment = function(discussionID, userID, content, callback) {
    // not implemented
}

var PostModel = mongoose.model('Post', postSchema);
