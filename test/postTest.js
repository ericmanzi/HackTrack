// Lead author: Favyen Bastani (fbastani@mit.edu)
// Post model tests

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

var User = require('../models/user');
var Project = require('../models/project');
var Post = require('../models/post');

var testUser;
var testUserObj = {
    username: "postTest",
    password: "password",
    email: "postTest@mit.edu",
};

var testProject;
var testProjectObj = {
    title: "postTest",
    description: "postTest",
};

var otherProject;
var otherProjectObj = {
    title: "postTest2",
    description: "postTest2",
};

var testDiscussionID;

describe('Post', function() {
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
        Project.findOne({'title': otherProjectObj.title}, function(err, project) {
            if(!project) {
                otherProjectObj.owner = testUser.id;
                Project.create(otherProjectObj, function(err, newProject) {
                    otherProject = newProject;
                    done();
                });
            } else {
                otherProject = project;
                done();
            }
        });
    });

    before(function(done) {
        Post.addDiscussion(testProject.id, testUser.id, 'test discussion', function(err, discussionID) {
            testDiscussionID = discussionID;
            done();
        });
    });

    describe('#addDiscussion', function() {
        it('should add the discussion', function(done) {
            Post.addDiscussion(testProject.id, testUser.id, 'discussion text', function(err, discussionID) {
                assert.ok(!err);
                Post.getDiscussions(testProject.id, function(err, discussions) {
                    assert.ok(!err);
                    var found = false;
                    discussions.forEach(function(discussion) {
                        if(discussion.id != discussionID) {
                            return;
                        }
                        found = true;
                        assert.equal(discussion.userID, testUser.id);
                        assert.equal(discussion.content, 'discussion text');
                    });
                    assert.ok(found);
                    done();
                });
            });
        });

        it('does not accept empty content', function(done) {
            Post.addDiscussion(testProject.id, testUser.id, '', function(err, post) {
                assert.ok(err);
                done();
            });
        });
    });

    describe('#addComment', function() {
        it('should add the comment', function(done) {
            Post.addComment(testProject.id, testDiscussionID, testUser.id, 'comment text', function(err, commentID) {
                assert.ok(!err);
                Post.getDiscussionComments(testDiscussionID, function(err, comments) {
                    assert.ok(!err);
                    assert.equal(comments.length, 1);
                    assert.equal(comments[0].id, commentID);
                    assert.equal(comments[0].userID, testUser.id);
                    assert.equal(comments[0].content, 'comment text');
                    done();
                });
            });
        });

        it('second comment is returned in correct order', function(done) {
            Post.addComment(testProject.id, testDiscussionID, testUser.id, 'second comment text', function(err, commentID) {
                assert.ok(!err);
                Post.getDiscussionComments(testDiscussionID, function(err, comments) {
                    assert.ok(!err);
                    assert.equal(comments.length, 2);
                    assert.equal(comments[0].content, 'comment text');
                    assert.equal(comments[1].id, commentID);
                    assert.equal(comments[1].userID, testUser.id);
                    assert.equal(comments[1].content, 'second comment text');
                    done();
                });
            });
        });

        it('fails on invalid project', function(done) {
            Post.addComment(otherProject.id, testDiscussionID, testUser.id, 'second comment text', function(err, commentID) {
                assert.ok(err);
                done();
            });
        });
    });

    describe('#getDiscussions', function() {
        it('add two discussions, verify both are returned', function(done) {
            Post.addDiscussion(testProject.id, testUser.id, 'discussion 1', function(err, discussionID1) {
                assert.ok(!err);
                Post.addDiscussion(testProject.id, testUser.id, 'discussion 2', function(err, discussionID2) {
                    assert.ok(!err);
                    Post.getDiscussions(testProject.id, function(err, discussions) {
                        assert.ok(!err);
                        var found1 = false;
                        var found2 = false;
                        discussions.forEach(function(discussion) {
                            if(discussion.id == discussionID1) {
                                found1 = true;
                            }
                            if(discussion.id == discussionID2) {
                                found2 = true;
                            }
                        });
                        assert.ok(found1);
                        assert.ok(found2);
                        done();
                    });
                });
            });
        });

        it('getDiscussions returns comments', function(done) {
            Post.getDiscussions(testProject.id, function(err, discussions) {
                assert.ok(!err);
                var found = false;
                discussions.forEach(function(discussion) {
                    if(discussion.id != testDiscussionID) {
                        return;
                    }
                    assert.equal(discussion.comments.length, 2);
                    assert.equal(discussion.comments[0].content, 'comment text');
                    assert.equal(discussion.comments[1].content, 'second comment text');
                    found = true;
                });
                assert.ok(found);
                done();
            });
        });
    });
});
