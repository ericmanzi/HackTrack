// Lead author: Favyen Bastani <fbastani@mit.edu>

var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Project = require('../models/project');

var DEFAULT_TAG_COUNT = 7; //the number of tags to return defaults to 7
var MAX_TAG_COUNT = 100;
/*
    GET /tags
    Request parameters:
    - count: the number of tags to return (defaults to 7, and maximum is 100)
    Response:
    - success: true if the server succeeded in getting all the tags
    - content: an array of string tags
    - err: on failure, an error message
*/
router.get('/', function(req, res) {
    var count = DEFAULT_TAG_COUNT;
    if(req.query.count) {
        var queryCount = parseInt(req.query.count);
        if(queryCount > 0 && queryCount <= MAX_TAG_COUNT) {
            count = queryCount;
        }
    }
    Project.getTags(count, function(err, tags) {
        if(err){
            utils.sendErrResponse(err);
        } else {
            utils.sendSuccessResponse(res, tags);
        }
    });
});

module.exports = router;
