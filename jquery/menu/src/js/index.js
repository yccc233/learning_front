const $ = require("jquery");
function a() {
    $( "#target" ).contextmenu(function(event) {
        alert( "处理程序.contextmenu()被调用。" );
        event.preventDefault();
    });
}

a();