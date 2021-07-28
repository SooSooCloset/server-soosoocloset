// 나의 코디 가져오기
// Author: Sumin, created: 2021.07.26

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/mycodi', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var query = "SELECT codi_img, codi_description, likes, DATE_FORMAT(codi_date, '%Y-%m-%d') AS codi_date FROM Codi WHERE user_id = ? ORDER BY codi_id"; //나의 코디 상세 정보 조회 쿼리문
    var mycodi = new Array // 쿼리 조회 결과를 저장할 배열

    connection.query(query, user_id, function(err, result) {
        if(err) { // 에러 발생시
            res.json({
                'code': 400,
                'message': 'error'
            });
        } else { // 조회 성공 시
            for(var i=0; i<result.length; i++)
                mycodi.push(result[i]);

            res.json({
                'code': 200,
                'message': 'mycodi success',
                'mycodi': mycodi
            });
        }
    })
});

module.exports = router;