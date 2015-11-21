Handlebars.registerPartial('project', Handlebars.templates['project']);
Handlebars.registerPartial('navbar', Handlebars.templates['navbar']);
var currentUser = null;
var loadPage = function(template, data) {
    var projects = [{project:"project1", _id:1}, {project:"project2", _id:2}];
    data = data || {projects:projects};
    $('#main-container').html(Handlebars.templates[template](data));
};


var loadHomePage = function() {
    console.log("current user is "+currentUser);

    if (currentUser) {
        loadProjectsPage();
    } else {
        loadPage('index');
    }
};

var loadProjectPage = function(id){
   //TODO make get request to get specific project
   loadPage('projectView', {})

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