const router = require("express").Router();

router.post("/rg1", function (req, res) {
    var data = {};
    console.log("rg1 args: ", req.body)
    res.end(JSON.stringify({
        code: 0,
        message: '',
        data: data
    }));
});

module.exports = router;