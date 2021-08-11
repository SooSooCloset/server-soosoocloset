// 카테고리별 옷 가져오기
// Author : Soohyun, Last Modified : 2021.07.17

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/getcloth', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var category = req.body.category; // 옷 카테고리
    var query = 'SELECT cloth_id, cloth_img, cloth_description FROM cloth WHERE user_id = ? AND category = ?' // 옷 가져오기 쿼리문

    // DB에서 옷 이미지 가져오기
    connection.query(query, [user_id, category], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            console.log("getcloth success");
            res.json({"code": 200, "result": "getcloth success", "cloth": result})
        }
    })

});

module.exports = router;