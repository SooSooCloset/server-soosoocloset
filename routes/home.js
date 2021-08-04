//홈 화면
//Author : Sumin, Created : 21.07.13

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/home', function (req, res) {
    var query =  "SELECT Users.nickname, Codi.codi_img, Codi.codi_description, Codi.likes, DATE_FORMAT(Codi.codi_date, '%Y-%m-%d') AS codi_date FROM Users, Codi WHERE Users.user_id = Codi.user_id ORDER BY Codi.likes DESC"; //코디 테이블 인기(좋아요)순 조회

    connection.query(query, function(err, result) {
        if(err) { // 에러 발생시
            console.log("error ocurred: ", err);
            res.json({"code": 400, "result": "error occured"});
        } else { // 조회 성공 시
            res.json({"code": 200, "result": "success", "codi": result});
        }
    })
    
});

module.exports = router; 