const { FRONT_URL } = require('../../../config/env.config');
const stripe = require('../../../stripe/stripe');

class StripeController {
  static async createSession(req, res) {
    try {
      const { price } = req.query;
      const precioFinal = Number(`${price.toString()}00`);

      const session = await stripe.checkout.sessions.create({
        success_url: `${FRONT_URL}/payment_success`,
        // Esta direccion deberia redirigir a un componente donde se le indique al usuario que realizo correctamente la transaccion
        cancel_url: `${FRONT_URL}/pasarela_de_pago`,
        // Esta direccion deberia redirigir al usuario al carrito de compras
        line_items: [
          {
            price_data: {
              product_data: {
                name: 'Mercadillo Civico',
              },
              currency: 'mxn',
              unit_amount: precioFinal,
            },
            quantity: 1,
          },
        ],
        // De esta forma vamos a pasarle a Stripe solo el monto final que debe abonar el cliente(ya que contamos con un carrito de compras donde se encuentran todas las especificaciones de cada producto, me resulta innecesario pasarle otra vez esos datos a stripe asi que solo se le va a pasar el precio final que se renderiza en el front)
        mode: 'payment',
      });
      return res.status(200).json({ url: session.url });
    } catch (error) {
      // return res
      //   .status(500)
      //   .json({ message: 'Error al crear la sesión de pago en Stripe.', error: error.message });
      return res.redirect(`${FRONT_URL}/payment_error`);
    }
  }
}

module.exports = StripeController;
