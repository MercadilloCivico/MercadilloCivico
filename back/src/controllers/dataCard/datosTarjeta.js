const { MERCHANT_ID } = require('../../../config/env.config');
const encrypt = require('../../handlers/dataCard/encrypt');
// const axios = require('axios');

class datosTarjeta {
  static async data(req, res) {
    try {
      const { tarjeta, datosCompra } = req.body;
      console.log('BODY', tarjeta, datosCompra);
      const decoded = await encrypt(tarjeta);
      console.log('decoded', decoded);
      const jsonString = JSON.stringify(decoded);
      const base64String = btoa(encodeURIComponent(jsonString));
      // const token = await axios.post('https://dev.sendfy.es/token', base64String);
      console.log(base64String);
      datosCompra.method_data = 'token';
      datosCompra.merchant_id = MERCHANT_ID;
      // const envioSolicitudPago = await axios.post('https://dev.sendfy.es/checkout-sessions', datosCompra);
      return res.status(200).json({ datosCompra });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = datosTarjeta;
