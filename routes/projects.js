var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Project = require('../models/project');

/*
  GET /projects/:projID
  Request parameters:
    - tweet: the unique ID of the project
  Response:
    - success: true if the server succeeded in getting the project
    - content: on success, the project object with ID equal to the project referenced in the URL
    - err: on failure, an error message
*/
router.get('/', function(req, res) {
	Project.getAllProjects(function(err, foundProjects){
		if (err){
			utils.sendErrResponse(err);
		} else {
			utils.sendSuccessResponse(res, {projects : foundProjects});
		}
	});
});


/*
  POST /projects
  Request body:
    - content: the content of the project
  Response:
    - success: true if the server succeeded in recording the user's project
    - err: on failure, an error message
*/
router.post('/', function(req, res) {
	var imageLinksList = req.body.imageLinks.split(/\s*,\s*/);
	var projectJSON = {
		title : req.body.title,
		description : req.body.description,
		owner : "kairat",
		imageLinks : imageLinksList,
		upvoterIDs : [],
		tags : [],
		date : new Date()
	};
  	Project.createNewProject(projectJSON, function(err) {
    	if (err) {
     		utils.sendErrResponse(res, 500, 'An unknown error occurred.');
    	} else {
      		utils.sendSuccessResponse(res);
    	}
  	});
});


module.exports = router;