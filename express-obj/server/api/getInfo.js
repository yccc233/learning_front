const router = require("express").Router();
const postParse = require('../utils')().postParse;
var sqlite3 = require("sqlite3").verbose();
var database = new sqlite3.Database("./server/datas/database1.db", function(e){
    if (e) throw e;
});


router.post("/getAccountById", function (req, res) {
    req.on("data", data => {
        data = postParse(data.toString());
        const {userid} = data;
        database.all(`select * from user_account where userid=${userid};`, (err1, rows1) => {
            database.all(`select * from user_info where userid=${userid};`, (err2, rows2) => {
                if (err1 || err2) {
                    res.end(JSON.stringify({
                        code: -1,
                        message: err1.toString() || err2.toString()
                    }))
                } else {
                    if (rows1.length > 0) {
                        let [account] = rows1,
                            info = rows2[0];
                        res.end(JSON.stringify({
                            code: 0,
                            message: "",
                            data: {
                                account: account.account,
                                role: account.role,
                                name: info ? info.name : account.account
                            }
                        }))
                    } else {
                        res.end(JSON.stringify({
                            code: 1,
                            message: "e 找不到数据呢。。。"
                        }))
                    }
                }
            });
        });
    });
});

module.exports = router;