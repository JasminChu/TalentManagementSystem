import User from "../helpers/user";
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/read', function (req, res, next) {
    User.find(req.query, function (err, obj) {
        res.json(obj)
    })
});

// GET User from Db
router.get('/readUser', function (req, res, next) {
    User.find(req.query, function (err, obj) {
        res.json(obj)
    })
});

// POST Create User
router.post('/createUser', function (req, res, next) {
    User.create(req.body, function (err, obj) {
        console.log(req.body);
        res.json(obj)
    })
});

// GET Logout
router.get('/logout', function (req, res) {
    req.logout();
    console.log('logged out');
    res.redirect('/');
});

router.post('/deleteAllData', function (req, res) {
    User.deleteAllData(req.body, function (err, obj) {
        console.log(req.body);
        res.json(obj)
    })
});

module.exports = router;
