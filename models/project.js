// Lead author: Kairat Ashim <kairat@mit.edu>

var mongoose = require('mongoose');
var moment = require('moment');
var async = require('async');
var Activity = require('./activity.js');
var common = require('./common.js');

var TRENDING_INTERVAL = 7;

// Define a schema for a Project. Each project will have a unique ID
var projectSchema = mongoose.Schema({
	title : {type: String, required : true},
	description : {type: String, required : true},
	owner : {type: String, required : true},
	imageLinks : [String],
	videoIDs : [String],
	upvoterUsernames : [String],
	tags : [String],
	date : {type : Date, default: Date.now, required : true, index: true}
});


///////////////// - START - STATIC METHODS OF THE projectSchema /////////////////////

/**
	Static method for creating a new Project document and adding to the Projcts collection
	@param {object} project object
	@param {function} a callback function
*/
projectSchema.statics.createNewProject = function(projectJSONobject, callback){
	// make tags lowercase
	if(projectJSONobject.tags) {
		projectJSONobject.tags = projectJSONobject.tags.map(function(str) {
			return str.toLowerCase();
		});
	}

	// add project to database
	var newProject = new Project(projectJSONobject);
	newProject.save(function(error, project){
		if (error){
			callback(error);
		} else {
			callback(null);
		}
	});
}

/**
	Static method for upvoting a specific project by a specific user
	@param {String} id of the project to be upvoted
	@param {String} id of the user that is upvoting the project
	@param {function} a callback function
*/
projectSchema.statics.upvoteProject = function(projectId, username, callback){
	this.findOne({_id : projectId}, function(err, foundProject){
		if (err){
			callback(err);
		} else {
			if (foundProject){
				foundProject.upvoteProjectMethod(username, callback);
			} else {
				callback({projectNotFound : true});
			}
		}
	});
};

/**
	Static method for retrieving all the projects from the database
	@param {function} a callback function
*/
projectSchema.statics.getAllProjects = function(callback){
	this.find(function(err, foundProjectsList){
		if (err){
			callback(err);
		} else {
			foundProjectsList.sort(projectsSort);
			callback(null, foundProjectsList);
		}
	})
}

/**
	Static method for retrieving trending projects.
	Returns projects for a TRENDING_INTERVAL-day period, ending at the specified last day.
	@param {Integer} the index of the last day to retrieve projects for, relative to today
	@param {String} a tag to filter by; returned projects must be associated with this tag
		if tag is empty, the filter is ignored
	@param {String} a string filter; returned projects must match the string in the title or description
		the string filter is case-insensitive
		if the string filter is empty, it is ignored
	@param {function} a callback function(err, projects)
		projects is a list of objects of the form {date, prettyDate, projects}
		the nested projects contains projects on that day sorted by upvotes
*/
projectSchema.statics.getTrendingProjects = function(dayIndex, tag, strFilter, callback) {
	// populate a list of Date ranges for each day in the desired range
	var todayEnd = moment().endOf('day');
	dateRanges = [];
	for(var i = 0; i < TRENDING_INTERVAL; i++) {
		var daysBehind = i + dayIndex;
		var startDate = moment(todayEnd).subtract(daysBehind + 1, 'days');
		var endDate = moment(todayEnd).subtract(daysBehind, 'days');
		dateRanges.push([startDate, endDate]);
	}
	async.map(dateRanges, function(dateRange, callback) {
		// construct query: include date, and also tag if not empty
		query = {date: {$gt: dateRange[0].toDate(), $lt: dateRange[1].toDate()}};
		if(tag) {
			query.tags = tag;
		}
		Project.find(query, function(err, projects) {
			if(err) {
				callback(err, undefined);
				return;
			}
			// apply string filter if it is set, by matching with title and description of each project
			if(strFilter) {
				var applyStrFilter = function(project) {
					return project.title.toLowerCase().indexOf(strFilter.toLowerCase()) != -1 ||
						project.description.toLowerCase().indexOf(strFilter.toLowerCase()) != -1;
				};
				projects = projects.filter(applyStrFilter);
			}
			projects.sort(projectsSortByVotes);
			callback(undefined, {
				date: dateRange[0],
				prettyDate: dateRange[0].format(common.DATE_FORMAT),
				projects: projects,
			});
		});
	}, callback);
};

/**
	Static method retrieving a project with a specific id
	@param {String} id of the project
	@param {function} a callback function
*/
projectSchema.statics.getProject = function(projectId, callback){
	this.findOne({_id : projectId}, function(err, foundProject){
		if (err){
			callback(err);
		} else {
			if (foundProject){
				callback(null, foundProject);
			} else {
				callback({projectNotFound : true});
			}
		}
	});
}

/**
	Static method for retrieving a list of popular tags.
	@param {Number} maximum number of tags to return
	@param {function} a callback function(err, tags)
		tags is an array of strings, each string being a tag
*/
projectSchema.statics.getTags = function(count, callback) {
	this.find({}, function(err, projects) {
		if(err) {
			callback(err);
			return;
		}
		var tagHits = {}; // map from tag string to matching project count
		projects.forEach(function(project) {
			if(project.tags) {
				project.tags.forEach(function(tag) {
					if(tagHits[tag] !== undefined) {
						tagHits[tag] = tagHits[tag] + 1;
					} else {
						tagHits[tag] = 0;
					}
				});
			}
		});
		var tagsByHits = Object.keys(tagHits).sort(function(a, b) {
			return tagHits[b] - tagHits[a];
		});
		if(tagsByHits.length > count) {
			tagsByHits = tagsByHits.slice(0, count);
		}
		callback(undefined, tagsByHits);
	});
};

///////////////// - END - STATIC METHODS OF THE projectSchema /////////////////////




//////////////// - START - INSTANCE METHODS OF INSTANCES OF THE USER MODEL////////////////////

/**
	Instance method for upvoting this by a specific user
	@param {String} id of the user that is upvoting this project
	@param {function} a callback function
*/
projectSchema.methods.upvoteProjectMethod = function(username, callback){
	if (!(this.upvoterUsernames.indexOf(username) > -1)){
		this.upvoterUsernames.push(username);
		this.save(function(error){
			if (error){
				callback(error);
			} else {
				callback(null);
			}
		});
	} else {
		// notfy the user that s/he has voted already or just keep silent???
		callback({alreadyVoted : true});
	}
};

//////////////// - END - INSTANCE METHODS OF INSTANCES OF THE USER MODEL////////////////////


///////////////////// - START - HELPER FUNCTIONS ////////////////////
/**
  Helper function for sorting array of tweets by date
*/
var projectsSort = function(t1, t2){
  var date1 = new Date(t1.date);
  var date2 = new Date(t2.date);
  if (date1 < date2){
    return 1;
  } else if (date1 === date2) {
    return 0;
  } else {
    return -1;
  }
};

/**
  Helper function for sorting array of projects by upvote count (descending).
*/
var projectsSortByVotes = function(a, b){
	var count1 = a.upvoterUsernames.length;
	var count2 = b.upvoterUsernames.length;
	return count2 - count1;
};

///////////////////// - END - HELPER FUNCTIONS ////////////////////


// Project model
var Project = mongoose.model('Project', projectSchema);

// Export the model
module.exports = Project;