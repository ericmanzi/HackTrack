Handlebars.registerPartial('project', Handlebars.templates['project']);
Handlebars.registerPartial('navbar', Handlebars.templates['navbar']);
var currentUser = null;

var data={};
var loadPage = function(template, data) {
    //var projects = [{project:"project1", _id:1}, {project:"project2", _id:2}];
    //data = data || {projects:projects};
    data.user_logged_in = currentUser!==null;
    data.username = currentUser;

    if (template === "projectView"){
        data.is_owner_of_this_project = data.project.owner === currentUser;
    }

    $('#main-container').html(Handlebars.templates[template](data));

    ///////// DEALING WITH TAGS ////////////
    if (template === 'postProject'){
        $("#project-post-tags").tagit({
            placeholderText : " Enter project tag..."
        });
    } else if (template === "edit-project"){
        $("#project-edit-tags").tagit({
            placeholderText : " Enter project tag..."
        });
        data.project.tags.forEach(function(currentTag){
            $("#project-edit-tags").tagit("createTag", currentTag);
        });
    }
};


var loadHomePage = function(tag, filter) {
    $.get('/tags', function(response) {
        data.tags = response.content;
        loadPage('index', data);
        updateHomePage(tag, filter);
    });
};

var updateHomePage = function(tag, filter) {
    var target = '/projects?trending=1';
    if(tag) {
        target += '&tag=' + encodeURIComponent(tag);
    }
    if(filter) {
        target += '&filter=' + encodeURIComponent(filter);
    }
    $.get(target, function(response) {
        var data = {projects: response.content.projects};
        $('#projectList').html(Handlebars.templates['projectList'](data));
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
};

var loadUserPage = function(username) {
    var reqUrl = '/users/'+username;
    $.get(reqUrl, function(response) {
        data.projects = response.content.projects;
        data.user = username;
        loadPage('userProfile', data);
    });
};

var loadEditProjectPage = function(projID){
    $.get('/projects/'+projID, function(response){
        loadPage('edit-project', {
            project: response.content.project
        });
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

$(document).on('click', '#post-project-link', function(event){
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

