// Lead author: Favyen Bastani (fbastani@mit.edu)
// Activity model tests

var assert = require("assert");

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

var testUser;
var testUserObj = {
    username: "activityTest",
    password: "password",
    email: "activityTest@mit.edu",
};

var testProject;
var testProjectObj = {
    title: "activityTest",
    description: "activityTest",
};

var testPostID;

describe('Activity', function() {
    before(function(done) {
        User.findByUsername(testUserObj.username, function(err, user) {
            if(!user) {
                User.create(testUserObj, function(err, newUser) {
                    testUser = newUser;
                    done();
                });
            } else {
                testUser = user;
                done();
            }
        });
    });

    before(function(done) {
        Project.findOne({'title': testProjectObj.title}, function(err, project) {
            if(!project) {
                testProjectObj.owner = testUser.id;
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
        Post.addDiscussion(testProject.id, testUser.id, 'activityTest', function(err, discussionID) {
            testPostID = discussionID;
            done();
        });
    });

    describe('#addActivity', function() {
        before(function(done) {
            Activity.remove({user: testUser.id}, done);
        });

        it('should add the activity', function(done) {
            Activity.addActivity(testUser.id, 'post-create', testPostID, function(err, activityID) {
                assert.ok(!err);
                Activity.findOne({'_id': activityID}, function(err, activity) {
                    assert.ok(!err);
                    assert.ok(activity);
                    done();
                });
            });
        });

        it('fails on invalid activity type', function(done) {
            Activity.addActivity(testUser.id, 'invalid activity type', testPostID, function(err, activityID) {
                assert.ok(err);
                done();
            });
        });

        it('fails on invalid object id', function(done) {
            Activity.addActivity(testUser.id, 'post-create', 'invalid object id', function(err, activityID) {
                assert.ok(err);
                done();
            });
        });
    });

    describe('#getActivities', function(done) {
        before(function(done) {
            Activity.remove({user: testUser.id}, done);
        });

        it('create post activity returned with post', function(done) {
            Activity.addActivity(testUser.id, 'post-create', testPostID, function(err, activityID) {
                assert.ok(!err);
                Activity.getActivities(testUser.id, 100, function(err, activities) {
                    assert.ok(!err);
                    assert.equal(activities.length, 1);
                    assert.equal(activities[0].type, 'post-create');
                    assert.equal(activities[0].obj.content, 'activityTest');
                    done();
                });
            });
        });

        // TODO
    });
});
