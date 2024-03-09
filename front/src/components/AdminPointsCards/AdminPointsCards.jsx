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
            company_name={point.company_name}
            address={point.address}
            postal_code={point.postal_code}
            contact_email={point.contact_email}
            contact_tel={point.contact_tel}
            id={point.id}
          />
        );
      })}
    </div>
  );
}
