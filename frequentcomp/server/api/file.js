const router = require("express").Router();
var multiparty = require('multiparty');

router.post("/upload", function (req, res) {
    // console.log("req==============", req);
    var form = new multiparty.Form();
    form.encoding = 'utf-8';
    form.maxFilesSize = 20 * 1024 * 1024;
    form.parse(req, (err, fields, files) => {
        console.log("arg=======", fields, files);
        var filesTemp = JSON.stringify(files, null, 2);
        console.log("files========", filesTemp);
        if (err) {
            console.log('报错了：' + err);
        } else {
          
        }
        res.end(JSON.stringify({
            code: 0,
            message: '',
            data: ""
        }));
    });
});

module.exports = router;