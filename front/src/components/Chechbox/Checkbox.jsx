import { FormControlLabel, FormGroup } from '@mui/material';
function CheckboxRequired() {
  return (
    <>
      <FormGroup className='bg-tuscany-100'>
        <FormControlLabel
          required
          control={<input type='checkbox' className='mx-2' />}
          label='Acepto términos y condiciones'
          className='flex justify-start text-pearl-bush-950 text-lg font-bold py-2 min-w-[240px] m-auto'
        />
      </FormGroup>
    </>
  );
}

function CheckboxBasic() {
  return (
    <>
      <FormGroup className='bg-tuscany-100'>
        <FormControlLabel
          control={<input type='checkbox' className='mx-2' />}
          label='Recibir información nutricional - Mercadillo Civico'
          className='flex self-start text-pearl-bush-950 py-2 min-w-[240px] m-auto '
        />
      </FormGroup>
    </>
  );
}

export { CheckboxRequired, CheckboxBasic };
