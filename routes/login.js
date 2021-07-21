// 로그인
// Author : Sumin, Last Modified : 2021.07.06

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var crypto = require('crypto');
var connection = config.init();
connection.connect();

router.post('/login', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var user_pw = req.body.user_pw;  //사용자 비밀번호
    var query = 'SELECT * FROM Users WHERE user_id = ?'; //로그인 쿼리문
    var salt = ''

    // 사용자 ID가 있는지 확인 -> 있으면 salt값 가져옴
    connection.query(query, user_id, function (err, result) {
        if(err) { // 에러 발생시
            res.json({'code': 404, 'message': 'error'});
        } else {
            if (result.length == 0) { // ID가 다를 경우
                message = 'ID or password is not correct';
                res.json({'code': 204, 'message': message});
            } else { // ID가 있는 경우
                salt = result[0].salt;
            }
        }
    })

    connection.query(query, user_id, function (err, result) {
        var message = 'error';

        if (err) { // 에러 발생시
            console.log(err);
            res.json({'code': 404, 'message': message});
        } else {
            crypto.pbkdf2(user_pw, salt, 100, 64, 'sha512', (err, key) => {
                var hashPw = key.toString('base64');

                if (hashPw != result[0].user_pw) { //password가 다를 경우
                    message = 'Password is not correct';
                    res.json({'code': 208, 'message': message});
                } else {  //로그인에 성공했을 경우
                    message = 'login success. Welcome ' + result[0].user_name;
                    res.json({'code': 200, 'name': result[0].user_name, 'message': message});
                }
            })
        }
    })
});

module.exports = router;