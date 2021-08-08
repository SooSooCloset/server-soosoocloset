// 좋아요 삭제
// Author : Soohyun, Last Modified : 2021.08.08

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/deleteLike', function (req, res) {
    var user_id = req.body.user_id; // 사용자 아이디
    var codi_id = req.body.codi_id; // 코디 아이디
    var likes = req.body.likes; // 좋아요 수
    var query = 'UPDATE codi SET likes = ? WHERE codi_id = ?;' + 'DELETE FROM likes WHERE user_id = ? and codi_id = ?;' // 좋아요 삭제 쿼리문

    // DB에서 사용자 정보 조회
    connection.query(query, [likes, codi_id, user_id, codi_id], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            console.log("deleteLike success");
            res.json({"code": 200, "result": "deleteLike success"})
        }
    })

});

module.exports = router;