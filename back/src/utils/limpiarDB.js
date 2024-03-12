const prisma = require('../../db_connection');

const limpiarDB = async () => {
  // await prisma.pedidos_Proveedor.deleteMany();
  // await prisma.inventario.deleteMany();
  // await prisma.productoProveedor.deleteMany();
  // await prisma.carrito_de_Compras.deleteMany();
  await prisma.historial_Compras.deleteMany();
  // await prisma.punto_De_Venta.deleteMany();
  // await prisma.resena.deleteMany();
  // await prisma.producto.deleteMany();
  // await prisma.proveedor.deleteMany();
  // await prisma.usuario.deleteMany();
  // await prisma.reponer_Existencias.deleteMany();
};
module.exports = limpiarDB;
