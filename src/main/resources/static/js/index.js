$(document).ready(function () {
    $(".person_option").hide();
    $("#div_top_user").hover(function () {
        $(".person_option").show();
    }, function () {
        $(".person_option").hide();
    });
    $(".person_option li").hover(function () {
        $(this).removeClass("divwhite").addClass("divblue");
    }, function () {
        $(this).removeClass("divblue").addClass("divwhite");
    });
    $("#li_personinfo").click(function () {
        /*<![CDATA[*/
        var userhref = /*[[@{/commonForward(location='userinfo')}]]*/"";
        /*]]>*/
        location.href = userhref;
    });
});