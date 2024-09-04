module.exports={

    isLoggedIn(req, res, next){

        // console.log("kenssy",req.isAuthenticated());

        if(req.isAuthenticated()){
            return next();
        }else{
            return res.redirect('/login');
        }
    },

    isNotLoggedIn(req,res,next){

        // console.log("Chele",req.isAuthenticated());

        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/');
    }
};