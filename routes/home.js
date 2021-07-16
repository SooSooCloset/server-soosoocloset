//홈 화면
//Author : Sumin, Created : 21.07.13

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var crypto = require('crypto');
var connection = config.init();
connection.connect();

var resultArray = new Array()

router.post('/home', function (req, res) {
    var query = 'SELECT user_id, likes FROM Codi ORDER BY likes DESC'; //코디 테이블 인기(좋아요)순 조회

    connection.query(query, function(err, result) {
        if(err) { // 에러 발생시
            res.json({
                'code': 404,
                'message': 'error'
            });
        } else{ // 조회 성공 시
            for(var i=0; i<result.length; i++) {
                var jObj = new Object(); // JsonObject를 위한 객체생성

                jObj.user_id = result[i].user_id;
                jObj.likes = result[i].likes;

                resultArray.push(jObj);
            }

            res.json({
                'code': 200,
                'message': 'success',
                'result': resultArray,ㄴ
            });
        }
    })
});

module.exports = router; 