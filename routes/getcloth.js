// 카테고리별 옷 가져오기
// Author : Soohyun, Last Modified : 2021.07.17

var express = require('express');
var router = express.Router();
var config = require('../config/db_config');
var connection = config.init();
connection.connect();

router.post('/getcloth', function (req, res) {
    var user_id = req.body.user_id; //사용자 아이디
    var query = 'SELECT cloth_img FROM cloth WHERE user_id = ? AND category = ?'; // 옷 가져오기 쿼리문

    // 이미지를 저장할 배열
    var outer = new Array()
    var top = new Array()
    var bottom = new Array()
    var onepiece = new Array()
    var shoes = new Array()
    var accessary = new Array()

    // DB에서 아우터 이미지 가져오기
    connection.query(query, [user_id, 'outer'], function (err, result) {
        if(err) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            for(var i=0; i<result.length; i++) {
                outer.push(result[i]);
            }
        }
    })

    // DB에서 상의 이미지 가져오기
    connection.query(query, [user_id, 'top'], function (err, result) {
        if(err) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            for(var i=0; i<result.length; i++) {
                top.push(result[i]);
            }
        }
    })

    // DB에서 하의 이미지 가져오기
    connection.query(query, [user_id, 'bottom'], function (err, result) {
        if(err) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            for(var i=0; i<result.length; i++) {
                bottom.push(result[i]);
            }
        }
    })

    // DB에서 원피스 이미지 가져오기
    connection.query(query, [user_id, 'onepiece'], function (err, result) {
        if(err) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            for(var i=0; i<result.length; i++) {
                onepiece.push(result[i]);
            }
        }
    })

    // DB에서 신발 이미지 가져오기
    connection.query(query, [user_id, 'shoes'], function (err, result) {
        if(err) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            for(var i=0; i<result.length; i++) {
                shoes.push(result[i]);
            }
        }
    })

    // DB에서 악세서리 이미지 가져오기
    connection.query(query, [user_id, 'accessary'], function (err, result) {
        if(err) { // 에러 발생시
            console.log("error ocurred: ", error);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            for(var i=0; i<result.length; i++) {
                accessary.push(result[i]);
            }

            console.log("getcloth success");
            res.json({ "code": 200, "result": "getcloth success", "outer": outer, "top": top, "bottom": bottom, "onepiece": onepiece, "shoes": shoes, "accessary": accessary})
        }
    })

});

module.exports = router;