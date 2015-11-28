
// Lead author: Eric Manzi (ermanzi@mit.edu)
// Users route: Handles all requests made to /users

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var utils = require('../utils/utils');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


var transport = nodemailer.createTransport((smtpTransport({
    service: "gmail",
    auth: {
        user: "hacktrack.mit@gmail.com",
        pass: "iamhacktrack"
    }
})));

/*
 For both login and create user, we want to send an error code if the user
 is logged in, or if the client did not provide a username and password
 This function returns true if an error code was sent; the caller should return
 immediately in this case.
 */
var isLoggedInOrInvalidBody = function(req, res) {
    if (req.currentUser) {
        utils.sendErrResponse(res, utils.STATUS_CODE_FORBIDDEN, 'There is already a user logged in.');
        return true;
    } else if (!(req.body.username && req.body.password)) {
        utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, 'Username or password not provided.');
        return true;
    }
    return false;
};


/*
 This function will check to see that the provided username-password combination
 is valid. For empty username or password, or if the combination is not correct,
 an error will be returned.

 A user already logged in is not allowed to call the login API again; an attempt
 to do so will result in an error code 403.

 POST /users/login
 Request body:
 - username
 - password
 Response:
 - success: true if login succeeded; false otherwise
 - content: on success, an object with a single field 'user', the object of the logged in user
 - err: on error, an error message
 */
router.post('/login', function(req, res) {
    if (isLoggedInOrInvalidBody(req, res)) return;

    User.findByUsername(req.body.username, function(err, user) {
        if (user) {
            if (user.verified) {
                user.verifyPassword(req.body.password, function(err, match) {
                    if (match) {
                        req.session.username = req.body.username;
                        utils.sendSuccessResponse(res, { user: user.username });
                    } else {
                        utils.sendErrResponse(res, utils.STATUS_CODE_FORBIDDEN, 'Invalid password.');
                    }
                });
            } else {
                utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, 'Your account has not been verified');
            }
        } else {
            utils.sendErrResponse(res, utils.STATUS_CODE_FORBIDDEN, err.msg);
        }
    });

});


/*
 POST /users/logout
 Request body: empty
 Response:
 - success: true if logout succeeded; false otherwise
 - err: on error, an error message
 */
router.post('/logout', function(req, res) {
    if (req.currentUser) {
        req.session.destroy();
        utils.sendSuccessResponse(res);
    } else {
        utils.sendErrResponse(res, utils.STATUS_CODE_FORBIDDEN, 'There is no user currently logged in.');
    }
});



/*
 Create a new user in the system.

 All usernames in the system must be distinct. If a request arrives with a username that
 already exists, the response will be an error with code 400.
 This route may only be called accessed without an existing user logged in. If an existing user
 is already logged in, it will result in an error code 403.
 Does NOT automatically log in the user.

 POST /users
 Request body:
 - username
 - password
 Response:
 - success: true if user creation succeeded; false otherwise
 - err: on error, an error message
 */
router.post('/', function(req, res) {
    if (isLoggedInOrInvalidBody(req, res)) return;

    var userObj = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        favorites: [],
        verified: false,
        following: [],
        profile_picture: "https://www.whitehouse.gov/sites/whitehouse.gov/files/images/Administration/People/president_official_portrait_hires.jpg"
    };

    User.findByUsername(req.body.username, function(err, user) {
        if (err) {
            User.isEmailUnique(req.body.email, function(err, msg) {
                if (err) {
                    User.create(userObj, function(err, user) {
                        if (err) {
                            var errorMsg="";
                            if (err.errors.username) errorMsg+=err.errors.username.message+". ";
                            if (err.errors.email) errorMsg+=err.errors.email.message+". ";
                            if (err.errors.password) errorMsg+=err.errors.password.message+".";

                            utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, errorMsg);
                        } else {
                            utils.sendSuccessResponse(res, req.body.username);

                            /*-----------------START Send verification email--------------------*/
                            var mailOptions={
                                from: "MIT Hacktrack \<hacktrack.mit@gmail.com\>",
                                to : req.body.email,
                                subject : "Verify your account with MIT HackTrack",
                                text: "Thanks for signing up to use MIT HackTrack! \r\n"+
                                "Please go to the link below to activate your account:\r\n"+
                                "hacktrack-mit.herokuapp.com/users/something...\r\n"+
                                "The MIT Hacktrack team\r\n"+"hacktrack-mit.herokuapp.com",
                                html : "Thanks for signing up to use MIT HackTrack!<br/>"+
                                "Please click the link below to activate your account: <br/>"+
                                "<a href='http://localhost:3000/users/activate?username="+user.username+
                                "&key="+user.password+"'>Verify your account</a>"+
                                "<br/><br/>The MIT Hacktrack team<br/>"+
                                "<a href='hacktrack-mit.herokuapp.com'>hacktrack-mit.herokuapp.com</a>" //TODO: back to heroku
                            };
                            transport.sendMail(mailOptions, function(error, info){
                                if(error){
                                    console.log(error);
                                } else {
                                    console.log('Message sent: ' + info.response);
                                }
                            });
                            /*-----------------END Send verification email--------------------*/

                        }
                    });
                } else {
                    utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, msg);
                }
            });
        } else {
            utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, 'That username is already taken');
        }
    });
});


/*
 Activate this user's account

 GET /users/activate
 Request parameters: username, key
 Response:
 - success.verified: true if the key matches the username. The user is the
                     saved as verified in the db and logged into the app
 - error msg: if the key does not match the username
 */
router.get('/activate', function(req, res) {
    var username = req.query.username;
    var key = req.query.key;
    //console.log("username: "+username);
    //console.log("key: "+key);

    User.findByUsername(username, function (err, user) {
        if (err) {
            utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, 'Error verifying account: Invalid username');
        } else {
            if (user.password===key) {
                console.log("session: "+req.session.username);
                req.session.username = username;
                console.log("session: "+req.session.username);

                user.verified=true;
                res.render('index');
                user.save();
            } else {
                utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, 'Error verifying account: Invalid key');
            }
        }
    });
});


/*
 Determine whether there is a current user logged in

 GET /users/current
 Request body: empty
 Response:
 - success.loggedIn: true if there is a user logged in; false otherwise
 - success.user: if success.loggedIn, the currently logged in user
 */
router.get('/current', function(req, res) {
    if (req.currentUser) {
        User.findByUsername(req.currentUser.username, function(err, user) {
            var profile = {
                profile_picture: user.profile_picture,
                loggedIn : true,
                user : req.currentUser.username
            };
            utils.sendSuccessResponse(res, profile);
        });
    } else {
        utils.sendSuccessResponse(res, { loggedIn : false });
    }
});

/*
 Add the given project to user's favorites

 POST /users/favorites
 Request body:
 - projectID
 Response:
 - success
 - error msg: if user tries to favorite own or already favorited project
 */
router.post('/favorites', function(req, res) {
    if (req.currentUser) {
        User.findByUsername(req.currentUser.username, function(err, user) {
            if (err) {
                utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, err.msg);
            } else {
                user.favorite(req.body.projectID, function(err) {
                    if (err) {
                        utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, err.msg);
                    } else {
                        utils.sendSuccessResponse(res);
                    }
                });
            }
        });
    } else {
        utils.sendErrResponse(res, utils.STATUS_CODE_FORBIDDEN,
            'There is no user currently logged in.');
    }
});



/*
 Remove the given project from user's favorites

 DELETE /users/favorites
 Request body:
 - projectID
 Response:
 - success
 - error msg: unfavoriting project that wasn't favorited
 */
router.delete('/favorites', function(req, res) {
    if (req.currentUser) {
        User.findByUsername(req.currentUser.username, function(err, user) {
            if (err) {
                utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, err.msg);
            } else {
                user.unfavorite(req.body.projectID, function(err) {
                    if (err) {
                        utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, err.msg);
                    } else {
                        utils.sendSuccessResponse(res);
                    }
                });
            }
        });
    } else {
        utils.sendErrResponse(res, utils.STATUS_CODE_FORBIDDEN,
            'There is no user currently logged in.');
    }
});


/*
 Get this user's favorite projects

 GET /users/favorites
 Request body: empty
 Response:
 - success: true if the server succeeded in finding the user's favorites
 - content: all of this user's favorite projects
 - error msg:   error status code 400 if there was an error retrieving the
 user's favorite projects.
 error status code 403 if user isn't authenticated
 */
router.get('/favorites', function(req, res) {
    if (req.currentUser) {
        User.findByUsername(req.currentUser.username, function(err, user) {
            if (err) {
                utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, err.msg);
            } else {
                user.getFavorites(function(err, favorites) {
                    if (err) {
                        utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, err.msg);
                    } else {
                        utils.sendSuccessResponse(res, { projects: favorites });
                    }
                });
            }
        });
    } else {
        utils.sendErrResponse(res, utils.STATUS_CODE_FORBIDDEN,
            'There is no user currently logged in.');
    }
});



/*
 Get the current user's projects

 GET /users/myprojects
 Request body: empty
 Response:
 - success: true if the server succeeded in finding the user's projects
 - content: all of this user's projects
 - error msg:   error status code 400 if there was an error retrieving the
 user's projects.
 error status code 403 if user isn't authenticated
 */
router.get('/myprojects', function(req, res) {
    if (req.currentUser) {
        User.findByUsername(req.currentUser.username, function(err, user) {
            if (err) {
                utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, err.msg);
            } else {
                user.getMyProjects(function(err, myprojects) {
                    if (err) {
                        utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, err.msg);
                    } else {
                        utils.sendSuccessResponse(res, { projects: myprojects });
                    }
                });
            }
        });
    } else {
        utils.sendErrResponse(res, utils.STATUS_CODE_FORBIDDEN,
            'There is no user currently logged in.');
    }
});


/*
 Get this user's favorite projects

 GET /users/favorites
 Request body: empty
 Response:
 - success: true if the server succeeded in finding the user's favorites
 - content: all of this user's favorite projects
 - error msg:   error status code 400 if there was an error retrieving the
 user's favorite projects.
 error status code 403 if user isn't authenticated
 */
router.get('/favorites', function(req, res) {
    if (req.currentUser) {
        User.findByUsername(req.currentUser.username, function(err, user) {
            if (err) {
                utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, err.msg);
            } else {
                user.getFavorites(function(err, favorites) {
                    if (err) {
                        utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, err.msg);
                    } else {
                        utils.sendSuccessResponse(res, { projects: favorites });
                    }
                });
            }
        });
    } else {
        utils.sendErrResponse(res, utils.STATUS_CODE_FORBIDDEN,
            'There is no user currently logged in.');
    }
});


/*
 Get this user's projects

 GET /users/profiles/:username
 Request body: empty
 Response:
 - success: true if the server succeeded in finding the user's projects
 - content: all of this user's projects
 - error msg:   error status code 400 if there was an error retrieving the
 user's projects.
 error status code 403 if user isn't authenticated
 */
router.get('/profiles/:username', function(req, res) {
    User.findByUsername(req.params.username, function(err, user) {
        if (err) {
            utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, err.msg);
        } else {
            user.getMyProjects(function(err, userProjects) {
                if (err) {
                    utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, err.msg);
                } else {
                    utils.sendSuccessResponse(res, { projects: userProjects });
                }
            });
        }
    });
});

/*
 Change this user's profile picture

 POST: /users/profile_picture
 Request body:
 - username
 - profile picture link
 Response:
 - success: true if saving the profile picture succeeded
 - err: on error, an error message
 */
router.post('/profile_picture', function(req, res) {
    if (req.currentUser) {
        console.log("username:"+req.body.username);
        console.log("url:"+req.body.profile_pic_url);
        User.findByUsername(req.body.username, function(err, user) {
            if (err) {
                utils.sendErrResponse(res, utils.STATUS_CODE_BAD_REQUEST, 'Invalid username');
            } else {
                user.profile_picture = req.body.profile_pic_url;
                user.save(function(err, user) {
                    utils.sendSuccessResponse(res);
                });
            }
        });
    } else {
        utils.sendErrResponse(res, utils.STATUS_CODE_FORBIDDEN, 'There is no user currently logged in.');
    }
});


module.exports = router;


