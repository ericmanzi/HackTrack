// Lead author: Favyen Bastani

(function() {
    $(document).on('click', '.tagSelector', function(evt) {
        evt.preventDefault();
        updateHomePage($(this).data('tag'), null);
    });

    $(document).on('click', '#searchBtn', function(evt) {
        evt.preventDefault();
        updateHomePage(null, $('#searchInput').val());
    });

    $(document).on('keydown', '#searchInput', function(evt) {
        if(evt.keyCode == 13) {
            evt.preventDefault();
            updateHomePage(null, $(this).val());
        }
    });
})();
