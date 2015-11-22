Handlebars.registerPartial('project', Handlebars.templates['project']);
Handlebars.registerPartial('navbar', Handlebars.templates['navbar']);
var currentUser = null;
var loadPage = function(template, data) {
    var projects = [{project:"project1", _id:1}, {project:"project2", _id:2}];
    data = data || {projects:projects};
    $('#main-container').html(Handlebars.templates[template](data));
};


var loadHomePage = function() {
    $.get('/projects', function(response) {

        var data = {
            user_logged_in: currentUser!==null,
            username: currentUser,
            projects: response.content.projects
        };
        console.log(JSON.stringify(data));
        loadPage('index', data);
    });
};

var loadProjectPage = function(id){
   //TODO make get request to get specific project
   loadPage('projectView', {})
}

var loadPostProjectPage = function(){
    loadPage('postProject', {});
}

$(document).ready(function() {
     $.get('/users/current', function(response) {
     	if (response.content.loggedIn) {
     		currentUser = response.content.user;
     		console.log("current gotten and user is "+currentUser)
     	}
     	loadHomePage();
     });
    loadHomePage();
});

$(document).on('click', '.project-link', function(evt) {
    evt.preventDefault();
    var item = $(this).parent();
    var id = item.data('project-id');
    loadProjectPage(id);
});

$(document).on('click', '.post-project', function(event){
    event.preventDefault();
    loadPostProjectPage();
});