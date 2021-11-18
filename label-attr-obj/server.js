const http = require("http");
const express = require("express");

const app = express();
const sever = http.createServer(app)
app.set("port", 3000);

app.use(express.static("./public"));

sever.listen(app.get("port"), () => {
    console.log(`start the server at: http://127.0.0.1:${app.get('port')}/`);
})