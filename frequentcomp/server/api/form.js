const router = require("express").Router();

router.post("/validatename", function (req, res) {
    var data;
    console.log("validatename args: ", req.body)
    if (["俞澄", "魏霆震", "殷雷", "王颖", "赵加劲"].includes(req.body.name)) {
        data = {
            status: true,
            creator: {
                id: 64,
                name: "张三"
            }
        }
    } else {
        data = {
            status: false,
            creator: null
        }
    }
    res.end(JSON.stringify({
        code: 0,
        message: '',
        data: data
    }));
});

module.exports = router;