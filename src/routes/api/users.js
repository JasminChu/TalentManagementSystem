const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('User');

//POST new user route (optional, everyone has access)
router.post('/generateUser', auth.optional, (req, res, next) => {
    const user = req.body;
    // console.log(req)
    // console.log(req.body)
    // let req = {body: {user}};
    console.log("dasdasdadasdasd" + user.email);
    console.log("dasdasdadasdasd" + user.password);
    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new Users(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({user: finalUser.toAuthJSON()}));
});

//POST login route (optional, everyone has access)
router.post('/login', function (req, res, next) {
    const user = req.body;
    // console.log(req)
    // console.log(req.body)
    // let req = {body: {user}};
    console.log(`sdfhkjnfdsilf: ${user.email}`);
    console.log("regbfbhyuhtg : " + user.password);

    // const {body: {user}} = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', (err, passportUser, info) => {

        console.log("NOOB")
        console.log(passportUser)
        if (err) {
            console.log("LOGIN FAILLLLLLLLLLLLLLLLLLLLLLLL")
            return next(err);
        }

        if (passportUser) {
            console.log("LOGIN SUCESSSSSSSS")
            const user = passportUser;
            user.token = passportUser.generateJWT();
            req.logIn(passportUser, function(err) {
                console.log(req.user);
                return res.json({
                    user: user.toAuthJSON()
                });
            });
        }
        else {
            res.status(400).info;
            // return res.json('invalid user');
        }

        return res.status(400).info;
    })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
    const {payload: {id}} = req;

    return Users.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({user: user.toAuthJSON()});
        });
});

module.exports = router;
