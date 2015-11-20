var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Project = require('../models/project')

/*
  GET /projects/:projID
  Request parameters:
    - tweet: the unique ID of the project
  Response:
    - success: true if the server succeeded in getting the project
    - content: on success, the project object with ID equal to the project referenced in the URL
    - err: on failure, an error message
*/
router.get('/:projID', function(req, res) {
	Project.getProject(req.params.projID, function(err, foundProject){
		if (err){
			utils.sendErrResponse(err);
		} else {
			res.render('project', {project : foundProject});
		}
	});
});

module.exports = router;