// 옷 추가하기
// Author : Soohyun, Last Modified : 2021.07.16

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var connection = config.init();
connection.connect();

var fileName = '' // 서버에 저장될 옷 이미지 파일 이름
// 옷 이미지가 저장될 경로와 옷 이미지의 파일명 설정
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

router.post('/addcloth', upload.single('cloth_img'), function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var category = req.body.category; // 옷 카테고리
    var cloth_description = req.body.description; // 옷 설명
    var query = 'INSERT INTO cloth (user_id, category, cloth_img, cloth_description) VALUES (?,?,?,?) '; // 옷 추가 쿼리문

    let cloth_img = readImageFile(__dirname + '/../uploads/' + fileName) // 옷 이미지

    // 옷 정보 DB에 저장
    connection.query(query, [user_id, category, cloth_img, cloth_description], function (error, result) {
        if(err) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else { // 옷 추가 성공시
            console.log("addcloth success");
            res.json({ "code": 200, "result": "addcloth success" })
        }
    })
});

// 서버에서 이미지를 읽어오는 메서드
function readImageFile(file){
    const bitmap = fs.readFileSync(file);
    const buf = new Buffer.from(bitmap)
    return buf
  }

module.exports = router;