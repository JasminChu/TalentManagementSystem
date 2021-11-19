import db from '../models'
import moment from 'moment';
import * as async from "async";

export default class {

    static create(data, cb) {
        // let data2 = {
        //     // '20/02/2021'
        //     availableTime: [{date: "19 Feb 2021", time: "04:58-11:58"}],
        //     cvID: "60306c789d01fc44c03e655f"
        // }

        console.log(data);
        let userInputDate = data.availableTime[0].userInputDate;
        let userInputTime = data.availableTime[0].userInputTimeData;
        let cvID = data.cvID;

        // let tmp = data2.availableTime[0].time.split("-");
        let tmp = userInputTime.split("-");
        let tmpStartTime = moment(tmp[0], 'HH:mm');
        let tmpEndTime = moment(tmp[1], 'HH:mm');

        // let startDate = moment(data2.availableTime[0].date).startOf('day').toDate();
        let startDate = moment(userInputDate).startOf('day').toDate();
        let endDate = moment(userInputDate).endOf('day').toDate();
        // let endDate = moment(data2.availableTime[0].date).endOf('day').toDate();

        db.ConfirmedTimeSchema.find(
            {
                'availableTime.dateTime': {
                    "$gte": startDate,
                    "$lt": endDate
                }
            },
            function (err, obj) {
                console.log('jhfghgfhgfghfghfghfhgjjfjhgfjhg');
                if (err) {
                    return cb(err);
                }

                // obj is not undefined or empty, which means user input date clash with date inside the db
                if (obj && obj.length > 0) {
                    console.log("status 1111111111111111111111111111111")
                    let isConflictStart = false;
                    let isConflictEnd = false;

                    async.waterfall([
                        function (callback) {
                            obj.map(function (dat) {
                                let startTime = moment(dat.availableTime.dateTime).format("HH:mm a");
                                let endTime = moment(dat.availableTime.endDateTime).format("HH:mm a");

                                let compareForm = {
                                    passStartTime: moment(tmpStartTime),
                                    passEndTime: moment(tmpEndTime),
                                    startTime: moment(startTime, "HH:mm a"),
                                    endTime: moment(endTime, "HH:mm a"),
                                }

                                isConflictStart = compareForm.passStartTime.isBetween(compareForm.startTime, compareForm.endTime);
                                isConflictEnd = compareForm.passEndTime.isBetween(compareForm.startTime, compareForm.endTime);

                                // console.log('*******************************');
                                // console.log(startTime);
                                // console.log(endTime);
                                // console.log(tmpStartTime);
                                // console.log(tmpEndTime);
                                // console.log(isConflictStart);
                                // console.log(isConflictEnd);
                            });
                            callback(null);
                        }
                    ], function (err, result) {
                        if (isConflictStart || isConflictEnd) {
                            console.log('Hello, Time Clash');
                            return cb('Time was Conflicted');
                        } else {
                            console.log('SUCCESS');
                            console.log(data);
                            let dataSave = {
                                cvID: data.cvID,
                                availableTime: []
                            };

                            let passStart = moment(tmpStartTime).format('HH:mm');
                            let passEnd = moment(tmpEndTime).format('HH:mm');

                            dataSave.availableTime.push({
                                date: data.userInputDate,
                                timeStart: moment(`01 Jan 1970 ${passStart}`),
                                timeEnd: moment(`01 Jan 1970 ${passEnd}`)
                            });

                            console.log('&&&&&&&&&&&&&&&&&&&');
                            console.log(dataSave);

                            let timeObj = db.ArrangeTimeSchema(dataSave)
                            timeObj.save(function (err, obj) {
                                console.log('We save your leader created time and date data');
                                // let cvID = data._id || '6010ca7a2ef3d71a449f084d';
                                // let cvID = data.cvID;
                                console.log(cvID)
                                // console.log("THIS IS THE ID IN THE DB: " + cvID);
                                db.CvSchema.findOneAndUpdate(
                                    {_id: cvID},
                                    {
                                        $set: {
                                            status: 1,
                                        }
                                    },
                                    function (err, objj) {
                                        if (err) {
                                            console.log(err);
                                            console.log("Leader accept fail larrrrrrrr");
                                        } else {
                                            console.log("Leader accept successss larhhhhhh");
                                        }
                                        cb(err, obj)
                                    });
                            })
                            // return cb(err, obj)
                            // cb(err, obj);
                        }
                    });
                } else {
                    console.log("status 22222222222222222222222222222222222")
                    let timeObj = db.ArrangeTimeSchema(data)
                    timeObj.save(function (err, obj) {
                        console.log("++++++++++++++++++++++++++++++++++++++++");
                        console.log(data);
                        console.log('We save your leader created time and date data');
                        // let cvID = data._id || '6010ca7a2ef3d71a449f084d';
                        // let cvID = data.cvID;
                        console.log(data)
                        console.log("THIS IS THE ID IN THE DB: " + cvID);
                        db.CvSchema.findOneAndUpdate(
                            {_id: cvID},
                            {
                                $set: {
                                    status: 1,
                                }
                            },
                            function (err, obj) {
                                if (err) {
                                    console.log(err);
                                    console.log("Leader accept fail larrrrrrrr");
                                } else {
                                    console.log("Leader accept successss larhhhhhh");
                                }
                            });
                    })
                    return cb(err, obj);
                }
            })

        // console.log("Leader selected time and date created di sini");
        // console.log(data);
        //
        // let timeObj = db.ArrangeTimeSchema(data)
        // timeObj.save(function (err, obj) {
        //
        //     console.log('We save your leader created time and date data');
        //     // let cvID = data._id || '6010ca7a2ef3d71a449f084d';
        //     let cvID = data.cvID;
        //     console.log(data)
        //     console.log("THIS IS THE ID IN THE DB: " + cvID);
        //     db.CvSchema.findOneAndUpdate(
        //         {_id: cvID},
        //         {
        //             $set: {
        //                 status: 1,
        //             }
        //         },
        //         function (err, obj) {
        //             if (err) {
        //                 console.log(err);
        //                 console.log("Leader accept fail larrrrrrrr");
        //             } else {
        //                 console.log("Leader accept successss larhhhhhh");
        //             }
        //             // cb(err, obj)
        //         });
        //     cb(err, obj)
        // })
    }

    static find(data, cb) {
        // let talentSearch = data.name || 'jasmin';
        // db.ArrangeTimeSchema.find()
        //     .exec(function (err, obj) {
        //         cb(err, obj)
        //     })

        // data['isDelete'] = false;
        db.ArrangeTimeSchema
            .find(data)
            .populate({path: 'cvID', select: {}})
            .lean()
            .exec(function (err, obj) {
                if(obj && obj.length > 0) {
                    obj.map(function(dat) {
                        if(dat.availableTime && dat.availableTime.length > 0)
                            dat.availableTime.map(function(timeData) {
                                timeData.dateStr = moment(timeData.date).format('DD MMM YYYY');
                                let start = moment(timeData.timeStart).format('HH:mm');
                                let end = moment(timeData.timeEnd).format('HH:mm');
                                timeData.timeStr =`${start}-${end}`;
                            })
                    });
                }
                cb(err, obj)
            })
    }

    static adminReject(data, cb) {
        // Update the table
        // let cvID = data._id || '600eeab9922465065026ee81';
        let cvID = data.cvID;
        console.log("CV ID OSDOSF: " + cvID);
        // let rejectReasons = data.reasons || 'Not enough time for the interview';
        let adminRejectReasons = data.adminRejectReasons;
        console.log("REJEC REASON SDOSF: " + adminRejectReasons);

        db.ArrangeTimeSchema.findOneAndUpdate(
            {_id: cvID},
            {
                $set: {
                    adminResponseStatus: 2,
                    // isDelete: true,
                    adminRejectReasons: adminRejectReasons
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

    static deleteAllArrangeData(data, cb) {
        // Get User Data from db
        db.ArrangeTimeSchema.remove()
            .exec(function (err, obj) {
                cb(err, obj)
            })
    }
}