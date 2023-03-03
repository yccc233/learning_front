var toPdf = require("office-to-pdf");
var multiparty = require('multiparty');
var fs = require('fs');

function wordToPdf() {
    let wordFile = '/www/' + "123.docx";
    console.log(53, wordFile)
    return fs.readFile(wordFile, function (err, result) {
        console.log(55, result)
        if (err) {
            console.log(err);
        } else {
            toPdf(result).then(
                (pdfBuffer) => {
                    console.log(60, pdfBuffer)
                    fs.writeFileSync("/www/test.pdf", pdfBuffer);
                    console.log(成功生成PDF文件)
                    // sendFile ToServer(* /pdf/test.pdf , '/sftp/pdf/test.pdf*) }, (err) => {
                    console.log(66, err);
                }
            );
        }
    });
}

var fileStream = '';
var fileName = '';
var fileType = '';

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
        console.log(">>>>>>upload参数集>>>>>>", fileName, fileStream.length)
        res.end(JSON.stringify({ code: 0, msg: "成功" }));
    })
})

router.post("/download", function (req, res) {
    res.end(JSON.stringify({ code: 0, msg: "成功", fileStram: fileStream }));
})