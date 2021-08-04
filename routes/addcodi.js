// 코디 추가하기
// Author : Sumin, Last Modified : 2021.07.21

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var connection = config.init();
connection.connect();

var fileName = '' //코디 이미지 파일명
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

router.post('/addcodi', upload.single('codi_img'), function(req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var codi_description = req.body.codi_description; //코디 설명
    var codi_date = req.body.codi_date; //코디 생성 날짜
    var query = "INSERT INTO Codi (user_id, codi_img, codi_description, codi_date) VALUES(?, ?, ?, ?)"; //코디추가 쿼리문

    let codi_img = readImageFile(__dirname + '/../uploads/' + fileName); //코디 이미지

    //코디 테이블에 코디 데이터 삽입
    connection.query(query, [user_id, codi_img, codi_description, codi_date], function(err, result) {
        if(err){ //에러 발생 시
            console.log("error ocurred: ", err);
            res.json({"code": 400, "result": 'error occured'});
        } else { //삽입 성공 시
            res.json({"code": 200, "result": "addcodi success"});
        }
    });

    
});

function readImageFile(file){
    const bitmap = fs.readFileSync(file);
    const buf = new Buffer.from(bitmap)
    return buf
}

module.exports = router;