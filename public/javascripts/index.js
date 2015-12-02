Handlebars.registerPartial('project', Handlebars.templates['project']);
Handlebars.registerPartial('activity', Handlebars.templates['activity']);
Handlebars.registerPartial('navbar', Handlebars.templates['navbar']);
Handlebars.registerPartial('modals', Handlebars.templates['modals']);

var currentUser = null;
var data={};
var profile_picture = null;

var loadPage = function(template, data, isReload) {
    data.user_logged_in = currentUser!==null;
    data.username = currentUser;
    data.profile_picture = profile_picture;
    if (template === "projectView"){
        data.is_owner_of_this_project = data.project.owner === currentUser;
    }

    $('#main-container').html(Handlebars.templates[template](data));

    // if we're loading a new "page", scroll to the top
    if(!isReload) {
        window.scrollTo(0, 0);
    }

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

    /////////// SETTING BACKGROUND IMAGE //////////
    if (template === 'projectView'){
        if (data.project.imageLinks.length !== 0){
            $('#project-header').css("background", "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(" + data.project.imageLinks[0] + ")");    
        } 
    } 

    /////////// Dealing with next and prev buttons //////////
    if (template === 'projectView'){
        $('.owl-prev').remove();
        $('.owl-next').remove();
    }
};


var loadHomePage = function(tag, filter, callback) {
    $.get('/tags', function(response) {
        data.tags = response.content;
        loadPage('index', data);
        updateHomePage(tag, filter);
        if(callback) {
            callback();
        }
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

        // store last load settings so we know what to load if we want
        // to grab more projects
        $('#projectList').data('days', data.projects.length);
        $('#projectList').data('tag', tag);
        $('#projectList').data('filter', filter);
    });
};

var homeLoadMoreProjects = function() {
    // get the last settings, and fetch projects with higher day index
    // then, append projectList template to the projectList element
    var startDays = $('#projectList').data('days');
    var tag = $('#projectList').data('tag');
    var filter = $('#projectList').data('filter');
    var target = '/projects?trending=1&days=' + startDays;
    if(tag) {
        target += '&tag=' + encodeURIComponent(tag);
    }
    if(filter) {
        target += '&filter=' + encodeURIComponent(filter);
    }
    $.get(target, function(response) {
        var data = {projects: response.content.projects};
        $('#projectList').append(Handlebars.templates['projectList'](data));
        $('#projectList').data('days', startDays + data.projects.length);
    });
};

var loadProjectPage = function(id, isReload){
    $.get('/projects/'+id, function(response){
        loadPage('projectView', {
            project: response.content.project,
            discussions: response.content.discussions,
            favorited: response.content.favorited
        }, isReload);

        var owl = $("#owl-demo");
           owl.owlCarousel({
              items : 4,
              itemsDesktop : [1199,3],
              itemsDesktopSmall : [979,3],
              navigation : true
         
          });
          $(".next").click(function(){
           console.log("show next");
            owl.trigger('owl.next');
          })
          $(".prev").click(function(){
            owl.trigger('owl.prev');
          });

          $('.vote').click(function () {
            $(this).toggleClass('on');
            });

        });
    };

var loadActFeedPage = function() {
    $.get(
        '/users/myfeed'
    ).done(function(response) {
        data.activities = response.content.activities;
        loadPage('activityFeed', data);
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
        console.log(response.err);
        $('.error').text(response.err);
    });
};

var loadPostProjectPage = function(){
    loadPage('postProject', data);
};

var loadProfilePage = function(projectType){
    $.get(
        projectType=="favorites"?'/users/myfavorites':'/users/myprojects'
    ).done(function(response){
        data.projects = response.content.projects;
        data.isFavorites = projectType=="favorites";
        loadPage('profile', data);
    }).fail(function(responseObject){
        var response = $.parseJSON(responseObject.responseText);
        console.log(response.err);
        $('.error').text(response.err);
    });
};

var loadUserPage = function(username) {
    if (username === currentUser) loadProfilePage();
    else {
        $.get(
            '/users/profiles/'+username
        ).done(function(response) {
            data.projects = response.content.projects;
            data.following = response.content.following;
            data.user_profile_picture = response.content.user_profile_picture;
            data.user = username;
            loadPage('userProfile', data);
        }).fail(function(responseObject){
            var response = $.parseJSON(responseObject.responseText);
            console.log(response.err);
            $('.error').text(response.err);
        });
    }
};

var loadEditProjectPage = function(projID){
    $.get('/projects/'+projID, function(response){
        loadPage('edit-project', {
            project: response.content.project
        });
    });
};

$(document).ready(function() {
    $.get('/users/current', function(response) {
        if (response.content.loggedIn) {
            currentUser = response.content.user;
            profile_picture = response.content.profile_picture;
            console.log("current user is "+currentUser)
        }
        loadHomePage('', '', function() {
            // autoload a modal if requested
            // this is used to load special forms on some pages, e.g. password reset
            var autoloadEl = $('#autoload');
            if(autoloadEl.length === 1) {
                var modalEl = $('#' + autoloadEl.data('modal'));
                modalEl.data(autoloadEl.data());
                modalEl.modal('show');
            }
        });
    });
    loadHomePage();

    /*---------INITIALIZE PARSE--------*/
    Parse.initialize("8jPwCfzXBGpPR2WVW935pey0C66bWtjMLRZPIQc8", "zgB9cjo7JifswwYBTtSvU1MSJCMVZMwEZI3Etw4d");
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

$(document).on('click', '.act-feed-link', function(event) {
    event.preventDefault();
    loadActFeedPage();
});

// clear error texts when new modal is displayed
$(document).on('hide.bs.modal', '.modal', function(event){
    $('.error').text('');
});
