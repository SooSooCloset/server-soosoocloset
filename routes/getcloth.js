// 카테고리별 옷 가져오기
// Author : Soohyun, Last Modified : 2021.07.17

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/getcloth', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    // 옷 가져오기 쿼리문
    var query = 'SELECT cloth_img FROM cloth WHERE user_id = ? AND category = "outer";' 
                + 'SELECT cloth_img FROM cloth WHERE user_id = ? AND category = "top";'
                + 'SELECT cloth_img FROM cloth WHERE user_id = ? AND category = "bottom";'
                + 'SELECT cloth_img FROM cloth WHERE user_id = ? AND category = "onepiece";'
                + 'SELECT cloth_img FROM cloth WHERE user_id = ? AND category = "shoes";'
                + 'SELECT cloth_img FROM cloth WHERE user_id = ? AND category = "accesary";'

    var cloth = new Array // 이미지를 저장할 배열

    // DB에서 옷 이미지 가져오기
    connection.query(query, [user_id, user_id, user_id, user_id, user_id, user_id], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            for(var i=0; i<result.length; i++) {
                cloth.push(result[i]);
            }

            console.log("getcloth success");
            res.json({ "code": 200, "result": "getcloth success", "outer": cloth[0], "top": cloth[1], "bottom": cloth[2], "onepiece": cloth[3], "shoes": cloth[4], "accessary": cloth[5]})
        }
    })

});

module.exports = router;