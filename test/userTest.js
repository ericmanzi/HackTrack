
// Lead author: Eric Manzi (ermanzi@mit.edu)
// other authors: Favyen Bastani
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
    favorites: [],
    following: [],
    profile_picture: 'images/user-default.png'
};

var finn;
var validUser = {
    username: "finn",
    password: "finn_the_human",
    email: "finn@mit.edu",
    favorites: [],
    following: [],
    profile_picture: 'images/user-default.png'
};

var invalidUsername = {
    username: " ",
    password: "finn_the_human",
    email: "finn@mit.edu",
    favorites: [],
    following: [],
    profile_picture: 'images/user-default.png'
};

var invalidPassword = {
    username: " ",
    password: "finn the human",
    email: "finn@mit.edu",
    favorites: [],
    following: [],
    profile_picture: 'images/user-default.png'
};

var invalidEmail = {
    username: "",
    password: "finn_the_human",
    email: "finn@harvard.edu",
    favorites: [],
    following: [],
    profile_picture: 'images/user-default.png'
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
                    done();
                });
            } else {
                //console.log("user found:"+user);
                jake = user;
                done();
            }
        });
    });

    before(function(done) {
        Project.findOne({owner: "jake"}, function(err, project) {
            if (project) {
                projectX = project;
                done();
            } else {
                Project.createNewProject(projectXObj, function(err, new_project) {
                    projectX = new_project;
                    done();
                });
            }
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

    describe('findByUsername', function() {

        it('should find and return the user specified by ' +
            'the given username if user exists', function(done) {
            User.findByUsername("jake", function(err, user) {
                if (err) {
                    assert.equal(err.msg, 'No such username.');
                } else {
                    assert.equal(user.username, "jake");
                    done();
                }
            });
        });
    });

    describe('isEmailUnique', function() {
        it('should return appropriate message if email is already in use', function(done) {
            User.isEmailUnique("jake@mit.edu", function(err, msg) {
                assert.equal(msg, 'That email is already in use by another account.');
                done();
            });
        });
        it('should return an error if email is not in use', function(done) {
            User.isEmailUnique("princess@bubble.gum", function(err, msg) {
                assert.equal(err.msg, 'That email does not exist.');
                done();
            });
        })
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
            finn.unfavorite(projectX._id, function(err) {
                var newfavs = finn.favorites.length;
                if (err && err.msg==='This project is not among your favorites.') {
                    assert.equal(oldfavs, newfavs);
                } else {
                    assert.equal(oldfavs-newfavs, 1);
                }
            });
            done();
        });
    });

    describe('getFavorites', function() {
        it('should return this user\'s favorites', function(done) {
            finn.favorite(projectX._id, function(err) {
                if (err) {
                    assert.equal(err.msg,
                        'This project has already been favorited');
                    done();
                } else {
                    finn.getFavorites(function(err, favorites) {
                        var found = false;
                        favorites.forEach(function(favorite) {
                            found = found || favorite.id == projectX.id;
                        });
                        assert.ok(found);
                        done();
                    });
                }
            })
        });
    });

    describe('follow', function() {
        it('should add the given username to the list of ' +
            'usernames being followed by current user ' +
            'if it does not already exist in that list', function(done) {
            finn.follow('jake', function(err) {
                if (err) {
                    assert.equal(err.msg, 'You are already following this user.');
                } else {
                    assert.notEqual(finn.following.indexOf('jake'),-1);
                }
                done();
            });
        });
    });

    describe('unfollow', function() {
        it('should remove the given username from the list of usernames being ' +
            'followed by current user if it exists in that list', function(done) {
            var oldNumFollowing = finn.following.length;
            finn.unfollow('jake', function(err) {
                if (err) {
                    assert.equal(err.msg, 'You are not following this user.');
                } else {
                    assert.equal(finn.following.length-oldNumFollowing,-1);
                }
                done();
            });
        });
    });

    describe('isFollowing', function() {
        it('should return true if currentUser is following otherUser', function(done) {
            jake.follow('finn', function(err) {
                User.isFollowing('jake', 'finn', function(err, following) {
                    assert.ok(following);
                    done();
                });
            });
        });

        it('should return appropriate error message if otherUser does not exist', function(done) {
            jake.follow('finn', function(err) {
                User.isFollowing('jake', 'orgalog', function(err, following) {
                    assert(err.msg, 'The user you are trying to follow does not exist.');
                    done();
                });
            });
        });

    });

    describe('passwordResetRequest', function() {
        // set finn as verified user
        before(function(done) {
            if(finn.verification_key) {
                finn.verification_key = '';
                finn.save(done);
            } else {
                done();
            }
        });

        // set jake as unverified user
        before(function(done) {
            if(!jake.verification_key) {
                jake.verification_key = 'not verified!';
                jake.save(done);
            } else {
                done();
            }
        });

        it('should return valid key on valid email', function(done) {
            finn.passwordResetRequest(finn.email, function(err, key) {
                assert.ok(!err);
                finn.passwordResetFinish(key, 'newpassword', function(err) {
                    assert.ok(!err);
                    done();
                });
            })
        });

        it('fail on bad email', function(done) {
            finn.passwordResetRequest('finn@mit', function(err, key) {
                assert.ok(err);
                done();
            })
        });

        it('fail on unverified account', function(done) {
            jake.passwordResetRequest(jake.email, function(err, key) {
                assert.ok(err);
                done();
            })
        });
    });

    describe('passwordResetFinish', function() {
        // set finn as verified user
        before(function(done) {
            if(finn.verification_key) {
                finn.verification_key = '';
                finn.save(done);
            } else {
                done();
            }
        });

        // reset finn password
        before(function(done) {
            finn.password = 'oldPassword';
            finn.save(done);
        });

        it('resets password on valid key', function(done) {
            finn.passwordResetRequest(finn.email, function(err, key) {
                assert.ok(!err);
                finn.passwordResetFinish(key, 'newPassword', function(err) {
                    assert.ok(!err);
                    finn.verifyPassword('newPassword', function(err, isMatch) {
                        assert.ok(!err);
                        assert.ok(isMatch);
                        done();
                    });
                });
            })
        });

        it('reject invalid key', function(done) {
            finn.passwordResetFinish('blah blah', 'newPassword', function(err, key) {
                assert.ok(err);
                done();
            })
        });
    });

});
