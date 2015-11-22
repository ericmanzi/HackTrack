!function(){var n=Handlebars.template,e=Handlebars.templates=Handlebars.templates||{};e.index=n({1:function(n,e,a,r,i){var t;return null!=(t=n.invokePartial(r.project,e,{name:"project",data:i,indent:"		",helpers:a,partials:r,decorators:n.decorators}))?t:""},3:function(n,e,a,r,i){return"		<p><em>No projects yet!</em></p>\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,r,i){var t;return'<div id="projects" >\n	<div class= "projectFeed">\n		<ul class="projectList"> \n'+(null!=(t=n.invokePartial(r.navbar,e,{name:"navbar",data:i,indent:"	",helpers:a,partials:r,decorators:n.decorators}))?t:"")+(null!=(t=a.each.call(null!=e?e:{},null!=e?e.projects:e,{name:"each",hash:{},fn:n.program(1,i,0),inverse:n.program(3,i,0),data:i}))?t:"")+"	</ul>\n	</div>\n</div>"},usePartial:!0,useData:!0}),e.navbar=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,r,i){return'<div class="navBar">\n	<div class="pageTitle"> \n		<h1>MIT HACKTRACK</h1>\n	</div> \n		<div class="navActions">\n			<div class="post-project"><a href="#" >POST PROJECT</a></div>\n			<div class="profile">\n			</div>\n		</div>\n	<div class="mainImg">\n	</div>\n</div>'},useData:!0}),e.postProject=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,r,i){var t;return(null!=(t=n.invokePartial(r.navbar,e,{name:"navbar",data:i,helpers:a,partials:r,decorators:n.decorators}))?t:"")+'<div class="error"></div>\n<form class="pure-form pure-form-aligned" id="post-project">\n    <fieldset>\n        <div class="pure-control-group">\n            <label for="name">Title</label>\n            <input id="project-title" type="text" placeholder="Title">\n        </div>\n\n        <div class="pure-control-group">\n            <label for="foo">Description</label>\n            <textarea id="project-description" placeholder="Enter description of a project..."></textarea>\n        </div>\n\n        <div class="pure-control-group">\n            <label for="foo">Image Links</label>\n            <textarea id="project-image-links" placeholder="Enter image links separated by commas..."></textarea>\n        </div>\n\n        <div class="pure-controls">\n            <button type="submit" class="pure-button pure-button-primary">Submit</button>\n        </div>\n    </fieldset>\n</form>'},usePartial:!0,useData:!0}),e.project=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,r,i){var t,l=null!=e?e:{},o=a.helperMissing,s="function",d=n.escapeExpression;return'\n<li class="project" data-project-id='+d((t=null!=(t=a._id||(null!=e?e._id:e))?t:o,typeof t===s?t.call(l,{name:"_id",hash:{},data:i}):t))+'>\n<a href="projects/'+d((t=null!=(t=a._id||(null!=e?e._id:e))?t:o,typeof t===s?t.call(l,{name:"_id",hash:{},data:i}):t))+'" class="project-link">\n	<div class="projectContent voteCount">\n		75\n	</div>\n	<div class="projectContent projectImage"><img style="height:75px; width:75px"src="http://sloansocialimpact.mit.edu/wp-content/uploads/2014/02/MIT_Dome_night1_Edit.jpg"></div>\n	<div class="projectContent projectDetails">\n		<div class="projectTitle">\n			'+d((t=null!=(t=a.title||(null!=e?e.title:e))?t:o,typeof t===s?t.call(l,{name:"title",hash:{},data:i}):t))+'\n		</div>\n		<div class="projectBlurb">\n			'+d((t=null!=(t=a.description||(null!=e?e.description:e))?t:o,typeof t===s?t.call(l,{name:"description",hash:{},data:i}):t))+"\n		</div>\n	</div>\n</a>	\n</li>\n"},useData:!0}),e.projectView=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,r,i){return'<div class="projectMain" >\n<div class="nav"></div>\n<div class="projectContent">\n<div class="projectTitle">Sample Title</div>\n<div class="content">Main Content</div>\n</div>\n\n</div>\n'},useData:!0}),e.register=n({1:function(n,e,a,r,i){var t;return"            "+n.escapeExpression((t=null!=(t=a.error||(null!=e?e.error:e))?t:a.helperMissing,"function"==typeof t?t.call(null!=e?e:{},{name:"error",hash:{},data:i}):t))+"\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,r,i){var t;return'<div id="register">\n    <a href="#" id="home-link">Back to Home</a>\n    <h1>Register</h1>\n    <div class="error">\n'+(null!=(t=a["if"].call(null!=e?e:{},null!=e?e.error:e,{name:"if",hash:{},fn:n.program(1,i,0),inverse:n.noop,data:i}))?t:"")+'    </div>\n    <form id="register-form">\n        <div>Username: <input type="text" name="username" required /></div>\n        <div>Password: <input type="password" name="password" required /></div>\n        <div>Confirm Password: <input type="password" name="confirm" required /></div>\n        <input type="submit" />\n    </form>\n</div>\n'},useData:!0}),e.signin=n({1:function(n,e,a,r,i){var t;return"            "+n.escapeExpression((t=null!=(t=a.error||(null!=e?e.error:e))?t:a.helperMissing,"function"==typeof t?t.call(null!=e?e:{},{name:"error",hash:{},data:i}):t))+"\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,r,i){var t;return'<div id="signin">\n    <a href="#" id="home-link">Back to Home</a>\n    <h1>Sign in</h1>\n    <div class="error">\n'+(null!=(t=a["if"].call(null!=e?e:{},null!=e?e.error:e,{name:"if",hash:{},fn:n.program(1,i,0),inverse:n.noop,data:i}))?t:"")+'    </div>\n    <form id="signin-form">\n        <div>Username: <input type="text" name="username" required /></div>\n        <div>Password: <input type="password" name="password" required /></div>\n        <input type="submit" />\n    </form>\n</div>\n'},useData:!0}),e.top_menu=n({1:function(n,e,a,r,i){return'			<a href="#" id="logout-link">Logout</a>\n'},3:function(n,e,a,r,i){return'			<a href="#" id="login-link">Login</a>\n'},compiler:[7,">= 4.0.0"],main:function(n,e,a,r,i){var t;return'<div id="top_menu">\n\n	<p>\n		<input type="text" name="search_box" placeholder="search">\n'+(null!=(t=a["if"].call(null!=e?e:{},null!=e?e.user_logged_in:e,{name:"if",hash:{},fn:n.program(1,i,0),inverse:n.program(3,i,0),data:i}))?t:"")+"	</p>\n\n</div>"},useData:!0})}();
