var crypto = require('crypto');

// Source: Notes Demo App
// These methods abstract out the basic mechanism
// of creating server responses with some content
// (error code, message, etc.).
var utils = (function () {
    var _utils = {};

    /*
     Send a 200 OK with success:true in the request body to the
     response argument provided.
     The caller of this function should return after calling
     */
    _utils.sendSuccessResponse = function(res, content) {
        res.status(200).json({
            success: true,
            content: content
        }).end();
    };

    /*
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

    Object.freeze(_utils);
    return _utils;

})();

module.exports = utils;
