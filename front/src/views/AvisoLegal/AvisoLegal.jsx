import Footer from '../../components/Footer/Footer';

export default function AvisoLegal() {
  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='text-pearl-bush-950'>Aviso Legal</h1>
      <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
        Este sitio web es propiedad de Mercadillo Cívico, dedicado a ofrecer una versión moderna de
        vending machines para empresas en Colombia.
      </p>
      <h2 className='text-pearl-bush-950'>Identificación:</h2>
      <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
        Nombre del Titular: Mercadillo Cívico <br />
        Domicilio: Bogotá, Colombia <br />
        Correo Electrónico: info@mercadillocivico.com <br />
        Actividad: Comercialización y operación de soluciones de vending para empresas. <br />
      </p>
      <h2 className='text-pearl-bush-950'>Condiciones Generales de Uso:</h2>
      <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
        El acceso y uso de este sitio web están sujetos a las presentes condiciones generales, así
        como a la legislación vigente en Colombia. Al utilizar este sitio web, se entiende que el
        usuario acepta las condiciones generales y cualquier modificación de las mismas.
      </p>
      <h2 className='text-pearl-bush-950'>Propiedad Intelectual:</h2>
      <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
        Todos los contenidos de este sitio web, incluyendo textos, gráficos, logos, y el diseño del
        sitio, son propiedad de Mercadillo Cívico y están protegidos por las leyes de propiedad
        intelectual.
      </p>
      <h2 className='text-pearl-bush-950'>Responsabilidad:</h2>
      <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
        Mercadillo Cívico no se hace responsable por daños derivados del uso incorrecto del sitio
        web. Se compromete a realizar esfuerzos para mantener la información actualizada y precisa.
      </p>
      <h2 className='text-pearl-bush-950'>Legislación Aplicable:</h2>
      <p className='text-pearl-bush-950 text-center m-[20px] max-w-[600px] p-1'>
        Este Aviso Legal se rige por la legislación colombiana. Cualquier disputa será resuelta en
        los tribunales competentes de Bogotá, Colombia.
      </p>
      <Footer />
    </div>
  );
}
