var crypto = require('crypto');

// These methods abstract out the basic mechanism
// of creating server responses with some content
// (error code, message, etc.).
var utils = (function () {
    var _utils = {};

    _utils.STATUS_CODE_BAD_REQUEST = 400;
    _utils.STATUS_CODE_FORBIDDEN = 403;
    _utils.STATUS_CODE_SUCCESS = 200;
    /*
     --Borrowed code-- Source: Notes Demo App
     Send a 200 OK with success:true in the request body to the
     response argument provided.
     The caller of this function should return after calling
     */
    _utils.sendSuccessResponse = function(res, content) {
        res.status(_utils.STATUS_CODE_SUCCESS).json({
            success: true,
            content: content
        }).end();
    };

    /*
     --Borrowed code-- Source: Notes Demo App
     Send an error code with success:false and error message
     as provided in the arguments to the response argument provided.
     The caller of this function should return after calling
     */
    _utils.sendErrResponse = function(res, errcode, err) {
        res.status(errcode).json({
            success: false,
            err: err
        }).end();
    };

    // Generates a random string with the specified number of characters.
    // len: length of string to generate
    // chars: alphabet to choose characters from
    // If chars is not set, we default to alphanumeric alphabet.
    _utils.randString = function(len, chars) {
	    chars = chars || 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
	    var rnd = crypto.randomBytes(len);
	    var value = new Array(len);
	    for (var i = 0; i < len; i++) {
		    value[i] = chars[rnd[i] % chars.length];
	    }
	    return value.join('');
    };

    _utils.arrayFromRequestString = function(str) {
        return str.split(/\s*,\s*/).map(function(str) {
            return str.trim();
        }).filter(function(str) {
            return str !== '';
        });
    };

    Object.freeze(_utils);
    return _utils;

})();

module.exports = utils;
