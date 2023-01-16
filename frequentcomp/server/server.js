const express = require('express');
const cors = require('cors');
const app = express();

//解决CORS跨域请求
app.use(cors());
app.set('port', 3005);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(express.static("./public"));
// app.use("/static", express.static("./public"));

app.use("/antdform", require("./api/form"));
app.use("/relationgraph", require("./api/form"));
app.use("/file", require("./api/file"));

app.listen(app.get('port'), () => {
    console.log(`start the server at: http://127.0.0.1:${app.get('port')}/`);
});
