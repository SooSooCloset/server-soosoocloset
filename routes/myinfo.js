//내정보 수정 화면
//Author : Sumin, Created : 21.07.31

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var crypto = require('crypto');
var connection = config.init();
connection.connect();

router.post('/myinfo', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var nickname = req.body.nickname; //사용자 닉네임
    var user_pw = req.body.user_pw; //사용자 비밀번호
    var salt = ''; //비밀번호 암호화를 위한 요소
    var query = 'UPDATE Users SET nickname = ?, user_pw = ?, salt = ? WHERE user_id = ?'; //사용자 정보 수정 쿼리문

    crypto.randomBytes(64, (err, buf) => { 
        salt = buf.toString('base64');
        // 비밀번호 암호화
        crypto.pbkdf2(user_pw, salt, 100, 64, 'sha512', (err, key) => {
            user_pw = key.toString('base64');
            // Users 테이블 update
            connection.query(query , [nickname, user_pw, salt, user_id], function (error, result) {
                if (error) { // 에러 발생시
                    console.log("error ocurred: ", error);
                    res.json({"code" : 400, "result": "error ocurred"})
                } else { // 사용자 정보 수정 성공시
                    res.json({"code": 200, "result": "update user info success"});
                }
            }); 
        })
    })
});

module.exports = router;