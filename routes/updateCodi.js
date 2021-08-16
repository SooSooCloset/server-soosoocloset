//코디 설명 수정 화면
//Author : Sumin, Created : 21.08.11

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var crypto = require('crypto');
var connection = config.init();
connection.connect();

router.post('/updateCodi', function (req, res) {
    var codi_id = req.body.codi_id; //코디 아이디
    var codi_description = req.body.codi_description; //코디 설명
    var query = "UPDATE Codi SET codi_description = ? WHERE codi_id = ?"; //코디 설명 수정 쿼리문

    connection.query(query , [codi_description, codi_id], function (err, result) {
        if (err) { // 에러 발생시
            console.log("error ocurred: ", err);
            res.json({"code" : 400, "result": "error ocurred"})
        } else { // 코디 설명 수정 성공시
            res.json({"code": 200, "result": "update codi_description success"});
        }
    });
});

module.exports = router;