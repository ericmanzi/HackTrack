var utils = require('../utils/utils');

module.exports = function() {
    var _common = {};

    /*
    Middleware that fails if user is not logged in.
    */
    _common.requireAuthentication = function(req, res, next) {
        if (!req.currentUser) {
            utils.sendErrResponse(res, utils.STATUS_CODE_FORBIDDEN, 'You are not logged in.');
        } else {
            next();
        }
    };

    Object.freeze(_common);
    return _common;
}();
