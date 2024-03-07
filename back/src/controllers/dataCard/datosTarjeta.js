/* eslint-disable camelcase */
/* eslint-disable no-console */
const axios = require('axios');
const { MERCHANT_ID } = require('../../../config/env.config');
const encrypt = require('../../handlers/dataCard/encrypt');

class datosTarjeta {
  static async data(req, res) {
    try {
      const { tarjeta, datosCompra, payment_method_id } = req.body;
      const dataTarjeta = await encrypt(tarjeta);
      datosCompra.merchant_id = MERCHANT_ID;

      // const idPagoSesion = await axios.post('https://dev.sendfy.es/checkout-sessions', datosCompra);
      const idPagoSesion = await axios.post(
        'https://backend-ry4n2dvhsq-lz.a.run.app/checkout-sessions',
        datosCompra
      );

      const jsonString = JSON.stringify(dataTarjeta);
      const base64String = btoa(encodeURIComponent(jsonString));
      // const solicitudPago = await axios.post('https://dev.sendfy.es/token', base64String);

      const paymentInfo = {
        payment_method_id,
        payment_method_data: base64String,
      };

      const solicitudPago = await axios.post(
        `https://backend-ry4n2dvhsq-lz.a.run.app/pay/${idPagoSesion}`,
        paymentInfo
      );
      return res.status(200).json({ solicitudPago });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = datosTarjeta;
