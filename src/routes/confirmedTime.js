import ConfirmedTime from "../helpers/confirmedTime";
import TalentCv from "../helpers/talentCv";

const express = require('express');
const router = express.Router();

// GET Read Final Confirmed Time Table
router.get('/leader/readAdminConfirmTime', function (req, res, next) {
    ConfirmedTime.find(req.query ,function (err, obj) {
        res.json(obj)
    })
});

// POST Admin Set Final Confirmed Time
router.post('/admin/adminConfirmTime', function (req, res, next) {
    ConfirmedTime.create(req.body, function (err, obj) {
        res.json(obj)
    })
});

// POST Leader Search Specific Date From Confirmed Time Table
router.post('/leaderSearchConfirmedTime', function (req, res, next) {
    ConfirmedTime.search(req.body, function (err, obj) {
        res.json(obj)
    })
});

router.post('/deleteAllConfirmedTimeData', function (req, res) {
    ConfirmedTime.deleteAllConfirmedTimeData(req.body, function (err, obj) {
        console.log(req.body);
        res.json(obj)
    })
});

module.exports = router;
