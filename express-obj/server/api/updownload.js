const router = require("express").Router();
var multiparty = require('multiparty');
var Blob = require('blob');

var fileStream;
var fileName;
var fileType;

router.post("/upload", function (req, res) {
    let form = new multiparty.Form();
    form.parse(req, function(err, query) {
        if (err) {
            console.log(err)
            res.end(JSON.stringify({code: -1, msg: err}));
            return;
        }
        fileStream = query.fileStream[0]
        fileName =  query.fileName[0]
        fileType = query.fileType[0]
        console.log("参数集", fileType, fileName, fileStream)
        res.end(JSON.stringify({code: 0, msg: "成功"}));
    })
})

router.post("/download", function (req, res) {
    res.end(JSON.stringify({code: 0, msg: "成功",data: {
        fileStream: fileStream,
        fileName: fileName,
        fileType: fileType
    }}));
})

module.exports = router;
