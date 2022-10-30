const router = require("express").Router();
var multiparty = require('multiparty');
var Blob = require('blob');
var fs = require("fs");
var path = require("path");
var http = require("http");

var fileStream;
var fileName;
var fileType;


router.post("/upload", function (req, res) {
  let form = new multiparty.Form();
  form.parse(req, function (err, query) {
    if (err) {
      console.log(err)
      res.end(JSON.stringify({ code: -1, msg: err }));
      return;
    }
    fileStream = query.fileStream[0]
    fileName = query.fileName[0]
    fileType = query.fileType[0]
    console.log("参数集", fileName, fileStream.length)
    res.end(JSON.stringify({ code: 0, msg: "成功" }));
  })
})

router.post("/download", function (req, res) {
  res.end(JSON.stringify({
    code: 0, msg: "成功", data: {
      fileStream: Buffer.from(fileStream,'binary'),
      fileName: fileName,
      fileType: fileType
    }
  }));
})

router.get("/getfile", function (req, res) {

  const options = {
    hostname: 'http://127.0.0.1:8080/',
    port: 80,
    path: '/static/word.docx',
    method: 'get',
  };
  var data = ''
  const reqRe = http.request(options, (rsp) => {
    console.log(`STATUS: ${rsp.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(rsp.headers)}`);
    rsp.setEncoding('utf8');
    rsp.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
      data += chunk;
    });
    rsp.on('end', () => {
      console.log('No more data in response.');
      res.type("text")
      res.write(data);
      res.end();
    });
  });

  reqRe.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // Write data to request body
  reqRe.write();
  reqRe.end();
})

module.exports = router;
