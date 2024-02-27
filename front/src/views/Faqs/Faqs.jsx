import CustomBreadcrumbs from '../../components/CustomBreadcrumbs/CustomBreadcrumbs';
import FaqBar from '../../components/FaqBar/FaqBar';
import SearchBarFaq from '../../components/SearchBarFaq/SearchBarFaq';
import TopFaqs from '../../components/TopFaqs/TopFaqs';

const Faqs = () => {
  const faqs = [
    {
      pregunta: '¿Cómo funciona el proceso de compra en las góndolas?',
      respuesta:
        'El proceso es muy sencillo. Solo escanea el código QR en la góndola con tu dispositivo móvil. Esto te llevará a nuestra plataforma en línea, donde podrás agregar los productos que deseas a tu carrito y proceder al pago. Una vez completado el pago, recibirás una confirmación y podrás recoger los productos en la góndola.',
    },
    {
      pregunta: '¿Es necesario registrarse para comprar en línea?',
      respuesta:
        'No es necesario registrarse para realizar compras en línea. Puedes escanear el código QR, seleccionar los productos, pagar y recogerlos sin necesidad de crear una cuenta. Sin embargo, si decides registrarte, podrás acceder a beneficios adicionales, como la suscripción a nuestra newsletter de hábitos saludables.',
    },
    {
      pregunta: '¿Cuáles son los métodos de pago disponibles?',
      respuesta:
        'Aceptamos diversos métodos de pago en nuestra plataforma, como tarjetas de débito y crédito. Puedes elegir el método de pago que prefieras durante el proceso de compra en línea. Nos esforzamos por ofrecer opciones seguras y convenientes para nuestros clientes.',
    },
    {
      pregunta: '¿Qué beneficios obtengo al suscribirme a la newsletter?',
      respuesta:
        'Al suscribirte a nuestra newsletter, recibirás información sobre hábitos alimenticios saludables, consejos nutricionales y promociones exclusivas. Nos preocupamos por la salud y el bienestar de nuestros clientes, y la newsletter es una forma de brindar contenido valioso y ofertas especiales.',
    },
    {
      pregunta: '¿Puedo realizar cambios o devoluciones después de pagar en línea?',
      respuesta:
        'Lamentablemente, debido a la naturaleza de nuestro servicio y la falta de personal en las góndolas, no podemos procesar cambios o devoluciones después de completar el pago en línea. Te recomendamos revisar cuidadosamente tu pedido antes de finalizar la transacción.',
    },
    {
      pregunta: '¿Cómo puedo obtener más información sobre hábitos alimenticios saludables?',
      respuesta:
        'Si te interesa aprender más sobre hábitos alimenticios saludables, te recomendamos suscribirte a nuestra newsletter. Además, estamos trabajando en la creación de contenido educativo en nuestra plataforma en línea para proporcionar información valiosa sobre una alimentación equilibrada y saludable.',
    },
  ];

  return (
    <div>
      <div>
        <span className='text-tuscany-950 font-semibold text-[1.5em]'>Buscar</span>
        <SearchBarFaq />
      </div>
      <div className='mb-4 mx-4 custom-border-b'>
        <CustomBreadcrumbs />
      </div>
      <div className='m-2'>
        <FaqBar faqs={faqs} />
      </div>
      <div>
        <TopFaqs faqs={faqs} />
      </div>
    </div>
  );
};

export default Faqs;
