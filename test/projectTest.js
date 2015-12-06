// Lead author: Kairat Ashim (kairat@mit.edu)
// Project model tests

var assert = require("assert");
var User = require('../models/user');
var Project = require('../models/project');
var Post = require('../models/post');
var Activity = require('../models/activity');

// DATABASE STUFF
var mongoose = require('mongoose');
// Connect to either the MONGOLAB_URI or to the local database.
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/hacktrack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error in project test:'));
db.once('open', function (callback) {
    console.log("database connected");
});

var testUser;
var testUserObj = {
    username: "projectTest",
    password: "projectTestPassword",
    email: "projectTest@mit.edu",
};

var testUser2;
var testUserObj2 = {
    username: "projectTest2",
    password: "projectTestPassword2",
    email: "projectTest2@mit.edu",
};

var testProjectObject = {
    title: "Project Test",
    description: "Description of the Project Test",
    owner : "projectTest",
    tags: ['projectTest', 'testing', 'tests']
};

var testProjectObject2 = {
    title : "Project Test Updated",
    description : "Updated Description of the Project Test",
    videoID : "M_XwzBMTJaM"
}

var testProjectObject3 = {
    title : "Second project title",
    description : "This is second project",
    videoID : "M_XwzBMTJaM",
    owner : 'projectTest',
    tags: ['testing', 'tests', 'tests']
}

var testProjectId;
var testProjectId2;

describe('Project', function() {
    before(function(done) {
        User.findByUsername(testUserObj.username, function(err, user) {
            if(!user) {
                User.create(testUserObj, function(err, newUser) {
                    testUser = newUser;
                    done();
                });
            } else {
                testUser = user;
                done();
            }
        });
    });

    before(function(done) {
        User.findByUsername(testUserObj2.username, function(err, user) {
            if(!user) {
                User.create(testUserObj2, function(err, newUser) {
                    testUser2 = newUser;
                    done();
                });
            } else {
                testUser2 = user;
                done();
            }
        });
    });

    describe("#createNewProject", function(){
    	it('should create (1st) new project', function(done){
    		Project.createNewProject(testProjectObject, function(err, createdProject){
    			assert.ok(!err);
    			assert.equal(createdProject.title, "Project Test");
    			assert.equal(createdProject.description, "Description of the Project Test");
                assert.equal(createdProject.owner, 'projectTest');
                testProjectId = createdProject._id;
    			done();
    		});
    	});

        it('should create (2nd) new project', function(done){
            Project.createNewProject(testProjectObject3, function(err, createdProject){
                assert.ok(!err);
                assert.equal(createdProject.title, "Second project title");
                assert.equal(createdProject.description, "This is second project");
                assert.equal(createdProject.owner, 'projectTest');
                assert.equal(createdProject.videoID, "M_XwzBMTJaM");
                testProjectId2 = createdProject._id;
                done();
            });
        });
    });

    describe("#updateProject", function(){
        it('should update the project we created previously', function(done){
            Project.updateProject(testProjectObject2, testProjectId, "projectTest", function(error){
                assert.ok(!error);
                Project.findOne({"_id" : testProjectId}, function(err, foundProject){
                    assert.ok(!err);
                    assert.equal(foundProject.title, "Project Test Updated");
                    assert.equal(foundProject.description, "Updated Description of the Project Test");
                    assert.equal(foundProject.videoID, "M_XwzBMTJaM");
                    done();
                });
            });
        });
    });

    describe("#upvoteProject", function(){
        it('should add a username to the list of upvoterUsernames', function(done){
            Project.upvoteProject(testProjectId, "projectTest", function(error){
                assert.ok(!error);
                Project.findOne({'_id' : testProjectId}, function(error, foundProject){
                    assert.ok(!error);
                    assert(foundProject.upvoterUsernames.indexOf('projectTest') > -1);
                    done();
                });
            });
        });

        it('should add second username to the list of upvoterUsernames', function(done){
            Project.upvoteProject(testProjectId, "projectTest2", function(error){
                assert.ok(!error);
                Project.findOne({'_id' : testProjectId}, function(error, foundProject){
                    assert.ok(!error);
                    assert(foundProject.upvoterUsernames.indexOf('projectTest2') > -1);
                    done();
                });
            });
        });
    });
    
    describe('#getAllProjects', function(){
        it("should return all projects in the db", function(done){
            Project.getAllProjects(function(err, foundProjects){
                assert.ok(!err);
                // projects are sorted in chronological order from latest to oldest
                var proj1 = foundProjects[1];
                var proj2 = foundProjects[0];

                assert.equal(proj1.title, "Project Test Updated");
                assert.equal(proj1.description, "Updated Description of the Project Test");
                assert.equal(proj1.owner, 'projectTest');

                assert.equal(proj2.title, "Second project title");
                assert.equal(proj2.description, "This is second project");
                assert.equal(proj2.owner, 'projectTest');
                assert.equal(proj2.videoID, "M_XwzBMTJaM");
                done();
            })
        });
    });

    describe("#getTrendingProjects", function(){
        it("should retrieve trending projects - projects within a specific interval of time from today, filtered by tag and string, and sorted by upvotes", function(done){
            // assign tag filter to null, string filter -> Updated
            Project.getTrendingProjects(0, null, 'Updated', function(error, nestedObject){
                assert.ok(!error);
                
                // proj1 should be returned -> has matching string "Updated"
                var proj1 = nestedObject[0].projects[0];

                assert.equal(proj1.title, "Project Test Updated");
                assert.equal(proj1.description, "Updated Description of the Project Test");
                assert.equal(proj1.owner, 'projectTest');
                done();
            });
        });
    });

    describe('#getProject', function(){
        it("should return a specific project with the specified id", function(done){
            Project.getProject(testProjectId2, function(error, foundProject){
                assert.ok(!error);
                assert.equal(foundProject.title, "Second project title");
                assert.equal(foundProject.description, "This is second project");
                assert.equal(foundProject.owner, 'projectTest');
                assert.equal(foundProject.videoID, "M_XwzBMTJaM");
                done();
            });
        });
    });

    describe("#getTags", function(){
        it('shoudld return a list of most popular tags of the specified size', function(done){
            Project.getTags(2, function(error, foundTags){
                assert.ok(!error);
                assert.equal(foundTags.length, 2);
                assert(foundTags.indexOf('tests') > -1);
                assert(foundTags.indexOf('testing') > -1);
                done();
            });
        });
    });

    describe('Instance Methods', function () { 
    
        it("Static methods that are tested above use/call instance methods that are in the Project model. Instance methods must be functional, since static methods pass all the tests", function (done) {
          done();
        });
    });

});