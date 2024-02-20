const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ?Como utilizar prisma y sus peticiones
/*
!Deberán de importar prisma en sus archivos handlers
? Para acceder a los modelos sincronizados a la db deberán hacer => "prisma.Usuario" o "prisma.Producto" etc..
? Para acceder a los métodos del modelo deberán hacer =>
por ejemplo =
prisma.Usuario.create({
    data: {
        ...datos a crear
    }
})
*Métodos que nos servirían: findFirst(como findOne de sequelize), findMany(findAll), create, update. Para las peticiones delete vamos a utilizar el método update y cambiar la propiedad disable a true para los modelos de usuario y producto.
! Recomendación: instalar la extension de vscode Prisma para el autocomplete.
*/

module.exports = prisma;
