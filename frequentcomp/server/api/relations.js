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

router.post("/rg5", function (req, res) {
    var data = [{
        id: 'Classification',
        children: [
            { id: 'Logistic regression', value: 'Logistic regression' },
            { id: 'Linear discriminant analysis', value: 'Linear discriminant analysis'}
        ]
    }, {
        id: 'Models diversity',
        children: [
            {
                id: 'Different initializations',
                value: 'Different initializations',
            },
            {
                id: 'Different parameter choices',
                value: 'Different parameter choices',
            },
            {
                id: 'Different architectures',
                value: 'Different architectures',
            }
        ]
    }];
    console.log("rg5 args: ", req.body)
    res.end(JSON.stringify({
        code: 0,
        message: '',
        data: data
    }));
});

module.exports = router;