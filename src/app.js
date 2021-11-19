var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const cors = require('cors');
var logger = require('morgan');
const errorHandler = require('errorhandler');
const passport = require("passport");
var indexRouter = require('./routes');
const  cookieSession= require("cookie-session");

var app = express();


var http = require('http').createServer(app);
// Set-up Mongo DB
var mongoose = require('mongoose');
var url = "mongodb+srv://keechu0613:keechu0613@cluster0.pk3ai.mongodb.net/TRM?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
mongoose.set('debug', true);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("database we're connected!");
});


http.listen(2929, function () {
    console.log('listening on *:2929');
});
// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.locals.basedir = '/your/base/directory';
app.set('view engine', 'pug');
app.locals.moment = require('moment');
require('./models/user');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// JASMINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';



//Configure our app
// require('./models/user');
require('./config/passport');

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cookieSession({
    name: 'session',
    keys: ['passport'],
    // Cookie Options
    maxAge: 100 * 24 * 60 * 60 * 1000 // 100 days
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(require('./routes'));
app.use('/', indexRouter);
app.use('/', express.static('dist'));
app.use('/',express.static('static'));



//Configure Mongoose
mongoose.set('debug', true);

if(!isProduction) {
    app.use(errorHandler());
}

//Error handlers & middlewares
if(!isProduction) {
    app.use((err, req, res, next) => {
        let errStatusCode= err && err.status || 500

        res.status(errStatusCode);
        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}





// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// // error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
