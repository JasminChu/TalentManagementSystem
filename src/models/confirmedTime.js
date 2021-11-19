const mongoose = require('mongoose')

const ConfirmedTimeSchema = new mongoose.Schema({
    arrangeID: {type: 'ObjectId', ref: 'ArrangeTime'},
    availableTime:
        {
            dateTime: Date,
            endDateTime: Date
        }
});

module.exports = mongoose.model('ConfirmedTime', ConfirmedTimeSchema);
