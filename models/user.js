
/**
 * Created by ericmanzi on 11/19/15.
 * Lead author: Eric Manzi
 * Other authors: Favyen Bastani
 * USER MODEL
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Project = require('../models/project'),
    Post = require('../models/post'),
    utils = require('../utils/utils'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,  // We use the salt to prevent rainbow table attacks and to
                            // resist brute-force attacks in the event that someone
                            // has gained access to your database
    STRING_LENGTH = 16;

var userSchema = mongoose.Schema({
    username: {type: String, unique: true}, // restring username to a single user
    email: {type: String, unique: true}, // restricting email to a single user
    password: {type: String},
    verification_key: {type: String}, // key created when user first registers, checked with key sent when user activates account
    pwreset_key: {type: String},
    favorites: Array, // array of project ids identifying projects this user has favorited
    following: Array, // array of usernames identifying users this user follows
    profile_picture: String // a string referencing location of this user's profile picture
});

// --Contains borrowed code-- Source: http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
// This middleware automatically hashes the password before it is saved to the database
// We also generate a verification key if none exists.
userSchema.pre('save', function(next) {
    var user = this;
    // set verification key if not set
    if (user.verification_key === undefined) {
        user.verification_key = utils.randString(STRING_LENGTH);
    }
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

var usernameRegex = /^\w+$/; // username can't be an empty string
var passwordRegex = /\s+/g; // passwords cannot be empty or have empty spaces
// must be a **.mit.edu or @mit.edu email. --Some borrowed code-- Source: http://stackoverflow.com/a/46181
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,50}\.)*mit.edu$/i;

userSchema.path('username').validate(function(value) {
    return usernameRegex.test(value);
}, 'Invalid username: usernames must not be empty and must contain only numbers letters and underscores');

userSchema.path('email').validate(function(value) {
    return emailRegex.test(value);
}, 'Invalid email: email must be a valid MIT.edu email');

userSchema.path('password').validate(function(value) {
    return !passwordRegex.test(value);
}, 'Invalid password: passwords cannot be empty or contain spaces');


/**
 * Find the user that matches the given username
 * @param name
 * @param callback
 */
userSchema.statics.findByUsername = function(name, callback) {
    this.findOne({ username: { $regex : new RegExp(name, "i") } } , function(err, user) {
        if (user) callback(null, user);
        else callback({msg: 'No such username.'});
    });
};

/**
 * Check that the given email address is unique
 * @param emailAddr
 * @param callback
 */
userSchema.statics.isEmailUnique = function(emailAddr, callback) {
    this.findOne({ email: emailAddr }, function(err, user) {
        if (user) callback(null, 'That email is already in use by another account.');
        else callback({msg: 'That email does not exist.'});
    });
};

/**
 * Verifies that the provided password matches the given username
 * @param candidatepw
 * @param callback
 */
userSchema.methods.verifyPassword = function(candidatepw, callback) {
    bcrypt.compare(candidatepw, this.password, function(err, isMatch) {
        if (err) callback(err);
        else callback(null, isMatch);
    });
};

/**
 * Returns true if the user's account is verified, and false otherwise.
 */
userSchema.methods.isVerified = function() {
    return this.verification_key === '';
    //uncomment this line to test with fake mit emails
    //return true
};


/**
 * Finds all the projects by this user
 * @param callback
 */
userSchema.methods.getMyProjects = function(callback) {
    Project.find({owner:this.username}, function(err, myProjects) {
        if (err) {
            callback({ msg: 'Something went wrong while retrieving your projects'});
        }
        callback(null, myProjects);
    });
};


/**
 * Adds a project to this user's list of favorites
 * @param projectID
 * @param callback
 */
userSchema.methods.favorite = function(projectID, callback) {
    var user = this;
    Project.findOne({ _id: projectID }, function(err, project) {
        if (project.owner === user.username) {
            callback({msg: 'Cannot favorite own project'});
        } else {
            if ( user.favorites.indexOf(projectID) === -1 ) {
                user.favorites.push(projectID);
                user.save(function(err,savedUser) {
                    callback(null);
                });
            } else {
                callback({msg: 'This project has already been favorited'});
            }
        }
    });
};


/**
 * Removes project identified by projectID from this user's list of favorites
 * @param projectID
 * @param callback
 */
userSchema.methods.unfavorite = function(projectID, callback) {
    var user = this;
    Project.findOne({ _id: projectID }, function(err, project) {
        if (err) {
            callback({msg: 'Invalid project.'});
        } else {
            var projectIndex = user.favorites.indexOf(projectID);
            if ( projectIndex === -1 ) {
                callback({msg: 'This project is not among your favorites.'});
            } else {
                user.favorites.splice(projectIndex, 1);
                user.save(callback);
            }
        }
    });
};

/**
 * Return this users list of favorite projects
 * @param callback
 */
userSchema.methods.getFavorites = function(callback) {
    User.findOne({_id: this._id}, function(err, user) { // reload user so that we get up-to-date favorites array
        if(err) {
            callback({msg: 'Invalid user'});
        } else {
            Project.find({'_id': { $in: user.favorites }}, function(err, favorites) {
                if (err) {
                    callback({ msg: 'Something went wrong while retrieving your projects'});
                } else {
                    callback(null, favorites);
                }
            });
        }
    });
};

/**
 * Return this users list of favorite project ids
 */
userSchema.methods.getFavoritesIdList = function() {
    return this.favorites;
};


/**
 * current user follows the user identified by the given username
 * @param username
 * @param callback
 */
userSchema.methods.follow = function(username, callback) {
    var user = this;
    if (user.following.indexOf(username) === -1 ) {
        user.following.push(username);
        user.save(function(err,savedUser) {
            callback(null);
        });
    } else {
        callback({msg: 'You are already following this user.'});
    }
};


/**
 * current user unfollows the user identified by the given username
 * @param username
 * @param callback
 */
userSchema.methods.unfollow = function(username, callback) {
    var user = this;
    var userIndex = user.following.indexOf(username);
    if ( userIndex === -1 ) {
        callback({msg: 'You are not following this user.'});
    } else {
        user.following.splice(userIndex, 1);
        user.save(function(err,savedUser) {
            callback(null);
        });
    }
};

/**
 * Check if currentUser is following otherUser
 * @param currentUser
 * @param otherUser
 * @param callback
 */
userSchema.statics.isFollowing = function(currentUser, otherUser, callback) {
    User.findByUsername(currentUser, function(err, found_current_user) {
        if (err) callback({ msg: "Current username: "+err.msg });
        else {
            User.findByUsername(otherUser, function(err, found_other_user) {
                if (err) callback({ msg: 'The user you are trying to follow does not exist.'});
                else {
                    var following = found_current_user.following.indexOf(otherUser) !== -1;
                    callback(null, following);
                }
            });
        }
    })
};

/**
 * Return this user's profile picture link
 * @returns {*|string}
 */
userSchema.methods.getProfilePicture = function() {
    return this.profile_picture;
};

/**
 * Set this user's profile picture link to the provided link
 * @param picture_url
 * @param callback
 */
userSchema.methods.setProfilePicture = function(picture_url, callback) {
    var user = this;
    user.profile_picture = picture_url;
    user.save(function(err) {
        callback(null);
    });
};

/**
 * Request a password reset.
 * @param email the user's email address to validate
 * @param callback a callback function(err, key)
 *   key is the password reset key that should be e-mailed to the user.
 */
userSchema.methods.passwordResetRequest = function(email, callback) {
    var user = this;
    if(email !== user.email) {
        callback({msg: 'Incorrect e-mail address'});
        return;
    } else if(!user.isVerified()) {
        callback({msg: 'Your account has not been verified'});
        return;
    }
    user.pwreset_key = utils.randString(STRING_LENGTH);
    user.save(function(err) {
        if(err) {
            callback({msg: 'Something went wrong while requesting the password reset'});
        } else {
            callback(null, user.pwreset_key);
        }
    });
};

/**
 * Complete a password reset.
 * @param key the password reset key, from passwordResetRequest
 * @param callback a callback function(err)
 */
userSchema.methods.passwordResetFinish = function(key, password, callback) {
    var user = this;
    if(key !== user.pwreset_key) {
        callback({msg: 'Invalid password reset key'});
        return;
    }
    user.password = password;
    user.pwreset_key = '';
    user.save(function(err) {
        if(err) {
            callback({msg: err.msg});
        } else {
            callback(null);
        }
    });
};

var User = mongoose.model("User", userSchema);

module.exports = User;
