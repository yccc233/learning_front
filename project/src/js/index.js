
require([
    "jquery",
    "calculate",
    "./package/jquery.i18n"
], function ($, cal, $18) {
    $("#greet").click((event) => {
        alert("你也好啊！hh")
    });
    cal.initCounter();
    console.log("i am here! ")



    var lang = 'zh';
    $(document).ready(function () {
    })
});
