const express = require('express');
const router = express.Router();

function roleChecking(req, res, next) {
    // db.readuser
    // console.log(req.user.role);
    // // DEFAULT
    // if (req.user) {
    //     res.locals.role = req.user.role;
    //     next();
    // } else {
    //     res.status(401).send('You shall not pass');
    //     // return res.redirect('/login');
    // }
    // 5 = It
    // 6 = Finance
    // 7 = Marketing
    // 8 = Operation
    // 9 = Mad
    // 10 = Design
    let pathRole = req.path.split('/');
    console.log(pathRole[1]);

    if (req.user) {
        if (req.user.role == pathRole[1]) {
            res.locals.role = req.user.role;
            res.locals.email = req.user.email;
            switch(req.user.department) {
                case 1:
                    res.locals.department = 'admin';
                    break;
                case 5:
                    res.locals.department = 'it';
                    break;
                case 6:
                    res.locals.department = 'finance';
                    break;
                case 7:
                    res.locals.department = 'marketing';
                    break;
                case 8:
                    res.locals.department = 'operation';
                    break;
                case 9:
                    res.locals.department = 'mad';
                    break;
                case 10:
                    res.locals.department = 'design';
                    break;
            }
            // res.locals.department = req.user.department;
            next();
            // console.log(req.user.role);
        } else {
            res.redirect('/login');
            // res.status(401).send('You shall not pass');
            // return res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
}

// function ApiRoleChecking(req, res, next) {
//     let pathRole = req.path.split('/');
//     console.log(pathRole[2]);
//     if (req.user) {
//         if (req.user.role == pathRole[2]) {
//             res.locals.role = req.user.role;
//             next();
//             // console.log(req.user.role);
//         } else {
//             res.redirect('/login');
//             // res.status(401).send('You shall not pass');
//             // return res.redirect('/login');
//         }
//     } else {
//         res.redirect('/login');
//     }
// }

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/login');
});

router.get('/admin/pendingConfirm', roleChecking, function (req, res, next) {
    res.render('indexAdmin', {title: 'Admin | Pending Confirm Interviews', role: res.locals.role});
    console.log("ROLE: " + res.locals.role);
    console.log("CURRENT USER: " + res.locals.email);
    console.log("CURRENT DEPARTMENT: " + res.locals.department);
});

// router.get('/admin/reject', roleChecking, function (req, res, next) {
//     res.render('rejected', {title: 'Admin | Rejected requests', role: res.locals.role});
//     console.log("ROLE: " + res.locals.role);
//     console.log("CURRENT USER: " + res.locals.email);
//     console.log("CURRENT DEPARTMENT: " + res.locals.department);
// });

router.get('/admin', roleChecking, function (req, res, next) {
    res.render('allRequests', {title: 'Admin | Home page', role: res.locals.role});
    console.log("USER EMAIL: " + res.locals.email);
    console.log("CURRENT USER: " + res.locals.email);
    console.log("CURRENT DEPARTMENT: " + res.locals.department);
});

router.get('/leader/interviews', roleChecking, function (req, res, next) {
    res.render('indexLeader', {title: 'Leader | Interview requests', department: '', role: res.locals.role});
    console.log("ROLE: " + res.locals.role);
    console.log("CURRENT USER: " + res.locals.email);
    console.log("CURRENT DEPARTMENT: " + res.locals.department);
});

router.get('/leader/interviews/history', roleChecking, function (req, res, next) {
    res.render('leaderHistory', {title: 'Leader | Requests History', role: res.locals.role});
    console.log("ROLE: " + res.locals.role);
});

router.get('/leader/interviews/operation', roleChecking, function (req, res, next) {
    res.render('indexLeader', {
        title: 'Operations Leader | Interview requests',
        department: res.locals.department,
        role: res.locals.role
    });
    console.log("ROLE: " + res.locals.role);
    console.log("CURRENT USER: " + res.locals.email);
    console.log("CURRENT DEPARTMENT: " + res.locals.department);
});

router.get('/leader/interviews/it', roleChecking, function (req, res, next) {
    res.render('indexLeader', {
        title: 'IT Leader | Interview requests',
        department: res.locals.department,
        role: res.locals.role});
    console.log("ROLE: " + res.locals.role);
    console.log("CURRENT USER: " + res.locals.email);
    console.log("CURRENT DEPARTMENT: " + res.locals.department);
});

router.get('/leader/interviews/marketing', roleChecking, function (req, res, next) {
    res.render('indexLeader', {
        title: 'Marketing Leader | Interview requests',
        department: res.locals.department,
        role: res.locals.role
    });
    console.log("ROLE: " + res.locals.role);
    console.log("CURRENT USER: " + res.locals.email);
    console.log("CURRENT DEPARTMENT: " + res.locals.department);
});

router.get('/leader/interviews/design', roleChecking, function (req, res, next) {
    res.render('indexLeader', {
        title: 'Design Leader | Interview requests',
        department: res.locals.department,
        role: res.locals.role
    });
    console.log("ROLE: " + res.locals.role);
    console.log("CURRENT USER: " + res.locals.email);
    console.log("CURRENT DEPARTMENT: " + res.locals.department);
});

router.get('/leader/interviews/finance', roleChecking, function (req, res, next) {
    res.render('indexLeader', {
        title: 'Finance Leader | Interview requests',
        department: res.locals.department,
        role: res.locals.role
    });
    console.log("ROLE: " + res.locals.role);
    console.log("CURRENT USER: " + res.locals.email);
    console.log("CURRENT DEPARTMENT: " + res.locals.department);
});

router.get('/leader/interviews/mad', roleChecking, function (req, res, next) {
    res.render('indexLeader', {
        title: 'Merchandise Acquisition Leader | Interview requests',
        department: res.locals.department,
        role: res.locals.role
    });
    console.log("ROLE: " + res.locals.role);
    console.log("CURRENT USER: " + res.locals.email);
    console.log("CURRENT DEPARTMENT: " + res.locals.department);
});

router.get('/leader', roleChecking, function (req, res, next) {
    res.redirect('/leader/interviews/' + res.locals.department);
});

router.get('/leader/pendingInterviews', roleChecking, function (req, res, next) {
    res.render('pendingInterview', {title: 'Leader | Interviews', role: res.locals.role});
    console.log("ROLE: " + res.locals.role);
    console.log("CURRENT USER: " + res.locals.email);
    console.log("CURRENT DEPARTMENT: " + res.locals.department);
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Login'});
});

router.use('/user', require('./users'));
router.use('/talentCv', require('./talentCv'));
router.use('/ArrangeTime', require('./arrangeTime'));
router.use('/ConfirmedTime', require('./confirmedTime'));
router.use('/api', require('./api'));

module.exports = router;