// 회원가입
// Author : Soohyun, Last Modified : 2021.07.06

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var crypto = require('crypto');
var connection = config.init();
connection.connect();

router.post('/signup', function(req, res) {
    var user_id = req.body.user_id; // 아이디
    var user_name = req.body.user_name; // 이름
    var nickname = req.body.nickname; // 닉네임
    var gender = req.body.gender; // 성별
    var birth = req.body.birth; // 생년월일
    var user_pw = ''; // 비밀번호
    var salt = ''; // 암호화에 필요한 요소
    var query = 'INSERT INTO users (user_id, user_name, nickname, gender, birth, user_pw, salt) VALUES (?,?,?,?,?,?,?)'; // 회원가입 쿼리문

    // 아이디 중복 확인
    connection.query('SELECT user_id FROM users WHERE user_id = ?' , user_id, function (error, result) {
        if(result.length == 0) { // 중복된 아이디가 없을 경우
            // 비밀번호 암호화한 후 DB에 저장
            if(error) { // 에러 발생시
                console.log("error ocurred: ", error);
                res.json({"code" : 400, "result": "error ocurred"});
            } else {
                // salt 값 랜덤 생성
                crypto.randomBytes(64, (err, buf) => { 
                    salt = buf.toString('base64');
                    // 비밀번호 암호화
                    crypto.pbkdf2(req.body.user_pw, salt, 100, 64, 'sha512', (err, key) => {
                        user_pw = key.toString('base64');
                        // user정보 DB에 저장
                        connection.query(query , [user_id, user_name, nickname, gender, birth, user_pw, salt], function (error, result) {
                            if (error) { // 에러 발생시
                                console.log("error ocurred: ", error);
                                res.json({ "code" : 400, "result": "error ocurred" })
                            } else { // 회원가입 성공시
                                console.log("signup success");
                                res.json({ "code": 200, "result": "signup success" });
                            }
                        }); 
                    })
                })
            }
        } else { // 중복된 아이디일 경우
            console.log("id duplicate");
            res.json({"code" : 204, "result": "id duplicate"});
        }
    }); 
});

module.exports = router;