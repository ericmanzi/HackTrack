!function(){var n=Handlebars.template,e=Handlebars.templates=Handlebars.templates||{};e.index=n({1:function(n,e,a,t,r){var i;return null!=(i=n.invokePartial(t.project,e,{name:"project",data:r,indent:"		",helpers:a,partials:t,decorators:n.decorators}))?i:""},3:function(n,e,a,t,r){return"		<p><em>No projects yet!</em></p>\n"},compiler:[7,">= 4.0.0"],main:function(n,e,a,t,r){var i;return'<div id="projects">\n\n	<h1>MIT HackTrack</h1>\n'+(null!=(i=a.each.call(null!=e?e:{},null!=e?e.projects:e,{name:"each",hash:{},fn:n.program(1,r,0),inverse:n.program(3,r,0),data:r}))?i:"")+"</div>"},usePartial:!0,useData:!0}),e.project=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,t,r){return'<div class="listProject">\n<div>This is the project</div>\n</div>'},useData:!0}),e.projectView=n({compiler:[7,">= 4.0.0"],main:function(n,e,a,t,r){return'<div class="projectMain" >\n<div class="nav"></div>\n<div class="projectContent">\n<div class="projectTitle">Sample Title</div>\n<div class="content">Main Content</div>\n</div>\n\n</div>\n'},useData:!0}),e.top_menu=n({1:function(n,e,a,t,r){return'			<a href="#" id="logout-link">Logout</a>\n'},3:function(n,e,a,t,r){return'			<a href="#" id="login-link">Login</a>\n'},compiler:[7,">= 4.0.0"],main:function(n,e,a,t,r){var i;return'<div id="top_menu">\n\n	<p>\n		<input type="text" name="search_box" placeholder="search">\n'+(null!=(i=a["if"].call(null!=e?e:{},null!=e?e.user_logged_in:e,{name:"if",hash:{},fn:n.program(1,r,0),inverse:n.program(3,r,0),data:r}))?i:"")+"	</p>\n\n</div>"},useData:!0})}();
