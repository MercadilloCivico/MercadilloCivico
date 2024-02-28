import { FaRegSmileBeam, FaShoppingCart, FaInfoCircle } from 'react-icons/fa';

const faqs = [
  {
    id: 1,
    categoria: 'Experiencia de Usuario',
    icon: FaRegSmileBeam,
    faqs: [
      {
        id: 1,
        pregunta: '¿Cómo funciona la góndola del Mercadillo Cívico?',
        respuesta:
          'La góndola del Mercadillo Cívico es una versión moderna de las vending machines. Se instala en empresas y ofrece productos alimenticios ideales para consumir durante jornadas laborales y en casa.',
      },
      {
        id: 2,
        pregunta: '¿Qué tipo de productos ofrece el Mercadillo Cívico?',
        respuesta:
          'El Mercadillo Cívico ofrece productos alimenticios para consumir durante jornadas laborales, seleccionados para ser consumidos en casa. La variedad incluye opciones saludables y de conveniencia.',
      },
      {
        id: 3,
        pregunta: '¿Cómo se realiza la compra en el Mercadillo Cívico?',
        respuesta:
          'El usuario se acerca a la góndola, selecciona los productos que desea y escanea el código QR visible en la góndola. Luego, es redirigido al ecommerce para finalizar la compra, donde puede definir cantidades y proceder al pago.',
      },
      {
        id: 4,
        pregunta: '¿Hay algún beneficio al comprar en el Mercadillo Cívico?',
        respuesta:
          'Sí, el Mercadillo Cívico promueve precios bajos al no tener costos administrativos de personal. Además, proporciona una experiencia de compra diferente, fomenta el civismo y la cultura ciudadana.',
      },
      {
        id: 5,
        pregunta: '¿Es necesario registrarse para comprar en el Mercadillo Cívico?',
        respuesta:
          'No, los usuarios pueden comprar sin registrarse. Sin embargo, el registro ofrece la opción de recibir información educativa sobre nutrición, recetas, etc.',
      },
      {
        id: 6,
        pregunta: '¿Cómo se promueven productos saludables en el Mercadillo Cívico?',
        respuesta:
          'El Mercadillo Cívico promueve productos saludables al ofrecer una cuidadosa selección de alimentos y compartir información educativa sobre nutrición a través de su plataforma.',
      },
    ],
  },
  {
    id: 2,
    categoria: 'Funcionalidades del Ecommerce',
    icon: FaShoppingCart,
    faqs: [
      {
        id: 7,
        pregunta:
          '¿Cuáles son las funcionalidades principales de la página web del Mercadillo Cívico?',
        respuesta:
          'La página web incluye una interfaz para mobile y desktop, cuentas de usuario y administrador, motor de búsqueda, reseñas, y funcionalidades MVP como la creación de usuarios, búsqueda de productos, etc.',
      },
      {
        id: 8,
        pregunta: '¿Cómo se realiza la creación de usuarios en la página web?',
        respuesta:
          'Los usuarios pueden crear cuentas utilizando su correo electrónico o cuenta de Google. En el caso del correo electrónico, se verifica con un correo enviado a su casilla.',
      },
      {
        id: 9,
        pregunta: '¿Qué funcionalidades tiene la cuenta de usuario en el Mercadillo Cívico?',
        respuesta:
          'La cuenta de usuario permite buscar productos, visualizar información sobre productos, realizar reseñas, editar y eliminar reseñas, y poseer un panel de actualización de datos y perfil personal.',
      },
      {
        id: 10,
        pregunta: '¿Qué funcionalidades tiene la cuenta de administrador?',
        respuesta:
          'La cuenta de administrador permite bloquear y desbloquear usuarios y proveedores/marcas, visualizar, añadir, eliminar y editar categorías y productos, y acceder a la base de datos con información detallada de usuarios, productos, compras y reseñas.',
      },
      {
        id: 11,
        pregunta: '¿Cómo funciona el motor de búsqueda en el Mercadillo Cívico?',
        respuesta:
          'El motor de búsqueda permite buscar productos por nombre, aplicar filtros opcionales como categoría, precio y rating, y visualizar resultados ordenados por relevancia, rating o precios.',
      },
      {
        id: 12,
        pregunta: '¿Cuáles son las funcionalidades de las reseñas en el Mercadillo Cívico?',
        respuesta:
          'Los usuarios pueden realizar reseñas sobre los productos, visualizar reseñas de otros usuarios y editar y eliminar sus propias reseñas.',
      },
    ],
  },
  {
    id: 3,
    categoria: 'Detalles y Funcionalidades Adicionales',
    icon: FaInfoCircle,
    faqs: [
      {
        id: 13,
        pregunta: '¿Cuáles son las secciones principales en la página web del Mercadillo Cívico?',
        respuesta:
          'Las secciones principales incluyen Home, Categorías, Blog, About (Concepto), Contacto y Carrito de compra (Check out).',
      },
      {
        id: 14,
        pregunta: '¿Qué tipo de información se comparte en la sección de Blog?',
        respuesta:
          'En la sección de Blog se comparten blogs sobre los beneficios nutricionales de los productos que se venden y recetas para preparar en casa.',
      },
      {
        id: 15,
        pregunta: '¿Cómo se promueve la cultura ciudadana en el Mercadillo Cívico?',
        respuesta:
          'El Mercadillo Cívico promueve la cultura ciudadana al ofrecer una experiencia de compra diferente, fomentar el civismo y la promoción de productos saludables.',
      },
      {
        id: 16,
        pregunta: '¿Cuáles son las funcionalidades del Carrito de Compra en el Mercadillo Cívico?',
        respuesta:
          'El Carrito de Compra permite visualizar y gestionar los productos seleccionados, realizar el check-out y proceder al pago de los productos.',
      },
      {
        id: 17,
        pregunta: '¿Qué información está disponible en la sección About (Concepto)?',
        respuesta:
          'La sección About (Concepto) contiene información sobre el concepto del modelo del Mercadillo Cívico y sus objetivos.',
      },
      {
        id: 18,
        pregunta: '¿Cómo se contacta el usuario con el Mercadillo Cívico?',
        respuesta:
          'Los usuarios pueden ponerse en contacto a través de la sección de Contacto en la página web del Mercadillo Cívico.',
      },
    ],
  },
];

export default faqs;
