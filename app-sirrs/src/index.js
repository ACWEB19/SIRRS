const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require ('path');

const flash = require('connect-flash');
const session = require('express-session');
const mysqlstore =require('express-mysql-session');
const passport =require('passport');
const {database} =  require('./keys')


// inicializacion
const app =  express();
require('./lib/passport');

//middleware no cache, solicita de nuevo la validacion, dar click atras luego del cerrar sesion no redirige a la ventana principal de la app
app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers:require('./lib/handlebars')
}));
app.set('view engine','.hbs');

//MIDDLEWARES
app.use(session({
    secret: 'kenssy',
    resave:false,
    saveUninitialized:false,
    store: new mysqlstore(database)
}));
app.use(flash());
app.use(morgan('dev'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());


//variables globales
app.use((req,res,next)=>{
    app.locals.guardadoExitosamente = req.flash('guardadoExitosamente');
    app.locals.mensajeError = req.flash('mensajeError');
    app.locals.user = req.user;
    next();
});






//ROUTES
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//PUBLIC
app.use(express.static(path.join(__dirname, 'public')));





//INICIAR SERVER
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
    
});