import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { FaImage } from 'react-icons/fa';
import validate from './validations';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import Logo from '../../assets/img/logo-simple.svg';
import Modal from '../../components/Modal/Modal';
import VCard from '../../components/Card/Card';

const CreateProduct = ({ products, setProducts }) => {
  const [producto, setProducto] = useState({
    name: '',
    supplier: '',
    FiImg: '',
    img: '',
    price: 0,
    rating: 0,
    description: '',
    stock: 0,
    cantidad: 1,
  });

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
            img: reader.result,
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
        rating: 0,
        cantidad: 1,
      };

      setProducts([...products, newProduct]);

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
      });

      alert('Producto creado con exito!');
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
            htmlFor='supplier'
            className='text-pearl-bush-950 self-start text-sm font-semibold mb-1'>
            Proveedor
          </label>
          <CustomInput
            type='text'
            id='supplier'
            name='supplier'
            value={producto.supplier}
            placeholder='Proveedor'
            onChange={handleInput}
            className='py-2 px-2 border rounded-md'
          />
          <div className='text-crown-of-thorns-600 text-sm'>{errors.supplier}</div>
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
          {producto.img ? (
            <div className='relative flex items-end justify-center'>
              <img
                className='w-[10em] h-auto object-cover'
                src={producto.img}
                alt='product-preview'
              />
              <>
                <input
                  name='img'
                  id='img'
                  onChange={handleInput}
                  type='file'
                  accept='image/*'
                  className='hidden absolute inset-0 w-full h-full cursor-pointer opacity-0'
                />
                <label
                  htmlFor='img'
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
                  name='img'
                  id='img'
                  onChange={handleInput}
                  type='file'
                  accept='image/*'
                  className='hidden absolute'
                />
                <label
                  htmlFor='img'
                  className='text-tuscany-100 absolute mx-[1em] w-[10em] h-auto p-2 hover:cursor-pointer text-tuscany-950'>
                  <FaImage className='w-[10em] h-auto p-2' />
                </label>
              </>
            </div>
          )}
          <div className='text-crown-of-thorns-600'>{errors.img}</div>
        </div>
        <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-4'>
          <label
            htmlFor='price'
            className='text-pearl-bush-950 self-start text-sm font-semibold mb-1'>
            Precio
          </label>
          <CustomInput
            type='number'
            id='price'
            name='price'
            value={producto.price}
            placeholder='Precio'
            onChange={handleInput}
            className='py-2 px-2 border rounded-md'
          />
          <div className='text-crown-of-thorns-600 text-sm'>{errors.price}</div>
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
            <VCard
              name={producto.name}
              supplier={producto.supplier}
              img={producto.img}
              price={producto.price}
              rating={producto.rating}
              stock={producto.stock}
              cantidad={producto.cantidad}
              className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CreateProduct;
