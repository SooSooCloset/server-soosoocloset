// 나의 코디 가져오기
// Author: Sumin, Last modified: 2021.07.26

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/getcodi', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var query = "SELECT codi_id, codi_img, codi_description, likes, DATE_FORMAT(codi_date, '%Y-%m-%d') AS codi_date FROM Codi WHERE user_id = ?"; //사용자의 코디 조회 쿼리문

    connection.query(query, user_id, function(err, result) {
        if(err) { // 에러 발생시
            console.log("error ocurred: ", err);
            res.json({"code": 400, "result": "error occured"});
        } else{ // 조회 성공 시
            res.json({"code": 200, "result": "getcodi success", "codi": result});
        }
    })
});

module.exports = router;