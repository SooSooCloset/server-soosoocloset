// 옷 수정하기
// Author : Soohyun, Last Modified : 2021.08.14

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/update', function (req, res) {
    var cloth_id = req.body.cloth_id; // 옷 아이디
    var description = req.body.description; // 옷 설명
    var query = 'UPDATE cloth SET cloth_description = ? WHERE cloth_id = ?' // 옷 수정 쿼리문

    // DB에서 옷 이미지 가져오기
    connection.query(query, [description, cloth_id], function (error, result) {
        if(error) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            console.log("update cloth success");
            res.json({"code": 200, "result": "update cloth success"})
        }
    })

});

module.exports = router;