const mysql = require('mysql');
const {promisify} = require('util')
const {database}  = require('./keys');

const pool = mysql.createPool(database);
pool.getConnection((err, connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('la conexion de la base de datos se ha cerrado');
            
        }

        if(err.code == 'ER_CON_COUNT_ERROR'){
            console.error('la base de datos tiene mas conexiones');
        }

        if(err.code == 'ECONNREFUSED'){
            console.error('la cinexion de base de datos ha sido rechazada');
            
        }
    }

    if(connection) connection.release();
    console.log('DB esta conectada');
    return;
    
});

//convirtiendo promesas lo que antes eran en callback
pool.query = promisify(pool.query);

module.exports = pool;