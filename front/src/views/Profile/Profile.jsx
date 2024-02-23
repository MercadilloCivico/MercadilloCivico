import { FaUser } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';

export default function Profile() {
  let [editMode, setEditMode] = useState(false);

  // Copia de la Data original sin modificar, para saber si se cambió algo, o para restaurar al cancelar.
  let unmodifiedData = {
    imgPreview: '',
    imgUrl:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    name: 'Nombre Completo',
    email: 'uncorreo@mail.com',
    phone: '+1 34 8543-4234',
    location: 'Buenos Aires, Arentina.',
    state: 'Un distrito',
    birth: 'Objeto Date',
    joined: '2023/05/21',
  };

  // Estado con la Data actualizada en caso de querer actualizar
  let [formData, setFormData] = useState({
    imgPreview: '',
    imgUrl:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    name: 'Nombre Completo',
    email: 'uncorreo@mail.com',
    phone: '+1 34 8543-4234',
    location: 'Buenos Aires, Arentina.',
    state: 'Un distrito',
    birth: 'Objeto Date',
    joined: '2023/05/21',
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function handleChange(e) {
    if (e.target.name === 'img') {
      const imgPreview = e.target.files[0];
      if (e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData({ ...formData, imgPreview: e.target.result });
        };
        reader.readAsDataURL(imgPreview);
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSave() {
    // Esta función guardará la información actualizada y subirá la imágen a la nube, para luego guardarla como su url en la base de datos
    // También se debe optimizar la imágen y recortarla con la relación de aspecto 1:1
    unmodifiedData = formData;
    setEditMode(false);
    alert('Se guardaron los datos');
  }

  function handleCancel() {
    setFormData(unmodifiedData);
    setEditMode(false);
  }

  return (
    <div className='text-pearl-bush-950'>
      {/* Header container */}
      <div>
        <div className='w-screen h-[150px] bg-pearl-bush-950 relative'>
          {!editMode && (
            <CustomButton
              onClick={() => {
                setEditMode(true);
              }}
              text='Editar'
              className='absolute right-0'
            />
          )}
          <div className='bottom-[calc(-75px+15%)] mx-auto left-0 right-0 w-[150px] h-[150px] rounded-xl bg-pearl-bush-50 absolute object-cover overflow-hidden'>
            {editMode && (
              <>
                <input
                  name='img'
                  id='img'
                  onChange={handleChange}
                  type='file'
                  className='hidden absolute'
                />
                <label
                  htmlFor='img'
                  className='text-tuscany-200 absolute m-1 bottom-0 right-0 w-[40px] h-[40px] backdrop-blur-[3px] rounded-full p-2 bg-[#3f3f3f50] hover:bg-[#00000050] transition border-none hover:cursor-pointer'>
                  <MdEdit className='w-full h-full' />
                </label>
              </>
            )}

            {/* 
                        Renderizado condicional de imágen de perfil.
                        Si hay una imagen existente se renderiza. Si se seleccionó una imágen para subir, se renderizará la preview en su lugar. Else, se renderiza un placeholder
                        */}
            {formData.imgUrl && !formData.imgPreview ? (
              <img className='w-full h-full' src={formData.imgUrl}></img>
            ) : formData.imgPreview ? (
              <img className='w-full h-full' src={formData.imgPreview}></img>
            ) : (
              <FaUser className='w-full h-full p-2' />
            )}
          </div>
        </div>
      </div>

      {/* Info container */}

      {editMode ? (
        <div className='mt-[calc(75px)] flex flex-col justify-center'>
          <ul className='flex flex-wrap justify-around max-w-[900px]'>
            <TextField
              onChange={handleChange}
              name='name'
              className='w-[300px] m-2'
              color='success'
              id='outlined-helperText'
              label='Nombre'
              defaultValue={formData.name}
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
              name='phone'
              color='success'
              id='outlined-helperText'
              label='Teléfono'
              defaultValue={formData.phone}
            />
            <TextField
              onChange={handleChange}
              className='w-[300px] m-2'
              name='location'
              color='success'
              id='outlined-helperText'
              label='Ubicación'
              defaultValue={formData.location}
            />
            <TextField
              onChange={handleChange}
              className='w-[300px] m-2'
              name='state'
              color='success'
              id='outlined-helperText'
              label='Distrito'
              defaultValue={formData.state}
            />
            <TextField
              onChange={handleChange}
              className='w-[300px] m-2'
              name='birth'
              color='success'
              type='date'
              id='outlined-date'
              label='Nacimiento'
              value={formData.birth}
            />
            <TextField
              className='w-[300px] m-2'
              color='success'
              id='outlined-read-only-input'
              label='Se unió'
              defaultValue={formData.joined}
              InputProps={{ readOnly: true }}
            />
          </ul>

          {/* Botones al editar*/}
          <div>
            {JSON.stringify(formData) !== JSON.stringify(unmodifiedData) ? (
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
        </div>
      ) : (
        <div className='w-full max-w-[900px] mt-[75px]'>
          <ul>
            <li className='my-3'>
              <span>{formData.name}</span>
            </li>
            <li className='my-3'>
              <span>{formData.email}</span>
            </li>
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
    </div>
  );
}
