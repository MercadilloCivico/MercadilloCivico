import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { FaImage, FaTrash } from 'react-icons/fa';
import validate from './validations';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import Logo from '../../assets/img/logo-simple.svg';
import Modal from '../../components/Modal/Modal';
import AdminCardPreview from '../../components/Card/AdminCardPreview';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvidersAsync } from '../../store/thunks/providerThunks.js';
import { addProductAsync } from '../../store/thunks/productThunks.js';
import { IoIosArrowBack } from 'react-icons/io';

const CreateProduct = () => {
  const [producto, setProducto] = useState({
    photo: null,
    imgPreview: '',
    name: '',
    marca: '',
    description: '',
    disabled: false,
    proveedoresCostos: [],
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalBackOpen, setModalBackOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [proveedor, setProveedor] = useState('');
  const [costo, setCosto] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { providerArray } = useSelector((state) => state.providers);

  useEffect(() => {
    dispatch(fetchProvidersAsync());
  }, [dispatch]);

  const openModal = () => {
    setModalOpen(true);
  };

  const providersOptions = providerArray?.map((provider) => {
    return (
      <option key={provider.id} value={provider.id}>
        {provider.name_prov}
      </option>
    );
  });

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
        setHasChanges(true);
        reader.readAsDataURL(imgFile);
      }
    } else if (name === 'proveedorSeleccionado') {
      const selectedProvider = providerArray.find((provider) => provider.id === parseInt(value));
      setProveedor(selectedProvider.id);
      setHasChanges(true);
    } else if (name === 'costo') {
      setCosto(value);
    } else {
      setProducto({
        ...producto,
        [name]: value,
      });
      setHasChanges(true);
    }
    setErrors(validate({ ...producto, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validate(producto);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const newProduct = producto;
      try {
        dispatch(addProductAsync(newProduct));
        alert(`El producto ${producto.name} ha sido creado con exito!`);
      } catch (error) {
        alert('Error al crear product: ' + error.message);
      }
      setHasChanges(false);

      setProducto({
        photo: null,
        imgPreview: '',
        name: '',
        marca: '',
        description: '',
        disabled: false,
        proveedoresCostos: [],
      });

      setProveedor('');
      setCosto('');

      navigate('/admin/products');
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  };

  const handleNavigateBack = () => {
    if (hasChanges) {
      setModalBackOpen(true);
    } else {
      navigate(-1);
    }
  };

  const handleAddProveedorCosto = () => {
    if (proveedor && costo) {
      const existentProvider = producto.proveedoresCostos.find(
        (prov) => prov.proveedor_id === proveedor
      );

      if (!existentProvider) {
        setProducto((prevProducto) => ({
          ...prevProducto,
          proveedoresCostos: [
            ...prevProducto.proveedoresCostos,
            {
              proveedor_id: proveedor,
              costo: costo,
            },
          ],
        }));

        setProveedor('');
        setCosto('');
      } else {
        alert('Proveedor ya seleccionado. Por favor, elige otro proveedor.');
      }
    } else {
      alert('Por favor, selecciona un proveedor y un costo antes de agregar.');
    }
  };

  const handleRemoveProveedorCosto = (proveedorId) => {
    const updatedProveedoresCostos = producto.proveedoresCostos.filter(
      (prov) => prov.proveedor_id !== proveedorId
    );

    setProducto((prevProducto) => ({
      ...prevProducto,
      proveedoresCostos: updatedProveedoresCostos,
    }));
  };

  const limitAndEllipsis = (text, limit) => {
    if (text?.length > limit) {
      return `${text?.slice(0, limit - 3)}...`;
    }
    return text;
  };

  return (
    <>
      <header className='flex h-[55px] w-full fixed text-tuscany-950 top-0  bg-pearl-bush-200 items-center justify-center shadow-md z-10'>
        <div className='max-w-[1280px] w-full relative'>
          <IoIosArrowBack
            className='absolute cursor-pointer w-[25px] h-[25px] my-auto left-[10px] top-0 bottom-0'
            onClick={handleNavigateBack}
          />
          <h3 className='text-xl'>Crea un producto!</h3>
        </div>
      </header>

      <div>
        <img src={Logo} alt='Mercadillo Cívico' className='w-[240px] mt-[.4em] p-1' />
        <form onSubmit={handleSubmit}>
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
              rows={3}
              maxRows={4}
              multiline
            />
            <div className='text-crown-of-thorns-600 text-sm'>{errors.description}</div>
          </div>
          <label
            htmlFor='proveedor'
            className='text-pearl-bush-950 self-start text-sm font-semibold mb-1'>
            Proveedores Costo
          </label>
          <div className='flex items-center max-w-[600px] min-w-[250px] mx-auto px-4'>
            {/* Proveedor */}
            <div className='flex bg-pearl-bush-100 w-1/2'>
              <Box className='max-w-64 mx-auto'>
                <select
                  name='proveedorSeleccionado'
                  onChange={handleInput}
                  value={proveedor}
                  className='bg-pearl-bush-100 text-pearl-bush-950 font-semibold rounded-sm p-4 w-full '>
                  <option className='text-pearl-bush-950 font-semibold' value={''}>
                    Selecciona al proveedor
                  </option>
                  {providersOptions}
                </select>
              </Box>
            </div>
            {/* Costo */}
            <div className='flex w-1/2'>
              <CustomInput
                type='number'
                id='costo'
                name='costo'
                value={costo}
                placeholder='Precio'
                onChange={handleInput}
                className='max-w-64 py-2 px-2 border rounded-md'
              />
            </div>
          </div>
          <div className='flex my-4 justify-center items-center max-w-[300px] sm:max-w-[600px] mx-auto'>
            <CustomButton text='Agregar Proveedor y Costo' onClick={handleAddProveedorCosto} />
          </div>
          <div className='flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto px-4'>
            <h3 className='flex justify-start text-tuscany-950 font-semibold custom-border-b'>
              Proveedores Costos
            </h3>
            {producto.proveedoresCostos?.length > 0 ? (
              producto.proveedoresCostos?.map((provCosto) => {
                const supplier = providerArray.find((p) => p.id === provCosto.proveedor_id);
                return (
                  <div
                    key={provCosto.proveedor_id}
                    className='flex justify-between items-center mb-2'>
                    <span className='text-tuscany-950'>{`Proveedor: ${limitAndEllipsis(supplier?.name_prov, 7)}, Costo: ${provCosto.costo}`}</span>
                    <button
                      onClick={() => handleRemoveProveedorCosto(provCosto.proveedor_id)}
                      className='w-[1.5em] text-[1em] my-2 p-1 border-none rounded-sm flex justify-center cursor-pointer bg-[#c24949] hover:bg-[#993939]'>
                      <FaTrash className='text-pearl-bush-100' />
                    </button>
                  </div>
                );
              })
            ) : (
              <span className='text-tuscany-950'>Aqui se veran los proveedores y costos</span>
            )}
          </div>

          <div className='flex w-full justify-evenly lg:justify-center xl:justify-center flex-wrap items-center my-1'>
            <div className=' right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 z-10 max-w-[400px]'>
              <CustomButton text='Vista Previa' onClick={openModal} className='w-[200px]' />
            </div>
            <div className='max-w-[400px] m-5'>
              <CustomButton text='Crear Producto' type='submit' className='w-[200px]' />
            </div>
          </div>
        </form>

        <div>
          <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
            <div className='flex justify-center items-center'>
              <AdminCardPreview
                key={producto.id}
                name={producto.name}
                supplier={producto.marca}
                img={producto.photo}
                price={producto.costo}
                rating={5}
                className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
              />
            </div>
          </Modal>
        </div>
        <div>
          <Modal isOpen={isModalBackOpen} onRequestClose={() => setModalBackOpen(false)}>
            <div className='flex flex-col justify-center items-center space-y-8'>
              <span className='text-tuscany-950 font-semibold text-center mt-8'>
                ¿Estas seguro que deseas salir? No se guardarán los datos.
              </span>
              <div className='flex justify-between items-center space-x-4'>
                <button
                  className='border-none bg-pearl-bush-200 hover:bg-pearl-bush-300 text-tuscany-950 font-semibold p-2 cursor-pointer'
                  onClick={() => {
                    navigate(-1);
                  }}>
                  Si, salir
                </button>
                <button
                  className='border-none bg-pearl-bush-200 hover:bg-pearl-bush-300 text-tuscany-950 font-semibold p-2 cursor-pointer'
                  onClick={() => {
                    setModalBackOpen(false);
                  }}>
                  No, continuar
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
