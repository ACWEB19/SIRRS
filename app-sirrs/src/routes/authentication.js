// RUTAS PRINCIPALES DE MI APLICACION
const express = require('express');
const router = express.Router();
const passport = require('passport');

const {isLoggedIn} = require('../lib/auth');
const {isNotLoggedIn}  = require('../lib/auth');

router.get('/signup',isNotLoggedIn, (req, res) =>{
    res.render('auth/signup');
});


// router.post('/signup',(req,res)=>{
//     passport.authenticate('local.signup',{
//         successRedirect:'/profile',
//         failureRedirect: '/signup',
//         failureFlash: true
//     });
//     // console.log(req.body);
//    // res.send('recibido');
// });


router.post('/signup',isNotLoggedIn, passport.authenticate('local.signup',{

        successRedirect:'/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));


router.get('/login',isNotLoggedIn, (req, res) =>{
    res.render('auth/login');
});

// router.post('/login', passport.authenticate('local.login',{
//     successRedirect:'/profile',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

router.post('/login',isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local.login',{
        successRedirect: '/links',
        failureRedirect: '/login',
        failureFlash:true
    })(req,res, next);
});


router.get('/profile', isLoggedIn, (req, res) =>{
    res.render('profile');
});

router.get('/logout', isLoggedIn,(req, res) =>{
    req.logOut();
    res.redirect('/login');
});



module.exports = router;