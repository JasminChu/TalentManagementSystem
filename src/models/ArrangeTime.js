import moment from "moment";

const mongoose = require('mongoose')
const ArrangeTimeSchema = new mongoose.Schema({
    cvID: {type: 'ObjectId', ref: 'Cv'},

    //adminResponse
    adminResponseStatus:{type: 'Number', default: 0},
    // 0 (noResponse)
    // 1 (adminAccept)
    // 2 (adminRejected)

    adminRejectReasons: String,

    availableTime:
        [{
            // dateTime: Date,
            // endDateTime: Date
            date: Date,
            timeStart: Date,
            timeEnd: Date
        }]

},{timestamps: true});

module.exports = mongoose.model('ArrangeTime', ArrangeTimeSchema);
