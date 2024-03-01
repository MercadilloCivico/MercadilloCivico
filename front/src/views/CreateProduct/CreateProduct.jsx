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

  const handleInput = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const imgFile = files[0];

      if (imgFile) {
        const reader = new FileReader();

        reader.onload = () => {
          setProducto({
            ...producto,
            image: reader.result,
            FiImg: imgFile,
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
        <div>
          {producto.image ? (
            <div className='relative flex items-end justify-center'>
              <img
                className='w-[10em] h-auto object-cover'
                src={producto.image}
                alt='product-preview'
              />
              <>
                <input
                  name='image'
                  id='image'
                  onChange={handleInput}
                  type='file'
                  accept='image/*'
                  className='hidden absolute inset-0 w-full h-full cursor-pointer opacity-0'
                />
                <label
                  htmlFor='image'
                  className='text-tuscany-100 ml-2 mb-2 w-8 h-8 rounded-full p-2 hover:cursor-pointer bg-pearl-bush-950'>
                  <MdEdit className='w-full h-full' />
                </label>
              </>
            </div>
          ) : (
            <div className='flex flex-col justify-between mb-[8em] items-center text-tuscany-950'>
              <span>Ingrese una Imagen</span>
              <>
                <input
                  name='image'
                  id='image'
                  onChange={handleInput}
                  type='file'
                  accept='image/*'
                  className='hidden absolute'
                />
                <label
                  htmlFor='image'
                  className='absolute mx-[1em] w-[10em] h-auto p-2 hover:cursor-pointer text-tuscany-950'>
                  <FaImage className='w-[10em] h-auto p-2' />
                </label>
              </>
            </div>
          )}
          <div className='text-crown-of-thorns-600'>{errors.image}</div>
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
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-4'>
          <label
            htmlFor='stock'
            className='text-pearl-bush-950 self-start text-sm font-semibold mb-1'>
            Stock
          </label>
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
