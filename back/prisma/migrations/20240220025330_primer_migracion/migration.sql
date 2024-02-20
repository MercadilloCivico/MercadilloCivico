-- CreateTable
CREATE TABLE "Usuario" (
    "id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "second_name" TEXT,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "photo" TEXT,
    "google_id" TEXT,
    "rol" TEXT NOT NULL DEFAULT 'user',
    "subscribe_blog" BOOLEAN NOT NULL DEFAULT true,
    "disabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id" SERIAL NOT NULL,
    "name_prov" TEXT NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "calification" INTEGER NOT NULL DEFAULT 5,
    "proveedor_id" INTEGER NOT NULL,
    "marca" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Punto_De_Venta" (
    "id" UUID NOT NULL,
    "company_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Punto_De_Venta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProveedorToPunto_De_Venta" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_user_id_key" ON "Proveedor"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProveedorToPunto_De_Venta_AB_unique" ON "_ProveedorToPunto_De_Venta"("A", "B");

-- CreateIndex
CREATE INDEX "_ProveedorToPunto_De_Venta_B_index" ON "_ProveedorToPunto_De_Venta"("B");

-- AddForeignKey
ALTER TABLE "Proveedor" ADD CONSTRAINT "Proveedor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProveedorToPunto_De_Venta" ADD CONSTRAINT "_ProveedorToPunto_De_Venta_A_fkey" FOREIGN KEY ("A") REFERENCES "Proveedor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProveedorToPunto_De_Venta" ADD CONSTRAINT "_ProveedorToPunto_De_Venta_B_fkey" FOREIGN KEY ("B") REFERENCES "Punto_De_Venta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
