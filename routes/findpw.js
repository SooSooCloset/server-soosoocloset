// 비밀번호 찾기
// Author : Soohyun, Last Modified : 2021.07.09

var express = require('express');
var router = express.Router();
var transporter = require('../config/email_config');
var config = require('../config/db_config');
var crypto = require('crypto');
var connection = config.init();
connection.connect();

router.post('/findpw', function (req, res) {
    var user_id = req.body.user_id; // 사용자 아이디
    var user_email = req.body.user_email; // 사용자 이메일

    // 사용자 아이디 여부 확인
    connection.query('select * from users where user_id = ?', user_id, function (error, result) {
        if (error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            if (result.length == 0) { // 등록된 아이디가 없는 경우
                console.log("incorrect id");
                res.json({ "code": 204, "result": "incorrect id" });
            } else { // 등록된 아이디가 있는 경우

                var arr = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
                var randomPw = createCode(arr, 10);

                //비밀번호 랜덤 생성 함수
                function createCode(objArr, iLength) {
                    var arr = objArr;
                    var randomStr = "";
                    for (var j = 0; j < iLength; j++) {
                        randomStr += arr[Math.floor(Math.random() * arr.length)];
                    }
                    return randomStr
                }

                // 새로운 비밀번호 생성하는 부분
                // salt 값 랜덤 생성
                crypto.randomBytes(64, (err, buf) => {
                    var salt = buf.toString('base64');
                    // 비밀번호 암호화
                    crypto.pbkdf2(randomPw, salt, 100, 64, 'sha512', (err, key) => {
                        var user_pw = key.toString('base64');
                        // 새로운 비밀번호 DB에 저장
                        connection.query('update users set user_pw = ?, salt = ? where user_id = ?', [user_pw, salt, user_id], function (error, result) {
                            if (error) { // 에러 발생시
                                console.log("error ocurred: ", error);
                                res.json({ "code": 400, "result": "error ocurred" })
                            } else { // 비밀번호 저장 성공시
                                console.log("insert new password success");
                            }
                        });
                    })
                })

                // 메일 양식
                let mail = {
                    from: 'soosoocloset@gmail.com', // 보내는 사람 이메일
                    to: user_email, // 받는 사람 이메일
                    subject: '수수한 옷장의 임시비밀번호 정보입니다', // 메일 제목
                    text: '안녕하세요. 수수한 옷장입니다.\n임시비밀번호는 ' + randomPw + '입니다.' // 메일 내용
                }

                // 메일 전송
                transporter.sendMail(mail, function (error) {
                    if (error) { // 에러 발생시
                        console.log("error ocurred: ", error);
                        res.json({ "code": 400, "result": "error ocurred" });
                    }
                    else { // 메일 전송 성공시
                        console.log("findpw success");
                        res.json({ "code": 200, "result": "findpw success" });
                    }
                });
            }
        }
    });
});

module.exports = router;