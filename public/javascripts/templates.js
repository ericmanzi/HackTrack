(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['edit-project'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "      <input type=\"text\" class=\"form-control\" id=\"project-edit-videoLink\" value=\"https://www.youtube.com/watch?v="
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.videoID : stack1), depth0))
    + "\" required>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "      <input type=\"text\" class=\"form-control\" id=\"project-edit-videoLink\" placeholder=\"Enter project video link...\" required>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.imageLinks : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "          <div><input type=\"text\" class=\"form-control project-edit-image-links\" value="
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ">\n          <button class=\"btn btn-warning btn-sm remove_imagelink_field\">Remove</button></div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "        <div><input type=\"text\" class=\"form-control project-edit-image-links\" placeholder=\"Enter project image link...\">\n        <button class=\"btn btn-warning btn-sm remove_imagelink_field\">Remove</button></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<form id=\"edit-project\" data-project-edit-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n    <h1 class=\"project-edit-label-h1\">Edit Project</h1>\n  <div class=\"alert alert-danger\" id=\"edit-project-error\" style=\"display:none;\"></div>\n  <fieldset class=\"form-group\">\n    <label for=\"projectTitle\">Edit Project Title</label>\n    <input type=\"text\" class=\"form-control\" id=\"project-edit-title\" maxlength=\"100\" value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.title : stack1), depth0))
    + " required>\n  </fieldset>\n  <fieldset class=\"form-group\">\n    <label for=\"projectDescription\">Edit Project Description *</label>\n    <textarea class=\"form-control\" id=\"project-edit-description\" rows=\"3\" required>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.description : stack1), depth0))
    + "</textarea>\n  </fieldset>\n  <fieldset class=\"form-group\">\n    <label for=\"projectVideoLink\">Edit Project Video Link </label>\n    <small class=\"text-muted\">(Only one YouTube video link)</small>\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.videoID : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "  </fieldset>\n  <fieldset class=\"form-group\">\n    <label for=\"projectTags\">Edit Project Tags</label>\n    <small class=\"text-muted\">(Click enter after entering each tag)</small>\n    <ul id=\"project-edit-tags\" class=\"form-control\"></ul>\n  </fieldset>\n  <fieldset class=\"form-group\">\n    <div class=\"image_input_fields_wrap\">\n      <label for=\"projectImageLinks\">Edit Project Image Links</label>\n      <small class=\"text-muted\">(Enter one link per input field, max 5 images)</small>\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.imageLinks : stack1)) != null ? stack1["0"] : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "      <button type=\"button\" class=\"btn btn-success btn-sm add_imagelinkEdit_field_button\">Add more images</button>\n    </div>\n  </fieldset>\n  <hr />\n  <button type=\"button\" class=\"btn btn-primary\" id=\"submit-project-edit\">Submit</button>\n  <button type=\"button\" class=\"btn btn-danger\" id=\"cancel-project-edit\">Cancel</button>\n</form>";
},"usePartial":true,"useData":true});
templates['index'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "				<li class=\"tagSelector\" data-tag=\""
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"projects\" >\n	<div class=\"projectFeed\">\n"
    + ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		<ul id=\"tagSelection\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.tags : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n		<div id=\"searchContainer\">\n			<input type=\"text\" id=\"searchInput\" />\n		</div>\n		<div id=\"projectList\"></div>\n	</div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['navbar'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        <a href=\"#\" class=\"profile-link\"><div class=\"navAvatar pull-right\">\n            <div class=\"userImage\"><img src=\"https://www.whitehouse.gov/sites/whitehouse.gov/files/images/Administration/People/president_official_portrait_hires.jpg\" width=\"50\" height=\"50\"></div>\n        </div>\n        </a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"pull-right\">\n\n                <i>Logged in as <strong>"
    + container.escapeExpression(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"username","hash":{},"data":data}) : helper)))
    + "</strong> </i>\n                <a class=\"btn btn-primary\" id=\"logout-link\" >Logout</a>\n            </div>\n            <div class=\"post-project\"><a href=\"#\" id=\"post-project-link\">POST A PROJECT</a></div>\n\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"pull-right\">\n                <a class=\"btn btn-primary\" id=\"login-link\"\n                   data-toggle=\"modal\" data-target=\"#signin\" >Login</a>\n            </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"navBar\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.user_logged_in : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"pageTitle\">\n        <h1 class=\"home-link\"><a href=\"#\" style=\"text-decoration:none;\">MIT HACKTRACK</a></h1>\n\n    </div>\n\n    <div class=\"navActions\">\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.user_logged_in : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "\n        <div class=\"profile\">\n        </div>\n    </div>\n    <div class=\"mainImg\">\n    </div>\n</div>\n\n\n\n\n<!--//////////// Modals ///////////-->\n\n\n<div class=\"modal fade\" id=\"signin\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">x</button>\n                <h4 class=\"modal-title\">Login to Hacktrack</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\n                <form id=\"signin-form\">\n                    <div class=\"form-group\">\n                        <p><input type=\"text\" class=\"form-control\" name=\"username\" required placeholder=\"Username\"/></p>\n                        <p><input type=\"password\" class=\"form-control\" name=\"password\" required placeholder=\"Password\"/></p>\n                        <p><button type=\"submit\" class=\"btn btn-primary\">Sign in</button>\n                    </div>\n                </form>\n            </div>\n            <div class=\"modal-footer\">\n                New to Hacktrack?\n                <a data-toggle=\"modal\" data-target=\"#register\" data-dismiss=\"modal\" class=\"btn btn-primary\" href=\"#\">Register</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n<div class=\"modal fade\" id=\"register\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">x</button>\n                <h4 class=\"modal-title\">Sign up for Hacktrack</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\n                <ul class=\"nav nav-tabs\" role=\"tablist\">\n                    <li role=\"presentation\" class=\"active\" id=\"register-nav-tab\">\n                        <a href=\"#register-tab\" role=\"tab\" data-toggle=\"tab\">Signup</a>\n                    </li>\n                    <li role=\"presentation\" id=\"terms-nav-tab\">\n                        <a href=\"#terms-tab\" role=\"tab\" data-toggle=\"tab\">Terms of Use</a>\n                    </li>\n                </ul>\n\n                <div class=\"tab-content\">\n                    <div role=\"tabpanel\" class=\"tab-pane active\" id=\"register-tab\">\n                        <form id=\"register-form\">\n                            <div class=\"form-group\"><br/>\n                                <p><input type=\"text\" class=\"form-control\" name=\"username\" required placeholder=\"Username\"/></p>\n                                <p><input type=\"text\" class=\"form-control\" name=\"email\" required placeholder=\"Email\"/></p>\n                                <p><input type=\"password\" class=\"form-control\" name=\"password\" required placeholder=\"Password\"/></p>\n                                <p><input type=\"password\" class=\"form-control\" name=\"confirm\" required placeholder=\"Confirm password\"/></p>\n                                <p><input type=\"checkbox\" id=\"agree\" >\n                                    By signing up, you agree to the\n                                    <a href=\"#terms-tab\" data-toggle=\"tab\" id=\"terms-link\">terms of use</a></p>\n                                <p><button type=\"submit\" class=\"btn btn-primary\" id=\"signup-btn\" disabled>Sign up</button>\n                            </div>\n                        </form>\n                    </div>\n                    <div role=\"tabpanel\" class=\"tab-pane\" id=\"terms-tab\">\n                        <div class=\"terms\">\u2028\n                            <h3>Terms of Use</h3>\u2028\n                            Please read this agreement before using MIT HackTrack.\n                            In order to use MIT HackTrack, you must accept the terms of this agreement.\n                            \u2028<ol>\u2028\n                                <li>\u2028\n                                    <strong>Your account</strong> <br/>\u2028\n                                    Use of this application is limited to members of the MIT community.\u2028\n                                    Therefore, you must provide your MIT email in order to access member features.\u2028\n                                    You may only create one account per email address and you must verify\u2028\n                                    that the MIT email address you have provided is valid and will\u2028\n                                    remain valid during the term of this agreement. Your username must\u2028\n                                    not impersonate someone else or cause confusion as to source, affiliation\u2028\n                                    or endorsement. You may not (or permit third parties to) create multiple\u2028\n                                    accounts that act or appear as a single account. Failure to comply with\u2028\n                                    these terms will result in the suspension of your account.\u2028\n                                </li>\u2028\n                                <li>\u2028\n                                    <strong>Comments and Feedback</strong><br/>\u2028\n                                    As a member of the HackTrack community, you may provide comments\u2028\n                                    and/or start discussions related to projects created by other users.\u2028\n                                    You understand and agree that activities such posting information that\u2028\n                                    is irrelevant to the discussion/project may constitute violation of\u2028\n                                    these terms and if so, will result in the suspension of your account.\u2028\n                                </li>\u2028\n                                <li>\u2028\n                                    <strong>Intellectual property</strong><br/>\u2028\n                                    We claim no intellectual property rights over the material you provide\u2028\n                                    to the app. Your profile and materials uploaded remain yours.\u2028\n                                    However, all projects that you post can be viewed publicly, even by\u2028\n                                    non-MIT members, you agree to allow others to view your Content.\u2028\n                                    You may not present ideas that you found on HackTrack as your own\u2028\n                                    without permission from the original poster. Doing so would constitute\u2028\n                                    grounds for the suspension of your account.\u2028\n                                </li>\u2028\n                            </ol>\u2028\n                            These terms of use constitute the entire legal agreement between you and\u2028\n                            MIT HackTrack and govern your use of HackTrack Content.\n                            \u2028</div>\n                    </div>\n                </div>\n\n\n            </div>\n            <div class=\"modal-footer\">\n                Already have an account?\n                <a data-toggle=\"modal\" href=\"#signin\" data-dismiss=\"modal\" class=\"btn btn-primary\">Login</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n<div class=\"modal fade\" id=\"emailSent\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">x</button>\n                <h4 class=\"modal-title\">What's next?</h4>\n            </div>\n            <div class=\"modal-body\">\n                Check your inbox for an email confirming your account.\n                To complete the registration process, you must click the link\n                in the email <strong>within the next 24 hours</strong>.\n                If you do not receive an email within a few minutes, check your\n                Spam folder to ensure it was not incorrectly moved.\n            </div>\n            <div class=\"modal-footer\">\n                <a data-dismiss=\"modal\" class=\"btn btn-default\">Back to main page</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n<!--//////////////////// END MODALS ////////////////////-->\n\n";
},"useData":true});
templates['postProject'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<form id=\"post-project\">\n    <h1 class=\"project-post-label-h1\">Post New Project</h1>\n  <div class=\"alert alert-danger\" id=\"post-project-error\" style=\"display:none;\"></div>\n  <fieldset class=\"form-group\">\n    <label for=\"projectTitle\">Project Title *</label>\n    <input type=\"text\" class=\"form-control\" id=\"project-post-title\" placeholder=\"Enter project title...\" maxlength=\"100\" required>\n  </fieldset>\n  <fieldset class=\"form-group\">\n    <label for=\"projectDescription\">Project Description *</label>\n    <textarea class=\"form-control\" id=\"project-post-description\" rows=\"3\" placeholder=\"Enter project description...\" required></textarea>\n  </fieldset>\n  <fieldset class=\"form-group\">\n    <label for=\"projectVideoLink\">Project Video Link </label>\n    <small class=\"text-muted\">(Only YouTube videos)</small>\n    <input type=\"text\" class=\"form-control\" id=\"project-post-videoLink\" placeholder=\"Enter project video link...\" required>\n  </fieldset>\n  <fieldset class=\"form-group\">\n    <label for=\"projectTags\">Project Tags</label>\n    <small class=\"text-muted\">(Click enter after entering each tag)</small>\n    <ul id=\"project-post-tags\" class=\"form-control\"></ul>\n  </fieldset>\n  <fieldset class=\"form-group\">\n    <div class=\"image_input_fields_wrap\">\n      <label for=\"projectImageLinks\">Project Image Links</label>\n      <small class=\"text-muted\">(Enter one link per input field, max 5 images)</small>\n      <div><input type=\"text\" class=\"form-control project-post-image-links\" placeholder=\"Enter project image link...\"></div>\n      <button type=\"button\" class=\"btn btn-success btn-sm add_imagelink_field_button\">Add more images</button>\n    </div>\n  </fieldset>\n  <hr />\n  <button type=\"button\" class=\"btn btn-primary\" id=\"submit-project-post\">Submit</button>\n  <button type=\"button\" class=\"btn btn-danger\" id=\"cancel-project-post\">Cancel</button>\n</form>";
},"usePartial":true,"useData":true});
templates['profile'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.project,depth0,{"name":"project","data":data,"indent":"\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "				<p><em>No projects yet!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<main class=\"page-main\">\n	<header class=\"profileHeader\">\n		<div class=\"profileContainer\">\n			<div class=\"profileAvatar\">\n				<span class=\"userImage\"><img src=\"https://www.whitehouse.gov/sites/whitehouse.gov/files/images/Administration/People/president_official_portrait_hires.jpg\" width=\"110\" height=\"110\"></span>\n			</div>\n			<div class=\"profileInfo\">\n				<h1 class=\"profileInfoTitle\">\n					"
    + container.escapeExpression(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "\n				</h1>\n			</div>\n			<div class=\"profileNavigation\">\n				<ul>\n					<li class=\"profile-navigation-tab\">\n						<a href=\"#\" id=\"view-favorites\">\n							Favorites\n						</a>\n					</li>\n					<li class=\"profile-navigation-tab\" id=\"view-myprojects\">\n						<a href=\"#\">My Projects</a>\n					</li>\n				</ul>\n			</div>\n\n		</div>\n	</header>\n	<div >\n		<div class= \"projectFeed\">\n			<ul class=\"projectList\"> \n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "			</ul>\n		</div>\n	</div>\n</main>";
},"usePartial":true,"useData":true});
templates['project'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"projectContent projectImage\"><img style=\"height:75px; width:75px\" src="
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.imageLinks : depth0)) != null ? stack1["0"] : stack1), depth0))
    + "></div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"projectContent projectImage\"><img style=\"height:75px; width:75px\" src=\"http://sloansocialimpact.mit.edu/wp-content/uploads/2014/02/MIT_Dome_night1_Edit.jpg\"></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n<li class=\"project\" data-project-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n<a href=\"projects/"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"project-link\">\n	<div class=\"projectContent voteCount\">\n		"
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.upvoterUsernames : depth0)) != null ? stack1.length : stack1), depth0))
    + "\n	</div>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.imageLinks : depth0)) != null ? stack1["0"] : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n	<div class=\"projectContent projectDetails\">\n		<div class=\"projectTitle\">\n			"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n		</div>\n		<div class=\"projectBlurb\">\n			"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n		</div>\n	</div>\n</a>	\n</li>\n";
},"useData":true});
templates['projectList'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "	<h3>"
    + container.escapeExpression(((helper = (helper = helpers.prettyDate || (depth0 != null ? depth0.prettyDate : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"prettyDate","hash":{},"data":data}) : helper)))
    + "</h3>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.project,depth0,{"name":"project","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "		<p><em>No projects posted on this day!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['projectView'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "            	<a href=\"#\" id=\"edit-project-button\">Edit project</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "						<img src="
    + container.escapeExpression(container.lambda(depth0, depth0))
    + " alt=\"image\" height=\"150px\">\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "						<div class=\"project-discussion-post\">\n							<div class=\"post-content project-discussion-head\">\n							    <span class=\"post-user\"><a href=\"#\" id=\"view-user\" view-user-id="
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + ">"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</a></span>\n							    <span class=\"post-time\">on "
    + alias4(((helper = (helper = helpers.prettyDate || (depth0 != null ? depth0.prettyDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"prettyDate","hash":{},"data":data}) : helper)))
    + " at "
    + alias4(((helper = (helper = helpers.prettyTime || (depth0 != null ? depth0.prettyTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"prettyTime","hash":{},"data":data}) : helper)))
    + "</span>\n							</div>\n							<div class=\"post-content project-discussion-body\">\n								"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "\n							</div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.user_logged_in),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "								<div class=\"project-discussion-comment\">\n									<div class=\"post-content discussion-comment-head\">\n							            <span class=\"post-user\"><a href=\"#\" id=\"view-user\" view-user-id="
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + ">"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</a></span>\n							            <span class=\"post-time\">on "
    + alias4(((helper = (helper = helpers.prettyDate || (depth0 != null ? depth0.prettyDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"prettyDate","hash":{},"data":data}) : helper)))
    + " at "
    + alias4(((helper = (helper = helpers.prettyTime || (depth0 != null ? depth0.prettyTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"prettyTime","hash":{},"data":data}) : helper)))
    + "</span>\n									</div>\n									<div class=\"post-content discussion-comment-body\">\n										"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "\n									</div>\n								</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "								<div class=\"comment-add\" data-discussion-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n									<input type=\"text\" class=\"comment-add-content\" id=\"comment-add-content-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" />\n									<button class=\"comment-add-btn\">Reply</button>\n								</div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "						No discussions have been opened yet for this project.\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "						<div class=\"project-discussion-add\">\n							<input type=\"text\" id=\"project-discussion-add-content\" />\n							<button id=\"project-discussion-add-btn\">Add Discussion</button>\n						</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return "\n<div class=\"project-container\" >\n	<div class=\"proj project-navigation\">\n   	\n   	<a href=\"#\" class=\"home-link\">\n   	<span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\" style=\"font-size:1.5em\"></span>\n   	</a>\n	\n	</div>\n	<div class=\"proj project-content\" >\n		<header class=\"project-header\" id=\"project-header\" data-project-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n			<div class=\"project-title\" id=\"projectView-title\">\n				"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.title : stack1), depth0))
    + "\n			</div>\n			<div class=\"project-description\" id=\"projectView-description\">\n				"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.description : stack1), depth0))
    + "\n                <br />\n                by <a href=\"#\" id=\"view-user\" view-user-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.owner : stack1), depth0))
    + ">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.owner : stack1), depth0))
    + "</a>\n			</div>\n\n            <a href=\"#\" id=\"myButton-upvote\"><span id=\"projectView-upvotes\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.upvoterUsernames : stack1)) != null ? stack1.length : stack1), depth0))
    + "</span> | Upvote</a>\n            <a href=\"#\" id=\"favorite-button\">Add to favorites</a>\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.is_owner_of_this_project : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</header>\n		<div class=\"project-body\">\n			<div class=\"project-body-left\">\n				<div class=\"project-media\">\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.imageLinks : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n				<div class=\"project-discussion\">\n					<div class=\"project-discussion-title\">\n					    Discussion\n				    </div>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.discussions : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.user_logged_in : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n			</div>\n			<div class=\"project-body-right\"></div>\n		</div>\n	</div>\n	</div>\n";
},"useData":true});
templates['top_menu'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "			<a href=\"#\" id=\"logout-link\">Logout</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "			<a href=\"#\" id=\"login-link\">Login</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"top_menu\">\n\n	<p>\n		<input type=\"text\" name=\"search_box\" placeholder=\"search\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.user_logged_in : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "	</p>\n\n</div>\n";
},"useData":true});
templates['userProfile'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.project,depth0,{"name":"project","data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "                    <p><em>No projects yet!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<main class=\"page-main\">\n    <header class=\"profileHeader\">\n        <div class=\"profileContainer\">\n            <div class=\"profileAvatar\">\n                <span class=\"userImage\"><img src=\"https://www.whitehouse.gov/sites/whitehouse.gov/files/images/Administration/People/president_official_portrait_hires.jpg\" width=\"110\" height=\"110\"></span>\n            </div>\n            <div class=\"profileInfo\">\n                <h1 class=\"profileInfoTitle\">\n                    "
    + container.escapeExpression(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "\n                </h1>\n            </div>\n        </div>\n    </header>\n    <div >\n        <div class= \"projectFeed\">\n            <ul class=\"projectList\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n    </div>\n</main>";
},"usePartial":true,"useData":true});
})();
