"use strict";

// An Activity represents a user action, such as creating a new post or project.
// Activities are primarily used to generate the Activity Feed.
// REP INVARIANT: The size of activities is exactly equal to sum of sizes of the projects and the posts

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
var async = require("async");
var MAX_ACTIVITIES_COUNT = 100;

var activityTypesDetail = {
    POST_CREATE: {type: 'post-create', key: 'post'},
    PROJECT_CREATE: {type: 'project-create', key: 'project'},
};
// create maps from activityTypesDetail:
// 1) types: e.g. POST_CREATE -> 'post-create'
// 2) typeKeys: e.g. 'post-create' -> 'post'
//              this is used to set/get the correct object
var types = {};
Object.keys(activityTypesDetail).forEach(function(ident) {
    types[ident] = activityTypesDetail[ident].type;
});
var typeKeys = {};
Object.keys(activityTypesDetail).forEach(function(ident) {
    typeKeys[activityTypesDetail[ident].type] = activityTypesDetail[ident].key;
});

var activitySchema = Schema({
    // the user who performed this activity
    user: {type: Schema.Types.ObjectId, ref: 'User', index: true},

    // type of this activity (one of post-create, project-create)
    type: {type: String, enum: {
        values: Object.keys(types).map(function(type){ return types[type]; }),
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
    if(!(type in typeKeys)) {
        callback(new Error('invalid activity type: ' + type));
        return;
    }
    var activity = new Activity({
        user: userID,
        type: type,
    });
    activity[typeKeys[type]] = ref;
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
    if(typeof count !== 'number' || count <= 0 || count > MAX_ACTIVITIES_COUNT) {
        callback(new Error('count must be between 1 and 100'));
        return;
    }
    Activity.
        find({'user': {$in: userIDs}}).
        sort({time: -1}).
        limit(count).
        populate('user').
        exec(function(err, activities) {
            if(err) {
                callback(err);
                return;
            }
            async.map(activities, function(activity, callback) {
                var typeKey = typeKeys[activity.type];
                activity.populate(typeKey, function(err, activity) {
                    if(err) {
                        callback(err);
                        return;
                    }
                    callback(null, {
                        user: activity.user,
                        type: activity.type,
                        obj: activity[typeKey],
                        time: activity.time,
                    });
                });
            }, callback);
        });
};

var Activity = mongoose.model('Activity', activitySchema);
Activity.Types = types;
module.exports = Activity;
