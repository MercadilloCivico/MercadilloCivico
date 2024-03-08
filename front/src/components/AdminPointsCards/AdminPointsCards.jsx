import AdminPoint from './AdminPointsCard.jsx';
import { useSelector } from 'react-redux/es/hooks/useSelector.js';

export default function AdminPointsCards({ className }) {
  const { items } = useSelector((state) => state.salesPoint);

  return (
    <div className={className}>
      {items.map((point) => {
        return (
          <AdminPoint
            className='my-2'
            key={point.id}
            image={point.image}
            companyName={point.companyName}
            address={point.address}
            postalCode={point.postalCode}
            contactEmail={point.contactEmail}
            contactTel={point.contactTel}
          />
        );
      })}
    </div>
  );
}
