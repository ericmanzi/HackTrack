ermanzi_matoreva_kairat_ezennag_final
=====================================
heroku link: [https://hacktrack-mit.herokuapp.com](https://hacktrack-mit.herokuapp.com/)


## Authorship
While some files were edited by more than one person, we only list the main author of a file

#### Design Document Sections
* Overview, Security concerts - Favyen
* Concepts, Data Model - Kairat
* User Interface - George
* Design challenges - Eric

#### Application files
* models
    * post.js - Favyen
    * project.js - Kairat
    * user.js - Eric
    * activity.js - Favyen
    * common.js - Favyen
* public/javascripts
    * helpers.js - George
    * index.html - George
    * index.js - George
    * posts.js - Favyen
    * project.js - Kairat
    * users.js - Eric
    * csrf.js - Favyen
    * home.js - George

* public/stylesheets - George
* routes
    * index.js - George
    * projects.js - Kairat
    * users.js - Eric
    * common.js - Favyen
    * tags.js - Favyen
* templates
    * index.handlebars - George
    * navbar.handlebars - George, Eric
    * postProject.handlebars - Kairat
    * profile.handlebars - George
    * project.handlebars - George
    * projectList.handlebars - George
    * projectView.handlebars - Favyen, George
    * userProfile.handlebars - Eric
    * modals.handlebars - Eric
    * activity.handlebars - Eric
    * activityFeed.handlebars - Eric
    * edit-project.handlebars - Kairat
* test
    * postTest.js - Favyen
    * userTest.js - Eric
    * activityTest.js - Favyen
    * projectTest.js - Kairat
*utils
	* csrf.js - Favyen
	* email.js - Favyen
	* stringInArray.js - Eric
	* utils.js - Eric

* views - George
* emailtmpl - Favyen
* app.js - George


### Deviations from initial design
* Users can upvote their own projects.
* Can only add 5 images per project. Project images are added as links, not uploaded. Profile pictures, however, are uploaded. These design decisions were made to save space taken up by uploading images.
* Added mentioning of users in posts and subsequent email notification.
* Rate limiting was not implemented.
