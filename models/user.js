
/**
 * Created by ericmanzi on 11/19/15.
 * Lead author: Eric Manzi
 * USER MODEL
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Project = require('../models/project'),
    Post = require('../models/post'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;  // We use the salt to prevent rainbow table attacks and to
                            // resist brute-force attacks in the event that someone
                            // has gained access to your database

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true}, // restrict email to a single user
    password: {type: String},
    favorites: Array
    //favorites: [{ type: Schema.ObjectId, ref: 'Project' }]
    //following: Array,
    //first_name: String,
    //last_name: String,
    //profile_pic_path: String
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
 * Find the user that matches the given username
 * @param name
 * @param callback
 */
userSchema.statics.findByUsername = function(name, callback) {
    this.findOne({ username: name }, function(err, user) {
        if (user) callback(null, user);
        else callback({msg: 'No such username.'});
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
            if ( user.favorites.findIndex(projectID) === -1 ) {
                user.favorites.push(projectID);
                callback(null);
            } else {
                callback({msg: 'This project has already been favorited'});
            }
        }
    });
};


/**
 * Removes a project from this user's list of favorites
 * @param projectID
 * @param callback
 */
userSchema.methods.unfavorite = function(projectID, callback) {
    var user = this;
    Project.findOne({ _id: projectID }, function(err, project) {
        if (err) {
            callback({msg: 'Invalid project.'});
        } else {
            var projectIndex = user.favorites.findIndex(projectID);
            if ( projectIndex === -1 ) {
                callback({msg: 'This project is not among your favorites.'});
            } else {
                user.favorites.splice(projectIndex, 1);
                callback(null);
            }
        }
    });
};


var User = mongoose.model("User", userSchema);

module.exports = User;


