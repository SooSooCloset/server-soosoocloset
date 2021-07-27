//홈 화면
//Author : Sumin, Created : 21.07.13

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/home', function (req, res) {
    var query = 'SELECT user_id, codi_img, likes FROM Codi ORDER BY likes DESC'; //코디 테이블 인기(좋아요)순 조회
    var codi = new Array // 쿼리 조회 결과를 저장할 배열 

    connection.query(query, function(err, result) {
        if(err) { // 에러 발생시
            res.json({
                'code': 400,
                'message': 'error'
            });
        } else { // 조회 성공 시
            for(var i=0; i<result.length; i++)
                codi.push(result[i]);
            res.json({
                'code': 200,
                'message': 'success',
                'codi': codi
            });
        }
    })
    
});

module.exports = router; 