import { createSlice } from '@reduxjs/toolkit';
import { FaRegSmileBeam, FaShoppingCart, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';

export const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'FaRegSmileBeam':
      return FaRegSmileBeam;
    case 'FaShoppingCart':
      return FaShoppingCart;
    case 'FaInfoCircle':
      return FaInfoCircle;
    case 'FaQuestionCircle':
      return FaQuestionCircle;
    default:
      return null;
  }
};

const initialState = {
  faqs: [
    {
      id: 1,
      pregunta: '¿Cómo funciona la góndola del Mercadillo Cívico?',
      respuesta:
        'La góndola del Mercadillo Cívico es una versión moderna de las vending machines. Se instala en empresas y ofrece productos alimenticios ideales para consumir durante jornadas laborales y en casa.',
      likes: 15,
      dislikes: 3,
      categoriaId: 2, // Aca va la categoría a la cual pertenece esta faq y esta relacionada.
      comentariosId: [1, 2], // Array de Ids de comentarios relacionados a esta faq
    },
    {
      id: 2,
      pregunta: '¿Qué tipo de productos ofrece el Mercadillo Cívico?',
      respuesta:
        'El Mercadillo Cívico ofrece productos alimenticios para consumir durante jornadas laborales, seleccionados para ser consumidos en casa. La variedad incluye opciones saludables y de conveniencia.',
      likes: 10,
      dislikes: 2,
      categoriaId: 2,
      comentariosId: [3],
    },
    {
      id: 3,
      pregunta: '¿Cómo se realiza la compra en el Mercadillo Cívico?',
      respuesta:
        'El usuario se acerca a la góndola, selecciona los productos que desea y escanea el código QR visible en la góndola. Luego, es redirigido al ecommerce para finalizar la compra, donde puede definir cantidades y proceder al pago.',
      likes: 12,
      dislikes: 1,
      categoriaId: 2,
      comentariosId: [4, 5],
    },
    {
      id: 4,
      pregunta: '¿Hay algún beneficio al comprar en el Mercadillo Cívico?',
      respuesta:
        'Sí, el Mercadillo Cívico promueve precios bajos al no tener costos administrativos de personal. Además, proporciona una experiencia de compra diferente, fomenta el civismo y la cultura ciudadana.',
      likes: 8,
      dislikes: 0,
      categoriaId: 2,
      comentariosId: [6],
    },
    {
      id: 5,
      pregunta: '¿Es necesario registrarse para comprar en el Mercadillo Cívico?',
      respuesta:
        'No, los usuarios pueden comprar sin registrarse. Sin embargo, el registro ofrece la opción de recibir información educativa sobre nutrición, recetas, etc.',
      likes: 6,
      dislikes: 2,
      categoriaId: 2,
      comentariosId: [7],
    },
    {
      id: 6,
      pregunta: '¿Cómo se promueven productos saludables en el Mercadillo Cívico?',
      respuesta:
        'El Mercadillo Cívico promueve productos saludables al ofrecer una cuidadosa selección de alimentos y compartir información educativa sobre nutrición a través de su plataforma.',
      likes: 9,
      dislikes: 1,
      categoriaId: 2,
      comentariosId: [8],
    },
    {
      id: 7,
      pregunta:
        '¿Cuáles son las funcionalidades principales de la página web del Mercadillo Cívico?',
      respuesta:
        'La página web incluye una interfaz para mobile y desktop, cuentas de usuario y administrador, motor de búsqueda, reseñas, y funcionalidades MVP como la creación de usuarios, búsqueda de productos, etc.',
      likes: 12,
      dislikes: 1,
      categoriaId: 3,
      comentariosId: [9],
    },
    {
      id: 8,
      pregunta: '¿Cómo se realiza la creación de usuarios en la página web?',
      respuesta:
        'Los usuarios pueden crear cuentas utilizando su correo electrónico o cuenta de Google. En el caso del correo electrónico, se verifica con un correo enviado a su casilla.',
      likes: 8,
      dislikes: 0,
      categoriaId: 3,
      comentariosId: [10],
    },
    {
      id: 9,
      pregunta: '¿Qué funcionalidades tiene la cuenta de usuario en el Mercadillo Cívico?',
      respuesta:
        'La cuenta de usuario permite buscar productos, visualizar información sobre productos, realizar reseñas, editar y eliminar reseñas, y poseer un panel de actualización de datos y perfil personal.',
      likes: 10,
      dislikes: 2,
      categoriaId: 3,
      comentariosId: [11],
    },
    {
      id: 10,
      pregunta: '¿Qué funcionalidades tiene la cuenta de administrador?',
      respuesta:
        'La cuenta de administrador permite bloquear y desbloquear usuarios y proveedores/marcas, visualizar, añadir, eliminar y editar categorías y productos, y acceder a la base de datos con información detallada de usuarios, productos, compras y reseñas.',
      likes: 7,
      dislikes: 1,
      categoriaId: 3,
      comentariosId: [12],
    },
    {
      id: 11,
      pregunta: '¿Cómo funciona el motor de búsqueda en el Mercadillo Cívico?',
      respuesta:
        'El motor de búsqueda permite buscar productos por nombre, aplicar filtros opcionales como categoría, precio y rating, y visualizar resultados ordenados por relevancia, rating o precios.',
      likes: 9,
      dislikes: 0,
      categoriaId: 3,
      comentariosId: [13],
    },
    {
      id: 12,
      pregunta: '¿Cuáles son las funcionalidades de las reseñas en el Mercadillo Cívico?',
      respuesta:
        'Los usuarios pueden realizar reseñas sobre los productos, visualizar reseñas de otros usuarios y editar y eliminar sus propias reseñas.',
      likes: 8,
      dislikes: 1,
      categoriaId: 3,
      comentariosId: [14],
    },
    {
      id: 13,
      pregunta: '¿Cuáles son las secciones principales en la página web del Mercadillo Cívico?',
      respuesta:
        'Las secciones principales incluyen Home, Categorías, Blog, About (Concepto), Contacto y Carrito de compra (Check out).',
      likes: 10,
      dislikes: 2,
      categoriaId: 4,
      comentariosId: [15],
    },
    {
      id: 14,
      pregunta: '¿Qué tipo de información se comparte en la sección de Blog?',
      respuesta:
        'En la sección de Blog se comparten blogs sobre los beneficios nutricionales de los productos que se venden y recetas para preparar en casa.',
      likes: 7,
      dislikes: 1,
      categoriaId: 4,
      comentariosId: [],
    },
    {
      id: 15,
      pregunta: '¿Cómo se promueve la cultura ciudadana en el Mercadillo Cívico?',
      respuesta:
        'El Mercadillo Cívico promueve la cultura ciudadana al ofrecer una experiencia de compra diferente, fomentar el civismo y la promoción de productos saludables.',
      likes: 8,
      dislikes: 1,
      categoriaId: 4,
      comentariosId: [],
    },
    {
      id: 16,
      pregunta: '¿Cuáles son las funcionalidades del Carrito de Compra en el Mercadillo Cívico?',
      respuesta:
        'El Carrito de Compra permite visualizar y gestionar los productos seleccionados, realizar el check-out y proceder al pago de los productos.',
      likes: 9,
      dislikes: 0,
      categoriaId: 4,
      comentariosId: [],
    },
    {
      id: 17,
      pregunta: '¿Qué información está disponible en la sección About (Concepto)?',
      respuesta:
        'La sección About (Concepto) contiene información sobre el concepto del modelo del Mercadillo Cívico y sus objetivos.',
      likes: 6,
      dislikes: 1,
      categoriaId: 4,
      comentariosId: [],
    },
    {
      id: 18,
      pregunta: '¿Cómo se contacta el usuario con el Mercadillo Cívico?',
      respuesta:
        'Los usuarios pueden ponerse en contacto a través de la sección de Contacto en la página web del Mercadillo Cívico.',
      likes: 5,
      dislikes: 0,
      categoriaId: 4,
      comentariosId: [],
    },
  ],
  categorias: [
    {
      id: 1,
      categoria: 'FAQs sin asignar',
      icon: 'FaQuestionCircle',
      faqsId: [],
    },
    {
      id: 2,
      categoria: 'Experiencia de Usuario',
      icon: 'FaRegSmileBeam',
      faqsId: [1, 2, 3, 4, 5, 6],
    },
    {
      id: 3,
      categoria: 'Funcionalidades del Ecommerce',
      icon: 'FaShoppingCart',
      faqsId: [7, 8, 9, 10, 11, 12],
    },
    {
      id: 4,
      categoria: 'Detalles y Funcionalidades Adicionales',
      icon: 'FaInfoCircle',
      faqsId: [13, 14, 15, 16, 17, 18],
    },
  ],
  comentarios: [
    {
      id: 1,
      correo_electronico: 'groovyG0nd0l4@gmail.com',
      comentario:
        'La góndola del Mercadillo Cívico parece útil, pero sería genial si también ofreciera productos frescos.',
      faqId: 1,
      fecha_creacion: '2024-03-12',
    },
    {
      id: 2,
      correo_electronico: 'innovativeUser42@hotmail.com',
      comentario:
        '¿No deberían considerar agregar productos orgánicos a la góndola del Mercadillo Cívico?',
      faqId: 1,
      fecha_creacion: '2024-03-10',
    },
    {
      id: 3,
      correo_electronico: 'varietylover777@yahoo.com',
      comentario: 'Sería genial ver una mayor diversidad de productos en el Mercadillo Cívico.',
      faqId: 2,
      fecha_creacion: '2024-03-09',
    },
    {
      id: 4,
      correo_electronico: 'neverseenbefore123@outlook.com',
      comentario:
        'La forma de compra en el Mercadillo Cívico parece complicada, ¿hay alguna manera de simplificarla?',
      faqId: 3,
      fecha_creacion: '2024-03-11',
    },
    {
      id: 5,
      correo_electronico: 'morepaymentoptions555@gmail.com',
      comentario:
        'El Mercadillo Cívico debería considerar aceptar más formas de pago para mayor comodidad de los usuarios.',
      faqId: 3,
      fecha_creacion: '2024-03-08',
    },
    {
      id: 6,
      correo_electronico: 'pricehunter99@hotmail.com',
      comentario:
        'Sería genial si el Mercadillo Cívico ofreciera descuentos o promociones para sus clientes.',
      faqId: 4,
      fecha_creacion: '2024-03-10',
    },
    {
      id: 7,
      correo_electronico: 'informationjunkie2024@yahoo.com',
      comentario:
        '¿La información que se recibe al registrarse en el Mercadillo Cívico es realmente útil?',
      faqId: 5,
      fecha_creacion: '2024-03-13',
    },
    {
      id: 8,
      correo_electronico: 'ingredientinspector88@gmail.com',
      comentario:
        'El Mercadillo Cívico debería brindar más detalles sobre los ingredientes de sus productos.',
      faqId: 6,
      fecha_creacion: '2024-03-09',
    },
    {
      id: 9,
      correo_electronico: 'intuitiveuser101@outlook.com',
      comentario:
        'Aunque la interfaz es intuitiva, ¿hay alguna forma de mejorar la experiencia del usuario?',
      faqId: 7,
      fecha_creacion: '2024-03-12',
    },
    {
      id: 10,
      correo_electronico: 'deliverychangequery@gmail.com',
      comentario:
        '¿Por qué el proceso de cambio de dirección de entrega en el Mercadillo Cívico es tan complicado?',
      faqId: 8,
      fecha_creacion: '2024-03-11',
    },
    {
      id: 11,
      correo_electronico: 'gratefulshopper11@yahoo.com',
      comentario:
        'Aprecio las recomendaciones, pero a veces parecen no estar personalizadas. ¿Se pueden mejorar?',
      faqId: 9,
      fecha_creacion: '2024-03-13',
    },
    {
      id: 12,
      correo_electronico: 'deliverytimequestioner12@hotmail.com',
      comentario:
        'El tiempo estimado de entrega del Mercadillo Cívico no siempre es preciso. ¿Hay algún plan para mejorarlo?',
      faqId: 10,
      fecha_creacion: '2024-03-08',
    },
    {
      id: 13,
      correo_electronico: 'filterfanatic13@gmail.com',
      comentario:
        'Aunque la función de filtrado es útil, ¿sería posible agregar más opciones para refinar la búsqueda?',
      faqId: 11,
      fecha_creacion: '2024-03-09',
    },
    {
      id: 14,
      correo_electronico: 'filteroptionsplease14@yahoo.com',
      comentario:
        'La búsqueda sería más efectiva si se pudieran aplicar más filtros. ¿Es eso posible?',
      faqId: 12,
      fecha_creacion: '2024-03-10',
    },
    {
      id: 15,
      correo_electronico: 'attractiveDesign15@hotmail.com',
      comentario:
        'Aunque el diseño es atractivo, a veces la navegación puede ser confusa. ¿Hay planes para mejorar la usabilidad?',
      faqId: 13,
      fecha_creacion: '2024-03-11',
    },
  ],
  faq: {},
  categoria: {},
};

const faqsSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {
    // Acciones para el CRUD de faqs:
    getFaqs: (state) => state.faqs,
    getFaqById: (state, action) => {
      state.faq = state.faqs.find((faq) => faq.id === action.payload);
    },
    createFaq: (state, action) => {
      state.faqs.push(action.payload);
    },
    updateFaq: (state, action) => {
      const { id, pregunta, respuesta, categoriaId } = action.payload;
      const index = state.faqs.findIndex((faq) => faq.id === id);
      if (index !== -1) {
        state.faqs[index] = { ...state.faqs[index], pregunta, respuesta, categoriaId };
      }
    },
    deleteFaq: (state, action) => {
      const id = action.payload;
      state.faqs = state.faqs.filter((faq) => faq.id !== id);
    },

    // Acciones para el CRUD de categorias:
    getCategorys: (state) => state.categorias,
    getCategoryById: (state, action) => {
      state.categoria = state.categorias.find((categoria) => categoria.id === action.payload);
    },
    createCategory: (state, action) => {
      state.categorias.push(action.payload);
    },
    updateCategory: (state, action) => {
      const { id, categoria, icon } = action.payload;
      const index = state.categorias.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        state.categorias[index] = { ...state.categorias[index], categoria, icon };
      }
    },
    deleteCategory: (state, action) => {
      const id = action.payload;
      state.categorias = state.categorias.filter((categoria) => categoria.id !== id);
      state.faqs = state.faqs.map((faq) =>
        faq.categoriaId === id ? { ...faq, categoriaId: null } : faq
      );
    },

    // Acciones para el CRUD de comentarios:
    createComment: (state, action) => {
      const { correo_electronico, comentario, faqId } = action.payload;
      const newComment = {
        id: state.comentarios.length + 1,
        correo_electronico,
        comentario,
        faqId,
        fecha_creacion: new Date(),
      };
      state.comentarios.push(newComment);

      const faqIndex = state.faqs.findIndex((faq) => faq.id === faqId);
      if (faqIndex !== -1) {
        state.faqs[faqIndex].comentariosId.push(newComment.id);
      }
    },
    deleteComment: (state, action) => {
      const commentId = action.payload;

      state.comentarios = state.comentarios.filter((comment) => comment.id !== commentId);

      state.faqs.forEach((faq) => {
        faq.comentariosId = faq.comentariosId.filter((id) => id !== commentId);
      });
    },
  },
});

export const {
  getFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
  getCategorys,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = faqsSlice.actions;

export default faqsSlice.reducer;
