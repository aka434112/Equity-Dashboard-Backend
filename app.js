var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');

var proxy = require('express-http-proxy');
var cors = require('cors');
var app = express();

//app.disable('etag');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get(/.*/, (req, res) => { res.sendFile(path.join(__dirname, '/public/index.html'))});

app.use('/', indexRouter);

module.exports = app;
