-- CreateTable
CREATE TABLE "Resena" (
    "id" SERIAL NOT NULL,
    "coment" TEXT NOT NULL,
    "calification" INTEGER NOT NULL,
    "producto_id" UUID NOT NULL,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "Resena_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrito_de_Compras" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Carrito_de_Compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventario" (
    "id" SERIAL NOT NULL,
    "punto_id" TEXT NOT NULL,
    "producto_id" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedidos_Proveedor" (
    "id" SERIAL NOT NULL,
    "nombre_prov" TEXT NOT NULL,
    "productos" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_entregado" TIMESTAMP(3),
    "estado" TEXT NOT NULL DEFAULT 'pendiente',

    CONSTRAINT "Pedidos_Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historial_Compras" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Historial_Compras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductoToUsuario" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_Carrito_de_ComprasToProducto" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_Historial_ComprasToProducto" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Carrito_de_Compras_user_id_key" ON "Carrito_de_Compras"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductoToUsuario_AB_unique" ON "_ProductoToUsuario"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductoToUsuario_B_index" ON "_ProductoToUsuario"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Carrito_de_ComprasToProducto_AB_unique" ON "_Carrito_de_ComprasToProducto"("A", "B");

-- CreateIndex
CREATE INDEX "_Carrito_de_ComprasToProducto_B_index" ON "_Carrito_de_ComprasToProducto"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Historial_ComprasToProducto_AB_unique" ON "_Historial_ComprasToProducto"("A", "B");

-- CreateIndex
CREATE INDEX "_Historial_ComprasToProducto_B_index" ON "_Historial_ComprasToProducto"("B");

-- AddForeignKey
ALTER TABLE "Resena" ADD CONSTRAINT "Resena_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resena" ADD CONSTRAINT "Resena_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrito_de_Compras" ADD CONSTRAINT "Carrito_de_Compras_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_punto_id_fkey" FOREIGN KEY ("punto_id") REFERENCES "Punto_De_Venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historial_Compras" ADD CONSTRAINT "Historial_Compras_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductoToUsuario" ADD CONSTRAINT "_ProductoToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductoToUsuario" ADD CONSTRAINT "_ProductoToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Carrito_de_ComprasToProducto" ADD CONSTRAINT "_Carrito_de_ComprasToProducto_A_fkey" FOREIGN KEY ("A") REFERENCES "Carrito_de_Compras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Carrito_de_ComprasToProducto" ADD CONSTRAINT "_Carrito_de_ComprasToProducto_B_fkey" FOREIGN KEY ("B") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Historial_ComprasToProducto" ADD CONSTRAINT "_Historial_ComprasToProducto_A_fkey" FOREIGN KEY ("A") REFERENCES "Historial_Compras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Historial_ComprasToProducto" ADD CONSTRAINT "_Historial_ComprasToProducto_B_fkey" FOREIGN KEY ("B") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
