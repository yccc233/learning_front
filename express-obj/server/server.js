const express = require('express');
const cors = require('cors');
const app = express();
const test = require("./api/test");

//解决CORS跨域请求
app.use(cors());
app.set('port', 2999);

app.use(express.static("./public"));
app.use("/static", express.static("./public"));
app.use("/package", express.static("./package"));

app.use("/test", test);


app.use("/file", require("./api/updownload"));

app.listen(app.get('port'), () => {
    console.log(`start the server at: http://127.0.0.1:${app.get('port')}/`);
});




