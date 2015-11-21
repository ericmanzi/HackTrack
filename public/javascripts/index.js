Handlebars.registerPartial('project', Handlebars.templates['project']);
var currentUser = null;
var loadPage = function(template, data) {
    var projects = ["project1", "project2"];
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