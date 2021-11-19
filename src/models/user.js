// const mongoose = require('mongoose')
//
//
// // Set-up User Schema
// const UserSchema = new mongoose.Schema({
//     email: String,
//     password: String,
//     role: String
// });
//
//
// // User == jasmin
// module.exports = mongoose.model('User', UserSchema);


const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: String,
    role: String,
    department: Number,
    // 1 = Admin
    // 5 = It
    // 6 = Finance
    // 7 = Marketing
    // 8 = Operation
    // 9 = Mad
    // 10 = Design
    hash: String,
    salt: String,
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        role: this.role,
        department: this.department,
        // 1 = Admin
        // 5 = It
        // 6 = Finance
        // 7 = Marketing
        // 8 = Operation
        // 9 = Mad
        // 10 = Design
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        role: this.role,
        department: this.department,
        // 1 = Admin
        // 5 = It
        // 6 = Finance
        // 7 = Marketing
        // 8 = Operation
        // 9 = Mad
        // 10 = Design
        token: this.generateJWT(),

    };
};


module.exports = mongoose.model('User', UserSchema);
// require('./config/passport');