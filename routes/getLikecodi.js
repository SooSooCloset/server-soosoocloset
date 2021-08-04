// 좋아요한 코디 가져오기
// Author : Soohyun, Last Modified : 2021.07.31

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/getLikecodi', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var query = "SELECT codi.codi_id, codi_img, likes, codi_description, DATE_FORMAT(codi_date, '%Y-%m-%d') AS codi_date, nickname " + 
                "FROM codi, likes, users WHERE codi.codi_id = likes.codi_id AND codi.user_id = users.user_id AND likes.user_id = ?";

    // DB에서 옷 이미지 가져오기
    connection.query(query, [user_id], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            console.log("get likecodi success");
            res.json({"code": 200, "result": "get likecodi success", "like": result})
        }
    })

});

module.exports = router;