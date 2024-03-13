const VITE_API_URL = import.meta.env.VITE_API_URL;
import { FaUser } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

import { TextField } from '@mui/material';
import LinkTags from './LinkTags.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { createToast } from '../../store/slices/toastSlice.js';
import { putUser } from '../../store/thunks/authThunks.js';
import { fetchUserProfileAsync, deleteUserProfileAsync } from '../../store/thunks/profileThunks.js';
import { logout } from '../../store/thunks/authThunks.js';
import style from './ProfileAnims.module.css';
import Loading from '../../views/Loading/Loading.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import {
  validateEmail,
  validateFirstName,
  validateSecondName,
  validateLastName,
  validatePassword,
  validateConfirm,
} from './formControl.js';
import RegisterProvider from '../../components/RegisterProvider/RegisterProvider.jsx';
import municipiosPrincipales from '../../utils/departamentos.js';
import { putProvider } from '../../store/thunks/providerThunks.js';
import { validacionProveedor } from '../../utils/validation.js';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  let [editMode, setEditMode] = useState(false);
  const { rol } = useSelector((state) => state.auth);
  const [perfilProveedor, setPerfilProveedor] = useState(false);

  const [currentData, setCurrentData] = useState({
    firstName: '',
    secondName: '',
    lastName: '',
    email: '',
    imgUrl: '',
  });

  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    lastName: '',
    password: '',
    email: '',
    confirm: '',
  });

  const [currentDataProveedor, setCurrentDataProveedor] = useState({
    camaraDeComercio: '',
    certificadoBancario: '',
    nameProv: '',
    ubicacion: [],
    tel: '',
  });
  const [currentDataProveedorMemory, setCurrentDataProveedorMemory] = useState({
    camaraDeComercio: '',
    certificadoBancario: '',
    nameProv: '',
    ubicacion: [],
    tel: '',
  });

  const [formDataProveedor, setFormDataProveedor] = useState({
    camaraDeComercio: null,
    certificadoBancario: null,
    nameProv: '',
    ubicacion: [],
    tel: currentDataProveedor.tel,
  });
  /* eslint-disable */
  const [dataExtraProveedor, setDataExtraProveedor] = useState({
    productos: [],
    puntos_de_venta: [],
    pedidos: [],
  });
  /* eslint-enable */

  const handlePDFChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    // Verificar si el archivo seleccionado es un PDF
    if (file && file.type === 'application/pdf') {
      setFormDataProveedor((prevFormData) => ({
        ...prevFormData,
        [name]: file,
      }));
    } else {
      // Despachar toast
    }
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setCurrentDataProveedor({
      ...currentDataProveedor,
      ubicacion: [selectedDept, 'sin dato', currentDataProveedor.ubicacion[2]],
    });
    setFormDataProveedor((prevFormData) => ({
      ...prevFormData,
      ubicacion: currentDataProveedor.ubicacion,
    }));
    // Actualizar formData.ubicacion al nombre del departamento seleccionado
  };
  const handleMunicipalityChange = (e) => {
    const selectedMuni = e.target.value;

    // Actualizar formData.ubicacion al nombre del municipio seleccionado
    setCurrentDataProveedor({
      ...currentDataProveedor,
      ubicacion: [
        currentDataProveedor.ubicacion[0],
        selectedMuni,
        currentDataProveedor.ubicacion[2],
      ],
    });

    setFormDataProveedor((prevFormData) => ({
      ...prevFormData,
      ubicacion: [
        currentDataProveedor.ubicacion[0],
        selectedMuni,
        currentDataProveedor.ubicacion[2],
      ],
    }));
  };

  const handleDirection = (e) => {
    const value = e.target.value;
    setCurrentDataProveedor({
      ...currentDataProveedor,
      ubicacion: [currentDataProveedor.ubicacion[0], currentDataProveedor.ubicacion[1], value],
    });
    setFormDataProveedor((prevFormData) => ({
      ...prevFormData,
      ubicacion: [currentDataProveedor.ubicacion[0], currentDataProveedor.ubicacion[1], value],
    }));
  };
  /* eslint-disable */
  useEffect(() => {
    setIsLoading(true);
    // Lógica para cargar los datos del usuario (asumiendo que updateUserData() hace la llamada a la API)
    updateUserData().then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);
  /* eslint-enable */
  useEffect(() => {
    // Actualizar formData cuando currentData cambie
    setFormData(currentData);
  }, [currentData]);

  useEffect(() => {
    if (editMode) {
      navigate('/profile');
    }
  }, [editMode, navigate]);

  // Copia de la Data original sin modificar, para mostrar en los campos

  // Estado con la Data actualizada en caso de querer actualizar
  // Se inicializa con los datos viejo

  const [errors, setErrors] = useState({
    firstName: '',
    secondName: '',
    lastName: '',
    password: '',
    confirm: '',
    email: '',
  });

  // Notificar si hubo un error
  useEffect(() => {
    if (
      (!currentData.firstName || currentData.firstName.toLowerCase() === 'undefined') &&
      !isLoading
    ) {
      dispatch(createToast('Ocurrio un error. Intenta actualizar la página.'));
      navigate(-1);
    }
  }, [dispatch, currentData]);

  function checkNull(value) {
    if (value && value.toLowerCase() === 'null') return '';
    else return value;
  }

  async function updateUserData() {
    setIsLoading(true);
    const { payload } = await dispatch(fetchUserProfileAsync());
    const data = {
      firstName: payload.first_name,
      secondName: checkNull(payload.second_name),
      lastName: payload.last_name,
      email: payload.email,
      imgUrl: payload.photo,
      password: '',
      confirm: '', // Estos valores sólo se utilzan para que los de formData no estén vacíos al cargar info del usuario y la página rompa
    };
    if (rol === 'proveedor') {
      const perfilP = await axios.get(`${VITE_API_URL}/proveedor/profile`, {
        withCredentials: true,
      });
      if (perfilP.data) {
        const dataProveedor = {
          camaraDeComercio: perfilP.data.camaraDeComercio,
          certificadoBancario: perfilP.data.certificadoBancario,
          nameProv: perfilP.data.name_prov,
          ubicacion: perfilP.data.ubicacion.split('-'),
          tel: perfilP.data.tel,
        };

        const dataExtra = {
          productos: perfilP.data.productos,
          puntos_de_venta: perfilP.data.puntos_de_venta,
          pedidos: perfilP.data.pedidos,
        };
        setPerfilProveedor(true);
        setDataExtraProveedor(dataExtra);
        setCurrentDataProveedor(dataProveedor);
        setCurrentDataProveedorMemory(dataProveedor);
      }
    }
    setIsLoading(false);

    setCurrentData(data);
  }

  function checkImage(file) {
    if (file.type === 'image/jpeg' || file.type === 'image/png') return true;
    else {
      dispatch(createToast('Por favor, sube un tipo de archivo PNG o JPEG'));
      return false;
    }
  }

  function handleChange(e) {
    // Si el input es el de imágen
    if (e.target.name === 'img') {
      const imgPreview = e.target.files[0];

      if (!checkImage(imgPreview)) return 0; // Si el check retorna false se termina la función

      if (e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (eLoad) => {
          setFormData({ ...formData, imgPreview: eLoad.target.result, file: e.target.files[0] });
        };
        reader.readAsDataURL(imgPreview);
      }
      return 0;
    }
    // Si el input es un campo de texto
    // Actualizar solo los campos que cambian en lugar de todos

    if (formData[e.target.name] !== e.target.value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value.trim(),
      }));
      return 0;
    }
  }
  function handleNameProv(e) {
    const { name, value } = e.target;
    setCurrentDataProveedor({
      ...currentDataProveedor,
      [name]: value,
    });
    if (formDataProveedor[e.target.name] !== e.target.value) {
      setFormDataProveedor((prevForm) => ({
        ...prevForm,
        [e.target.name]: e.target.value.trim(),
      }));
    }

    setErrors(validacionProveedor({ ...currentDataProveedor, [name]: value }));
  }
  // validar errores en cada cambio del formData
  /* eslint-disable */
  useEffect(() => {
    if (formData.email) {
      setErrors({
        ...errors,
        firstName: validateFirstName(formData.firstName),
        secondName: validateSecondName(formData.secondName),
        lastName: validateLastName(formData.lastName),
        password: validatePassword(formData.password),
        email: validateEmail(formData.email),
        confirm: validateConfirm(formData.confirm, formData.password),
      });
    }
  }, [formData]);
  /* eslint-enable */
  const { token } = useSelector((state) => state.auth);

  async function handleSave() {
    setIsLoading(true);

    const toSend = {
      // envía el nombre con el formato correcto en caso de estar mal
      firstName:
        formData.firstName.charAt(0).toUpperCase() +
        formData.firstName.slice(1).toLocaleLowerCase(),
      secondName:
        formData.secondName === null || formData.secondName === ''
          ? ''
          : formData.secondName.charAt(0).toUpperCase() +
            formData.secondName.slice(1).toLocaleLowerCase(),

      lastName:
        formData.lastName.charAt(0).toUpperCase() + formData.lastName.slice(1).toLocaleLowerCase(),
      email: formData.email,
      password: formData.password,
      photo: formData.file || '',
    };
    await dispatch(putProvider(formDataProveedor));
    const response = await dispatch(putUser(toSend));
    if (response.payload?.error) {
      dispatch(createToast(response.payload.error));
      updateUserData();
    }

    if (toSend.password === '' && !response.payload?.error) {
      dispatch(createToast('Datos actualizados con éxito.'));
      updateUserData();
    }

    if (toSend.password !== '') {
      await dispatch(logout());
      token !== null && navigate('/login');
      dispatch(createToast('Contraseña actualizada. Vuelve a iniciar sesión.'));
    }

    setEditMode(false);
  }

  function handleCancel() {
    setEditMode(false);
  }

  async function handleDelete() {
    // setEditMode(false);
    await dispatch(deleteUserProfileAsync());
    await dispatch(logout());
    dispatch(createToast('Petición enviada'));
  }

  function hasErrors() {
    // verifica si hay algún error
    return Object.values(errors).some((error) => {
      return error !== '';
    });
  }

  function hasChanged() {
    // verifica si se modificó algún campo
    return (
      JSON.stringify(formData) !== JSON.stringify(currentData) ||
      JSON.stringify(currentDataProveedor) !== JSON.stringify(currentDataProveedorMemory)
    );
  }

  return (
    <div className='text-pearl-bush-950'>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className='px-2 mt-2'>
            <div className='rounded-xl max-w-[1280px] mx-auto h-[150px] relative bg-gradient-to-l from-[#b3ddb0] to-[#f7c096]'>
              {!editMode && perfilProveedor && (
                <button
                  className={
                    'absolute right-0 z-[2] text-tuscany-100 m-2 w-max h-[40px] backdrop-blur-[3px] rounded-xl p-2 bg-[#00000080] hover:bg-[#00000090] transition border-none hover:cursor-pointer ' +
                    style.editBtnAnim
                  }
                  onClick={() => {
                    setEditMode(true);
                  }}
                  type='text'>
                  EDITAR PERFIL
                </button>
              )}
              <div className='bottom-[calc(-75px+15%)] outline outline-2 outline-tuscany-600 mx-auto left-0 right-0 w-[150px] h-[150px] rounded-xl bg-pearl-bush-50 absolute object-cover overflow-hidden'>
                {editMode && (
                  <>
                    <input
                      name='img'
                      id='img'
                      onChange={handleChange}
                      type='file'
                      accept='image/png, image/gif, image/jpeg'
                      className='hidden absolute'
                    />
                    <label
                      htmlFor='img'
                      className={
                        'text-tuscany-100 absolute m-1 bottom-0 right-0 w-[40px] h-[40px] backdrop-blur-[3px] rounded-full p-2 bg-[#00000080] hover:bg-[#00000090] transition border-none hover:cursor-pointer ' +
                        style.editBtnAnim
                      }>
                      <MdEdit className='w-full h-full' />
                    </label>
                  </>
                )}

                {/* 
                Renderizado condicional de imágen de perfil.
                Si hay una imagen existente se renderiza. Si se seleccionó una imágen para subir, se renderizará la preview en su lugar. Else, se renderiza un placeholder
              */}
                {currentData.imgUrl && !formData.imgPreview ? (
                  <img className='w-full h-full object-cover' src={currentData.imgUrl}></img>
                ) : formData.imgPreview ? (
                  <img className='w-full h-full object-cover' src={formData.imgPreview}></img>
                ) : (
                  <FaUser className='w-full h-full p-2 text-tuscany-600 bg-tuscany-100' />
                )}
              </div>
            </div>
          </div>
        )}
        {/* Info container */}

        {editMode ? (
          <div className={'mt-[calc(75px)] flex flex-col justify-center ' + style.profileFormAnim}>
            <ul className='flex flex-wrap justify-around max-w-[900px] mx-auto'>
              <TextField
                onChange={handleChange}
                name='firstName'
                className='w-[300px] m-2'
                color='success'
                id='outlined-helperText-firstName'
                label='Nombre'
                defaultValue={currentData.firstName}
                helperText={errors.firstName}
                error={errors.firstName ? true : false}
              />

              <TextField
                onChange={handleChange}
                name='secondName'
                className='w-[300px] m-2'
                color='success'
                id='outlined-helperText-secondName'
                label='Segundo nombre'
                defaultValue={currentData.secondName}
                helperText={errors.secondName}
                error={errors.secondName ? true : false}
              />

              <TextField
                onChange={handleChange}
                name='lastName'
                className='w-[300px] m-2'
                color='success'
                id='outlined-helperText-lastName'
                label='Apellido'
                defaultValue={currentData.lastName}
                helperText={errors.lastName}
                error={errors.lastName ? true : false}
              />

              <TextField
                onChange={handleChange}
                className='w-[300px] m-2'
                name='email'
                color='success'
                id='outlined-helperText-email'
                label='Email'
                defaultValue={currentData.email}
                helperText={errors.email}
                error={errors.email ? true : false}
              />

              <TextField
                onChange={handleChange}
                className='w-[300px] m-2'
                type='password'
                name='password'
                color='success'
                id='outlined-helperText-password'
                label='Contraseña'
                helperText={errors.password}
                error={errors.password ? true : false}
              />

              <TextField
                onChange={handleChange}
                className='w-[300px] m-2'
                name='confirm'
                color='success'
                id='outlined-helperText-confirm'
                label='Confirma la contraseña'
                helperText={errors.confirm}
                error={errors.confirm ? true : false}
              />
            </ul>

            {/* Botones al editar*/}
            {perfilProveedor && (
              <div>
                <div className='p-4 m-4 text-pearl-bush-950 font-bold bg-tuscany-200 rounded-sm'>
                  Información del Proveedor
                </div>
                <div className='flex flex-col justify-center '>
                  <ul className='flex flex-wrap justify-around max-w-[800px] mx-auto rounded-md bg-tuscany-200'>
                    <div className='self-center max-w-[350px] min-w-[250px] mx-auto mt-5'>
                      <label htmlFor='camaraDeComercio' className='text-pearl-bush-950 font-medium'>
                        Ingrese PDF de la camara de comercio
                      </label>
                      <input
                        type='file'
                        name='camaraDeComercio'
                        accept='application/pdf'
                        onChange={handlePDFChange}
                        className='w-[300px] m-2 bg-pearl-bush-100 p-2'
                      />
                    </div>

                    <div className='self-center max-w-[350px] min-w-[250px] mx-auto mt-5'>
                      <label
                        htmlFor='certificadoBancario'
                        className='text-pearl-bush-950 font-medium'>
                        Ingrese PDF del certificado bancario
                      </label>
                      <input
                        type='file'
                        name='certificadoBancario'
                        accept='application/pdf'
                        onChange={handlePDFChange}
                        className='w-[300px] m-2 bg-pearl-bush-100 p-2'
                      />
                    </div>

                    <div className='self-center max-w-[350px] min-w-[250px] mx-auto p-2 mt-3'>
                      <CustomInput
                        onChange={handleNameProv}
                        className='w-[300px] bg-pearl-bush-100'
                        name='nameProv'
                        color='success'
                        id='outlined-helperText'
                        label='Nombre del Proveedor'
                        value={currentDataProveedor.nameProv}
                        maxLength={30}
                      />
                      {errors.nameProv && (
                        <span className='text-crown-of-thorns-600 text-xs'>{errors.nameProv}</span>
                      )}
                    </div>

                    <div className='self-center max-w-[350px] min-w-[250px] mx-auto p-2 mt-3'>
                      <CustomInput
                        onChange={handleNameProv}
                        className='w-[300px] bg-pearl-bush-100'
                        name='tel'
                        color='success'
                        id='outlined-helperText'
                        label='Telefono'
                        value={currentDataProveedor.tel}
                        maxLength={12}
                      />
                      {errors.tel && (
                        <span className='text-crown-of-thorns-600 text-xs'>{errors.tel}</span>
                      )}
                    </div>

                    <div className='flex flex-col self-center max-w-[600px] min-w-[300px] mx-auto mt-3'>
                      <label htmlFor='departamento' className='text-pearl-bush-950 font-medium'>
                        Departamento:
                      </label>
                      <select
                        name='departamento'
                        defaultValue={`${currentDataProveedor.ubicacion[0]}`}
                        className='border-tuscany-950 hover:custom-border-2 text-tuscany-950 hover:text-tuscany-600 font-semibold outline-none rounded-md custom-transparent-bg cursor-pointer p-3'
                        onChange={handleDepartmentChange}>
                        <option value=''>Seleccione un departamento</option>
                        {Object.keys(municipiosPrincipales).map((departamento, index) => (
                          <option key={index} value={departamento}>
                            {departamento}
                          </option>
                        ))}
                      </select>
                      {currentDataProveedor.ubicacion[1] === 'sin dato' && (
                        <span className='text-tuscany-200'>Por favor, seleccione un municipio</span>
                      )}
                    </div>

                    <div className='flex flex-col self-center max-w-[600px] min-w-[300px] mx-auto mt-3'>
                      <label htmlFor='municipio' className='text-pearl-bush-950 font-medium'>
                        Municipio:
                      </label>
                      <select
                        name='municipio'
                        onChange={handleMunicipalityChange}
                        defaultValue={currentDataProveedor.ubicacion[1]}
                        className='border-tuscany-950 hover:custom-border-2 p-3 text-tuscany-950 hover:text-tuscany-600 font-semibold outline-none rounded-md custom-transparent-bg cursor-pointer'>
                        <option value=''>Seleccione un municipio</option>
                        {municipiosPrincipales[currentDataProveedor.ubicacion[0]].map(
                          (municipio, index) => (
                            <option key={index} value={municipio}>
                              {municipio}
                            </option>
                          )
                        )}
                      </select>
                      {currentDataProveedor.ubicacion[1] === 'sin dato' && (
                        <span className='text-crown-of-thorns-600'>
                          Por favor, seleccione un municipio
                        </span>
                      )}
                    </div>

                    <div className='self-center max-w-[350px] min-w-[250px] mx-auto p-2 mb-5 mt-3'>
                      <TextField
                        label='Ubicacion'
                        name='direccion'
                        type='text'
                        className='w-[300px] m-2 bg-pearl-bush-100'
                        value={currentDataProveedor.ubicacion[2]}
                        onChange={handleDirection}
                        maxLength={30}
                      />
                    </div>
                  </ul>
                </div>
              </div>
            )}
            <div>
              {hasChanged() && !hasErrors() ? (
                <CustomButton onClick={handleSave} text='Guardar' className='my-5 mx-2' />
              ) : (
                <CustomButton
                  text='Guardar'
                  disabled='true'
                  className='text-pearl-bush-800 my-5 mx-2'
                />
              )}

              <CustomButton className='mx-2' onClick={handleCancel} text='Cancelar' />
            </div>

            <CustomButton
              className='w-[175px] my-6 mx-auto bg-crown-of-thorns-600 hover:bg-crown-of-thorns-700'
              onClick={handleDelete}
              text='Borrar cuenta'
            />
          </div>
        ) : (
          <div className='w-full max-w-[900px] mt-[75px] mx-auto'>
            <ul>
              <li className='my-3 font-bold text-3xl mx-2 text-tuscany-600'>
                {currentData.secondName ? (
                  <span>{`${currentData.firstName} ${currentData.secondName} ${currentData.lastName}`}</span>
                ) : (
                  <span>{`${currentData.firstName} ${currentData.lastName}`}</span>
                )}
              </li>
              <li className='my-3 font-semibold text-lg text-tuscany-800 opacity-80'>
                <span>{currentData.email}</span>
              </li>
            </ul>
          </div>
        )}
        {rol === 'proveedor' && !perfilProveedor ? (
          <RegisterProvider />
        ) : rol === 'proveedor' && !editMode ? (
          <div className='w-full max-w-[900px] my-5 mx-auto'>
            <div className='flex flex-col bg-pearl-bush-200 p-2 m-2 max-w-[600px] min-w-[300px] mx-auto rounded-md'>
              <span className='text-tuscany-950 font-bold'>Empresa</span>
              <span>{currentDataProveedor.nameProv}</span>
            </div>
            <div className='flex flex-col bg-pearl-bush-200 p-2 m-2 max-w-[600px] min-w-[300px] mx-auto rounded-md'>
              <span className='text-tuscany-950 font-bold'>Telefono</span>
              <span>{currentDataProveedor.tel}</span>
            </div>
            <div className='flex flex-col bg-pearl-bush-200 p-2 m-2 max-w-[600px] min-w-[300px] mx-auto rounded-md'>
              <span className='text-tuscany-950 font-bold'>Ubicacion</span>
              <span>{currentDataProveedor.ubicacion}</span>
            </div>
            <div className='flex flex-col bg-pearl-bush-200 p-2 m-2 max-w-[600px] min-w-[300px] mx-auto rounded-md'>
              <span className='text-tuscany-950 font-bold'>Obtener camara de comercio</span>{' '}
              <div>
                <CustomButton
                  className='w-[150px] my-1 mx-auto'
                  text={'Aqui'}
                  onClick={() => {
                    window.open(`${currentDataProveedor.camaraDeComercio}`, '_blank');
                  }}
                />
              </div>
            </div>
            <div className='flex flex-col bg-pearl-bush-200 p-2 m-2 max-w-[600px] min-w-[300px] mx-auto'>
              <span className='text-tuscany-950 font-bold'>Obtener certificado bancario</span>{' '}
              <span>
                <CustomButton
                  text={'Aqui'}
                  className='w-[150px] my-1 mx-auto'
                  onClick={() => {
                    window.open(`${currentDataProveedor.certificadoBancario}`, '_blank');
                  }}
                />
              </span>
            </div>
          </div>
        ) : (
          <div>
            {!editMode && (
              <div className='mt-[50px]'>
                {/* Tabs para navegar entre componentes dentro de la vista de perfil */}
                <LinkTags />

                {/* El componente outlet mostrará los Favoritos o Historial según la ruta */}
                <Outlet />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
