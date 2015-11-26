// Lead author: Favyen Bastani (fbastani@mit.edu)
// Activity model tests

var assert = require("assert");
var async = require('async');

// DATABASE STUFF
var mongoose = require('mongoose');
// Connect to either the MONGOLAB_URI or to the local database.
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/hacktrack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("database connected");
});

var Activity = require('../models/activity');
var User = require('../models/user');
var Project = require('../models/project');
var Post = require('../models/post');

var testUsers = null;
var testUserObjs = [];
for(var i = 0; i < 3; i++) {
    testUserObjs.push({
        username: 'activityTest' + i,
        password: 'password',
        email: 'activityTest' + i + '@mit.edu',
    });
}

var testProject;
var testProjectObj = {
    title: "activityTest",
    description: "activityTest",
};

var testPostID;

describe('Activity', function() {
    before(function(done) {
        async.map(testUserObjs, function(testUserObj, callback) {
            User.findByUsername(testUserObj.username, function(err, user) {
                if(!user) {
                    User.create(testUserObj, function(err, newUser) {
                        callback(undefined, newUser);
                    });
                } else {
                    callback(undefined, user);
                }
            });
        }, function(err, users) {
            testUsers = users;
            done(err);
        });
    });

    before(function(done) {
        Project.findOne({'title': testProjectObj.title}, function(err, project) {
            if(!project) {
                testProjectObj.owner = testUsers[0].id;
                Project.create(testProjectObj, function(err, newProject) {
                    testProject = newProject;
                    done();
                });
            } else {
                testProject = project;
                done();
            }
        });
    });

    before(function(done) {
        Post.addDiscussion(testProject.id, testUsers[0].id, 'activityTest', function(err, discussionID) {
            testPostID = discussionID;
            done();
        });
    });

    describe('#addActivity', function() {
        before(function(done) {
            Activity.remove({user: testUsers[0].id}, done);
        });

        it('should add the activity', function(done) {
            Activity.addActivity(testUsers[0].id, Activity.Types.POST_CREATE, testPostID, function(err, activityID) {
                assert.ok(!err);
                Activity.findOne({'_id': activityID}, function(err, activity) {
                    assert.ok(!err);
                    assert.ok(activity);
                    done();
                });
            });
        });

        it('fails on invalid activity type', function(done) {
            Activity.addActivity(testUsers[0].id, 'invalid activity type', testPostID, function(err, activityID) {
                assert.ok(err);
                done();
            });
        });

        it('fails on invalid object id', function(done) {
            Activity.addActivity(testUsers[0].id, Activity.Types.POST_CREATE, 'invalid object id', function(err, activityID) {
                assert.ok(err);
                done();
            });
        });
    });

    describe('#getActivities', function(done) {
        before(function(done) {
            Activity.remove({user: {$in: testUsers}}, done);
        });

        // for first user, add post_create activity
        before(function(done) {
            Activity.addActivity(testUsers[0].id, Activity.Types.POST_CREATE, testPostID, function(err, activityID) {
                done(err);
            });
        });

        // for second user, add both post_create and project_create
        before(function(done) {
            Activity.addActivity(testUsers[1].id, Activity.Types.POST_CREATE, testPostID, function(err, activityID) {
                done(err);
            });
        });

        before(function(done) {
            // sleep for a second to ensure this activity is the last one added
            setTimeout(function() {
                Activity.addActivity(testUsers[1].id, Activity.Types.PROJECT_CREATE, testProject.id, function(err, activityID) {
                    done(err);
                });
            }, 1000);
        });

        it('basic returns one activity', function(done) {
            Activity.getActivities(testUsers[0].id, 100, function(err, activities) {
                assert.ok(!err);
                assert.equal(activities.length, 1);
                assert.equal(activities[0].type, 'post-create');
                assert.equal(activities[0].obj.content, 'activityTest');
                done();
            });
        });

        it('returns both of user activities in descending time order', function(done) {
            Activity.getActivities(testUsers[1].id, 100, function(err, activities) {
                assert.ok(!err);
                assert.equal(activities.length, 2);
                assert.equal(activities[0].type, 'project-create');
                assert.equal(activities[1].type, 'post-create');
                done();
            });
        });

        it('limited request gets latest activity', function(done) {
            Activity.getActivities(testUsers[1].id, 1, function(err, activities) {
                assert.ok(!err);
                assert.equal(activities.length, 1);
                assert.equal(activities[0].type, 'project-create');
                done();
            });
        });

        it('request for multiple users returns all activities', function(done) {
            Activity.getActivities([testUsers[0].id, testUsers[1].id], 100, function(err, activities) {
                assert.ok(!err);
                assert.equal(activities.length, 3);
                assert.equal(activities[0].type, 'project-create');
                assert.equal(activities[1].type, 'post-create');
                assert.equal(activities[2].type, 'post-create');
                done();
            });
        });

        it('user with no activities yields no results', function(done) {
            Activity.getActivities(testUsers[2].id, 1, function(err, activities) {
                assert.ok(!err);
                assert.equal(activities.length, 0);
                done();
            });
        });
    });
});
