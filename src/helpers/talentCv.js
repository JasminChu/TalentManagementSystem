import db from '../models'
import * as res from "express";

export default class {

    static create(data, cb) {
        console.log("Cv create di sini");
        console.log(data);
        let cvObj = db.CvSchema(data)
        cvObj.save(function (err, obj) {
            if (err) {
                console.log(err);
            } else {
                console.log('We save your Cv data');
                // res.json(obj);
            }
            cb(err, obj)
        })
    }

    // Filter ALL the data from the database
    static find(data, cb) {
        // Search and Filter Data
        // let searchWord = data.name || 'jasmin';
        db.CvSchema
            .find(data)
            // .sort({ name: 1 })
            // .skip(5)
            // .limit(3)
            .exec(function (err, obj) {
                cb(err, obj)
            })
    }

    static filterDeletedTalentCv(data, cb) {
        // Search and Filter Data
        // let searchWord = data.name || 'jasmin';
        db.CvSchema
            .find({isDelete: true})
            .exec(function (err, obj) {
                cb(err, obj)
            })
    }

    static delete(data, cb) {

        // Update the table
        // let cvID = data._id || '600eeab9922465065026ee81';
        console.log(data);
        let cvID = data.cvID;
        console.log("CV ID OSDOSF: " + cvID);
        // let rejectReasons = data.reasons || 'Not enough time for the interview';
        let rejectReasons = data.reasons;
        console.log("REJEC REASON SDOSF: " + rejectReasons);

        db.CvSchema.findOneAndUpdate(
            {_id: cvID},
            {
                $set: {
                    status: 2,
                    // isDelete: true,
                    reasons: rejectReasons
                }
            },
            function (err, obj) {
                if (err) {
                    console.log(err);
                    console.log("Leader reject fail larrrrrrrr");
                } else {
                    console.log("Leader reject successss larhhhhhh");
                }
                cb(err, obj)
            });
    }

    static edit(data, cb) {
        let editedName = data.name;
        let editedDepartment = data.department;
        let editedUrl = data.url;
        // let userRole = data.role;

        db.CvSchema.findOneAndUpdate(
            // {_id: "601108a7a200d54300232721"},
            {_id: data.cvID},
            {
                $set: {
                    // name: "Jasmin",
                    name: editedName,
                    department: editedDepartment,
                    url: editedUrl
                    // url: "https://drive.google.com/file/d/1EG5xhqw7f8qTkdyu5HE6qy9fWcYqxDn0/view"
                }
            },
            function (err, obj) {
                if (err) {
                    console.log(err);
                    console.log("Admin edit faillllllllll");
                } else {
                    console.log("Admin edit successssssssss");
                }
                cb(err, obj)
            });
    }

    static reallyDelete(data, cb) {
        // Update the table
        // let cvID = data._id || '601108a7a200d54300232721';
        console.log(data);
        let cvID = data._id;
        // let cvID = "601108a7a200d54300232721";
        console.log("CV ID OSDOSF: " + cvID);

        db.CvSchema.findOneAndUpdate(
            {_id: cvID},
            {
                $set: {
                    isDelete: true,
                }
            },
            function (err, obj) {
                if (err) {
                    console.log(err);
                    console.log("Admin delete fail...");
                } else {
                    console.log("Admin delete success!!!!!");
                }
                cb(err, obj)
            });
    }

    // static deleteAllTalentData(data, cb) {
    //     // Get User Data from db
    //     db.CvSchema.remove()
    //         .exec(function (err, obj) {
    //             cb(err, obj)
    //         })
    // }
}