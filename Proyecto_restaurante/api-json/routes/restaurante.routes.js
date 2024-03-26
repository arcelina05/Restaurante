const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

router
    //Ruta login
    .post('/login', usuariosController.login)
    //Rutas productos
    .get('/usuarios/listar', usuariosController.listarUsuarios)
    .post('/usuarios/crear-usuario', usuariosController.crearUsuario)
    .put('/usuarios/actualizar-usuario/:id', usuariosController.actualizarUsuario)
    //Rutas productos
    .get('/productos/listar', productosController.listarProductos)
    .post('/productos/crear-producto', productosController.crearProducto)
    .put('/productos/actualizar-producto/:id', productosController.actualizarProducto)
    //Rutas para pedido
    .get('/pedidos/listar', pedidosController.listarPedidos)
    .post('/pedidos/crear-pedido', pedidosController.crearPedido)
    .put('/pedidos/actualizar-pedido/:id', pedidosController.actualizarEstadoPedido)
module.exports = router;