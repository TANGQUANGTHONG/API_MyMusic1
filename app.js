var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
require('./model/User');  // Đảm bảo rằng bạn đã tạo model User
require('./model/Song');  // Đảm bảo rằng bạn đã tạo model Song

var usersRouter = require('./routes/User_router');
var songRouter = require('./routes/Song_router');

var app = express();

// Middleware
app.use(logger('dev'));  // Ghi log các yêu cầu
app.use(express.json());  // Phân tích body JSON
app.use(express.urlencoded({ extended: false }));  // Phân tích body URL-encoded
app.use(cookieParser());  // Phân tích cookies
app.use(express.static(path.join(__dirname, 'public')));  // Thư mục tĩnh

// Kết nối MongoDB
mongoose.connect('mongodb+srv://quangthong2004:thong2004@cluster0.vpo8x.mongodb.net/API_MyMusic', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
.catch(err => console.log('>>>>>>>>> DB Error: ', err));

// Định nghĩa các route
app.use('/user', usersRouter);  // Route cho người dùng
app.use('/song', songRouter);  // Route cho bài hát

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // Đường dẫn tới thư mục views
app.set('view engine', 'hbs');  // Sử dụng Handlebars làm template engine

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
  res.render('error');  // Hiển thị trang lỗi
});

module.exports = app;  // Xuất ứng dụng Express
