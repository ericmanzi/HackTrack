// Lead author: Eric Manzi (ermanzi@mit.edu)
// User model tests

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

var jake;
var jakeObj = {
    username: "jake",
    password: "jake_the_dog",
    email: "jake@mit.edu",
    favorites: []
};

var finn;
var validUser = {
    username: "finn",
    password: "finn_the_human",
    email: "finn@mit.edu",
    favorites: []
};

var invalidUsername = {
    username: "",
    password: "finn_the_human",
    email: "finn@mit.edu",
    favorites: []
};

var invalidPassword = {
    username: "",
    password: "finn the human",
    email: "finn@mit.edu",
    favorites: []
};

var invalidEmail = {
    username: "",
    password: "finn the human",
    email: "finn@harvard.edu",
    favorites: []
};

var projectX;
var projectXObj = {
    title: "awesome title",
    description: "cool description"
};

describe('User', function() {

    before(function(done) {
        User.findByUsername("jake", function(err, user) {
            if (err) {
                User.create(jakeObj, function(err, new_user) {
                    jake = new_user;
                });
            } else {
                jake = user;
            }
            done();
        });

        //Project.findOne({creator: "jake"}, function(err, project) {
        //    if (project) {
        //        projectX = project;
        //    } else {
        //        jake.createProject(projectXObj, function(err, new_project) {
        //            projectX=new_project;
        //        });
        //    }
        //    done();
        //});
    });

    describe('#create', function() {

        it('should create a user', function(done) {
            User.findByUsername("finn", function(err, user) {
                if (err) {
                    User.create(validUser, function(err, found_user) {
                        assert.equal(found_user.username, 'finn');
                        assert.equal(found_user.email, 'finn@mit.edu');
                        finn = found_user;
                        done();
                    });
                } else {
                    assert.equal(user.username, 'finn');
                    assert.equal(user.email, 'finn@mit.edu');
                    finn = user;
                    done();
                }
            });

        });

        it('should not register a user with an invalid username', function(done) {
            User.create(invalidUsername, function(err, user) {
                if (err) {
                    assert.equal(err.errors.username.message,
                        'Invalid username: usernames must not be empty ' +
                        'and must contain only numbers letters and underscores');
                }
                done();
            });
        });

        it('should not register a user with an invalid email', function(done) {
            User.create(invalidEmail, function(err, user) {
                if (err) {
                    assert.equal(err.errors.email.message,
                        'Invalid email: email must be a valid MIT.edu email');
                }
                done();
            });
        });

        it('should not register a user with an invalid password', function(done) {
            User.create(invalidPassword, function(err, user) {
                if (err) {
                    assert.equal(err.errors.password.message,
                        'Invalid password: passwords cannot be empty or contain spaces');
                }
                done();
            });
        });
    });


    describe('verifyPassword', function() {

        it('should return true if usernames/passwords match', function(done) {
            jake.verifyPassword("jake_the_dog", function(_, result) {
                assert.equal(true, result);
                done();
            });
        });

        it('should return false if usernames/passwords do not match', function(done) {
            jake.verifyPassword("asdf", function(_, result) {
                assert.equal(false, result);
                done();
            });
        });


        it('should return false if usernames/passwords do not match cases', function(done) {
            jake.verifyPassword("JAKE_THE_DOG", function(_, result) {
                assert.equal(false, result);
                done();
            });
        });

    });

    describe('createProject', function() {
        xit('should create a project belonging to this user', function (done) {
            jake.createProject(projectXObj, function(err, project) {
                Project.findOne({_id:project.id}, function(err, project) {
                    assert.equal(project.creator, "jake");
                    done();
                });
            });
        });
    });

    describe('getProject', function(done) {
        xit('should return the project identified by its ID', function() {
                User.getProject(projectX.id, function(err, project) {
                    assert.equal(project.creator, "jake");
                    assert.equal(project.title, "awesome title");
                    assert.equal(project.description, "cool description");
                    done();
                });
        });

        xit('should return an invalid project message if the project wasn\'t found', function() {
            jake.getProject("randomID0129381029", function(err, project) {
                assert.equal(err.msg, 'Invalid project.');
                done();
            });
        });

    });

    describe('getAllProjects', function() {
        xit('should get all projects that have been created so far', function(done) {
            jake.getAllProjects(function(err, projects) {
                assert.notEqual(projects.length, 0);
                done();
            });
        });

    });

    describe('getMyProjects', function() {

        xit('should get all projects made by this user', function(done) {
            jake.getMyProjects(function(_, jakesprojects) {
                assert.equal(jakesprojects.length, 1);
                done();
            });
        });
    });

    describe('upvote', function() {
        xit('should add this user to upvoters of given project if this ' +
            'user hasn\'t voted for this project before', function(done) {
                // TODO: check with Kairat
                var oldVoteCount = projectX.getVoteCount();
                finn.upvote(projectX.id, function(err, hasVoted) {
                    if (!err) {
                        var newVoteCount = projectX.getVoteCount();
                        if (hasVoted) { // voted for this project before
                            assert.equal(newVoteCount, oldVoteCount);
                        } else { // hasn't voted for this project before
                            assert.equal(newVoteCount-oldVoteCount, 1);
                        }
                    }
                    done();
            });

        });
    });

    describe('favorite', function() {
        xit('should add a project\'s id to this user\'s favorites ' +
            'if it doesn\'t already exist', function(done) {
            var oldfavs = finn.favorites.length;
            finn.favorite(projectX.id, function(err) {
                var newfavs = finn.favorites.length;
                if (err.msg==='This project has already been favorited') {
                    assert.equal(oldfavs, newfavs);
                } else {
                    assert.equal(oldfavs-newfavs, 1);
                }
            });
            done();
        });
    });

});