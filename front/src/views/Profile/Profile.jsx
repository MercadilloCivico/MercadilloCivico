import { FaUser } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

import { TextField } from '@mui/material';
import CustomTabs from './CustomTabs.jsx';
import { useDispatch } from 'react-redux';
import { createToast } from '../../store/slices/toastSlice.js';

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
  let [oldData, setOldData] = useState({
    imgUrl:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    firstName: 'Nombre',
    secondName: 'Segundo',
    lastName: 'Apellido',
    email: 'uncorreo@mail.com',
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

  function checkImage(file) {
    if (file.type === 'image/jpeg' || file.type === 'image/png') return true;
    else {
      dispatch(createToast('Por favor, sube un tipo de archivo PNG o JPEG'));
      return false;
    }
  }

  function handleChange(e) {
    console.log(hasErrors());
    console.log(hasChanged());
    console.log(errors);
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
      verifyErrors(e);
      return 0;
    }

    // Si el input es un campo de texto
    // Actualizar solo los campos que cambian en lugar de todos
    if (formData[e.target.name] !== e.target.value) {
      verifyErrors(e);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value.trim(),
      }));
      return 0;
    }
  }

  function verifyErrors(e) {
    let { name, value } = e.target;
    if (name === 'firstName') setErrors({ ...errors, firstName: validateFirstName(value) });
    if (name === 'secondName') setErrors({ ...errors, secondName: validateSecondName(value) });
    if (name === 'lastName') setErrors({ ...errors, lastName: validateLastName(value) });
    if (name === 'password') setErrors({ ...errors, password: validatePassword(value) });
    if (name === 'email') setErrors({ ...errors, email: validateEmail(value) });
    if (name === 'confirm')
      setErrors({ ...errors, confirm: validateConfirm(value, formData.password) });
  }

  function handleSave() {
    // Esta función guardará la información actualizada y subirá la imágen a la nube, para luego guardarla como su url en la base de datos
    // También se debe optimizar la imágen y recortarla con la relación de aspecto 1:1
    setOldData(formData);
    setEditMode(false);
    alert('Se guardaron los datos');
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
              className='absolute right-0 z-1 text-tuscany-100 m-2 w-[40px] h-[40px] backdrop-blur-[3px] rounded-full p-2 bg-[#00000080] hover:bg-[#00000090] transition border-none hover:cursor-pointer'
              onClick={() => {
                setEditMode(true);
              }}
              type='text'>
              <MdEdit className='w-full h-full' />
            </button>
          )}
          <div className='bottom-[calc(-75px+15%)] outline outline-2 outline-tuscany-100 mx-auto left-0 right-0 w-[150px] h-[150px] rounded-xl bg-pearl-bush-50 absolute object-cover overflow-hidden'>
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
                  className='text-tuscany-100 absolute m-1 bottom-0 right-0 w-[40px] h-[40px] backdrop-blur-[3px] rounded-full p-2 bg-[#00000080] hover:bg-[#00000090] transition border-none hover:cursor-pointer'>
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
              <FaUser className='w-full h-full p-2' />
            )}
          </div>
        </div>
      </div>

      {/* Info container */}

      {editMode ? (
        <div className='mt-[calc(75px)] flex flex-col justify-center'>
          <ul className='flex flex-wrap justify-around max-w-[900px] mx-auto'>
            <TextField
              onChange={handleChange}
              name='firstName'
              className='w-[300px] m-2'
              color='success'
              id='outlined-helperText'
              label='Nombre'
              defaultValue={formData.firstName}
            />

            <TextField
              onChange={handleChange}
              name='secondName'
              className='w-[300px] m-2'
              color='success'
              id='outlined-helperText'
              label='Segundo nombre'
              defaultValue={formData.secondName}
            />

            <TextField
              onChange={handleChange}
              name='lastName'
              className='w-[300px] m-2'
              color='success'
              id='outlined-helperText'
              label='Apellido'
              defaultValue={formData.lastName}
            />

            <TextField
              onChange={handleChange}
              className='w-[300px] m-2'
              name='email'
              color='success'
              id='outlined-helperText'
              label='Email'
              defaultValue={formData.email}
            />

            <TextField
              onChange={handleChange}
              className='w-[300px] m-2'
              name='password'
              color='success'
              id='outlined-helperText'
              label='Contraseña'
            />

            <TextField
              onChange={handleChange}
              className='w-[300px] m-2'
              name='confirm'
              color='success'
              id='outlined-helperText'
              label='Confirma la contraseña'
            />
          </ul>

          {/* Botones al editar*/}
          <div>
            {hasChanged() && !hasErrors() ? (
              <CustomButton onClick={handleSave} text='Guardar' className='my-5 mx-1' />
            ) : (
              <CustomButton
                text='Guardar'
                disabled='true'
                className='text-pearl-bush-800 my-5 mx-1'
              />
            )}

            <CustomButton onClick={handleCancel} text='Cancelar' />
          </div>
          <p>{errors.firstName}</p>
          <p>{errors.secondName}</p>
          <p>{errors.lastName}</p>
          <p>{errors.password}</p>
          <p>{errors.confirm}</p>
          <p>{errors.email}</p>
          <p>{errors.image}</p>
        </div>
      ) : (
        <div className='w-full max-w-[900px] mt-[75px] mx-auto'>
          <ul>
            <li className='my-3 font-bold text-3xl mx-2'>
              <span>{`${formData.firstName} ${formData.secondName} ${formData.lastName}`}</span>
            </li>
            <li className='my-3 font-semibold text-lg'>
              <span>{formData.email}</span>
            </li>

            <div className='w-[70%] h-[1px] bg-tuscany-950 mx-auto my-6'></div>

            <li className='my-3'>
              <span>{formData.phone}</span>
            </li>
            <li className='my-3'>
              <span>{formData.location}</span>
            </li>
            <li className='my-3'>
              <span>{formData.state}</span>
            </li>
            <li className='my-3'>
              <span>{formData.birth}</span>
            </li>
            <li className='my-3'>
              <span>{formData.joined}</span>
            </li>
          </ul>
        </div>
      )}

      {!editMode && (
        <div className='mt-[150px]'>
          {/* Tabs para navegar entre componentes dentro de la vista de perfil */}
          <CustomTabs />

          {/* El componente outlet mostrará los Favoritos o Historial según la ruta */}
          <Outlet />
        </div>
      )}
    </div>
  );
}
