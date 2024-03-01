import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { FaImage } from 'react-icons/fa';
import validate from './validations';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import Logo from '../../assets/img/logo-simple.svg';
import Modal from '../../components/Modal/Modal';
import AdminCardPreview from '../../components/Card/AdminCardPreview';
import { Box } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import CustomSelect from '../../components/CustomBlurSelect/CustomBlurSelect';
// import { fetchProvidersAsync } from '../../store/thunks/providerThunks';

const CreateProduct = ({ products, setProducts }) => {
  const [producto, setProducto] = useState({
    name: '',
    description: '',
    image: '',
    FiImg: '',
    calification: 0,
    marca: '',
    precio: 0,
    stock: 0,
    cantidad: 1,
    disabled: false,
    imgPreview: '',
    photo: null,
  });

  /**
   *       id: 1,
      name: 'Manzana',
      description: 'Esta es una descripción...',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      calification: 4.5,
      marca: 'Frutal',
      precio: 200,
      stock: 15,
      cantidad: 1,
   */

  const [errors, setErrors] = useState({});

  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  // const { providers } = useSelector((state) => state.provider);

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === 'photo') {
      // Si el campo es una imagen, actualiza el estado con el archivo seleccionado
      const imgFile = e.target.files[0];
      if (imgFile) {
        const reader = new FileReader();
        reader.onload = () => {
          setProducto({
            ...producto,
            imgPreview: reader.result, // Establecer la vista previa de la imagen
            photo: imgFile, // Establecer la imagen seleccionada
          });
        };
        reader.readAsDataURL(imgFile);
      }
    } else {
      setProducto({
        ...producto,
        [name]: value,
      });
    }
    setErrors(validate({ ...producto, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validate(producto);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const newProduct = {
        ...producto,
        id: products.length + 1,
        calification: 0,
        cantidad: 1,
      };

      setProducts([...products, newProduct]);

      alert(`El producto ${producto.name} ha sido creado con exito!`);

      setProducto({
        name: '',
        supplier: '',
        FiImg: null,
        img: '',
        price: 0,
        rating: 0,
        description: '',
        stock: 0,
        cantidad: 1,
        disabled: false,
      });

      navigate('/admin/products');
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  // const providerOption = providers.map((provider) => {
  //   return {
  //     value: provider.id,
  //     label: provider.company_name,
  //   };
  // });

  // const handleClick = () => {
  //   dispatchEvent
  // };

  return (
    <div>
      <img src={Logo} alt='Mercadillo Cívico' className='w-[240px] mt-[.4em] p-1' />
      <h3 className='mt-[.3em] mb-[.5em] text-bold text-[1.5em] md:text-[2em] lg:text-[2.5em] text-tuscany-950'>
        Crea un producto!
      </h3>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-4'>
          <label
            htmlFor='name'
            className='text-pearl-bush-950 text-sm self-start font-semibold mb-1'>
            Nombre del Producto
          </label>
          <CustomInput
            type='text'
            id='name'
            name='name'
            value={producto.name}
            placeholder='Nombre'
            onChange={handleInput}
            className='py-2 px-2 border rounded-md'
          />
          <div className='text-crown-of-thorns-600 text-sm'>{errors.name}</div>
        </div>
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-4'>
          <label
            htmlFor='marca'
            className='text-pearl-bush-950 self-start text-sm font-semibold mb-1'>
            Marca
          </label>
          <CustomInput
            type='text'
            id='marca'
            name='marca'
            value={producto.marca}
            placeholder='Marca'
            onChange={handleInput}
            className='py-2 px-2 border rounded-md'
          />
          <div className='text-crown-of-thorns-600 text-sm'>{errors.marca}</div>
        </div>
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-4'>
          <label
            htmlFor='description'
            className='text-pearl-bush-950 self-start text-sm font-semibold mb-1'>
            Descripción
          </label>
          <CustomInput
            id='description'
            name='description'
            value={producto.description}
            placeholder='Descripcion'
            onChange={handleInput}
            className='py-2 px-2 border rounded-md'
          />
          <div className='text-crown-of-thorns-600 text-sm'>{errors.description}</div>
        </div>

        {/* //----------------------------------------------------------  */}
        <div className='max-w-[400px] min-w-[250px] mx-auto mt-5'>
          <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-4'>
            <label
              htmlFor='image'
              className='text-pearl-bush-950 self-start text-sm font-semibold mb-5'>
              Imagen del producto
            </label>

            <div className='mb-[25px] outline outline-2 relative outline-tuscany-950 mx-auto w-[150px] h-[150px] rounded-xl bg-pearl-bush-50 object-cover overflow-hidden'>
              <>
                <input
                  name='photo'
                  id='photo'
                  onChange={handleInput}
                  type='file'
                  accept='image/*'
                  className='hidden absolute'
                />
                <label
                  htmlFor='photo'
                  className='text-tuscany-100 absolute m-[5px] bottom-0 right-0 w-[40px] h-[40px] backdrop-blur-[3px] rounded-full p-2 bg-[#00000080] hover:bg-[#00000090] transition border-none hover:cursor-pointer'>
                  <MdEdit className='w-full h-full' />
                </label>
              </>
              {producto.photo && !producto.imgPreview ? (
                <img
                  className='w-full h-full object-cover'
                  src={producto.photo}
                  alt='foto de perfil'></img>
              ) : producto.imgPreview ? (
                <img
                  className='w-full h-full object-cover'
                  src={producto.imgPreview}
                  alt='foto de perfil'></img>
              ) : (
                <FaImage className='w-full h-full p-2 text-tuscany-950' />
              )}
            </div>
          </div>
        </div>
        {/* //--------------------------------------------------------- */}
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-4'>
          <label
            htmlFor='stock'
            className='text-pearl-bush-950 self-start text-sm font-semibold mb-1'>
            Proveedor
          </label>
          <div className='flex flex-col bg-hippie-green-950'>
            <Box className='max-w-64 mx-auto w-[100vw] pt-4 pb-6 lg:translate-y-[40%]'>
              {/* <CustomSelect label='Localización' options={providersOption} /> */}
              <button>Aplicar Filtro</button>
            </Box>
          </div>

          <CustomInput
            type='number'
            id='stock'
            name='stock'
            value={producto.stock}
            placeholder='Stock'
            onChange={handleInput}
            className='py-2 px-2 border rounded-md'
          />
          <div className='text-crown-of-thorns-600 text-sm'>{errors.stock}</div>
        </div>
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-4'>
          <label
            htmlFor='precio'
            className='text-pearl-bush-950 self-start text-sm font-semibold mb-1'>
            Precio
          </label>
          <CustomInput
            type='number'
            id='precio'
            name='precio'
            value={producto.precio}
            placeholder='Precio'
            onChange={handleInput}
            className='py-2 px-2 border rounded-md'
          />
          <div className='text-crown-of-thorns-600 text-sm'>{errors.precio}</div>
        </div>
        <div className='my-[1em]'>
          <CustomButton text='Crear Producto' type='submit' />
        </div>
      </form>
      <div className='fixed bottom-10 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 z-10'>
        <CustomButton text='Vista Previa' onClick={openModal} />
      </div>

      <div>
        <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
          <div className='flex flex-col justify-center items-center'>
            <AdminCardPreview
              name={producto.name}
              supplier={producto.marca}
              img={producto.image}
              price={producto.precio}
              rating={5}
              className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CreateProduct;
