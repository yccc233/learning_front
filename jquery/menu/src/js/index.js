
require([
    "jquery",
    "./count/calculate"
], function ($, cal) {
    $("#greet").click((event) => {
        alert("你也好啊！")
    });
    cal.initCounter();
    console.log("i am here! ")
});
