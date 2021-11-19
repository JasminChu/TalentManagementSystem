import LeaderSetTime from "../helpers/LeaderSetTime";
import User from "../helpers/user";
import TalentCv from "../helpers/talentCv";
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// GET Time Set By Leader
router.get('/admin/readLeaderSetTime', function (req, res, next) {
    LeaderSetTime.find(req.query, function (err, obj) {
        res.json(obj)
    })
});

// POST Leader Set Available Time
router.post('/leader/leaderSetTime', function (req, res, next) {
    LeaderSetTime.create(req.body, function (err, obj) {
        res.json(obj)
    })
});

// POST Admin Rejected Specific Talent
router.post('/adminReject', function (req, res, next) {
    LeaderSetTime.adminReject(req.body, function (err, obj) {
        res.json(obj)
    })
});

router.post('/deleteAllArrangeData', function (req, res) {
    LeaderSetTime.deleteAllArrangeData(req.body, function (err, obj) {
        console.log(req.body);
        res.json(obj)
    })
});

module.exports = router;
