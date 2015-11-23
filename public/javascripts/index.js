Handlebars.registerPartial('project', Handlebars.templates['project']);
Handlebars.registerPartial('navbar', Handlebars.templates['navbar']);
var currentUser = null;

var data={};
var loadPage = function(template, data) {
    //var projects = [{project:"project1", _id:1}, {project:"project2", _id:2}];
    //data = data || {projects:projects};
    data.user_logged_in = currentUser!==null;
    data.username = currentUser;
    $('#main-container').html(Handlebars.templates[template](data));
};


var loadHomePage = function() {
    $.get('/projects?trending=1', function(response) {
        console.log(response.content.projects);
        data.projects = response.content.projects;
        loadPage('index', data);
    });
};

var loadProjectPage = function(id){
    $.get('/projects/'+id, function(response){
        loadPage('projectView', {
            project: response.content.project,
            discussions: response.content.discussions,
        });
    });
}

var loadPostProjectPage = function(){
    loadPage('postProject', data);
};

var loadProfilePage = function(projectType){
    var reqUrl = projectType=="favorites"?'/users/favorites':'/users/myprojects';
    $.get(reqUrl, function(response){
        data.projects = response.content.projects;
        loadPage('profile', data);
    });    
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

$(document).on('click', '.profile-link', function(event){
    event.preventDefault();
    loadProfilePage();
});

$(document).on('click', '#view-myprojects', function(event){
    event.preventDefault();
    loadProfilePage();
});

$(document).on('click', '#view-favorites', function(event){
    event.preventDefault();
    loadProfilePage("favorites");
});

$(document).on('click', '.home-link', function(event){
    event.preventDefault();
    loadHomePage();
});
