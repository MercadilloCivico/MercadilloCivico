import Footer from '../../components/Footer/Footer';

export default function PoliticaCookies() {
  return (
    <div className='flex flex-col min-h-[calc(100vh-55px)] justify-between'>
      <main className='flex flex-col items-center w-full flex-1 px-4 text-center py-10'>
        <h1 className='text-pearl-bush-950'>Política de Cookies</h1>
        <p className='text-pearl-bush-950 text-center my-5 max-w-[600px]'>
          Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de
          usuario y ofrecer contenidos adaptados a sus intereses. Al navegar por este sitio, el
          usuario acepta el uso de cookies según esta política.
        </p>
        <section>
          <h2 className='text-pearl-bush-950'>Tipos de Cookies Usadas:</h2>
          <p className='text-pearl-bush-950 text-center my-5 max-w-[600px]'>
            Cookies técnicas: Permiten al usuario la navegación y la utilización de las diferentes
            opciones o servicios. <br />
            Cookies de análisis: Permiten el seguimiento y análisis del comportamiento de los
            usuarios en el sitio web.
          </p>
        </section>
        <section>
          <h2 className='text-pearl-bush-950'>Gestión de Cookies:</h2>
          <p className='text-pearl-bush-950 text-center my-5 max-w-[600px]'>
            El usuario puede configurar su navegador para aceptar o rechazar todas las cookies o
            para recibir una notificación de la recepción de cada cookie y decidir en ese momento su
            implantación o no en su dispositivo.
          </p>
        </section>
        <section>
          <h2 className='text-pearl-bush-950'>Terceros:</h2>
          <p className='text-pearl-bush-950 text-center my-5 max-w-[600px]'>
            Este sitio web puede utilizar servicios de terceros que, por cuenta de Mercadillo
            Cívico, recopilarán información con fines estadísticos.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
