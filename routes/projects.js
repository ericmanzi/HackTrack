var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Project = require('../models/project');

/*
 GET /projects
 Request parameters:
 - tweet: none
 Response:
 - success: true if the server succeeded in getting all the projects
 - content: on success, the list of projects
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
    if (!req.currentUser) { // Require authentication to use this feature
        utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
    } else {
        var imageLinksList = req.body.imageLinks.split(/\s*,\s*/);
        var projectJSON = {
            title: req.body.title,
            description: req.body.description,
            owner: req.currentUser.username,
            imageLinks: imageLinksList,
            upvoterIDs: [],
            tags: [],
            date: new Date()
        };
        Project.createNewProject(projectJSON, function (err) {
            if (err) {
                utils.sendErrResponse(res, 500, 'An unknown error occurred.');
            } else {
                utils.sendSuccessResponse(res);
            }
        });
    }
});


/*
 GET /projects/:projID
 Request parameters:
 - projID: the unique ID of the project
 Response:
 - success: true if the server succeeded in getting the project
 - content: on success, the project object with ID equal to the project referenced in the URL
 - err: on failure, an error message
 */
router.get('/:projID', function(req, res) {
    Project.getProject(req.params.projID, function(err, foundProject){
        if (err){
            if (err.projectNotFound){
                utils.sendErrResponse(res, 404, 'Project not found');
            } else {
                utils.sendErrResponse(res, 500, 'An unknown error occurred.');
            }
        } else {
            utils.sendSuccessResponse(res, {project : foundProject});
        }
    });
});

/*
 POST /projects/:projID
 Request body:
 - content: projectID
 Response:
 - success: true if the server succeeded upvoting the project
 - err: on failure, an error message
 */
router.post('/:projID', function(req, res) {
    if (!req.currentUser) { // Require authentication to use this feature
        utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
    } else {
        Project.upvoteProject(req.params.projID, req.currentUser.username, function(err){
            if (err){
                if (err.projectNotFound){
                    utils.sendErrResponse(res, 404, 'Project not found.');
                } else if (err.alreadyVoted){
                    utils.sendErrResponse(res, 403, "You already voted for this project.")
                }else {
                    utils.sendErrResponse(res, 500, 'An unknown error occurred.');
                }
            } else {
                utils.sendSuccessResponse(res);
            }
        });
    }
});


module.exports = router;