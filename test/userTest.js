
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
var Project = require('../models/project');

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
    username: " ",
    password: "finn_the_human",
    email: "finn@mit.edu",
    favorites: []
};

var invalidPassword = {
    username: " ",
    password: "finn the human",
    email: "finn@mit.edu",
    favorites: []
};

var invalidEmail = {
    username: "",
    password: "finn_the_human",
    email: "finn@harvard.edu",
    favorites: []
};

var projectX;

var projectXObj = {
    title: "awesome title",
    description: "cool description",
    owner: "jake",
    imageLinks: [],
    videoIDs: [],
    upvoterIDs: [],
    tags: []
};

describe('User', function() {

    before(function(done) {
        User.findByUsername("jake", function(err, user) {
            if (err) {
                //console.log("no user found. creating new");
                User.create(jakeObj, function(err, new_user) {
                    if (err) {
                        //console.log("error:"+err);
                    } else {
                        //console.log("new user:"+new_user);
                        jake = new_user;
                    }
                });
            } else {
                //console.log("user found:"+user);
                jake = user;
            }
        });

        Project.findOne({owner: "jake"}, function(err, project) {
            if (project) {
                projectX = project;
            } else {
                Project.createNewProject(projectXObj, function(err, new_project) {
                    projectX = new_project;
                });
            }
            done();
        });


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


    describe('getMyProjects', function() {

        it('should get all projects made by this user', function(done) {
            jake.getMyProjects(function(_, jakesprojects) {
                assert.equal(jakesprojects.length, 1);
                done();
            });
        });
    });

    describe('favorite', function() {
        it('should add a project\'s id to this user\'s favorites ' +
            'if it doesn\'t already exist', function(done) {
            var oldfavs = finn.favorites.length;
            finn.favorite(projectX.id, function(err) {
                var newfavs = finn.favorites.length;
                if (err.msg==='This project has already been favorited') {
                    assert.equal(oldfavs, newfavs);
                } else {
                    assert.equal(newfavs-oldfavs, 1);
                }
            });
            done();
        });

        it('should NOT allow favoriting own project', function(done) {
            jake.favorite(projectX.id, function(err) {
                assert.equal(err.msg, 'Cannot favorite own project');
            });
            done();
        });

    });

    describe('unfavorite', function() {
        it('should remove a project\'s id from this user\'s favorites ' +
            'if it exists', function(done) {
            var oldfavs = finn.favorites.length;
            finn.unfavorite(projectX.id, function(err) {
                var newfavs = finn.favorites.length;
                if (err.msg==='This project is not among your favorites.') {
                    assert.equal(oldfavs, newfavs);
                } else {
                    assert.equal(oldfavs-newfavs, 1);
                }
            });
            done();
        });
    });

});


