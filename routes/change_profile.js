// 프로필 사진 변경
// Author : Soohyun, Last Modified : 2021.08.06

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var connection = config.init();
connection.connect();

var fileName = '' // 프로필 이미지 파일명
var upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, __dirname + '/../uploads');
      },
      filename(req, file, done) {
        fileName = Date.now() + '_' + file.originalname
        done(null, fileName);
      },
    })
});

router.post('/changeProfile', upload.single('profile_img'), function(req, res) {
    var user_id = req.body.user_id; // 사용자 아이디
    var query = 'UPDATE users SET user_profile = ? WHERE user_id = ?'; // 프로필 사진 변경 쿼리문

    let profile_img = readImageFile(__dirname + '/../uploads/' + fileName); // 프로필 이미지

    // DB에 사용자 프로필 이미지 저장
    connection.query(query, [profile_img, user_id], function(err, result) {
        if(err){ // 에러 발생 시
            console.log("error ocurred: ", err);
            res.json({"code": 400, "result": 'error occured'});
        } else { // 프로필 사진 변경 성공시
          console.log("change profile success");
            res.json({"code": 200, "result": "change profile success"});
        }
    });

    
});

// 서버에서 이미지를 읽어오는 메서드
function readImageFile(file){
    const bitmap = fs.readFileSync(file);
    const buf = new Buffer.from(bitmap)
    return buf
}

module.exports = router;