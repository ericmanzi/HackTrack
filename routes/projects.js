// Lead author: Kairat Ashim <kairat@mit.edu>

var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Project = require('../models/project');
var User = require('../models/user');
var Post = require('../models/post');
var getYouTubeID = require('get-youtube-id');

/*
 GET /projects
 Request parameters:
 - trending: whether to get trending projects list
 - days: if trending, the day index relative to today (defaults to 0)
 - tag: optional tag to filter projects by (only supported if trending)
 - filter: optional string to filter projects by
           (based on title and description; only supported if trending)
 Response:
 - success: true if the server succeeded in getting all the projects
 - content: on success, the list of projects
 - err: on failure, an error message
 */
router.get('/', function(req, res) {
    if(req.query.trending) {
        var dayIndex = 0;
        if(req.query.days) {
            dayIndex = parseInt(req.query.days);
        }
        Project.getTrendingProjects(dayIndex, req.query.tag, req.query.filter, function(err, projects){
            if (err){
                utils.sendErrResponse(err);
            } else {
                utils.sendSuccessResponse(res, {projects: projects});
            }
        });
    } else {
        Project.getAllProjects(function(err, foundProjects){
            if (err){
                utils.sendErrResponse(err);
            } else {
                utils.sendSuccessResponse(res, {projects : foundProjects});
            }
        });
    }
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
        var imageLinksList = utils.arrayFromRequestString(req.body.imageLinks);
        var tagsList = utils.arrayFromRequestString(req.body.tags);
        var videoID = getYouTubeID(req.body.videoLink);
        var projectJSON = {
            title: req.body.title,
            description: req.body.description,
            owner: req.currentUser.username,
            imageLinks: imageLinksList,
            upvoterUsernames: [],
            videoID : videoID,
            tags: tagsList,
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
    var response = {};
    Project.getProject(req.params.projID, function(err, foundProject){
        if (err){
            if (err.projectNotFound){
                utils.sendErrResponse(res, 404, 'Project not found');
            } else {
                utils.sendErrResponse(res, 500, 'An unknown error occurred.');
            }
        } else {
            response.project = foundProject;
            Post.getDiscussions(foundProject.id, function(err, discussions) {
                if (err){
                    utils.sendErrResponse(res, 500, 'Error retrieving project: ' + err.message + '.');
                } else {
                    response.discussions = discussions;
                    User.findOne(req.currentUser, function(err, user) {
                        if (user) {
                            var favorites = user.getFavoritesIdList();
                            if (favorites.length>0) {
                                var pIndex = favorites.indexOf(req.params.projID);
                                response.favorited = (pIndex!==-1);
                            }
                        }
                        utils.sendSuccessResponse(res, response);
                    });
                }
            });
        }
    });
});

/*
 POST /projects/edit/:projID
 Request body:
 - content: projectID
 Response:
 - success: true if the server succeeded in updating a project
 - err: on failure, an error message
 */
router.post('/:projID/edit', function(req, res) {
    if (!req.currentUser) { // Require authentication to use this feature
        utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
    } else {
        var imageLinksList = [];
        if (req.body.imageLinks !== ""){
            imageLinksList = req.body.imageLinks.split(/\s*,\s*/);
        }

        var tagsList = [];
        if (req.body.tags !== ""){
            tagsList = req.body.tags.split(/\s*,\s*/);
        }
        var videoID = getYouTubeID(req.body.videoLink);
        var projectJSON = {
            title: req.body.title,
            description: req.body.description,
            imageLinks: imageLinksList,
            videoID : videoID,
            tags: tagsList,
        };

        Project.updateProject(projectJSON, req.params.projID, req.currentUser.username, function(err){
            if (err){

                if (err.projectNotFound){
                    utils.sendErrResponse(res, 404, 'Project not found.');
                } else {
                    utils.sendErrResponse(res, 500, 'An unknown error occurred.');
                }
            } else {
                utils.sendSuccessResponse(res);
            }
        })
    }
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

/*
 POST /projects/:projID/discussion
 Adds a discussion to a project.
 Request body:
 - content: the textual content for the discussion
 Response:
 - success: if the server succeeded in adding the discussion
 - err: on failure, an error message
 */
router.post('/:projID/discussion', function(req, res) {
    if (!req.currentUser) { // Require authentication to use this feature
        utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
    } else {
        Post.addDiscussion(req.params.projID, req.currentUser.id, req.body.content, function(err, discussion){
            if (err){
                utils.sendErrResponse(res, 500, 'Error adding discussion: ' + err.message + '.');
            } else {
                utils.sendSuccessResponse(res, {discussion: discussion});
            }
        });
    }
});

/*
 POST /projects/:projID/discussions/:discussionID/comment
 Adds a comment to a discussion.
 Request body:
 - content: the textual content for the comment
 Response:
 - success: if the server succeeded in adding the comment
 - err: on failure, an error message
 */
router.post('/:projID/discussions/:discussionID/comment', function(req, res) {
    if (!req.currentUser) { // Require authentication to use this feature
        utils.sendErrResponse(res, 403, 'Must be logged in to use this feature.');
    } else {
        Post.addComment(req.params.projID, req.params.discussionID, req.currentUser.id, req.body.content, function(err, comment){
            if (err){
                utils.sendErrResponse(res, 500, 'Error adding comment: ' + err.message + '.');
            } else {
                utils.sendSuccessResponse(res, {comment: comment});
            }
        });
    }
});


module.exports = router;
