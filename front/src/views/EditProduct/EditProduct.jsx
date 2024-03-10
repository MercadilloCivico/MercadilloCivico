import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import validate from './validations';
import CustomInput from '../../components/CustomInput/CustomInput';
import { MdEdit } from 'react-icons/md';
import CustomButton from '../../components/CustomButton/CustomButton';
import AdminCardPreview from '../../components/Card/AdminCardPreview';
import Modal from '../../components/Modal/Modal';
import Logo from '../../assets/img/logo-simple.svg';
import { FaImage, FaTrash } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { fetchProductsAsync } from '../../store/thunks/productThunks';
import { fetchProvidersAsync } from '../../store/thunks/providerThunks';
import { Box } from '@mui/material';
import { editProductAsync } from '../../store/thunks/productThunks';
import { createToast } from '../../store/slices/toastSlice';

const EditProduct = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalBackOpen, setModalBackOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [proveedor, setProveedor] = useState('');
  const [costo, setCosto] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.products);
  const producto = items?.find((product) => product.id.toString() === id);
  const [editedProducto, setEditedProducto] = useState({});

  useEffect(() => {
    (async () => {
      await dispatch(fetchProductsAsync());
      await dispatch(fetchProvidersAsync());
    })();
  }, [dispatch, id]);

  useEffect(() => {
    setEditedProducto({
      id,
      image: producto.image,
      name: producto.name,
      marca: producto.marca,
      description: producto.description,
      proveedoresCostos: producto.proveedor,
    });
  }, [id, producto.description, producto.image, producto.marca, producto.name, producto.proveedor]);

  const openModal = () => {
    setModalOpen(true);
  };

  const handleInput = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const imgFile = files[0];

      if (imgFile) {
        const reader = new FileReader();

        reader.onload = () => {
          setEditedProducto({
            ...editedProducto,
            image: reader.result,
            fiImg: imgFile,
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
      setEditedProducto({
        ...editedProducto,
        [name]: value,
      });
      setHasChanges(true);
    }

    setErrors(validate({ ...producto, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validate(producto);
    setErrors(formErrors);
    console.log(editedProducto);

    const hasChanges = Object.keys(editedProducto).some(
      (key) => editedProducto[key] !== producto[key]
    );

    if (hasChanges && Object.keys(formErrors).length === 0) {
      try {
        await dispatch(editProductAsync(editedProducto));
        dispatch(createToast('Tus cambios se han guardado con exito!'));
        navigate('/admin/products');
        // window.location.reload();
      } catch (error) {
        dispatch(createToast('Error modificando producto'));
      }
      setHasChanges(false);
      setProveedor('');
      setCosto('');
    } else {
      dispatch(createToast('Por favor, complete todos los campos correctamente.'));
    }
  };

  const handleNavigateBack = () => {
    if (hasChanges) {
      setModalBackOpen(true);
    } else {
      navigate(-1);
    }
  };
  const { providerArray } = useSelector((state) => state.providers);

  const providersOptions = providerArray?.map((provider) => {
    return (
      <option key={provider.id} value={provider.id}>
        {provider.name_prov}
      </option>
    );
  });

  const handleAddProveedorCosto = () => {
    if (proveedor && costo) {
      const existentProvider = editedProducto.proveedoresCostos.find(
        (prov) => prov.proveedor_id === proveedor
      );

      if (!existentProvider) {
        setEditedProducto((prevProducto) => ({
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
    const updatedProveedoresCostos = editedProducto.proveedoresCostos.filter(
      (prov) => prov.proveedor_id !== proveedorId
    );

    setEditedProducto((prevProducto) => ({
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
          <h3 className='text-xl'>Edita tu producto!</h3>
        </div>
      </header>

      <div>
        {producto && (
          <div>
            <img src={Logo} alt='Mercadillo Cívico' className='w-[240px] mt-[.4em] p-1' />
            <form onSubmit={handleSubmit}>
              <div>
                {producto.image ? (
                  <div className='relative flex items-end justify-center'>
                    <img
                      className='w-[10em] h-auto object-cover'
                      src={editedProducto.image || null}
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
                  htmlFor='name'
                  className='text-pearl-bush-950 text-sm self-start font-semibold mb-1'>
                  Nombre del Producto
                </label>
                <CustomInput
                  type='text'
                  id='name'
                  name='name'
                  value={editedProducto.name || ''}
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
                  value={editedProducto.marca || ''}
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
                  value={editedProducto.description || ''}
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
                {editedProducto.proveedoresCostos?.length > 0 ? (
                  editedProducto.proveedoresCostos?.map((provCosto) => {
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

              <div className='my-[1em]'>
                <CustomButton text='Guardar Cambios' type='submit' />
              </div>
            </form>
            <div className='fixed bottom-10 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 z-10'>
              <CustomButton text='Vista Previa' onClick={openModal} />
            </div>
            <div>
              <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
                <div className='flex flex-col justify-center items-center'>
                  <AdminCardPreview
                    name={editedProducto.name}
                    supplier={editedProducto.marca}
                    img={editedProducto.image}
                    price={editedProducto.precio}
                    rating={5}
                    className='my-3 mx-3 md:mx-5 lg:mx-10 transition-all'
                  />
                </div>
              </Modal>
            </div>
          </div>
        )}
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
    </>
  );
};

export default EditProduct;
