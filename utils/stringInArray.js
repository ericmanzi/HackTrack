// Authors: Eric Manzi
/**
 * Returns true if string in array
 * @param array
 */
var inArray = function(array) {
    var str = this.toString();
    var filtered = array.filter(function(item) {
        return item===str;
    });
    return filtered.length > 0;
};

String.prototype.in = inArray;
