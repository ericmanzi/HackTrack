!function(){var n=Handlebars.template,e=Handlebars.templates=Handlebars.templates||{};e.index=n({1:function(n,e,a,t,l){var s=n.lambda,i=n.escapeExpression;return'				<li class="tagSelector" data-tag="'+i(s(e,e))+'">'+i(s(e,e))+"</li>\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,t,l){var s;return'<div id="projects" >\n	<div class="projectFeed">\n'+(null!=(s=n.invokePartial(t.navbar,e,{name:"navbar",data:l,indent:"		",helpers:a,partials:t,decorators:n.decorators}))?s:"")+'		<ul id="tagSelection">\n'+(null!=(s=a.each.call(null!=e?e:{},null!=e?e.tags:e,{name:"each",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l}))?s:"")+'		</ul>\n		<div id="searchContainer">\n			<input type="text" id="searchInput" />\n		</div>\n		<div id="projectList"></div>\n	</div>\n</div>\n'},usePartial:!0,useData:!0}),e.navbar=n({1:function(n,e,a,t,l){return'        <a href="#" class="profile-link"><div class="navAvatar pull-right">\n            <div class="userImage"><img src="https://www.whitehouse.gov/sites/whitehouse.gov/files/images/Administration/People/president_official_portrait_hires.jpg" width="50" height="50"></div>\n        </div>\n        </a>\n'},3:function(n,e,a,t,l){var s;return'            <div class="pull-right">\n                \n                <i>Logged in as <strong>'+n.escapeExpression((s=null!=(s=a.username||(null!=e?e.username:e))?s:a.helperMissing,"function"==typeof s?s.call(null!=e?e:{},{name:"username",hash:{},data:l}):s))+'</strong> </i>\n                <a class="btn btn-primary" id="logout-link" >Logout</a>\n            </div>\n            <div class="post-project"><a href="#" id="post-project-link">POST A PROJECT</a></div>\n\n'},5:function(n,e,a,t,l){return'            <div class="pull-right">\n                <a class="btn btn-primary" id="login-link"\n                   data-toggle="modal" data-target="#signin" >Login</a>\n            </div>\n'},7:function(n,e,a,t,l){var s;return"                        "+n.escapeExpression((s=null!=(s=a.error||(null!=e?e.error:e))?s:a.helperMissing,"function"==typeof s?s.call(null!=e?e:{},{name:"error",hash:{},data:l}):s))+"\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,t,l){var s,i=null!=e?e:{};return'<div class="navBar">\n'+(null!=(s=a["if"].call(i,null!=e?e.user_logged_in:e,{name:"if",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l}))?s:"")+'    <div class="pageTitle">\n        <h1 class="home-link"><a href="#" style="text-decoration:none;">MIT HACKTRACK</a></h1>\n\n    </div>\n\n    <div class="navActions">\n\n'+(null!=(s=a["if"].call(i,null!=e?e.user_logged_in:e,{name:"if",hash:{},fn:n.program(3,l,0),inverse:n.program(5,l,0),data:l}))?s:"")+'\n        <div class="profile">\n        </div>\n    </div>\n    <div class="mainImg">\n    </div>\n</div>\n\n\n\n\n<!--//////////// Modals ///////////-->\n\n\n<div class="modal fade" id="signin">\n    <div class="modal-dialog modal-sm">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal">x</button>\n                <h4 class="modal-title">Login to Hacktrack</h4>\n            </div>\n            <div class="modal-body">\n                <div class="error">\n'+(null!=(s=a["if"].call(i,null!=e?e.error:e,{name:"if",hash:{},fn:n.program(7,l,0),inverse:n.noop,data:l}))?s:"")+'                </div>\n                <form id="signin-form">\n                    <div class="form-group">\n                        <p><input type="text" class="form-control" name="username" required placeholder="Username"/></p>\n                        <p><input type="password" class="form-control" name="password" required placeholder="Password"/></p>\n                        <p><button type="submit" class="btn btn-primary">Sign in</button>\n                    </div>\n                </form>\n            </div>\n            <div class="modal-footer">\n                New to Hacktrack?\n                <a data-toggle="modal" data-target="#register" data-dismiss="modal" class="btn btn-primary" href="#">Register</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n<div class="modal fade" id="register">\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal">x</button>\n                <h4 class="modal-title">Sign up for Hacktrack</h4>\n            </div>\n            <div class="modal-body">\n                <div class="error">\n'+(null!=(s=a["if"].call(i,null!=e?e.error:e,{name:"if",hash:{},fn:n.program(7,l,0),inverse:n.noop,data:l}))?s:"")+'                </div>\n                <form id="register-form">\n                    <div class="form-group">\n                        <p><input type="text" class="form-control" name="username" required placeholder="Username"/></p>\n                        <p><input type="text" class="form-control" name="email" required placeholder="Email"/></p>\n                        <p><input type="password" class="form-control" name="password" required placeholder="Password"/></p>\n                        <p><input type="password" class="form-control" name="confirm" required placeholder="Confirm password"/></p>\n                        <p><button type="submit" class="btn btn-primary">Sign up</button>\n                    </div>\n                </form>\n            </div>\n            <div class="modal-footer">\n                Already have an account?\n                <a data-toggle="modal" href="#signin" data-dismiss="modal" class="btn btn-primary">Login</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n<!--//////////////////// END MODALS ////////////////////-->\n\n'},useData:!0}),e.postProject=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,t,l){var s;return(null!=(s=n.invokePartial(t.navbar,e,{name:"navbar",data:l,helpers:a,partials:t,decorators:n.decorators}))?s:"")+'<form id="post-project">\n    <h1 class="project-post-label-h1">Post New Project</h1>\n  <div class="alert alert-danger" id="post-project-error" style="display:none;"></div>\n  <fieldset class="form-group">\n    <label for="projectTitle">Project Title *</label>\n    <input type="text" class="form-control" id="project-post-title" placeholder="Enter project title..." maxlength="100" required>\n  </fieldset>\n  <fieldset class="form-group">\n    <label for="projectDescription">Project Description *</label>\n    <textarea class="form-control" id="project-post-description" rows="3" placeholder="Enter project description..." required></textarea>\n  </fieldset>\n  <fieldset class="form-group">\n    <label for="projectVideoLink">Project Video Link </label>\n    <small class="text-muted">(Only YouTube videos)</small>\n    <input type="text" class="form-control" id="project-post-videoLink" placeholder="Enter project video link..." required>\n  </fieldset>\n  <fieldset class="form-group">\n    <label for="projectTags">Project Tags</label>\n    <small class="text-muted">(Click enter after entering each tag)</small>\n    <ul id="project-post-tags" class="form-control"></ul>\n  </fieldset>\n  <fieldset class="form-group">\n    <div class="image_input_fields_wrap">\n      <label for="projectImageLinks">Project Image Links</label>\n      <small class="text-muted">(Enter one link per input field, max 5 images)</small>\n      <div><input type="text" class="form-control project-post-image-links" placeholder="Enter project image link..."></div>\n      <button type="button" class="btn btn-success btn-sm add_imagelink_field_button">Add more images</button>\n    </div>\n  </fieldset>\n  <hr />\n  <button type="button" class="btn btn-primary" id="submit-project-post">Submit</button>\n  <button type="button" class="btn btn-danger" id="cancel-project-post">Cancel</button>\n</form>'},usePartial:!0,useData:!0}),e.profile=n({1:function(n,e,a,t,l){var s;return null!=(s=n.invokePartial(t.project,e,{name:"project",data:l,indent:"				",helpers:a,partials:t,decorators:n.decorators}))?s:""},3:function(n,e,a,t,l){return"				<p><em>No projects yet!</em></p>\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,t,l){var s,i,r=null!=e?e:{};return(null!=(s=n.invokePartial(t.navbar,e,{name:"navbar",data:l,helpers:a,partials:t,decorators:n.decorators}))?s:"")+'<main class="page-main">\n	<header class="profileHeader">\n		<div class="profileContainer">\n			<div class="profileAvatar">\n				<span class="userImage"><img src="https://www.whitehouse.gov/sites/whitehouse.gov/files/images/Administration/People/president_official_portrait_hires.jpg" width="110" height="110"></span>\n			</div>\n			<div class="profileInfo">\n				<h1 class="profileInfoTitle">\n					'+n.escapeExpression((i=null!=(i=a.username||(null!=e?e.username:e))?i:a.helperMissing,"function"==typeof i?i.call(r,{name:"username",hash:{},data:l}):i))+'\n				</h1>\n			</div>\n			<div class="profileNavigation">\n				<ul>\n					<li class="profile-navigation-tab">\n						<a href="#" id="view-favorites">\n							Favorites\n						</a>\n					</li>\n					<li class="profile-navigation-tab" id="view-myprojects">\n						<a href="#">My Projects</a>\n					</li>\n				</ul>\n			</div>\n\n		</div>\n	</header>\n	<div >\n		<div class= "projectFeed">\n			<ul class="projectList"> \n'+(null!=(s=a.each.call(r,null!=e?e.projects:e,{name:"each",hash:{},fn:n.program(1,l,0),inverse:n.program(3,l,0),data:l}))?s:"")+"			</ul>\n		</div>\n	</div>\n</main>"},usePartial:!0,useData:!0}),e.project=n({1:function(n,e,a,t,l){var s;return'		<div class="projectContent projectImage"><img style="height:75px; width:75px" src='+n.escapeExpression(n.lambda(null!=(s=null!=e?e.imageLinks:e)?s[0]:s,e))+"></div>\n"},3:function(n,e,a,t,l){return'		<div class="projectContent projectImage"><img style="height:75px; width:75px" src="http://sloansocialimpact.mit.edu/wp-content/uploads/2014/02/MIT_Dome_night1_Edit.jpg"></div>\n'},compiler:[7,">= 4.0.0"],main:function(n,e,a,t,l){var s,i,r=null!=e?e:{},o=a.helperMissing,d="function",c=n.escapeExpression;return'\n<li class="project" data-project-id='+c((i=null!=(i=a._id||(null!=e?e._id:e))?i:o,typeof i===d?i.call(r,{name:"_id",hash:{},data:l}):i))+'>\n<a href="projects/'+c((i=null!=(i=a._id||(null!=e?e._id:e))?i:o,typeof i===d?i.call(r,{name:"_id",hash:{},data:l}):i))+'" class="project-link">\n	<div class="projectContent voteCount">\n		'+c(n.lambda(null!=(s=null!=e?e.upvoterUsernames:e)?s.length:s,e))+"\n	</div>\n"+(null!=(s=a["if"].call(r,null!=(s=null!=e?e.imageLinks:e)?s[0]:s,{name:"if",hash:{},fn:n.program(1,l,0),inverse:n.program(3,l,0),data:l}))?s:"")+'\n	<div class="projectContent projectDetails">\n		<div class="projectTitle">\n			'+c((i=null!=(i=a.title||(null!=e?e.title:e))?i:o,typeof i===d?i.call(r,{name:"title",hash:{},data:l}):i))+'\n		</div>\n		<div class="projectBlurb">\n			'+c((i=null!=(i=a.description||(null!=e?e.description:e))?i:o,typeof i===d?i.call(r,{name:"description",hash:{},data:l}):i))+"\n		</div>\n	</div>\n</a>	\n</li>\n"},useData:!0}),e.projectList=n({1:function(n,e,a,t,l){var s,i,r=null!=e?e:{};return"	<h3>"+n.escapeExpression((i=null!=(i=a.prettyDate||(null!=e?e.prettyDate:e))?i:a.helperMissing,"function"==typeof i?i.call(r,{name:"prettyDate",hash:{},data:l}):i))+"</h3>\n"+(null!=(s=a.each.call(r,null!=e?e.projects:e,{name:"each",hash:{},fn:n.program(2,l,0),inverse:n.program(4,l,0),data:l}))?s:"")},2:function(n,e,a,t,l){var s;return null!=(s=n.invokePartial(t.project,e,{name:"project",data:l,indent:"		",helpers:a,partials:t,decorators:n.decorators}))?s:""},4:function(n,e,a,t,l){return"		<p><em>No projects posted on this day!</em></p>\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,t,l){var s;return null!=(s=a.each.call(null!=e?e:{},null!=e?e.projects:e,{name:"each",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l}))?s:""},usePartial:!0,useData:!0}),e.projectView=n({1:function(n,e,a,t,l){return"						<img src="+n.escapeExpression(n.lambda(e,e))+' alt="image" height="150px">\n'},3:function(n,e,a,t,l){var s,i,r=null!=e?e:{},o=a.helperMissing,d="function",c=n.escapeExpression;return'						<div class="project-discussion-post">\n							<div class="post-content project-discussion-head">\n							    <span class="post-user"><a href="#" id="view-user" view-user-id='+c((i=null!=(i=a.username||(null!=e?e.username:e))?i:o,typeof i===d?i.call(r,{name:"username",hash:{},data:l}):i))+">"+c((i=null!=(i=a.username||(null!=e?e.username:e))?i:o,typeof i===d?i.call(r,{name:"username",hash:{},data:l}):i))+'</a></span>\n							    <span class="post-time">on '+c((i=null!=(i=a.prettyDate||(null!=e?e.prettyDate:e))?i:o,typeof i===d?i.call(r,{name:"prettyDate",hash:{},data:l}):i))+" at "+c((i=null!=(i=a.prettyTime||(null!=e?e.prettyTime:e))?i:o,typeof i===d?i.call(r,{name:"prettyTime",hash:{},data:l}):i))+'</span>\n							</div>\n							<div class="post-content project-discussion-body">\n								'+c((i=null!=(i=a.content||(null!=e?e.content:e))?i:o,typeof i===d?i.call(r,{name:"content",hash:{},data:l}):i))+"\n							</div>\n"+(null!=(s=a.each.call(r,null!=e?e.comments:e,{name:"each",hash:{},fn:n.program(4,l,0),inverse:n.noop,data:l}))?s:"")+(null!=(s=a["if"].call(r,(s=l&&l.root)&&s.user_logged_in,{name:"if",hash:{},fn:n.program(6,l,0),inverse:n.noop,data:l}))?s:"")+"						</div>\n"},4:function(n,e,a,t,l){var s,i=null!=e?e:{},r=a.helperMissing,o="function",d=n.escapeExpression;return'								<div class="project-discussion-comment">\n									<div class="post-content discussion-comment-head">\n							            <span class="post-user"><a href="#" id="view-user" view-user-id='+d((s=null!=(s=a.username||(null!=e?e.username:e))?s:r,typeof s===o?s.call(i,{name:"username",hash:{},data:l}):s))+">"+d((s=null!=(s=a.username||(null!=e?e.username:e))?s:r,typeof s===o?s.call(i,{name:"username",hash:{},data:l}):s))+'</a></span>\n							            <span class="post-time">on '+d((s=null!=(s=a.prettyDate||(null!=e?e.prettyDate:e))?s:r,typeof s===o?s.call(i,{name:"prettyDate",hash:{},data:l}):s))+" at "+d((s=null!=(s=a.prettyTime||(null!=e?e.prettyTime:e))?s:r,typeof s===o?s.call(i,{name:"prettyTime",hash:{},data:l}):s))+'</span>\n									</div>\n									<div class="post-content discussion-comment-body">\n										'+d((s=null!=(s=a.content||(null!=e?e.content:e))?s:r,typeof s===o?s.call(i,{name:"content",hash:{},data:l}):s))+"\n									</div>\n								</div>\n"},6:function(n,e,a,t,l){var s,i=null!=e?e:{},r=a.helperMissing,o="function",d=n.escapeExpression;return'								<div class="comment-add" data-discussion-id='+d((s=null!=(s=a.id||(null!=e?e.id:e))?s:r,typeof s===o?s.call(i,{name:"id",hash:{},data:l}):s))+'>\n									<input type="text" class="comment-add-content" id="comment-add-content-'+d((s=null!=(s=a.id||(null!=e?e.id:e))?s:r,typeof s===o?s.call(i,{name:"id",hash:{},data:l}):s))+'" />\n									<button class="comment-add-btn">Reply</button>\n								</div>\n'},8:function(n,e,a,t,l){return"						No discussions have been opened yet for this project.\n"},10:function(n,e,a,t,l){return'						<div class="project-discussion-add">\n							<input type="text" id="project-discussion-add-content" />\n							<button id="project-discussion-add-btn">Add Discussion</button>\n						</div>\n'},compiler:[7,">= 4.0.0"],main:function(n,e,a,t,l){var s,i=n.lambda,r=n.escapeExpression,o=null!=e?e:{};return'\n<div class="project-container" >\n	<div class="proj project-navigation">\n   	\n   	<a href="#" class="home-link">\n   	<span class="glyphicon glyphicon-remove" aria-hidden="true" style="font-size:1.5em"></span>\n   	</a>\n	\n	</div>\n	<div class="proj project-content" >\n		<header class="project-header" id="project-header" data-project-id='+r(i(null!=(s=null!=e?e.project:e)?s._id:s,e))+'>\n			<div class="project-title" id="projectView-title">\n				'+r(i(null!=(s=null!=e?e.project:e)?s.title:s,e))+'\n			</div>\n			<div class="project-description" id="projectView-description">\n				'+r(i(null!=(s=null!=e?e.project:e)?s.description:s,e))+'\n                <br />\n                by <a href="#" id="view-user" view-user-id='+r(i(null!=(s=null!=e?e.project:e)?s.owner:s,e))+">"+r(i(null!=(s=null!=e?e.project:e)?s.owner:s,e))+'</a>\n			</div>\n\n            <a href="#" id="myButton-upvote"><span id="projectView-upvotes">'+r(i(null!=(s=null!=(s=null!=e?e.project:e)?s.upvoterUsernames:s)?s.length:s,e))+'</span> | Upvote</a>\n            <a href="#" id="favorite-button">Add to favorites</a>\n		</header>\n		<div class="project-body">\n			<div class="project-body-left">\n				<div class="project-media">\n'+(null!=(s=a.each.call(o,null!=(s=null!=e?e.project:e)?s.imageLinks:s,{name:"each",hash:{},fn:n.program(1,l,0),inverse:n.noop,data:l}))?s:"")+'				</div>\n				<div class="project-discussion">\n					<div class="project-discussion-title">\n					    Discussion\n				    </div>\n'+(null!=(s=a.each.call(o,null!=e?e.discussions:e,{name:"each",hash:{},fn:n.program(3,l,0),inverse:n.program(8,l,0),data:l}))?s:"")+(null!=(s=a["if"].call(o,null!=e?e.user_logged_in:e,{name:"if",hash:{},fn:n.program(10,l,0),inverse:n.noop,data:l}))?s:"")+'				</div>\n			</div>\n			<div class="project-body-right"></div>\n		</div>\n	</div>\n	</div>\n'},useData:!0}),e.top_menu=n({1:function(n,e,a,t,l){return'			<a href="#" id="logout-link">Logout</a>\n'},3:function(n,e,a,t,l){return'			<a href="#" id="login-link">Login</a>\n'},compiler:[7,">= 4.0.0"],main:function(n,e,a,t,l){var s;return'<div id="top_menu">\n\n	<p>\n		<input type="text" name="search_box" placeholder="search">\n'+(null!=(s=a["if"].call(null!=e?e:{},null!=e?e.user_logged_in:e,{name:"if",hash:{},fn:n.program(1,l,0),inverse:n.program(3,l,0),data:l}))?s:"")+"	</p>\n\n</div>\n"},useData:!0}),e.userProfile=n({1:function(n,e,a,t,l){var s;return null!=(s=n.invokePartial(t.project,e,{name:"project",data:l,indent:"                    ",helpers:a,partials:t,decorators:n.decorators}))?s:""},3:function(n,e,a,t,l){return"                    <p><em>No projects yet!</em></p>\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,t,l){var s,i,r=null!=e?e:{};return(null!=(s=n.invokePartial(t.navbar,e,{name:"navbar",data:l,helpers:a,partials:t,decorators:n.decorators}))?s:"")+'<main class="page-main">\n    <header class="profileHeader">\n        <div class="profileContainer">\n            <div class="profileAvatar">\n                <span class="userImage"><img src="https://www.whitehouse.gov/sites/whitehouse.gov/files/images/Administration/People/president_official_portrait_hires.jpg" width="110" height="110"></span>\n            </div>\n            <div class="profileInfo">\n                <h1 class="profileInfoTitle">\n                    '+n.escapeExpression((i=null!=(i=a.user||(null!=e?e.user:e))?i:a.helperMissing,"function"==typeof i?i.call(r,{name:"user",hash:{},data:l}):i))+'\n                </h1>\n            </div>\n        </div>\n    </header>\n    <div >\n        <div class= "projectFeed">\n            <ul class="projectList">\n'+(null!=(s=a.each.call(r,null!=e?e.projects:e,{name:"each",hash:{},fn:n.program(1,l,0),inverse:n.program(3,l,0),data:l}))?s:"")+"            </ul>\n        </div>\n    </div>\n</main>"},usePartial:!0,useData:!0})}();
