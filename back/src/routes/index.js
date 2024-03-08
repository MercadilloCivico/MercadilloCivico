const { Router } = require('express');
const middleware = require('../../middleware/authGoogle');
const ProductController = require('../controllers/Producto/productController');
const FavoriteControllers = require('../controllers/favorites/favoritesController');
const PuntoDeVentaController = require('../controllers/PuntoDeVenta/puntoVentaController');
const ProveedoresController = require('../controllers/proveedores/proveedoresController');
const usuariosController = require('../controllers/Usuario/usuariosController');
const CarritoController = require('../controllers/Carrito/carritoController');
const InventarioController = require('../controllers/inventario/inventarioController');
const validateMiddleware = require('../../middleware/validateMiddleware');
const ReseñasController = require('../controllers/Reseñas/reseñasController');
const HistorialController = require('../controllers/HistorialDeVenta/historialController');
const FiltroController = require('../controllers/Filtros/filtroController');
const datosTarjeta = require('../controllers/dataCard/datosTarjeta');
const { checkAuthentication } = require('../../middleware/validationToken');
const StripeController = require('../controllers/Stripe/stripeController');

const router = Router();
// auth
router.get('/auth/token', checkAuthentication);
// user/auth
router.get('/auth/google', middleware.authenticateGoogle);
router.get('/auth/google/callback', middleware.authenticateGoogleCallback);
router.get('/forgot/password', usuariosController.usuarios.recuperarContrasenia);
router.post('/register', usuariosController.usuarios.register);
router.post('/login', usuariosController.usuarios.login);
router.post('/logout', usuariosController.usuarios.logout);
router.put('/forgot/password', usuariosController.usuarios.contraseñaOlvidada);
router.put('/update/user', usuariosController.usuarios.putUsuario);
router.delete('/delete/user', usuariosController.usuarios.deleteUsuario);
router.put('/disable/user', usuariosController.usuarios.deleteLogic);
router.get('/user/info/:id?', usuariosController.usuarios.get);
router.get('/user/profile', usuariosController.usuarios.getUser);

// products

router.get('/product/:id?', ProductController.get);
router.post('/postProduct', middleware.protectRoute, ProductController.post);
router.delete('/productoLogic/:id', middleware.protectRoute, ProductController.logicDelete);
router.delete('/productoTrue/:id', middleware.protectRoute, ProductController.trueDelete);
router.put('/product/edit/:id', middleware.protectRoute, ProductController.put);

// favorites

router.get('/favorites', FavoriteControllers.get);
router.post('/favorites/:id', FavoriteControllers.addFav);
router.delete('/favorites/:id', FavoriteControllers.removeFav);

// proveedores
router.get('/proveedor/profile', ProveedoresController.getProfile);
router.get('/proveedor/:id?', ProveedoresController.getAll);
router.post('/proveedor', validateMiddleware.validateProveedores, ProveedoresController.post);
router.put('/proveedor', ProveedoresController.put);
router.delete('/proveedor/:id', ProveedoresController.delete);

// carrito

router.get('/carrito_de_compras', CarritoController.get);
router.put('/carrito_de_compras/limpiar', CarritoController.limpiarCarrito);
router.put('/carrito_de_compras/add', CarritoController.addProducto);
router.put('/carrito_de_compras/remove', CarritoController.removeProducto);
router.put('/carrito_de_compras/cantidad', CarritoController.actualizarCantidad);

// punto de venta

router.get('/punto_de_venta/:id?', PuntoDeVentaController.get);
router.post('/punto_de_venta', middleware.protectRoute, PuntoDeVentaController.post);
router.put('/punto_de_venta/edit/:id', middleware.protectRoute, PuntoDeVentaController.put);
router.put('/punto_de_venta/add/', middleware.protectRoute, PuntoDeVentaController.addProveedor);
router.put(
  '/punto_de_venta/remove/:id',
  middleware.protectRoute,
  PuntoDeVentaController.removeProveedor
);
router.delete('/punto_de_venta/:id', middleware.protectRoute, PuntoDeVentaController.delete);

// Inventario
router.post(
  '/inventario',
  middleware.protectRoute,
  validateMiddleware.validateInventario,
  InventarioController.post
);
router.get('/inventario/:id?', InventarioController.get);
router.put('/inventario/', middleware.protectRoute, InventarioController.put);
router.delete('/inventario/:id', middleware.protectRoute, InventarioController.delete);

// Reseñas
router.get('/resenas/:id?', ReseñasController.get);
router.post('/resenas', validateMiddleware.validateReseña, ReseñasController.post);
router.put('/resenas/:id', ReseñasController.put);
router.delete('/resenas/:id', ReseñasController.delete);

// Historial de compras
router.get('/historialCompra', HistorialController.getAll);
router.get('/historialCompra/:id', HistorialController.getById);
router.post('/historialCompra', validateMiddleware.validateHistorial, HistorialController.post);
router.delete('/historialCompra/:id', HistorialController.delete);

// Filtros
router.get('/filtro/:id', validateMiddleware.validateFilter, FiltroController.filterProductos);

// datosTarjeta

router.post('/payment', datosTarjeta.data);

// Stripe
router.get('/session/payment', StripeController.createSession);

module.exports = router;
