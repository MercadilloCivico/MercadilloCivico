const prisma = require('../../../db_connection');
const validationPdf = require('../../utils/validations/validationPdf');
const uploadToFile = require('../uploadToFiles');
const deleteFile = require('../deleteToFiles');

class proveedorHandlers {
  static async getAll() {
    try {
      const proveedor = await prisma.proveedor.findMany({
        include: {
          productos: true,
        },
      });
      return proveedor;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async userProfile(id) {
    try {
      const proveedor = await prisma.proveedor.findFirst({
        where: {
          user_id: id,
        },
        include: {
          productos: true,
          puntos_de_venta: true,
          pedidos: true,
        },
      });
      return proveedor;
    } catch (error) {
      throw new Error(error.message);
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

  static async post(nameProv, ubicacion, tel, camaraDeComercio, certificadoBancario, userid) {
    try {
      const error1 = validationPdf(camaraDeComercio);
      const error2 = validationPdf(certificadoBancario);
      if (error1 !== undefined || error2 !== undefined) {
        throw new Error(error1 || error2);
      }
      const existingProveedor = await prisma.proveedor.findUnique({
        where: {
          user_id: userid,
        },
      });

      if (existingProveedor) {
        throw new Error('El usuario ya es un proveedor.');
      }
      const urlCamara = await uploadToFile(camaraDeComercio);
      const urlCertificado = await uploadToFile(certificadoBancario);
      const proveedor = await prisma.proveedor.create({
        data: {
          name_prov: nameProv,
          ubicacion,
          tel,
          camaraDeComercio: urlCamara.URL,
          certificadoBancario: urlCertificado.URL,
          publicIdCamara: urlCamara.public_id,
          publicIdCertificado: urlCertificado.public_id,
          user_id: userid,
          active: true,
        },
      });
      console.log(proveedor);
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
      if (camaraDeComercio) {
        const error1 = validationPdf(camaraDeComercio);
        if (error1 !== undefined) {
          throw new Error(error1);
        }
        const { publicIdCamara } = await prisma.proveedor.findFirst({
          where: {
            user_id: id,
          },
        });
        await deleteFile(publicIdCamara);
        const urlCamara = await uploadToFile(camaraDeComercio);
        dataUpdate.camaraDeComercio = urlCamara.URL;
        dataUpdate.publicIdCamara = urlCamara.public_id;
      }

      if (certificadoBancario) {
        const error2 = validationPdf(certificadoBancario);
        if (error2 !== undefined) {
          throw new Error(error2);
        }
        const { publicIdCertificado } = await prisma.proveedor.findFirst({
          where: {
            user_id: id,
          },
        });
        await deleteFile(publicIdCertificado);
        const urlCertificado = await uploadToFile(certificadoBancario);
        dataUpdate.certificadoBancario = urlCertificado.URL;
        dataUpdate.publicIdCertificado = urlCertificado.public_id;
      }
      // token
      await prisma.proveedor.update({
        where: {
          user_id: id,
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
        await deleteFile(proveedor.publicIdCamara);
      }
      if (certificadoBancario) {
        await deleteFile(proveedor.publicIdCertificado);
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
