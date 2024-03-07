import Logo from '../../assets/img/logo-full.svg';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer/Footer.jsx';
// import { createToast } from '../../store/slices/toastSlice.js';

import { LuLogIn } from 'react-icons/lu';
import { validacionProveedor } from '../../utils/validation.js';
import { addProvider } from '../../store/thunks/providerThunks.js';

var municipiosPrincipales = {
  Amazonas: ['Leticia', 'Puerto Nariño'],
  Antioquía: ['Medellín', 'Bello', 'Envigado'],
  Arauca: ['Arauca', 'Saravena'],
  Atlántico: ['Barranquilla', 'Soledad', 'Malambo'],
  Bolívar: ['Cartagena de Indias', 'Bolívar', 'Magangué'],
  Boyacá: ['Tunja', 'Duitama', 'Sogamoso'],
  Caldas: ['Manizales', 'Manzanares', 'La Dorada'],
  Caquetá: ['Florencia', 'San Vicente del Caguán', 'Puerto Rico'],
  Casanare: ['Yopal', 'Aguazul', 'Villanueva'],
  Cauca: ['Popayán', 'Santander de Quilichao', 'Puerto Tejada'],
  Cesar: ['Valledupar', 'Aguachica', 'Codazzi'],
  Chocó: ['Quibdó', 'Istmina', 'Tadó'],
  Córdoba: ['Montería', 'Sincelejo', 'Cereté'],
  Cundinamarca: ['Bogotá', 'Soacha', 'Zipaquirá'],
  Guaviare: ['San José del Guaviare', 'Calamar', 'Miraflores'],
  Huila: ['Neiva', 'Pitalito', 'Garzón'],
  'La Guajira': ['Riohacha', 'Maicao', 'Uribia'],
  Magdalena: ['Santa Marta', 'Ciénaga', 'Fundación'],
  Meta: ['Villavicencio', 'Acacías', 'Granada'],
  Nariño: ['San Juan de Pasto', 'Ipiales', 'Tumaco'],
  'Norte de Santander': ['San José de Cúcuta', 'Pamplona', 'Ocaña'],
  Putumayo: ['Mocoa', 'Puerto Asís', 'Sibundoy'],
  Quindío: ['Armenia', 'Calarcá', 'Quimbaya'],
  Risaralda: ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal'],
  'San Andrés y Providencia': ['San Andrés', 'Providencia'],
  Santander: ['Bucaramanga', 'Floridablanca', 'Girón'],
  Sucre: ['Sincelejo', 'Corozal', 'Santiago de Tolú'],
  Tolima: ['Ibagué', 'Espinal', 'Melgar'],
  'Valle del Cauca': ['Cali', 'Buenaventura', 'Palmira'],
  Vaupés: ['Mitú', 'Carurú', 'Taraira'],
  Vichada: ['Puerto Carreño', 'La Primavera', 'Santa Rosalía'],
};

function RegisterProvider() {
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
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      ubicacion: [selectedDept, selectedMuni, direccion],
    }));
    await dispatch(addProvider(formData));
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setSelectedDept(selectedDept);
    setDeptSelected(true);
    // Actualizar formData.ubicacion al nombre del departamento seleccionado
  };
  const handleMunicipalityChange = (e) => {
    const selectedMuni = e.target.value;
    setSelectedMuni(selectedMuni);
  };
  const handleDirection = (e) => {
    const value = e.target.value;
    setDireccion(value);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='bg-pearl-bush-200 w-full max-w-[600px] min-w-[250px] pb-8 rounded-xl my-8 mx-auto shadow-xl'>
        <img src={Logo} alt='Mercadillo Cívico' className=' bg-pearl-bush-200 w-[150px] mx-auto' />

        <div className='max-w-[400px] min-w-[250px] mx-auto'>
          <p className='text-pearl-bush-950 text-xl'>Ingresa tus datos para registrarte</p>
          <div className='my-[25px] flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto'>
            <label htmlFor='camaraDeComercio'>Ingrese PDF de la camara de comercio</label>
            <input
              type='file'
              name='camaraDeComercio'
              accept='application/pdf'
              onChange={handlePDFChange}
            />
          </div>
          <div className='my-[25px] flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto'>
            <label htmlFor='certificadoBancario'>Ingrese PDF del certificado bancario</label>
            <input
              type='file'
              name='certificadoBancario'
              accept='application/pdf'
              onChange={handlePDFChange}
            />
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
            <label htmlFor='departamento' className='text-pearl-bush-950'>
              Departamento:
            </label>
            <select
              name='departamento'
              defaultValue={''}
              className='border-tuscany-950 hover:custom-border-2 p-1 text-tuscany-950 hover:text-tuscany-500 outline-none rounded-sm custom-transparent-bg cursor-pointer'
              onChange={handleDepartmentChange}
              disabled={deptSelected}>
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
          <div className='my-[25px] flex flex-col self-center max-w-[600px] min-w-[250px] mx-auto'>
            <label htmlFor='municipio' className='text-pearl-bush-950'>
              Municipio:
            </label>
            <select
              name='municipio'
              onChange={handleMunicipalityChange}
              disabled={!setSelectedDept}
              className='border-tuscany-950 hover:custom-border-2 p-1 text-tuscany-950 hover:text-tuscany-500 outline-none rounded-sm custom-transparent-bg cursor-pointer'>
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
