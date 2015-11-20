// Lead author: Eric Manzi (ermanzi@mit.edu)
// User model

var mongoose = require('mongoose'),
    Project = require('../models/project'),
    Post = require('../models/post'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;  // We use the salt to prevent rainbow table attacks and to
                            // resist brute-force attacks in the event that someone
                            // has gained access to your database

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    email: String,
    password: String,
    favorites: Array
    //following: Array,

});

// This middleware automatically hashes the password before it is saved to the database
userSchema.pre('save', function(next) {
    var user = this;
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
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,66}\.)*mit.edu$/i; // must be a **.mit.edu or @mit.edu email

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
 * Verifies that the provided password matches the given username
 * @param username
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
 * Find the user that matches the given username
 * @param name
 * @param callback
 */
userSchema.statics.findByUsername = function(name, callback) {
    this.findOne({ username: name }, function(err, user) {
        if (err) callback({msg: 'Invalid user'});
        else callback(null, user);
    });
};

/**
 * Adds the new project to the given user's projects
 * @param username
 * @param project
 * @param callback
 */
userSchema.methods.createProject = function(projectObj, callback) {
    // TODO: check with Kairat
    //Project.createProject(userID, projectObj, function(err, project) {
    //    if (err) callback({msg: 'Invalid user'});
    //    else callback(null);
    //});
};

/**
 * Finds the project matching the given id
 * @param username
 * @param projectID
 * @param callback
 */
userSchema.statics.getProject = function(projectID, callback) {
    Project.findOne({_id:projectID}, function(err, project) {
        if (project) {
            callback(null, project);
        } else {
            callback({ msg: 'Invalid project.'});
        }
    });
};

/**
 * Finds all the projects ever made
 * @param callback
 */
userSchema.methods.getAllProjects = function(callback) {
    Project.find({}, function(err, allProjects) {
        callback(null, allProjects);
    });
};

/**
 * Finds all the projects by this user
 * @param username
 * @param callback
 */
userSchema.methods.getMyProjects = function(callback) {
    // TODO: check with Kairat
    Project.find({creator:this.id}, function(err, myProjects) {
        if (err) {
            callback({ msg: 'Something went wrong retrieving your projects'});
        }
        callback(null, myProjects);
    });
};

userSchema.methods.upvote = function(projectID, callback) {
    // TODO: check with Kairat
    //Project.findOne({_id: projectID}, function(err, project) {
    //    project.upvote(this.id, function(err, hasVoted) {
    //        if (err) callback(err);
    //        callback(null, hasVoted);
    //    });
    //});
};

/**
 * Adds a project to this user's list of favorites
 * @param projectID
 * @param callback
 */
userSchema.methods.favorite = function(projectID, callback) {
    if (this.favorites.findIndex(projectID)===-1) {
        this.favorites.push(projectID);
        callback(null);
    } else {
        callback({msg: 'This project has already been favorited'});
    }
};


var User = mongoose.model("User", userSchema);

module.exports = User;