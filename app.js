var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 라우터 가져오기
var indexRouter = require('./routes/index'); // 첫 페이지 라우터
var signupRouter = require('./routes/signup'); // 회원가입 라우터
var loginRouter = require('./routes/login'); // 로그인 라우터
var findidRouter = require('./routes/findid'); // 아이디찾기 라우터
var findpwRouter = require('./routes/findpw'); // 비밀번호 찾기 라우터
var homeRouter = require('./routes/home'); // 홈 화면 라우터
var addclothRouter = require('./routes/addcloth'); // 옷 추가 라우터
var getclothRouter = require('./routes/getcloth'); // 옷 가져오기 라우터
var addcodiRouter = require('./routes/addcodi'); // 코디 추가 라우터
var getcodiRouter = require('./routes/getcodi'); // 코디 가져오기 라우터
var myinfoRouter = require('./routes/myinfo'); // 내정보 수정 라우터
var getLikecodiRouter = require('./routes/getLikecodi'); // 좋아요한 코디 라우터
var mypageRouter = require('./routes/mypage'); // 마이페이지 화면 라우터
var changeProfileRouter = require('./routes/change_profile'); // 프로필 사진 변경 라우터
var deleteUserRouter = require('./routes/deleteUser'); // 회원탈퇴 라우터
var deleteCodiRouter = require('./routes/deleteCodi'); // 코디 삭제 라우터
var addLikeRouter = require('./routes/addLike'); // 좋아요 추가 라우터
var deleteLikeRouter = require('./routes/deleteLike'); // 좋아요 삭제 라우터
var checkLikeRouter = require('./routes/checkLike'); // 좋아요 확인 라우터

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 로드 및 경로 지정
app.use('/', indexRouter);
app.use('/user', signupRouter);
app.use('/user', loginRouter);
app.use('/user', findidRouter);
app.use('/user', findpwRouter);
app.use('/user', homeRouter);
app.use('/cloth', addclothRouter);
app.use('/cloth', getclothRouter);
app.use('/codi', addcodiRouter);
app.use('/codi', getcodiRouter);
app.use('/user', myinfoRouter);
app.use('/codi', getLikecodiRouter);
app.use('/user', mypageRouter);
app.use('/user', changeProfileRouter);
app.use('/user', deleteUserRouter);
app.use('/codi', deleteCodiRouter);
app.use('/codi', addLikeRouter);
app.use('/codi', deleteLikeRouter);
app.use('/codi', checkLikeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
