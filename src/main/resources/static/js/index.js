$(document).ready(function () {
    $(".person_option").hide();
    $("#div_top_user_msg").hover(function () {
        $(".person_option").slideDown("normal");
    },function () {
        $(".person_option").slideUp("normal");
    });
});