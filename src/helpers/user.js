import db from '../models'
import * as res from "express";

export default class {

    static create(data, cb) {
        // Create User
        console.log("User create di sini");
        console.log(data);
        let userObj = db.UserSchema(data)
        userObj.save(function (err, obj) {
            if (err) {
                console.log(err);
            } else {
                console.log('We save your User data');
            }
            cb(err, obj)
        })
    }

    static find(data, cb) {
        // Get User Data from db
        db.UserSchema.find()
            .exec(function (err, obj) {
                cb(err, obj)
            })
    }

    static deleteAllData(data, cb) {
        // Get User Data from db
        db.UserSchema.remove()
            .exec(function (err, obj) {
                cb(err, obj)
            })
    }
}