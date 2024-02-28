import CustomInput from '../../CustomInput/CustomInput.jsx';

export default function SupplierSettings() {
  // nameProv, ubicacion, tel, camaraDeComercio, certificadoBancario

  return (
    <div>
      <CustomInput label='Nombre' />
      <CustomInput label='Ubicación' />
      <CustomInput label='Teléfono' />
      <div>
        <label htmlFor='camaraDeComercio'>Cámara de comercio</label>
        <input name='camaraDeComercio' type='file'></input>
      </div>

      <div>
        <label htmlFor='certificadoBancario'>Certificado bancario</label>
        <input name='certificadoBancario' type='file'></input>
      </div>
    </div>
  );
}
