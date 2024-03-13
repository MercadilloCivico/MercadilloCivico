import { createSlice } from '@reduxjs/toolkit';
import { FaRegSmileBeam, FaRegSadTear, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';

const initialState = {
  faqs: [
    {
      id: 1,
      pregunta: '¿Cómo funciona la góndola del Mercadillo Cívico?',
      respuesta:
        'La góndola del Mercadillo Cívico es una versión moderna de las vending machines. Se instala en empresas y ofrece productos alimenticios ideales para consumir durante jornadas laborales y en casa.',
      likes: 15,
      dislikes: 3,
      categoriaId: 1, // Aca va la categoría a la cual pertenece esta faq y esta relacionada.
      comentariosId: [1], // Array de Ids de comentarios relacionados a esta faq
    },
    {
      id: 2,
      pregunta: '¿Qué tipo de productos ofrece el Mercadillo Cívico?',
      respuesta:
        'El Mercadillo Cívico ofrece productos alimenticios para consumir durante jornadas laborales, seleccionados para ser consumidos en casa. La variedad incluye opciones saludables y de conveniencia.',
      likes: 10,
      dislikes: 2,
      categoriaId: 1,
      comentariosId: [],
    },
    {
      id: 3,
      pregunta: '¿Cómo se realiza la compra en el Mercadillo Cívico?',
      respuesta:
        'El usuario se acerca a la góndola, selecciona los productos que desea y escanea el código QR visible en la góndola. Luego, es redirigido al ecommerce para finalizar la compra, donde puede definir cantidades y proceder al pago.',
      likes: 12,
      dislikes: 1,
      categoriaId: 1,
      comentariosId: [],
    },
    {
      id: 4,
      pregunta: '¿Hay algún beneficio al comprar en el Mercadillo Cívico?',
      respuesta:
        'Sí, el Mercadillo Cívico promueve precios bajos al no tener costos administrativos de personal. Además, proporciona una experiencia de compra diferente, fomenta el civismo y la cultura ciudadana.',
      likes: 8,
      dislikes: 0,
      categoriaId: 1,
      comentariosId: [],
    },
    {
      id: 5,
      pregunta: '¿Es necesario registrarse para comprar en el Mercadillo Cívico?',
      respuesta:
        'No, los usuarios pueden comprar sin registrarse. Sin embargo, el registro ofrece la opción de recibir información educativa sobre nutrición, recetas, etc.',
      likes: 6,
      dislikes: 2,
      categoriaId: 1,
      comentariosId: [],
    },
    {
      id: 6,
      pregunta: '¿Cómo se promueven productos saludables en el Mercadillo Cívico?',
      respuesta:
        'El Mercadillo Cívico promueve productos saludables al ofrecer una cuidadosa selección de alimentos y compartir información educativa sobre nutrición a través de su plataforma.',
      likes: 9,
      dislikes: 1,
      categoriaId: 1,
      comentariosId: [],
    },
    {
      id: 7,
      pregunta:
        '¿Cuáles son las funcionalidades principales de la página web del Mercadillo Cívico?',
      respuesta:
        'La página web incluye una interfaz para mobile y desktop, cuentas de usuario y administrador, motor de búsqueda, reseñas, y funcionalidades MVP como la creación de usuarios, búsqueda de productos, etc.',
      likes: 12,
      dislikes: 1,
      categoriaId: 2,
      comentariosId: [],
    },
    {
      id: 8,
      pregunta: '¿Cómo se realiza la creación de usuarios en la página web?',
      respuesta:
        'Los usuarios pueden crear cuentas utilizando su correo electrónico o cuenta de Google. En el caso del correo electrónico, se verifica con un correo enviado a su casilla.',
      likes: 8,
      dislikes: 0,
      categoriaId: 2,
      comentariosId: [],
    },
    {
      id: 9,
      pregunta: '¿Qué funcionalidades tiene la cuenta de usuario en el Mercadillo Cívico?',
      respuesta:
        'La cuenta de usuario permite buscar productos, visualizar información sobre productos, realizar reseñas, editar y eliminar reseñas, y poseer un panel de actualización de datos y perfil personal.',
      likes: 10,
      dislikes: 2,
      categoriaId: 2,
      comentariosId: [],
    },
    {
      id: 10,
      pregunta: '¿Qué funcionalidades tiene la cuenta de administrador?',
      respuesta:
        'La cuenta de administrador permite bloquear y desbloquear usuarios y proveedores/marcas, visualizar, añadir, eliminar y editar categorías y productos, y acceder a la base de datos con información detallada de usuarios, productos, compras y reseñas.',
      likes: 7,
      dislikes: 1,
      categoriaId: 2,
      comentariosId: [],
    },
    {
      id: 11,
      pregunta: '¿Cómo funciona el motor de búsqueda en el Mercadillo Cívico?',
      respuesta:
        'El motor de búsqueda permite buscar productos por nombre, aplicar filtros opcionales como categoría, precio y rating, y visualizar resultados ordenados por relevancia, rating o precios.',
      likes: 9,
      dislikes: 0,
      categoriaId: 2,
      comentariosId: [],
    },
    {
      id: 12,
      pregunta: '¿Cuáles son las funcionalidades de las reseñas en el Mercadillo Cívico?',
      respuesta:
        'Los usuarios pueden realizar reseñas sobre los productos, visualizar reseñas de otros usuarios y editar y eliminar sus propias reseñas.',
      likes: 8,
      dislikes: 1,
      categoriaId: 2,
      comentariosId: [],
    },
    {
      id: 13,
      pregunta: '¿Cuáles son las secciones principales en la página web del Mercadillo Cívico?',
      respuesta:
        'Las secciones principales incluyen Home, Categorías, Blog, About (Concepto), Contacto y Carrito de compra (Check out).',
      likes: 10,
      dislikes: 2,
      categoriaId: 3,
      comentariosId: [],
    },
    {
      id: 14,
      pregunta: '¿Qué tipo de información se comparte en la sección de Blog?',
      respuesta:
        'En la sección de Blog se comparten blogs sobre los beneficios nutricionales de los productos que se venden y recetas para preparar en casa.',
      likes: 7,
      dislikes: 1,
      categoriaId: 3,
      comentariosId: [],
    },
    {
      id: 15,
      pregunta: '¿Cómo se promueve la cultura ciudadana en el Mercadillo Cívico?',
      respuesta:
        'El Mercadillo Cívico promueve la cultura ciudadana al ofrecer una experiencia de compra diferente, fomentar el civismo y la promoción de productos saludables.',
      likes: 8,
      dislikes: 1,
      categoriaId: 3,
      comentariosId: [],
    },
    {
      id: 16,
      pregunta: '¿Cuáles son las funcionalidades del Carrito de Compra en el Mercadillo Cívico?',
      respuesta:
        'El Carrito de Compra permite visualizar y gestionar los productos seleccionados, realizar el check-out y proceder al pago de los productos.',
      likes: 9,
      dislikes: 0,
      categoriaId: 3,
      comentariosId: [],
    },
    {
      id: 17,
      pregunta: '¿Qué información está disponible en la sección About (Concepto)?',
      respuesta:
        'La sección About (Concepto) contiene información sobre el concepto del modelo del Mercadillo Cívico y sus objetivos.',
      likes: 6,
      dislikes: 1,
      categoriaId: 3,
      comentariosId: [],
    },
    {
      id: 18,
      pregunta: '¿Cómo se contacta el usuario con el Mercadillo Cívico?',
      respuesta:
        'Los usuarios pueden ponerse en contacto a través de la sección de Contacto en la página web del Mercadillo Cívico.',
      likes: 5,
      dislikes: 0,
      categoriaId: 3,
      comentariosId: [],
    },
  ],
  categorias: [
    {
      id: 1,
      categoria: 'Experiencia de Usuario',
      icon: FaRegSmileBeam,
      faqsId: [1, 2, 3, 4, 5, 6],
    },
    {
      id: 2,
      categoria: 'Funcionalidades del Ecommerce',
      icon: FaShoppingCart,
      faqsId: [7, 8, 9, 10, 11, 12],
    },
    {
      id: 3,
      categoria: 'Detalles y Funcionalidades Adicionales',
      icon: FaInfoCircle,
      faqsId: [13, 14, 15, 16, 17, 18],
    },
  ],
  comentarios: [
    {
      id: 1,
      correo_electronico: 'prueba@gmail.com',
      comentario: 'Este es un comentario de prueba',
      faqId: 1, // ID de la FAQ a la que pertenece este comentario
      fecha_creacion: null,
    },
  ],
  faq: {},
  categoria: {},
  icons: [FaRegSmileBeam, FaRegSadTear, FaInfoCircle, FaShoppingCart],
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
