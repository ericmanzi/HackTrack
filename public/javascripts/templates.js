!function(){var n=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a.index=n({1:function(n,a,e,i,t){var r;return null!=(r=n.invokePartial(i.project,a,{name:"project",data:t,indent:"		",helpers:e,partials:i,decorators:n.decorators}))?r:""},3:function(n,a,e,i,t){return"		<p><em>No projects yet!</em></p>\n"},compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var r;return'<div id="projects" >\n	<div class= "projectFeed">\n		<ul class="projectList"> \n'+(null!=(r=n.invokePartial(i.navbar,a,{name:"navbar",data:t,indent:"	",helpers:e,partials:i,decorators:n.decorators}))?r:"")+(null!=(r=e.each.call(null!=a?a:{},null!=a?a.projects:a,{name:"each",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?r:"")+"	</ul>\n	</div>\n</div>"},usePartial:!0,useData:!0}),a.navbar=n({1:function(n,a,e,i,t){return'        <a href="#" class="profile-link"><div class="navAvatar pull-right">\n            <div class="userImage"><img src="https://www.whitehouse.gov/sites/whitehouse.gov/files/images/Administration/People/president_official_portrait_hires.jpg" width="50" height="50"></div>\n        </div>\n        </a>\n'},3:function(n,a,e,i,t){var r;return'            <div class="pull-right">\n                \n                <i>Logged in as <strong>'+n.escapeExpression((r=null!=(r=e.username||(null!=a?a.username:a))?r:e.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"username",hash:{},data:t}):r))+'</strong> </i>\n                <a class="btn btn-primary" id="logout-link" >Logout</a>\n            </div>\n            <div class="post-project"><a href="#" id="post-project-link">POST A PROJECT</a></div>\n\n'},5:function(n,a,e,i,t){return'            <div class="pull-right">\n                <a class="btn btn-primary" id="login-link"\n                   data-toggle="modal" data-target="#signin" >Login</a>\n            </div>\n'},7:function(n,a,e,i,t){var r;return"                        "+n.escapeExpression((r=null!=(r=e.error||(null!=a?a.error:a))?r:e.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"error",hash:{},data:t}):r))+"\n"},compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var r,l=null!=a?a:{};return'<div class="navBar">\n'+(null!=(r=e["if"].call(l,null!=a?a.user_logged_in:a,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t}))?r:"")+'    <div class="pageTitle">\n        <h1 class="home-link"><a href="#" style="text-decoration:none;">MIT HACKTRACK</a></h1>\n\n    </div>\n\n    <div class="navActions">\n\n'+(null!=(r=e["if"].call(l,null!=a?a.user_logged_in:a,{name:"if",hash:{},fn:n.program(3,t,0),inverse:n.program(5,t,0),data:t}))?r:"")+'\n        <div class="profile">\n        </div>\n    </div>\n    <div class="mainImg">\n    </div>\n</div>\n\n\n\n\n<!--//////////// Modals ///////////-->\n\n\n<div class="modal fade" id="signin">\n    <div class="modal-dialog modal-sm">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal">x</button>\n                <h4 class="modal-title">Login to Hacktrack</h4>\n            </div>\n            <div class="modal-body">\n                <div class="error">\n'+(null!=(r=e["if"].call(l,null!=a?a.error:a,{name:"if",hash:{},fn:n.program(7,t,0),inverse:n.noop,data:t}))?r:"")+'                </div>\n                <form id="signin-form">\n                    <div class="form-group">\n                        <p><input type="text" class="form-control" name="username" required placeholder="Username"/></p>\n                        <p><input type="password" class="form-control" name="password" required placeholder="Password"/></p>\n                        <p><button type="submit" class="btn btn-primary">Sign in</button>\n                    </div>\n                </form>\n            </div>\n            <div class="modal-footer">\n                New to Hacktrack?\n                <a data-toggle="modal" data-target="#register" data-dismiss="modal" class="btn btn-primary" href="#">Register</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n<div class="modal fade" id="register">\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal">x</button>\n                <h4 class="modal-title">Sign up for Hacktrack</h4>\n            </div>\n            <div class="modal-body">\n                <div class="error">\n'+(null!=(r=e["if"].call(l,null!=a?a.error:a,{name:"if",hash:{},fn:n.program(7,t,0),inverse:n.noop,data:t}))?r:"")+'                </div>\n                <form id="register-form">\n                    <div class="form-group">\n                        <p><input type="text" class="form-control" name="username" required placeholder="Username"/></p>\n                        <p><input type="text" class="form-control" name="email" required placeholder="Email"/></p>\n                        <p><input type="password" class="form-control" name="password" required placeholder="Password"/></p>\n                        <p><input type="password" class="form-control" name="confirm" required placeholder="Confirm password"/></p>\n                        <p><button type="submit" class="btn btn-primary">Sign up</button>\n                    </div>\n                </form>\n            </div>\n            <div class="modal-footer">\n                Already have an account?\n                <a data-toggle="modal" href="#signin" data-dismiss="modal" class="btn btn-primary">Login</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n<!--//////////////////// END MODALS ////////////////////-->\n\n'},useData:!0}),a.postProject=n({compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var r;return(null!=(r=n.invokePartial(i.navbar,a,{name:"navbar",data:t,helpers:e,partials:i,decorators:n.decorators}))?r:"")+'<div class="error"></div>\n<form class="pure-form pure-form-aligned" id="post-project">\n    <fieldset>\n        <div class="pure-control-group">\n            <label for="name">Title</label>\n            <input id="project-post-title" type="text" placeholder="Title">\n        </div>\n\n        <div class="pure-control-group">\n            <label for="foo">Description</label>\n            <textarea id="project-post-description" placeholder="Enter description of a project..."></textarea>\n        </div>\n\n        <div class="pure-control-group">\n            <label for="foo">Image Links</label>\n            <textarea id="project-post-image-links" placeholder="Enter image links separated by commas..."></textarea>\n        </div>\n\n        <div class="pure-controls">\n            <button type="submit" class="pure-button pure-button-primary">Submit</button>\n        </div>\n    </fieldset>\n</form>'},usePartial:!0,useData:!0}),a.profile=n({1:function(n,a,e,i,t){var r;return null!=(r=n.invokePartial(i.project,a,{name:"project",data:t,indent:"				",helpers:e,partials:i,decorators:n.decorators}))?r:""},3:function(n,a,e,i,t){return"				<p><em>No projects yet!</em></p>\n"},compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var r,l,s=null!=a?a:{};return(null!=(r=n.invokePartial(i.navbar,a,{name:"navbar",data:t,helpers:e,partials:i,decorators:n.decorators}))?r:"")+'<main class="page-main">\n	<header class="profileHeader">\n		<div class="profileContainer">\n			<div class="profileAvatar">\n				<span class="userImage"><img src="https://www.whitehouse.gov/sites/whitehouse.gov/files/images/Administration/People/president_official_portrait_hires.jpg" width="110" height="110"></span>\n			</div>\n			<div class="profileInfo">\n				<h1 class="profileInfoTitle">\n					'+n.escapeExpression((l=null!=(l=e.username||(null!=a?a.username:a))?l:e.helperMissing,"function"==typeof l?l.call(s,{name:"username",hash:{},data:t}):l))+'\n				</h1>\n			</div>\n			<div class="profileNavigation">\n				<ul>\n					<li class="profile-navigation-tab">\n						<a href="#" id="view-favorites">\n							Favorites\n						</a>\n					</li>\n					<li class="profile-navigation-tab" id="view-myprojects">\n						<a href="#">My Projects</a>\n					</li>\n				</ul>\n			</div>\n\n		</div>\n	</header>\n	<div >\n		<div class= "projectFeed">\n			<ul class="projectList"> \n'+(null!=(r=e.each.call(s,null!=a?a.projects:a,{name:"each",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?r:"")+"			</ul>\n		</div>\n	</div>\n</main>"},usePartial:!0,useData:!0}),a.project=n({1:function(n,a,e,i,t){var r;return'		<div class="projectContent projectImage"><img style="height:75px; width:75px" src='+n.escapeExpression(n.lambda(null!=(r=null!=a?a.imageLinks:a)?r[0]:r,a))+"></div>\n"},3:function(n,a,e,i,t){return'		<div class="projectContent projectImage"><img style="height:75px; width:75px" src="http://sloansocialimpact.mit.edu/wp-content/uploads/2014/02/MIT_Dome_night1_Edit.jpg"></div>\n'},compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var r,l,s=null!=a?a:{},o=e.helperMissing,d="function",c=n.escapeExpression;return'\n<li class="project" data-project-id='+c((l=null!=(l=e._id||(null!=a?a._id:a))?l:o,typeof l===d?l.call(s,{name:"_id",hash:{},data:t}):l))+'>\n<a href="projects/'+c((l=null!=(l=e._id||(null!=a?a._id:a))?l:o,typeof l===d?l.call(s,{name:"_id",hash:{},data:t}):l))+'" class="project-link">\n	<div class="projectContent voteCount">\n		'+c(n.lambda(null!=(r=null!=a?a.upvoterUsernames:a)?r.length:r,a))+"\n	</div>\n"+(null!=(r=e["if"].call(s,null!=(r=null!=a?a.imageLinks:a)?r[0]:r,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?r:"")+'\n	<div class="projectContent projectDetails">\n		<div class="projectTitle">\n			'+c((l=null!=(l=e.title||(null!=a?a.title:a))?l:o,typeof l===d?l.call(s,{name:"title",hash:{},data:t}):l))+'\n		</div>\n		<div class="projectBlurb">\n			'+c((l=null!=(l=e.description||(null!=a?a.description:a))?l:o,typeof l===d?l.call(s,{name:"description",hash:{},data:t}):l))+"\n		</div>\n	</div>\n</a>	\n</li>\n"},useData:!0}),a.projectView=n({1:function(n,a,e,i,t){return"						<img src="+n.escapeExpression(n.lambda(a,a))+' alt="image" height="150px">\n'},compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var r,l=n.lambda,s=n.escapeExpression;return'\n<div class="project-container" >\n	<div class="proj project-navigation">\n   	\n   	<a href="#" class="home-link">\n   	<span class="glyphicon glyphicon-remove" aria-hidden="true" style="font-size:1.5em"></span>\n   	</a>\n	\n	</div>\n	<div class="proj project-content" >\n		<header class="project-header" style="background-image: url(https://ph-files.imgix.net/ae094ab9-4542-43e3-8303-83f95d60d846?auto=format&w=1000&h=330);" data-project-id='+s(l(null!=(r=null!=a?a.project:a)?r._id:r,a))+'>\n			<div class="project-title" id="projectView-title">\n				'+s(l(null!=(r=null!=a?a.project:a)?r.title:r,a))+'\n			</div>\n			<div class="project-description" id="projectView-description">\n				'+s(l(null!=(r=null!=a?a.project:a)?r.description:r,a))+'\n			</div>\n			<div id="projectView-upvotes">'+s(l(null!=(r=null!=(r=null!=a?a.project:a)?r.upvoterUsernames:r)?r.length:r,a))+'</div>\n			<a href="#" id="myButton-upvote">Upvote</a>\n            <a href="#" id="favorite-button">Add to favorites</a>\n		</header>\n		<div class="project-body">\n			<div class="project-body-left">\n				<div class="project-media">\n'+(null!=(r=e.each.call(null!=a?a:{},null!=(r=null!=a?a.project:a)?r.imageLinks:r,{name:"each",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t}))?r:"")+'				</div>\n				<div class="project-discussion">\n					Discussion\n					<div class="project-discussion-post">\n						Hey My name is George\n						<div class="project-discussion-comment">\n							<div class="post-content discussion-comment-user">\n								George Ezenna\n							</div>\n							<div class="post-content discussion-comment-body">\n							Is that so\n							</div>\n						</div>\n					</div>\n				</div>\n			</div>\n			<div class="project-body-right"></div>\n		</div>\n	</div>\n	</div>\n\n'},useData:!0}),a.top_menu=n({1:function(n,a,e,i,t){return'			<a href="#" id="logout-link">Logout</a>\n'},3:function(n,a,e,i,t){return'			<a href="#" id="login-link">Login</a>\n'},compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var r;return'<div id="top_menu">\n\n	<p>\n		<input type="text" name="search_box" placeholder="search">\n'+(null!=(r=e["if"].call(null!=a?a:{},null!=a?a.user_logged_in:a,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?r:"")+"	</p>\n\n</div>\n"},useData:!0})}();
