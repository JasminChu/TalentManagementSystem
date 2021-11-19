const mongoose = require('mongoose')

const CvSchema = new mongoose.Schema({
    name: String,
    department: String,
    url: String,
    status: {type: 'Number', default: 0},
    // 0 (NoResponse)
    // 1 (leaderAccepted)
    // 2 (leaderRejected)

    isDelete:  {type: 'Boolean', default: false},
    reasons: String,


},{timestamps: true});


// NEW (PAGINATION)
// CvSchema.methods.paginate = function(pageNo, callback){
//
//     var limit = 10;
//     var skip = pageNo * (limit - 1);
//     var totalCount;
//
//     //count documents
//     this.count({}, function(err, count)){
//         if(err){
//             totalCount = 0;
//         }
//         else{
//             totalCount = count;
//         }
//     }
//     if(totalCount == 0){
//         return callback('No Document in Database..', null);
//     }
//     //get paginated documents
//     this.find().skip(skip).limit(limit).exec(function(err, docs){
//
//         if(err){
//             return callback('Error Occured', null);
//         }
//         else if(!docs){
//             return callback('Docs Not Found', null);
//         }
//         else{
//             var result = {
//                 "totalRecords" : totalCount,
//                 "page": pageNo,
//                 "nextPage": pageNo + 1,
//                 "result": docs
//             };
//             return callback(null, result);
//         }
//
//     });
//
// });
// const Client = module.exports = mongoose.model('Cv', CvSchema);


module.exports = mongoose.model('Cv', CvSchema);

