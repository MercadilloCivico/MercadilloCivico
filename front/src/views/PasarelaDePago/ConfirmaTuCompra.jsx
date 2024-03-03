export default function ConfirmaTuCompra({ prevStep }) {
  // Aquí iría la lógica de confirmación y la validación

  return (
    <div>
      <h2>Confirma tu Compra</h2>
      {/* Detalles de la compra aquí */}
      <button onClick={prevStep}>Anterior</button>
      {/* Aquí podría ir un botón para finalizar la compra */}
    </div>
  );
}
