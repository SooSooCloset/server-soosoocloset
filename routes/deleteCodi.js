// 코디 삭제
// Author : Sumin, Last Modified : 2021.07.30

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/delete', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var codi_id = req.body.codi_id; //코디 아이디
    var query = 'DELETE FROM Codi WHERE user_id = ? AND codi_id = ?'; //코디 삭제 쿼리문

    connection.query(query, [user_id, codi_id], function(err, result) {
        if(err){ //에러 발생 시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else { //코디 삭제 성공 시
            console.log("delete codi success");
            res.json({"code": 200, "result": "delete codi success"})
        }
    })
});

module.exports = router;