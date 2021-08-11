// 좋아요한 코디의 아이디 가져오기
// Author : Sumin, Last Modified : 2021.08.10

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/checkLike', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var query = "SELECT codi_id FROM Likes WHERE user_id = ?"

    connection.query(query, user_id, function (err, result) {
        if(err) { // 에러 발생시
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            res.json({"code": 200, "result": "checkLike success", "codi_id": result})
        }
    })

});

module.exports = router;