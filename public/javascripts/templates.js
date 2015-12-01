(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['activity'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                created a new project:\n                <a href=\"#\" class=\"project-link\"><strong>"
    + alias4(((helper = (helper = helpers.project_title || (depth0 != null ? depth0.project_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"project_title","hash":{},"data":data}) : helper)))
    + "</strong></a>\n                <span class=\"post-text\"> on "
    + alias4(((helper = (helper = helpers.prettyDate || (depth0 != null ? depth0.prettyDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"prettyDate","hash":{},"data":data}) : helper)))
    + " at "
    + alias4(((helper = (helper = helpers.prettyTime || (depth0 != null ? depth0.prettyTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"prettyTime","hash":{},"data":data}) : helper)))
    + "</span>\n\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                posted on <a href=\"#\" class=\"project-link\">\n                <span class=\"project-title\"><strong>"
    + alias4(((helper = (helper = helpers.project_title || (depth0 != null ? depth0.project_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"project_title","hash":{},"data":data}) : helper)))
    + "</strong></span></a>\n            <span class=\"post-text\"> on "
    + alias4(((helper = (helper = helpers.prettyDate || (depth0 != null ? depth0.prettyDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"prettyDate","hash":{},"data":data}) : helper)))
    + " at "
    + alias4(((helper = (helper = helpers.prettyTime || (depth0 != null ? depth0.prettyTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"prettyTime","hash":{},"data":data}) : helper)))
    + "\n                <br/> "
    + alias4(((helper = (helper = helpers.post_text || (depth0 != null ? depth0.post_text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"post_text","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"activity\">\n    <div class=\"inline block\">\n        <div class=\"userImage\">\n            <img style=\"height:45px; width:45px\" src="
    + alias4(((helper = (helper = helpers.user_profile_picture || (depth0 != null ? depth0.user_profile_picture : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user_profile_picture","hash":{},"data":data}) : helper)))
    + ">\n        </div>\n    </div>\n\n    <div class=\"inline block\" data-project-id=\""
    + alias4(((helper = (helper = helpers.projID || (depth0 != null ? depth0.projID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"projID","hash":{},"data":data}) : helper)))
    + "\">\n            <strong><a href=\"#\" class=\"view-user\">"
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "</a></strong>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isProject : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n\n</li>\n";
},"useData":true});
templates['activityFeed'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.activity,depth0,{"name":"activity","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "        No activity yet. Follow another member of hacktrack to have their activity appear here.\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"activityFeed\">\n"
    + ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <div class=\"text-center\"><h3>Latest activity</h3></div><br/>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.activities : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true});
templates['edit-project'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <input type=\"text\" class=\"form-control\" id=\"project-edit-videoLink\" value=\"https://www.youtube.com/watch?v="
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.videoID : stack1), depth0))
    + "\" required>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <input type=\"text\" class=\"form-control\" id=\"project-edit-videoLink\" placeholder=\"Enter project video link...\" required>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.imageLinks : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "                    <div><input type=\"text\" class=\"form-control project-edit-image-links\" value="
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ">\n                    <button class=\"btn btn-warning btn-sm remove_imagelink_field\">Remove</button></div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "                <div><input type=\"text\" class=\"form-control project-edit-image-links\" placeholder=\"Enter project image link...\">\n                <button class=\"btn btn-warning btn-sm remove_imagelink_field\">Remove</button></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<form id=\"edit-project\" data-project-edit-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n    <h1 class=\"project-edit-label-h1\">Edit Project</h1>\n    <div class=\"alert alert-danger\" id=\"edit-project-error\" style=\"display:none;\"></div>\n    <fieldset class=\"form-group\">\n        <label for=\"projectTitle\">Edit Project Title</label>\n        <input type=\"text\" class=\"form-control\" id=\"project-edit-title\" maxlength=\"100\" value="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.title : stack1), depth0))
    + " required>\n    </fieldset>\n    <fieldset class=\"form-group\">\n        <label for=\"projectDescription\">Edit Project Description *</label>\n        <textarea class=\"form-control\" id=\"project-edit-description\" rows=\"3\" required>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.description : stack1), depth0))
    + "</textarea>\n    </fieldset>\n    <fieldset class=\"form-group\">\n        <label for=\"projectVideoLink\">Edit Project Video Link </label>\n        <small class=\"text-muted\">(Only one YouTube video link)</small>\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.videoID : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </fieldset>\n    <fieldset class=\"form-group\">\n        <label for=\"projectTags\">Edit Project Tags</label>\n        <small class=\"text-muted\">(Click enter after entering each tag)</small>\n        <ul id=\"project-edit-tags\" class=\"form-control\"></ul>\n    </fieldset>\n    <fieldset class=\"form-group\">\n        <div class=\"image_input_fields_wrap\">\n            <label for=\"projectImageLinks\">Edit Project Image Links</label>\n            <small class=\"text-muted\">(Enter one link per input field, max 5 images)</small>\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.imageLinks : stack1)) != null ? stack1["0"] : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "            <button type=\"button\" class=\"btn btn-success btn-sm add_imagelinkEdit_field_button\">Add more images</button>\n        </div>\n    </fieldset>\n    <hr />\n    <button type=\"button\" class=\"btn btn-primary\" id=\"submit-project-edit\">Submit</button>\n    <button type=\"button\" class=\"btn btn-danger\" id=\"cancel-project-edit\">Cancel</button>\n</form>\n";
},"usePartial":true,"useData":true});
templates['index'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <li class=\"tagSelector btn btn-default\" data-tag=\""
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"projects\" >\n    <div class=\"projectFeed\">\n"
    + ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.modals,depth0,{"name":"modals","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        <ul id=\"tagSelection\">\n            <li class=\"tagSelector btn btn-default\" data-tag=\"\">All</li>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.tags : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n        <div id=\"searchContainer\">\n            <div class=\"input-group\">\n                <input type=\"text\" class=\"form-control\" id=\"searchInput\" placeholder=\"Enter a search term\" />\n                <span class=\"input-group-btn\">\n                    <button type=\"submit\" class=\"btn btn-success\" id=\"searchBtn\">Search</button>\n                </span>\n            </div>\n        </div>\n        <div id=\"projectList\"></div>\n        <p><a href=\"#\" id=\"loadMoreProjects\">View more projects</a></p>\n    </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['modals'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "\n\n<div class=\"modal fade\" id=\"signin\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">x</button>\n                <h4 class=\"modal-title\">Login to Hacktrack</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\n                <form id=\"signin-form\">\n                    <div class=\"form-group\">\n                        <p><input type=\"text\" class=\"form-control\" name=\"username\" required autofocus placeholder=\"Username\"/></p>\n                        <p><input type=\"password\" class=\"form-control\" name=\"password\" required placeholder=\"Password\"/></p>\n                        <p><button type=\"submit\" class=\"btn btn-primary\">Sign in</button>\n                    </div>\n                </form>\n                <div class=\"forgot-password\">\n                    <p><a data-toggle=\"modal\" data-target=\"#pwreset-request\" data-dismiss=\"modal\" href=\"#\">Forgot your password?</a></p>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                New to Hacktrack?\n                <a data-toggle=\"modal\" data-target=\"#register\" data-dismiss=\"modal\" class=\"btn btn-primary\" href=\"#\">Register</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n<div class=\"modal fade\" id=\"register\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">x</button>\n                <h4 class=\"modal-title\">Sign up for Hacktrack</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\n                <ul class=\"nav nav-tabs\" role=\"tablist\">\n                    <li role=\"presentation\" class=\"active\" id=\"register-nav-tab\">\n                        <a href=\"#register-tab\" role=\"tab\" data-toggle=\"tab\">Signup</a>\n                    </li>\n                    <li role=\"presentation\" id=\"terms-nav-tab\">\n                        <a href=\"#terms-tab\" role=\"tab\" data-toggle=\"tab\">Terms of Use</a>\n                    </li>\n                </ul>\n\n                <div class=\"tab-content\">\n                    <div role=\"tabpanel\" class=\"tab-pane active\" id=\"register-tab\">\n                        <form id=\"register-form\">\n                            <div class=\"form-group\"><br/>\n                                <p><input type=\"text\" class=\"form-control\" name=\"username\" required autofocus placeholder=\"Username\"/></p>\n                                <p><input type=\"text\" class=\"form-control\" name=\"email\" required placeholder=\"Email\"/></p>\n                                <p><input type=\"password\" class=\"form-control\" name=\"password\" required placeholder=\"Password\"/></p>\n                                <p><input type=\"password\" class=\"form-control\" name=\"confirm\" required placeholder=\"Confirm password\"/></p>\n                                <p><input type=\"checkbox\" id=\"agree\" >\n                                    By signing up, you agree to the\n                                    <a href=\"#terms-tab\" data-toggle=\"tab\" id=\"terms-link\">terms of use</a></p>\n                                <p><button type=\"submit\" class=\"btn btn-primary\" id=\"signup-btn\" disabled>Sign up</button>\n                            </div>\n                        </form>\n                    </div>\n                    <div role=\"tabpanel\" class=\"tab-pane\" id=\"terms-tab\">\n                        <div class=\"terms\">\u2028\n                            <h3>Terms of Use</h3>\u2028\n                            Please read this agreement before using MIT HackTrack.\n                            In order to use MIT HackTrack, you must accept the terms of this agreement.\n                            \u2028<ol>\u2028\n                                <li>\u2028\n                                    <strong>Your account</strong> <br/>\u2028\n                                    Use of this application is limited to members of the MIT community.\u2028\n                                    Therefore, you must provide your MIT email in order to access member features.\u2028\n                                    You may only create one account per email address and you must verify\u2028\n                                    that the MIT email address you have provided is valid and will\u2028\n                                    remain valid during the term of this agreement. Your username must\u2028\n                                    not impersonate someone else or cause confusion as to source, affiliation\u2028\n                                    or endorsement. You may not (or permit third parties to) create multiple\u2028\n                                    accounts that act or appear as a single account. Failure to comply with\u2028\n                                    these terms will result in the suspension of your account.\u2028\n                                </li>\u2028\n                                <li>\u2028\n                                    <strong>Comments and Feedback</strong><br/>\u2028\n                                    As a member of the HackTrack community, you may provide comments\u2028\n                                    and/or start discussions related to projects created by other users.\u2028\n                                    You understand and agree that activities such posting information that\u2028\n                                    is irrelevant to the discussion/project may constitute violation of\u2028\n                                    these terms and if so, will result in the suspension of your account.\u2028\n                                </li>\u2028\n                                <li>\u2028\n                                    <strong>Intellectual property</strong><br/>\u2028\n                                    We claim no intellectual property rights over the material you provide\u2028\n                                    to the app. Your profile and materials uploaded remain yours.\u2028\n                                    However, all projects that you post can be viewed publicly, even by\u2028\n                                    non-MIT members, you agree to allow others to view your Content.\u2028\n                                    You may not present ideas that you found on HackTrack as your own\u2028\n                                    without permission from the original poster. Doing so would constitute\u2028\n                                    grounds for the suspension of your account.\u2028\n                                </li>\u2028\n                            </ol>\u2028\n                            These terms of use constitute the entire legal agreement between you and\u2028\n                            MIT HackTrack and govern your use of HackTrack Content.\n                            \u2028</div>\n                    </div>\n                </div>\n\n\n            </div>\n            <div class=\"modal-footer\">\n                Already have an account?\n                <a data-toggle=\"modal\" href=\"#signin\" data-dismiss=\"modal\" class=\"btn btn-primary\">Login</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n<div class=\"modal fade\" id=\"pwreset-request\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">x</button>\n                <h4 class=\"modal-title\">Reset your Password</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\n                <form id=\"pwreset-request-form\">\n                    <div class=\"form-group\">\n                        <p><input type=\"text\" class=\"form-control\" name=\"username\" required placeholder=\"Username\"/></p>\n                        <p><input type=\"text\" class=\"form-control\" name=\"email\" required placeholder=\"Email\"/></p>\n                        <p><button type=\"submit\" class=\"btn btn-primary\">Reset your Password</button>\n                    </div>\n                </form>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n<div class=\"modal fade\" id=\"pwreset-requested\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">x</button>\n                <h4 class=\"modal-title\">Password Reset Requested</h4>\n            </div>\n            <div class=\"modal-body\">\n                You have successfully requested a password reset. You will receive\n                an e-mail with instructions to complete the password reset process\n                shortly.\n            </div>\n            <div class=\"modal-footer\">\n                <a data-dismiss=\"modal\" class=\"btn btn-default\">Back to main page</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n<div class=\"modal fade\" id=\"pwreset-finish\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">x</button>\n                <h4 class=\"modal-title\">Reset your Password</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\n                <form id=\"pwreset-finish-form\">\n                    <div class=\"form-group\">\n                        <p>Enter a new password below to complete the password reset process.</p>\n                        <p><input type=\"password\" class=\"form-control\" name=\"password\" required placeholder=\"New password\"/></p>\n                        <p><button type=\"submit\" class=\"btn btn-primary\">Reset your Password</button>\n                    </div>\n                </form>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n<div class=\"modal fade\" id=\"pwreset-finished\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">x</button>\n                <h4 class=\"modal-title\">Password Reset Successfully</h4>\n            </div>\n            <div class=\"modal-body\">\n                You have successfully reset your password. You can now login with\n                your new password.\n            </div>\n            <div class=\"modal-footer\">\n                <a data-dismiss=\"modal\" class=\"btn btn-default\">Back to main page</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n\n\n<div class=\"modal fade\" id=\"emailSent\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">x</button>\n                <h4 class=\"modal-title\">What's next?</h4>\n            </div>\n            <div class=\"modal-body\">\n                Check your inbox for an email confirming your account.\n                To complete the registration process, you must click the link\n                in the email.\n                If you do not receive an email within a few minutes, check your\n                Spam folder to ensure it was not incorrectly moved.\n            </div>\n            <div class=\"modal-footer\">\n                <a data-dismiss=\"modal\" class=\"btn btn-default\">Back to main page</a>\n            </div>\n        </div><!-- /.modal-content -->\n    </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n";
},"useData":true});
templates['navbar'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <i>Logged in as <strong>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</strong> </i>\n                <div class=\"inline btn-group\">\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                        <div class=\"navAvatar\">\n                            <div class=\"userImage\"><img src=\""
    + alias4(((helper = (helper = helpers.profile_picture || (depth0 != null ? depth0.profile_picture : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profile_picture","hash":{},"data":data}) : helper)))
    + "\" width=\"50\" height=\"39\" id=\"profile-sm\"></div>\n                        </div>\n                    </a>\n\n                    <ul class=\"dropdown-menu dropdown-menu-right text-center\">\n                        <li><a href=\"#\" class=\"profile-link\">Profile</a></li>\n                        <li><a href=\"#\" class=\"act-feed-link\">Activity feed</a></li>\n                        <li role=\"separator\" class=\"divider\"></li>\n                        <li><a href=\"#\" id=\"logout-link\" >Logout</a></li>\n\n                    </ul>\n                </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <a class=\"btn btn-primary\" id=\"login-link\"\n                   data-toggle=\"modal\" data-target=\"#signin\" >Login</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"navBar\">\n\n    <div class=\"page-title\">\n        <h1 class=\"home-link\"><a href=\"#\" style=\"text-decoration:none;\">MIT HACKTRACK</a></h1>\n    </div>\n\n    <div class=\"navActions\">\n        <div class=\"pull-right\">\n            <a href=\"#\" class=\"home-link ht-navbar-btn\">HOME<br />&nbsp;</a>\n            <a href=\"#\" id=\"post-project-link\" class=\"ht-navbar-btn\">POST A PROJECT</a>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.user_logged_in : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "        </div>\n\n        <div class=\"profile\">\n        </div>\n    </div>\n    <div class=\"mainImg\">\n    </div>\n</div>\n\n";
},"useData":true});
templates['postProject'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<form id=\"post-project\">\n    <h1 class=\"project-post-label-h1\">Post New Project</h1>\n    <div class=\"alert alert-danger\" id=\"post-project-error\" style=\"display:none;\"></div>\n    <fieldset class=\"form-group\">\n        <label for=\"projectTitle\">Project Title *</label>\n        <input type=\"text\" class=\"form-control\" id=\"project-post-title\" placeholder=\"Enter project title...\" maxlength=\"100\" required>\n    </fieldset>\n    <fieldset class=\"form-group\">\n        <label for=\"projectDescription\">Project Description *</label>\n        <textarea class=\"form-control\" id=\"project-post-description\" rows=\"3\" placeholder=\"Enter project description...\" required></textarea>\n    </fieldset>\n    <fieldset class=\"form-group\">\n        <label for=\"projectVideoLink\">Project Video Link </label>\n        <small class=\"text-muted\">(Only YouTube videos)</small>\n        <input type=\"text\" class=\"form-control\" id=\"project-post-videoLink\" placeholder=\"Enter project video link...\" required>\n    </fieldset>\n    <fieldset class=\"form-group\">\n        <label for=\"projectTags\">Project Tags</label>\n        <small class=\"text-muted\">(Click enter after entering each tag)</small>\n        <ul id=\"project-post-tags\" class=\"form-control\"></ul>\n    </fieldset>\n    <fieldset class=\"form-group\">\n        <div class=\"image_input_fields_wrap\">\n            <label for=\"projectImageLinks\">Project Image Links</label>\n            <small class=\"text-muted\">(Enter one link per input field, max 5 images)</small>\n            <div><input type=\"text\" class=\"form-control project-post-image-links\" placeholder=\"Enter project image link...\"></div>\n            <button type=\"button\" class=\"btn btn-success btn-sm add_imagelink_field_button\">Add more images</button>\n        </div>\n    </fieldset>\n    <hr />\n    <button type=\"button\" class=\"btn btn-primary\" id=\"submit-project-post\">Submit</button>\n    <button type=\"button\" class=\"btn btn-danger\" id=\"cancel-project-post\">Cancel</button>\n</form>\n";
},"usePartial":true,"useData":true});
templates['profile'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "                        <li class=\"profile-navigation-tab isActive\">\n                            <a href=\"#\" id=\"view-favorites\">\n                                Favorites\n                            </a>\n                        </li>\n                        <li class=\"profile-navigation-tab\" id=\"view-myprojects\">\n                            <a href=\"#\">My Projects</a>\n                        </li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                        <li class=\"profile-navigation-tab\">\n                            <a href=\"#\" id=\"view-favorites\">\n                                Favorites\n                            </a>\n                        </li>\n                        <li class=\"profile-navigation-tab isActive\" id=\"view-myprojects\">\n                            <a href=\"#\">My Projects</a>\n                        </li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.project,depth0,{"name":"project","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return "                <p><em>No projects yet!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<main class=\"page-main\">\n    <header class=\"profileHeader\">\n        <div class=\"profileContainer\">\n            <div class=\"profileAvatar\">\n                <span class=\"userImage\">\n                    <img src=\""
    + alias4(((helper = (helper = helpers.profile_picture || (depth0 != null ? depth0.profile_picture : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profile_picture","hash":{},"data":data}) : helper)))
    + "\" width=\"110\" height=\"110\" id=\"profile-md\">\n                </span>\n                <div class=\"thumb_meta\">\n                    <a href=\"#uploadProfilePic\" data-toggle=\"modal\" id=\"change-profile\">\n                        Change profile picture</a></div>\n\n            </div>\n            <div class=\"profileInfo\">\n                <h1 class=\"profileInfoTitle\">\n                    "
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "\n                </h1>\n            </div>\n            <div class=\"profileNavigation\">\n                <ul>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isFavorites : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n                </ul>\n            </div>\n\n        </div>\n    </header>\n    <div >\n        <div class= \"projectFeed\">\n            <ul class=\"projectList\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n    </div>\n</main>\n\n<!-- Modal  Add Profile Pic-->\n<div class=\"modal fade\" id=\"uploadProfilePic\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">x</button>\n                <h4 class=\"modal-title\">Change Profile Picture</h4>\n            </div>\n            <div id = 'upload_modal' class=\"modal-body\">\n                <input type=\"file\" name=\"fileselect\" id=\"fileselect\" accept='image/*'>\n                <p class=\"help-block\">Browse for picture to add.</p>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n                <button id='upload_profile_button' type=\"button\" class=\"btn btn-default\">Upload</button>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['project'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <div class=\"projectContent projectImage\"><img style=\"height:75px; width:75px\" src="
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.imageLinks : depth0)) != null ? stack1["0"] : stack1), depth0))
    + "></div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"projectContent projectImage\"><img style=\"height:75px; width:75px\" src=\"http://sloansocialimpact.mit.edu/wp-content/uploads/2014/02/MIT_Dome_night1_Edit.jpg\"></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n<li class=\"project\" data-project-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n<a href=\"projects/"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"project-link\">\n    <div class=\"projectContent voteCount\">\n        "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.upvoterUsernames : depth0)) != null ? stack1.length : stack1), depth0))
    + "\n    </div>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.imageLinks : depth0)) != null ? stack1["0"] : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"projectContent projectDetails\">\n        <div class=\"projectTitle\">\n            "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n        </div>\n        <div class=\"projectBlurb\">\n            "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n        </div>\n    </div>\n</a>\n</li>\n";
},"useData":true});
templates['projectList'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "    <h3>"
    + container.escapeExpression(((helper = (helper = helpers.prettyDate || (depth0 != null ? depth0.prettyDate : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"prettyDate","hash":{},"data":data}) : helper)))
    + "</h3>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.project,depth0,{"name":"project","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "        <p><em>No projects posted on this day!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['projectView'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                <button id=\"myButton-upvote\" class=\"project-actions\"><span id=\"projectView-upvotes\">\n                    "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.upvoterUsernames : stack1)) != null ? stack1.length : stack1), depth0))
    + "</span> | Upvote</button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                <button id=\"myButton-upvote\" class=\"project-actions\" disabled><span id=\"projectView-upvotes\">\n                    "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.upvoterUsernames : stack1)) != null ? stack1.length : stack1), depth0))
    + "</span> | Upvote</button>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.favorited : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "                    <button id=\"unfavorite-button\" class=\"project-actions\">Unfavorite</button>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "                    <button id=\"favorite-button\" class=\"project-actions\">Add to favorites</button>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "                <button id=\"edit-project-button\" class=\"project-actions\">Edit project</button>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing, alias5="function";

  return "                        <div class=\"project-discussion-post\">\n                            <div class=\"post-content project-discussion-head\">\n                                <span class=\"userImage\"><img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.profile_picture : stack1), depth0))
    + "\" width=\"35\" height=\"35\"></span>\n                                <span class=\"post-user\"><a href=\"#\" class=\"view-user\" view-user-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + ">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "</a></span>\n                                <span class=\"post-time\">on "
    + alias2(((helper = (helper = helpers.prettyDate || (depth0 != null ? depth0.prettyDate : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"prettyDate","hash":{},"data":data}) : helper)))
    + " at "
    + alias2(((helper = (helper = helpers.prettyTime || (depth0 != null ? depth0.prettyTime : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"prettyTime","hash":{},"data":data}) : helper)))
    + "</span>\n                            </div>\n                            <div class=\"post-content project-discussion-body\">\n                                "
    + alias2(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"content","hash":{},"data":data}) : helper)))
    + "\n                            </div>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.comments : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (data && data.root)) && stack1.user_logged_in),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                        </div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing, alias5="function";

  return "                                <div class=\"project-discussion-comment\">\n                                    <div class=\"post-content discussion-comment-head\">\n                                        <span class=\"userImage\"><img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.profile_picture : stack1), depth0))
    + "\" width=\"35\" height=\"35\"></span>\n                                        <span class=\"post-user\"><a href=\"#\" class=\"view-user\" view-user-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + ">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "</a></span>\n                                        <span class=\"post-time\">on "
    + alias2(((helper = (helper = helpers.prettyDate || (depth0 != null ? depth0.prettyDate : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"prettyDate","hash":{},"data":data}) : helper)))
    + " at "
    + alias2(((helper = (helper = helpers.prettyTime || (depth0 != null ? depth0.prettyTime : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"prettyTime","hash":{},"data":data}) : helper)))
    + "</span>\n                                    </div>\n                                    <div class=\"post-content discussion-comment-body\">\n                                        "
    + alias2(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"content","hash":{},"data":data}) : helper)))
    + "\n                                    </div>\n                                </div>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                                <div class=\"comment-add\" data-discussion-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n                                    <input type=\"text\" class=\"comment-add-content\" id=\"comment-add-content-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" />\n                                    <button class=\"comment-add-btn btn btn-default\">Reply</button>\n                                </div>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "                        No discussions have been opened yet for this project.\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "                        <div class=\"project-discussion-add\">\n                            <input type=\"text\" id=\"project-discussion-add-content\" />\n                            <button id=\"project-discussion-add-btn\" class = \"btn btn-default\">Add Discussion</button>\n                        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return "\n<div class=\"project-container\" >\n    <div class=\"proj\" >\n        <header class=\"project-header\" id=\"project-header\" data-project-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n                <a href=\"#\" class=\"home-link\">\n                    <span class=\"glyphicon glyphicon-remove cancel-button\" aria-hidden=\"true\" style=\"font-size:3em; padding-top:2px; padding-left:2px\"></span>\n                </a>\n\n            <div class=\"project-title\" id=\"projectView-title\">\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.title : stack1), depth0))
    + "\n            </div>\n            <div class=\"project-description\" id=\"projectView-description\">\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.description : stack1), depth0))
    + "\n                <br />\n                by <a href=\"#\" class=\"view-user\" view-user-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.owner : stack1), depth0))
    + ">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.project : depth0)) != null ? stack1.owner : stack1), depth0))
    + "</a>\n            </div>\n\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.user_logged_in : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.user_logged_in : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.is_owner_of_this_project : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </header>\n        <div class=\"project-body\">\n            <div class=\"project-body-left\">\n                <div class=\"project-content project-media\">\n                    <div class=\"project-media\">\n                        <div id=\"owl-demo\" class=\"owl-carousel owl-theme\">\n                            <div class=\"item\"><img src=\"/images/owl1.jpg\" alt=\"Owl Image\"></div>\n                            <div class=\"item\"><img src=\"/images/owl2.jpg\" alt=\"Owl Image\"></div>\n                            <div class=\"item\"><img src=\"/images/owl3.jpg\" alt=\"Owl Image\"></div>\n                            <div class=\"item\"><img src=\"/images/owl4.jpg\" alt=\"Owl Image\"></div>\n                            <div class=\"item\"><img src=\"/images/owl5.jpg\" alt=\"Owl Image\"></div>\n                            <div class=\"item\"><img src=\"/images/owl6.jpg\" alt=\"Owl Image\"></div>\n                            <div class=\"item\"><img src=\"/images/owl7.jpg\" alt=\"Owl Image\"></div>\n                            <div class=\"item\"><img src=\"/images/owl8.jpg\" alt=\"Owl Image\"></div>\n                        </div>\n                        <a href=\"#\" class=\"prev\"><span class=\"glyphicon glyphicon-menu-left\"></span></a>\n                        <a href=\"#\" class=\"next\"><span class=\"glyphicon glyphicon-menu-right\" style=\"float:right;\"></span></a>\n                    </div>\n                </div>\n                <div class=\"project-content project-discussion\">\n                    <div class=\"project-discussion-title\">\n                        Discussion\n                    </div>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.discussions : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.user_logged_in : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\n            </div>\n            <div class=\"project-body-right\"></div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['top_menu'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "            <a href=\"#\" id=\"logout-link\">Logout</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <a href=\"#\" id=\"login-link\">Login</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"top_menu\">\n\n    <p>\n        <input type=\"text\" name=\"search_box\" placeholder=\"search\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.user_logged_in : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </p>\n\n</div>\n";
},"useData":true});
templates['userProfile'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.following : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "                    <button type=\"button\" class=\"btn btn-warning pull-right\" id=\"unfollow-btn\"><strong>UNFOLLOW</strong></button>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                    <button type=\"button\" class=\"btn btn-warning pull-right\" id=\"follow-btn\"><strong>FOLLOW</strong></button>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.project,depth0,{"name":"project","data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return "                    <p><em>No projects yet!</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<main class=\"page-main\">\n    <header class=\"profileHeader user-profile\">\n        <div class=\"profileContainer\" data-user-id="
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + ">\n            <div class=\"profileAvatar\">\n                <span class=\"userImage\"><img src=\""
    + alias4(((helper = (helper = helpers.user_profile_picture || (depth0 != null ? depth0.user_profile_picture : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user_profile_picture","hash":{},"data":data}) : helper)))
    + "\" width=\"110\" height=\"110\"></span>\n            </div>\n            <div class=\"profileInfo\">\n                <h1 class=\"profileInfoTitle\">\n                    "
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "\n                </h1>\n            </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.user_logged_in : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </header>\n    <div >\n        <div class= \"projectFeed\">\n            <ul class=\"projectList\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n    </div>\n</main>";
},"usePartial":true,"useData":true});
})();
