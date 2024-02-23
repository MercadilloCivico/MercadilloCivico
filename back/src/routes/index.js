const { Router } = require('express');
const { login, logout } = require('../controllers/Usuario/authController');
const middleware = require('../../middleware/authGoogle');
const deleteUser = require('../controllers/Usuario/deleteUserController');
const contraseñaOlvidada = require('../controllers/Usuario/contraseñaOlvidada');
const recuperarContrasenia = require('../controllers/Usuario/recuperarContraseña');
const ProductController = require('../controllers/Producto/productController');
const validateProductFields = require('../../middleware/validateProductFields');
const register = require('../controllers/Usuario/registerController');
const putUsuario = require('../controllers/Usuario/putUsuarioController');
const FavoriteControllers = require('../controllers/Usuario/favoritesController');
const PuntoDeVentaController = require('../controllers/PuntoDeVenta/puntoVentaController');
const CarritoController = require('../controllers/Carrito/carritoController');

const router = Router();

// Get

router.get('/auth/google', middleware.authenticateGoogle);
router.get('/auth/google/callback', middleware.authenticateGoogleCallback);
router.get('/forgot/password', recuperarContrasenia);
router.get('/favorites/:id?', FavoriteControllers.get);
router.get('/punto_de_venta/:id?', PuntoDeVentaController.get);
router.get('/carrito_de_compras/:id?', CarritoController.get);

// Post

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/postProduct', validateProductFields, ProductController.post);
router.post('/favorites/:id', FavoriteControllers.addFav);
router.post('/punto_de_venta', PuntoDeVentaController.post);

// Delete

router.delete('/disable/user', deleteUser);
router.delete('/favorites/:id');
router.delete('/punto_de_venta/:id', PuntoDeVentaController.delete);
router.put('carrito_de_compras/limpiar', CarritoController.limpiarCarrito);
router.delete('/productoLogic/:id', ProductController.logicDelete);
router.delete('/productoTrue/:id', ProductController.trueDelete);

// Put

router.put('/forgot/password', contraseñaOlvidada);
router.put('/update/user', putUsuario);
router.put('/punto_de_venta/edit/:id', PuntoDeVentaController.put);
router.put('/punto_de_venta/add/:id', PuntoDeVentaController.addProveedor);
router.put('/punto_de_venta/remove/:id', PuntoDeVentaController.removeProveedor);
router.put('carrito_de_compras/add', CarritoController.addProducto);
router.put('carrito_de_compras/remove', CarritoController.removeProducto);
router.put('carrito_de_compras/cantidad', CarritoController.actualizarCantidad);

module.exports = router;
