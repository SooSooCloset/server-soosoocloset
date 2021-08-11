// 마이페이지 화면의 사용자 정보 조회
// Author : Soohyun, Last Modified : 2021.07.30

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/mypage', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var query = 'SELECT nickname, user_profile FROM users WHERE user_id = ?' // 사용자 정보 조회 쿼리문

    // DB에서 사용자 정보 조회
    connection.query(query, [user_id], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            console.log("mypage success");
            res.json({"code": 200, "result": "mypage success", "info": result})
        }
    })

});

module.exports = router;