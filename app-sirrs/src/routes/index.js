// RUTAS PRINCIPALES DE MI APLICACION
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('auth/login');
    
});


module.exports = router;