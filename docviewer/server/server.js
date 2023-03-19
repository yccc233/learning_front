const express = require('express');
const cors = require('cors');
const app = express();

//解决CORS跨域请求
app.use(cors());
app.set('port', 8080);

// body传参
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(express.static("./public"));
// app.use("/static", express.static("./public"));


// app.use("/files", require("./api/updownload"));
app.use("/transfer", require("./api/transfer"));
// app.use("/bin", require("./api/binary"));

app.listen(app.get('port'), () => {
    console.log(`start the server at: http://127.0.0.1:${app.get('port')}/`);
});

