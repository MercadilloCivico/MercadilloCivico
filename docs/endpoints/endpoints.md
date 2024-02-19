# Lista de Endpoints de la API y Controladores Asociados

## Auth

- POST /auth/register - authController.register
- POST /auth/login - authController.login
- GET /auth/google - authController.googleAuth
- GET /auth/logout - authController.logout

## Usuarios

- GET /users - userController.getAllUsers
- GET /users/:id - userController.getUserById
- PUT /users/:id - userController.updateUser
- DELETE /users/:id - userController.deleteUser

## Productos

- POST /products - productController.createProduct
- GET /products - productController.getAllProducts
- GET /products/:id - productController.getProductById
- PUT /products/:id - productController.updateProduct
- DELETE /products/:id - productController.deleteProduct

## Pedidos

- POST /orders - orderController.createOrder
- GET /orders - orderController.getAllOrders
- GET /orders/:id - orderController.getOrderById
- PUT /orders/:id - orderController.updateOrder
- DELETE /orders/:id - orderController.deleteOrder

## Reseñas

- POST /reviews - reviewController.addReview
- GET /reviews - reviewController.getReviewsByProduct
- DELETE /reviews/:id - reviewController.deleteReview
