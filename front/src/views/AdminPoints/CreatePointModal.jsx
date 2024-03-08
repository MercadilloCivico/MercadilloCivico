import { useState } from 'react';
import { TextField } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import { MdEdit } from 'react-icons/md';
import { LuStore } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { createToast } from '../../store/slices/toastSlice';

export default function CreatePointModal({ handleClose, modal }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    postalCode: '',
    contactTel: '',
    contactEmail: '',
    image: '',
    imgPreview: '',
  });

  function checkImage(file) {
    if (file.type === 'image/jpeg' || file.type === 'image/png') return true;
    else {
      dispatch(createToast('Por favor, sube un tipo de archivo PNG o JPEG'));
      return false;
    }
  }

  function handleChange(e) {
    if (e.target.name === 'photo') {
      const imgFile = e.target.files[0];

      if (!checkImage(imgFile)) return 0;

      if (imgFile) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({
            ...formData,
            imgPreview: reader.result,
            photo: imgFile,
          });
        };
        reader.readAsDataURL(imgFile);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  return (
    modal === true && (
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-[#00000070]'>
        <div className='bg-tuscany-50 rounded-xl max-w-[600px] mx-auto shadow-lg h-full max-h-[600px] overflow-hidden'>
          <div style={{ scrollbarWidth: 'thin' }} className='h-full overflow-auto px-2 '>
            <h3 className='text-tuscany-950 text-2xl mt-4'>Crear un punto de venta</h3>
            <div className='flex flex-wrap justify-around py-4'>
              {/* IMG CONTAINER */}

              <div>
                <div className='mb-[45px] outline outline-2 relative outline-tuscany-950 mx-auto w-[150px] h-[150px] rounded-xl bg-pearl-bush-50 object-cover overflow-hidden'>
                  <>
                    <input
                      name='photo'
                      id='photo'
                      onChange={handleChange}
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

                  {formData.photo && !formData.imgPreview ? (
                    <img
                      className='w-full h-full object-cover'
                      src={formData.photo}
                      alt='foto de perfil'></img>
                  ) : formData.imgPreview ? (
                    <img
                      className='w-full h-full object-cover'
                      src={formData.imgPreview}
                      alt='foto de perfil'></img>
                  ) : (
                    <LuStore className='w-full h-full p-2 text-tuscany-950' />
                  )}
                </div>
              </div>

              {/* TITULO */}
              <span className='text-tuscany-950 w-full italic h-0 translate-y-[-45px] bottom-0'>
                Imágen de la tienda *
              </span>
              <p className='text-tuscany-950 w-full'>
                Completa la información del punto de venta que quieres crear.
              </p>

              {/* RESTO DE INPUTS */}

              <div>
                <TextField
                  onChange={handleChange}
                  name='companyName'
                  label='Nombre de empresa'
                  className='max-w-[250px] m-2 bg-tuscany-50'
                />

                <TextField
                  onChange={handleChange}
                  name='address'
                  label='Dirección'
                  className='max-w-[250px] m-2 bg-tuscany-50'
                />

                <TextField
                  onChange={handleChange}
                  name='postalCode'
                  label='Código postal'
                  className='max-w-[250px] m-2 bg-tuscany-50'
                />

                <TextField
                  onChange={handleChange}
                  name='contactTel'
                  label='Teléfono de contacto'
                  className='max-w-[250px] m-2 bg-tuscany-50'
                />

                <TextField
                  onChange={handleChange}
                  name='contactMail'
                  label='Correo de contacto'
                  className='max-w-[250px] m-2 bg-tuscany-50'
                />
              </div>
            </div>

            <CustomButton text='Crear punto' className='my-4 mx-2' />

            <CustomButton text='Cancelar' className='my-4 mx-2' onClick={handleClose} />
          </div>
        </div>
      </div>
    )
  );
}
