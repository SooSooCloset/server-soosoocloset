// 좋아요한 코디의 아이디 가져오기
// Author : Sumin, Last Modified : 2021.08.10

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/home', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var query = "SELECT Codi.codi_id, Users.nickname, Codi.codi_img, Codi.codi_description, Codi.likes, DATE_FORMAT(Codi.codi_date, '%Y-%m-%d') AS codi_date FROM Users, Codi WHERE Users.user_id = Codi.user_id ORDER BY Codi.likes DESC;"
                + "SELECT codi_id FROM likes WHERE user_id = ?;"

    connection.query(query, user_id, function (err, result) {
        if(err) { // 에러 발생시
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            var likeList = new Array()
            var likeIdList = new Array()

            for(i=0; i<result[1].length; i++) {
                likeIdList.push(result[1][i].codi_id)
            }
            console.log(likeIdList)

            for(i=0; i<result[0].length; i++) {
                if(likeIdList.includes(result[0][i].codi_id)) {
                    likeList.push("true")
                } else {
                    likeList.push("false")
                }
            }
            res.json({"code": 200, "result": "home success", "codi": result[0], "likes": likeList})
        }
    })

});

module.exports = router;