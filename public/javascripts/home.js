// Lead author: Favyen Bastani

(function() {
    $(document).on('click', '.tagSelector', function(evt) {
        evt.preventDefault();
        loadHomePage($(this).data('tag'), '');
    });
})();
