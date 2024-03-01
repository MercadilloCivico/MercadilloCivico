import { FaUser } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

import { TextField } from '@mui/material';
import LinkTags from './LinkTags.jsx';
import { useDispatch } from 'react-redux';
import { createToast } from '../../store/slices/toastSlice.js';
import { putUser } from '../../store/thunks/authThunks.js';
import style from './ProfileAnims.module.css';

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
  let [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirije automaticamente a /profile/history al entrar a /profile
  useEffect(() => {
    navigate('/profile/history');
  }, []);

  useEffect(() => {
    if (editMode) {
      navigate('/profile');
    } else {
      navigate('/profile/history');
    }
  }, [editMode]);

  // Copia de la Data original sin modificar, para mostrar en los campos
  let [oldData] = useState({
    imgUrl:
      'https://www.lavanguardia.com/andro4all/hero/2020/12/oie3195149r2UDo3VZ.jpg?width=768&aspect_ratio=16:9&format=nowebp',
    firstName: 'Nombre',
    secondName: 'Segundo',
    lastName: 'Apellido',
    email: 'uncorreo@mail.com',
    password: '', // debe estar password en vacío para
    confirm: '',
  });

  // Estado con la Data actualizada en caso de querer actualizar
  // Se inicializa con los datos viejo
  const [formData, setFormData] = useState(oldData);

  const [errors, setErrors] = useState({
    firstName: '',
    secondName: '',
    lastName: '',
    password: '',
    confirm: '',
    email: '',
  });

  // dispatch(createToast('Este es un toast'));

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
    setErrors({
      ...errors,
      firstName: validateFirstName(formData.firstName),
      secondName: validateSecondName(formData.secondName),
      lastName: validateLastName(formData.lastName),
      password: validatePassword(formData.password),
      email: validateEmail(formData.email),
      confirm: validateConfirm(formData.confirm, formData.password),
    });
  }, [formData]);

  async function handleSave() {
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
    if (response.payload?.error) dispatch(createToast(response.payload.error));
    else dispatch(createToast('Datos actualizados con éxito.'));
    // si la contraseña se cambia debe hacer logout
  }

  function handleCancel() {
    setFormData(oldData);
    setEditMode(false);
  }

  function hasErrors() {
    // verifica si hay algún error
    return Object.values(errors).some((error) => {
      return error !== '';
    });
  }

  function hasChanged() {
    // verifica si se modificó algún campo
    return JSON.stringify(formData) !== JSON.stringify(oldData);
  }

  return (
    <div className='text-pearl-bush-950'>
      {/* Header container */}
      <div>
        <div
          style={{ backgroundImage: "url('https://picsum.photos/600/300')" }}
          className='max-w-[1280px] mx-auto h-[150px] bg-pearl-bush-950 bg-cover bg-center relative'>
          {!editMode && (
            <button
              className={
                'absolute right-0 z-1 text-tuscany-100 m-2 w-[40px] h-[40px] backdrop-blur-[3px] rounded-full p-2 bg-[#00000080] hover:bg-[#00000090] transition border-none hover:cursor-pointer ' +
                style.editBtnAnim
              }
              onClick={() => {
                setEditMode(true);
              }}
              type='text'>
              <MdEdit className='w-full h-full' />
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
            {formData.imgUrl && !formData.imgPreview ? (
              <img className='w-full h-full object-cover' src={formData.imgUrl}></img>
            ) : formData.imgPreview ? (
              <img className='w-full h-full object-cover' src={formData.imgPreview}></img>
            ) : (
              <FaUser className='w-full h-full p-2 text-tuscany-600 bg-tuscany-100' />
            )}
          </div>
        </div>
      </div>

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
              defaultValue={formData.firstName}
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
              defaultValue={formData.secondName}
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
              defaultValue={formData.lastName}
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
              defaultValue={formData.email}
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
        </div>
      ) : (
        <div className='w-full max-w-[900px] mt-[75px] mx-auto'>
          <ul>
            <li className='my-3 font-bold text-3xl mx-2 text-tuscany-600'>
              <span>{`${formData.firstName} ${formData.secondName} ${formData.lastName}`}</span>
            </li>
            <li className='my-3 font-semibold text-lg text-tuscany-800 opacity-80'>
              <span>{formData.email}</span>
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
  );
}
