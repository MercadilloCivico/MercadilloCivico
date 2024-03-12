import Logo from '../../assets/img/logo-full.svg';
import { useState } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer/Footer.jsx';
import { createToast } from '../../store/slices/toastSlice.js';
import { useNavigate } from 'react-router-dom';
import { LuLogIn } from 'react-icons/lu';
import { validacionProveedor } from '../../utils/validation.js';
import { addProvider } from '../../store/thunks/providerThunks.js';
import municipiosPrincipales from '../../utils/departamentos.js';

function RegisterProvider() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedMuni, setSelectedMuni] = useState('');
  const [direccion, setDireccion] = useState('');
  const [deptSelected, setDeptSelected] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    camaraDeComercio: null,
    certificadoBancario: null,
    nameProv: '',
    ubicacion: [],
    tel: '+57',
  });

  const handlePDFChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    // Verificar si el archivo seleccionado es un PDF
    if (file && file.type === 'application/pdf') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
      }));
    } else {
      // Despachar toast
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Pasa el objeto data actualizado a la función registerValidation
    setErrors(validacionProveedor({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const payload = await dispatch(addProvider(formData));
      if (payload.error?.message === 'Rejected') {
        throw new Error(payload.payload.message);
      } else {
        dispatch(createToast('Registro exitoso'));
        navigate('/store');
      }
    } catch (error) {
      dispatch(createToast(error));
    }
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setSelectedDept(selectedDept);
    setDeptSelected(true);
    setFormData({
      ...formData,
      ubicacion: [selectedDept],
    });
    // Actualizar formData.ubicacion al nombre del departamento seleccionado
  };
  const handleMunicipalityChange = (e) => {
    const selectedMuni = e.target.value;
    setSelectedMuni(selectedMuni);
    setFormData({
      ...formData,
      ubicacion: [selectedDept, selectedMuni],
    });
  };
  const handleDirection = (e) => {
    const value = e.target.value;
    setDireccion(value);
    setFormData({
      ...formData,
      ubicacion: [selectedDept, selectedMuni, value],
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='bg-pearl-bush-200 w-full max-w-[600px] min-w-[250px] pb-8 rounded-xl my-8 mx-auto shadow-xl'>
        <img src={Logo} alt='Mercadillo Cívico' className=' bg-pearl-bush-200 w-[150px] mx-auto' />

        <div className='max-w-[400px] min-w-[250px] mx-auto'>
          <p className='text-pearl-bush-950 text-xl'>Ingresa tus datos para registrarte</p>

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
            <label htmlFor='certificadoBancario' className='text-pearl-bush-950 font-medium'>
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

          <div className='flex flex-col self-center max-w-[600px] min-w-[300px] mx-auto mt-3'>
            <label htmlFor='departamento' className='text-pearl-bush-950 font-medium'>
              Departamento:
            </label>
            <select
              name='departamento'
              defaultValue={''}
              className='border-tuscany-950 hover:custom-border-2 text-tuscany-950 hover:text-tuscany-600 font-semibold outline-none rounded-md custom-transparent-bg cursor-pointer p-3'
              onChange={handleDepartmentChange}>
              <option value='' disabled>
                Seleccione un departamento
              </option>
              {Object.keys(municipiosPrincipales).map((departamento, index) => (
                <option key={index} value={departamento}>
                  {departamento}
                </option>
              ))}
            </select>
            <div className='text-crown-of-thorns-600'>{errors.departamento}</div>
          </div>

          <div className='flex flex-col self-center max-w-[600px] min-w-[300px] mx-auto mt-3'>
            <label htmlFor='municipio' className='text-pearl-bush-950 font-medium'>
              Municipio:
            </label>
            <select
              name='municipio'
              onChange={handleMunicipalityChange}
              disabled={!setSelectedDept}
              className='border-tuscany-950 hover:custom-border-2 text-tuscany-950 hover:text-tuscany-600 font-semibold outline-none rounded-md custom-transparent-bg cursor-pointer p-3'>
              <option value='' disabled>
                Seleccione un municipio
              </option>
              {selectedDept &&
                municipiosPrincipales[selectedDept].map((municipio, index) => (
                  <option key={index} value={municipio}>
                    {municipio}
                  </option>
                ))}
            </select>
            {!deptSelected && (
              <label className='text-crown-of-thorns-600'>
                Seleccione un Departamento para continuar
              </label>
            )}
          </div>

          <div className='my-[25px] flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto'>
            <CustomInput
              label='Nombre del proveedor'
              placeholder='Nombre del proveedor'
              name='nameProv'
              type='text'
              value={formData.nameProv}
              onChange={handleInput}
              maxLength={16}
            />
            <div className='text-crown-of-thorns-600'>{errors.nameProv}</div>
          </div>

          <div className='my-[25px] flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto'>
            <CustomInput
              label='Ubicacion'
              placeholder='direccion'
              name='direccion'
              type='text'
              value={direccion}
              onChange={handleDirection}
              maxLength={30}
              disabled={!selectedMuni}
            />
            <div className='text-crown-of-thorns-600'>
              {!selectedMuni && 'Seleccione un municipio primero'}
            </div>
          </div>

          <div className='my-[25px] flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto'>
            <CustomInput
              label='Telefono'
              placeholder='Telefono'
              name='tel'
              type='text'
              value={formData.tel}
              onChange={handleInput}
              maxLength={13}
            />

            <div className='text-crown-of-thorns-600'>{errors.tel}</div>
          </div>

          <CustomButton
            type='submit'
            text='Registrarse'
            className='w-[180px] mt-[25px]'
            icon={LuLogIn}
          />
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default RegisterProvider;
