import { useState } from 'react';
import ConfirmaTuCompra from './ConfirmaTuCompra';
import DatosDeTarjeta from './DatosDeTarjeta';
import FormaDePago from './FormaDePago';

export default function PasarelaDePago() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return <FormaDePago nextStep={nextStep} />;
    case 2:
      return <DatosDeTarjeta nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <ConfirmaTuCompra prevStep={prevStep} />;
    default:
      return <div>Un error ha ocurrido</div>;
  }
}
