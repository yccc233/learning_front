
require([
    "jquery",
    "calculate",
], function ($, cal) {
    $("#greet").click((event) => {
        alert(`你也好啊！hh`)
    });
    cal.initCounter();
    console.log("i am here! ")

    var lang = 'zh';
    $(document).ready(function () {
    })
});
