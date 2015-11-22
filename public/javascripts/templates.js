!function(){var n=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a.index=n({1:function(n,a,e,t,l){var r;return null!=(r=n.invokePartial(t.project,a,{name:"project",data:l,indent:"		",helpers:e,partials:t,decorators:n.decorators}))?r:""},3:function(n,a,e,t,l){return"		<p><em>No projects yet!</em></p>\n"},compiler:[7,">= 4.0.0"],main:function(n,a,e,t,l){var r;return'<div id="projects" >\n	<div class= "projectFeed">\n		<ul class="projectList"> \n'+(null!=(r=n.invokePartial(t.navbar,a,{name:"navbar",data:l,indent:"	",helpers:e,partials:t,decorators:n.decorators}))?r:"")+(null!=(r=e.each.call(null!=a?a:{},null!=a?a.projects:a,{name:"each",hash:{},fn:n.program(1,l,0),inverse:n.program(3,l,0),data:l}))?r:"")+"	</ul>\n	</div>\n</div>"},usePartial:!0,useData:!0}),a.navbar=n({1:function(n,a,e,t,l){var r;return'            <div class="pull-right">\n                <i>Logged in as <strong>'+n.escapeExpression((r=null!=(r=e.username||(null!=a?a.username:a))?r:e.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"username",hash:{},data:l}):r))+'</strong> </i>\n                <a class="btn btn-primary" id="logout-link" >Logout</a>\n            </div>\n            <div class="post-project"><a href="#" >POST A PROJECT</a></div>\n\n'},3:function(n,a,e,t,l){return'            <div class="pull-right">\n                <a class="btn btn-primary" id="login-link"\n                   data-toggle="modal" data-target="#signin" >Login</a>\n            </div>\n'},5:function(n,a,e,t,l){var r;return"                        "+n.escapeExpression((r=null!=(r=e.error||(null!=a?a.error:a))?r:e.helperMissing,"function"==typeof r?r.call(null!=a?a:{},{name:"error",hash:{},data:l}):r))+"\n"},compiler:[7,">= 4.0.0"],main:function(n,a,e,t,l){var r,i=null!=a?a:{};return'<div class="navBar">\n    <div class="pageTitle">\n\n        <h1>MIT HACKTRACK</h1>\n\n    </div>\n    <div class="navActions">\n\n'+(null!=(r=e["if"].call(i,null!=a?a.user_logged_in:a,{name:"if",hash:{},fn:n.program(1,l,0),inverse:n.program(3,l,0),data:l}))?r:"")+'\n        <div class="profile">\n        </div>\n    </div>\n    <div class="mainImg">\n    </div>\n</div>\n\n\n\n\n<!--//////////// Modals ///////////-->\n\n\n<div class="modal fade" id="signin">\n    <div class="modal-dialog modal-sm">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal">x</button>\n                <h4 class="modal-title">Login to Hacktrack</h4>\n            </div>\n            <div class="modal-body">\n                <div class="error">\n'+(null!=(r=e["if"].call(i,null!=a?a.error:a,{name:"if",hash:{},fn:n.program(5,l,0),inverse:n.noop,data:l}))?r:"")+'                </div>\n                <form id="signin-form">\n                    <div class="form-group">\n                        <p><input type="text" class="form-control" name="username" required placeholder="Username"/></p>\n                        <p><input type="password" class="form-control" name="password" required placeholder="Password"/></p>\n                        <p><button type="submit" class="btn btn-primary">Sign in</button>\n                    </div>\n                </form>\n            </div>\n            <div class="modal-footer">\n                New to Hacktrack?\n                <a data-toggle="modal" data-target="#register" data-dismiss="modal" class="btn btn-primary" href="#">Register</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n<div class="modal fade" id="register">\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal">x</button>\n                <h4 class="modal-title">Sign up for Hacktrack</h4>\n            </div>\n            <div class="modal-body">\n                <div class="error">\n'+(null!=(r=e["if"].call(i,null!=a?a.error:a,{name:"if",hash:{},fn:n.program(5,l,0),inverse:n.noop,data:l}))?r:"")+'                </div>\n                <form id="register-form">\n                    <div class="form-group">\n                        <p><input type="text" class="form-control" name="username" required placeholder="Username"/></p>\n                        <p><input type="text" class="form-control" name="email" required placeholder="Email"/></p>\n                        <p><input type="password" class="form-control" name="password" required placeholder="Password"/></p>\n                        <p><input type="password" class="form-control" name="confirm" required placeholder="Confirm password"/></p>\n                        <p><button type="submit" class="btn btn-primary">Sign up</button>\n                    </div>\n                </form>\n            </div>\n            <div class="modal-footer">\n                Already have an account?\n                <a data-toggle="modal" href="#signin" data-dismiss="modal" class="btn btn-primary">Login</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n<!--//////////////////// END MODALS ////////////////////-->\n\n'},useData:!0}),a.postProject=n({compiler:[7,">= 4.0.0"],main:function(n,a,e,t,l){var r;return(null!=(r=n.invokePartial(t.navbar,a,{name:"navbar",data:l,helpers:e,partials:t,decorators:n.decorators}))?r:"")+'<div class="error"></div>\n<form class="pure-form pure-form-aligned" id="post-project">\n    <fieldset>\n        <div class="pure-control-group">\n            <label for="name">Title</label>\n            <input id="project-title" type="text" placeholder="Title">\n        </div>\n\n        <div class="pure-control-group">\n            <label for="foo">Description</label>\n            <textarea id="project-description" placeholder="Enter description of a project..."></textarea>\n        </div>\n\n        <div class="pure-control-group">\n            <label for="foo">Image Links</label>\n            <textarea id="project-image-links" placeholder="Enter image links separated by commas..."></textarea>\n        </div>\n\n        <div class="pure-controls">\n            <button type="submit" class="pure-button pure-button-primary">Submit</button>\n        </div>\n    </fieldset>\n</form>'},usePartial:!0,useData:!0}),a.project=n({1:function(n,a,e,t,l){var r;return'		<div class="projectContent projectImage"><img style="height:75px; width:75px" src='+n.escapeExpression(n.lambda(null!=(r=null!=a?a.imageLinks:a)?r[0]:r,a))+"></div>\n"},3:function(n,a,e,t,l){return'		<div class="projectContent projectImage"><img style="height:75px; width:75px" src="http://sloansocialimpact.mit.edu/wp-content/uploads/2014/02/MIT_Dome_night1_Edit.jpg"></div>\n'},compiler:[7,">= 4.0.0"],main:function(n,a,e,t,l){var r,i,o=null!=a?a:{},s=e.helperMissing,d="function",c=n.escapeExpression;return'\n<li class="project" data-project-id='+c((i=null!=(i=e._id||(null!=a?a._id:a))?i:s,typeof i===d?i.call(o,{name:"_id",hash:{},data:l}):i))+'>\n<a href="projects/'+c((i=null!=(i=e._id||(null!=a?a._id:a))?i:s,typeof i===d?i.call(o,{name:"_id",hash:{},data:l}):i))+'" class="project-link">\n	<div class="projectContent voteCount">\n		'+c(n.lambda(null!=(r=null!=a?a.upvoterIDs:a)?r.length:r,a))+"\n	</div>\n"+(null!=(r=e["if"].call(o,null!=(r=null!=a?a.imageLinks:a)?r[0]:r,{name:"if",hash:{},fn:n.program(1,l,0),inverse:n.program(3,l,0),data:l}))?r:"")+'\n	<div class="projectContent projectDetails">\n		<div class="projectTitle">\n			'+c((i=null!=(i=e.title||(null!=a?a.title:a))?i:s,typeof i===d?i.call(o,{name:"title",hash:{},data:l}):i))+'\n		</div>\n		<div class="projectBlurb">\n			'+c((i=null!=(i=e.description||(null!=a?a.description:a))?i:s,typeof i===d?i.call(o,{name:"description",hash:{},data:l}):i))+"\n		</div>\n	</div>\n</a>	\n</li>\n"},useData:!0}),a.projectView=n({compiler:[7,">= 4.0.0"],main:function(n,a,e,t,l){return'<div class="projectMain" >\n<div class="nav"></div>\n<div class="projectContent">\n<div class="projectTitle">Sample Title</div>\n<div class="content">Main Content</div>\n</div>\n\n</div>\n'},useData:!0}),a.top_menu=n({1:function(n,a,e,t,l){return'			<a href="#" id="logout-link">Logout</a>\n'},3:function(n,a,e,t,l){return'			<a href="#" id="login-link">Login</a>\n'},compiler:[7,">= 4.0.0"],main:function(n,a,e,t,l){var r;return'<div id="top_menu">\n\n	<p>\n		<input type="text" name="search_box" placeholder="search">\n'+(null!=(r=e["if"].call(null!=a?a:{},null!=a?a.user_logged_in:a,{name:"if",hash:{},fn:n.program(1,l,0),inverse:n.program(3,l,0),data:l}))?r:"")+"	</p>\n\n</div>\n"},useData:!0})}();
