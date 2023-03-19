const router = require("express").Router();
var toPdf = require("office-to-pdf");
// var multiparty = require('multiparty');
var fs = require('fs');
const util = require('util');
// util.promisify把原来的异步回调方法改成返回 Promise 实例的方法，  child_process  模块提供了衍生子进程的能力 创建子shell，可以直接执行shell管道命令，有回调
var exec = util.promisify(require('child_process').exec);

async function convertFile(originPath, fileName, convertType) {
    let stdout, stderr;
    try {
        const re = await exec(`soffice --headless --convert-to ${convertType} --outdir ${originPath} ${originPath + fileName}`);
        stdout = re.stdout;
        stderr = re.stderr;

    } catch (e) {
        stdout = "command error";
        stderr = e.toString();
        console.error(stderr);
    }
    return { status: !stderr ? 0 : -1, stdout: stdout, stderr: stderr };
}

async function deleteFile(fileAllPathWithName) {
    try {
        await exec("rm " + fileAllPathWithName);
    } catch (e) { console.error(e.toString()); }
}

// 转化类型
const convertType = {
    "doc": "docx"
};

function getRandomName() {
    const randStr = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
    return Array.from({ length: 15 }).map(() => randStr.at(Math.ceil(Math.random() * randStr.length))).join('');
}


async function getPDFfile(fileStream, fileType, callback) {
    const fileName = getRandomName();
    const fileAllName = `${fileName}.${fileType}`;
    const filePath = `${__dirname}/tmpfile/`;
    const fileBuffer = Buffer.from(fileStream, 'base64');
    const convert_type = convertType[fileType.toLowerCase()];

    await fs.writeFileSync(filePath + fileAllName, fileBuffer);
    const result = await convertFile(filePath, fileAllName, convert_type);
    if (result.status == 0) {
        var data = fs.readFileSync(filePath + fileName + "." + convert_type, "base64");
        typeof callback === "function" && callback({ status: 0, fileStream: data });
    } else {
        typeof callback === "function" && callback({ status: -1, error: "something error!" });
    }
    deleteFile(filePath + fileName + "." + fileType);
    deleteFile(filePath + fileName + "." + convert_type);
}


router.post("/getPDFfile", function (req, res) {
    const { fileStream, fileType } = req.body;
    res.setHeader("Content-Type", 'application/json;charset=UTF-8')
    if (fileStream && fileType) {
        getPDFfile(fileStream, fileType, function (result) {
            if (result.status === 0) {
                res.end(JSON.stringify({ code: 0, message: "完成", data: result.fileStream }));
            } else {
                res.end(JSON.stringify({ code: 3, message: "转换异常", data: result.error }));
            }
        });
    } else {
        res.end(JSON.stringify({ code: 3, message: "缺少参数", data: null }));
    }
});

module.exports = router;
