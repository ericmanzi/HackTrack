var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Project = require('../models/project');

/*
 GET /
 No request parameters
 Response:
 - success: true if the server succeeded in getting the all the projects
 - content: on success, an array with project objects, every project object contains
 title : {type: String, required : true},
 description : {type: String, required : true},
 owner : {type: String, required : true},
 imageLinks : [String],
 videoIDs : [String],
 upvoterIDs : [String],
 tags : [String],
 date : {type : Date, default: Date.now, required : true}
 - err: on failure, an error message
 */
router.get('/', function(req, res) {
	res.render('index');
});

module.exports = router;
