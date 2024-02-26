const { Router } = require('express');
// const { login, logout } = require('../controllers/Usuario/authController');
const middleware = require('../../middleware/authGoogle');
// const deleteUser = require('../controllers/Usuario/deleteUserController');
// const contraseñaOlvidada = require('../controllers/Usuario/contraseñaOlvidada');
// const recuperarContrasenia = require('../controllers/Usuario/recuperarContraseña');
const ProductController = require('../controllers/Producto/productController');
// const putUsuario = require('../controllers/Usuario/putUsuarioController');
const FavoriteControllers = require('../controllers/favorites/favoritesController');
const PuntoDeVentaController = require('../controllers/PuntoDeVenta/puntoVentaController');
const ProveedoresController = require('../controllers/proveedores/proveedoresController');
const usuariosController = require('../controllers/Usuario/usuariosController');
// const register = require('../controllers/Usuario/registerController');
const CarritoController = require('../controllers/Carrito/carritoController');
const InventarioController = require('../controllers/inventario/inventarioController');
const validateMiddleware = require('../../middleware/validateMiddleware');
const ReseñasController = require('../controllers/Reseñas/reseñasController');

const router = Router();

// user/auth

router.get('/auth/google', middleware.authenticateGoogle);
router.get('/auth/google/callback', middleware.authenticateGoogleCallback);
router.get('/forgot/password', usuariosController.recuperarContrasenia);
router.post('/register', usuariosController.register);
router.post('/login', usuariosController.login);
router.post('/logout', usuariosController.logout);
router.put('/forgot/password', usuariosController.contraseñaOlvidada);
router.put('/update/user', usuariosController.putUsuario);
router.delete('/disable/user', usuariosController.deleteUsuario);
router.get('/user/info/:id?', usuariosController.get);

// products

router.get('/product/:id?', ProductController.get);
router.post('/postProduct', validateMiddleware.validateProductFields, ProductController.post);
router.delete('/productoLogic/:id', ProductController.logicDelete);
router.delete('/productoTrue/:id', ProductController.trueDelete);

// favorites

router.get('/favorites/:id?', FavoriteControllers.get);
router.post('/favorites/:id', FavoriteControllers.addFav);
router.delete('/favorites/:id');

// proveedores

router.get('/proveedor/:id?', ProveedoresController.getAll);
router.post('/proveedor', validateMiddleware.validateProveedores, ProveedoresController.post);
router.put('/proveedor/:id', ProveedoresController.put);
router.delete('/proveedor/:id', ProveedoresController.delete);

// carrito

router.get('/carrito_de_compras/:id?', CarritoController.get);
router.put('/carrito_de_compras/limpiar', CarritoController.limpiarCarrito);
router.put('/carrito_de_compras/add', CarritoController.addProducto);
router.put('/carrito_de_compras/remove', CarritoController.removeProducto);
router.put('/carrito_de_compras/cantidad', CarritoController.actualizarCantidad);

// punto de venta

router.get('/punto_de_venta/:id?', PuntoDeVentaController.get);
router.post('/punto_de_venta', PuntoDeVentaController.post);
router.put('/punto_de_venta/:id', PuntoDeVentaController.put);
router.put('/punto_de_venta/:id', PuntoDeVentaController.addProveedor);
router.put('/punto_de_venta/edit/:id', PuntoDeVentaController.put);
router.put('/punto_de_venta/add/:id', PuntoDeVentaController.addProveedor);
router.put('/punto_de_venta/remove/:id', PuntoDeVentaController.removeProveedor);
router.delete('/punto_de_venta/:id', PuntoDeVentaController.delete);

// Inventario
router.post('/inventario', validateMiddleware.validateInventario, InventarioController.post);
router.get('/inventario/:id?', InventarioController.get);
router.put('/inventario/', InventarioController.put);
router.delete('/inventario/:id', InventarioController.delete);

// Reseñas
router.get('/reseñas/:id?', ReseñasController.get);
router.post('/reseñas', validateMiddleware.validateReseña, ReseñasController.post);
router.put('/reseñas', ReseñasController.put);

module.exports = router;
