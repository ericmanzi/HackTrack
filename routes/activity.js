/**
 * Created by ericmanzi on 11/30/15.
 */


router.get('/activityfeed', function(req, res) {
    if (req.currentUser) {

    } else {
        utils.sendErrResponse(res, utils.STATUS_CODE_FORBIDDEN,
            'There is no user currently logged in.');
    }
});