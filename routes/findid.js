//아이디 찾기
//Author : Sumin, Created : 21.07.11

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/findid', function (req, res) {
    var user_name = req.body.user_name;  //사용자 이름
    var birth = req.body.birth; //사용자 생년월일
    var query = 'SELECT user_id FROM Users WHERE user_name = ? AND birth = ?'; //아이디찾기 쿼리문

    connection.query(query, [user_name, birth], function(err, result) {
        if(err) { // 에러 발생시
            console.log("error ocurred: ", err);
            res.json({"code": 404, "result": 'error occured'});
        } else {
            if (result.length == 0) {   // 가입하지 않은 사용자인 경우
                res.json({"code": 204, "result": "Never registered"});
            } else { // ID를 찾은 경우
                res.json({"code": 200, "id": result[0].user_id, 
                "result": 'Your id is ' + result[0].user_id});
            }
        }
    })
});

module.exports = router; 