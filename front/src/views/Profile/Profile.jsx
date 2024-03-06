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

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  let [editMode, setEditMode] = useState(false);

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

  useEffect(() => {
    setIsLoading(true);
    // Lógica para cargar los datos del usuario (asumiendo que updateUserData() hace la llamada a la API)
    updateUserData().then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    // Actualizar formData cuando currentData cambie
    setFormData(currentData);
  }, [currentData]);

  // useEffect(() => {
  //   console.log(isLoading);
  // }, [isLoading]);

  useEffect(() => {
    if (editMode) {
      navigate('/profile');
    } else {
      navigate('/profile/history');
    }
  }, [editMode]);

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

  // validar errores en cada cambio del formData
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
  const { token } = useSelector((state) => state.auth);

  async function handleSave() {
    setIsLoading(true);
    const toSend = {
      // envía el nombre con el formato correcto en caso de estar mal
      firstName:
        formData.firstName.charAt(0).toUpperCase() +
        formData.firstName.slice(1).toLocaleLowerCase(),
      secondName:
        formData.secondName.charAt(0).toUpperCase() +
        formData.secondName.slice(1).toLocaleLowerCase(),
      lastName:
        formData.lastName.charAt(0).toUpperCase() + formData.lastName.slice(1).toLocaleLowerCase(),
      email: formData.email,
      password: formData.password,
      photo: formData.file || '',
    };

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

  function handleDelete() {
    // setEditMode(false);
    dispatch(deleteUserProfileAsync());
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
    return JSON.stringify(formData) !== JSON.stringify(currentData);
  }

  return (
    <div className='text-pearl-bush-950'>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div
              style={{ backgroundImage: "url('https://picsum.photos/600/300')" }}
              className='max-w-[1280px] mx-auto h-[150px] bg-pearl-bush-950 bg-cover bg-center relative'>
              {!editMode && (
                <button
                  className={
                    'absolute right-0 z-1 text-tuscany-100 m-2 w-max h-[40px] backdrop-blur-[3px] rounded-xl p-2 bg-[#00000080] hover:bg-[#00000090] transition border-none hover:cursor-pointer ' +
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
                id='outlined-helperText'
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
                id='outlined-helperText'
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
                id='outlined-helperText'
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
                id='outlined-helperText'
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
                id='outlined-helperText'
                label='Contraseña'
                helperText={errors.password}
                error={errors.password ? true : false}
              />

              <TextField
                onChange={handleChange}
                className='w-[300px] m-2'
                name='confirm'
                color='success'
                id='outlined-helperText'
                label='Confirma la contraseña'
                helperText={errors.confirm}
                error={errors.confirm ? true : false}
              />
            </ul>

            {/* Botones al editar*/}
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

        {!editMode && (
          <div className='mt-[50px]'>
            {/* Tabs para navegar entre componentes dentro de la vista de perfil */}
            <LinkTags />

            {/* El componente outlet mostrará los Favoritos o Historial según la ruta */}
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}
