// 데이터베이스 접속 정보

var mysql = require('mysql');
require('dotenv').config();

const db_info = {
    // 로컬환경
	dev:{
		host: 'localhost',
		user: 'test',
		password: '', 
		database: 'soosoo'
    },
    // 실제 운영 서버 환경
	real: {
	}	
};

const db_connection = {
	init : function(){
        return mysql.createConnection(db_info.dev);
	}
};

module.exports = db_connection;