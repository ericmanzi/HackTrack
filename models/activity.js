"use strict";

// An Activity represents a user action, such as creating a new post or project.
// Activities are primarily used to generate the Activity Feed.

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
var async = require("async");

var activitySchema = Schema({
    // the user who performed this activity
    user: {type: Schema.Types.ObjectId, ref: 'User', index: true},

    // type of this activity (one of post-create, project-create)
    type: {type: String, enum: {
        values: ['post-create', 'project-create'],
        message: 'invalid activity type (`{VALUE}`)'
    }},

    // timestamp when activity was performed
    time: {type: Date, default: Date.now},

    // if type is post-discussion or post-comment, contains the target post
    post: {type: Schema.Types.ObjectId, ref: 'Post'},

    // if type is create-project, contains the target project
    project: {type: Schema.Types.ObjectId, ref: 'Project'},
});

// Creates a new activity.
// userID: the activity user's ID
// type: the activity type
// ref: the referenced model's ID
// callback: callback of the form function(err, activityID)
activitySchema.statics.addActivity = function(userID, type, ref, callback) {
    var activity = new Activity({
        user: userID,
        type: type,
    });
    if(type == 'post-create') {
        activity.post = ref;
    } else if(type == 'project-create') {
        activity.project = ref;
    } else {
        callback(new Error('invalid activity type: ' + type));
        return;
    }
    activity.save(function(err) {
        callback(err, activity.id);
    });
};

// Gets activities performed by the specified set of users.
// userIDs: set of user IDs
// count: maximum number of activities to return.
// callback: callback of the form function(err, activities)
//    activities is an array of activity objects
//    each activity object is {user, type, obj, time}, where obj is referenced object (populated)
activitySchema.statics.getActivities = function(userIDs, count, callback) {
    if(typeof count !== 'number' || count <= 0 || count > 100) {
        callback(new Error('count must be between 1 and 100'));
        return;
    }
    Activity.
        find({'user': {$in: userIDs}}).
        sort({time: 1}).
        limit(count).
        populate('user').
        exec(function(err, activities) {
            if(err) {
                callback(err);
                return;
            }
            async.map(activities, function(activity, callback) {
                if(activity.type == 'post-create') {
                    activity.populate('post', function(err, activity) {
                        if(err) {
                            callback(err);
                            return;
                        }
                        callback(undefined, {
                            user: activity.user,
                            type: activity.type,
                            obj: activity.post,
                            time: activity.time,
                        });
                    });
                } else if(activity.type == 'project-create') {
                    activity.populate('project', function(err, activity) {
                        if(err) {
                            callback(err);
                            return;
                        }
                        callback(undefined, {
                            user: activity.user,
                            type: activity.type,
                            obj: activity.project,
                            time: activity.time,
                        });
                    });
                }
            }, callback);
        });
};

var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
