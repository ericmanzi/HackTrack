// CSRF protection middleware
// Generates and sets CSRF token cookie if not set in request
var utils = require('../utils/utils');
var STATUS_CODE_BAD_REQUEST = 400;
var SAFE_METHODS = {'GET': true, 'HEAD': true};
module.exports = function(req, res, next) {
    if((!req.body.csrftoken && !SAFE_METHODS[req.method]) ||
        (req.body.csrftoken && req.cookies.csrftoken !== req.body.csrftoken)) {
        utils.sendErrResponse(res, STATUS_CODE_BAD_REQUEST, 'Invalid CSRF token');
        return;
    }
    if(!req.cookies.csrftoken) {
        res.cookie('csrftoken', utils.randString(32));
    }
    next();
};
