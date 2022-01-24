$(document).ready(function(){

    $('.nav-link').on("click", function(){

        $('.nav-link').removeClass('active');

        $(this).addClass('active');
    });

    $('.sort-button').on("click", function() {
        var sort = this.id + "-container";

        $('.sort-button').removeClass('active');
        $(this).addClass('active');

        $('.tab-container').removeClass('active');
        $('#' + sort).addClass('active');

    });



});
