!function(){var n=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a.index=n({1:function(n,a,e,i,t){var l;return null!=(l=n.invokePartial(i.project,a,{name:"project",data:t,indent:"		",helpers:e,partials:i,decorators:n.decorators}))?l:""},3:function(n,a,e,i,t){return"		<p><em>No projects yet!</em></p>\n"},compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var l;return'<div id="projects" >\n	<div class= "projectFeed">\n		<ul class="projectList"> \n'+(null!=(l=n.invokePartial(i.navbar,a,{name:"navbar",data:t,indent:"	",helpers:e,partials:i,decorators:n.decorators}))?l:"")+(null!=(l=e.each.call(null!=a?a:{},null!=a?a.projects:a,{name:"each",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?l:"")+"	</ul>\n	</div>\n</div>"},usePartial:!0,useData:!0}),a.navbar=n({1:function(n,a,e,i,t){return'        <a href="#" class="profile-link"><div class="navAvatar pull-right">\n            <div class="userImage"><img src="https://www.whitehouse.gov/sites/whitehouse.gov/files/images/Administration/People/president_official_portrait_hires.jpg" width="50" height="50"></div>\n        </div>\n        </a>\n'},3:function(n,a,e,i,t){var l;return'            <div class="pull-right">\n                \n                <i>Logged in as <strong>'+n.escapeExpression((l=null!=(l=e.username||(null!=a?a.username:a))?l:e.helperMissing,"function"==typeof l?l.call(null!=a?a:{},{name:"username",hash:{},data:t}):l))+'</strong> </i>\n                <a class="btn btn-primary" id="logout-link" >Logout</a>\n            </div>\n            <div class="post-project"><a href="#" id="post-project-link">POST A PROJECT</a></div>\n\n'},5:function(n,a,e,i,t){return'            <div class="pull-right">\n                <a class="btn btn-primary" id="login-link"\n                   data-toggle="modal" data-target="#signin" >Login</a>\n            </div>\n'},7:function(n,a,e,i,t){var l;return"                        "+n.escapeExpression((l=null!=(l=e.error||(null!=a?a.error:a))?l:e.helperMissing,"function"==typeof l?l.call(null!=a?a:{},{name:"error",hash:{},data:t}):l))+"\n"},compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var l,r=null!=a?a:{};return'<div class="navBar">\n'+(null!=(l=e["if"].call(r,null!=a?a.user_logged_in:a,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t}))?l:"")+'    <div class="pageTitle">\n        <h1 class="home-link"><a href="#" style="text-decoration:none;">MIT HACKTRACK</a></h1>\n\n    </div>\n\n    <div class="navActions">\n\n'+(null!=(l=e["if"].call(r,null!=a?a.user_logged_in:a,{name:"if",hash:{},fn:n.program(3,t,0),inverse:n.program(5,t,0),data:t}))?l:"")+'\n        <div class="profile">\n        </div>\n    </div>\n    <div class="mainImg">\n    </div>\n</div>\n\n\n\n\n<!--//////////// Modals ///////////-->\n\n\n<div class="modal fade" id="signin">\n    <div class="modal-dialog modal-sm">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal">x</button>\n                <h4 class="modal-title">Login to Hacktrack</h4>\n            </div>\n            <div class="modal-body">\n                <div class="error">\n'+(null!=(l=e["if"].call(r,null!=a?a.error:a,{name:"if",hash:{},fn:n.program(7,t,0),inverse:n.noop,data:t}))?l:"")+'                </div>\n                <form id="signin-form">\n                    <div class="form-group">\n                        <p><input type="text" class="form-control" name="username" required placeholder="Username"/></p>\n                        <p><input type="password" class="form-control" name="password" required placeholder="Password"/></p>\n                        <p><button type="submit" class="btn btn-primary">Sign in</button>\n                    </div>\n                </form>\n            </div>\n            <div class="modal-footer">\n                New to Hacktrack?\n                <a data-toggle="modal" data-target="#register" data-dismiss="modal" class="btn btn-primary" href="#">Register</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n<div class="modal fade" id="register">\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal">x</button>\n                <h4 class="modal-title">Sign up for Hacktrack</h4>\n            </div>\n            <div class="modal-body">\n                <div class="error">\n'+(null!=(l=e["if"].call(r,null!=a?a.error:a,{name:"if",hash:{},fn:n.program(7,t,0),inverse:n.noop,data:t}))?l:"")+'                </div>\n                <form id="register-form">\n                    <div class="form-group">\n                        <p><input type="text" class="form-control" name="username" required placeholder="Username"/></p>\n                        <p><input type="text" class="form-control" name="email" required placeholder="Email"/></p>\n                        <p><input type="password" class="form-control" name="password" required placeholder="Password"/></p>\n                        <p><input type="password" class="form-control" name="confirm" required placeholder="Confirm password"/></p>\n                        <p><button type="submit" class="btn btn-primary">Sign up</button>\n                    </div>\n                </form>\n            </div>\n            <div class="modal-footer">\n                Already have an account?\n                <a data-toggle="modal" href="#signin" data-dismiss="modal" class="btn btn-primary">Login</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n<!--//////////////////// END MODALS ////////////////////-->\n\n'},useData:!0}),a.postProject=n({compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var l;return(null!=(l=n.invokePartial(i.navbar,a,{name:"navbar",data:t,helpers:e,partials:i,decorators:n.decorators}))?l:"")+'<div class="error"></div>\n<form class="pure-form pure-form-aligned" id="post-project">\n    <fieldset>\n        <div class="pure-control-group">\n            <label for="name">Title</label>\n            <input id="project-post-title" type="text" placeholder="Title">\n        </div>\n\n        <div class="pure-control-group">\n            <label for="foo">Description</label>\n            <textarea id="project-post-description" placeholder="Enter description of a project..."></textarea>\n        </div>\n\n        <div class="pure-control-group">\n            <label for="foo">Image Links</label>\n            <textarea id="project-post-image-links" placeholder="Enter image links separated by commas..."></textarea>\n        </div>\n\n        <div class="pure-controls">\n            <button type="submit" class="pure-button pure-button-primary">Submit</button>\n        </div>\n    </fieldset>\n</form>'},usePartial:!0,useData:!0}),a.profile=n({compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var l;return(null!=(l=n.invokePartial(i.navbar,a,{name:"navbar",data:t,helpers:e,partials:i,decorators:n.decorators}))?l:"")+'<main class="page-main">\n	<header class="profileHeader">\n		<div class="profileContainer">\n			<div class="profileAvatar">\n				<span class="userImage"><img src="https://www.whitehouse.gov/sites/whitehouse.gov/files/images/Administration/People/president_official_portrait_hires.jpg" width="110" height="110"></span>\n			</div>\n			<div class="profileInfo">\n				<h1 class="profileInfoTitle">\n					Barack Obama\n				</h1>\n			</div>\n			<div class="profileNavigation">\n				<ul>\n					<li class="profile-navigation-tab">\n						<a href="#">\n							Favorites\n						</a>\n					</li>\n					<li class="profile-navigation-tab">\n						<a href="#">My Projects</a>\n					</li>\n				</ul>\n			</div>\n		</div>\n	</header>\n</main>'},usePartial:!0,useData:!0}),a.project=n({1:function(n,a,e,i,t){var l;return'		<div class="projectContent projectImage"><img style="height:75px; width:75px" src='+n.escapeExpression(n.lambda(null!=(l=null!=a?a.imageLinks:a)?l[0]:l,a))+"></div>\n"},3:function(n,a,e,i,t){return'		<div class="projectContent projectImage"><img style="height:75px; width:75px" src="http://sloansocialimpact.mit.edu/wp-content/uploads/2014/02/MIT_Dome_night1_Edit.jpg"></div>\n'},compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var l,r,s=null!=a?a:{},o=e.helperMissing,d="function",c=n.escapeExpression;return'\n<li class="project" data-project-id='+c((r=null!=(r=e._id||(null!=a?a._id:a))?r:o,typeof r===d?r.call(s,{name:"_id",hash:{},data:t}):r))+'>\n<a href="projects/'+c((r=null!=(r=e._id||(null!=a?a._id:a))?r:o,typeof r===d?r.call(s,{name:"_id",hash:{},data:t}):r))+'" class="project-link">\n	<div class="projectContent voteCount">\n		'+c(n.lambda(null!=(l=null!=a?a.upvoterUsernames:a)?l.length:l,a))+"\n	</div>\n"+(null!=(l=e["if"].call(s,null!=(l=null!=a?a.imageLinks:a)?l[0]:l,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?l:"")+'\n	<div class="projectContent projectDetails">\n		<div class="projectTitle">\n			'+c((r=null!=(r=e.title||(null!=a?a.title:a))?r:o,typeof r===d?r.call(s,{name:"title",hash:{},data:t}):r))+'\n		</div>\n		<div class="projectBlurb">\n			'+c((r=null!=(r=e.description||(null!=a?a.description:a))?r:o,typeof r===d?r.call(s,{name:"description",hash:{},data:t}):r))+"\n		</div>\n	</div>\n</a>	\n</li>\n"},useData:!0}),a.projectView=n({compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var l,r=n.lambda,s=n.escapeExpression;return'\n<div class="project-container" >\n	<div class="proj project-navigation">\n   	\n   	<a href="#" class="home-link">\n   	<span class="glyphicon glyphicon-remove" aria-hidden="true" style="font-size:1.5em"></span>\n   	</a>\n	\n	</div>\n	<div class="proj project-content" >\n		<header class="project-header" style="background-image: url(https://ph-files.imgix.net/ae094ab9-4542-43e3-8303-83f95d60d846?auto=format&w=1000&h=330);" data-project-id='+s(r(null!=(l=null!=a?a.project:a)?l._id:l,a))+'>\n			<div class="project-title">\n				'+s(r(null!=(l=null!=a?a.project:a)?l.title:l,a))+'\n			</div>\n			<div class="project-description">\n				'+s(r(null!=(l=null!=a?a.project:a)?l.description:l,a))+'\n			</div>\n			<div id="projectView-upvotes">'+s(r(null!=(l=null!=(l=null!=a?a.project:a)?l.upvoterUsernames:l)?l.length:l,a))+'</div>\n			<a href="#" id="myButton-upvote">Upvote</a>\n		</header>\n		<div class="project-body">\n			<div class="project-body-left">\n				<div class="project-media">\n					Media\n				</div>\n				<div class="project-discussion">\n					Discussion\n					<div class="project-discussion-post">\n						Hey My name is George\n						<div class="project-discussion-comment">\n							<div class="post-content discussion-comment-user">\n								George Ezenna\n							</div>\n							<div class="post-content discussion-comment-body">\n							Is that so\n							</div>\n						</div>\n					</div>\n				</div>\n			</div>\n			<div class="project-body-right"></div>\n		</div>\n	</div>\n	</div>\n\n'},useData:!0}),a.top_menu=n({1:function(n,a,e,i,t){return'			<a href="#" id="logout-link">Logout</a>\n'},3:function(n,a,e,i,t){return'			<a href="#" id="login-link">Login</a>\n'},compiler:[7,">= 4.0.0"],main:function(n,a,e,i,t){var l;return'<div id="top_menu">\n\n	<p>\n		<input type="text" name="search_box" placeholder="search">\n'+(null!=(l=e["if"].call(null!=a?a:{},null!=a?a.user_logged_in:a,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t}))?l:"")+"	</p>\n\n</div>\n"},useData:!0})}();
