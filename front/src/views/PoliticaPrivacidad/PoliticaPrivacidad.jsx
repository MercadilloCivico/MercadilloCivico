import Footer from '../../components/Footer/Footer';

export default function PoliticaPrivacidad() {
  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='text-pearl-bush-950'>Política de Privacidad</h1>
      <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
        Mercadillo Cívico, con domicilio en Bogotá, Colombia, es el responsable del tratamiento de
        los datos personales que se recaban en este sitio web. Nos comprometemos a proteger la
        privacidad de nuestros usuarios y clientes.
      </p>
      <h2 className='text-pearl-bush-950'>Recogida, Finalidad y Tratamientos de Datos:</h2>
      <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
        Los datos personales recabados serán procesados con la finalidad de gestionar la relación
        con los usuarios, así como ofrecer servicios o información solicitada. Todos los
        tratamientos de datos se realizan con base en el consentimiento del usuario o en el marco de
        una relación contractual.
      </p>
      <h2 className='text-pearl-bush-950'>Derechos de los Usuarios:</h2>
      <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
        Los usuarios pueden ejercer sus derechos de acceso, rectificación, cancelación y oposición
        enviando una solicitud a nuestro correo electrónico.
      </p>
      <h2 className='text-pearl-bush-950'>Seguridad de los Datos:</h2>
      <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
        Hemos adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad
        y confidencialidad de los datos personales.
      </p>
      <h2 className='text-pearl-bush-950'>Modificación de la Política de Privacidad:</h2>
      <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
        Mercadillo Cívico se reserva el derecho a modificar su Política de Privacidad, según lo
        requiera la legislación aplicable o debido a cambios en sus servicios.
      </p>
      <h2 className='text-pearl-bush-950'>Contacto:</h2>
      <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
        Para cualquier consulta sobre estas políticas, pueden contactarnos a través de
        info@mercadillocivico.com.
      </p>
      <Footer />
    </div>
  );
}
