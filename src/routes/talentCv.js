import LeaderSetTime from "../helpers/LeaderSetTime";
module.exports = router;
import TalentCv from "../helpers/talentCv";
import db from "../models";

const express = require('express');
const router = express.Router();

// GET All Talent Cv
router.get('/readTalentCv', function (req, res, next) {
    TalentCv.find(req.query, function (err, obj) {
        res.json(obj)
    })
});

// GET Filter Deleted Talent Cv
router.get('/admin/filterDeletedTalentCv', function (req, res, next) {
    TalentCv.filterDeletedTalentCv(req.query, function (err, obj) {
        res.json(obj)
    })
});

// POST Admin Upload Talent Cv
router.post('/admin/uploadTalentCv', function (req, res, next) {
    //roleChecking(req, res, next);
    TalentCv.create(req.body, function (err, obj) {
        res.json(obj)
    })
});

// POST Leader Rejected Specific Talent
router.post('/leaderReject', function (req, res, next) {
    TalentCv.delete(req.body, function (err, obj) {
        res.json(obj)
    })
});

// POST Admin Edit Talent Cv Info
router.post('/admin/editTalentCv', function (req, res, next) {
    TalentCv.edit(req.body, function (err, obj) {
        res.json(obj)
    })
});

// POST Admin Remove Specific Talent Cv
router.post('/admin/reallyDelete', function (req, res, next) {
    TalentCv.reallyDelete(req.body, function (err, obj) {
        console.log("YOU WENT TO HERE OR NOT DELETE NOOB KIDA");
        res.json(obj)
    })
});

router.post('/deleteAllTalentData', function (req, res) {
    TalentCv.deleteAllTalentData(req.body, function (err, obj) {
        console.log(req.body);
        res.json(obj)
    })
});

// NEW (PAGINATION)
router.get('/api/clients', (req, res) => {
    //You could put page number in request query ro request params
    Client.paginate(req.body.pageNo, function(err, response) {
        if (err) {
            return res.status(500).json({
                message : "Error en aplicacion",
                error : err
            });
        }
        return res.status(200).json(response);
    });
});

module.exports = router;
