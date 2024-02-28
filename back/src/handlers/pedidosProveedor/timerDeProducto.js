const cron = require('node-cron');
const prisma = require('../../../db_connection');

const validadorDeInventario = async () => {
  try {
    // Verificar si hay productos con stock menor o igual al stock mínimo
    const inventario = await prisma.punto_De_Venta.findMany({
      include: {
        inventario: true,
        provedores: true,
      },
    });

    const stockAgotado = inventario.flatMap((element) =>
      element.inventario.filter((el) => el.stock <= el.stock_max)
    );
    await Promise.all(
      stockAgotado.map(async (stockItem) => {
        const validateProveedor = await prisma.pedidos_Proveedor.findMany({
          where: {
            prov_id: stockItem.proveedor_id,
            estado: 'pendiente',
          },
        });

        if (!validateProveedor || validateProveedor.length === 0) {
          await prisma.pedidos_Proveedor.create({
            data: {
              prov_id: stockItem.proveedor_id,
              productos: {
                create: {
                  punto_Venta_Id: stockItem.punto_de_venta_id,
                  producto: stockItem.producto_id,
                  cantidad: stockItem.stock,
                },
              },
            },
            include: {
              productos: true,
            },
          });
        }

        if (validateProveedor) {
          await prisma.pedidos_Proveedor.findFirst({
            where: {
              prov_id: stockItem.proveedor_id,
            },
            include: {
              productos: true,
            },
          });
        }
      })
    );
  } catch (error) {
    throw new Error(error);
  }
};
// Ejecutar una tarea cada minuto
const job = () =>
  cron.schedule('*/30 * * * * *', async () => {
    validadorDeInventario();
  });

module.exports = job;
