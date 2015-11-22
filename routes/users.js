
// Lead author: Eric Manzi (ermanzi@mit.edu)
// Users route: Handles all requests made to /users

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var utils = require('../utils/utils');

var STATUS_CODE_BAD_REQUEST = 400;
var STATUS_CODE_FORBIDDEN = 403;

/*
 For both login and create user, we want to send an error code if the user
 is logged in, or if the client did not provide a username and password
 This function returns true if an error code was sent; the caller should return
 immediately in this case.
 */
var isLoggedInOrInvalidBody = function(req, res) {
    if (req.currentUser) {
        utils.sendErrResponse(res, STATUS_CODE_FORBIDDEN, 'There is already a user logged in.');
        return true;
    } else if (!(req.body.username && req.body.password)) {
        utils.sendErrResponse(res, STATUS_CODE_BAD_REQUEST, 'Username or password not provided.');
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
            user.verifyPassword(req.body.password, function(err, match) {
                if (match) {
                    req.session.username = req.body.username;
                    utils.sendSuccessResponse(res, { user: req.body.username });
                } else {
                    utils.sendErrResponse(res, STATUS_CODE_FORBIDDEN, 'Invalid password.');
                }
            });
        } else {
            utils.sendErrResponse(res, STATUS_CODE_FORBIDDEN, err.msg);
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
        utils.sendErrResponse(res, STATUS_CODE_FORBIDDEN, 'There is no user currently logged in.');
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
        favorites: []
    };

    User.findByUsername(req.body.username, function(err, user) {
        if (err) {
            User.create(userObj, function(err, user) {
                utils.sendSuccessResponse(res, req.body.username);
            });
        } else {
            utils.sendErrResponse(res, STATUS_CODE_BAD_REQUEST, 'That username is already taken');
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
        utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser.username });
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
                utils.sendErrResponse(res, STATUS_CODE_BAD_REQUEST, err.msg);
            } else {
                user.favorite(req.body.projectID, function(err) {
                    if (err) {
                        utils.sendErrResponse(res, STATUS_CODE_BAD_REQUEST, err.msg);
                    } else {
                        utils.sendSuccessResponse(res);
                    }
                });
            }
        });
    } else {
        utils.sendErrResponse(res, STATUS_CODE_FORBIDDEN,
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
                utils.sendErrResponse(res, STATUS_CODE_BAD_REQUEST, err.msg);
            } else {
                user.unfavorite(req.body.projectID, function(err) {
                    if (err) {
                        utils.sendErrResponse(res, STATUS_CODE_BAD_REQUEST, err.msg);
                    } else {
                        utils.sendSuccessResponse(res);
                    }
                });
            }
        });
    } else {
        utils.sendErrResponse(res, STATUS_CODE_FORBIDDEN,
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
                utils.sendErrResponse(res, STATUS_CODE_BAD_REQUEST, err.msg);
            } else {
                utils.sendSuccessResponse(res, { favorites: user.getFavorites() });
            }
        });
    } else {
        utils.sendErrResponse(res, STATUS_CODE_FORBIDDEN,
            'There is no user currently logged in.');
    }
});


module.exports = router;


