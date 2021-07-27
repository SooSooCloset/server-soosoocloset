// 나의 코디 가져오기
// Author: Sumin, Last modified: 2021.07.26

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/getcodi', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var query = 'SELECT codi_img FROM Codi WHERE user_id = ?'; //사용자의 코디 조회 쿼리문
    var codi = new Array // 코디 이미지를 저장할 배열

    connection.query(query, user_id, function(err, result) {
        if(err) { // 에러 발생시
            res.json({
                'code': 400,
                'message': 'error'
            });
        } else{ // 조회 성공 시
            for(var i=0; i<result.length; i++)
                codi.push(result[i]);

            res.json({
                'code': 200,
                'message': 'getcodi success',
                'codi': codi
            });
        }
    })
});

module.exports = router;