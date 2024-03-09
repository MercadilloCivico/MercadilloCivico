import PointProduct from './PointProduct.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';

export default function pointProducts({ className }) {
  return (
    <div className={className}>
      Products container
      <PointProduct />
      <PointProduct />
      <PointProduct />
      <CustomButton text='Asociar inventario' />
    </div>
  );
}
