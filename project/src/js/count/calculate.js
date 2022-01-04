

define(["jquery"], function ($) {
    function initCounter() {
        $("#counter").click(event => {
            let text = $("#counter").text();
            let num = +text.slice(5);   //转为number类型
            $("#counter").text(`计数 = ${num + 1}`)
        })
    }
    
    return {
        initCounter: initCounter
    }
});