const prisma = require('../../../db_connection');
const validationPdf = require('../../utils/validations/validationPdf');
const uploadToFile = require('../uploadToFiles');
const deleteFile = require('../deleteToFiles');

class proveedorHandlers {
  static async getAll() {
    try {
      const proveedor = await prisma.proveedor.findMany();
      return proveedor;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getById(id) {
    try {
      const proveedor = await prisma.proveedor.findFirst({
        where: {
          id: parseInt(id, 10),
        },
      });
      return proveedor;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getNameById(name) {
    try {
      const proveedores = await prisma.proveedor.findMany({
        where: {
          name_prov: {
            contains: name,
          },
        },
      });
      return proveedores;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async post(nameProv, ubicacion, tel, camaraDeComercio, certificadoBancario) {
    try {
      const error1 = validationPdf(camaraDeComercio);
      const error2 = validationPdf(certificadoBancario);
      if (error1 !== undefined || error2 !== undefined) {
        throw new Error(error1 || error2);
      }

      const urlCamara = await uploadToFile(camaraDeComercio);
      const urlCertificado = await uploadToFile(certificadoBancario);
      await prisma.proveedor.create({
        data: {
          name_prov: nameProv,
          ubicacion,
          tel,
          camaraDeComercio: urlCamara.URL,
          certificadoBancario: urlCertificado.URL,
          publicIdCamara: urlCamara.public_id,
          publicIdCertificado: urlCertificado.public_id,
          user_id: '9e7c68ae-b68f-4ce3-8d0f-7b313d80f404',
          active: true,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async put(id, nameProv, ubicacion, tel, camaraDeComercio, certificadoBancario) {
    try {
      const dataUpdate = {};
      if (nameProv) dataUpdate.name_prov = nameProv;
      if (ubicacion) dataUpdate.ubicacion = ubicacion;
      if (tel) dataUpdate.tel = tel;
      const error1 = validationPdf(camaraDeComercio);
      const error2 = validationPdf(certificadoBancario);
      if (error1 !== undefined || error2 !== undefined) {
        throw new Error(error1 || error2);
      }
      if (camaraDeComercio) {
        const urlCamara = await uploadToFile(camaraDeComercio);
        dataUpdate.camaraDeComercio = urlCamara;
      }
      if (certificadoBancario) {
        const urlCertificado = await uploadToFile(certificadoBancario);
        dataUpdate.certificadoBancario = urlCertificado;
      }
      // token
      await prisma.proveedor.update({
        where: {
          id,
        },
        data: dataUpdate,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete(id) {
    try {
      const proveedor = await prisma.proveedor.findFirst({
        where: {
          id: parseInt(id, 10),
        },
      });
      if (!proveedor) {
        throw new Error('El proveedor no existe');
      }
      const { camaraDeComercio, certificadoBancario } = proveedor;
      if (camaraDeComercio) {
        deleteFile(proveedor.publicIdCamara);
      }
      if (certificadoBancario) {
        deleteFile(proveedor.publicIdCertificado);
      }
      await prisma.proveedor.delete({
        where: {
          id: parseInt(id, 10),
        },
      });
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = proveedorHandlers;
