// 회원 탈퇴
// Author : Soohyun, Last Modified : 2021.07.30

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/deleteUser', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var query = 'DELETE FROM users WHERE user_id = ?' // 회원 탈퇴 쿼리문

    // DB 에서 사용자 정보 삭제
    connection.query(query, [user_id], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            console.log("delete user success");
            res.json({"code": 200, "result": "delete user success"})
        }
    })

});

module.exports = router;