const router = require("express").Router();
const postParse = require('../utils')().postParse;
var sqlite3 = require("sqlite3").verbose();
var database = new sqlite3.Database("./server/datas/database1.db", function(e){
    if (e) throw e;
});

/**
 * res.data.type
 * 0 正常 1密码或角色错误 2角色不存在
 */
router.post("/verify", function (req, res) {
    req.on("data", data => {
        let params = postParse(data.toString());
        let sql = `select * from user_account where account='${params.account}';`;
        database.all(sql, (err, rows) => {
            if (err) {
                res.end(JSON.stringify({
                    code: -1,
                    message: "ERROR: " + err.toString(),
                    data: ""
                }))
                throw err;
            }
            if (rows.length > 0) {
                let info = rows[0];
                let data = {
                    type: 1,
                    describe: "password Error or role Error!"
                }
                if (params.password === info.password && params.role === info.role)
                    data = {
                        type: 0,
                        describe: "success",
                        userid: info.userid
                    }
                res.end(JSON.stringify({
                    code: 0,
                    message: "success",
                    data: data
                }))
                
            } else {
                res.end(JSON.stringify({
                    code: 0,
                    message: "success",
                    data: {
                        type: 2,
                        describe: "not exist"
                    }
                }))
            }
        })
    });
});

/**
 * type类型
 * 0成功 1已有账户 2数据库错误
 */
router.post("/register", function (req, res) {
    req.on("data", data => {
        data = decodeURIComponent(data.toString())
        let params = postParse(data);
        
        //这里不用事务因为插入userinfo表的时候需要account表的userid，所以是异步的
        let sql = `insert into user_account (account, password, role) values ('${params.account}', '${params.password}', 0);`;
        database.run(sql, err => {
            if (err) {
                res.end(JSON.stringify({
                    code: 0,
                    message: "success",
                    data: {
                        type: 1,
                        description: "exist" + err.toString()
                    }
                }))
            } else {
                sql = `select * from user_account where account='${params.account}'`;
                database.all(sql, (err, rows) => {
                    if (err) {
                        res.end(JSON.stringify({
                            code: -1,
                            data: "",
                            message: err.toString()
                        }));
                        throw err;
                    }
                    sql = `insert into user_info (userid, email, name, gender, birth, phone, address) values (${rows[0].userid}, '${params.email}', '${params.name}', '${params.gender || ""}', '${params.month ? params.year + '/' + ('0' + params.month).substr(-2) : params.year || ""}', '${params.phone}', '${params.address || ""}');`
                    database.run(sql, err => {
                        if (err) {
                            res.end(JSON.stringify({
                                code: 0,
                                message: "success",
                                data: {
                                    type: 2,
                                    description: "userinfo " + err.toString()
                                }
                            }))
                        } else {
                            res.end(JSON.stringify({
                                code: 0,
                                message: "success",
                                data: {
                                    type: 0,
                                    description: "success",
                                    userid: rows[0].userid
                                }
                            }))
                        }
                    })
                });
            }
        });
    });
})

module.exports = router;