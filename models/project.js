var mongoose = require('mongoose');

// Define a schema for a Project. Each project will have a unique ID
var projectSchema = mongoose.Schema({
	title : {type: String, required : true},
	description : {type: String, required : true},
	owner : {type: String, required : true},
	imageLinks : [String],
	videoIDs : [String],
	upvoterUsernames : [String],
	tags : [String],
	date : {type : Date, default: Date.now, required : true}
});


///////////////// - START - STATIC METHODS OF THE projectSchema /////////////////////

/**
	Static method for creating a new Project document and adding to the Projcts collection
	@param {object} project object
	@param {function} a callback function
*/
projectSchema.statics.createNewProject = function(projectJSONobject, callback){
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

///////////////////// - END - HELPER FUNCTIONS ////////////////////


// Project model
var Project = mongoose.model('Project', projectSchema);

// Export the model
module.exports = Project;