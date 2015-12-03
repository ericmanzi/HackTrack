// Lead author: Favyen Bastani

(function() {
	var reloadProjectList = function() {
		updateHomePage($('.tagSelector.active').data('tag'), $('#searchInput').val());
	};

    $(document).on('click', '.tagSelector', function(evt) {
        evt.preventDefault();
        $('.tagSelector.active').removeClass('active');
        $(this).addClass('active');
        reloadProjectList();
    });

    $(document).on('click', '#searchBtn', function(evt) {
        evt.preventDefault();
        reloadProjectList();
    });

    $(document).on('keydown', '#searchInput', function(evt) {
        if(evt.keyCode == 13) {
            evt.preventDefault();
            reloadProjectList();
        }
    });

    $(document).on('click', '#loadMoreProjects', function(evt) {
        evt.preventDefault();
        homeLoadMoreProjects();
    });
})();
