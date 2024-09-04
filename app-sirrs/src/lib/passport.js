// definimos metodos de autenticacion
const passport =  require('passport');
const localStrategy =  require('passport-local').Strategy;
const conn =  require('../database');
const helpers = require('../lib/helpers');


// LOGIN
passport.use('local.login', new localStrategy({
    usernameField: 'nombreUsuario',
    passwordField: 'contrasena',
    passReqToCallback: true
}, async (req,usuario, password, done)=>{
    // console.log(req.body)
    // console.log(usuario)
    // console.log(password) 
    const rows = await conn.query('select * from usuario where usuario = ?', [usuario]);
    console.log(req.body);
    
    if(rows.length > 0){
        const user = rows[0];
        const validarPassword = await helpers.comparePassword(password, user.contrasenia);
        
       // sessionStorage.setItem("SESSION", "ACTIVA");
        
        if(validarPassword){
            done(null, user, req.flash('guardadoExitosamente','Bienvenido ' + user.usuario)); //ese user es el mismo de la linea 21

        }else{
            done(null, false, req.flash('mensajeError','Contraseña incorrecta'));
        }
    }else{
        return done(null, false, req.flash('mensajeError','Usuario no existe'));
    }
    
}));


// SIGNUP REGISTRARMOS
passport.use('local.signup', new localStrategy({
    usernameField: 'nusuario', // es el name de donde recibo el username
    passwordField: 'contrasena',
    passReqToCallback: true
}, async (req,nusuario, contrasena, done)=>{
    const {nombreCompleto,numEmpleado} = req.body;
    const newUser={
        usuario:nusuario,
        contrasenia:contrasena,
        numeroEmpleado:numEmpleado,
        nombreCompleto,
        estado:1
    };
    newUser.contrasenia = await helpers.encryptPassword(contrasena);
    const result = await conn.query('Insert Into usuario set ?', [newUser]);
    newUser.id=result.insertId;
    console.log(newUser);
    return done(null, newUser);
}));

// serializar el usuario
passport.serializeUser((usuario, done)=>{
    done(null, usuario.id);
});
// deserializarlo
passport.deserializeUser(async ( id, done)=>{
    const row = await conn.query('select * from usuario where id = ?', [id]);
    done(null, row[0]);
});





