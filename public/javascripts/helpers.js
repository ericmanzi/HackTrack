// Packaged helper methods.
//
// Here, just one which takes the content of an HTML
// form (passed in as an argument) and converts the
// data to a set of key-value pairs for use in AJAX
// calls. Also includes the CSRF token.
var helpers = (function() {

    var _helpers = {};

    _helpers.getFormData = function(form) {
        var inputs = {};
        $(form).serializeArray().forEach(function(item) {
            inputs[item.name] = item.value;
        });
        inputs['csrftoken'] = getCSRFToken();
        return inputs;
    };

    Object.freeze(_helpers);
    return _helpers;

})();
