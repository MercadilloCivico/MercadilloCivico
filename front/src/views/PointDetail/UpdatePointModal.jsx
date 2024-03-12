import { useState } from 'react';
import { TextField } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { createToast } from '../../store/slices/toastSlice';
import { putPuntoDeVenta } from '../../store/thunks/salesPointThunks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchSalesPointsAsync } from '../../store/thunks/salesPointThunks';
import { Skeleton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import {
  validateEmail,
  validateCompany,
  validatePostalCode,
  validateAddress,
  validatePhone,
} from './formControl';

export default function UpdatePointModal({ handleClose, modal }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { status } = useSelector((state) => state.salesPoint);

  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    postalCode: '',
    contactTel: '',
    contactEmail: '',
    image: '',
    imgPreview: '',
  });

  const [currentData, setCurrentData] = useState({});
  const [errors, setErrors] = useState({
    companyName: '',
    address: '',
    postalCode: '',
    contactTel: '',
    contactEmail: '',
    image: '',
    imgPreview: '',
  });

  function checkErrors() {
    setErrors({
      address: validateAddress(formData.address),
      contactEmail: validateEmail(formData.contactEmail),
      contactTel: validatePhone(formData.contactTel.slice(4)), // verificar sin el +57
      companyName: validateCompany(formData.companyName),
      postalCode: validatePostalCode(formData.postalCode),
    });
  }

  useEffect(() => {
    if (formData.address) {
      checkErrors();
    }
    console.log(formData);
    console.log(hasErrors());
    console.log(errors);
  }, [formData]);

  function hasErrors() {
    // verifica si hay algún error
    return Object.values(errors).some((error) => {
      return error !== '';
    });
  }

  useEffect(() => {
    (async function () {
      const response = await dispatch(fetchSalesPointsAsync(id));
      setCurrentData({
        ...currentData,
        company_name: response.payload.company_name,
        address: response.payload.address,
        postal_code: response.payload.postal_code,
        contact_tel: response.payload.contact_tel.slice(4),
        contact_email: response.payload.contact_email,
        image: response.payload.image,
        imgPreview: '',
      });
      setFormData({
        ...formData,
        companyName: response.payload.company_name,
        address: response.payload.address,
        postalCode: response.payload.postal_code,
        contactTel: response.payload.contact_tel,
        contactEmail: response.payload.contact_email,
        image: response.payload.image,
        imgPreview: '',
      });
    })();
  }, [dispatch]);

  function checkImage(file) {
    if (file.type === 'image/jpeg' || file.type === 'image/png') return true;
    else {
      dispatch(createToast('Por favor, sube un tipo de archivo PNG o JPEG'));
      return false;
    }
  }

  function handleChange(e) {
    if (e.target.name === 'image') {
      const imgFile = e.target.files[0];

      if (!checkImage(imgFile)) return 0;

      if (imgFile) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({
            ...formData,
            imgPreview: reader.result,
            image: imgFile,
          });
        };
        reader.readAsDataURL(imgFile);
      }
    } else if (e.target.name === 'contactTel') {
      setFormData({ ...formData, [e.target.name]: `+57 ${e.target.value}` });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    console.log(formData);
  }
  const handleSubmit = async (e) => {
    e.preventDefault;

    try {
      await dispatch(putPuntoDeVenta({ id, formData }));
      dispatch(createToast('Punto de venta actualizado exitosamente.'));
    } catch (err) {
      dispatch(createToast('Error al actualizar el punto'));
    }
  };

  return (
    modal === true && (
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-[15] bg-[#00000070]'>
        <div className='bg-tuscany-50 min-[600px]:rounded-xl max-w-[600px] mx-auto shadow-lg h-full sm:max-h-[600px]  min-[600px]:max-h-full  overflow-hidden'>
          <div style={{ scrollbarWidth: 'thin' }} className='h-full overflow-auto px-2 '>
            <h3 className='text-tuscany-950 text-2xl mt-4'>Actualizar este punto de venta</h3>
            <div className='flex flex-wrap justify-around py-4'>
              {/* IMG CONTAINER */}

              {currentData.image ? (
                <div>
                  <div className='mb-[45px] outline outline-2 relative outline-tuscany-950 mx-auto w-[150px] h-[150px] rounded-xl bg-pearl-bush-50 object-cover overflow-hidden'>
                    <>
                      <input
                        name='image'
                        id='image'
                        onChange={handleChange}
                        type='file'
                        accept='image/*'
                        className='hidden absolute'
                      />
                      <label
                        htmlFor='image'
                        className='text-tuscany-100 absolute m-[5px] bottom-0 right-0 w-[40px] h-[40px] backdrop-blur-[3px] rounded-full p-2 bg-[#00000080] hover:bg-[#00000090] transition border-none hover:cursor-pointer'>
                        <MdEdit className='w-full h-full' />
                      </label>
                    </>

                    {formData.imgPreview ? (
                      <img
                        className='w-full h-full object-cover'
                        src={formData.imgPreview}
                        alt='foto de perfil'></img>
                    ) : (
                      <img
                        className='w-full h-full object-cover'
                        src={currentData.image}
                        alt='foto de perfil'></img>
                    )}
                  </div>
                </div>
              ) : (
                <Skeleton
                  variant='rectangular'
                  animation={'wave'}
                  width={150}
                  className='mb-[45px] mx-auto w-[150px] h-[150px] rounded-xl overflow-hidden'
                />
              )}

              {/* TITULO */}
              <span className='text-tuscany-950 w-full italic h-0 translate-y-[-45px] bottom-0'>
                Imágen de la tienda *
              </span>
              <p className='text-tuscany-950 w-full'>
                Completa la información del punto de venta que quieres crear.
              </p>

              {/* RESTO DE INPUTS */}
              {currentData.address ? (
                <div>
                  <TextField
                    onChange={handleChange}
                    name='companyName'
                    label='Nombre de empresa'
                    className='max-w-[250px] m-2 bg-tuscany-50 w-full'
                    defaultValue={currentData.company_name}
                    helperText={errors.companyName}
                    error={errors.companyName}
                  />

                  <TextField
                    onChange={handleChange}
                    name='address'
                    label='Dirección'
                    className='max-w-[250px] m-2 bg-tuscany-50 w-full'
                    defaultValue={currentData.address}
                    helperText={errors.address}
                    error={errors.address}
                  />

                  <TextField
                    onChange={handleChange}
                    name='postalCode'
                    label='Código postal'
                    className='max-w-[250px] m-2 bg-tuscany-50 w-full'
                    defaultValue={currentData.postal_code}
                    helperText={errors.postalCode}
                    error={errors.postalCode}
                  />

                  <TextField
                    onChange={handleChange}
                    name='contactTel'
                    label='Teléfono de contacto'
                    className='max-w-[250px] m-2 bg-tuscany-50 w-full'
                    defaultValue={currentData.contact_tel}
                    helperText={errors.contactTel}
                    error={errors.contactTel}
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>+57</InputAdornment>,
                    }}
                  />

                  <TextField
                    onChange={handleChange}
                    name='contactEmail'
                    label='Correo de contacto'
                    className='max-w-[250px] m-2 bg-tuscany-50 w-full'
                    defaultValue={currentData.contact_email}
                    helperText={errors.contactEmail}
                    error={errors.contactEmail}
                  />
                </div>
              ) : (
                <div className='flex flex-wrap justify-center'>
                  <Skeleton
                    variant='rectangular'
                    animation={'wave'}
                    width={250}
                    className='mx-2 my-2 h-[55px] max-w-[250px] w-full rounded-sm'
                  />
                  <Skeleton
                    variant='rectangular'
                    animation={'wave'}
                    width={250}
                    className='mx-2 my-2 h-[55px] max-w-[250px] w-full rounded-sm'
                  />
                  <Skeleton
                    variant='rectangular'
                    animation={'wave'}
                    width={250}
                    className='mx-2 my-2 h-[55px] max-w-[250px] w-full rounded-sm'
                  />
                  <Skeleton
                    variant='rectangular'
                    animation={'wave'}
                    width={250}
                    className='mx-2 my-2 h-[55px] max-w-[250px] w-full rounded-sm'
                  />
                  <Skeleton
                    variant='rectangular'
                    animation={'wave'}
                    width={250}
                    className='mx-2 my-2 h-[55px] max-w-[250px] w-full rounded-sm'
                  />
                </div>
              )}
            </div>

            {status === 'loading' && (
              <div className='relative'>
                <p className='text-tuscany-950'>Guardando...</p>
              </div>
            )}

            {hasErrors() && (
              <div className='relative'>
                <p className='text-crown-of-thorns-700'>Corrige los errores antes de continuar</p>
              </div>
            )}

            {!hasErrors() ? (
              <CustomButton text='Actualizar punto' onClick={handleSubmit} className='my-4 mx-2' />
            ) : (
              <CustomButton
                disabled={true}
                text='Actualizar punto'
                className='my-4 mx-2 text-tuscany-900 cursor-default'
              />
            )}

            <CustomButton text='Cancelar' className='my-4 mx-2' onClick={handleClose} />
          </div>
        </div>
      </div>
    )
  );
}
