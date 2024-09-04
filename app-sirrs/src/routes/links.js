const express = require('express');
const router = express.Router();

const conn = require('../database');

const {isLoggedIn} = require('../lib/auth')

router.get('/add',isLoggedIn, (req,res)=>{
    res.render('links/add');
});

router.post('/add',isLoggedIn, async (req,res)=>{
    const { numRS , fechaVen,CLV, prodNombre, prodMarca,prodFabricante,prodTipo,prodEmpresa} = req.body;
    const { title , url, description} = req.body;
    const newCargue = {
        Id_RegistroSanitario:numRS , 
        Fecha_Vencimiento:fechaVen,
        CLV_Identificador:'0000', 
        Producto_Nombre:prodNombre, 
        Producto_Marcas:prodMarca,
        Producto_Fabricantes:prodFabricante,
        Producto_Tipo:prodTipo,
        Producto_Empresa:prodEmpresa,
        Estado_Envio:1
        // user_id: req.user.id
    };
    console.log(newCargue);
    await conn.query('INSERT INTO cargue set ?',[newCargue]);
    req.flash('guardadoExitosamente', 'Registro almacenado satisfactoriamente');
    res.redirect('/links/add');
    // res.render('links/add');
});

router.get('/', isLoggedIn, async (req, res) =>{
    const listaCargues =  await conn.query('select Id_Cargue, Id_RegistroSanitario, DATE_FORMAT(Fecha_Vencimiento, "%Y/%m/%d") as Fecha_Vencimiento, CLV_Identificador, Producto_Nombre, Producto_Marcas, Producto_Fabricantes, Producto_Tipo, Producto_Empresa, created_at from cargue ORDER BY created_at desc');
    //console.log(listalinks);
    res.render('links/list', {listaCargues});
});


router.get('/delete/:Id_Cargue',isLoggedIn, async (req, res) =>{
    const {Id_Cargue} = req.params;
    await conn.query('DELETE FROM cargue WHERE Id_Cargue = ?',[Id_Cargue]);
    req.flash('guardadoExitosamente', 'Registro eliminado satisfactoriamente');
    console.log(req.params.Id_Cargue);
    // res.send('eliminado');
    res.redirect('/links');
});

router.get('/edit/:Id_Cargue', isLoggedIn,async (req, res) =>{
    const {Id_Cargue} = req.params; // saber el id para editar o eliminar
    const infoCargueId  = await conn.query('select Id_Cargue, Id_RegistroSanitario, DATE_FORMAT(Fecha_Vencimiento, "%Y-%m-%d") as Fecha_Vencimiento, CLV_Identificador, Producto_Nombre, Producto_Marcas, Producto_Fabricantes, Producto_Tipo, Producto_Empresa from cargue where Id_Cargue = ?',[Id_Cargue]);
    //await conn.query('DELETE FROM links WHERE id = ?',[id]);
    console.log(infoCargueId[0]);
    //res.send('recibido');
    res.render('links/edit',{infoCargueId:infoCargueId[0]});
});

router.post('/edit/:Id_Cargue', isLoggedIn,async (req, res) =>{
    const {Id_Cargue} = req.params; // saber el id para editar o eliminar saber si lo recibi
    const { fechaVen, prodNombre, prodMarca,prodFabricante,prodTipo,prodEmpresa} = req.body;
    const modifiCargue = {
        Fecha_Vencimiento:fechaVen,
        CLV_Identificador:'0000', 
        Producto_Nombre:prodNombre, 
        Producto_Marcas:prodMarca,
        Producto_Fabricantes:prodFabricante,
        Producto_Tipo:prodTipo,
        Producto_Empresa:prodEmpresa
    };
    await conn.query('UPDATE cargue SET ? WHERE Id_Cargue = ?', [modifiCargue,Id_Cargue]);
    req.flash('guardadoExitosamente', 'Cargue modificado exitosamente');
    res.redirect('/links');
});
















module.exports = router;

