import db from '../models'
import * as res from "express";
import moment from 'moment';

export default class {

    static create(data, cb) {
        console.log("Confirmed time and date create di sini");
        console.log(data);

        let confirmedTimeObj = db.ConfirmedTimeSchema(data)
        confirmedTimeObj.save(function (err, obj) {
            console.log('We save your confirmed time and date data');
            //arrange time table punya ObjectID
            // let arrangeID = data._id || '60234d69f094ae5338e19524';
            let arrangeID = data.arrangeID;
            console.log("ARRANGE ID DI SINI: " + arrangeID);
            db.ArrangeTimeSchema.findOneAndUpdate(
                {_id: arrangeID},
                {
                    $set: {
                        adminResponseStatus: 1,
                        // 'availableTime.dateTime': '2012-12-04T16: 00: 00.000+00: 00'
                    }
                },
                function (err, obj) {
                    if (err) {
                        console.log(err);
                        console.log("Leader accept fail larrrrrrrr");
                    } else {
                        console.log("Leader accept successss larhhhhhh");
                    }
                    cb(err, obj)
                })
        })
    }

    static find(data, cb) {
        // console.log(data);
        // let inputDepartment= "Design";
        let department = data.department;
        delete data.department;

        db.ConfirmedTimeSchema
            .find(data)
            .populate({
                path: 'arrangeID',
                populate: {
                    path: 'cvID',
                    match: {'department': department}
                }
            })
            .lean()
            .exec(function (err, obj) {
                cb(err, obj)
            })
    }

    static search(data, cb) {
        let inputDate = data.dateTime | "2012-12-03T00:00:00.000+08:00";
        db.ConfirmedTimeSchema
            .find({
                // 'availableTime.dateTime': {"$gte": new Date("2012-12-03T00:00:00.000+08:00")}
                'availableTime.dateTime': {"$gte": new Date(inputDate)}
            })
            // .populate({path: 'cvID'})
            // .lean()
            .exec(function (err, obj) {
                cb(err, obj)
            })
    }

    // static dataExposed(data, cb) {
    //     // console.log('We at the search confirmed date liaooooooo')
    //     db.ConfirmedTimeSchema.find({}).exec()
    //         .then(function (docs) {
    //             db.ConfirmedTimeSchema.csvReadStream(docs)
    //                 .pipe(fs.createWriteStream('users.csv'));
    //         });
    //     cb(err, obj)
    // }

    static deleteAllConfirmedTimeData(data, cb) {
        // Get User Data from db
        db.ConfirmedTimeSchema.remove()
            .exec(function (err, obj) {
                cb(err, obj)
            })
    }
}