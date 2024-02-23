const prisma = require('../../../db_connection');
const eliminaPhotoUtil = require('../../utils/eliminarPhoto');
const validationImage = require('../../utils/validations/validationImage');
const uploadToCloudinary = require('../uploadToCloudinary');

class PuntoDeVentaHandlers {
  static async getById(id) {
    try {
      const punto = await prisma.punto_De_Venta.findFirst({
        where: {
          id,
        },
        include: {
          inventario: true,
          provedores: true,
        },
      });
      if (!punto) throw new Error('El punto de venta no se encuentra en la base de datos');
      return punto;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAll() {
    try {
      const puntos = await prisma.punto_De_Venta.findMany();
      return puntos;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async post(companyName, address, postalCode, contactEmail, contactTel, image) {
    try {
      const emailRepeat = await prisma.punto_De_Venta.findFirst({
        where: { contact_email: contactEmail },
      });
      if (emailRepeat)
        throw new Error('Ya se encuentra otro punto de venta registrado con el mismo email');
      let secureUrl;
      if (image) {
        secureUrl = uploadToCloudinary(image);
      }
      const puntoNuevo = await prisma.punto_De_Venta.create({
        data: {
          company_name: companyName,
          address,
          postal_code: postalCode,
          contact_email: contactEmail,
          contact_tel: contactTel,
          image: secureUrl || '',
        },
        include: {
          provedores: true,
          inventario: true,
        },
      });
      return {
        message: 'Punto de Venta creado exitosamente',
        data: puntoNuevo,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async put(id, companyName, address, postalCode, contactEmail, contactTel, image) {
    try {
      const dataToUpdate = {};
      if (companyName) dataToUpdate.company_name = companyName;
      if (contactEmail) dataToUpdate.contact_email = contactEmail;
      if (contactTel) dataToUpdate.contact_tel = contactTel;
      if (address) dataToUpdate.address = address;
      if (postalCode) dataToUpdate.postal_code = postalCode;
      if (image) {
        validationImage(image);
        await eliminaPhotoUtil(id, 'Punto_De_Venta');
        const secureUrl = await uploadToCloudinary(image);
        dataToUpdate.image = secureUrl;
      }
      const puntoActualizado = await prisma.punto_De_Venta.create({
        where: {
          id,
        },
        data: dataToUpdate,
        include: {
          provedores: true,
          inventario: true,
        },
      });
      return {
        message: 'Punto de Venta actualizado exitosamente',
        data: puntoActualizado,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(id) {
    try {
      const findCompany = await prisma.punto_De_Venta.findFirst({
        where: {
          id,
        },
      });
      if (!findCompany) throw new Error('No se encuentra el punto de venta en la base de datos');
      await prisma.punto_De_Venta.update({
        where: {
          id,
        },
        data: {
          disabled: true,
        },
      });
      return {
        message: 'Punto de Venta desactivado exitosamente',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async addProveedores(puntoId, provId) {
    try {
      const findPunto = await prisma.punto_De_Venta.findFirst({
        where: {
          id: puntoId,
        },
      });
      const findProv = await prisma.proveedor.findFirst({
        where: {
          id: provId,
        },
      });
      if (!findPunto || !findProv)
        throw new Error('El punto de venta y/o el proveedor no se encuentran en la base de datos');
      await prisma.punto_De_Venta.update({
        where: {
          id: puntoId,
        },
        data: {
          provedores: {
            connect: { id: provId },
          },
        },
      });
      return {
        message: 'Proveedor añadido al punto de venta exitosamente',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = PuntoDeVentaHandlers;
